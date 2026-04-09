/**
 * @fileoverview 全局悬浮气泡 (Tooltip) 管理器
 * 
 * 解决局部容器 overflow: hidden 导致气泡被裁切的问题。
 * 通过事件委托监听带有 data-tooltip-* 属性的元素，动态计算坐标并显示。
 */

let _tooltipEl = null;
let _titleEl   = null;
let _descEl    = null;
let _footerEl  = null;
let _arrowEl   = null;

export function initTooltipManager() {
  if (document.getElementById('global-tooltip')) return;

  // 1. 创建全局 DOM 节点，挂载到 body 最后
  _tooltipEl = document.createElement('div');
  _tooltipEl.id = 'global-tooltip';
  // 使用 fixed 定位，确保相对于视口绝对自由
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

  // 2. 绑定全局事件委托
  document.addEventListener('mouseover', _handleMouseOver);
  document.addEventListener('mouseout',  _handleMouseOut);
}

function _handleMouseOver(e) {
  // 查找最近的带有 data-tooltip-title 的元素
  const target = e.target.closest('[data-tooltip-title]');
  if (!target) return;

  // 读取数据
  const title   = target.getAttribute('data-tooltip-title') || '';
  const desc    = target.getAttribute('data-tooltip-desc')  || '';
  const footer  = target.getAttribute('data-tooltip-footer')|| '';
  const type    = target.getAttribute('data-tooltip-type')  || 'info'; // buff | debuff | info

  // 设置内容
  _titleEl.innerHTML  = title;
  _descEl.innerHTML   = desc;
  _footerEl.innerHTML = footer;

  _descEl.style.display   = desc ? 'block' : 'none';
  _footerEl.style.display = footer ? 'block' : 'none';

  // 根据类型设置标题颜色
  _titleEl.className = 'font-black mb-1 ' + (
    type === 'debuff' ? 'text-xjtlu-red' : 
    type === 'buff'   ? 'text-xjtlu-yellow' : 
    'text-white'
  );

  // 测量尺寸与计算位置
  const rect = target.getBoundingClientRect();
  
  // 先让 tooltip 显示出来（透明度为 0）以便获取其真实宽高
  _tooltipEl.style.display = 'block';
  const ttWidth  = _tooltipEl.offsetWidth;
  const ttHeight = _tooltipEl.offsetHeight;

  // 默认显示在目标上方
  let top  = rect.top - ttHeight - 8;
  let left = rect.left + (rect.width / 2) - (ttWidth / 2);
  let arrowClass = 'bottom-[-8px] left-1/2 -translate-x-1/2 border-t-xjtlu-navy';

  // 边界碰撞检测：如果上方空间不够，则翻转到下方
  if (top < 10) {
    top = rect.bottom + 8;
    arrowClass = 'top-[-8px] left-1/2 -translate-x-1/2 border-b-xjtlu-navy';
  }

  // 边界碰撞检测：左右超出屏幕
  if (left < 10) left = 10;
  if (left + ttWidth > window.innerWidth - 10) left = window.innerWidth - ttWidth - 10;

  // 应用坐标
  _tooltipEl.style.top  = `${top}px`;
  _tooltipEl.style.left = `${left}px`;
  
  // 更新小三角方向
  _arrowEl.className = `absolute border-4 border-transparent ${arrowClass}`;

  // 淡入
  _tooltipEl.style.opacity = '1';
}

function _handleMouseOut(e) {
  const target = e.target.closest('[data-tooltip-title]');
  if (!target) return;
  
  // 淡出
  _tooltipEl.style.opacity = '0';
}