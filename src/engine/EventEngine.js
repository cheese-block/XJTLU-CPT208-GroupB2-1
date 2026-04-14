/**
 * @fileoverview 事件引擎
 *
 * 职责：
 *   - 构建随机事件候选池（过滤已触发、forbiddenTags、月份限制）
 *   - AP 消耗后按概率抽取随机事件
 *   - 月末注入特殊事件到队列
 *   - 从队列取出事件交给 VNScreen 播放
 */

import { CONSTANTS }     from '../utils/constants.js';
import { EVENTS }        from '../data/events.js';
import * as StateManager from '../state/StateManager.js';
import { rollChance, pickRandom, log } from '../utils/helpers.js';

// ─────────────────────────────────────────────────────────────
// 随机事件候选池构建
// ─────────────────────────────────────────────────────────────

/**
 * 构建当前可触发的随机事件候选列表。
 * 过滤条件：
 *   1. type === 'random'
 *   2. 未曾触发过（triggeredEventIds）
 *   3. available_months 包含当前月份（或为 null）
 *   4. forbidden_tags 与当前 tags 无交集
 * @param {object} state
 * @returns {object[]}  过滤后的事件数组
 */
export function buildEventPool(state) {
  return Object.values(EVENTS).filter(event => {
    if (event.type !== 'random') return false;

    // 唯一性：已触发过的不再触发
    if (state.triggeredEventIds.includes(event.event_id)) return false;

    // 月份限制
    if (event.available_months &&
        !event.available_months.includes(state.currentMonth)) {
      return false;
    }

    // forbiddenTags：玩家持有任一禁止标签则排除
    if (event.forbidden_tags && event.forbidden_tags.length > 0) {
      const hasForidden = event.forbidden_tags.some(tag =>
        state.tags.includes(tag)
      );
      if (hasForidden) return false;
    }

    return true;
  });
}

/**
 * AP 消耗后，按概率决定是否触发随机事件。
 * 若命中，将事件注入 pendingEventQueue 尾部。
 * @param {object} state
 * @returns {string|null}  命中的 eventId，或 null
 */
export function rollRandomEvent(state) {
  const pool = buildEventPool(state);
  if (pool.length === 0) return null;

  // 基础概率 + Buff 修正
  const buffMod  = getEventProbModifier(state);
  const prob     = Math.max(0, Math.min(1,
    CONSTANTS.RANDOM_EVENT_BASE_PROB + buffMod
  ));

  if (!rollChance(prob)) return null;

  // 按 weight 加权抽取
  const totalWeight = pool.reduce((sum, e) => sum + (e.weight ?? 1), 0);
  let   rand        = Math.random() * totalWeight;
  let   chosen      = null;

  for (const event of pool) {
    rand -= (event.weight ?? 1);
    if (rand <= 0) { chosen = event; break; }
  }
  if (!chosen) chosen = pool[pool.length - 1];

  StateManager.enqueueEventBack({
    eventId: chosen.event_id,
    source:  'random',
  });

  log('info', 'EventEngine',
    `🎲 随机事件命中：${chosen.event_id}（概率 ${Math.round(prob * 100)}%）`);
  return chosen.event_id;
}

// ─────────────────────────────────────────────────────────────
// 特殊事件注入
// ─────────────────────────────────────────────────────────────

/**
 * 月末结算前调用：将当月的特殊事件注入队列头部。
 * @param {object} state
 * @returns {string[]}  本月注入的 eventId 列表
 */
export function checkScheduledEvents(state) {
  const injected = [];

  CONSTANTS.SCHEDULED_EVENTS.forEach(({ month, eventId }) => {
    if (month !== state.currentMonth) return;
    if (state.triggeredEventIds.includes(eventId)) return;

    const eventData = EVENTS[eventId];
    if (!eventData) {
      log('warn', 'EventEngine', `特殊事件不存在：${eventId}`);
      return;
    }

    // 【新增】：检查特殊事件的前置标签条件
    if (eventData.required_tags && eventData.required_tags.length > 0) {
      const hasAll = eventData.required_tags.every(tag => state.tags.includes(tag));
      if (!hasAll) return; // 不满足条件则跳过，等待未来满足或直接作废
    }
    if (eventData.forbidden_tags && eventData.forbidden_tags.length > 0) {
      const hasForbidden = eventData.forbidden_tags.some(tag => state.tags.includes(tag));
      if (hasForbidden) return; // 命中互斥标签则跳过
    }

    StateManager.enqueueEventFront({ eventId, source: 'scheduled' });
    injected.push(eventId);
    log('info', 'EventEngine', `📅 特殊事件注入：${eventId}（Month ${month}）`);
  });

  return injected;
}


// ─────────────────────────────────────────────────────────────
// Buff 概率修正
// ─────────────────────────────────────────────────────────────

/**
 * 汇总所有 activeBuff 的 event_prob_modifier。
 * @param {object} state
 * @returns {number}
 */
export function getEventProbModifier(state) {
  return (state.activeBuff ?? []).reduce((sum, buff) => {
    return sum + (buff.effects?.event_prob_modifier ?? 0);
  }, 0);
}

// ─────────────────────────────────────────────────────────────
// 队列处理
// ─────────────────────────────────────────────────────────────

/**
 * 从 pendingEventQueue 取出队首事件数据。
 * @param {object} state
 * @returns {object|null}  完整事件数据，或 null（队列为空）
 */
export function dequeueNextEvent(state) {
  if (!state.pendingEventQueue || state.pendingEventQueue.length === 0) {
    return null;
  }

  const { eventId } = state.pendingEventQueue[0];
  const eventData   = EVENTS[eventId];

  if (!eventData) {
    log('warn', 'EventEngine', `事件数据不存在：${eventId}`);
    return null;
  }

  return eventData;
}