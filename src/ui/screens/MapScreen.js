/**
 * @fileoverview 校园地图 Screen（M5 修复版）
 *
 * 修复：
 *   1. 热区层精确叠加到 object-contain 图片的实际渲染区域
 *   2. Pin 改为带建筑缩写标签的胶囊样式，更显眼
 *   3. 移除调试工具
 */

import * as StateManager  from '../../state/StateManager.js';
import { CONSTANTS }      from '../../utils/constants.js';
import { BUILDINGS }      from '../../data/buildings.js';
import { ACTIONS }        from '../../data/actions.js';
import { log }            from '../../utils/helpers.js';

export class MapScreen {
  constructor() {
    this._container  = null;
    this._selectedId = null;
    this._state      = null;
    this._resizeObserver = null;
  }

  // ───────────────────────────────────────────────────────────
  // Screen 接口
  // ───────────────────────────────────────────────────────────

  mount(container, state) {
    this._container = container;
    this._state     = state;
    container.innerHTML = this._buildHTML();

    const mapImage = container.querySelector('#campus-map-img');

    // 图片加载完成后渲染热区
    const onReady = () => {
      this._repositionHotspots();
      // 监听容器尺寸变化（窗口缩放时重新定位）
      this._resizeObserver = new ResizeObserver(() => {
        this._repositionHotspots();
      });
      this._resizeObserver.observe(container.querySelector('#map-wrap'));
    };

    if (mapImage.complete && mapImage.naturalWidth > 0) {
      onReady();
    } else {
      mapImage.addEventListener('load', onReady, { once: true });
    }

    this._bindMapClick();
    this._renderInfoPanel(null);

    if (typeof lucide !== 'undefined') lucide.createIcons();
    log('info', 'MapScreen', '✅ 已挂载');
  }

  unmount() {
    this._resizeObserver?.disconnect();
    this._resizeObserver = null;
    this._container  = null;
    this._state      = null;
    this._selectedId = null;
    log('info', 'MapScreen', '已卸载');
  }

  onStateChange(state) {
    this._state = state;
    if (this._selectedId) {
      const building = BUILDINGS.find(b => b.id === this._selectedId);
      if (building) this._renderInfoPanel(building);
    }
  }

  // ───────────────────────────────────────────────────────────
  // HTML 骨架
  // ───────────────────────────────────────────────────────────

  _buildHTML() {
    // 预先生成所有 Pin（初始隐藏，定位后显示）
    const pinsHTML = BUILDINGS.map(b => {
      const isAction = b.type === 'B';
      // 取建筑 id 大写作为短标签，特殊处理几个
      const shortLabel = this._getShortLabel(b.id);

      return `
        <button
          class="map-pin ${isAction ? 'map-pin--action' : 'map-pin--info'}"
          data-building-id="${b.id}"
          title="${b.name}"
          aria-label="${b.name}"
          style="display:none;"
        >
          <i data-lucide="${b.icon}" class="lucide map-pin__icon"></i>
          <span class="map-pin__label">${shortLabel}</span>
        </button>
      `;
    }).join('');

    return `
      <div class="w-full h-full flex overflow-hidden bg-gray-50">

        <!-- 左侧：地图区（65%）-->
        <div class="relative flex-[65] overflow-hidden bg-gray-100">
          <div id="map-wrap" class="relative w-full h-full">

            <!-- 地图图片 -->
            <img
              id="campus-map-img"
              src="assets/images/campus_map.png"
              alt="西浦校园平面图"
              class="w-full h-full object-contain select-none"
              draggable="false"
            />

            <!-- Pin 层：由 JS 精确定位到图片渲染区域 -->
            <div id="hotspot-layer"
                 class="absolute pointer-events-none"
                 style="left:0;top:0;width:0;height:0;">
              ${pinsHTML}
            </div>

          </div>
        </div>

        <!-- 右侧：信息面板（35%）-->
        <div id="info-panel"
             class="flex-[35] flex flex-col
                    border-l-2 border-gray-200
                    bg-white overflow-hidden">
        </div>

      </div>
    `;
  }

  // ───────────────────────────────────────────────────────────
  // 核心：计算图片实际渲染区域并定位热区层
  // ───────────────────────────────────────────────────────────

