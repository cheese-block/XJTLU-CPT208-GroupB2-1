/**
 * @fileoverview 校园地图 Screen（M5 修复版）
 *
 * 修复：
 *   1. 热区层精确叠加到 object-contain 图片的实际渲染区域
 *   2. Pin 改为带建筑缩写标签的胶囊样式，更显眼
 *   3. 移除调试工具
 */

/**
 * @fileoverview 校园地图 Screen（M8 完整版）
 *
 * 变更：
 *   - _handleAction 改为调用 GameLoop.executeAction
 *   - 新增"结束本月"按钮，触发月末结算流程
 */

import * as StateManager  from '../../state/StateManager.js';
import { CONSTANTS }      from '../../utils/constants.js';
import { BUILDINGS }      from '../../data/buildings.js';
import { ACTIONS }        from '../../data/actions.js';
import { executeAction, resolveMonthEnd } from '../../engine/GameLoop.js';
import { MapDebugTool }   from '../MapHotspot.js';
import { log }            from '../../utils/helpers.js';

export class MapScreen {
  constructor() {
    this._container      = null;
    this._selectedId     = null;
    this._state          = null;
    this._resizeObserver = null;
    this._hotspotPositions = {};
  }

  // ───────────────────────────────────────────────────────────
  // Screen 接口
  // ───────────────────────────────────────────────────────────

