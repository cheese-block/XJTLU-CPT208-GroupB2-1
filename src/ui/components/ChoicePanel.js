/**
 * @fileoverview 选项面板组件
 *
 * 在视觉小说模式下，将选项以垂直列表形式
 * 悬浮显示于插画区中央。
 */

export class ChoicePanel {
  constructor() {
    this._container = null;
    this._onChoose  = null;
  }

  /**
   * @param {HTMLElement} container  选项层容器
   */
  mount(container) {
    this._container = container;
  }

  unmount() {
    this._container = null;
    this._onChoose  = null;
  }

  /**
   * 显示选项列表。
   * @param {object[]} choices    事件 choices 数组
   * @param {function} onChoose   选择回调
   * @param {boolean}  isMultiple 是否为多选模式
   * @param {string[]} playerTags 玩家当前持有的标签数组（用于判断解锁）
   */
  show(choices, onChoose, isMultiple = false, playerTags = []) {
    if (!this._container) return;
    this._onChoose = onChoose;

    if (isMultiple) {
      this._renderMultiple(choices, playerTags);
    } else {
      this._renderSingle(choices, playerTags);
    }

    this._container.classList.remove('hidden');
    this._container.style.pointerEvents = 'auto';
  }

  _renderSingle(choices, playerTags) {
    this._container.innerHTML = `
      <div class="vn-choices">
        ${choices.map((choice, i) => {
          // 检查是否满足解锁条件
          const isLocked = choice.required_tag && !playerTags.includes(choice.required_tag);
          const btnClass = isLocked 
            ? 'bg-gray-100 border-gray-300 text-gray-400 cursor-not-allowed opacity-80' 
            : 'bg-white/95 border-xjtlu-blue text-xjtlu-navy hover:bg-xjtlu-blue hover:text-white cursor-pointer shadow-lg hover:-translate-y-1';
          
          return `
            <button class="w-full text-left px-6 py-4 rounded-xl border-2 transition-all duration-200 flex items-center justify-between ${btnClass}" 
                    data-index="${i}" 
                    ${isLocked ? 'disabled' : ''}>
              <div class="flex items-center gap-3">
                <span class="${isLocked ? 'text-gray-400' : 'text-xjtlu-blue'} font-black text-lg">${String.fromCharCode(65 + i)}.</span>
                <span class="text-sm font-bold leading-relaxed">${choice.text}</span>
              </div>
              ${isLocked ? `
                <div class="flex items-center gap-1.5 text-xs font-bold text-xjtlu-red bg-red-50 px-2 py-1 rounded-md border border-red-100 shrink-0">
                  <i data-lucide="lock" class="lucide w-3 h-3"></i>
                  需要 [${choice.required_tag}]
                </div>
              ` : ''}
            </button>
          `;
        }).join('')}
      </div>
    `;

    this._container.querySelectorAll('button:not([disabled])').forEach(btn => {
      btn.addEventListener('click', () => {
        const index = parseInt(btn.dataset.index, 10);
        this.hide();
        this._onChoose?.(index);
      });
    });
  }

  _renderMultiple(choices, playerTags) {
    this._container.innerHTML = `
      <div class="vn-choices bg-white/95 p-6 rounded-2xl shadow-2xl border-2 border-xjtlu-navy max-w-lg w-full">
        <p class="text-xs font-bold text-xjtlu-gray uppercase tracking-wider mb-4 text-center">请选择你要执行的行动（可多选）</p>
        <div class="flex flex-col gap-3 mb-6">
          ${choices.map((choice, i) => {
            const isLocked = choice.required_tag && !playerTags.includes(choice.required_tag);
            const labelClass = isLocked 
              ? 'border-gray-200 bg-gray-50 opacity-70 cursor-not-allowed' 
              : 'border-gray-200 cursor-pointer hover:bg-gray-50 has-[:checked]:border-xjtlu-blue has-[:checked]:bg-blue-50';
            
            return `
              <label class="flex items-start justify-between gap-3 p-3 rounded-xl border-2 transition-colors ${labelClass}">
                <div class="flex items-start gap-3">
                  <input type="checkbox" value="${i}" class="vn-multi-checkbox mt-1 w-4 h-4 text-xjtlu-blue rounded border-gray-300 focus:ring-xjtlu-blue" ${isLocked ? 'disabled' : ''}>
                  <span class="text-sm ${isLocked ? 'text-gray-400' : 'text-gray-700'} leading-relaxed select-none">${choice.text}</span>
                </div>
                ${isLocked ? `
                  <i data-lucide="lock" class="lucide w-4 h-4 text-xjtlu-red shrink-0 mt-1" title="需要 [${choice.required_tag}]"></i>
                ` : ''}
              </label>
            `;
          }).join('')}
        </div>
        <button id="vn-multi-submit" class="xjtlu-btn xjtlu-btn--primary w-full justify-center py-3 text-base">
          确认选择
        </button>
      </div>
    `;

    const submitBtn = this._container.querySelector('#vn-multi-submit');
    submitBtn.addEventListener('click', () => {
      const checkboxes = this._container.querySelectorAll('.vn-multi-checkbox:checked');
      const selectedIndices = Array.from(checkboxes).map(cb => parseInt(cb.value, 10));
      this.hide();
      this._onChoose?.(selectedIndices);
    });
  }

  /** 隐藏选项面板 */
    hide() {
    if (!this._container) return;
    this._container.innerHTML = '';
    this._container.classList.add('hidden');
    this._container.style.pointerEvents = 'none';
    }
}