  /**
   * 计算 object-contain 图片的实际渲染矩形，
   * 将 #hotspot-layer 精确覆盖到该区域，
   * 然后为每个 Pin 设置百分比定位。
   */
  _repositionHotspots() {
    const mapWrap  = this._container?.querySelector('#map-wrap');
    const mapImage = this._container?.querySelector('#campus-map-img');
    const layer    = this._container?.querySelector('#hotspot-layer');
    if (!mapWrap || !mapImage || !layer) return;

    const wrapW = mapWrap.clientWidth;
    const wrapH = mapWrap.clientHeight;
    const imgNW = mapImage.naturalWidth;
    const imgNH = mapImage.naturalHeight;

    if (!imgNW || !imgNH) return;

    // object-contain 等比缩放后的实际尺寸
    const scale   = Math.min(wrapW / imgNW, wrapH / imgNH);
    const renderW = imgNW * scale;
    const renderH = imgNH * scale;

    // 图片在容器内居中的偏移
    const offsetX = (wrapW - renderW) / 2;
    const offsetY = (wrapH - renderH) / 2;

    // 将热区层精确叠加到图片渲染区域
    layer.style.left   = `${offsetX}px`;
    layer.style.top    = `${offsetY}px`;
    layer.style.width  = `${renderW}px`;
    layer.style.height = `${renderH}px`;

    // 显示并定位每个 Pin
    layer.querySelectorAll('.map-pin').forEach(pin => {
      const buildingId = pin.dataset.buildingId;
      const building   = BUILDINGS.find(b => b.id === buildingId);
      if (!building) return;

      pin.style.display = '';   // 显示
      pin.style.left    = `${building.hotspot.x}%`;
      pin.style.top     = `${building.hotspot.y}%`;
    });

    // 绑定点击（只绑一次）
    if (!layer.dataset.bound) {
      layer.dataset.bound = '1';
      layer.style.pointerEvents = 'auto';
      layer.querySelectorAll('.map-pin').forEach(pin => {
        pin.addEventListener('click', (e) => {
          e.stopPropagation();
          this._selectBuilding(pin.dataset.buildingId);
        });
      });
    }

    if (typeof lucide !== 'undefined') lucide.createIcons();
  }

  // ───────────────────────────────────────────────────────────
  // 建筑选中
  // ───────────────────────────────────────────────────────────

  _selectBuilding(buildingId) {
    const building = BUILDINGS.find(b => b.id === buildingId);
    if (!building) return;

    this._selectedId = buildingId;

    this._container?.querySelectorAll('.map-pin').forEach(pin => {
      pin.classList.toggle(
        'map-pin--selected',
        pin.dataset.buildingId === buildingId
      );
    });

    this._renderInfoPanel(building);
    log('debug', 'MapScreen', `选中建筑：${building.name}`);
  }

  _bindMapClick() {
    const mapWrap = this._container?.querySelector('#map-wrap');
    if (!mapWrap) return;
    mapWrap.addEventListener('click', (e) => {
      if (e.target.closest('.map-pin')) return;
      this._selectedId = null;
      this._container?.querySelectorAll('.map-pin')
        .forEach(pin => pin.classList.remove('map-pin--selected'));
      this._renderInfoPanel(null);
    });
  }

  // ───────────────────────────────────────────────────────────
  // 信息面板
  // ───────────────────────────────────────────────────────────

