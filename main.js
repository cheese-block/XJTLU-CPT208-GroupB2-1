import { CONSTANTS }            from './src/utils/constants.js';
import * as StateManager        from './src/state/StateManager.js';
import { log }                  from './src/utils/helpers.js';

import { initUIManager, registerScreen } from './src/ui/UIManager.js';
import { TitleScreen }          from './src/ui/screens/TitleScreen.js';
import { SchoolSelectScreen }   from './src/ui/screens/SchoolSelectScreen.js';

document.addEventListener('DOMContentLoaded', () => {

  initLucide();
  StateManager.initStateManager();

  // 注册已实现的 Screen
  registerScreen(CONSTANTS.GAME_PHASE.TITLE,         new TitleScreen());
  registerScreen(CONSTANTS.GAME_PHASE.SCHOOL_SELECT, new SchoolSelectScreen());

  // 占位 Screen
  const placeholder = (label) => ({
    mount(container) {
      container.innerHTML = `
        <div class="w-full h-full flex flex-col items-center justify-center gap-6 bg-white">
          <div class="text-6xl">🚧</div>
          <p class="text-xl font-black text-xjtlu-navy">${label}</p>
          <p class="text-sm text-xjtlu-gray">该界面正在开发中，敬请期待</p>
          <button id="placeholder-back" class="xjtlu-btn xjtlu-btn--secondary mt-4">
            <i data-lucide="arrow-left" class="lucide w-4 h-4"></i>
            返回主菜单
          </button>
        </div>
      `;
      if (typeof lucide !== 'undefined') lucide.createIcons();
      container.querySelector('#placeholder-back')
        ?.addEventListener('click', () => {
          StateManager.setGamePhase(CONSTANTS.GAME_PHASE.TITLE);
        });
    },
    unmount() {},
    onStateChange() {},
  });

  registerScreen(CONSTANTS.GAME_PHASE.MAP,           placeholder('校园地图（开发中）'));
  registerScreen(CONSTANTS.GAME_PHASE.VN,            placeholder('剧情事件（开发中）'));
  registerScreen(CONSTANTS.GAME_PHASE.MONTH_SUMMARY, placeholder('月末结算（开发中）'));
  registerScreen(CONSTANTS.GAME_PHASE.TAG_SHOWCASE,  placeholder('人生印记（开发中）'));
  registerScreen(CONSTANTS.GAME_PHASE.ENDING,        placeholder('结局（开发中）'));

  initUIManager();

  StateManager.subscribe((state) => {
    updateDangerOverlay(state);
    StateManager.consumePendingStatChanges();
  });

  StateManager.setGamePhase(CONSTANTS.GAME_PHASE.TITLE);
  log('info', 'Main', '🚀 应用启动完成');
});

function initLucide() {
  if (typeof lucide === 'undefined') {
    console.error('[Main] Lucide 未加载');
    return;
  }
  lucide.createIcons();
  log('info', 'Main', '✅ Lucide 初始化完成');
}

function updateDangerOverlay(state) {
  const overlay = document.getElementById('danger-overlay');
  if (!overlay) return;
  const danger =
    state.Mental_Health   < CONSTANTS.MENTAL_HEALTH_WARN ||
    state.Physical_Health < CONSTANTS.PHYSICAL_HEALTH_WARN;
  overlay.classList.toggle('is-active', danger);
}