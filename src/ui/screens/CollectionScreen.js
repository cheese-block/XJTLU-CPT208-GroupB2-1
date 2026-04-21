/**
 * @fileoverview 结局收集图鉴 Screen
 *
 * 数据来源：
 *   - ENDINGS（endings.js）：所有结局的完整定义
 *   - StateManager._globalState.unlockedEndings：已解锁的结局 ID 列表
 *
 * 扩展性：
 *   - 直接遍历 ENDINGS 数组渲染，新增结局无需修改本文件
 */

import { ENDINGS }       from '../../data/endings.js';
import * as StateManager from '../../state/StateManager.js';
import { CONSTANTS }     from '../../utils/constants.js';
import { t }             from '../../utils/i18n.js';

export class CollectionScreen {
  constructor() {
    this._container = null;
  }

  mount(container, _state) {
    this._container = container;
    const unlockedIds = StateManager.getUnlockedEndings();
    container.innerHTML = this._buildHTML(unlockedIds);
    if (typeof lucide !== 'undefined') lucide.createIcons();
    this._bindEvents();
  }

  unmount() {
    this._container = null;
  }

  onStateChange(_state) {}

  // ───────────────────────────────────────────────────────────
  // HTML 构建
  // ───────────────────────────────────────────────────────────

  _buildHTML(unlockedIds) {
    const total    = ENDINGS.length;
    const unlocked = unlockedIds.length;
    const sorted = [...ENDINGS].sort((a, b) => a.priority - b.priority);
    const cardsHTML = sorted.map(ending => this._buildCard(ending, unlockedIds.includes(ending.id))).join('');

    return `
      <div class="w-full h-full flex flex-col bg-gray-50 overflow-hidden">
        <div class="shrink-0 px-8 pt-8 pb-5 bg-white border-b-2 border-gray-100 flex items-center justify-between">
          <div>
            <p class="text-xs font-bold text-xjtlu-blue tracking-[0.2em] uppercase mb-1">
              Ending Collection
            </p>
            <h1 class="text-2xl font-black text-xjtlu-navy">${t('collection_title')}</h1>
          </div>

          <div class="flex flex-col items-end gap-1">
            <span class="text-3xl font-black text-xjtlu-navy">
              ${unlocked}
              <span class="text-base font-bold text-xjtlu-gray">/ ${total}</span>
            </span>
            <div class="w-40 h-2 bg-gray-200 rounded-full overflow-hidden">
              <div class="h-full bg-xjtlu-blue rounded-full transition-all duration-700" style="width: ${total > 0 ? Math.round(unlocked / total * 100) : 0}%"></div>
            </div>
            <span class="text-[0.65rem] text-xjtlu-gray">
              ${t('collection_unlocked')} ${total > 0 ? Math.round(unlocked / total * 100) : 0}%
            </span>
          </div>
        </div>

        <div class="flex-1 overflow-y-auto custom-scroll px-8 py-6">
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto">
            ${cardsHTML}
          </div>
        </div>

        <div class="shrink-0 px-8 py-4 bg-white border-t border-gray-100 flex justify-end">
          <button id="btn-back-to-title" class="xjtlu-btn xjtlu-btn--secondary">
            <i data-lucide="arrow-left" class="lucide w-4 h-4"></i>
            ${t('collection_back')}
          </button>
        </div>
      </div>
    `;
  }

  _buildCard(ending, isUnlocked) {
    const THEME = {
      success: { border: 'border-green-300', bg: 'bg-green-50', icon: 'award', iconCls: 'text-green-600', badge: 'bg-green-100 text-green-700', label: t('collection_theme_perfect') },
      primary: { border: 'border-blue-300', bg: 'bg-blue-50', icon: 'mail-check', iconCls: 'text-blue-600', badge: 'bg-blue-100 text-blue-700', label: t('collection_theme_normal') },
      warning: { border: 'border-amber-300', bg: 'bg-amber-50', icon: 'alert-triangle', iconCls: 'text-amber-600', badge: 'bg-amber-100 text-amber-700', label: t('collection_theme_regret') },
      danger:  { border: 'border-red-300', bg: 'bg-red-50', icon: 'skull', iconCls: 'text-red-600', badge: 'bg-red-100 text-red-700', label: t('collection_theme_bad') },
    };

    const theme = THEME[ending.theme] ?? THEME.primary;

    if (!isUnlocked) {
      return `
        <div class="flex flex-col gap-3 p-5 rounded-2xl border-2 border-dashed border-gray-200 bg-white select-none">
          <div class="flex items-start gap-3">
            <div class="w-10 h-10 rounded-xl bg-gray-100 shrink-0 flex items-center justify-center">
              <i data-lucide="lock" class="lucide w-5 h-5 text-gray-300"></i>
            </div>
            <div class="flex-1 min-w-0 flex flex-col justify-center gap-1">
              <h3 class="text-sm font-black text-gray-400 leading-tight">${t('collection_locked_title')}</h3>
              <span class="text-[0.6rem] text-gray-300">${t('collection_locked_desc')}</span>
            </div>
          </div>
        </div>
      `;
    }

    return `
      <div class="flex flex-col gap-3 p-5 rounded-2xl border-2 ${theme.border} bg-white shadow-sm hover:shadow-md transition-shadow duration-200 animate-fade-in">
        <div class="flex items-start gap-3">
          <div class="w-10 h-10 rounded-xl ${theme.bg} shrink-0 flex items-center justify-center">
            <i data-lucide="${theme.icon}" class="lucide w-5 h-5 ${theme.iconCls}"></i>
          </div>
          <div class="flex-1 min-w-0">
            <div class="flex items-center gap-2 flex-wrap">
              <h3 class="text-sm font-black text-xjtlu-navy leading-tight">${ending.title}</h3>
              <span class="text-[0.6rem] font-bold px-2 py-0.5 rounded-full ${theme.badge}">${theme.label}</span>
            </div>
          </div>
        </div>
        <div class="h-px bg-gray-100"></div>
        <p class="text-xs text-gray-600 leading-relaxed flex-1">${ending.description}</p>
        <div class="bg-yellow-50 border-l-3 border-xjtlu-yellow pl-3 pr-2 py-2 rounded-r-lg">
          <div class="flex items-center gap-1.5 mb-0.5">
            <i data-lucide="lightbulb" class="lucide w-3 h-3 text-xjtlu-yellow shrink-0"></i>
            <span class="text-[0.6rem] font-bold text-yellow-700 uppercase tracking-wider">${t('collection_teacher_review')}</span>
          </div>
          <p class="text-[0.7rem] text-yellow-800 leading-relaxed">${ending.tip}</p>
        </div>
      </div>
    `;
  }
  // ───────────────────────────────────────────────────────────
  // 事件绑定
  // ───────────────────────────────────────────────────────────

  _bindEvents() {
    this._container
      ?.querySelector('#btn-back-to-title')
      ?.addEventListener('click', () => {
        StateManager.setGamePhase(CONSTANTS.GAME_PHASE.TITLE);
      });
  }
}