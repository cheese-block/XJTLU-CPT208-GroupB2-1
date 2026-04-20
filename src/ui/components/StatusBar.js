/**
 * @fileoverview 顶部固定状态栏组件 (王权极简版)
 */

import { CONSTANTS } from '../../utils/constants.js';

export class StatusBar {
  constructor() {
    /** @type {HTMLElement|null} */
    this._container = null;
    /** @type {Object<string, number>} 记录上一次的数值用于对比闪烁 */
    this._prevValues = {};
  }

  // ───────────────────────────────────────────────────────────
  // 生命周期
  // ───────────────────────────────────────────────────────────

  mount(container) {
    this._container = container;
    container.innerHTML = this._buildHTML();
    if (typeof lucide !== 'undefined') lucide.createIcons();
  }

  render(state) {
    if (!this._container) return;

    this._updateAP(state);
    
    // 统一更新 5 个维度的进度条（不再传递警告阈值，常态全为西浦蓝）
    this._updateGenericBar('mental',   state.Mental_Health,   'bg-xjtlu-navy');
    this._updateGenericBar('physical', state.Physical_Health, 'bg-xjtlu-navy');
    this._updateGenericBar('money',    state.Money,           'bg-xjtlu-navy');
    this._updateGenericBar('academic', state.Academic_Ability,'bg-xjtlu-navy');
    this._updateGenericBar('english',  state.English_Ability, 'bg-xjtlu-navy');
    
    this._updateBuffs(state);
  }

  // ───────────────────────────────────────────────────────────
  // HTML 骨架构建
  // ───────────────────────────────────────────────────────────

  _buildHTML() {
    return `
      <div class="status-bar w-full flex items-center gap-5 px-6 py-3
                  border-b-2 border-xjtlu-navy bg-white
                  select-none overflow-x-auto">

        <!-- AP 行动点 -->
        <div class="shrink-0 flex flex-col justify-center min-w-[90px]">
          <span class="flex items-center gap-1.5 text-gray-500 font-bold mb-1.5" style="font-size: 0.8rem;">
            <i data-lucide="zap" class="lucide w-4 h-4"></i>
            行动点
          </span>
          <div id="sb-ap-pips" class="ap-pip-group"></div>
        </div>

        <div class="w-px h-10 bg-gray-200 shrink-0"></div>

        <!-- 统一的极简状态条组 (无具体数字) -->
        ${this._buildBarHTML('mental', 'heart', '心理')}
        ${this._buildBarHTML('physical', 'activity', '身体')}
        ${this._buildBarHTML('money', 'banknote', '资金')}
        
        <div class="w-px h-10 bg-gray-200 shrink-0"></div>
        
        ${this._buildBarHTML('academic', 'book-open', '学力')}
        ${this._buildBarHTML('english', 'languages', '英语')}

        <div class="w-px h-10 bg-gray-200 shrink-0"></div>

        <!-- Buff 容器 -->
        <div id="sb-buffs" class="flex items-center gap-2 shrink-0"></div>

      </div>
    `;
  }

  _buildBarHTML(id, icon, label) {
    return `
      <div class="flex-1 flex flex-col justify-center min-w-[80px] px-1">
        <span class="flex items-center gap-1.5 text-gray-500 font-bold mb-1.5" style="font-size: 0.8rem;">
          <i data-lucide="${icon}" class="lucide w-4 h-4"></i>
          ${label}
          <!-- 【修改】：尺寸从 w-4 降至 w-3.5，字体从 0.6rem 降至 0.55rem -->
          <span id="sb-${id}-preview-dot" 
               class="w-3.5 h-3.5 rounded-full bg-gray-400 text-white font-black flex items-center justify-center opacity-0 transition-all duration-200 ml-1 shadow-sm"
               style="font-size: 0.55rem; line-height: 1;">
          </span>
        </span>
        
        <div class="relative w-full flex items-center">
          <div class="w-full h-2.5 bg-gray-200 rounded-full overflow-hidden shadow-inner relative">
            <div id="sb-${id}-fill" 
                 class="h-full bg-xjtlu-navy transition-all duration-500 ease-out" 
                 style="width: 50%"></div>
          </div>
          
          <div id="sb-${id}-preview-text"
               class="absolute -top-5 left-1/2 -translate-x-1/2 text-xs font-black opacity-0 transition-all duration-200"></div>
        </div>
      </div>
    `;
  }

