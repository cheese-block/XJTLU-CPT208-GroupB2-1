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

    this._updateMonth(state);
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
      <div class="status-bar w-full flex items-center gap-3 px-4 py-2
                  border-b-2 border-xjtlu-navy bg-white
                  text-xs select-none overflow-x-auto">

        <!-- ① 月份 / 学期 -->
        <div class="stat-item shrink-0 flex flex-col gap-0.5 min-w-[72px]">
          <span class="stat-item__label flex items-center gap-1">
            <i data-lucide="calendar" class="lucide w-3 h-3"></i>
            进度
          </span>
          <span id="sb-month"
                class="stat-item__value text-xjtlu-navy font-black text-xs leading-tight">
            —
          </span>
        </div>

        <div class="w-px h-8 bg-gray-200 shrink-0"></div>

        <!-- ② AP 行动点 -->
        <div class="stat-item shrink-0 flex flex-col gap-1 min-w-[80px]">
          <span class="stat-item__label flex items-center gap-1">
            <i data-lucide="zap" class="lucide w-3 h-3"></i>
            行动点
          </span>
          <div id="sb-ap-pips" class="ap-pip-group"></div>
        </div>

        <div class="w-px h-8 bg-gray-200 shrink-0"></div>

        <!-- ③ 心理健康 -->
        <div class="stat-item flex-1 flex flex-col gap-1 min-w-[80px]">
          <div class="flex items-center justify-between">
            <span class="stat-item__label flex items-center gap-1">
              <i data-lucide="heart" class="lucide w-3 h-3"></i>
              心理
            </span>
            <span id="sb-mental-val"
                  class="stat-item__value text-[0.65rem]">80</span>
          </div>
          <div class="health-bar">
            <div id="sb-mental-fill"
                 class="health-bar__fill health-bar__fill--mental"
                 style="width: 80%"></div>
          </div>
        </div>

        <!-- ④ 身体健康 -->
        <div class="stat-item flex-1 flex flex-col gap-1 min-w-[80px]">
          <div class="flex items-center justify-between">
            <span class="stat-item__label flex items-center gap-1">
              <i data-lucide="activity" class="lucide w-3 h-3"></i>
              身体
            </span>
            <span id="sb-physical-val"
                  class="stat-item__value text-[0.65rem]">80</span>
          </div>
          <div class="health-bar">
            <div id="sb-physical-fill"
                 class="health-bar__fill health-bar__fill--physical"
                 style="width: 80%"></div>
          </div>
        </div>

        <div class="w-px h-8 bg-gray-200 shrink-0"></div>

        <!-- ⑤ 金钱 -->
        <div class="stat-item shrink-0 flex flex-col gap-0.5 min-w-[88px]">
          <span class="stat-item__label flex items-center gap-1">
            <i data-lucide="banknote" class="lucide w-3 h-3"></i>
            资金
          </span>
          <span id="sb-money"
                class="stat-item__value font-black text-xs text-xjtlu-navy">
            ¥50,000
          </span>
        </div>

        <div class="w-px h-8 bg-gray-200 shrink-0"></div>

        <!-- ⑥ 学力 -->
        <div class="stat-item flex-1 flex flex-col gap-1 min-w-[72px]">
          <div class="flex items-center justify-between">
            <span class="stat-item__label flex items-center gap-1">
              <i data-lucide="book-open" class="lucide w-3 h-3"></i>
              学力
            </span>
            <span id="sb-academic-val"
                  class="stat-item__value text-[0.65rem]">0</span>
          </div>
          <div class="health-bar">
            <div id="sb-academic-fill"
                 class="health-bar__fill"
                 style="width: 0%; background-color: #004B9B;"></div>
          </div>
        </div>

        <!-- ⑦ 英语能力 -->
        <div class="stat-item flex-1 flex flex-col gap-1 min-w-[72px]">
          <div class="flex items-center justify-between">
            <span class="stat-item__label flex items-center gap-1">
              <i data-lucide="languages" class="lucide w-3 h-3"></i>
              英语
            </span>
            <span id="sb-english-val"
                  class="stat-item__value text-[0.65rem]">40</span>
          </div>
          <div class="health-bar">
            <div id="sb-english-fill"
                 class="health-bar__fill"
                 style="width: 40%; background-color: #7C3AED;"></div>
          </div>
        </div>

        <div class="w-px h-8 bg-gray-200 shrink-0"></div>

        <!-- ⑧ 活跃 Buff 列表 -->
        <div id="sb-buffs"
             class="shrink-0 flex items-center gap-1 flex-wrap max-w-[160px]">
          <!-- 由 JS 动态渲染 -->
        </div>

      </div>
    `;
  }

  // ───────────────────────────────────────────────────────────
  // 局部更新方法
  // ───────────────────────────────────────────────────────────

  /** 更新月份/学期文字 */
  _updateMonth(state) {
    const el = this._container?.querySelector('#sb-month');
    if (!el) return;
    const monthLabel = CONSTANTS.MONTH_TO_REALWORLD[state.currentMonth] ?? `Month ${state.currentMonth}`;
    el.textContent = monthLabel;
  }

  /** 更新 AP 点数方块 */
  _updateAP(state) {
    const pips = this._container?.querySelector('#sb-ap-pips');
    if (!pips) return;

    const max   = CONSTANTS.AP_MAX_PER_MONTH;
    const used  = state.AP_used_this_month;
    const remaining = state.AP;

    // 重建方块（数量固定为 max，性能可接受）
    pips.innerHTML = Array.from({ length: max }, (_, i) => {
      const filled = i < remaining;
      return `<div class="ap-pip ${filled ? 'ap-pip--filled' : 'ap-pip--empty'}"
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

          <!-- 悬停气泡 -->
          <div class="
            absolute bottom-full left-1/2 -translate-x-1/2 mb-2
            w-48 p-2.5 rounded-xl
            bg-xjtlu-navy text-white text-xs leading-relaxed
            shadow-xl border border-white/10
            opacity-0 group-hover:opacity-100
            pointer-events-none
            transition-opacity duration-150
            z-[9999]
          ">
            <!-- 气泡标题 -->
            <p class="font-black text-xjtlu-yellow mb-1">${buff.label}</p>

            <!-- 效果描述 -->
            ${effectDesc
              ? `<p class="text-white/80">${effectDesc}</p>`
              : ''}

            <!-- 持续时间 -->
            <p class="text-white/50 mt-1 text-[0.6rem]">
              ${this._describeBuffDuration(buff)}
            </p>

            <!-- 气泡小三角 -->
            <div class="
              absolute top-full left-1/2 -translate-x-1/2
              border-4 border-transparent
              border-t-xjtlu-navy
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