/**
 * @fileoverview 结局结算引擎
 */

import { ENDINGS } from '../data/endings.js';
import { log } from '../utils/helpers.js';

/**
 * 计算软背景评分
 * @param {string[]} tags
 * @returns {number}
 */
export function calculateSoftScore(tags) {
  let score = 0;
  if (tags.includes('Internship_Exp')) score += 15;
  if (tags.includes('Research_Exp'))   score += 20;
  // 未来可扩展更多
  return score;
}

/**
 * 根据当前状态判定最终结局
 * @param {object} state
 * @returns {object} 匹配到的结局对象
 */
export function determineEnding(state) {
  const tags = state.tags || [];
  const softScore = calculateSoftScore(tags);

  log('info', 'EndingEngine', `开始结算结局。Tags: ${tags.length}, SoftScore: ${softScore}`);

  // 按 priority 升序排序（数字越小优先级越高）
  const sortedEndings = [...ENDINGS].sort((a, b) => a.priority - b.priority);

  for (const ending of sortedEndings) {
    if (ending.condition(tags, softScore)) {
      log('info', 'EndingEngine', `✅ 达成结局: ${ending.title} (ID: ${ending.id})`);
      return ending;
    }
  }

  // 理论上一定会命中兜底结局
  return ENDINGS[ENDINGS.length - 1];
}