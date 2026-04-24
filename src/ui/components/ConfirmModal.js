/**
 * @fileoverview 二次确认弹窗组件
 *
 * 用途：
 *   - "重新开始将覆盖当前进度，是否确认？"
 *   - 任何需要用户二次确认的破坏性操作
 *
 * 使用方式：
 *   import { showConfirm } from './ConfirmModal.js';
 *   showConfirm({
 *     title:     '重新开始',
 *     message:   '将覆盖当前进度，是否确认？',
 *     confirmText: '确认重置',
 *     onConfirm: () => { ... },
 *   });
 */
import { t } from '../../utils/i18n.js';

/** 当前弹窗的 DOM 元素（单例）*/
let _modalEl = null;

/**
 * 显示确认弹窗。
 * @param {object} options
 * @param {string}   options.title          弹窗标题
 * @param {string}   options.message        提示正文
 * @param {string}   [options.confirmText]  确认按钮文案（默认"确认"）
 * @param {string}   [options.cancelText]   取消按钮文案（默认"取消"）
 * @param {'danger'|'warning'|'primary'} [options.confirmVariant] 确认按钮颜色语义
 * @param {function} options.onConfirm      确认回调
 * @param {function} [options.onCancel]     取消回调（可选）
 */
export function showConfirm({
  title         = t('modal_default_title'),
  message       = '',
  confirmText   = t('modal_default_confirm'),
  cancelText    = t('modal_default_cancel'),
  confirmVariant = 'danger',
  onConfirm,
  onCancel,
} = {}) {
  // 若已有弹窗，先移除
  hideConfirm();

  const layer = document.getElementById('modal-layer');
  if (!layer) return;

  // 激活层（允许点击）
  layer.classList.remove('pointer-events-none');
  layer.setAttribute('aria-hidden', 'false');

  // 按钮变体 CSS 类映射
  const variantClass = {
    danger:  'xjtlu-btn--danger',
    warning: 'xjtlu-btn--warning',
    primary: 'xjtlu-btn--primary',
  }[confirmVariant] ?? 'xjtlu-btn--danger';

  // 【修改】：动态判断是否渲染取消按钮
  const cancelButtonHTML = cancelText ? `
    <button id="modal-cancel-btn" class="xjtlu-btn xjtlu-btn--secondary text-sm px-4 py-2">
      <i data-lucide="x" class="lucide w-4 h-4"></i>
      ${cancelText}
    </button>
  ` : '';

  const html = `
    <div id="modal-backdrop" class="absolute inset-0 bg-black/50 backdrop-blur-sm" aria-hidden="true"></div>
    <div id="modal-card" role="alertdialog" aria-modal="true" aria-labelledby="modal-title" aria-describedby="modal-message"
         class="relative z-10 bg-white rounded-2xl shadow-2xl border-2 border-xjtlu-navy w-full max-w-sm mx-4 p-6 flex flex-col gap-4 animate-fade-in">
      <div class="flex items-center gap-2">
        <i data-lucide="alert-triangle" class="lucide w-5 h-5 text-xjtlu-red shrink-0"></i>
        <h2 id="modal-title" class="text-base font-black text-xjtlu-navy">${title}</h2>
      </div>
      <div class="h-px bg-gray-100"></div>
      <p id="modal-message" class="text-sm text-gray-600 leading-relaxed">${message}</p>
      <div class="flex gap-3 justify-end pt-1">
        ${cancelButtonHTML}
        <button id="modal-confirm-btn" class="xjtlu-btn ${variantClass} text-sm px-4 py-2 ${!cancelText ? 'w-full justify-center' : ''}">
          <i data-lucide="check" class="lucide w-4 h-4"></i>
          ${confirmText}
        </button>
      </div>
    </div>
  `;

  layer.innerHTML = html;

  // 初始化 Lucide 图标
  if (typeof lucide !== 'undefined') lucide.createIcons();

  // 绑定事件
  document.getElementById('modal-confirm-btn')?.addEventListener('click', () => {
    hideConfirm();
    onConfirm?.();
  });

  const handleCancel = () => {
    hideConfirm();
    if (onCancel) onCancel();
    // 如果没有 onCancel 且是单按钮模式，点击遮罩或 ESC 等同于点击确认
    else if (!cancelText && onConfirm) onConfirm();
  };

  if (cancelText) {
    document.getElementById('modal-cancel-btn')?.addEventListener('click', handleCancel);
  }
  
  document.getElementById('modal-backdrop')?.addEventListener('click', handleCancel);

  _escHandler = (e) => { if (e.key === 'Escape') handleCancel(); };
  document.addEventListener('keydown', _escHandler);

  setTimeout(() => {
    const focusBtn = document.getElementById(cancelText ? 'modal-cancel-btn' : 'modal-confirm-btn');
    focusBtn?.focus();
  }, 50);
}

/** ESC 键监听器引用（用于清理）*/
let _escHandler = null;

/**
 * 隐藏并销毁弹窗。
 */
export function hideConfirm() {
  const layer = document.getElementById('modal-layer');
  if (!layer) return;

  layer.innerHTML = '';
  layer.classList.add('pointer-events-none');
  layer.setAttribute('aria-hidden', 'true');

  // 清理 ESC 监听
  if (_escHandler) {
    document.removeEventListener('keydown', _escHandler);
    _escHandler = null;
  }
}