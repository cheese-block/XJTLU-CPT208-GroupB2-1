/**
 * @fileoverview 主菜单 Screen
 *
 * 功能：
 *   - 检测 localStorage 存档，决定是否显示"继续游戏"按钮
 *   - 显示存档进度预览（学期 + 月份 + 存档时间）
 *   - "新游戏"按钮：若有存档则弹出确认框，否则直接开始
 *   - "继续游戏"按钮：恢复存档并进入游戏
 *
 * Screen 接口约定（UIManager 依赖）：
 *   mount(container, state)  — 渲染并绑定事件
 *   unmount()                — 清理事件监听，防止内存泄漏
 *   onStateChange(state)     — 响应后续状态变化（此 Screen 暂不需要）
 */

import * as StateManager from '../../state/StateManager.js';
import { showConfirm }   from '../components/ConfirmModal.js';
import { CONSTANTS }     from '../../utils/constants.js';
import { log, isMobile } from '../../utils/helpers.js';
import { t }             from '../../utils/i18n.js';

export class TitleScreen {
  constructor() {
    /** @type {HTMLElement|null} */
    this._container = null;

    // 绑定引用（用于 unmount 时移除监听）
    this._onContinue  = null;
    this._onNewGame   = null;
    this._onHowToPlay = null;
    this._onCollection = null;
  }

  // ───────────────────────────────────────────────────────────
  // Screen 接口实现
  // ───────────────────────────────────────────────────────────

  /**
   * 挂载：渲染 DOM 并绑定事件。
   * @param {HTMLElement} container
   * @param {object} _state  当前游戏状态（TitleScreen 主要依赖 localStorage，不依赖 state）
   */
  mount(container, _state) {
    this._container = container;

    const savePreview = StateManager.getSavePreview();
    
    if (isMobile()) {
      container.innerHTML = this._buildMobileHTML(savePreview);
    } else {
      container.innerHTML = this._buildHTML(savePreview);
    }

    // 初始化 Lucide 图标
    if (typeof lucide !== 'undefined') lucide.createIcons();

    this._bindEvents(savePreview);
    log('info', 'TitleScreen', '✅ 已挂载');
  }

  /**
   * 卸载：移除事件监听，清空 DOM。
   */
  unmount() {
    const continueBtn = this._container?.querySelector('#btn-continue');
    const newGameBtn  = this._container?.querySelector('#btn-new-game');
    const howToBtn    = this._container?.querySelector('#btn-how-to-play');
    const collectionBtn = this._container?.querySelector('#btn-collection');

    if (continueBtn && this._onContinue)  continueBtn.removeEventListener('click', this._onContinue);
    if (newGameBtn  && this._onNewGame)   newGameBtn.removeEventListener('click',  this._onNewGame);
    if (howToBtn    && this._onHowToPlay) howToBtn.removeEventListener('click',    this._onHowToPlay);
    if (collectionBtn && this._onCollection) collectionBtn.removeEventListener('click', this._onCollection);

    this._container = null;
    log('info', 'TitleScreen', '已卸载');
  }

  /**
   * 响应状态变化（TitleScreen 不需要响应，留空）。
   */
  onStateChange(_state) {}

  // ───────────────────────────────────────────────────────────
  // HTML 构建
  // ───────────────────────────────────────────────────────────

