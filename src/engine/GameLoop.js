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

  // 1. 拦截处理
  if (state.isProcessing) return false;

  // 2. 消耗计算
  const apMod       = BuffEngine.getAPCostModifier(state, actionId);
  const finalApCost = Math.max(0, action.apCost + apMod);
  if (!StateManager.consumeAP(finalApCost)) return false;

  // 3. 进度标签
  if (action.tagsProgress) _trackProgressTag(action.tagsProgress);

  // --- 核心修改：唯一性过滤 + 保底抽卡逻辑 ---
  
  // 过滤出未触发过的事件
  const pool = action.eventPool || [];
  const availableEvents = pool.filter(id => !state.triggeredEventIds.includes(id));
  const guaranteedId = action.guaranteedEventId;

  let hitEventId = guaranteedId; // 默认设为保底

  if (availableEvents.length > 0) {
    // 设定 80% 的概率出现新事件，20% 的概率出现保底日常
    const shouldShowNew = Math.random() < 0.8;
    
    if (shouldShowNew) {
      const randomIndex = Math.floor(Math.random() * availableEvents.length);
      hitEventId = availableEvents[randomIndex];
    }
  }
  // 如果 availableEvents 长度为 0，hitEventId 保持为 guaranteedId
  
  // 4. 将抽到的地点事件推入队列
  if (hitEventId) {
    StateManager.enqueueEventFront({ eventId: hitEventId, source: 'location' });
  }

  // 死亡检查：如果满足死亡条件，会注入 death_xxx 事件并清空队列
  const isDead = checkBadEndings(); 

  StateManager.saveGame();
  StateManager.setProcessing(true);

  processEventQueue(() => {
    StateManager.setProcessing(false);
    if (isDead) {
      // 【修改】：死亡后跳过标签展示，直接展示最终结局
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

  // --- 修改：死亡拦截点 2 ---
  const isDead = checkBadEndings();

  if (isDead) {
    processEventQueue(() => {
      StateManager.setProcessing(false);
      // 【修改】：死亡后跳过标签展示，直接展示最终结局
      StateManager.setGamePhase(CONSTANTS.GAME_PHASE.ENDING);
    });
    return; 
  }

  const { newMonth, isGameEnd } = StateManager.advanceMonth();
  
  // 第 3 个月（春招季）动态解锁 IA 建筑
  if (newMonth === 3) {
    StateManager.unlockBuilding('ia');
  }

  StateManager.saveGame();
  StateManager.setProcessing(false);

  if (isGameEnd) {
    // 正常通关流程：保留标签展示页面
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
      log('warn', 'GameLoop', `💀 触发死亡流程：${check.tag}`);
      // 1. 立即打上结局标签
      StateManager.addTag(check.tag);
      // 2. 清空当前所有队列，确保死亡事件是唯一且最后的
      _clearEventQueue(); 
      // 3. 注入死亡叙事事件
      StateManager.enqueueEventFront({ eventId: check.evt, source: 'chain' });
      return true; 
    }
  }
  return false;
}

// 辅助函数：清空队列
function _clearEventQueue() {
  const state = StateManager.getState();
  while (state.pendingEventQueue.length > 0) {
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