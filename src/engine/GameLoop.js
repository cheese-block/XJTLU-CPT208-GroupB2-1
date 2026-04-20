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

  // 互斥锁，防止重复点击
  if (state.isProcessing) {
    log('warn', 'GameLoop', '行动被拦截：当前有事件正在处理中');
    return false;
  }

  // 1. 计算真实的 AP 消耗并扣除
  const apMod       = BuffEngine.getAPCostModifier(state, actionId);
  const finalApCost = Math.max(0, action.apCost + apMod);

  if (!StateManager.consumeAP(finalApCost)) {
    log('info', 'GameLoop', 'AP 不足，行动取消');
    return false;
  }

  // 2. 进度标签追踪 (如：科研积累)
  if (action.tagsProgress) {
    _trackProgressTag(action.tagsProgress);
  }

  // 3. 核心机制改变：从建筑卡池中抽卡
  let hitEventId = null;
  if (action.eventPool && action.eventPool.length > 0) {
    // 简单随机抽取（MVP 阶段暂不加权重干预）
    const randomIndex = Math.floor(Math.random() * action.eventPool.length);
    hitEventId = action.eventPool[randomIndex];
  }

  // 4. 将抽到的地点事件推入队列头部
  if (hitEventId) {
    StateManager.enqueueEventFront({ eventId: hitEventId, source: 'location' });
    log('info', 'GameLoop', `🎯 抽卡命中：${hitEventId}`);
  }

  // 【移除】：删除了原本在此处的“判定是否触发全局随机突发事件”逻辑

  // 5. 存档并启动事件队列
  StateManager.saveGame();

  const newState = StateManager.getState();
  if (newState.pendingEventQueue.length > 0) {
    StateManager.setProcessing(true); // 加锁
    processEventQueue(() => {
      StateManager.setProcessing(false); // 解锁
      StateManager.setGamePhase(CONSTANTS.GAME_PHASE.MAP); // 返回地图
      if (onEvent) onEvent();
    });
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

  // 【修复】：接收 StateManager 深度克隆后的安全副本，防止 UI 层变异污染全局 EVENTS
  const clonedEventData = StateManager.startEvent(eventData);
  
  const useVN = ['tutorial_intro_1', 'tutorial_intro_2', 'sem1_final_exam', 'sem2_final_exam']
    .includes(clonedEventData.event_id);
  const targetPhase = useVN ? CONSTANTS.GAME_PHASE.VN : CONSTANTS.GAME_PHASE.EVENT_CARD;
  const targetScreen = useVN ? _vnScreen : _eventCardScreen;

  StateManager.setGamePhase(targetPhase);

  setTimeout(() => {
    // 【修复】：传递 clonedEventData 而不是原始的 eventData
    targetScreen.startEvent(clonedEventData, () => {
      StateManager.markEventTriggered(clonedEventData.event_id);
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

  const badEnd = checkBadEndings();
  if (badEnd) {
    StateManager.saveGame();
    StateManager.setProcessing(false);
    return;
  }

  const { newMonth, isGameEnd } = StateManager.advanceMonth();
  
  // 【新增】：第 3 个月（春招季）动态解锁 IA 建筑
  if (newMonth === 3) {
    StateManager.unlockBuilding('ia');
  }

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
      // 【修复】：先添加 Tag，再触发结局阶段切换
      StateManager.addTag(check.tag);
      StateManager.setGamePhase(CONSTANTS.GAME_PHASE.ENDING);
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