  /**
   * 构建主菜单完整 HTML。
   * @param {object|null} savePreview  存档预览数据
   * @returns {string}
   */
  _buildHTML(savePreview) {
    const hasSave = savePreview !== null;

    return `
      <!--
        主菜单布局：
        全屏白底，垂直居中，
        左侧：吉祥物 + 装饰，右侧：标题 + 按钮组
      -->
      <div class="w-full h-full flex items-center justify-center
                  bg-white relative overflow-hidden">

        <!-- 背景装饰：右下角大圆 -->
        <div class="
          absolute -bottom-32 -right-32
          w-96 h-96 rounded-full
          bg-xjtlu-navy opacity-[0.04]
          pointer-events-none
        "></div>

        <!-- 背景装饰：左上角小圆 -->
        <div class="
          absolute -top-16 -left-16
          w-64 h-64 rounded-full
          bg-xjtlu-blue opacity-[0.04]
          pointer-events-none
        "></div>

        <!-- 主内容区：两栏 -->
        <div class="
          relative z-10
          flex flex-col md:flex-row
          items-center justify-center
          gap-8 md:gap-20
          px-8 py-12 md:py-0
          w-full max-w-4xl overflow-y-auto
        ">

          <!-- ── 左栏：吉祥物 + 学院标签 ── -->
          <div class="flex flex-col items-center gap-4 animate-fade-in shrink-0">

            <!-- 吉祥物 SVG -->
            <div id="title-mascot" class="w-32 h-32 md:w-44 md:h-44 drop-shadow-lg">
              ${this._getMascotSVG()}
            </div>

            <!-- 学院标签 -->
            <div class="flex items-center gap-2">
              <span class="tag-badge tag-badge--blue text-xs">
                <i data-lucide="cpu" class="lucide w-3 h-3"></i>
                ${t('school_label')}
              </span>
            </div>
            <!-- 底部 flavor text -->
            <p class="text-center text-xs text-xjtlu-gray max-w-[180px] leading-relaxed italic">
              ${t('mascot_quote')}
            </p>
          </div>

          <!-- ── 右栏：标题 + 按钮组 ── -->
          <div class="flex flex-col items-center md:items-start gap-6 animate-fade-in w-full max-w-xs shrink-0">
            <div class="flex flex-col gap-1 items-center md:items-start text-center md:text-left">
              <p class="text-[0.6rem] md:text-xs font-bold text-xjtlu-blue tracking-[0.25em] uppercase">XJTLU Postgrad Simulator</p>
              <h1 class="text-3xl md:text-4xl font-black text-xjtlu-navy leading-tight">
                ${t('title_main')}
              </h1>
              <p class="text-xs md:text-sm text-xjtlu-gray mt-1 leading-relaxed">
                ${t('title_sub')}
              </p>
            </div>

            <div class="w-full h-px bg-gray-100"></div>

            <div class="flex flex-col gap-2 md:gap-3 w-full">
              ${hasSave ? this._buildContinueBlock(savePreview) : ''}
              <button id="btn-new-game" class="xjtlu-btn w-full justify-center ${hasSave ? 'xjtlu-btn--secondary py-2' : 'xjtlu-btn--primary text-sm md:text-base py-2.5 md:py-3'}">
                <i data-lucide="${hasSave ? 'rotate-ccw' : 'play'}" class="lucide w-4 h-4"></i>
                ${hasSave ? t('btn_restart') : t('btn_new_game')}
              </button>
              <div class="flex gap-2">
                <button id="btn-how-to-play" class="xjtlu-btn xjtlu-btn--ghost flex-1 justify-center py-2">
                  <i data-lucide="book-open" class="lucide w-4 h-4"></i>
                  ${t('btn_how_to_play')}
                </button>
                <button id="btn-collection" class="xjtlu-btn xjtlu-btn--secondary flex-1 justify-center py-2">
                  <i data-lucide="book-marked" class="lucide w-4 h-4"></i>
                  ${t('btn_collection')}
                </button>
              </div>
            </div>

            <!-- 版本号 -->
            <p class="text-[0.6rem] md:text-[0.65rem] text-gray-300 tracking-widest self-end">
              v${CONSTANTS.SAVE_VERSION} · MVP Demo
            </p>

          </div>
        </div>
      </div>
    `;
  }

