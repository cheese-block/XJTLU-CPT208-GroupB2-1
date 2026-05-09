/**
 * @fileoverview 横屏锁定检测工具 (Orientation Lock)
 * 
 * 作用：在移动端竖屏状态下显示全屏提示，要求用户旋转设备。
 */

export function initOrientationLock() {
  const overlay = document.getElementById('orientation-overlay');
  if (!overlay) return;

  const checkOrientation = () => {
    // 只在移动端且是竖屏时显示提示
    // 使用 matchMedia 更加精准
    const isMobile = window.matchMedia("(pointer: coarse)").matches;
    const isPortrait = window.innerHeight > window.innerWidth;

    if (isMobile && isPortrait) {
      overlay.classList.remove('hidden');
      if (typeof lucide !== 'undefined') lucide.createIcons({ root: overlay });
    } else {
      overlay.classList.add('hidden');
    }
  };

  window.addEventListener('resize', checkOrientation);
  window.addEventListener('orientationchange', checkOrientation);
  
  // 首次运行
  checkOrientation();
}
