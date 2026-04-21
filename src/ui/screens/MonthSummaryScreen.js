/**
 * @fileoverview 月末结算过渡界面
 *
 * 展示本月总结：月份推进、期末成绩（如有）、下月预告。
 * 玩家点击"开始下个月"后返回地图。
 */

import { CONSTANTS }      from '../../utils/constants.js';
import { log }            from '../../utils/helpers.js';
import { t }              from '../../utils/i18n.js';
import * as StateManager  from '../../state/StateManager.js';

export class MonthSummaryScreen {
  constructor() {
    this._container = null;
    this._onConfirm = null;
  }

  mount(container, _state) {
    this._container = container;

    // 若有待展示的月末数据，立即显示
    if (window._pendingMonthSummary) {
        const data = window._pendingMonthSummary;
        window._pendingMonthSummary = null;
        // 短暂延迟确保 DOM 就绪
        setTimeout(() => this.show(data), 50);
    }

    log('info', 'MonthSummaryScreen', '✅ 已挂载');
  }

  unmount() {
    this._container = null;
    this._onConfirm = null;
  }

  onStateChange(_state) {}

  /**
   * 显示月末结算内容。
   * @param {object} options
   * @param {number}      options.prevMonth    刚结束的月份
   * @param {number}      options.newMonth     即将开始的月份
   * @param {object|null} options.examResult   期末考试结果（null = 非期末月）
   * @param {object}      options.state        当前 state
   * @param {function}    options.onConfirm    点击确认后的回调
   */
  show({ prevMonth, newMonth, examResult, state, onConfirm }) {
    this._onConfirm = onConfirm;
    if (!this._container) return;

    const lang = StateManager.getLang();

    // 动态翻译月份和阶段
    const getMonthName = (m) => {
      const mapEn = { 1:'Sep', 2:'Oct', 3:'Nov', 4:'Dec', 5:'Winter Break', 6:'Mar', 7:'Apr', 8:'May', 9:'Jun', 10:'Summer Break', 11:'Summer Break', 12:'Application Season' };
      return lang === 'en' ? mapEn[m] : (CONSTANTS.MONTH_TO_REALWORLD[m] ?? `Month ${m}`);
    };
    const getPhaseName = (p) => {
      const mapEn = { Y3_SEM1: 'Y3 Sem 1', Y3_WINTER: 'Winter', Y3_SEM2: 'Y3 Sem 2', Y3_SUMMER: 'Summer', Y4_SEM1: 'Y4 Sem 1' };
      return lang === 'en' ? mapEn[p] : (CONSTANTS.PHASE_LABELS[p] ?? '');
    };

    const prevLabel = getMonthName(prevMonth);
    const newLabel  = getMonthName(newMonth);
    const newPhase  = getPhaseName(CONSTANTS.MONTH_TO_PHASE[newMonth]);

    const isGoodGpa = examResult?.tag === 'GPA_Top' || examResult?.tag === 'GPA_High';
    const isMidGpa  = examResult?.tag === 'GPA_Mid';

    // 处理 ExamEngine 返回的 summary (简单映射)
    let finalSummary = examResult?.summary || '';
    if (lang === 'en' && examResult) {
      if (examResult.tag === 'GPA_Top' || examResult.tag === 'GPA_High') {
        finalSummary = `Accumulated ${state.Academic_Ability} Academic pts. Final GPA is ${examResult.gpa}. Excellent performance. A brilliant line on your transcript.`;
      } else if (examResult.tag === 'GPA_Mid') {
        finalSummary = `Accumulated ${state.Academic_Ability} Academic pts. Final GPA is ${examResult.gpa}. Average performance. You might need other materials to boost your profile.`;
      } else {
        finalSummary = `Accumulated ${state.Academic_Ability} Academic pts. Final GPA is ${examResult.gpa}. Poor performance. A heavy blow to your application competitiveness.`;
      }
    }

    this._container.innerHTML = `
      <div class="w-full h-full flex items-center justify-center bg-white px-6 relative">
        <div class="summary-card w-full max-w-md flex flex-col gap-6 animate-fade-in z-10">

          <div class="flex flex-col gap-1">
            <p class="text-xs font-bold text-xjtlu-blue tracking-widest uppercase">
              ${t('summary_title')}
            </p>
            <h1 class="text-2xl font-black text-xjtlu-navy">
              ${prevLabel} ${t('summary_end')}
            </h1>
          </div>

          <div class="h-px bg-gray-100"></div>

          ${examResult ? `
            <div class="flex flex-col gap-3">
              <p class="text-xs font-bold text-xjtlu-gray tracking-wider uppercase">
                ${t('summary_exam_result')}
              </p>
              <div class="flex items-center justify-between bg-xjtlu-blue/5 rounded-xl px-4 py-3 border border-xjtlu-blue/20">
                <span class="text-sm text-gray-600">${getPhaseName(examResult.phase)} ${t('summary_gpa')}</span>
                <span class="text-2xl font-black ${isGoodGpa ? 'text-xjtlu-green' : isMidGpa ? 'text-xjtlu-blue' : 'text-xjtlu-red'}">
                  ${examResult.gpa}
                </span>
              </div>
              <p class="text-xs text-gray-500 leading-relaxed">
                ${finalSummary}
              </p>
            </div>
            <div class="h-px bg-gray-100"></div>
          ` : ''}

          <div class="flex items-center gap-3 text-sm text-xjtlu-gray">
            <i data-lucide="arrow-right-circle" class="lucide w-5 h-5 text-xjtlu-blue shrink-0"></i>
            <span>
              ${t('summary_next')}
              <span class="font-black text-xjtlu-navy">${newLabel}</span>
              <span class="text-xs ml-1">${newPhase}</span>
            </span>
          </div>

          <button id="btn-next-month" class="xjtlu-btn xjtlu-btn--primary w-full justify-center text-base py-3">
            <i data-lucide="play-circle" class="lucide w-5 h-5"></i>
            ${t('summary_btn_start')} ${newLabel}
          </button>

        </div>
      </div>
    `;

    if (typeof lucide !== 'undefined') lucide.createIcons();

    this._container.querySelector('#btn-next-month')?.addEventListener('click', () => {
      this._onConfirm?.();
    });
  }

  _buildStatRow(label, value, warnThreshold) {
    const isWarn   = warnThreshold > 0 && value <= warnThreshold;
    const colorCls = isWarn ? 'text-xjtlu-red' : 'text-xjtlu-navy';
    return `
      <div class="flex items-center justify-between
                  bg-gray-50 rounded-lg px-3 py-2">
        <span class="text-xs text-gray-500">${label}</span>
        <span class="text-sm font-black ${colorCls}">${value}</span>
      </div>
    `;
  }
}