  /**
   * 构建"继续游戏"区块（含存档进度预览）。
   * @param {object} savePreview
   * @returns {string}
   */
  _buildContinueBlock(savePreview) {
    return `
      <!-- 继续游戏按钮 -->
      <button
        id="btn-continue"
        class="xjtlu-btn xjtlu-btn--primary w-full justify-center text-base py-3 relative overflow-hidden"
      >
        <i data-lucide="play-circle" class="lucide w-5 h-5"></i>
        ${t('btn_continue')}
      </button>

      <!-- 存档进度预览卡片 -->
      <div class="w-full rounded-xl border border-gray-100 bg-gray-50 px-4 py-3 flex items-center gap-3">
        <i data-lucide="save" class="lucide w-4 h-4 text-xjtlu-gray shrink-0"></i>
        <div class="flex flex-col gap-0.5 min-w-0">
          <span class="text-xs font-bold text-xjtlu-navy truncate">
            ${savePreview.phaseLabel} · ${savePreview.monthLabel}
          </span>
          <span class="text-[0.65rem] text-xjtlu-gray">
            ${t('last_save')}${savePreview.timestamp}
          </span>
        </div>
      </div>
    `;
  }

  /**
   * 吉祥物图片
   * @returns {string}
   */
  _getMascotSVG() {
    return `
      <img
        src="assets/images/logo.png"
        alt="西浦申研模拟器吉祥物"
        style="width:100%; height:100%; object-fit:contain;"
        draggable="false"
      />
    `;
  }

  /**
   * 构建移动端专属 HTML (纯垂直布局)。
   * @param {object|null} savePreview
   * @returns {string}
   */
  _buildMobileHTML(savePreview) {
    const hasSave = savePreview !== null;

    return `
      <div class="w-full h-full flex flex-col items-center justify-center bg-white relative overflow-hidden px-6 py-8">
        
        <!-- 背景装饰 -->
        <div class="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-xjtlu-navy opacity-[0.03] pointer-events-none"></div>
        <div class="absolute -bottom-10 -left-10 w-40 h-40 rounded-full bg-xjtlu-blue opacity-[0.03] pointer-events-none"></div>

        <!-- 顶部：吉祥物 -->
        <div class="flex flex-col items-center gap-2 mb-6 animate-fade-in">
          <div id="title-mascot" class="w-28 h-28 drop-shadow-md">
            ${this._getMascotSVG()}
          </div>
          <span class="tag-badge tag-badge--blue text-[0.6rem] px-2 py-0.5">
            <i data-lucide="cpu" class="lucide w-3 h-3"></i>
            ${t('school_label')}
          </span>
        </div>

        <!-- 中部：标题 -->
        <div class="flex flex-col items-center text-center gap-1 mb-8 animate-fade-in">
          <p class="text-[0.55rem] font-bold text-xjtlu-blue tracking-[0.2em] uppercase">XJTLU Postgrad Simulator</p>
          <h1 class="text-2xl font-black text-xjtlu-navy leading-tight">
            ${t('title_main')}
          </h1>
          <p class="text-[0.65rem] text-xjtlu-gray mt-1 max-w-[200px]">
            ${t('title_sub')}
          </p>
        </div>

        <!-- 底部：按钮组 -->
        <div class="w-full flex flex-col gap-3 max-w-[260px] animate-fade-in">
          ${hasSave ? `
            <button id="btn-continue" class="xjtlu-btn xjtlu-btn--primary w-full justify-center py-3.5 text-base shadow-lg">
              <i data-lucide="play-circle" class="lucide w-5 h-5"></i>
              ${t('btn_continue')}
            </button>
            <div class="w-full rounded-xl border border-gray-100 bg-gray-50 px-4 py-2 flex items-center gap-3">
              <i data-lucide="save" class="lucide w-3.5 h-3.5 text-xjtlu-gray shrink-0"></i>
              <div class="flex flex-col gap-0.5 min-w-0">
                <span class="text-[0.65rem] font-bold text-xjtlu-navy truncate">
                  ${savePreview.phaseLabel} · ${savePreview.monthLabel}
                </span>
              </div>
            </div>
          ` : ''}

          <button id="btn-new-game" class="xjtlu-btn w-full justify-center py-3.5 ${hasSave ? 'xjtlu-btn--secondary' : 'xjtlu-btn--primary shadow-lg'}">
            <i data-lucide="${hasSave ? 'rotate-ccw' : 'play'}" class="lucide w-4 h-4"></i>
            ${hasSave ? t('btn_restart') : t('btn_new_game')}
          </button>

          <div class="flex gap-2 w-full">
            <button id="btn-how-to-play" class="xjtlu-btn xjtlu-btn--ghost flex-1 justify-center py-3">
              <i data-lucide="book-open" class="lucide w-4 h-4"></i>
              ${t('btn_how_to_play')}
            </button>
            <button id="btn-collection" class="xjtlu-btn xjtlu-btn--secondary flex-1 justify-center py-3">
              <i data-lucide="book-marked" class="lucide w-4 h-4"></i>
              ${t('btn_collection')}
            </button>
          </div>
        </div>

        <!-- 版本号 -->
        <p class="absolute bottom-4 right-6 text-[0.55rem] text-gray-300 tracking-widest">
          v${CONSTANTS.SAVE_VERSION} · MVP
        </p>

      </div>
    `;
  }

