/**
 * @fileoverview 校园地图 Screen（M5 完整版）
 *
 * 布局：左侧 65% 校园地图 + 右侧 35% 信息面板
 * 热区：点击 Pin 图标触发建筑信息展示
 * B 类建筑：信息面板底部显示行动按钮
 */

import * as StateManager  from '../../state/StateManager.js';
import { CONSTANTS }      from '../../utils/constants.js';
import { BUILDINGS }      from '../../data/buildings.js';
import { ACTIONS }        from '../../data/actions.js';
import { MapDebugTool, findHitBuilding } from '../MapHotspot.js';
import { log }            from '../../utils/helpers.js';

export class MapScreen {
  constructor() {
    this._container    = null;
    this._debugTool    = null;
    this._selectedId   = null;   // 当前选中的建筑 ID
    this._state        = null;   // 最新 state 快照

    // 事件监听引用
    this._onMapClick   = null;
  }

  // ───────────────────────────────────────────────────────────
  // Screen 接口
  // ───────────────────────────────────────────────────────────

  mount(container, state) {
    this._container  = container;
    this._state      = state;
    container.innerHTML = this._buildHTML();

    this._renderHotspots();
    this._bindMapClick();
    this._renderInfoPanel(null);   // 默认面板

    if (CONSTANTS.MAP_DEBUG) {
      this._mountDebugTool();
    }

    if (typeof lucide !== 'undefined') lucide.createIcons();
    log('info', 'MapScreen', '✅ 已挂载');
  }

  unmount() {
    this._debugTool?.unmount();
    this._debugTool  = null;
    this._container  = null;
    this._state      = null;
    this._selectedId = null;
    log('info', 'MapScreen', '已卸载');
  }

  onStateChange(state) {
    this._state = state;
    // 刷新面板中的行动按钮状态（AP 可能变化）
    if (this._selectedId) {
      const building = BUILDINGS.find(b => b.id === this._selectedId);
      if (building) this._renderInfoPanel(building);
    }
  }

  // ───────────────────────────────────────────────────────────
  // HTML 骨架
  // ───────────────────────────────────────────────────────────

  _buildHTML() {
    return `
      <div class="w-full h-full flex overflow-hidden bg-gray-50">

        <!-- 左侧：地图区（65%）-->
        <div class="relative flex-[65] overflow-hidden bg-gray-100">

          <!-- 地图图片容器 -->
          <div id="map-wrap" class="relative w-full h-full">
            <img
              id="campus-map-img"
              src="assets/images/campus_map.png"
              alt="西浦校园平面图"
              class="w-full h-full object-contain select-none"
              draggable="false"
            />
            <!-- 热区 Pin 层（绝对定位，由 JS 注入）-->
            <div id="hotspot-layer"
                 class="absolute inset-0 pointer-events-none">
            </div>
          </div>

          <!-- 调试提示角标 -->
          ${CONSTANTS.MAP_DEBUG ? `
            <div class="absolute bottom-3 left-3 z-50
                        bg-xjtlu-navy/80 text-white
                        text-[0.65rem] font-bold
                        px-2.5 py-1.5 rounded-lg
                        flex items-center gap-1.5
                        pointer-events-none">
              <i data-lucide="crosshair" class="lucide w-3 h-3"></i>
              调试模式：左键标记 · 右键清除
            </div>
          ` : ''}

        </div>

        <!-- 右侧：信息面板（35%）-->
        <div id="info-panel"
             class="flex-[35] flex flex-col
                    border-l-2 border-gray-200
                    bg-white overflow-hidden">
          <!-- 由 _renderInfoPanel() 填充 -->
        </div>

      </div>
    `;
  }

  // ───────────────────────────────────────────────────────────
  // 热区 Pin 渲染
  // ───────────────────────────────────────────────────────────

