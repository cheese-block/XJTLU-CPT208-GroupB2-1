/**
 * @fileoverview 游戏主循环
 *
 * 职责：
 *   - 协调 EventEngine、ExamEngine、StateManager 的调用顺序
 *   - 管理"执行行动 → 触发随机事件 → 月末结算 → 推进月份"的完整流程
 *   - 持有 VNScreen 引用，负责启动事件播放
 *   - 检查 Bad Ending 触发条件
 */

import { CONSTANTS }             from '../utils/constants.js';
import * as StateManager         from '../state/StateManager.js';
import * as EventEngine          from './EventEngine.js';
import { resolveFinalExam }      from './ExamEngine.js';
import { resolveIeltsExam }      from './ExamEngine.js';
import { log, deepClone }        from '../utils/helpers.js';
import * as BuffEngine           from './BuffEngine.js';
import { showConfirm }           from '../ui/components/ConfirmModal.js';
import { t }                     from '../utils/i18n.js';

// ─────────────────────────────────────────────────────────────
// 模块内部引用
// ─────────────────────────────────────────────────────────────

/** @type {import('../ui/screens/VNScreen.js').VNScreen|null} */
let _vnScreen     = null;
let _eventCardScreen = null;

/** @type {function|null} 事件结束后的回调（由 processEventQueue 设置）*/
let _onQueueEmpty = null;

// ─────────────────────────────────────────────────────────────
// 初始化
// ─────────────────────────────────────────────────────────────

export function initGameLoop(vnScreen, eventCardScreen) {
  _vnScreen = vnScreen;
  _eventCardScreen = eventCardScreen;
  log('info', 'GameLoop', '✅ 初始化完成');
}

// ─────────────────────────────────────────────────────────────
// 行动执行（由 MapScreen 调用）
// ─────────────────────────────────────────────────────────────

export function executeAction(actionId, action, onEvent) {
  const state = StateManager.getState();
  if (state.isProcessing) return false;

  const apMod       = BuffEngine.getAPCostModifier(state, actionId);
  const finalApCost = Math.max(0, action.apCost + apMod);
  if (!StateManager.consumeAP(finalApCost)) return false;

  if (action.tagsProgress) _trackProgressTag(action.tagsProgress);

  const pool = action.eventPool || [];
  const availableEvents = pool.filter(id => !state.triggeredEventIds.includes(id));
  const guaranteedId = action.guaranteedEventId;
  let hitEventId = guaranteedId;

  if (availableEvents.length > 0) {
    if (Math.random() < 0.8) {
      hitEventId = availableEvents[Math.floor(Math.random() * availableEvents.length)];
    }
  }

  if (hitEventId) {
    StateManager.enqueueEventFront({ eventId: hitEventId, source: 'location' });
  }

  // 初始检查（以防万一）
  checkBadEndings(); 

  StateManager.saveGame();
  StateManager.setProcessing(true);

  processEventQueue(() => {
    StateManager.setProcessing(false);
    
    // 动态检查：队列处理完后，看一眼玩家现在是不是死了
    const currentState = StateManager.getState();
    const isDead = currentState.tags.some(t => t.startsWith('__BAD_END_'));

    if (isDead) {
      StateManager.setGamePhase(CONSTANTS.GAME_PHASE.ENDING);
    } else {
      StateManager.setGamePhase(CONSTANTS.GAME_PHASE.MAP);
      if (onEvent) onEvent();
    }
  });

  return true;
}

// ─────────────────────────────────────────────────────────────
// 事件队列处理
// ─────────────────────────────────────────────────────────────

export function processEventQueue(onEmpty) {
  _onQueueEmpty = onEmpty;
  _playNextEvent();
}

