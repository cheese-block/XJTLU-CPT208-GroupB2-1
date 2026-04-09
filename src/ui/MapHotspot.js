/**
 * @fileoverview 地图热区坐标管理 + 调试工具
 *
 * 调试模式（MAP_DEBUG = true）：
 *   - 在地图上叠加半透明网格
 *   - 鼠标点击时在控制台打印百分比坐标
 *   - 在点击位置显示临时红点 + 坐标标签
 *   - 右键清除所有临时标记
 */

import { CONSTANTS } from '../utils/constants.js';
import { log }       from '../utils/helpers.js';

// ─────────────────────────────────────────────────────────────
// 建筑热区数据（坐标待填入）
// 格式：{ x: 百分比, y: 百分比, radius: 热区半径(px) }
// ─────────────────────────────────────────────────────────────
export const BUILDINGS_HOTSPOTS = [
  // 坐标由开发者通过调试工具标注后填入
  // 示例格式：
  // { id: 'main_building', x: 42.5, y: 38.0, radius: 18 },
];

// ─────────────────────────────────────────────────────────────
// 调试工具类
// ─────────────────────────────────────────────────────────────
export class MapDebugTool {
  constructor() {
    this._mapContainer = null;
    this._mapImage     = null;
    this._debugLayer   = null;
    this._markers      = [];   // 临时标记列表

    this._onClick      = null;
    this._onRightClick = null;
  }

  /**
   * 挂载调试工具到地图容器。
   * @param {HTMLElement} mapContainer  地图的父容器（relative 定位）
   * @param {HTMLImageElement} mapImage 地图图片元素
   */
  mount(mapContainer, mapImage) {
    this._mapContainer = mapContainer;
    this._mapImage     = mapImage;

    this._createDebugLayer();
    this._bindEvents();

    console.log(
      '%c🗺️ 地图调试模式已启动',
      'font-size:1rem;font-weight:900;color:#004B9B;'
    );
    console.log(
      '%c操作说明：\n  左键单击 → 打印坐标到控制台 + 显示标记\n  右键单击 → 清除所有标记',
      'color:#6B7280;'
    );
    console.log(
      '%c坐标格式：{ x: XX.X, y: YY.Y }（百分比，相对于图片左上角）',
      'color:#6B7280;'
    );
  }

  /** 卸载，清理事件监听 */
  unmount() {
    if (this._onClick && this._mapContainer) {
      this._mapContainer.removeEventListener('click',       this._onClick);
      this._mapContainer.removeEventListener('contextmenu', this._onRightClick);
    }
    this._debugLayer?.remove();
    this._mapContainer = null;
    this._mapImage     = null;
  }

  // ───────────────────────────────────────────────────────────
  // 内部方法
  // ───────────────────────────────────────────────────────────

  /** 创建半透明网格叠层 */
  _createDebugLayer() {
    const layer = document.createElement('div');
    layer.id        = 'map-debug-layer';
    layer.className = 'is-active';
    layer.style.cssText = `
      position: absolute;
      inset: 0;
      pointer-events: none;
      z-index: 500;
      background-image:
        linear-gradient(rgba(0,75,155,0.10) 1px, transparent 1px),
        linear-gradient(90deg, rgba(0,75,155,0.10) 1px, transparent 1px);
      background-size: 10% 10%;
    `;

    // 10×10 坐标轴标签
    for (let x = 0; x <= 100; x += 10) {
      const label = document.createElement('span');
      label.style.cssText = `
        position: absolute;
        left: ${x}%;
        top: 2px;
        font-size: 9px;
        color: rgba(0,75,155,0.5);
        transform: translateX(-50%);
        pointer-events: none;
        user-select: none;
        font-weight: 700;
      `;
      label.textContent = `${x}%`;
      layer.appendChild(label);
    }
    for (let y = 10; y <= 100; y += 10) {
      const label = document.createElement('span');
      label.style.cssText = `
        position: absolute;
        top: ${y}%;
        left: 2px;
        font-size: 9px;
        color: rgba(0,75,155,0.5);
        transform: translateY(-50%);
        pointer-events: none;
        user-select: none;
        font-weight: 700;
      `;
      label.textContent = `${y}%`;
      layer.appendChild(label);
    }

    this._mapContainer.appendChild(layer);
    this._debugLayer = layer;
  }

  /** 绑定点击事件 */
  _bindEvents() {
    this._onClick = (e) => this._handleClick(e);
    this._onRightClick = (e) => {
      e.preventDefault();
      this._clearMarkers();
    };

    this._mapContainer.addEventListener('click',       this._onClick);
    this._mapContainer.addEventListener('contextmenu', this._onRightClick);
  }

  /**
   * 处理点击：计算百分比坐标，打印并生成标记。
   * @param {MouseEvent} e
   */
  _handleClick(e) {
    const rect = this._mapImage.getBoundingClientRect();

    // 计算相对于图片的百分比坐标
    const xPct = ((e.clientX - rect.left)  / rect.width  * 100).toFixed(1);
    const yPct = ((e.clientY - rect.top)   / rect.height * 100).toFixed(1);

    // 控制台输出（方便复制）
    console.log(
      `%c📍 点击坐标`,
      'font-weight:900;color:#004B9B;',
      `{ x: ${xPct}, y: ${yPct} }`,
      `← 复制此行`
    );

    // 在地图上显示临时标记
    this._spawnMarker(xPct, yPct, e.clientX - rect.left, e.clientY - rect.top);
  }

  /**
   * 在点击位置生成临时红点 + 坐标标签。
   * @param {string} xPct  百分比 X
   * @param {string} yPct  百分比 Y
   * @param {number} xPx   像素 X（相对于图片）
   * @param {number} yPx   像素 Y（相对于图片）
   */
  _spawnMarker(xPct, yPct, xPx, yPx) {
    const rect = this._mapImage.getBoundingClientRect();

    // 红点
    const dot = document.createElement('div');
    dot.style.cssText = `
      position: absolute;
      left: ${xPct}%;
      top:  ${yPct}%;
      width:  12px;
      height: 12px;
      background: #D93025;
      border: 2px solid white;
      border-radius: 50%;
      transform: translate(-50%, -50%);
      z-index: 600;
      pointer-events: none;
      box-shadow: 0 0 0 3px rgba(217,48,37,0.3);
    `;

    // 坐标标签
    const label = document.createElement('div');
    label.style.cssText = `
      position: absolute;
      left: ${xPct}%;
      top:  ${yPct}%;
      transform: translate(8px, -50%);
      background: rgba(0,0,0,0.75);
      color: white;
      font-size: 10px;
      font-weight: 700;
      padding: 2px 6px;
      border-radius: 4px;
      white-space: nowrap;
      z-index: 600;
      pointer-events: none;
    `;
    label.textContent = `(${xPct}%, ${yPct}%)`;

    this._mapContainer.appendChild(dot);
    this._mapContainer.appendChild(label);
    this._markers.push(dot, label);
  }

  /** 清除所有临时标记 */
  _clearMarkers() {
    this._markers.forEach(el => el.remove());
    this._markers = [];
    console.log('%c🗑️ 已清除所有标记', 'color:#6B7280;');
  }
}