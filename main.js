/**
 * @fileoverview 应用入口（M2 更新）
 *
 * M2 新增：
 *   - 注册并启动 UIManager
 *   - 注册 TitleScreen
 *   - 移除 M0 boot screen 的临时验证 UI
 *   - M1 验证代码仅在 DEBUG 模式下运行
 *
 * 启动流程：
 *   initLucide
 *   → initStateManager（含存档恢复）
 *   → 注册所有 Screen
 *   → initUIManager（订阅 state，驱动 Screen 切换）
 *   → setGamePhase(TITLE)（触发 TitleScreen.mount）
 */

import { CONSTANTS }       from './src/utils/constants.js';
import { getStateSummary } from './src/state/GameState.js';
import * as StateManager   from './src/state/StateManager.js';
import { log, formatTimestamp } from './src/utils/helpers.js';

// UI 层
import { initUIManager, registerScreen } from './src/ui/UIManager.js';
import { TitleScreen }   from './src/ui/screens/TitleScreen.js';

// ─────────────────────────────────────────────────────────────
// 启动入口
// ─────────────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {

  // 1. 初始化 Lucide 图标（需要最先执行）
  initLucide();

  // 2. 初始化状态管理器（含存档恢复）
  StateManager.initStateManager();

  // 3. 注册全局副作用监听（飘字 + 危险叠层）
  //    独立于 UIManager，始终监听
  StateManager.subscribe((state) => {
    updateDangerOverlay(state);
    flushFloatingTexts();
  });

  // 4. 注册所有 Screen
  registerScreen(CONSTANTS.GAME_PHASE.TITLE, new TitleScreen());
  // M3+ 的 Screen 在后续里程碑中注册：
  // registerScreen(CONSTANTS.GAME_PHASE.SCHOOL_SELECT, new SchoolSelectScreen());
  // registerScreen(CONSTANTS.GAME_PHASE.MAP,           new MapScreen());
  // ...

  // 5. 初始化 UIManager（开始监听 gamePhase 变化）
  initUIManager();

  // 6. 触发初始 Screen 显示
  //    若存档的 gamePhase 不是 TITLE（如玩家上次在 MAP 界面），
  //    此处统一跳转到 TITLE，让玩家从主菜单进入
  StateManager.setGamePhase(CONSTANTS.GAME_PHASE.TITLE);

  // 7. 仅在 DEBUG 模式下运行 M1 验证
  if (CONSTANTS.MAP_DEBUG) {
    runM1Verification();
  }

  log('info', 'Main', '🚀 应用启动完成');
});

// ─────────────────────────────────────────────────────────────
// Lucide 初始化
// ─────────────────────────────────────────────────────────────
function initLucide() {
  if (typeof lucide === 'undefined') {
    console.error('[Main] Lucide 未加载，请检查 CDN');
    return;
  }
  lucide.createIcons();
  log('info', 'Main', '✅ Lucide 初始化完成');
}

// ─────────────────────────────────────────────────────────────
// 危险叠层（全局副作用，与当前 Screen 无关）
// ─────────────────────────────────────────────────────────────
function updateDangerOverlay(state) {
  const overlay = document.getElementById('danger-overlay');
  if (!overlay) return;
  const danger =
    state.Mental_Health   < CONSTANTS.MENTAL_HEALTH_WARN ||
    state.Physical_Health < CONSTANTS.PHYSICAL_HEALTH_WARN;
  overlay.classList.toggle('is-active', danger);
}

// ─────────────────────────────────────────────────────────────
// 飘字系统（全局，挂载在 #floating-text-layer）
// ─────────────────────────────────────────────────────────────
function flushFloatingTexts() {
  const changes = StateManager.consumePendingStatChanges();
  changes.forEach((change, i) => {
    setTimeout(() => {
      const type = change.delta > 0 ? 'positive' : 'negative';
      const text = `${change.delta > 0 ? '+' : ''}${change.delta} ${change.label}`;
      // 飘字出现在屏幕中央偏上，避免被 UI 遮挡
      spawnFloatingText(text, type, window.innerWidth / 2 + (i - 1) * 120, window.innerHeight * 0.35);
    }, i * 150);
  });
}

function spawnFloatingText(text, type, x, y) {
  const layer = document.getElementById('floating-text-layer');
  if (!layer) return;
  const el = document.createElement('span');
  el.className   = `floating-text floating-text--${type}`;
  el.textContent = text;
  el.style.left  = `${x + (Math.random() - 0.5) * 30}px`;
  el.style.top   = `${y}px`;
  layer.appendChild(el);
  el.addEventListener('animationend', () => el.remove(), { once: true });
}

// ─────────────────────────────────────────────────────────────
// M1 验证（DEBUG 模式专用，与 M2 功能完全隔离）
// ─────────────────────────────────────────────────────────────
function runM1Verification() {
  console.group('%c🦢 M1 验证报告（DEBUG）', 'font-size:1rem;font-weight:900;color:#004B9B;');

  let passed = 0, failed = 0;
  function assert(label, condition, info = '') {
    if (condition) { console.log(`%c✅ ${label}`, 'color:#1E8A44;font-weight:700;', info); passed++; }
    else           { console.error(`❌ ${label}`, info); failed++; }
  }

  // 验证前重置，保证干净环境
  StateManager.resetGame();

  const s = StateManager.getState();
  assert('初始 currentMonth = 1',     s.currentMonth === 1);
  assert('初始 AP = 5',               s.AP === 5);
  assert('初始 Mental_Health = 80',   s.Mental_Health === 80);
  assert('初始 Physical_Health = 80', s.Physical_Health === 80);
  assert('初始 Money = 50000',        s.Money === 50000);
  assert('初始 English_Ability = 40', s.English_Ability === 40);

  StateManager.applyStatDelta({ Mental_Health: -90 });
  assert('clamp 下限 ≥ 0', StateManager.getState().Mental_Health === 0);
  StateManager.applyStatDelta({ Mental_Health: +200 });
  assert('clamp 上限 ≤ 100', StateManager.getState().Mental_Health === 100);

  const ap1 = StateManager.consumeAP(1);
  assert('consumeAP 成功', ap1 === true);
  for (let i = 0; i < StateManager.getState().AP; i++) StateManager.consumeAP(1);
  assert('AP 耗尽返回 false', StateManager.consumeAP(1) === false);
  StateManager.resetAPForNewMonth();

  StateManager.addTag('T');
  assert('addTag',    StateManager.hasTag('T'));
  StateManager.removeTag('T');
  assert('removeTag', !StateManager.hasTag('T'));

  StateManager.saveGame();
  assert('hasSave',          StateManager.hasSave());
  assert('getSavePreview',   StateManager.getSavePreview() !== null);
  assert('validateState ok', StateManager.validateState(StateManager.getState()).valid);
  assert('validateState bad', !StateManager.validateState({ x: 1 }).valid);

  const { newMonth } = StateManager.advanceMonth();
  assert('advanceMonth → 2', newMonth === 2);

  // 验证结束，重置回干净状态（不存档）
  StateManager.resetGame();

  console.log('%c─────────────────────────', 'color:#6B7280');
  console.log(
    `%c结果：${passed} 通过 / ${failed} 失败`,
    failed > 0 ? 'color:#D93025;font-weight:900;' : 'color:#1E8A44;font-weight:900;'
  );
  console.groupEnd();
}