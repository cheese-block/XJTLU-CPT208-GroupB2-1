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
import { executeAction, resolveMonthEnd, processEventQueue } from '../../engine/GameLoop.js';
import { MapDebugTool }   from '../MapHotspot.js';
import { log }            from '../../utils/helpers.js';
import { showConfirm }    from '../components/ConfirmModal.js'; 

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
    this._renderPlayerStatus(state);
    this._renderTimeline(state); // 【新增】

    if (CONSTANTS.MAP_DEBUG) {
      this._mountDebugTool();
    }

    if (typeof lucide !== 'undefined') lucide.createIcons();

    // 【新增】：首次进入游戏时触发新手引导
    this._tryTriggerTutorial();

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
    
    if (this._selectedId) {
      const building = BUILDINGS.find(b => b.id === this._selectedId);
      if (building) this._renderInfoPanel(building);
    }

    this._renderPlayerStatus(state);
    this._renderTimeline(state); // 【新增】
  }

  // ───────────────────────────────────────────────────────────
  // HTML 骨架
  // ───────────────────────────────────────────────────────────

  _buildHTML() {
    const pinsHTML = BUILDINGS.map(b => {
      // 【修改】：由静态的 type 判定改为动态读取 state
      const isAction   = this._state?.unlockedBuildings?.includes(b.id);
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

        <!-- 左侧：地图区（65%），改为 flex-col 布局 -->
        <div class="relative flex-[65] flex flex-col overflow-hidden bg-gray-100">
          
          <!-- 地图主体占据剩余空间 -->
          <div id="map-wrap" class="relative flex-1 w-full overflow-hidden">

            <img
              id="campus-map-img"
              src="assets/images/campus_map.png"
              alt="西浦校园平面图"
              class="w-full h-full object-contain select-none"
              draggable="false"
            />

            <!-- Pin 层 (悬浮气泡也挂载在此层内部保证坐标统一) -->
            <div id="hotspot-layer"
                 class="absolute pointer-events-none"
                 style="left:0;top:0;width:0;height:0;z-index:40;">
              ${pinsHTML}
              
              <!-- 【修改】：移除 style 中的 transform，完全交由 JS 动态计算 -->
              <div id="action-popover" 
                   class="absolute z-50 hidden transition-all duration-150 opacity-0 pointer-events-none">
              </div>
            </div>

            <!-- 结束本月按钮 -->
            <div class="absolute bottom-6 right-6 z-40">
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
                   class="absolute bottom-6 left-6 z-50
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

          <!-- 时间轴层 -->
          <div id="timeline-bar"
               class="relative z-30 shrink-0
                      bg-white border-t-2 border-xjtlu-navy/20
                      px-4 py-2">
          </div>

        </div>

        <!-- 右侧：信息面板（35%）-->
        <div id="right-sidebar"
             class="flex-[35] flex flex-col
                    border-l-2 border-gray-200
                    bg-white overflow-hidden">
          
          <!-- 上半部：建筑信息 -->
          <div id="info-panel" class="flex-1 flex flex-col overflow-hidden border-b-2 border-gray-100">
          </div>

          <!-- 下半部：个人简历与状态 -->
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
    
    // 【新增】渲染并弹出气泡
    this._renderActionPopover(building);
    
    log('debug', 'MapScreen', `选中建筑：${building.name}`);
  }

  _bindMapClick() {
    const mapWrap = this._container?.querySelector('#map-wrap');
    if (!mapWrap) return;
    mapWrap.addEventListener('click', (e) => {
      // 忽略点击 引脚 和 气泡内部
      if (e.target.closest('.map-pin') || e.target.closest('#action-popover')) return;
      if (CONSTANTS.MAP_DEBUG) return;
      
      this._selectedId = null;
      this._container?.querySelectorAll('.map-pin')
        .forEach(pin => pin.classList.remove('map-pin--selected'));
      
      this._renderInfoPanel(null);
      
      // 【新增】点击空白处隐藏气泡
      this._hideActionPopover();
    });
  }

  // ───────────────────────────────────────────────────────────
  // 新手引导
  // ───────────────────────────────────────────────────────────

  /**
   * 检查是否需要触发新手引导剧情。
   * 根据全局游玩次数（playCount）决定触发哪个版本的引导。
   */
  _tryTriggerTutorial() {
    const state = StateManager.getState();

    // 只有在 Month 1，且单局内未触发过引导时才执行
    if (state.currentMonth !== 1 || state.tags.includes('__TUTORIAL_DONE__')) {
      return;
    }

    const playCount = StateManager.getPlayCount();
    let tutorialEventId = null;

    if (playCount <= 1) {
      tutorialEventId = 'tutorial_intro_1'; // 一周目详细引导
    } else if (playCount === 2) {
      tutorialEventId = 'tutorial_intro_2'; // 二周目简短警告
    } else {
      // 三周目及以上，直接跳过引导，写入标记
      StateManager.addTag('__TUTORIAL_DONE__');
      StateManager.saveGame();
      return;
    }

    log('info', 'MapScreen', `🎓 触发轮回引导（第 ${playCount} 周目）`);

    // 将引导事件注入队列头部
    StateManager.enqueueEventFront({
      eventId: tutorialEventId,
      source:  'chain',
    });

    // 短暂延迟，确保地图 DOM 完全渲染后再切换到事件卡片模式
    setTimeout(() => {
      import('../../engine/GameLoop.js').then(({ processEventQueue }) => {
        processEventQueue(() => {
          // 引导结束后：写入"已看过"标签，返回地图
          StateManager.addTag('__TUTORIAL_DONE__');
          StateManager.saveGame();
          StateManager.setGamePhase(CONSTANTS.GAME_PHASE.MAP);
          log('info', 'MapScreen', '✅ 引导完成');
        });
      });
    }, 500);
  }

  // ───────────────────────────────────────────────────────────
  // 结束本月
  // ───────────────────────────────────────────────────────────

  _bindEndMonthButton() {
    const btn = this._container?.querySelector('#btn-end-month');
    if (!btn) return;

    btn.addEventListener('click', () => {
      this._promptEndMonth();
    });
  }

  // 【新增】：抽离出的结束本月确认逻辑
  _promptEndMonth() {
    const state = StateManager.getState();
    const apRemain = state.AP;

    const message = apRemain > 0 
      ? `本月还有 <span class="text-xjtlu-red font-black">${apRemain} 点 AP</span> 未使用，结束本月将会清零。<br><br>确定要进入下个月吗？`
      : `本月行动点已耗尽。<br><br>确定要结束本月行程，进入下个月吗？`;

    showConfirm({
      title: '结束本月',
      message: message,
      confirmText: '进入下月',
      cancelText: '再看看',
      confirmVariant: 'primary',
      onConfirm: () => {
        log('info', 'MapScreen', '📅 玩家确认月末结算');
        const btn = this._container?.querySelector('#btn-end-month');
        if (btn) {
          btn.disabled = true;
          btn.classList.add('opacity-50');
        }

        resolveMonthEnd(({ newMonth, examResult }) => {
          if (examResult) {
            // 【修改】：有期末成绩，进入学期总结界面
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
          } else {
            // 【修改】：无期末成绩，直接留在地图并刷新状态
            StateManager.setGamePhase(CONSTANTS.GAME_PHASE.MAP);
            if (btn) {
              btn.disabled = false;
              btn.classList.remove('opacity-50');
            }
          }
        });
      }
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
  // 时间轴
  // ───────────────────────────────────────────────────────────

  /**
   * 渲染底部时间轴，高亮当前月份，标出关键节点。
   * 由 mount() 初始调用，onStateChange() 时重新渲染。
   * @param {object} state
   */
  _renderTimeline(state) {
    const bar = this._container?.querySelector('#timeline-bar');
    if (!bar) return;

    const current = state.currentMonth;

    // 关键节点定义：month → { label, color }
    // color 对应 Tailwind 的文字色与背景色语义
    const MILESTONES = {
      4:  { label: '期末①', theme: 'exam'    },
      5:  { label: '寒假',   theme: 'holiday' },
      9:  { label: '期末②', theme: 'exam'    },
      10: { label: '暑假',   theme: 'holiday' },
      11: { label: '暑假',   theme: 'holiday' },
      12: { label: '申请季', theme: 'danger'  },
    };

    // 月份 → 现实月份简写（从 constants 截取前 2-3 字）
    const MONTH_SHORT = {
      1:  '9月',  2:  '10月', 3:  '11月', 4:  '12月',
      5:  '寒假', 6:  '3月',  7:  '4月',  8:  '5月',
      9:  '6月',  10: '7月',  11: '8月',  12: '9月↑',
    };

    // 主题 → CSS 类映射
    const THEME_CLASSES = {
      exam:    { dot: 'bg-xjtlu-amber',  text: 'text-xjtlu-amber'  },
      holiday: { dot: 'bg-xjtlu-green',  text: 'text-xjtlu-green'  },
      danger:  { dot: 'bg-xjtlu-red',    text: 'text-xjtlu-red'    },
    };

    const ticksHTML = Array.from({ length: 12 }, (_, i) => {
      const month     = i + 1;
      const isCurrent = month === current;
      const isPast    = month < current;
      const milestone = MILESTONES[month];

      // 刻度点样式
      const dotClass = isCurrent
        ? 'w-3 h-3 rounded-full bg-xjtlu-blue ring-2 ring-xjtlu-blue ring-offset-1 ring-offset-white'
        : isPast
          ? 'w-2 h-2 rounded-full bg-gray-300'
          : milestone
            ? `w-2.5 h-2.5 rounded-full ${THEME_CLASSES[milestone.theme].dot}`
            : 'w-2 h-2 rounded-full bg-gray-300';

      // 月份文字样式
      const monthTextClass = isCurrent
        ? 'font-black text-xjtlu-blue'
        : isPast
          ? 'text-gray-300'
          : milestone
            ? `font-bold ${THEME_CLASSES[milestone.theme].text}`
            : 'text-gray-400';

      // 关键节点标签（显示在月份文字上方）
      const milestoneHTML = milestone && !isPast ? `
        <span class="absolute -top-4 left-1/2 -translate-x-1/2
                     text-[0.55rem] font-black whitespace-nowrap
                     ${THEME_CLASSES[milestone.theme].text}">
          ${milestone.label}
        </span>
      ` : '';

      // 当前月份指示箭头
      const arrowHTML = isCurrent ? `
        <span class="absolute -top-3.5 left-1/2 -translate-x-1/2
                     text-xjtlu-blue text-[0.6rem] font-black leading-none">
          ▼
        </span>
      ` : '';

      return `
        <div class="relative flex flex-col items-center gap-1 flex-1">
          ${milestoneHTML}
          ${arrowHTML}
          <div class="${dotClass} shrink-0"></div>
          <span class="text-[0.6rem] ${monthTextClass} leading-none">
            ${MONTH_SHORT[month]}
          </span>
        </div>
      `;
    }).join('');

    // 连接线（绝对定位，穿过所有刻度点的中心）
    bar.innerHTML = `
      <div class="relative flex items-center w-full pt-5 pb-1">
        <!-- 背景连接线 -->
        <div class="absolute left-[calc(100%/24)] right-[calc(100%/24)]
                    top-[calc(1.25rem+0.375rem)]
                    h-px bg-gray-200 z-0">
        </div>
        <!-- 已过去的进度线 -->
        <div class="absolute left-[calc(100%/24)]
                    top-[calc(1.25rem+0.375rem)]
                    h-px bg-xjtlu-blue/40 z-0 transition-all duration-500"
             style="width: calc((${current - 1} / 11) * (100% - 100%/12))">
        </div>
        <!-- 刻度组 -->
        ${ticksHTML}
      </div>
    `;
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
        <!-- 【修改】：text-sm -> text-base -->
        <h3 class="text-base font-black text-xjtlu-navy flex items-center gap-1.5">
          <i data-lucide="contact" class="lucide w-4 h-4"></i>
          我的申请履历
        </h3>
        
        <!-- 教学 Tooltip -->
        <i data-lucide="help-circle" 
           class="lucide w-4 h-4 text-xjtlu-gray cursor-help"
           data-tooltip-title="状态与增益说明"
           data-tooltip-desc="你的履历（GPA、雅思、软背景）将直接决定最终能拿到的 Offer 级别。<br><br>下方的<span class='text-xjtlu-yellow font-bold'>活跃状态 (Buff)</span> 会在日常行动中为你提供额外的数值加成或惩罚。请注意保持心理健康，避免获得负面状态！"
           data-tooltip-type="info">
        </i>
      </div>

      <div class="flex-1 overflow-y-auto custom-scroll p-5 flex flex-col gap-4">
        
        <!-- 硬件条件 -->
        <div class="grid grid-cols-2 gap-3">
          <div class="bg-white p-3 rounded-xl border border-gray-100 shadow-sm flex flex-col gap-1">
            <!-- 【修改】：text-[0.65rem] -> text-xs -->
            <span class="text-xs font-bold text-xjtlu-gray uppercase tracking-wider">累计 GPA</span>
            <!-- 【修改】：text-lg -> text-xl -->
            <span class="text-xl font-black ${state.cumulativeGPA >= 3.3 ? 'text-xjtlu-green' : 'text-xjtlu-navy'}">
              ${state.cumulativeGPA ? state.cumulativeGPA.toFixed(2) : '暂无'}
            </span>
          </div>
          <div class="bg-white p-3 rounded-xl border border-gray-100 shadow-sm flex flex-col gap-1">
            <!-- 【修改】：text-[0.65rem] -> text-xs -->
            <span class="text-xs font-bold text-xjtlu-gray uppercase tracking-wider">雅思成绩</span>
            <!-- 【修改】：text-lg -> text-xl -->
            <span class="text-xl font-black ${ieltsScore !== '未出分' ? 'text-xjtlu-blue' : 'text-gray-400'}">
              ${ieltsScore}
            </span>
          </div>
        </div>

        <!-- 软背景 -->
        <div class="flex flex-col gap-2">
          <!-- 【修改】：text-[0.65rem] -> text-xs -->
          <span class="text-xs font-bold text-xjtlu-gray uppercase tracking-wider">软背景积累</span>
          <div class="flex flex-wrap gap-2">
            ${softBgs.length > 0 
              ? softBgs.map(bg => `<span class="tag-badge tag-badge--blue">${bg}</span>`).join('')
              : `<span class="text-sm text-gray-400 italic">简历空空如也...去参加点活动吧</span>`
            }
          </div>
        </div>

        <div class="h-px bg-gray-200 my-1"></div>

        <!-- 活跃 Buff -->
        <div class="flex flex-col gap-2">
          <!-- 【修改】：text-[0.65rem] -> text-xs -->
          <span class="text-xs font-bold text-xjtlu-gray uppercase tracking-wider">活跃状态 (Buffs)</span>
          <div class="flex flex-wrap gap-2">
            ${state.activeBuff && state.activeBuff.length > 0 
              ? state.activeBuff.map(buff => this._buildBuffBadge(buff)).join('')
              : `<span class="text-sm text-gray-400 italic">当前无特殊状态</span>`
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
    const durationText = buff.durationType === 'months' ? `剩余 ${buff.remainingMonths} 个月` : '永久效果';

    // 【修改点 2】：移除内部的 absolute div，换成 data 属性
    return `
      <span class="tag-badge ${colorClass} cursor-help shadow-sm"
            data-tooltip-title="${buff.label}"
            data-tooltip-desc="${effectDesc}"
            data-tooltip-footer="${durationText}"
            data-tooltip-type="${isDebuff ? 'debuff' : 'buff'}">
        <i data-lucide="${buff.icon ?? 'star'}" class="lucide w-3 h-3"></i>
        ${buff.label}
      </span>
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
        <!-- 【修改】：text-sm -> text-base -->
        <p class="text-base font-bold text-xjtlu-navy">点击地图上的建筑</p>
        <!-- 【修改】：text-xs -> text-sm -->
        <p class="text-sm text-xjtlu-gray leading-relaxed">
          蓝色标记可消耗 AP 执行活动<br>灰色标记仅供了解
        </p>
        <div class="mt-4 flex flex-col gap-2 w-full max-w-[180px]">
          <!-- 【修改】：text-xs -> text-sm -->
          <div class="flex items-center gap-2 text-sm text-xjtlu-gray">
            <div class="w-3 h-3 rounded-full bg-xjtlu-blue shrink-0"></div>
            可执行行动的建筑
          </div>
          <!-- 【修改】：text-xs -> text-sm -->
          <div class="flex items-center gap-2 text-sm text-xjtlu-gray">
            <div class="w-3 h-3 rounded-full bg-gray-400 shrink-0"></div>
            纯科普建筑
          </div>
        </div>
      </div>
      <div class="shrink-0 border-t border-gray-100 px-5 py-3
                  flex items-center gap-2 text-sm text-xjtlu-gray">
        <!-- 【修改】：text-xs -> text-sm -->
        <i data-lucide="zap" class="lucide w-4 h-4 text-xjtlu-blue"></i>
        本月剩余行动点显示在顶部状态栏
      </div>
    `;
  }

  _buildBuildingPanel(building) {
    // 同样改为动态判定
    const isAction = this._state?.unlockedBuildings?.includes(building.id);

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
                <!-- 【修改】：text-sm -> text-base -->
                <h2 class="text-base font-black text-xjtlu-navy leading-tight">
                  ${building.name}
                </h2>
                <span class="tag-badge
                             ${isAction ? 'tag-badge--blue' : 'tag-badge--gray'}
                             text-[0.6rem]">
                  ${isAction ? '可行动' : '纯科普'}
                </span>
              </div>
              <!-- 【修改】：text-[0.65rem] -> text-xs -->
              <p class="text-xs text-xjtlu-gray mt-0.5">
                ${building.fullName}
              </p>
            </div>
          </div>
        </div>

        <!-- 内容（可滚动）-->
        <div class="flex-1 overflow-y-auto custom-scroll px-5 py-4
                    flex flex-col gap-4">
          <!-- 【修改】：text-xs -> text-sm -->
          <p class="text-sm text-gray-600 leading-relaxed">
            ${building.description}
          </p>
          <div class="bg-gray-50 rounded-xl p-3 border border-gray-100">
            <div class="flex items-center gap-1.5 mb-1.5">
              <i data-lucide="message-square-quote"
                 class="lucide w-3 h-3 text-xjtlu-gray"></i>
              <!-- 【修改】：text-[0.6rem] -> text-[0.65rem] -->
              <span class="text-[0.65rem] font-bold text-xjtlu-gray
                           tracking-wider uppercase">同学说</span>
            </div>
            <!-- 【修改】：text-xs -> text-sm -->
            <p class="text-sm text-gray-500 leading-relaxed italic">
              ${building.lore}
            </p>
          </div>
        </div>

      </div>
    `;
  }

  // ───────────────────────────────────────────────────────────
  // 行动执行
  // ───────────────────────────────────────────────────────────

  _handleAction(actionId) {
    const action = ACTIONS[actionId];
    if (!action) return;

    executeAction(actionId, action, () => {
      // 【新增】：行动和相关事件全部结束后，检查 AP
      if (StateManager.getState().AP <= 0) {
        // 稍微延迟弹出，避免和事件卡片的关闭动画冲突
        setTimeout(() => {
          this._promptEndMonth();
        }, 300);
      }
    });
  }

  // ───────────────────────────────────────────────────────────
  // 新增：地图引脚气泡 (Action Popover)
  // ───────────────────────────────────────────────────────────

  _renderActionPopover(building) {
    const popover = this._container?.querySelector('#action-popover');
    if (!popover) return;

    const isAction = this._state?.unlockedBuildings?.includes(building.id);
    const actions  = building.actions.map(id => ACTIONS[id]).filter(Boolean);
    const apRemain = this._state?.AP ?? 0;

    if (!isAction || actions.length === 0) {
      this._hideActionPopover();
      return;
    }

    const buttonsHTML = actions.map(action => {
      const canAfford = apRemain >= action.apCost;
      return `
        <button class="action-btn w-44 text-left flex items-center gap-2.5 px-3 py-2.5 rounded-lg transition-colors duration-150 ${canAfford ? 'bg-white hover:bg-xjtlu-blue hover:text-white text-xjtlu-navy border border-gray-200 hover:border-xjtlu-blue shadow-sm cursor-pointer' : 'bg-gray-100 text-gray-400 border border-transparent cursor-not-allowed'}"
          data-action-id="${action.id}" ${!canAfford ? 'disabled' : ''}>
          <div class="flex items-center justify-center w-6 h-6 rounded bg-gray-100/50 shrink-0">
            <i data-lucide="${action.icon}" class="lucide w-4 h-4"></i>
          </div>
          <span class="font-bold text-sm flex-1 leading-none tracking-wide">${action.label}</span>
          <span class="text-[0.65rem] font-black opacity-60 shrink-0">-${action.apCost} AP</span>
        </button>
      `;
    }).join('');

    // 【新增】：动态位置计算
    const pos = this._hotspotPositions[building.id];
    // 如果建筑太靠顶部（Y坐标小于 25%），气泡向下弹出；否则向上弹出
    const isNearTop = pos.y < 25; 
    
    // 偏移量设为 22px，彻底避开 Pin
    const transformStyle = isNearTop 
      ? 'translate(-50%, 22px)' 
      : 'translate(-50%, calc(-100% - 22px))';
      
    // 小尾巴的位置也要跟着反转
    const arrowClass = isNearTop 
      ? '-top-1.5 border-t border-l' 
      : '-bottom-1.5 border-b border-r';

    popover.innerHTML = `
      <div class="bg-white/95 backdrop-blur-sm p-1.5 rounded-xl shadow-xl border border-gray-200 flex flex-col gap-1.5 relative">
        ${buttonsHTML}
        <!-- 动态小尾巴 -->
        <div class="absolute ${arrowClass} left-1/2 -translate-x-1/2 w-3 h-3 bg-white/95 border-gray-200 transform rotate-45"></div>
      </div>
    `;

    popover.querySelectorAll('.action-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        this._hideActionPopover();
        this._handleAction(btn.dataset.actionId);
      });
    });

    if (typeof lucide !== 'undefined') lucide.createIcons({ root: popover });

    popover.style.left = `${pos.x}%`;
    popover.style.top  = `${pos.y}%`;
    popover.style.transform = transformStyle; // 【应用动态 Transform】
    
    popover.classList.remove('hidden');
    popover.style.pointerEvents = 'auto';
    void popover.offsetWidth; 
    popover.classList.remove('opacity-0', 'scale-95');
    popover.classList.add('opacity-100', 'scale-100');
  }

  _hideActionPopover() {
    const popover = this._container?.querySelector('#action-popover');
    if (!popover) return;
    
    popover.classList.remove('opacity-100', 'scale-100');
    popover.classList.add('opacity-0', 'scale-95');
    popover.style.pointerEvents = 'none';
    
    // 等待过渡动画结束后隐藏 DOM
    setTimeout(() => {
      if (popover.classList.contains('opacity-0')) {
        popover.classList.add('hidden');
        popover.innerHTML = ''; // 清空内容
      }
    }, 150);
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