  /**
   * 在地图上为每栋建筑渲染一个 Pin 图标。
   * Pin 使用百分比定位，随地图缩放自适应。
   */
  _renderHotspots() {
    const layer = this._container?.querySelector('#hotspot-layer');
    if (!layer) return;

    layer.innerHTML = BUILDINGS.map(building => {
      const isAction  = building.type === 'B';
      const { x, y } = building.hotspot;

      return `
        <button
          class="map-hotspot ${isAction ? 'map-hotspot--action' : 'map-hotspot--info'}
                 pointer-events-auto"
          style="left: ${x}%; top: ${y}%;"
          data-building-id="${building.id}"
          title="${building.name}"
          aria-label="${building.name}"
        >
          ${isAction ? `
            <i data-lucide="${building.icon}"
               class="lucide w-2.5 h-2.5 text-white"></i>
          ` : ''}
        </button>
      `;
    }).join('');

    if (typeof lucide !== 'undefined') lucide.createIcons();

    // 绑定每个 Pin 的点击
    layer.querySelectorAll('.map-hotspot').forEach(pin => {
      pin.addEventListener('click', (e) => {
        e.stopPropagation();
        const buildingId = pin.dataset.buildingId;
        this._selectBuilding(buildingId);
      });
    });
  }

  // ───────────────────────────────────────────────────────────
  // 建筑选中逻辑
  // ───────────────────────────────────────────────────────────

  /**
   * 选中一栋建筑，更新 Pin 高亮 + 信息面板。
   * @param {string} buildingId
   */
  _selectBuilding(buildingId) {
    const building = BUILDINGS.find(b => b.id === buildingId);
    if (!building) return;

    this._selectedId = buildingId;

    // 更新 Pin 选中样式
    this._container?.querySelectorAll('.map-hotspot').forEach(pin => {
      pin.classList.toggle(
        'map-hotspot--selected',
        pin.dataset.buildingId === buildingId
      );
    });

    this._renderInfoPanel(building);
    log('debug', 'MapScreen', `选中建筑：${building.name}`);
  }

  /**
   * 点击地图空白处取消选中。
   */
  _bindMapClick() {
    const mapWrap = this._container?.querySelector('#map-wrap');
    if (!mapWrap) return;

    this._onMapClick = (e) => {
      // 点击的是 Pin 本身则不处理（Pin 有自己的 stopPropagation）
      if (e.target.closest('.map-hotspot')) return;
      this._selectedId = null;
      this._container?.querySelectorAll('.map-hotspot')
        .forEach(pin => pin.classList.remove('map-hotspot--selected'));
      this._renderInfoPanel(null);
    };

    mapWrap.addEventListener('click', this._onMapClick);
  }

  // ───────────────────────────────────────────────────────────
  // 信息面板
  // ───────────────────────────────────────────────────────────