  // ───────────────────────────────────────────────────────────
  // 事件绑定
  // ───────────────────────────────────────────────────────────

  /**
   * 绑定所有按钮事件。
   * @param {object|null} savePreview
   */
  _bindEvents(savePreview) {
    const hasSave = savePreview !== null;

    // ── 继续游戏 ────────────────────────────────────────────
    if (hasSave) {
      this._onContinue = () => this._handleContinue();
      this._container
        ?.querySelector('#btn-continue')
        ?.addEventListener('click', this._onContinue);
    }

    // ── 新游戏 / 重新开始 ────────────────────────────────────
    this._onNewGame = () => this._handleNewGame(hasSave);
    this._container
      ?.querySelector('#btn-new-game')
      ?.addEventListener('click', this._onNewGame);

    // ── 怎么玩（占位）────────────────────────────────────────
    this._onHowToPlay = () => this._handleHowToPlay();
    this._container
      ?.querySelector('#btn-how-to-play')
      ?.addEventListener('click', this._onHowToPlay);

    // ── 结局图鉴 ────────────────────────────────────────────
    this._onCollection = () => StateManager.setGamePhase(CONSTANTS.GAME_PHASE.COLLECTION);
    this._container
      ?.querySelector('#btn-collection')
      ?.addEventListener('click', this._onCollection);
  }

  // ───────────────────────────────────────────────────────────
  // 事件处理
  // ───────────────────────────────────────────────────────────

  /**
   * 继续游戏：存档已在 initStateManager 时恢复，
   * 直接跳转到游戏内的对应 Screen。
   */
  _handleContinue() {
    log('info', 'TitleScreen', '继续游戏');

    // 直接读存档中的进度，不依赖内存 gamePhase
    // （内存 gamePhase 已被 main.js 强制重置为 TITLE）
    const preview = StateManager.getSavePreview();
    const targetPhase = preview?.phase
      ? CONSTANTS.GAME_PHASE.MAP   // 有存档，直接进地图
      : CONSTANTS.GAME_PHASE.SCHOOL_SELECT;

    StateManager.setGamePhase(targetPhase);
  }

  /**
   * 新游戏：若有存档，弹出二次确认；否则直接开始。
   * @param {boolean} hasSave
   */
  _handleNewGame(hasSave) {
    if (hasSave) {
      showConfirm({
        title:          t('restart_title'),
        message:        t('restart_desc'),
        confirmText:    t('restart_btn'),
        cancelText:     t('cancel'),
        confirmVariant: 'danger',
        onConfirm:      () => {
          StateManager.resetGame();
          StateManager.setGamePhase(CONSTANTS.GAME_PHASE.SCHOOL_SELECT);
        },
      });
    } else {
      StateManager.setGamePhase(CONSTANTS.GAME_PHASE.SCHOOL_SELECT);
    }
  }

  /**
   * 怎么玩：游戏玩法提示弹窗。
   */
  _handleHowToPlay() {
    showConfirm({
      title:        t('how_to_title'),
      message:      t('how_to_desc').replace(/\n/g, '<br><br>'), // 保持换行格式
      confirmText:  t('how_to_confirm'),
      cancelText:   '',
      confirmVariant: 'primary',
      onConfirm:    () => {},
    });
  }
}