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

// ─────────────────────────────────────────────────────────────
// 模块内部引用
// ─────────────────────────────────────────────────────────────

/** @type {import('../ui/screens/VNScreen.js').VNScreen|null} */
let _vnScreen     = null;

/** @type {function|null} 事件结束后的回调（由 processEventQueue 设置）*/
let _onQueueEmpty = null;

// ─────────────────────────────────────────────────────────────
// 初始化
// ─────────────────────────────────────────────────────────────

export function initGameLoop(vnScreen) {
  _vnScreen = vnScreen;
  log('info', 'GameLoop', '✅ 初始化完成');
}

// ─────────────────────────────────────────────────────────────
// 行动执行（由 MapScreen 调用）
// ─────────────────────────────────────────────────────────────

export function executeAction(actionId, action, onEvent) {
  const state = StateManager.getState();

  if (state.isProcessing) {
    log('warn', 'GameLoop', '行动被拦截：当前有事件正在处理中');
    return false;
  }

  // ── 计算真实的 AP 消耗 ──
  const apMod       = BuffEngine.getAPCostModifier(state, actionId);
  const finalApCost = Math.max(0, action.apCost + apMod);

  if (!StateManager.consumeAP(finalApCost)) {
    log('info', 'GameLoop', 'AP 不足，行动取消');
    return false;
  }

  // ── 计算真实的数值收益（后续 Phase 3 改造为抽卡后，此处将移除）──
  const finalEffects = BuffEngine.applyBuffModifiers(state, actionId, action.baseEffects);
  StateManager.applyStatDelta(finalEffects, action.labels ?? {});

  if (action.tagsProgress) {
    _trackProgressTag(action.tagsProgress);
  }

  // Bad Ending 检查
  const badEnd = checkBadEndings();
  if (badEnd) return true;

  StateManager.saveGame();

  const fresh = StateManager.getState();
  if (fresh.pendingEventQueue.length > 0) {
    log('info', 'GameLoop', '队列已有事件，跳过本次随机事件判定');
    return true;
  }

  const hitId = EventEngine.rollRandomEvent(fresh);

  if (hitId) {
    StateManager.setProcessing(true);
    setTimeout(() => {
      processEventQueue(() => {
        StateManager.setProcessing(false);
        StateManager.setGamePhase(CONSTANTS.GAME_PHASE.MAP);
        if (onEvent) onEvent();
      });
    }, 800);
  }

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
  const state     = StateManager.getState();
  let eventData = EventEngine.dequeueNextEvent(state);

  if (!eventData) {
    log('info', 'GameLoop', '事件队列已清空');
    _onQueueEmpty?.();
    return;
  }

  if (eventData.event_id === 'ielts_exam_result') {
    eventData = deepClone(eventData); 
    const result = resolveIeltsExam(StateManager.getState());
    eventData.scenes[1].text = result.summary;
    StateManager.saveGame();
  }

  StateManager.startEvent(eventData);
  StateManager.setGamePhase(CONSTANTS.GAME_PHASE.VN);

  setTimeout(() => {
    _vnScreen?.startEvent(eventData, () => {
      StateManager.markEventTriggered(eventData.event_id);
      StateManager.saveGame();
      _playNextEvent();
    });
  }, 700);
}

// ─────────────────────────────────────────────────────────────
// 月末结算
// ─────────────────────────────────────────────────────────────

export function resolveMonthEnd(onMonthEnd) {
  const state = StateManager.getState();
  log('info', 'GameLoop', `📅 月末结算开始：Month ${state.currentMonth}`);

  StateManager.setProcessing(true);
  EventEngine.checkScheduledEvents(state);

  processEventQueue(() => {
    _resolveEndOfMonth(onMonthEnd);
  });
}

function _resolveEndOfMonth(onMonthEnd) {
  const state = StateManager.getState();

  let examResult = null;
  if (CONSTANTS.SEMESTER_END_MONTHS.includes(state.currentMonth)) {
    examResult = resolveFinalExam(state);
    log('info', 'GameLoop', `📝 期末结算：GPA ${examResult.gpa}`);
  }

  _tickBuffDurations();

  const badEnd = checkBadEndings();
  if (badEnd) {
    StateManager.saveGame();
    StateManager.setProcessing(false);
    return;
  }

  const { newMonth, isGameEnd } = StateManager.advanceMonth();
  StateManager.saveGame();
  StateManager.setProcessing(false);

  if (isGameEnd) {
    triggerEnding();
  } else {
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

  const deathChecks = [
    { condition: state.Mental_Health <= 0,   tag: '__BAD_END_MENTAL_0__' },
    { condition: state.Mental_Health >= 100, tag: '__BAD_END_MENTAL_100__' },
    { condition: state.Physical_Health <= 0,   tag: '__BAD_END_PHYSICAL_0__' },
    { condition: state.Physical_Health >= 100, tag: '__BAD_END_PHYSICAL_100__' },
    { condition: state.Money <= 0,   tag: '__BAD_END_MONEY_0__' },
    { condition: state.Money >= 100, tag: '__BAD_END_MONEY_100__' },
  ];

  for (const check of deathChecks) {
    if (check.condition) {
      log('warn', 'GameLoop', `💀 走钢丝失败，触发结局：${check.tag}`);
      StateManager.setGamePhase(CONSTANTS.GAME_PHASE.ENDING);
      StateManager.addTag(check.tag);
      return true; // 拦截后续流程
    }
  }

  return false;
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