function _playNextEvent() {
  // --- 新增：每次从队列取事件前，做一次同步的死亡检查 ---
  checkBadEndings();

  const state = StateManager.getState();
  let eventData = EventEngine.dequeueNextEvent(state);

  if (!eventData) {
    log('info', 'GameLoop', '事件队列已清空');
    _onQueueEmpty?.();
    return;
  }

  // 雅思考试特殊处理：动态注入出分结果
  if (eventData.event_id === 'ielts_exam_result') {
    const result = resolveIeltsExam(state);
    
    if (eventData.scenes && eventData.scenes.length > 1) {
      const band = result.band;
      let evaluation = '';
      if (band === '7.5') evaluation = '远超预期！';
      else if (band === '7.0') evaluation = '达到了目标！';
      else if (band === '6.5') evaluation = '勉强够用。';
      else if (band === '6.0') evaluation = '不太理想。';
      else evaluation = '需要继续努力。';
      
      eventData.scenes[1].text = `雅思成绩：${band} 分。\n\n${evaluation}\n\n${result.summary}`;
    }
  }

  const clonedEventData = StateManager.startEvent(eventData);
  
  const useVN = ['sem1_final_exam', 'sem2_final_exam']
    .includes(clonedEventData.event_id);
  const targetPhase = useVN ? CONSTANTS.GAME_PHASE.VN : CONSTANTS.GAME_PHASE.EVENT_CARD;
  const targetScreen = useVN ? _vnScreen : _eventCardScreen;

  StateManager.setGamePhase(targetPhase);

  setTimeout(() => {
    targetScreen.startEvent(clonedEventData, () => {
      
      // --- 修改：保底事件不记录触发 ID，允许重复出现 ---
      if (!clonedEventData.event_id.startsWith('default_')) {
        StateManager.markEventTriggered(clonedEventData.event_id);
      }
      // --- 修改结束 ---

      StateManager.saveGame();
      _playNextEvent();
    });
  }, 100);
}

// ─────────────────────────────────────────────────────────────
// 月末结算
// ─────────────────────────────────────────────────────────────

// --- 重构 resolveMonthEnd，编排大结局顺序 ---
export function resolveMonthEnd(onMonthEnd) {
  const state = StateManager.getState();
  StateManager.setProcessing(true);

  // 1. 注入并处理当月 Scheduled 事件（如期末考试 VN）
  EventEngine.checkScheduledEvents(state);

  processEventQueue(() => {
    const stateAfterEvents = StateManager.getState();
    
    // 2. 计算成绩
    let examResult = null;
    if (stateAfterEvents.currentMonth === CONSTANTS.MAX_MONTHS) {
      examResult = resolveFinalExam(stateAfterEvents);
    }

    // 3. 检查死亡
    if (checkBadEndings()) {
      StateManager.setGamePhase(CONSTANTS.GAME_PHASE.ENDING);
      return;
    }

    // 4. 推进月份
    const { isGameEnd } = StateManager.advanceMonth();

    if (isGameEnd) {
      // --- 大结局特殊流程 ---
      // 先展示学期总结
      window._pendingMonthSummary = {
        prevMonth: CONSTANTS.MAX_MONTHS,
        newMonth: CONSTANTS.MAX_MONTHS,
        examResult,
        state: StateManager.getState(),
        onConfirm: () => {
          // 总结确认后，注入“提交申请”事件卡片
          StateManager.enqueueEventFront({ eventId: 'final_application', source: 'scheduled' });
          processEventQueue(() => {
            // 申请卡片点完后，弹出 Demo 结束弹窗
            const isEn = StateManager.getLang() === 'en';
            showConfirm({
              title: isEn ? 'Demo Completed' : 'Demo 体验结束',
              message: isEn ? 'Review your journey.' : '你的申请履历已经锁定，开始复盘。',
              confirmText: isEn ? 'Review' : '开始复盘',
              cancelText: '',
              onConfirm: () => StateManager.setGamePhase(CONSTANTS.GAME_PHASE.TAG_SHOWCASE)
            });
          });
        }
      };
      StateManager.setGamePhase(CONSTANTS.GAME_PHASE.MONTH_SUMMARY);
    } else {
      // 普通月份：展示总结页
      onMonthEnd?.({ newMonth: stateAfterEvents.currentMonth + 1, examResult });
    }
  });
}

// 修改 _resolveEndOfMonth 方法中的逻辑
function _resolveEndOfMonth(onMonthEnd) {
  const state = StateManager.getState();

  let examResult = null;
  // 检查是否是期末月（Demo 第4个月强制结算 GPA）
  if (CONSTANTS.SEMESTER_END_MONTHS.includes(state.currentMonth) || state.currentMonth === CONSTANTS.MAX_MONTHS) {
    examResult = resolveFinalExam(state);
    log('info', 'GameLoop', `📝 期末结算：GPA ${examResult.gpa}`);
  }

  _tickBuffDurations();
  const isDead = checkBadEndings();

  if (isDead) {
    processEventQueue(() => {
      StateManager.setProcessing(false);
      StateManager.setGamePhase(CONSTANTS.GAME_PHASE.ENDING);
    });
    return; 
  }

  const { newMonth, isGameEnd } = StateManager.advanceMonth();
  StateManager.saveGame();
  StateManager.setProcessing(false);

  if (isGameEnd) {
    const isEn = StateManager.getLang() === 'en';
    showConfirm({
      title: isEn ? 'Demo Completed' : 'Demo 体验结束',
      message: isEn 
        ? 'Your profile is now locked. Let\'s review your journey.' 
        : 'Demo 版体验到此结束。\n\n你的申请履历已经锁定，在查看录取结果前，先复盘一下你的表现。',
      confirmText: isEn ? 'Review Profile' : '开始复盘',
      cancelText: '', 
      confirmVariant: 'primary',
      onConfirm: () => {
        // 【修复点】：跳转至标签展示页（复盘界面）
        StateManager.setGamePhase(CONSTANTS.GAME_PHASE.TAG_SHOWCASE);
      }
    });
  } else {
    // 正常月份推进，回调 MapScreen 展示 MonthSummaryScreen
    onMonthEnd?.({ newMonth, examResult });
  }
}

