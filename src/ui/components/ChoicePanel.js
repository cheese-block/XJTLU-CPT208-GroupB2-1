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
   * @param {object[]} choices   事件 choices 数组
   * @param {function} onChoose  选择回调，参数为 choiceIndex
   */
  show(choices, onChoose) {
    if (!this._container) return;
    this._onChoose = onChoose;

    this._container.innerHTML = `
      <div class="vn-choices">
        ${choices.map((choice, i) => `
          <button
            class="vn-choice-btn"
            data-index="${i}"
          >
            <span class="text-xjtlu-blue font-black mr-2">${String.fromCharCode(65 + i)}.</span>
            ${choice.text}
          </button>
        `).join('')}
      </div>
    `;

    this._container.classList.remove('hidden');

    this._container.querySelectorAll('.vn-choice-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const index = parseInt(btn.dataset.index, 10);
        this.hide();
        this._onChoose?.(index);
      });
    });
  }

  /** 隐藏选项面板 */
  hide() {
    if (!this._container) return;
    this._container.innerHTML = '';
    this._container.classList.add('hidden');
  }
}