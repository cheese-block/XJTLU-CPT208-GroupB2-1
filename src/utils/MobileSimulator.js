/**
 * @fileoverview 手机端模拟器工具 (Mobile Simulator)
 * 
 * 作用：在 PC 端开发时，通过 window._toggleMobileView() 强制开启一个
 * 类似手机视口的容器，方便 AI 或开发者直接预览和调试移动端布局。
 */

let _simulatorActive = false;
let _originalStyles = null;

export function initMobileSimulator() {
  window._toggleMobileView = toggleMobileView;
  console.log('%c📱 手机模拟器已就绪', 'color: #004B9B; font-weight: bold;');
  console.log('使用 window._toggleMobileView() 切换移动端预览模式');
}

function toggleMobileView() {
  const app = document.getElementById('app');
  if (!app) return;

  _simulatorActive = !_simulatorActive;

  if (_simulatorActive) {
    _enableSimulator(app);
  } else {
    _disableSimulator(app);
  }
}

function _enableSimulator(app) {
  // 备份原始样式
  _originalStyles = {
    width: app.style.width,
    height: app.style.height,
    margin: app.style.margin,
    border: app.style.border,
    boxShadow: app.style.boxShadow,
    position: app.style.position,
    left: app.style.left,
    top: app.style.top,
    transform: app.style.transform,
    borderRadius: app.style.borderRadius
  };

  // 设置为典型手机横屏尺寸 (iPhone 13 逻辑分辨率 844x390)
  Object.assign(app.style, {
    width: '844px',
    height: '390px',
    margin: '100px auto',
    border: '12px solid #1a1a1a',
    borderRadius: '36px',
    boxShadow: '0 20px 50px rgba(0,0,0,0.3)',
    position: 'relative',
    left: '0',
    top: '0',
    transform: 'none',
    overflow: 'hidden'
  });

  document.body.style.backgroundColor = '#333';
  
  // 提示信息
  const tip = document.createElement('div');
  tip.id = 'mobile-sim-tip';
  tip.innerHTML = `
    <div style="position:fixed; top:10px; left:50%; transform:translateX(-50%); 
                background:rgba(0,0,0,0.8); color:white; padding:5px 15px; 
                border-radius:20px; font-size:12px; z-index:10000; font-family:sans-serif;">
      Mobile Simulation Mode (Landscape: 844x390)
    </div>
  `;
  document.body.appendChild(tip);
  
  console.log('Mobile landscape view enabled');
}

function _disableSimulator(app) {
  if (_originalStyles) {
    Object.assign(app.style, _originalStyles);
  }
  
  document.body.style.backgroundColor = '';
  const tip = document.getElementById('mobile-sim-tip');
  if (tip) tip.remove();

  console.log('Mobile view disabled');
}
