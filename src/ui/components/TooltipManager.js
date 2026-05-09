/**
 * @fileoverview 全局悬浮气泡 (Tooltip) 管理器
 * 
 * 解决局部容器 overflow: hidden 导致气泡被裁切的问题。
 * 通过事件委托监听带有 data-tooltip-* 属性的元素，动态计算坐标并显示。
 * 
 * 手机端优化：
 * 1. 支持 click 触发（针对无 hover 的设备）。
 * 2. 增加全局点击空白处关闭逻辑。
 */

let _tooltipEl = null;
let _titleEl   = null;
let _descEl    = null;
let _footerEl  = null;
let _arrowEl   = null;

/** 记录当前正在显示 tooltip 的目标元素，用于手机端切换显示/隐藏 */
let _activeTarget = null;

export function initTooltipManager() {
  if (document.getElementById('global-tooltip')) return;

  // 1. 创建全局 DOM 节点，挂载到 body 最后
  _tooltipEl = document.createElement('div');
  _tooltipEl.id = 'global-tooltip';
  _tooltipEl.className = `
    fixed z-[99999] pointer-events-none opacity-0
    transition-opacity duration-150 ease-out
    w-56 p-3 rounded-xl shadow-2xl
    bg-xjtlu-navy text-white text-xs leading-relaxed
    border border-white/10
  `;

  _tooltipEl.innerHTML = `
    <p id="gt-title" class="font-black mb-1"></p>
    <p id="gt-desc" class="text-white/90"></p>
    <p id="gt-footer" class="text-white/50 mt-1.5 text-[0.6rem]"></p>
    <!-- 小三角指示器 -->
    <div id="gt-arrow" class="absolute border-4 border-transparent"></div>
  `;

  document.body.appendChild(_tooltipEl);

  _titleEl  = _tooltipEl.querySelector('#gt-title');
  _descEl   = _tooltipEl.querySelector('#gt-desc');
  _footerEl = _tooltipEl.querySelector('#gt-footer');
  _arrowEl  = _tooltipEl.querySelector('#gt-arrow');

  // 2. 绑定事件
  // PC 端：悬停触发
  document.addEventListener('mouseover', _handleMouseOver);
  document.addEventListener('mouseout',  _handleMouseOut);

  // 移动端/通用：点击触发
  document.addEventListener('click', _handleClick, true);
}

function _showTooltip(target) {
  if (!target) return;
  _activeTarget = target;

  // 读取数据
  const title   = target.getAttribute('data-tooltip-title') || '';
  const desc    = target.getAttribute('data-tooltip-desc')  || '';
  const footer  = target.getAttribute('data-tooltip-footer')|| '';
  const type    = target.getAttribute('data-tooltip-type')  || 'info';

  // 设置内容
  _titleEl.innerHTML  = title;
  _descEl.innerHTML   = desc;
  _footerEl.innerHTML = footer;

  _descEl.style.display   = desc ? 'block' : 'none';
  _footerEl.style.display = footer ? 'block' : 'none';

  _titleEl.className = 'font-black mb-1 ' + (
    type === 'debuff' ? 'text-xjtlu-red' : 
    type === 'buff'   ? 'text-xjtlu-yellow' : 
    'text-white'
  );

  const rect = target.getBoundingClientRect();
  
  _tooltipEl.style.display = 'block';
  const ttWidth  = _tooltipEl.offsetWidth;
  const ttHeight = _tooltipEl.offsetHeight;

  let top  = rect.top - ttHeight - 8;
  let left = rect.left + (rect.width / 2) - (ttWidth / 2);
  let arrowClass = 'bottom-[-8px] left-1/2 -translate-x-1/2 border-t-xjtlu-navy';

  if (top < 10) {
    top = rect.bottom + 8;
    arrowClass = 'top-[-8px] left-1/2 -translate-x-1/2 border-b-xjtlu-navy';
  }

  if (left < 10) left = 10;
  if (left + ttWidth > window.innerWidth - 10) left = window.innerWidth - ttWidth - 10;

  _tooltipEl.style.top  = `${top}px`;
  _tooltipEl.style.left = `${left}px`;
  _arrowEl.className = `absolute border-4 border-transparent ${arrowClass}`;

  _tooltipEl.style.opacity = '1';
}

function _hideTooltip() {
  _tooltipEl.style.opacity = '0';
  _activeTarget = null;
}

function _handleMouseOver(e) {
  if (window.matchMedia("(pointer: coarse)").matches) return; // 触摸屏忽略 mouseover
  const target = e.target.closest('[data-tooltip-title]');
  if (target) _showTooltip(target);
}

function _handleMouseOut(e) {
  if (window.matchMedia("(pointer: coarse)").matches) return;
  const target = e.target.closest('[data-tooltip-title]');
  if (target) _hideTooltip();
}

function _handleClick(e) {
  const target = e.target.closest('[data-tooltip-title]');
  
  if (target) {
    // 如果点击的是当前正在显示的 target，则隐藏
    if (_activeTarget === target && _tooltipEl.style.opacity === '1') {
      _hideTooltip();
    } else {
      _showTooltip(target);
    }
    // 注意：不调用 stopPropagation，因为目标元素本身可能有点击功能
  } else {
    // 点击非 tooltip 区域，隐藏当前显示的 tooltip
    if (_tooltipEl.style.opacity === '1') {
      _hideTooltip();
    }
  }
}