  /**
   * 渲染右侧信息面板。
   * @param {object|null} building  null = 默认提示状态
   */
  _renderInfoPanel(building) {
    const panel = this._container?.querySelector('#info-panel');
    if (!panel) return;

    if (!building) {
      panel.innerHTML = this._buildDefaultPanel();
      if (typeof lucide !== 'undefined') lucide.createIcons();
      return;
    }

    panel.innerHTML = this._buildBuildingPanel(building);
    if (typeof lucide !== 'undefined') lucide.createIcons();

    // 绑定行动按钮
    panel.querySelectorAll('.action-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const actionId = btn.dataset.actionId;
        this._handleAction(actionId);
      });
    });
  }

  /** 默认面板（未选中建筑时）*/
  _buildDefaultPanel() {
    return `
      <div class="flex-1 flex flex-col items-center justify-center gap-3
                  px-6 text-center">
        <div class="w-12 h-12 rounded-2xl bg-gray-100
                    flex items-center justify-center">
          <i data-lucide="map-pin" class="lucide w-6 h-6 text-xjtlu-gray"></i>
        </div>
        <p class="text-sm font-bold text-xjtlu-navy">点击地图上的建筑</p>
        <p class="text-xs text-xjtlu-gray leading-relaxed">
          蓝色标记的建筑可以消耗 AP 执行活动<br>
          灰色标记仅供了解
        </p>

        <!-- 图例 -->
        <div class="mt-4 flex flex-col gap-2 w-full max-w-[180px]">
          <div class="flex items-center gap-2 text-xs text-xjtlu-gray">
            <div class="w-3 h-3 rounded-full bg-xjtlu-blue shrink-0"></div>
            可执行行动的建筑
          </div>
          <div class="flex items-center gap-2 text-xs text-xjtlu-gray">
            <div class="w-3 h-3 rounded-full bg-gray-400 shrink-0"></div>
            纯科普建筑
          </div>
        </div>
      </div>

      <!-- 底部：当月 AP 剩余提示 -->
      <div class="shrink-0 border-t border-gray-100 px-5 py-3
                  flex items-center gap-2 text-xs text-xjtlu-gray">
        <i data-lucide="zap" class="lucide w-3.5 h-3.5 text-xjtlu-blue"></i>
        本月剩余行动点将在右上角状态栏显示
      </div>
    `;
  }

  /**
   * 建筑详情面板。
   * @param {object} building
   */
  _buildBuildingPanel(building) {
    const isAction = building.type === 'B';
    const actions  = building.actions
      .map(id => ACTIONS[id])
      .filter(Boolean);

    const actionsHTML = isAction && actions.length > 0
      ? actions.map(action => this._buildActionButton(action)).join('')
      : '';

    return `
      <div class="flex-1 flex flex-col overflow-hidden">

        <!-- 建筑头部 -->
        <div class="shrink-0 px-5 pt-5 pb-4 border-b border-gray-100">
          <div class="flex items-start gap-3">
            <!-- 图标 -->
            <div class="w-10 h-10 rounded-xl shrink-0
                        flex items-center justify-center
                        ${isAction ? 'bg-xjtlu-blue/10' : 'bg-gray-100'}">
              <i data-lucide="${building.icon}"
                 class="lucide w-5 h-5
                        ${isAction ? 'text-xjtlu-blue' : 'text-xjtlu-gray'}">
              </i>
            </div>
            <div class="min-w-0 flex-1">
              <div class="flex items-center gap-2 flex-wrap">
                <h2 class="text-sm font-black text-xjtlu-navy leading-tight">
                  ${building.name}
                </h2>
                <span class="tag-badge ${isAction ? 'tag-badge--blue' : 'tag-badge--gray'}
                             text-[0.6rem]">
                  ${isAction ? '可行动' : '纯科普'}
                </span>
              </div>
              <p class="text-[0.65rem] text-xjtlu-gray mt-0.5">
                ${building.fullName}
              </p>
            </div>
          </div>
        </div>

        <!-- 建筑介绍（可滚动）-->
        <div class="flex-1 overflow-y-auto custom-scroll px-5 py-4
                    flex flex-col gap-4">

          <p class="text-xs text-gray-600 leading-relaxed">
            ${building.description}
          </p>

          <!-- Lore -->
          <div class="bg-gray-50 rounded-xl p-3 border border-gray-100">
            <div class="flex items-center gap-1.5 mb-1.5">
              <i data-lucide="message-square-quote"
                 class="lucide w-3 h-3 text-xjtlu-gray"></i>
              <span class="text-[0.6rem] font-bold text-xjtlu-gray
                           tracking-wider uppercase">
                同学说
              </span>
            </div>
            <p class="text-xs text-gray-500 leading-relaxed italic">
              ${building.lore}
            </p>
          </div>

        </div>

        <!-- 底部：行动按钮区 -->
        ${isAction && actionsHTML ? `
          <div class="shrink-0 border-t-2 border-gray-100 px-5 py-4
                      flex flex-col gap-2">
            <p class="text-[0.65rem] font-bold text-xjtlu-gray
                      tracking-wider uppercase mb-1">
              可执行的行动
            </p>
            ${actionsHTML}
          </div>
        ` : `
          <div class="shrink-0 border-t border-gray-100 px-5 py-3">
            <p class="text-xs text-xjtlu-gray text-center">
              此建筑无可执行行动
            </p>
          </div>
        `}
      </div>
    `;
  }

  /**
   * 构建单个行动按钮。
   * @param {object} action
   */
  _buildActionButton(action) {
    const state      = this._state;
    const canAfford  = state && state.AP >= action.apCost;
    const apRemain   = state?.AP ?? 0;

    return `
      <button
        class="action-btn w-full text-left
               flex items-center gap-3
               px-4 py-3 rounded-xl
               border-2 transition-all duration-150
               ${canAfford
                 ? `border-xjtlu-blue bg-xjtlu-blue/5
                    hover:bg-xjtlu-blue hover:text-white
                    cursor-pointer`
                 : `border-gray-200 bg-gray-50
                    opacity-50 cursor-not-allowed`
               }"
        data-action-id="${action.id}"
        ${!canAfford ? 'disabled aria-disabled="true"' : ''}
        title="${canAfford ? '' : 'AP 不足，无法执行'}"
      >
        <div class="w-8 h-8 rounded-lg shrink-0
                    flex items-center justify-center
                    ${canAfford ? 'bg-xjtlu-blue/10 action-btn__icon-wrap' : 'bg-gray-200'}">
          <i data-lucide="${action.icon}"
             class="lucide w-4 h-4
                    ${canAfford ? 'text-xjtlu-blue action-btn__icon' : 'text-gray-400'}">
          </i>
        </div>
        <div class="flex-1 min-w-0">
          <p class="text-sm font-bold leading-tight action-btn__label
                    ${canAfford ? 'text-xjtlu-navy' : 'text-gray-400'}">
            ${action.label}
          </p>
          <p class="text-[0.65rem] mt-0.5 action-btn__cost
                    ${canAfford ? 'text-xjtlu-gray' : 'text-gray-400'}">
            消耗 ${action.apCost} AP · 剩余 ${apRemain} AP
          </p>
        </div>
        <i data-lucide="chevron-right"
           class="lucide w-4 h-4 shrink-0 action-btn__arrow
                  ${canAfford ? 'text-xjtlu-blue' : 'text-gray-300'}">
        </i>
      </button>
    `;
  }

  // ───────────────────────────────────────────────────────────
  // 行动执行（临时：直接结算，M6 ActionEngine 完成后替换）
  // ───────────────────────────────────────────────────────────

  /**
   * 临时行动处理：直接应用数值变化。
   * M6 完成后此方法将调用 ActionEngine.executeAction()。
   * @param {string} actionId
   */
  _handleAction(actionId) {
    const action = ACTIONS[actionId];
    if (!action) return;

    const success = StateManager.consumeAP(action.apCost);
    if (!success) {
      log('info', 'MapScreen', 'AP 不足，无法执行行动');
      return;
    }

    StateManager.applyStatDelta(action.baseEffects, action.labels);
    StateManager.saveGame();

    log('info', 'MapScreen', `执行行动：${action.label}`);

    // 刷新面板（AP 已变化）
    const building = BUILDINGS.find(b => b.id === this._selectedId);
    if (building) this._renderInfoPanel(building);
  }

  // ───────────────────────────────────────────────────────────
  // 调试工具
  // ───────────────────────────────────────────────────────────

  _mountDebugTool() {
    const mapWrap  = this._container?.querySelector('#map-wrap');
    const mapImage = this._container?.querySelector('#campus-map-img');
    if (!mapWrap || !mapImage) return;

    const mount = () => {
      this._debugTool = new MapDebugTool();
      this._debugTool.mount(mapWrap, mapImage);
    };

    if (mapImage.complete) {
      mount();
    } else {
      mapImage.addEventListener('load', mount, { once: true });
    }
  }
}