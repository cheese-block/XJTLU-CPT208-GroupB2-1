/**
 * @fileoverview 地图热区坐标管理 + 调试工具
 */

import { CONSTANTS } from '../utils/constants.js';
import { BUILDINGS } from '../data/buildings.js';
import { log }       from '../utils/helpers.js';

// ─────────────────────────────────────────────────────────────
// 热区点击判定
// ─────────────────────────────────────────────────────────────

/**
 * 根据点击的百分比坐标，找到最近的建筑热区。
 * @param {number} xPct  点击位置 X 百分比
 * @param {number} yPct  点击位置 Y 百分比
 * @param {number} [threshold=4.5]  命中半径（百分比单位）
 * @returns {object|null}  命中的建筑数据，或 null
 */
export function findHitBuilding(xPct, yPct, threshold = 4.5) {
  let nearest   = null;
  let minDist   = Infinity;

  for (const building of BUILDINGS) {
    const { x, y } = building.hotspot;
    const dist = Math.sqrt((xPct - x) ** 2 + (yPct - y) ** 2);
    if (dist < threshold && dist < minDist) {
      minDist = dist;
      nearest = building;
    }
  }

  return nearest;
}

// ─────────────────────────────────────────────────────────────
// 调试工具类
// ─────────────────────────────────────────────────────────────
export class MapDebugTool {
  constructor() {
    this._mapContainer = null;
    this._mapImage     = null;
    this._debugLayer   = null;
    this._markers      = [];

    this._onClick      = null;
    this._onRightClick = null;
  }

  mount(mapContainer, mapImage) {
    this._mapContainer = mapContainer;
    this._mapImage     = mapImage;

    this._createDebugLayer();
    this._bindEvents();

    console.log(
      '%c🗺️ 地图调试模式已启动',
      'font-size:1rem;font-weight:900;color:#004B9B;'
    );
    console.log('%c左键标记 · 右键清除', 'color:#6B7280;');
  }

  unmount() {
    if (this._mapContainer) {
      this._mapContainer.removeEventListener('click',       this._onClick);
      this._mapContainer.removeEventListener('contextmenu', this._onRightClick);
    }
    this._debugLayer?.remove();
    this._markers.forEach(el => el.remove());
    this._mapContainer = null;
    this._mapImage     = null;
  }

  _createDebugLayer() {
    const layer = document.createElement('div');
    layer.id = 'map-debug-layer';
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

    for (let x = 0; x <= 100; x += 10) {
      const label = document.createElement('span');
      label.style.cssText = `
        position:absolute; left:${x}%; top:2px;
        font-size:9px; color:rgba(0,75,155,0.5);
        transform:translateX(-50%);
        pointer-events:none; user-select:none; font-weight:700;
      `;
      label.textContent = `${x}%`;
      layer.appendChild(label);
    }
    for (let y = 10; y <= 100; y += 10) {
      const label = document.createElement('span');
      label.style.cssText = `
        position:absolute; top:${y}%; left:2px;
        font-size:9px; color:rgba(0,75,155,0.5);
        transform:translateY(-50%);
        pointer-events:none; user-select:none; font-weight:700;
      `;
      label.textContent = `${y}%`;
      layer.appendChild(label);
    }

    this._mapContainer.appendChild(layer);
    this._debugLayer = layer;
  }

  _bindEvents() {
    this._onClick = (e) => this._handleClick(e);
    this._onRightClick = (e) => {
      e.preventDefault();
      this._clearMarkers();
    };
    this._mapContainer.addEventListener('click',       this._onClick);
    this._mapContainer.addEventListener('contextmenu', this._onRightClick);
  }

  _handleClick(e) {
    const rect = this._mapImage.getBoundingClientRect();
    const xPct = ((e.clientX - rect.left)  / rect.width  * 100).toFixed(1);
    const yPct = ((e.clientY - rect.top)   / rect.height * 100).toFixed(1);
    console.log(`%c📍 点击坐标`, 'font-weight:900;color:#004B9B;',
      `{ x: ${xPct}, y: ${yPct} }`, `← 复制此行`);
    this._spawnMarker(xPct, yPct);
  }

  _spawnMarker(xPct, yPct) {
    const dot = document.createElement('div');
    dot.style.cssText = `
      position:absolute; left:${xPct}%; top:${yPct}%;
      width:12px; height:12px;
      background:#D93025; border:2px solid white; border-radius:50%;
      transform:translate(-50%,-50%); z-index:600; pointer-events:none;
      box-shadow:0 0 0 3px rgba(217,48,37,0.3);
    `;
    const label = document.createElement('div');
    label.style.cssText = `
      position:absolute; left:${xPct}%; top:${yPct}%;
      transform:translate(8px,-50%);
      background:rgba(0,0,0,0.75); color:white;
      font-size:10px; font-weight:700;
      padding:2px 6px; border-radius:4px;
      white-space:nowrap; z-index:600; pointer-events:none;
    `;
    label.textContent = `(${xPct}%, ${yPct}%)`;
    this._mapContainer.appendChild(dot);
    this._mapContainer.appendChild(label);
    this._markers.push(dot, label);
  }

  _clearMarkers() {
    this._markers.forEach(el => el.remove());
    this._markers = [];
    console.log('%c🗑️ 已清除所有标记', 'color:#6B7280;');
  }
}