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
import { t }             from '../utils/i18n.js';

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
    { Academic_Ability: t('stat_academic') }
  );

  // 心理健康的影响
  const mentalDelta = gpa >= 3.3 ? +10 : gpa >= 2.8 ? 0 : -15;
  if (mentalDelta !== 0) {
    StateManager.applyStatDelta(
      { Mental_Health: mentalDelta },
      { Mental_Health: t('stat_mental') }
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
  if (tag === 'GPA_Top' || tag === 'GPA_High') {
    return t('exam_gpa_top_desc').replace('{gpa}', gpa);
  } else if (tag === 'GPA_Mid') {
    return t('exam_gpa_mid_desc').replace('{gpa}', gpa);
  } else {
    return t('exam_gpa_low_desc').replace('{gpa}', gpa);
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

  // 【修改】：直接使用真实英语能力进行判定，完全移除随机发挥扰动
  const { tag, band } = calculateIeltsTag(ability);

  // 移除旧雅思标签
  ['IELTS_5.5','IELTS_6.0','IELTS_6.5','IELTS_7.0','IELTS_7.5']
    .forEach(t => StateManager.removeTag(t));
  StateManager.addTag(tag);

  // 心理健康影响
  const band_num = parseFloat(band);
  let mentalDelta = 0;
  if (band_num >= 7.0)       mentalDelta = +10;
  else if (band_num >= 6.5)  mentalDelta = +5;
  else if (band_num <= 5.5)  mentalDelta = -10;
  else                       mentalDelta = -8;

  StateManager.applyStatDelta(
    { Mental_Health: mentalDelta },
    { Mental_Health: t('stat_mental') }
  );

  const summary = _buildIeltsSummary(band, band_num);
  log('info', 'ExamEngine', `雅思出分：真实能力 ${ability} -> ${band}（${tag}）`);

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
    return t('exam_ielts_high_desc').replace('{band}', band);
  } else if (band_num >= 6.5) {
    return t('exam_ielts_mid_desc').replace('{band}', band);
  } else {
    return t('exam_ielts_low_desc').replace('{band}', band);
  }
}