  _renderInfoPanel(building) {
    const panel = this._container?.querySelector('#info-panel');
    if (!panel) return;

    panel.innerHTML = building
      ? this._buildBuildingPanel(building)
      : this._buildDefaultPanel();

    if (typeof lucide !== 'undefined') lucide.createIcons();

    panel.querySelectorAll('.action-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        this._handleAction(btn.dataset.actionId);
      });
    });
  }

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
          蓝色标记可消耗 AP 执行活动<br>灰色标记仅供了解
        </p>
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
      <div class="shrink-0 border-t border-gray-100 px-5 py-3
                  flex items-center gap-2 text-xs text-xjtlu-gray">
        <i data-lucide="zap" class="lucide w-3.5 h-3.5 text-xjtlu-blue"></i>
        本月剩余行动点显示在顶部状态栏
      </div>
    `;
  }

  _buildBuildingPanel(building) {
    const isAction = building.type === 'B';
    const actions  = building.actions.map(id => ACTIONS[id]).filter(Boolean);

    return `
      <div class="flex-1 flex flex-col overflow-hidden">

        <!-- 头部 -->
        <div class="shrink-0 px-5 pt-5 pb-4 border-b border-gray-100">
          <div class="flex items-start gap-3">
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
                <span class="tag-badge
                             ${isAction ? 'tag-badge--blue' : 'tag-badge--gray'}
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

        <!-- 内容（可滚动）-->
        <div class="flex-1 overflow-y-auto custom-scroll px-5 py-4
                    flex flex-col gap-4">
          <p class="text-xs text-gray-600 leading-relaxed">
            ${building.description}
          </p>
          <div class="bg-gray-50 rounded-xl p-3 border border-gray-100">
            <div class="flex items-center gap-1.5 mb-1.5">
              <i data-lucide="message-square-quote"
                 class="lucide w-3 h-3 text-xjtlu-gray"></i>
              <span class="text-[0.6rem] font-bold text-xjtlu-gray
                           tracking-wider uppercase">同学说</span>
            </div>
            <p class="text-xs text-gray-500 leading-relaxed italic">
              ${building.lore}
            </p>
          </div>
        </div>

        <!-- 行动按钮区 -->
        <div class="shrink-0 border-t-2 border-gray-100 px-5 py-4
                    flex flex-col gap-2">
          ${isAction && actions.length > 0 ? `
            <p class="text-[0.65rem] font-bold text-xjtlu-gray
                      tracking-wider uppercase mb-1">可执行的行动</p>
            ${actions.map(a => this._buildActionButton(a)).join('')}
          ` : `
            <p class="text-xs text-xjtlu-gray text-center py-1">
              此建筑无可执行行动
            </p>
          `}
        </div>

      </div>
    `;
  }

  _buildActionButton(action) {
    const canAfford = (this._state?.AP ?? 0) >= action.apCost;
    const apRemain  = this._state?.AP ?? 0;

    return `
      <button
        class="action-btn w-full text-left
               flex items-center gap-3 px-4 py-3 rounded-xl
               border-2 transition-all duration-150
               ${canAfford
                 ? 'border-xjtlu-blue bg-xjtlu-blue/5 hover:bg-xjtlu-blue hover:text-white cursor-pointer'
                 : 'border-gray-200 bg-gray-50 opacity-50 cursor-not-allowed'}"
        data-action-id="${action.id}"
        ${!canAfford ? 'disabled' : ''}
      >
        <div class="w-8 h-8 rounded-lg shrink-0 flex items-center justify-center
                    ${canAfford ? 'bg-xjtlu-blue/10' : 'bg-gray-200'}">
          <i data-lucide="${action.icon}"
             class="lucide w-4 h-4
                    ${canAfford ? 'text-xjtlu-blue' : 'text-gray-400'}">
          </i>
        </div>
        <div class="flex-1 min-w-0">
          <p class="text-sm font-bold leading-tight
                    ${canAfford ? 'text-xjtlu-navy' : 'text-gray-400'}">
            ${action.label}
          </p>
          <p class="text-[0.65rem] mt-0.5
                    ${canAfford ? 'text-xjtlu-gray' : 'text-gray-400'}">
            消耗 ${action.apCost} AP · 剩余 ${apRemain} AP
          </p>
        </div>
        <i data-lucide="chevron-right"
           class="lucide w-4 h-4 shrink-0
                  ${canAfford ? 'text-xjtlu-blue' : 'text-gray-300'}">
        </i>
      </button>
    `;
  }

  // ───────────────────────────────────────────────────────────
  // 行动执行
  // ───────────────────────────────────────────────────────────

  _handleAction(actionId) {
    const action = ACTIONS[actionId];
    if (!action) return;

    if (!StateManager.consumeAP(action.apCost)) {
      log('info', 'MapScreen', 'AP 不足');
      return;
    }

    StateManager.applyStatDelta(action.baseEffects, action.labels);
    StateManager.saveGame();
    log('info', 'MapScreen', `执行行动：${action.label}`);
  }

  // ───────────────────────────────────────────────────────────
  // 工具
  // ───────────────────────────────────────────────────────────

  _getShortLabel(id) {
    const map = {
      fb:   'FB',   cb:   'CB',   sb:   'SA~SD',
      pb:   'PB',   mb:   'MA~MB', eb:  'EB',
      ee:   'EE',   ir:   'IR',   ia:   'IA',
      hs:   'HS',   es:   'ES',   ibss: 'IBSS',
      db:   'DB',   gym:  'GYM',  dorm: '宿舍',
    };
    return map[id] ?? id.toUpperCase();
  }
}