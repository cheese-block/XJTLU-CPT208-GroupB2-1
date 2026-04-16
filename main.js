import { CONSTANTS }          from './src/utils/constants.js';
import * as StateManager      from './src/state/StateManager.js';
import { log }                from './src/utils/helpers.js';

import { initUIManager, registerScreen } from './src/ui/UIManager.js';
import { initGameLoop, checkBadEndings } from './src/engine/GameLoop.js';
import { TitleScreen }        from './src/ui/screens/TitleScreen.js';
import { SchoolSelectScreen } from './src/ui/screens/SchoolSelectScreen.js';
import { MapScreen }          from './src/ui/screens/MapScreen.js';
import { VNScreen }           from './src/ui/screens/VNScreen.js';
import { MonthSummaryScreen } from './src/ui/screens/MonthSummaryScreen.js';
import { initTooltipManager } from './src/ui/components/TooltipManager.js';
import { TagShowcaseScreen }  from './src/ui/screens/TagShowcaseScreen.js';
import { EndingScreen }       from './src/ui/screens/EndingScreen.js'; 

let _vnScreen = null;

document.addEventListener('DOMContentLoaded', () => {

  initLucide();
  StateManager.initStateManager();

  // 【新增调用】：初始化全局 Tooltip
  initTooltipManager();

  _vnScreen = new VNScreen();

  // 初始化 GameLoop（注入 VNScreen）
  initGameLoop(_vnScreen);

  registerScreen(CONSTANTS.GAME_PHASE.TITLE,         new TitleScreen());
  registerScreen(CONSTANTS.GAME_PHASE.SCHOOL_SELECT, new SchoolSelectScreen());
  registerScreen(CONSTANTS.GAME_PHASE.MAP,           new MapScreen());
  registerScreen(CONSTANTS.GAME_PHASE.VN,            _vnScreen);
  registerScreen(CONSTANTS.GAME_PHASE.MONTH_SUMMARY, new MonthSummaryScreen());

  const placeholder = (label) => ({
    mount(container) {
      container.innerHTML = `
        <div class="w-full h-full flex flex-col items-center
                    justify-center gap-6 bg-white">
          <div class="text-6xl">🚧</div>
          <p class="text-xl font-black text-xjtlu-navy">${label}</p>
          <p class="text-sm text-xjtlu-gray">该界面正在开发中</p>
          <button id="placeholder-back"
                  class="xjtlu-btn xjtlu-btn--secondary mt-4">
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

  // 【修改注册部分】：删除原来的 placeholder 逻辑，注册真实的 Screen
  registerScreen(CONSTANTS.GAME_PHASE.TITLE,         new TitleScreen());
  registerScreen(CONSTANTS.GAME_PHASE.SCHOOL_SELECT, new SchoolSelectScreen());
  registerScreen(CONSTANTS.GAME_PHASE.MAP,           new MapScreen());
  registerScreen(CONSTANTS.GAME_PHASE.VN,            _vnScreen);
  registerScreen(CONSTANTS.GAME_PHASE.MONTH_SUMMARY, new MonthSummaryScreen());
  registerScreen(CONSTANTS.GAME_PHASE.TAG_SHOWCASE,  new TagShowcaseScreen());
  registerScreen(CONSTANTS.GAME_PHASE.ENDING,        new EndingScreen());

  initUIManager();

  // 【修改点】：在全局监听中加入 Bad End 检查，移除全屏红框警告
  StateManager.subscribe((state) => {
    StateManager.consumePendingStatChanges();

    // 全局 Bad End 拦截（防止死循环，只有在非结局界面才检查）
    if (state.gamePhase !== CONSTANTS.GAME_PHASE.ENDING && 
        state.gamePhase !== CONSTANTS.GAME_PHASE.TAG_SHOWCASE) {
      checkBadEndings();
    }
  });

  StateManager.setGamePhase(CONSTANTS.GAME_PHASE.TITLE);
  log('info', 'Main', '🚀 应用启动完成');

  // 调试工具
  window._testVN = (eventId) => {
    import('./src/data/events.js').then(({ EVENTS }) => {
      const event = EVENTS[eventId];
      if (!event) { console.error('事件不存在:', eventId); return; }
      StateManager.setGamePhase(CONSTANTS.GAME_PHASE.VN);
      setTimeout(() => {
        _vnScreen.startEvent(event, () => {
          StateManager.setGamePhase(CONSTANTS.GAME_PHASE.MAP);
        });
      }, 100);
    });
  };

  window._addBuff = (buff) => StateManager.addBuff(buff);
  window._testAddBuff = () => {
    StateManager.addBuff({
      buffId: 'test_buff', label: '雅思搭子', icon: 'users',
      durationType: 'months', remainingMonths: 3,
      effects: { stat_modifier: { stat: 'English_Ability',
        action: 'study_ielts', delta: 3 } },
      source_event_id: 'test',
    });
  };
});

function initLucide() {
  if (typeof lucide === 'undefined') {
    console.error('[Main] Lucide 未加载');
    return;
  }
  lucide.createIcons();
  log('info', 'Main', '✅ Lucide 初始化完成');
}