  showPreview(effects, hasExactBuff) {
    if (!this._container || !effects) return;

    const statMap = {
      Mental_Health: 'mental',
      Physical_Health: 'physical',
      Money: 'money',
      Academic_Ability: 'academic',
      English_Ability: 'english'
    };

    Object.entries(effects).forEach(([stat, delta]) => {
      if (delta === 0) return;
      const id = statMap[stat];
      if (!id) return;

      const isPos = delta > 0;
      const isLarge = Math.abs(delta) >= 15;

      const dot = this._container.querySelector(`#sb-${id}-preview-dot`);
      if (dot) {
        dot.textContent = isLarge ? '大' : '小';
        dot.style.opacity = '1';
        // 【修改】：确保这里的 className 尺寸也同步更新为 w-3.5 h-3.5
        dot.className = "w-3.5 h-3.5 rounded-full bg-gray-400 text-white font-black flex items-center justify-center transition-all duration-200 ml-1 shadow-sm";
      }

      if (hasExactBuff) {
        const textEl = this._container.querySelector(`#sb-${id}-preview-text`);
        if (textEl) {
          textEl.textContent = isPos ? `+${delta}` : delta;
          textEl.className = `absolute -top-5 left-1/2 -translate-x-1/2 text-xs font-black transition-all duration-200 opacity-100 ${isPos ? 'text-xjtlu-green' : 'text-xjtlu-red'}`;
        }
      }
    });
  }

  clearPreview() {
    if (!this._container) return;
    
    // 隐藏“大/小”指示器
    const dots = this._container.querySelectorAll('[id$="-preview-dot"]');
    dots.forEach(dot => {
      dot.style.opacity = '0';
    });

    // 隐藏透视具体数值
    const texts = this._container.querySelectorAll('[id$="-preview-text"]');
    texts.forEach(text => {
      text.style.opacity = '0';
    });
  }

  // ───────────────────────────────────────────────────────────
  // 核心逻辑：进度条更新与闪烁
  // ───────────────────────────────────────────────────────────

  _updateGenericBar(id, value, baseColorClass) {
    const fill = this._container?.querySelector(`#sb-${id}-fill`);
    if (!fill) return;

    const pct = Math.max(0, Math.min(100, value));
    fill.style.width = `${pct}%`;

    const prev = this._prevValues[id];
    
    // 如果数值发生了变化，触发瞬时颜色闪烁
    if (prev !== undefined && prev !== value) {
      const isIncrease = value > prev;
      const flashColor = isIncrease ? 'bg-xjtlu-green' : 'bg-xjtlu-red';

      // 移除基础色，加入闪烁色
      fill.classList.remove(baseColorClass);
      fill.classList.add(flashColor);

      // 400ms 后恢复基础色
      setTimeout(() => {
        fill.classList.remove(flashColor);
        fill.classList.add(baseColorClass);
      }, 400);
    }

    this._prevValues[id] = value;
  }

  _updateAP(state) {
    const pips = this._container?.querySelector('#sb-ap-pips');
    if (!pips) return;

    const max = CONSTANTS.AP_MAX_PER_MONTH;
    const remaining = state.AP;

    pips.innerHTML = Array.from({ length: max }, (_, i) => {
      const filled = i < remaining;
      return `<div class="ap-pip ${filled ? 'ap-pip--filled' : 'ap-pip--empty'}"
                   style="width: 14px; height: 14px; border-width: 3px;"
                   title="${filled ? '可用' : '已用'}"></div>`;
    }).join('');
  }

