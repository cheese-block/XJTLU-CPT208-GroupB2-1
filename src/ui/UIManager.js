/**
 * @fileoverview UI 管理器（M3 更新：集成 StatusBar）
 */

import { CONSTANTS } from '../utils/constants.js';
import { subscribe, getState } from '../state/StateManager.js';
import { log } from '../utils/helpers.js';
import { StatusBar } from './components/StatusBar.js';

// ─────────────────────────────────────────────────────────────
// Screen 注册表
// ─────────────────────────────────────────────────────────────
const _screens = new Map();

/** @type {StatusBar|null} */
let _statusBar = null;

/** 当前激活的 Screen 实例 */
let _currentScreen = null;

/** 当前激活的 gamePhase */
let _currentPhase = null;

// ─────────────────────────────────────────────────────────────
// 初始化
// ─────────────────────────────────────────────────────────────

export function initUIManager() {
  // 注入状态栏容器到 #app 顶部
  _mountStatusBarContainer();

  // 实例化并挂载 StatusBar
  _statusBar = new StatusBar();
  const sbRoot = document.getElementById('status-bar-root');
  if (sbRoot) {
    _statusBar.mount(sbRoot);
  }

  // 订阅状态变化
  subscribe((state) => {
    // 状态栏：始终更新（除 TITLE 和 SCHOOL_SELECT 界面外不显示）
    _updateStatusBarVisibility(state);
    _statusBar?.render(state);

    // 飘字：消费 pendingStatChanges
    _flushFloatingTexts(state);

    // Screen 切换
    if (state.gamePhase !== _currentPhase) {
      _currentPhase = state.gamePhase;
      _switchToPhase(state.gamePhase);
    }

    // 分发给当前 Screen
    if (_currentScreen?.onStateChange) {
      _currentScreen.onStateChange(state);
    }
  });

  log('info', 'UIManager', '✅ 初始化完成（含 StatusBar）');
}

/**
 * 在 #app 内部、所有 Screen 之前插入状态栏容器。
 */
function _mountStatusBarContainer() {
  const app = document.getElementById('app');
  if (!app || document.getElementById('status-bar-root')) return;

  const root = document.createElement('div');
  root.id        = 'status-bar-root';
  // 【修改】：将 z-50 改为 z-[300]，确保在事件卡片之上
  root.className = 'absolute top-0 left-0 right-0 z-[300]';

  app.insertBefore(root, app.firstChild);
}

/**
 * 控制状态栏显示/隐藏。
 * TITLE 和 SCHOOL_SELECT 界面不显示状态栏。
 * @param {object} state
 */
function _updateStatusBarVisibility(state) {
  const root = document.getElementById('status-bar-root');
  if (!root) return;

  const hideOnPhases = [
    CONSTANTS.GAME_PHASE.TITLE,
    CONSTANTS.GAME_PHASE.SCHOOL_SELECT,
  ];

  const shouldHide = hideOnPhases.includes(state.gamePhase);
  root.classList.toggle('hidden', shouldHide);
}

// ─────────────────────────────────────────────────────────────
// 飘字：消费 pendingStatChanges
// ─────────────────────────────────────────────────────────────

/**
 * 从 state.pendingStatChanges 中取出飘字队列并渲染。
 * 注意：此处直接读 state 快照中的队列，真正清空由
 * StateManager.consumePendingStatChanges() 负责。
 * 为避免重复渲染，UIManager 在 subscribe 回调中
 * 调用 consumePendingStatChanges() 后再触发飘字。
 */
function _flushFloatingTexts(state) {
  // pendingStatChanges 由 StateManager 在 applyStatDelta 时填充，
  // 在 subscribe 回调触发前不会被消费。
  // 此处直接使用 state 快照中的数据驱动飘字，
  // 实际清空在 main.js 的 subscribe 中（两处订阅，各自消费）。
  if (!state.pendingStatChanges || state.pendingStatChanges.length === 0) return;

  state.pendingStatChanges.forEach((change, i) => {
    setTimeout(() => {
      _statusBar?.triggerFloatingText(change.stat, change.delta, change.label);
    }, i * 150);
  });
}

// ─────────────────────────────────────────────────────────────
// Screen 注册 / 切换
// ─────────────────────────────────────────────────────────────

export function registerScreen(phase, screenInstance) {
  _screens.set(phase, screenInstance);
  log('debug', 'UIManager', `Screen 注册：${phase}`);
}

function _switchToPhase(phase) {
  if (_currentScreen?.unmount) {
    _currentScreen.unmount();
  }

  Object.values(CONSTANTS.SCREEN_IDS).forEach((id) => {
    // 【核心修复】：当切入 EVENT_CARD 时，不隐藏 MAP 容器，使其作为底层背景透出
    if (phase === CONSTANTS.GAME_PHASE.EVENT_CARD && id === CONSTANTS.SCREEN_IDS.MAP) {
      return; 
    }
    const el = document.getElementById(id);
    if (el) el.classList.add('hidden');
  });

  const nextScreen = _screens.get(phase);
  if (!nextScreen) {
    log('warn', 'UIManager', `未注册的 Screen：${phase}`);
    return;
  }

  _currentScreen = nextScreen;

  const containerId = CONSTANTS.SCREEN_IDS[phase];
  const container   = document.getElementById(containerId);

  if (container) {
    container.classList.remove('hidden');

    // 淡入动画
    container.style.opacity = '0';
    container.style.transition = 'opacity 0.6s ease';
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        container.style.opacity = '1';
      });
    });

    // 【修改】：EVENT_CARD 自带居中排版，不需要像其他界面那样硬塞顶部 Padding
    const needsPadding = ![
      CONSTANTS.GAME_PHASE.TITLE,
      CONSTANTS.GAME_PHASE.SCHOOL_SELECT,
      CONSTANTS.GAME_PHASE.EVENT_CARD, 
    ].includes(phase);
    
    container.style.paddingTop = needsPadding ? '4.5rem' : '';
  }

  nextScreen.mount(container, getState());
  log('info', 'UIManager', `切换至 Screen：${phase}`);
}

export function switchScreen(phase) {
  _currentPhase = phase;
  _switchToPhase(phase);
}

// 【修改】：在文件末尾追加以下导出函数
export function previewEffects(effects, hasExactBuff) {
  _statusBar?.showPreview(effects, hasExactBuff);
}

export function clearPreview() {
  _statusBar?.clearPreview();
}