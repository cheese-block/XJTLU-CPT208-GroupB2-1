/**
 * @fileoverview 对话框组件（逐字打印效果）
 *
 * 职责：
 *   - 逐字显示旁白/对话文本
 *   - 点击可跳过打印，直接显示全文
 *   - 文本显示完毕后显示"点击继续"提示
 *   - 支持知识提示框（knowledge_tip）的特殊样式
 */

import { t } from '../../utils/i18n.js';

export class DialogBox {
  constructor() {
    this._container    = null;
    this._typeTimer    = null;
    this._isTyping     = false;
    this._fullText     = '';
    this._onComplete   = null;
  }

  mount(container) {
    this._container = container;
    container.innerHTML = this._buildHTML();
  }

  unmount() {
    this._stopTyping();
    this._container = null;
  }

  /**
   * @param {object} options
   * @param {string}   options.text
   * @param {string}   [options.speaker]
   * @param {string}   [options.tip]
   * @param {object}   [options.effects]   数值得失
   * @param {object}   [options.effectLabels] 显示名称
   * @param {boolean}  [options.showHint]
   * @param {function} [options.onComplete]
   * @param {boolean}  [options.hasExactBuff] 是否拥有透视 Buff
   */
  show({
    text,
    speaker      = '',
    tip          = '',
    effects      = null,
    effectLabels = {},
    showHint     = true,
    onComplete   = null,
    hasExactBuff = false, // 【修复】：正确接收透视 Buff 标志
  }) {
    this._stopTyping();
    this._fullText   = text;
    this._onComplete = onComplete;

    const speakerEl  = this._container?.querySelector('#vn-speaker');
    const textEl     = this._container?.querySelector('#vn-text');
    const tipEl      = this._container?.querySelector('#vn-tip');
    const effectsEl  = this._container?.querySelector('#vn-effects');
    const hintEl     = this._container?.querySelector('#vn-hint');

    if (!textEl) return;

    // 发言人
    if (speakerEl) {
      speakerEl.textContent = speaker;
      speakerEl.classList.toggle('hidden', !speaker);
    }

    // 知识提示
    if (tipEl) {
      tipEl.innerHTML = tip
        ? `<i data-lucide="lightbulb" class="lucide w-3.5 h-3.5 shrink-0"></i>
           <span>${tip}</span>`
        : '';
      tipEl.classList.toggle('hidden', !tip);
      if (tip && typeof lucide !== 'undefined') lucide.createIcons();
    }

    // 数值得失（选择后或纯剧情触发后显示）
    if (effectsEl) {
      if (effects && Object.keys(effects).length > 0) {
        // 【修复】：直接使用解构出来的 hasExactBuff
        effectsEl.innerHTML = Object.entries(effects)
          .filter(([, delta]) => delta !== 0)
          .map(([stat, delta]) => {
            const label    = effectLabels[stat] ?? stat;
            const isPos    = delta > 0;
            const isLarge  = Math.abs(delta) >= 15;
            
            if (hasExactBuff) {
              // 透视模式：显示具体数字
              const sign     = isPos ? '+' : '';
              const colorCls = isPos ? 'text-xjtlu-green' : 'text-xjtlu-red';
              const bgCls    = isPos ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200';
              return `
                <span class="inline-flex items-center gap-1 px-2 py-0.5 rounded-full border text-xs font-black ${colorCls} ${bgCls}">
                  ${sign}${delta} ${label}
                </span>
              `;
            } else {
              // 模糊模式：文字描述
              const colorCls = isPos ? 'text-xjtlu-green' : 'text-xjtlu-red';
              const bgCls    = isPos ? 'bg-green-50 border-green-100' : 'bg-red-50 border-red-100';
              const desc     = `${isLarge ? '大幅' : '小幅'}${isPos ? '提升' : '下降'}`;
              return `
                <span class="inline-flex items-center gap-1 px-2 py-0.5 rounded-full border text-xs font-bold ${colorCls} ${bgCls}">
                  ${label} ${desc}
                </span>
              `;
            }
          }).join('');
        effectsEl.classList.remove('hidden');
      } else {
        effectsEl.innerHTML = '';
        effectsEl.classList.add('hidden');
      }
    }

    // 隐藏提示，清空文本
    if (hintEl) hintEl.classList.add('hidden');
    textEl.innerHTML = ''; 

    // 如果是包含 HTML 标签的文本（如拼接了 span），直接显示，跳过打字机
    if (text.includes('<span') || text.includes('<br>')) {
      textEl.innerHTML = text;
      if (hintEl && showHint) hintEl.classList.remove('hidden');
      this._onComplete?.();
    } else {
      // 纯文本依然保留打字机效果
      this._typeText(text, textEl, () => {
        if (hintEl && showHint) hintEl.classList.remove('hidden');
        this._onComplete?.();
      });
    }
  }

  skipOrAdvance() {
    if (this._isTyping) {
      this._skipTyping();
      return true;
    }
    return false;
  }

  _typeText(text, el, onDone) {
    this._isTyping = true;
    let index = 0;
    const speed = 28;

    const tick = () => {
      if (index >= text.length) {
        this._isTyping = false;
        onDone?.();
        return;
      }
      el.textContent += text[index++];
      this._typeTimer = setTimeout(tick, speed);
    };

    this._typeTimer = setTimeout(tick, speed);
  }

  _skipTyping() {
    this._stopTyping();
    const textEl = this._container?.querySelector('#vn-text');
    if (textEl) textEl.textContent = this._fullText;
    this._isTyping = false;
    const hintEl = this._container?.querySelector('#vn-hint');
    if (hintEl) hintEl.classList.remove('hidden');
    this._onComplete?.();
  }

  _stopTyping() {
    if (this._typeTimer) {
      clearTimeout(this._typeTimer);
      this._typeTimer = null;
    }
    this._isTyping = false;
  }

  _buildHTML() {
    return `
      <div class="vn-dialog-box">

        <!-- 发言人标签 -->
        <div id="vn-speaker" class="vn-dialog-box__speaker hidden"></div>

        <!-- 知识提示框 -->
        <div id="vn-tip"
             class="vn-knowledge-tip hidden flex items-start gap-2">
        </div>

        <!-- 主文本 -->
        <p id="vn-text" class="vn-dialog-box__text"></p>

        <!-- 数值得失（选择后显示）-->
        <div id="vn-effects"
             class="hidden flex flex-wrap gap-2 pt-1">
        </div>

        <!-- 点击继续提示 -->
        <p id="vn-hint" class="vn-dialog-box__hint hidden">
          ${t('vn_click_continue')}
        </p>

      </div>
    `;
  }
}