// ─────────────────────────────────────────────────────────────
// Bad Ending 检查 (走钢丝机制)
// ─────────────────────────────────────────────────────────────

/**
 * 检查是否触发走钢丝 Bad Ending。
 * 心理、身体、资金 任何一项 <=0 或 >=100 都会触发。
 * @returns {boolean} 是否触发了死亡结局
 */
export function checkBadEndings() {
  const state = StateManager.getState();
  
  // 已经死过了就不要重复触发死亡流程
  if (state.tags.some(t => t.startsWith('__BAD_END_'))) return true;

  const checks = [
    { cond: state.Mental_Health <= 0,   tag: '__BAD_END_MENTAL_0__',   evt: 'death_mental_0' },
    { cond: state.Mental_Health >= 100, tag: '__BAD_END_MENTAL_100__', evt: 'death_mental_100' },
    { cond: state.Physical_Health <= 0, tag: '__BAD_END_PHYSICAL_0__', evt: 'death_physical_0' },
    { cond: state.Physical_Health >= 100, tag: '__BAD_END_PHYSICAL_100__', evt: 'death_physical_100' },
    { cond: state.Money <= 0,           tag: '__BAD_END_MONEY_0__',    evt: 'death_money_0' },
    { cond: state.Money >= 100,         tag: '__BAD_END_MONEY_100__',  evt: 'death_money_100' },
  ];

  for (const check of checks) {
    if (check.cond) {
      log('warn', 'GameLoop', `💀 触发死亡：${check.tag}`);
      StateManager.addTag(check.tag);
      
      // 清空当前队列，确保死亡是绝对的终点
      const s = StateManager.getState();
      while (s.pendingEventQueue.length > 0) {
        StateManager.dequeueEvent();
      }
      
      // 注入死亡叙事
      StateManager.enqueueEventBack({ eventId: check.evt, source: 'chain' });
      return true;
    }
  }
  return false;
}

// 内部辅助，如果不想单独定义可以写在 checkBadEndings 里面
function _clearEventQueue() {
  const s = StateManager.getState();
  while (s.pendingEventQueue.length > 0) {
    StateManager.dequeueEvent();
  }
}

// ─────────────────────────────────────────────────────────────
// 结局触发
// ─────────────────────────────────────────────────────────────

export function triggerEnding() {
  log('info', 'GameLoop', '🎬 触发结局流程');
  StateManager.setGamePhase(CONSTANTS.GAME_PHASE.TAG_SHOWCASE);
}

// ─────────────────────────────────────────────────────────────
// 内部工具
// ─────────────────────────────────────────────────────────────

function _trackProgressTag(tagKey) {
  const countKey = `__progress_${tagKey}__`;
  const state    = StateManager.getState();

  const countTag = state.tags.find(t => t.startsWith(countKey));
  const count    = countTag ? parseInt(countTag.replace(countKey, ''), 10) : 0;
  const newCount = count + 1;

  if (countTag) StateManager.removeTag(countTag);

  if (newCount >= 3) {
    StateManager.addTag(tagKey);
    log('info', 'GameLoop', `✅ 进度标签达成：${tagKey}`);
  } else {
    StateManager.addTag(`${countKey}${newCount}`);
    log('debug', 'GameLoop', `进度标签：${tagKey} ${newCount}/3`);
  }
}

function _tickBuffDurations() {
  const state = StateManager.getState();
  state.activeBuff.forEach(buff => {
    if (buff.durationType === 'months' && buff.remainingMonths !== null) {
      if (buff.remainingMonths <= 1) {
        StateManager.removeBuff(buff.buffId);
        log('info', 'GameLoop', `Buff 过期：${buff.label}`);
      } else {
        StateManager.addBuff({
          ...buff,
          remainingMonths: buff.remainingMonths - 1,
        });
      }
    }
  });
}