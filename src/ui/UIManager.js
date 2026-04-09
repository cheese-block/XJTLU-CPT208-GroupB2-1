/**
 * @fileoverview UI 管理器
 *
 * 职责：
 *   - 维护所有 Screen 实例的注册表
 *   - 提供唯一的场景切换入口 switchScreen()
 *   - 响应 StateManager 的 gamePhase 变化，自动切换对应 Screen
 *   - 管理顶部状态栏的常驻渲染
 */

import { CONSTANTS } from '../utils/constants.js';
import { subscribe, getState } from '../state/StateManager.js';
import { log } from '../utils/helpers.js';

// ─────────────────────────────────────────────────────────────
// Screen 注册表
// key: gamePhase 枚举值，value: Screen 实例（含 mount/unmount 方法）
// ─────────────────────────────────────────────────────────────
const _screens = new Map();

/** 当前激活的 Screen 实例 */
let _currentScreen = null;

/** 当前激活的 gamePhase */
let _currentPhase = null;

// ─────────────────────────────────────────────────────────────
// 初始化
// ─────────────────────────────────────────────────────────────

/**
 * 初始化 UIManager。
 * 订阅 StateManager，监听 gamePhase 变化并自动切换 Screen。
 * 应在所有 Screen 注册完毕后调用。
 */
export function initUIManager() {
  subscribe((state) => {
    // gamePhase 发生变化时切换 Screen
    if (state.gamePhase !== _currentPhase) {
      _currentPhase = state.gamePhase;
      _switchToPhase(state.gamePhase);
    }

    // 将最新状态分发给当前激活的 Screen
    if (_currentScreen?.onStateChange) {
      _currentScreen.onStateChange(state);
    }
  });

  log('info', 'UIManager', '✅ 初始化完成');
}

/**
 * 注册一个 Screen 实例。
 * @param {string} phase          - CONSTANTS.GAME_PHASE 枚举值
 * @param {object} screenInstance - Screen 实例，需实现 mount() / unmount()
 */
export function registerScreen(phase, screenInstance) {
  _screens.set(phase, screenInstance);
  log('debug', 'UIManager', `Screen 注册：${phase}`);
}

// ─────────────────────────────────────────────────────────────
// 场景切换
// ─────────────────────────────────────────────────────────────

/**
 * 切换到指定 gamePhase 对应的 Screen。
 * @param {string} phase
 */
function _switchToPhase(phase) {
  // 卸载当前 Screen
  if (_currentScreen?.unmount) {
    _currentScreen.unmount();
  }

  // 隐藏所有 Screen 容器
  Object.values(CONSTANTS.SCREEN_IDS).forEach((id) => {
    const el = document.getElementById(id);
    if (el) el.classList.add('hidden');
  });

  // 挂载新 Screen
  const nextScreen = _screens.get(phase);
  if (!nextScreen) {
    log('warn', 'UIManager', `未注册的 Screen：${phase}`);
    return;
  }

  _currentScreen = nextScreen;

  // 显示对应容器
  const containerId = CONSTANTS.SCREEN_IDS[phase];
  const container   = document.getElementById(containerId);
  if (container) container.classList.remove('hidden');

  // 挂载新 Screen（传入容器元素）
  nextScreen.mount(container, getState());

  log('info', 'UIManager', `切换至 Screen：${phase}`);
}

/**
 * 手动切换 Screen（不经过 gamePhase，仅供特殊情况使用）。
 * 正常情况下应通过 StateManager.setGamePhase() 触发切换。
 * @param {string} phase
 */
export function switchScreen(phase) {
  _currentPhase = phase;
  _switchToPhase(phase);
}