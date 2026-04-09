/**
 * @fileoverview 校园地图 Screen（M5 调试版）
 *
 * 当前阶段：仅加载校园平面图 + 启动调试工具
 * 完整功能（热区、InfoPanel、行动按钮）待坐标标注完成后实现
 */

import { CONSTANTS }    from '../../utils/constants.js';
import { MapDebugTool } from '../MapHotspot.js';
import { log }          from '../../utils/helpers.js';

export class MapScreen {
  constructor() {
    this._container  = null;
    this._debugTool  = null;
  }

  mount(container, state) {
    this._container = container;
    container.innerHTML = this._buildHTML();

    // 等图片加载完成后启动调试工具
    const mapImage = container.querySelector('#campus-map-img');
    const mapWrap  = container.querySelector('#campus-map-wrap');

    if (CONSTANTS.MAP_DEBUG) {
      mapImage.addEventListener('load', () => {
        this._debugTool = new MapDebugTool();
        this._debugTool.mount(mapWrap, mapImage);
      }, { once: true });

      // 若图片已缓存（complete = true），load 事件不会再触发
      if (mapImage.complete) {
        this._debugTool = new MapDebugTool();
        this._debugTool.mount(mapWrap, mapImage);
      }
    }

    if (typeof lucide !== 'undefined') lucide.createIcons();
    log('info', 'MapScreen', '✅ 已挂载（调试模式）');
  }

  unmount() {
    this._debugTool?.unmount();
    this._debugTool = null;
    this._container = null;
    log('info', 'MapScreen', '已卸载');
  }

  onStateChange(_state) {}

  _buildHTML() {
    return `
      <div class="w-full h-full flex items-center justify-center bg-gray-50">

        <!-- 地图容器（relative，热区和调试层都挂在这里）-->
        <div
          id="campus-map-wrap"
          class="relative w-full h-full"
          style="cursor: crosshair;"
        >
          <img
            id="campus-map-img"
            src="assets/images/campus_map.png"
            alt="西浦校园平面图"
            class="w-full h-full object-contain"
            draggable="false"
          />
        </div>

        <!-- 调试提示角标 -->
        ${CONSTANTS.MAP_DEBUG ? `
          <div class="
            absolute bottom-4 left-4
            bg-xjtlu-navy text-white
            text-xs font-bold
            px-3 py-1.5 rounded-lg
            flex items-center gap-2
            opacity-80
            pointer-events-none
          ">
            <i data-lucide="crosshair" class="lucide w-3.5 h-3.5"></i>
            调试模式：左键标记 · 右键清除
          </div>
        ` : ''}

      </div>
    `;
  }
}