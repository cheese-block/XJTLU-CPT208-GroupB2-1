/**
 * @fileoverview 顶部固定状态栏组件
 *
 * 显示内容（从左到右）：
 *   月份/学期 | AP 点数 | 心理健康 | 身体健康 | 金钱 | 学力 | 英语能力
 *
 * 使用方式：
 *   import { StatusBar } from './StatusBar.js';
 *   const bar = new StatusBar();
 *   bar.mount(document.getElementById('status-bar-root'));
 *   bar.render(state); // 每次 state 变化时调用
 */

import { CONSTANTS } from '../../utils/constants.js';
import { formatMoney } from '../../utils/helpers.js';

export class StatusBar {
  constructor() {
    /** @type {HTMLElement|null} */
    this._container = null;
  }

  // ───────────────────────────────────────────────────────────
  // 生命周期
  // ───────────────────────────────────────────────────────────

  /**
   * 挂载到指定容器，首次渲染骨架。
   * @param {HTMLElement} container
   */
  mount(container) {
    this._container = container;
    container.innerHTML = this._buildHTML();
    if (typeof lucide !== 'undefined') lucide.createIcons();
  }

/**
   * 根据最新 state 更新所有数值显示。
   * 仅更新数字/宽度，不重建 DOM（避免闪烁）。
   * @param {import('../../state/GameState.js').GameState} state
   */
    render(state) {
    if (!this._container) return;

    this._updateAP(state);
    this._updateHealthBar('mental',   state.Mental_Health,   CONSTANTS.MENTAL_HEALTH_WARN);
    this._updateHealthBar('physical', state.Physical_Health, CONSTANTS.PHYSICAL_HEALTH_WARN);
    this._updateMoney(state);
    this._updateAbility('academic', state.Academic_Ability);
    this._updateAbility('english',  state.English_Ability);
    this._updateBuffs(state);
  }

// ───────────────────────────────────────────────────────────
  // HTML 骨架构建（仅调用一次）
  // ───────────────────────────────────────────────────────────

  _buildHTML() {
    return `
      <div class="status-bar w-full flex items-center gap-5 px-6 py-3
                  border-b-2 border-xjtlu-navy bg-white
                  select-none overflow-x-auto">

        <!-- ① AP 行动点 -->
        <div class="stat-item shrink-0 flex flex-col gap-1 min-w-[90px]">
          <span class="stat-item__label flex items-center gap-1.5" style="font-size: 0.8rem;">
            <i data-lucide="zap" class="lucide w-4 h-4"></i>
            行动点
          </span>
          <div id="sb-ap-pips" class="ap-pip-group mt-0.5"></div>
        </div>

        <div class="w-px h-10 bg-gray-200 shrink-0"></div>

        <!-- 统一的 0-100 状态条组 -->
        ${this._buildBarHTML('mental', 'heart', '心理', 'bg-xjtlu-blue')}
        ${this._buildBarHTML('physical', 'activity', '身体', 'bg-xjtlu-green')}
        ${this._buildBarHTML('money', 'banknote', '资金', 'bg-amber-500')}
        
        <div class="w-px h-10 bg-gray-200 shrink-0"></div>
        
        ${this._buildBarHTML('academic', 'book-open', '学力', 'bg-xjtlu-navy')}
        ${this._buildBarHTML('english', 'languages', '英语', 'bg-purple-600')}

      </div>
    `;
  }

  /** 辅助生成纯净版进度条 HTML */
  _buildBarHTML(id, icon, label, colorClass) {
    return `
      <div class="stat-item flex-1 flex flex-col gap-1.5 min-w-[80px]">
        <span class="stat-item__label flex items-center gap-1.5" style="font-size: 0.8rem;">
          <i data-lucide="${icon}" class="lucide w-4 h-4"></i>
          ${label}
        </span>
        <div class="health-bar h-2.5 bg-gray-100 shadow-inner">
          <div id="sb-${id}-fill" class="health-bar__fill ${colorClass} transition-all duration-500" style="width: 50%"></div>
        </div>
      </div>
    `;
  }

  render(state) {
    if (!this._container) return;
    this._updateAP(state);
    this._updateGenericBar('mental',   state.Mental_Health,   CONSTANTS.MENTAL_HEALTH_WARN);
    this._updateGenericBar('physical', state.Physical_Health, CONSTANTS.PHYSICAL_HEALTH_WARN);
    this._updateGenericBar('money',    state.Money,           CONSTANTS.MONEY_WARN_THRESHOLD);
    this._updateGenericBar('academic', state.Academic_Ability, 0);
    this._updateGenericBar('english',  state.English_Ability,  0);
    this._updateBuffs(state);
  }

