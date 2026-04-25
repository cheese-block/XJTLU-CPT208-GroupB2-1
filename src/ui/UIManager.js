/**
 * @fileoverview UI 管理器（M3 更新：集成 StatusBar）
 */

import { CONSTANTS } from '../utils/constants.js';
import { subscribe, getState, toggleLanguage, getLang, setGamePhase } from '../state/StateManager.js';
import { log } from '../utils/helpers.js';
import { t } from '../utils/i18n.js';
import { StatusBar } from './components/StatusBar.js';
import { showConfirm } from './components/ConfirmModal.js';

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
  _mountSettingsMenu();

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
    _updateSettingsVisibility(state);
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
  // 确保在事件卡片之上
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

  // 【修改】：将 TAG_SHOWCASE 和 ENDING 加入隐藏列表，保持沉浸感
  const hideOnPhases = [
    CONSTANTS.GAME_PHASE.TITLE,
    CONSTANTS.GAME_PHASE.SCHOOL_SELECT,
    CONSTANTS.GAME_PHASE.COLLECTION,
    CONSTANTS.GAME_PHASE.TAG_SHOWCASE,
    CONSTANTS.GAME_PHASE.ENDING,
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
    // 【修改】：将 TAG_SHOWCASE 和 ENDING 加入无 Padding 白名单，使其全屏显示
    const needsPadding = ![
      CONSTANTS.GAME_PHASE.TITLE,
      CONSTANTS.GAME_PHASE.SCHOOL_SELECT,
      CONSTANTS.GAME_PHASE.EVENT_CARD,
      CONSTANTS.GAME_PHASE.COLLECTION,
      CONSTANTS.GAME_PHASE.TAG_SHOWCASE,
      CONSTANTS.GAME_PHASE.ENDING,
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
 * 挂载全局设置按钮与下拉菜单
 */
function _mountSettingsMenu() {
  const app = document.getElementById('app');
  if (!app || document.getElementById('global-settings-wrap')) return;

  const wrap = document.createElement('div');
  wrap.id = 'global-settings-wrap';
  wrap.className = `
    absolute top-6 right-6 z-[9900]
    hidden flex flex-col items-end gap-2
  `;

  wrap.innerHTML = `
    <button
      id="global-settings-btn"
      class="w-10 h-10 rounded-full flex items-center justify-center
             bg-white/90 backdrop-blur-md border border-gray-200
             shadow-md hover:bg-white hover:shadow-lg hover:scale-105
             transition-all"
      aria-haspopup="true"
      aria-expanded="false"
      title="Settings"
    >
      <i data-lucide="settings" class="lucide w-4 h-4 text-xjtlu-navy"></i>
    </button>

    <div
      id="global-settings-menu"
      class="hidden w-max rounded-xl border border-gray-200 bg-white/95 backdrop-blur-md shadow-xl p-2"
    >
      <button
        id="settings-action-lang"
        class="flex items-center gap-2 w-full text-left text-sm px-3 py-2 rounded-lg text-xjtlu-navy hover:bg-gray-100 transition-colors"
      >
      </button>
      <button
        id="settings-action-title"
        class="flex items-center gap-2 w-full text-left text-sm px-3 py-2 rounded-lg text-xjtlu-navy hover:bg-gray-100 transition-colors"
      >
      </button>
    </div>
  `;

  app.appendChild(wrap);

  const btn = wrap.querySelector('#global-settings-btn');
  const menu = wrap.querySelector('#global-settings-menu');
  const langBtn = wrap.querySelector('#settings-action-lang');
  const titleBtn = wrap.querySelector('#settings-action-title');

  const closeMenu = () => {
    menu?.classList.add('hidden');
    btn?.setAttribute('aria-expanded', 'false');
  };

  btn?.addEventListener('click', (e) => {
    e.stopPropagation();
    const willOpen = menu?.classList.contains('hidden');
    if (willOpen) {
      menu?.classList.remove('hidden');
      btn.setAttribute('aria-expanded', 'true');
    } else {
      closeMenu();
    }
  });

  langBtn?.addEventListener('click', () => {
    toggleLanguage();
    closeMenu();
  });

  titleBtn?.addEventListener('click', () => {
    closeMenu();
    showConfirm({
      title: t('return_title_confirm_title'),
      message: t('return_title_confirm_desc'),
      confirmText: t('settings_return_title'),
      cancelText: t('cancel'),
      confirmVariant: 'warning',
      onConfirm: () => setGamePhase(CONSTANTS.GAME_PHASE.TITLE),
    });
  });

  document.addEventListener('click', (e) => {
    if (!(e.target instanceof Element)) return;
    if (!wrap.contains(e.target)) closeMenu();
  });

  if (typeof lucide !== 'undefined') lucide.createIcons({ root: wrap });
}

/**
 * 控制设置按钮可见性、位置与菜单文本
 */
function _updateSettingsVisibility(state) {
  const wrap = document.getElementById('global-settings-wrap');
  if (!wrap) return;

  const menu = wrap.querySelector('#global-settings-menu');
  const settingsBtn = wrap.querySelector('#global-settings-btn');
  const langBtn = wrap.querySelector('#settings-action-lang');
  const titleBtn = wrap.querySelector('#settings-action-title');

  const show = [
    CONSTANTS.GAME_PHASE.TITLE,
    CONSTANTS.GAME_PHASE.MAP,
    CONSTANTS.GAME_PHASE.SCHOOL_SELECT,
    CONSTANTS.GAME_PHASE.MONTH_SUMMARY
  ].includes(state.gamePhase);
  
  if (show) {
    wrap.classList.remove('hidden');

    // 动态避让顶部状态栏，避免遮挡地图元素
    if (state.gamePhase === CONSTANTS.GAME_PHASE.MAP) {
      wrap.classList.remove('top-6');
      wrap.classList.add('top-20');
    } else {
      wrap.classList.remove('top-20');
      wrap.classList.add('top-6');
    }

    if (langBtn) {
      langBtn.innerHTML = `
        <i data-lucide="languages" class="lucide w-4 h-4"></i>
        ${t('settings_lang')}
      `;
    }

    if (titleBtn) {
      titleBtn.innerHTML = `
        <i data-lucide="home" class="lucide w-4 h-4"></i>
        ${t('settings_return_title')}
      `;
      titleBtn.classList.toggle('hidden', state.gamePhase === CONSTANTS.GAME_PHASE.TITLE);
    }

    // 切屏时始终收起菜单，避免浮层残留
    menu?.classList.add('hidden');
    settingsBtn?.setAttribute('aria-expanded', 'false');
    if (typeof lucide !== 'undefined') lucide.createIcons({ root: wrap });
  } else {
    wrap.classList.add('hidden');
    menu?.classList.add('hidden');
    settingsBtn?.setAttribute('aria-expanded', 'false');
  }
}