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
 * @param {object}   action    来自 actions.js 的行动配置
 * @param {function} onEvent   随机事件触发时的回调（切换到 VN 模式）
 * @returns {boolean}  是否成功执行（AP 不足返回 false）
 */
export function executeAction(actionId, action, onEvent) {
  const state = StateManager.getState();

  // 【修复】：互斥锁，防止在事件处理期间重复触发行动
  if (state.isProcessing) {
    log('warn', 'GameLoop', '行动被拦截：当前有事件正在处理中');
    return false;
  }

  // ── 计算真实的 AP 消耗 ──
  const apMod       = BuffEngine.getAPCostModifier(state, actionId);
  const finalApCost = Math.max(0, action.apCost + apMod);

  // AP 检查
  if (!StateManager.consumeAP(finalApCost)) {
    log('info', 'GameLoop', 'AP 不足，行动取消');
    return false;
  }

  // ── 计算真实的数值收益 ──
  const finalEffects = BuffEngine.applyBuffModifiers(state, actionId, action.baseEffects);
  StateManager.applyStatDelta(finalEffects, action.labels ?? {});

  // 科研进度追踪
  if (action.tagsProgress) {
    _trackProgressTag(action.tagsProgress);
  }

  _checkStatusDebuffs();

  // Bad Ending 检查
  const badEnd = checkBadEndings();
  if (badEnd) return true;

  StateManager.saveGame();

  // 【修复】：随机事件判定前，检查队列是否已有待处理事件
  // 若队列不为空（如月末特殊事件已入队），则跳过本次随机判定
  const fresh = StateManager.getState();
  if (fresh.pendingEventQueue.length > 0) {
    log('info', 'GameLoop', '队列已有事件，跳过本次随机事件判定');
    return true;
  }

  const hitId = EventEngine.rollRandomEvent(fresh);

  if (hitId) {
    // 【修复】：加锁，防止在 VN 播放期间再次触发行动
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
  let eventData = EventEngine.dequeueNextEvent(state);

  if (!eventData) {
    log('info', 'GameLoop', '事件队列已清空');
    _onQueueEmpty?.();
    return;
  }

  // ── 【修改点 2】：M9 动态事件内容注入拦截 ──
  if (eventData.event_id === 'ielts_exam_result') {
    // 深拷贝，避免污染 events.js 中的原始数据模板
    eventData = deepClone(eventData); 
    
    // 调用 ExamEngine 计算出分结果（此函数内部会自动修改 state 中的标签和心理健康）
    const result = resolveIeltsExam(StateManager.getState());
    
    // 将计算出的文案注入到第二个场景中替换占位符
    eventData.scenes[1].text = result.summary;
    
    // 因为 resolveIeltsExam 修改了内部状态，需要触发一次存档
    StateManager.saveGame();
  }
  // ──────────────────────────────────────────

  // 从队列移除（在播放前移除，防止重复触发）
  StateManager.startEvent(eventData);  // 内部已有 shift() 逻辑

  // 切换到 VN 模式（带淡入过渡）
  StateManager.setGamePhase(CONSTANTS.GAME_PHASE.VN);

  setTimeout(() => {
    _vnScreen?.startEvent(eventData, () => {
      StateManager.markEventTriggered(eventData.event_id);
      StateManager.saveGame();
      _playNextEvent();
    });
  }, 700);  // 等待淡入动画
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

  // 【修复】：月末结算期间加锁
  StateManager.setProcessing(true);

  EventEngine.checkScheduledEvents(state);

  processEventQueue(() => {
    _resolveEndOfMonth(onMonthEnd);
  });
}

/**
 * 事件处理完毕后的月末内部结算。
 */
function _resolveEndOfMonth(onMonthEnd) {
  const state = StateManager.getState();

  let examResult = null;
  if (CONSTANTS.SEMESTER_END_MONTHS.includes(state.currentMonth)) {
    examResult = resolveFinalExam(state);
    log('info', 'GameLoop', `📝 期末结算：GPA ${examResult.gpa}`);
  }

  _tickBuffDurations();
  _checkStatusDebuffs();

  const badEnd = checkBadEndings();
  if (badEnd) {
    StateManager.saveGame();
    StateManager.setProcessing(false); // 【修复】：即使 bad end 也要解锁
    return;
  }

  const { newMonth, isGameEnd } = StateManager.advanceMonth();
  StateManager.saveGame();

  // 【修复】：月末流程结束，解锁
  StateManager.setProcessing(false);

  if (isGameEnd) {
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