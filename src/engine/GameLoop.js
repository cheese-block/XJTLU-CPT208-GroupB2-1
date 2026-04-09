/**
 * @fileoverview 游戏主循环
 *
 * 职责：
 *   - 协调 EventEngine、ExamEngine、StateManager 的调用顺序
 *   - 管理"执行行动 → 触发随机事件 → 月末结算 → 推进月份"的完整流程
 *   - 持有 VNScreen 引用，负责启动事件播放
 *   - 检查 Bad Ending 触发条件
 *
 * 单向数据流：
 *   玩家操作 → GameLoop → Engine → StateManager → UI 响应
 */

import { CONSTANTS }             from '../utils/constants.js';
import * as StateManager         from '../state/StateManager.js';
import * as EventEngine          from './EventEngine.js';
import { resolveFinalExam }      from './ExamEngine.js';
import { resolveIeltsExam }      from './ExamEngine.js';
import { log }                   from '../utils/helpers.js';

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

/**
 * 初始化 GameLoop，注入 VNScreen 引用。
 * 在 main.js 启动时调用一次。
 * @param {object} vnScreen
 */
export function initGameLoop(vnScreen) {
  _vnScreen = vnScreen;
  log('info', 'GameLoop', '✅ 初始化完成');
}

// ─────────────────────────────────────────────────────────────
// 行动执行（由 MapScreen 调用）
// ─────────────────────────────────────────────────────────────

/**
 * 执行一个建筑行动：消耗 AP → 结算数值 → 检查 Bad Ending → 触发随机事件。
 * @param {string}   actionId
 * @param {object}   action     来自 actions.js 的行动配置
 * @param {function} onEvent    随机事件触发时的回调（切换到 VN 模式）
 * @returns {boolean}  是否成功执行（AP 不足返回 false）
 */
export function executeAction(actionId, action, onEvent) {
  const state = StateManager.getState();

  // AP 检查
  if (!StateManager.consumeAP(action.apCost)) {
    log('info', 'GameLoop', 'AP 不足，行动取消');
    return false;
  }

  // 数值结算
  StateManager.applyStatDelta(action.baseEffects, action.labels ?? {});

  // 科研进度追踪（research_ir 累计 3 次获得标签）
  if (action.tagsProgress) {
    _trackProgressTag(action.tagsProgress);
  }

  // Bad Ending 检查
  const badEnd = checkBadEndings();
  if (badEnd) return true;

  // 存档
  StateManager.saveGame();

  // 随机事件判定
  const fresh = StateManager.getState();
  const hitId = EventEngine.rollRandomEvent(fresh);
  if (hitId && onEvent) {
    // 短暂延迟，让飘字动画先播完
    setTimeout(() => {
      processEventQueue(onEvent);
    }, 800);
  }

  return true;
}

// ─────────────────────────────────────────────────────────────
// 事件队列处理
// ─────────────────────────────────────────────────────────────

/**
 * 从 pendingEventQueue 依次取出事件并通过 VNScreen 播放。
 * 队列清空后调用 onEmpty 回调。
 * @param {function} onEmpty  队列清空回调（通常是返回地图或进入月末结算）
 */
export function processEventQueue(onEmpty) {
  _onQueueEmpty = onEmpty;
  _playNextEvent();
}

function _playNextEvent() {
  const state     = StateManager.getState();
  const eventData = EventEngine.dequeueNextEvent(state);

  if (!eventData) {
    // 队列已空
    log('info', 'GameLoop', '事件队列已清空');
    _onQueueEmpty?.();
    return;
  }

  // 切换到 VN 模式
  StateManager.setGamePhase(CONSTANTS.GAME_PHASE.VN);

  // 启动事件播放
  setTimeout(() => {
    _vnScreen?.startEvent(eventData, () => {
      // 单个事件结束：标记已触发，继续处理队列
      StateManager.markEventTriggered(eventData.event_id);
      StateManager.saveGame();
      _playNextEvent();
    });
  }, 100);
}

// ─────────────────────────────────────────────────────────────
// 月末结算
// ─────────────────────────────────────────────────────────────

/**
 * 月末总结算流程：
 *   1. 注入特殊事件
 *   2. 处理事件队列
 *   3. 队列清空后：期末考试结算（如有）→ Buff 生命周期 → 推进月份
 * @param {function} onMonthEnd  月份推进完成后的回调
 */
export function resolveMonthEnd(onMonthEnd) {
  const state = StateManager.getState();
  log('info', 'GameLoop', `📅 月末结算开始：Month ${state.currentMonth}`);

  // 1. 注入特殊事件（插入队列头部）
  EventEngine.checkScheduledEvents(state);

  // 2. 处理事件队列
  processEventQueue(() => {
    // 3. 队列清空后的结算
    _resolveEndOfMonth(onMonthEnd);
  });
}

/**
 * 事件处理完毕后的月末内部结算。
 */
