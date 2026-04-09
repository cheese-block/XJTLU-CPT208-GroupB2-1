/**
 * @fileoverview 对话框组件（逐字打印效果）
 *
 * 职责：
 *   - 逐字显示旁白/对话文本
 *   - 点击可跳过打印，直接显示全文
 *   - 文本显示完毕后显示"点击继续"提示
 *   - 支持知识提示框（knowledge_tip）的特殊样式
 */

export class DialogBox {
  constructor() {
    this._container    = null;
    this._typeTimer    = null;
    this._isTyping     = false;
    this._fullText     = '';
    this._onComplete   = null;
  }

  /**
   * 挂载到指定容器。
   * @param {HTMLElement} container
   */
  mount(container) {
    this._container = container;
    container.innerHTML = this._buildHTML();
  }

  unmount() {
    this._stopTyping();
    this._container = null;
  }

  // ───────────────────────────────────────────────────────────
  // 公共 API
  // ───────────────────────────────────────────────────────────

  /**
   * 显示一段文本（逐字打印）。
   * @param {object} options
   * @param {string}   options.text        主文本
   * @param {string}   [options.speaker]   发言人（留空为旁白）
   * @param {string}   [options.tip]       知识提示框文本
   * @param {boolean}  [options.showHint]  是否显示"点击继续"提示
   * @param {function} [options.onComplete] 打印完成回调
   */
  show({ text, speaker = '', tip = '', showHint = true, onComplete = null }) {
    this._stopTyping();
    this._fullText   = text;
    this._onComplete = onComplete;

    const speakerEl  = this._container?.querySelector('#vn-speaker');
    const textEl     = this._container?.querySelector('#vn-text');
    const tipEl      = this._container?.querySelector('#vn-tip');
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

    // 隐藏提示，清空文本
    if (hintEl) hintEl.classList.add('hidden');
    textEl.textContent = '';

    // 开始逐字打印
    this._typeText(text, textEl, () => {
      if (hintEl && showHint) hintEl.classList.remove('hidden');
      this._onComplete?.();
    });
  }

  /**
   * 若正在打印则跳过（显示全文），否则返回 false（由外部处理推进）。
   * @returns {boolean} 是否消费了本次点击（true = 跳过打印，false = 已打印完毕）
   */
  skipOrAdvance() {
    if (this._isTyping) {
      this._skipTyping();
      return true;  // 消费了点击，用于跳过打印
    }
    return false;   // 文本已显示完，外部负责推进
  }

  // ───────────────────────────────────────────────────────────
  // 逐字打印
  // ───────────────────────────────────────────────────────────

  _typeText(text, el, onDone) {
    this._isTyping = true;
    let index = 0;
    const speed = 28; // ms/字

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

  // ───────────────────────────────────────────────────────────
  // HTML
  // ───────────────────────────────────────────────────────────

  _buildHTML() {
    return `
      <div class="vn-dialog-box">

        <!-- 发言人标签 -->
        <div id="vn-speaker"
             class="vn-dialog-box__speaker hidden">
        </div>

        <!-- 知识提示框 -->
        <div id="vn-tip"
             class="vn-knowledge-tip hidden flex items-start gap-2">
        </div>

        <!-- 主文本 -->
        <p id="vn-text" class="vn-dialog-box__text"></p>

        <!-- 点击继续提示 -->
        <p id="vn-hint" class="vn-dialog-box__hint hidden">
          点击继续 ▼
        </p>

      </div>
    `;
  }
}