/**
 * @fileoverview 应用入口（M3 更新版）
 *
 * 启动顺序：
 *   1. Lucide 初始化
 *   2. StateManager 初始化（含存档恢复）
 *   3. 注册 Screen
 *   4. initUIManager()        ← UIManager 的 subscribe 排在前面
 *   5. main.js 自己的 subscribe ← 排在后面，负责消费飘字队列
 *   6. 触发主菜单
 *
 * 飘字执行顺序（依赖订阅注册顺序）：
 *   UIManager.subscribe → 读快照中的 pendingStatChanges → 渲染飘字
 *   main.js.subscribe   → consumePendingStatChanges()  → 清空队列
 */

import { CONSTANTS }     from './src/utils/constants.js';
import * as StateManager from './src/state/StateManager.js';
import { log }           from './src/utils/helpers.js';

import { initUIManager, registerScreen } from './src/ui/UIManager.js';
import { TitleScreen }                   from './src/ui/screens/TitleScreen.js';

// ─────────────────────────────────────────────────────────────
// 启动入口
// ─────────────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {

  // 1. 初始化 Lucide 图标库
  initLucide();

  // 2. 初始化状态管理器（优先从 localStorage 恢复存档）
  StateManager.initStateManager();

  // 3. 注册所有已实现的 Screen
  registerScreen(CONSTANTS.GAME_PHASE.TITLE, new TitleScreen());

  // 4. 初始化 UIManager
  //    内部会调用 subscribe()，确保其回调排在 main.js 之前
  //    UIManager 的 subscribe 负责：状态栏渲染、飘字渲染、Screen 切换
  initUIManager();

  // 5. main.js 自己的 subscribe（排在 UIManager 之后）
  //    负责：危险叠层更新、消费飘字队列（UIManager 已渲染完毕）
  StateManager.subscribe((state) => {
    updateDangerOverlay(state);
    StateManager.consumePendingStatChanges();
  });

  // 6. M1 验证已完成，禁用（避免污染存档）
  // if (CONSTANTS.MAP_DEBUG) {
  //   runM1Verification();
  // }

  // 7. 触发主菜单显示
  //    无论存档的 gamePhase 是什么，都先回到 TITLE
  StateManager.setGamePhase(CONSTANTS.GAME_PHASE.TITLE);

  log('info', 'Main', '🚀 应用启动完成');
});

// ─────────────────────────────────────────────────────────────
// Lucide 初始化
// ─────────────────────────────────────────────────────────────
function initLucide() {
  if (typeof lucide === 'undefined') {
    console.error('[Main] Lucide 未加载');
    return;
  }
  lucide.createIcons();
  log('info', 'Main', '✅ Lucide 初始化完成');
}

// ─────────────────────────────────────────────────────────────
// 危险叠层（Mental / Physical 低值时边缘变红）
// ─────────────────────────────────────────────────────────────
function updateDangerOverlay(state) {
  const overlay = document.getElementById('danger-overlay');
  if (!overlay) return;

  const danger =
    state.Mental_Health   < CONSTANTS.MENTAL_HEALTH_WARN ||
    state.Physical_Health < CONSTANTS.PHYSICAL_HEALTH_WARN;

  overlay.classList.toggle('is-active', danger);
}