  /** 统一的进度条更新逻辑（不再更新文字） */
  _updateGenericBar(id, value, warnThreshold) {
    const fill = this._container?.querySelector(`#sb-${id}-fill`);
    if (!fill) return;

    const pct = Math.max(0, Math.min(100, value));
    fill.style.width = `${pct}%`;

    // 危险值变红警告 (仅对生存属性生效)
    if (warnThreshold > 0) {
      const isDanger = value <= warnThreshold || value >= (100 - warnThreshold); // 触顶或触底都危险
      fill.classList.toggle('bg-xjtlu-red', isDanger);
      if (isDanger) {
        // 移除原有的颜色类，确保红色生效
        fill.style.backgroundColor = '#D93025'; 
      } else {
        fill.style.backgroundColor = ''; // 恢复默认 class 颜色
      }
    }
  }

/** 更新 AP 点数方块 */
  _updateAP(state) {
    const pips = this._container?.querySelector('#sb-ap-pips');
    if (!pips) return;

    const max   = CONSTANTS.AP_MAX_PER_MONTH;
    const remaining = state.AP;

    // 重建方块（数量固定为 max，性能可接受）
    pips.innerHTML = Array.from({ length: max }, (_, i) => {
      const filled = i < remaining;
      // 增加内联样式放大方块尺寸与边框粗细
      return `<div class="ap-pip ${filled ? 'ap-pip--filled' : 'ap-pip--empty'}"
                   style="width: 14px; height: 14px; border-width: 3px;"
                   title="${filled ? '可用' : '已用'}"></div>`;
    }).join('');
  }

  /**
   * 更新血条（心理/身体健康）
   * @param {'mental'|'physical'} type
   * @param {number} value
   * @param {number} warnThreshold
   */
  _updateHealthBar(type, value, warnThreshold) {
    const fill = this._container?.querySelector(`#sb-${type}-fill`);
    const val  = this._container?.querySelector(`#sb-${type}-val`);
    if (!fill || !val) return;

    const pct = Math.max(0, Math.min(100, value));
    fill.style.width = `${pct}%`;
    val.textContent  = value;

    // 低值变红
    const isDanger = value <= warnThreshold;
    fill.classList.toggle('health-bar__fill--danger', isDanger);

    // 数值文字变红
    val.classList.toggle('text-xjtlu-red', isDanger);
    val.classList.toggle('text-xjtlu-navy', !isDanger);
  }

  /** 更新金钱显示 */
  _updateMoney(state) {
    const el = this._container?.querySelector('#sb-money');
    if (!el) return;

    const isWarn = state.Money < CONSTANTS.MONEY_WARN_THRESHOLD;
    el.textContent = formatMoney(state.Money);
    el.classList.toggle('text-xjtlu-red',  isWarn);
    el.classList.toggle('text-xjtlu-navy', !isWarn);
  }

  /**
   * 更新能力值进度条（学力/英语）
   * @param {'academic'|'english'} type
   * @param {number} value
   */
  _updateAbility(type, value) {
    const fill = this._container?.querySelector(`#sb-${type}-fill`);
    const val  = this._container?.querySelector(`#sb-${type}-val`);
    if (!fill || !val) return;

    const pct = Math.max(0, Math.min(100, value));
    fill.style.width = `${pct}%`;
    val.textContent  = value;
  }

  /** 更新 Buff 标签列表 */
  // StatusBar.js _updateBuffs() 方法替换