  mount(container, state) {
    this._container = container;
    this._state     = state;

    // 初始化运行时坐标副本
    BUILDINGS.forEach(b => {
      this._hotspotPositions[b.id] = { ...b.hotspot };
    });

    container.innerHTML = this._buildHTML();

    const mapImage = container.querySelector('#campus-map-img');
    const onReady  = () => {
      this._repositionHotspots();
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
    this._bindEndMonthButton();
    this._renderInfoPanel(null);
    this._renderPlayerStatus(state); // 【新增】初始化个人状态面板

    if (CONSTANTS.MAP_DEBUG) {
      this._mountDebugTool();
    }

    if (typeof lucide !== 'undefined') lucide.createIcons();
    log('info', 'MapScreen', '✅ 已挂载');
  }

  unmount() {
    this._resizeObserver?.disconnect();
    this._resizeObserver   = null;
    this._container        = null;
    this._state            = null;
    this._selectedId       = null;
    this._hotspotPositions = {};
    log('info', 'MapScreen', '已卸载');
  }

  onStateChange(state) {
    this._state = state;
    
    // 更新建筑面板（如果当前有选中）
    if (this._selectedId) {
      const building = BUILDINGS.find(b => b.id === this._selectedId);
      if (building) this._renderInfoPanel(building);
    }

    // 每次状态改变，都重新渲染下方的个人状态面板
    this._renderPlayerStatus(state);
  }

  // ───────────────────────────────────────────────────────────
  // HTML 骨架
  // ───────────────────────────────────────────────────────────

  _buildHTML() {
    const pinsHTML = BUILDINGS.map(b => {
      const isAction   = b.type === 'B';
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

            <img
              id="campus-map-img"
              src="assets/images/campus_map.png"
              alt="西浦校园平面图"
              class="w-full h-full object-contain select-none"
              draggable="false"
            />

            <!-- Pin 层 -->
            <div id="hotspot-layer"
                 class="absolute pointer-events-none"
                 style="left:0;top:0;width:0;height:0;">
              ${pinsHTML}
            </div>

          </div>

          <!-- 结束本月按钮 -->
          <div class="absolute bottom-4 right-4 z-40">
            <button
              id="btn-end-month"
              class="xjtlu-btn xjtlu-btn--primary text-sm shadow-lg"
            >
              <i data-lucide="skip-forward" class="lucide w-4 h-4"></i>
              结束本月
            </button>
          </div>

          <!-- 调试提示角标 -->
          ${CONSTANTS.MAP_DEBUG ? `
            <div id="debug-toolbar"
                 class="absolute bottom-4 left-4 z-50
                        flex items-center gap-2">
              <div class="bg-xjtlu-navy/90 text-white text-xs font-bold
                          px-3 py-2 rounded-lg flex items-center gap-2">
                <i data-lucide="move" class="lucide w-3.5 h-3.5"></i>
                拖拽模式：拖动 Pin 调整位置
              </div>
              <button
                id="btn-export-coords"
                class="xjtlu-btn xjtlu-btn--warning text-xs py-2 px-3"
              >
                <i data-lucide="download" class="lucide w-3.5 h-3.5"></i>
                导出坐标
              </button>
            </div>
          ` : ''}
        </div>

        <!-- 右侧：信息面板（35%）-->
        <div id="right-sidebar"
             class="flex-[35] flex flex-col
                    border-l-2 border-gray-200
                    bg-white overflow-hidden">
          
          <!-- 上半部：建筑信息 -->
          <div id="info-panel" class="flex-1 flex flex-col overflow-hidden border-b-2 border-gray-100">
          </div>

          <!-- 下半部：个人简历与状态 (固定高度或按比例) -->
          <div id="player-status-panel" class="h-[42%] shrink-0 flex flex-col bg-gray-50 overflow-hidden">
          </div>

        </div>

      </div>
    `;
  }

  // ───────────────────────────────────────────────────────────
  // 热区定位
  // ───────────────────────────────────────────────────────────

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

    const scale   = Math.min(wrapW / imgNW, wrapH / imgNH);
    const renderW = imgNW * scale;
    const renderH = imgNH * scale;
    const offsetX = (wrapW - renderW) / 2;
    const offsetY = (wrapH - renderH) / 2;

    layer.style.left   = `${offsetX}px`;
    layer.style.top    = `${offsetY}px`;
    layer.style.width  = `${renderW}px`;
    layer.style.height = `${renderH}px`;

    layer.dataset.renderW = renderW;
    layer.dataset.renderH = renderH;

    layer.querySelectorAll('.map-pin').forEach(pin => {
      const id  = pin.dataset.buildingId;
      const pos = this._hotspotPositions[id];
      if (!pos) return;
      pin.style.display = '';
      pin.style.left    = `${pos.x}%`;
      pin.style.top     = `${pos.y}%`;
    });

    // 只绑定一次
    if (!layer.dataset.bound) {
      layer.dataset.bound = '1';
      layer.style.pointerEvents = 'auto';

      layer.querySelectorAll('.map-pin').forEach(pin => {
        if (CONSTANTS.MAP_DEBUG) {
          this._bindPinDrag(pin, layer);
        } else {
          pin.addEventListener('click', (e) => {
            e.stopPropagation();
            this._selectBuilding(pin.dataset.buildingId);
          });
        }
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
      if (CONSTANTS.MAP_DEBUG) return;
      this._selectedId = null;
      this._container?.querySelectorAll('.map-pin')
        .forEach(pin => pin.classList.remove('map-pin--selected'));
      this._renderInfoPanel(null);
    });
  }

  // ───────────────────────────────────────────────────────────
  // 结束本月
  // ───────────────────────────────────────────────────────────

  _bindEndMonthButton() {
    const btn = this._container?.querySelector('#btn-end-month');
    if (!btn) return;

    btn.addEventListener('click', () => {
      log('info', 'MapScreen', '📅 玩家触发月末结算');

      // 禁用按钮防止重复点击
      btn.disabled = true;
      btn.classList.add('opacity-50');

      resolveMonthEnd(({ newMonth, examResult }) => {
        // 将数据挂到 window 供 MonthSummaryScreen 读取
        window._pendingMonthSummary = {
          prevMonth:  newMonth - 1,
          newMonth,
          examResult,
          state:      StateManager.getState(),
          onConfirm:  () => {
            StateManager.setGamePhase(CONSTANTS.GAME_PHASE.MAP);
          },
        };
        StateManager.setGamePhase(CONSTANTS.GAME_PHASE.MONTH_SUMMARY);
      });
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

  // ───────────────────────────────────────────────────────────
  // 个人简历与状态面板 (Player Status & Buffs)
  // ───────────────────────────────────────────────────────────

  _renderPlayerStatus(state) {
    const panel = this._container?.querySelector('#player-status-panel');
    if (!panel) return;

    // 解析雅思成绩
    const ieltsTag = state.tags.find(t => t.startsWith('IELTS_'));
    const ieltsScore = ieltsTag ? ieltsTag.replace('IELTS_', '') : '未出分';

    // 解析软背景
    const softBgs = [];
    if (state.tags.includes('Internship_Exp')) softBgs.push('一段实习');
    if (state.tags.includes('Research_Exp'))   softBgs.push('一段科研');
    // 未来可扩展更多：Big4_Intern, Paper_Published 等

    panel.innerHTML = `
      <div class="px-5 py-3 border-b border-gray-200 bg-white flex items-center justify-between">
        <h3 class="text-sm font-black text-xjtlu-navy flex items-center gap-1.5">
          <i data-lucide="contact" class="lucide w-4 h-4"></i>
          我的申请履历
        </h3>
        
        <!-- 教学 Tooltip -->
        <div class="relative group cursor-help">
          <i data-lucide="help-circle" class="lucide w-4 h-4 text-xjtlu-gray"></i>
          <div class="absolute bottom-full right-0 mb-2 w-56 p-3 rounded-xl
                      bg-xjtlu-navy text-white text-xs leading-relaxed
                      shadow-xl opacity-0 group-hover:opacity-100 pointer-events-none
                      transition-opacity z-50">
            <p class="font-bold text-xjtlu-yellow mb-1">状态与增益说明</p>
            <p>你的履历（GPA、雅思、软背景）将直接决定最终能拿到的 Offer 级别。</p>
            <p class="mt-1">下方的<span class="text-xjtlu-yellow">活跃状态 (Buff)</span> 会在日常行动中为你提供额外的数值加成或惩罚。请注意保持心理健康，避免获得负面状态！</p>
            <div class="absolute top-full right-1.5 border-4 border-transparent border-t-xjtlu-navy"></div>
          </div>
        </div>
      </div>

      <div class="flex-1 overflow-y-auto custom-scroll p-5 flex flex-col gap-4">
        
        <!-- 硬件条件 -->
        <div class="grid grid-cols-2 gap-3">
          <div class="bg-white p-3 rounded-xl border border-gray-100 shadow-sm flex flex-col gap-1">
            <span class="text-[0.65rem] font-bold text-xjtlu-gray uppercase tracking-wider">累计 GPA</span>
            <span class="text-lg font-black ${state.cumulativeGPA >= 3.3 ? 'text-xjtlu-green' : 'text-xjtlu-navy'}">
              ${state.cumulativeGPA ? state.cumulativeGPA.toFixed(2) : '暂无'}
            </span>
          </div>
          <div class="bg-white p-3 rounded-xl border border-gray-100 shadow-sm flex flex-col gap-1">
            <span class="text-[0.65rem] font-bold text-xjtlu-gray uppercase tracking-wider">雅思成绩</span>
            <span class="text-lg font-black ${ieltsScore !== '未出分' ? 'text-xjtlu-blue' : 'text-gray-400'}">
              ${ieltsScore}
            </span>
          </div>
        </div>

        <!-- 软背景 -->
        <div class="flex flex-col gap-2">
          <span class="text-[0.65rem] font-bold text-xjtlu-gray uppercase tracking-wider">软背景积累</span>
          <div class="flex flex-wrap gap-2">
            ${softBgs.length > 0 
              ? softBgs.map(bg => `<span class="tag-badge tag-badge--blue">${bg}</span>`).join('')
              : `<span class="text-xs text-gray-400 italic">简历空空如也...去参加点活动吧</span>`
            }
          </div>
        </div>

        <div class="h-px bg-gray-200 my-1"></div>

        <!-- 活跃 Buff -->
        <div class="flex flex-col gap-2">
          <span class="text-[0.65rem] font-bold text-xjtlu-gray uppercase tracking-wider">活跃状态 (Buffs)</span>
          <div class="flex flex-wrap gap-2">
            ${state.activeBuff && state.activeBuff.length > 0 
              ? state.activeBuff.map(buff => this._buildBuffBadge(buff)).join('')
              : `<span class="text-xs text-gray-400 italic">当前无特殊状态</span>`
            }
          </div>
        </div>

      </div>
    `;

    if (typeof lucide !== 'undefined') lucide.createIcons();
  }

  _buildBuffBadge(buff) {
    const isDebuff = buff.effects?.event_prob_modifier < 0 || buff.effects?.stat_modifier?.delta < 0;
    const colorClass = isDebuff ? 'tag-badge--red' : 'tag-badge--yellow';
    const effectDesc = this._describeBuffEffect(buff);

    return `
      <div class="relative group">
        <span class="tag-badge ${colorClass} cursor-default shadow-sm">
          <i data-lucide="${buff.icon ?? 'star'}" class="lucide w-3 h-3"></i>
          ${buff.label}
        </span>

        <!-- 悬停气泡 (向上弹出) -->
        <div class="absolute bottom-full left-1/2 -translate-x-1/2 mb-2
                    w-48 p-2.5 rounded-xl
                    bg-xjtlu-navy text-white text-xs leading-relaxed
                    shadow-xl opacity-0 group-hover:opacity-100 pointer-events-none
                    transition-opacity z-50">
          <p class="font-black ${isDebuff ? 'text-xjtlu-red' : 'text-xjtlu-yellow'} mb-1">${buff.label}</p>
          ${effectDesc ? `<p class="text-white/90">${effectDesc}</p>` : ''}
          <p class="text-white/50 mt-1 text-[0.6rem]">
            ${buff.durationType === 'months' ? `剩余 ${buff.remainingMonths} 个月` : '永久效果'}
          </p>
          <div class="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-xjtlu-navy"></div>
        </div>
      </div>
    `;
  }

  _describeBuffEffect(buff) {
    const effects = buff.effects;
    if (!effects) return '';
    const parts = [];

    if (effects.stat_modifier) {
      const { stat, delta, action } = effects.stat_modifier;
      const statLabel = {
        English_Ability:  '英语能力',
        Academic_Ability: '学力',
        Mental_Health:    '心理健康',
        Physical_Health:  '身体健康',
      }[stat] ?? stat;
      const sign = delta > 0 ? '+' : '';
      const actionDesc = action ? `执行相关行动时` : '每次行动';
      parts.push(`${actionDesc} ${statLabel} ${sign}${delta}`);
    }

    if (effects.event_prob_modifier) {
      const pct = Math.round(effects.event_prob_modifier * 100);
      const sign = pct > 0 ? '+' : '';
      parts.push(`随机事件概率 ${sign}${pct}%`);
    }

    return parts.join('；');
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

    executeAction(actionId, action, () => {
      // 随机事件触发时 GameLoop 内部已切换到 VN 模式
      // 此回调暂时留空
    });
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
      this._bindExportButton();
    };

    if (mapImage.complete) {
      mount();
    } else {
      mapImage.addEventListener('load', mount, { once: true });
    }
  }

  _bindExportButton() {
    const btn = this._container?.querySelector('#btn-export-coords');
    if (!btn) return;
    btn.addEventListener('click', () => {
      console.group('%c📍 Pin 坐标导出', 'font-size:1rem;font-weight:900;color:#004B9B;');
      BUILDINGS.forEach(b => {
        const pos = this._hotspotPositions[b.id];
        console.log(
          `%c${b.id}%c\t{ x: ${pos.x}, y: ${pos.y} }`,
          'color:#004B9B;font-weight:700;',
          'color:#1E8A44;'
        );
      });
      console.groupEnd();
    });
  }

  _bindPinDrag(pin, layer) {
    let isDragging  = false;
    let startMouseX = 0;
    let startMouseY = 0;
    let startPctX   = 0;
    let startPctY   = 0;

    pin.addEventListener('mousedown', (e) => {
      e.preventDefault();
      e.stopPropagation();

      isDragging  = true;
      startMouseX = e.clientX;
      startMouseY = e.clientY;

      const id    = pin.dataset.buildingId;
      startPctX   = this._hotspotPositions[id].x;
      startPctY   = this._hotspotPositions[id].y;

      pin.style.cursor    = 'grabbing';
      pin.style.zIndex    = '9999';
      pin.style.animation = 'none';

      const renderW = parseFloat(layer.dataset.renderW) || layer.clientWidth;
      const renderH = parseFloat(layer.dataset.renderH) || layer.clientHeight;

      const onMouseMove = (moveEvt) => {
        if (!isDragging) return;
        const dx       = moveEvt.clientX - startMouseX;
        const dy       = moveEvt.clientY - startMouseY;
        const newX     = startPctX + (dx / renderW * 100);
        const newY     = startPctY + (dy / renderH * 100);
        const clampedX = Math.max(0, Math.min(100, newX));
        const clampedY = Math.max(0, Math.min(100, newY));

        pin.style.left = `${clampedX}%`;
        pin.style.top  = `${clampedY}%`;

        this._hotspotPositions[pin.dataset.buildingId] = {
          x: Math.round(clampedX * 10) / 10,
          y: Math.round(clampedY * 10) / 10,
        };
      };

      const onMouseUp = () => {
        isDragging       = false;
        pin.style.cursor = 'grab';
        pin.style.zIndex = '';

        const building = BUILDINGS.find(b => b.id === pin.dataset.buildingId);
        if (building?.type === 'B') pin.style.animation = '';

        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup',   onMouseUp);
      };

      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup',   onMouseUp);
    });

    pin.style.cursor = 'grab';
  }

  // ───────────────────────────────────────────────────────────
  // 工具
  // ───────────────────────────────────────────────────────────

  _getShortLabel(id) {
    const map = {
      fb:   'FB',    cb:   'CB',    sb:   'SA~SD',
      pb:   'PB',    mb:   'MA~MB', eb:   'EB',
      ee:   'EE',    ir:   'IR',    ia:   'IA',
      hs:   'HS',    es:   'ES',    ibss: 'IBSS',
      db:   'DB',    gym:  'GYM',   dorm: '宿舍',
    };
    return map[id] ?? id.toUpperCase();
  }
}