  // ───────────────────────────────────────────────────────────
  // Buff 渲染
  // ───────────────────────────────────────────────────────────

  _updateBuffs(state) {
    const container = this._container?.querySelector('#sb-buffs');
    if (!container) return;

    if (!state.activeBuff || state.activeBuff.length === 0) {
      container.innerHTML = '';
      return;
    }

    container.innerHTML = state.activeBuff.map(buff => {
      const effectDesc = this._describeBuffEffect(buff);
      return `
        <div class="relative group">
          <span class="tag-badge tag-badge--blue cursor-default">
            <i data-lucide="${buff.icon ?? 'star'}" class="lucide w-2.5 h-2.5"></i>
            ${buff.label}
          </span>
          <div class="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-48 p-2.5 rounded-xl bg-xjtlu-navy text-white text-xs leading-relaxed shadow-xl border border-white/10 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-150 z-[9999]">
            <p class="font-black text-xjtlu-yellow mb-1">${buff.label}</p>
            ${effectDesc ? `<p class="text-white/80">${effectDesc}</p>` : ''}
            <p class="text-white/50 mt-1 text-[0.6rem]">
              ${buff.durationType === 'months' ? `剩余 ${buff.remainingMonths} 个月` : '永久效果'}
            </p>
            <div class="absolute bottom-full left-1/2 -translate-x-1/2 border-4 border-transparent border-b-xjtlu-navy"></div>
          </div>
        </div>
      `;
    }).join('');

    if (typeof lucide !== 'undefined') lucide.createIcons();
  }

  _describeBuffEffect(buff) {
    const effects = buff.effects;
    if (!effects) return '';
    const parts = [];
    if (effects.stat_modifier) {
      const { stat, delta } = effects.stat_modifier;
      const statLabel = { English_Ability: '英语', Academic_Ability: '学力', Mental_Health: '心理', Physical_Health: '身体', Money: '资金' }[stat] ?? stat;
      parts.push(`每次行动 ${statLabel} ${delta > 0 ? '+' : ''}${delta}`);
    }
    if (effects.event_prob_modifier) {
      const pct = Math.round(effects.event_prob_modifier * 100);
      parts.push(`事件概率 ${pct > 0 ? '+' : ''}${pct}%`);
    }
    return parts.join('；');
  }

  // ───────────────────────────────────────────────────────────
  // 飘字触发 (隐藏具体数字)
  // ───────────────────────────────────────────────────────────

  triggerFloatingText(stat, delta, label) {
    const targetMap = {
      Mental_Health:    '#sb-mental-fill',
      Physical_Health:  '#sb-physical-fill',
      Money:            '#sb-money-fill',
      Academic_Ability: '#sb-academic-fill',
      English_Ability:  '#sb-english-fill',
      AP:               '#sb-ap-pips',
    };

    const selector = targetMap[stat];
    const anchor   = selector ? this._container?.querySelector(selector) : null;
    const layer = document.getElementById('floating-text-layer');
    if (!layer) return;

    let x = window.innerWidth  / 2;
    let y = window.innerHeight * 0.12;

    if (anchor) {
      const rect = anchor.getBoundingClientRect();
      x = rect.left + rect.width  / 2;
      y = rect.top  + rect.height / 2;
    }

    const type = delta > 0 ? 'positive' : 'negative';
    const arrow = delta > 0 ? '↑' : '↓';
    
    // 【修改】：只显示标签和箭头，不再显示数字
    const text = stat === 'AP' ? `${delta} AP` : `${label} ${arrow}`;

    const el = document.createElement('span');
    el.className   = `floating-text floating-text--${type}`;
    el.textContent = text;
    el.style.left  = `${x + (Math.random() - 0.5) * 40}px`;
    el.style.top   = `${y - 10}px`;

    layer.appendChild(el);
    el.addEventListener('animationend', () => el.remove(), { once: true });
  }
}