function _resolveEndOfMonth(onMonthEnd) {
  const state = StateManager.getState();

  // 期末考试结算
  let examResult = null;
  if (CONSTANTS.SEMESTER_END_MONTHS.includes(state.currentMonth)) {
    examResult = resolveFinalExam(state);
    log('info', 'GameLoop', `📝 期末结算：GPA ${examResult.gpa}`);
  }

  // Buff 生命周期递减
  _tickBuffDurations();

  // 状态 Debuff 检查（焦虑/生病）
  _checkStatusDebuffs();

  // Bad Ending 检查
  const badEnd = checkBadEndings();
  if (badEnd) return;

  // 推进月份
  const { newMonth, isGameEnd } = StateManager.advanceMonth();

  StateManager.saveGame();

  if (isGameEnd) {
    // 触发结局流程
    triggerEnding();
  } else {
    onMonthEnd?.({ newMonth, examResult });
  }
}

// ─────────────────────────────────────────────────────────────
// Bad Ending 检查
// ─────────────────────────────────────────────────────────────

/**
 * 检查是否触发 Bad Ending。
 * @returns {string|null}  触发的 ending_id，或 null
 */
export function checkBadEndings() {
  const state = StateManager.getState();

  if (state.Mental_Health <= 0) {
    log('warn', 'GameLoop', '💀 Bad Ending：抑郁 Gap Year');
    StateManager.setGamePhase(CONSTANTS.GAME_PHASE.ENDING);
    // 将结局 ID 写入 state 供 EndingScreen 读取
    StateManager.addTag('__BAD_END_DEPRESSION__');
    return CONSTANTS.MENTAL_BAD_ENDING_ID;
  }

  if (state.Physical_Health <= 0) {
    log('warn', 'GameLoop', '💀 Bad Ending：停学住院');
    StateManager.setGamePhase(CONSTANTS.GAME_PHASE.ENDING);
    StateManager.addTag('__BAD_END_HOSPITALIZED__');
    return CONSTANTS.PHYSICAL_BAD_ENDING_ID;
  }

  return null;
}

// ─────────────────────────────────────────────────────────────
// 结局触发
// ─────────────────────────────────────────────────────────────

/**
 * 游戏结束后触发结局流程（Month 12 结束后调用）。
 */
export function triggerEnding() {
  log('info', 'GameLoop', '🎬 触发结局流程');
  StateManager.setGamePhase(CONSTANTS.GAME_PHASE.TAG_SHOWCASE);
}

// ─────────────────────────────────────────────────────────────
// 内部工具
// ─────────────────────────────────────────────────────────────

/**
 * 科研进度标签追踪（累计 3 次 research_ir 获得 Research_Exp 标签）。
 */
function _trackProgressTag(tagKey) {
  const countKey = `__progress_${tagKey}__`;
  const state    = StateManager.getState();

  // 用 tags 数组存储进度计数（临时方案）
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

/**
 * Buff 持续时间递减，过期移除。
 */
function _tickBuffDurations() {
  const state = StateManager.getState();
  state.activeBuff.forEach(buff => {
    if (buff.durationType === 'months' && buff.remainingMonths !== null) {
      if (buff.remainingMonths <= 1) {
        StateManager.removeBuff(buff.buffId);
        log('info', 'GameLoop', `Buff 过期：${buff.label}`);
      } else {
        // 直接修改（StateManager 暂无 updateBuff，用 addBuff 覆盖）
        StateManager.addBuff({
          ...buff,
          remainingMonths: buff.remainingMonths - 1,
        });
      }
    }
  });
}

/**
 * 检查心理/身体健康阈值，自动添加/移除状态 Debuff。
 */
function _checkStatusDebuffs() {
  const state = StateManager.getState();

  // 焦虑
  if (state.Mental_Health < CONSTANTS.MENTAL_HEALTH_WARN) {
    if (!StateManager.hasTag('Anxious')) {
      StateManager.addTag('Anxious');
      StateManager.addBuff({
        buffId:          'anxious_debuff',
        label:           '焦虑',
        icon:            'frown',
        durationType:    'permanent',
        remainingMonths: null,
        effects:         { event_prob_modifier: -0.05 },
        source_event_id: 'system',
      });
      log('info', 'GameLoop', '⚠️ 获得焦虑状态');
    }
  } else {
    if (StateManager.hasTag('Anxious')) {
      StateManager.removeTag('Anxious');
      StateManager.removeBuff('anxious_debuff');
    }
  }

  // 生病
  if (state.Physical_Health < CONSTANTS.PHYSICAL_HEALTH_WARN) {
    if (!StateManager.hasTag('Sick')) {
      StateManager.addTag('Sick');
      StateManager.addBuff({
        buffId:          'sick_debuff',
        label:           '生病',
        icon:            'thermometer',
        durationType:    'permanent',
        remainingMonths: null,
        effects:         { event_prob_modifier: -0.05 },
        source_event_id: 'system',
      });
      log('info', 'GameLoop', '⚠️ 获得生病状态');
    }
  } else {
    if (StateManager.hasTag('Sick')) {
      StateManager.removeTag('Sick');
      StateManager.removeBuff('sick_debuff');
    }
  }
}