  _updateBuffs(state) {
    const container = this._container?.querySelector('#sb-buffs');
    if (!container) return;

    if (!state.activeBuff || state.activeBuff.length === 0) {
      container.innerHTML = '';
      return;
    }

    container.innerHTML = state.activeBuff.map(buff => {
      // 生成效果描述文本
      const effectDesc = this._describeBuffEffect(buff);

      return `
        <div class="relative group">
          <span class="tag-badge tag-badge--blue cursor-default">
            <i data-lucide="${buff.icon ?? 'star'}"
              class="lucide w-2.5 h-2.5"></i>
            ${buff.label}
          </span>

          <!-- 悬停气泡：改为向下 -->
          <div class="
            absolute top-full left-1/2 -translate-x-1/2 mt-2
            w-48 p-2.5 rounded-xl
            bg-xjtlu-navy text-white text-xs leading-relaxed
            shadow-xl border border-white/10
            opacity-0 group-hover:opacity-100
            pointer-events-none
            transition-opacity duration-150
            z-[9999]
          ">
            <p class="font-black text-xjtlu-yellow mb-1">${buff.label}</p>
            ${effectDesc ? `<p class="text-white/80">${effectDesc}</p>` : ''}
            <p class="text-white/50 mt-1 text-[0.6rem]">
              ${this._describeBuffDuration(buff)}
            </p>
            <!-- 小三角改为朝上 -->
            <div class="
              absolute bottom-full left-1/2 -translate-x-1/2
              border-4 border-transparent
              border-b-xjtlu-navy
            "></div>
          </div>
        </div>
      `;
    }).join('');

    if (typeof lucide !== 'undefined') lucide.createIcons();
  }

  /**
   * 将 buff.effects 转化为人类可读描述。
   * @param {object} buff
   * @returns {string}
   */
  _describeBuffEffect(buff) {
    const effects = buff.effects;
    if (!effects) return '';

    const parts = [];

    if (effects.stat_modifier) {
      const { stat, delta, action } = effects.stat_modifier;
      const statLabel = {
        English_Ability:  '英语能力',
        Academic_Ability: '学力',
        Mental_Health:    '心理健康',
        Physical_Health:  '身体健康',
        Money:            '资金',
      }[stat] ?? stat;

      const sign = delta > 0 ? '+' : '';
      const actionDesc = action ? `执行相关行动时` : '每次行动';
      parts.push(`${actionDesc} ${statLabel} ${sign}${delta}`);
    }

    if (effects.AP_cost_modifier) {
      const sign = effects.AP_cost_modifier > 0 ? '+' : '';
      parts.push(`AP 消耗 ${sign}${effects.AP_cost_modifier}`);
    }

    if (effects.event_prob_modifier) {
      const pct = Math.round(effects.event_prob_modifier * 100);
      const sign = pct > 0 ? '+' : '';
      parts.push(`随机事件概率 ${sign}${pct}%`);
    }

    return parts.join('；');
  }

  /**
   * 描述 Buff 持续时间。
   * @param {object} buff
   * @returns {string}
   */
  _describeBuffDuration(buff) {
    switch (buff.durationType) {
      case 'permanent':
        return '永久效果';
      case 'months':
        return `剩余 ${buff.remainingMonths} 个月`;
      case 'one_time':
        return '下次触发后消失';
      default:
        return '';
    }
  }

  // ───────────────────────────────────────────────────────────
  // 飘字触发（由外部调用，定位到状态栏上方）
  // ───────────────────────────────────────────────────────────

  /**
   * 在状态栏上方某个 stat 对应的位置生成飘字。
   * @param {string} stat    属性名，如 'Mental_Health'
   * @param {number} delta   变化量
   * @param {string} label   显示文本
   */
  triggerFloatingText(stat, delta, label) {
    // 定位目标元素（用于计算坐标）
    const targetMap = {
      Mental_Health:    '#sb-mental-val',
      Physical_Health:  '#sb-physical-val',
      Money:            '#sb-money',
      Academic_Ability: '#sb-academic-val',
      English_Ability:  '#sb-english-val',
      AP:               '#sb-ap-pips',
    };

    const selector = targetMap[stat];
    const anchor   = selector
      ? this._container?.querySelector(selector)
      : null;

    const layer = document.getElementById('floating-text-layer');
    if (!layer) return;

    // 计算坐标（相对于视口）
    let x = window.innerWidth  / 2;
    let y = window.innerHeight * 0.12; // 默认：状态栏区域

    if (anchor) {
      const rect = anchor.getBoundingClientRect();
      x = rect.left + rect.width  / 2;
      y = rect.top  + rect.height / 2;
    }

    // 创建飘字元素
    const type = delta > 0 ? 'positive' : 'negative';
    const text = `${delta > 0 ? '+' : ''}${delta} ${label}`;

    const el = document.createElement('span');
    el.className   = `floating-text floating-text--${type}`;
    el.textContent = text;
    el.style.left  = `${x + (Math.random() - 0.5) * 40}px`;
    el.style.top   = `${y - 10}px`;

    layer.appendChild(el);
    el.addEventListener('animationend', () => el.remove(), { once: true });
  }
}