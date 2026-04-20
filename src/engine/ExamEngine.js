/**
 * @fileoverview 考试结算引擎
 *
 * 职责：
 *   - 期末考试：Academic_Ability → GPA
 *   - 雅思考试：English_Ability → IELTS Tag（含概率扰动）
 */

import { CONSTANTS }     from '../utils/constants.js';
import * as StateManager from '../state/StateManager.js';
import { clamp, log }    from '../utils/helpers.js';

// ─────────────────────────────────────────────────────────────
// 期末考试
// ─────────────────────────────────────────────────────────────

/**
 * 期末考试结算。
 * @param {object} state
 * @returns {{ gpa: number, tag: string, phase: string, summary: string }}
 */
export function resolveFinalExam(state) {
  const ability = state.Academic_Ability;
  const phase   = state.currentPhase;

  const { gpa, tag } = calculateGPA(ability);

  // 移除旧 GPA 标签，添加新标签
  ['GPA_Low', 'GPA_Mid', 'GPA_High', 'GPA_Top'].forEach(t => StateManager.removeTag(t));

  StateManager.addTag(tag);

  // 记录 GPA
  StateManager.recordSemesterGPA({ phase, rawScore: ability, gpa, tag });

  // 清零学力（下学期重置）
  StateManager.applyStatDelta(
    { Academic_Ability: -ability },
    { Academic_Ability: '学力' }
  );

  // 心理健康影响
  const mentalDelta = gpa >= 3.3 ? +10 : gpa >= 2.8 ? 0 : -15;
  if (mentalDelta !== 0) {
    StateManager.applyStatDelta(
      { Mental_Health: mentalDelta },
      { Mental_Health: '心理健康' }
    );
  }

  const summary = _buildExamSummary(gpa, tag, ability);
  log('info', 'ExamEngine', `期末结算：${phase} → GPA ${gpa}（${tag}）`);

  return { gpa, tag, phase, summary };
}

/**
 * Academic_Ability → GPA 数值 + 标签（纯函数）
 * @param {number} ability
 * @returns {{ gpa: number, tag: string }}
 */
export function calculateGPA(ability) {
  const thresholds = CONSTANTS.GPA_THRESHOLDS;
  for (const t of thresholds) {
    if (ability >= t.minAbility) {
      return { gpa: t.gpa, tag: t.tag };
    }
  }
  // 兜底
  return { gpa: 2.2, tag: 'GPA_Low' };
}

function _buildExamSummary(gpa, tag, ability) {
  // 【修复】：加入 GPA_Top 的判定
  if (tag === 'GPA_Top' || tag === 'GPA_High') {
    return `本学期学力积累 ${ability} 分，期末 GPA ${gpa}，表现优秀。成绩单上又多了一行亮眼的数字。`;
  } else if (tag === 'GPA_Mid') {
    return `本学期学力积累 ${ability} 分，期末 GPA ${gpa}，表现中规中矩。申研时这个成绩可能需要用其他材料来补强。`;
  } else {
    return `本学期学力积累 ${ability} 分，期末 GPA ${gpa}，表现不尽如人意。这对申研竞争力是个不小的打击。`;
  }
}

// ─────────────────────────────────────────────────────────────
// 雅思考试
// ─────────────────────────────────────────────────────────────

/**
 * 雅思考试出分结算。
 * @param {object} state
 * @returns {{ tag: string, band: string, summary: string }}
 */
export function resolveIeltsExam(state) {
  const ability = state.English_Ability;

  // ±10 随机扰动（模拟发挥失常/超常）
  const jitter        = (Math.random() - 0.5) * 20;
  const effectiveAbi  = clamp(ability + jitter, 0, 100);

  const { tag, band } = calculateIeltsTag(effectiveAbi);

  // 移除旧雅思标签
  ['IELTS_5.5','IELTS_6.0','IELTS_6.5','IELTS_7.0','IELTS_7.5']
    .forEach(t => StateManager.removeTag(t));
  StateManager.addTag(tag);

  // 心理健康影响
  const band_num = parseFloat(band);
  let mentalDelta = 0;
  if (band_num >= 7.0)       mentalDelta = +15;
  else if (band_num >= 6.5)  mentalDelta = +5;
  else if (band_num <= 5.5)  mentalDelta = -20;
  else                       mentalDelta = -8;

  StateManager.applyStatDelta(
    { Mental_Health: mentalDelta },
    { Mental_Health: '心理健康' }
  );

  const summary = _buildIeltsSummary(band, band_num);
  log('info', 'ExamEngine', `雅思出分：${band}（${tag}）`);

  return { tag, band, summary };
}

/**
 * English_Ability → IELTS 标签（纯函数）
 * @param {number} ability
 * @returns {{ tag: string, band: string }}
 */
export function calculateIeltsTag(ability) {
  const thresholds = CONSTANTS.IELTS_THRESHOLDS;
  for (const t of thresholds) {
    if (ability >= t.minAbility) {
      return { tag: t.tag, band: t.band };
    }
  }
  return { tag: 'IELTS_5.5', band: '5.5' };
}

function _buildIeltsSummary(band, band_num) {
  if (band_num >= 7.0) {
    return `雅思成绩 ${band} 分！达到了大多数 G5 院校的语言要求，这个成绩可以安心提交申请了。`;
  } else if (band_num >= 6.5) {
    return `雅思成绩 ${band} 分，达到了部分学校的要求，但申请顶尖院校可能仍有压力。考虑是否要再冲一次。`;
  } else {
    return `雅思成绩 ${band} 分，未达到多数目标院校的要求。需要继续备考，尽快重考。`;
  }
}