/**
 * @fileoverview UI 管理器（M3 更新：集成 StatusBar）
 */

import { CONSTANTS } from '../utils/constants.js';
import { subscribe, getState, toggleLanguage, getLang } from '../state/StateManager.js';
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

/** 记录当前的语言，用于比对是否需要重绘 */
let _currentLang = 'zh';

// ─────────────────────────────────────────────────────────────
// 初始化
// ─────────────────────────────────────────────────────────────

export function initUIManager() {
  _currentLang = getLang();
  _mountStatusBarContainer();
  _mountLangButton(); // 【新增】挂载语言按钮

  _statusBar = new StatusBar();
  const sbRoot = document.getElementById('status-bar-root');
  if (sbRoot) _statusBar.mount(sbRoot);

  subscribe((state) => {
    // 【新增】语言切换检测与自动重绘
    const newLang = getLang();
    if (_currentLang !== newLang) {
      _currentLang = newLang;
      // 重新挂载当前 Screen 以应用新语言
      if (_currentPhase) _switchToPhase(_currentPhase);
      // 重新挂载状态栏
      if (sbRoot) _statusBar.mount(sbRoot);
    }

    _updateStatusBarVisibility(state);
    _updateLangButtonVisibility(state); // 【新增】控制语言按钮显示
    _statusBar?.render(state);
    _flushFloatingTexts(state);

    if (state.gamePhase !== _currentPhase) {
      _currentPhase = state.gamePhase;
      _switchToPhase(state.gamePhase);
    }

    if (_currentScreen?.onStateChange) {
      _currentScreen.onStateChange(state);
    }
  });

  log('info', 'UIManager', '✅ 初始化完成（含 StatusBar & i18n）');
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
    CONSTANTS.GAME_PHASE.COLLECTION,
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

/**
 * 切换游戏阶段（Screen 切换核心逻辑）
 * @param {string} phase 目标阶段 ID
 */
function _switchToPhase(phase) {
  // 1. 卸载当前正在显示的 Screen（清理事件监听等）
  if (_currentScreen?.unmount) {
    _currentScreen.unmount();
  }

  // 2. 隐藏所有 Screen 容器
  Object.values(CONSTANTS.SCREEN_IDS).forEach((id) => {
    /**
     * 【核心修复点 A】：
     * 如果目标是 EVENT_CARD（事件卡片），我们【不隐藏】MAP（地图）容器。
     * 这样地图就会留在底层，作为事件卡片的半透明背景。
     */
    if (phase === CONSTANTS.GAME_PHASE.EVENT_CARD && id === CONSTANTS.SCREEN_IDS.MAP) {
      return; 
    }
    
    const el = document.getElementById(id);
    if (el) el.classList.add('hidden');
  });

  // 3. 获取目标 Screen 实例
  const nextScreen = _screens.get(phase);
  if (!nextScreen) {
    log('warn', 'UIManager', `未注册的 Screen：${phase}`);
    return;
  }

  _currentScreen = nextScreen;

  // 4. 获取目标容器并显示
  const containerId = CONSTANTS.SCREEN_IDS[phase];
  const container   = document.getElementById(containerId);

  if (container) {
    container.classList.remove('hidden');

    /**
     * 【核心修复点 B】：动画同步
     * - 如果是普通界面：执行 0.6s 的渐变淡入。
     * - 如果是 EVENT_CARD：立即显示（opacity=1），不设 transition。
     *   这是为了让卡片弹出的瞬间，背景模糊效果能同步出现，不产生视觉延迟。
     */
    if (phase !== CONSTANTS.GAME_PHASE.EVENT_CARD) {
      container.style.opacity = '0';
      container.style.transition = 'opacity 0.6s ease';
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          container.style.opacity = '1';
        });
      });
    } else {
      container.style.opacity = '1';
      container.style.transition = 'none';
    }

    // 5. 处理顶部状态栏占位（Padding）
    // TITLE、SCHOOL_SELECT 和 EVENT_CARD 不需要顶部留白
    const needsPadding = ![
      CONSTANTS.GAME_PHASE.TITLE,
      CONSTANTS.GAME_PHASE.SCHOOL_SELECT,
      CONSTANTS.GAME_PHASE.EVENT_CARD,
      CONSTANTS.GAME_PHASE.COLLECTION,   // 新增
    ].includes(phase);
    
    container.style.paddingTop = needsPadding ? '4.5rem' : '';
  }

  // 6. 正式挂载目标 Screen
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

/**
 * 挂载全局语言切换按钮
 */
function _mountLangButton() {
  const app = document.getElementById('app');
  if (!app || document.getElementById('global-lang-btn')) return;

  const btn = document.createElement('button');
  btn.id = 'global-lang-btn';
  // 【修复 1】：将 z-[9999] 改为 z-[9900]，使其位于弹窗层 (9990) 之下
  btn.className = `
    absolute bottom-6 left-6 z-[9900] 
    w-10 h-10 rounded-full 
    bg-white/90 backdrop-blur-md border border-gray-200 
    shadow-md hover:bg-white hover:shadow-lg hover:scale-105 
    transition-all hidden
  `;
  
  btn.addEventListener('click', () => toggleLanguage());
  app.appendChild(btn);
}

/**
 * 控制语言按钮的可见性与文本
 */
function _updateLangButtonVisibility(state) {
  const btn = document.getElementById('global-lang-btn');
  if (!btn) return;

  // 【修复 2】：移除了 CONSTANTS.GAME_PHASE.COLLECTION
  const show = [
    CONSTANTS.GAME_PHASE.TITLE,
    CONSTANTS.GAME_PHASE.MAP,
    CONSTANTS.GAME_PHASE.SCHOOL_SELECT,
    CONSTANTS.GAME_PHASE.MONTH_SUMMARY
  ].includes(state.gamePhase);
  
  if (show) {
    btn.classList.remove('hidden');
    const isZh = getLang() === 'zh';
    
    // 斜线分割布局
    btn.innerHTML = `
      <div class="relative w-full h-full pointer-events-none">
        <span class="absolute top-1.5 left-1.5 text-[0.55rem] font-black ${isZh ? 'text-xjtlu-blue' : 'text-gray-400'} leading-none">中</span>
        <div class="absolute top-1/2 left-1/2 w-7 h-px bg-gray-300 -translate-x-1/2 -translate-y-1/2 -rotate-45"></div>
        <span class="absolute bottom-1.5 right-1.5 text-[0.5rem] font-black ${!isZh ? 'text-xjtlu-blue' : 'text-gray-400'} leading-none">EN</span>
      </div>
    `;
  } else {
    btn.classList.add('hidden');
  }
}