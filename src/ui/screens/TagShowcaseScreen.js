import * as StateManager from '../../state/StateManager.js';
import { CONSTANTS }     from '../../utils/constants.js';
import { calculateSoftScore } from '../../engine/EndingEngine.js';
import { t } from '../../utils/i18n.js';

export class TagShowcaseScreen {
  constructor() {
    this._container = null;
  }

  mount(container, state) {
    this._container = container;
    // 【修复】：加入 try-catch 防止未知 Tag导致渲染崩溃白屏
    try {
      container.innerHTML = this._buildHTML(state);
      if (typeof lucide !== 'undefined') lucide.createIcons();
      this._bindEvents();
    } catch (error) {
      console.error('[TagShowcaseScreen] 渲染失败:', error);
      // 如果崩溃，强制跳转到最终结局，避免卡死在白屏
      StateManager.setGamePhase(CONSTANTS.GAME_PHASE.ENDING);
    }
  }

  unmount() {
    this._container = null;
  }

  onStateChange(_state) {}

  _buildHTML(state) {
    const tags = state.tags || [];
    const softScore = calculateSoftScore(tags);
    
    // 过滤掉所有不应展示给玩家的内部临时标签
    const HIDDEN_TAG_PREFIXES = ['__', 'Agency_'];
    const displayTags = tags.filter(t =>
      !HIDDEN_TAG_PREFIXES.some(prefix => t.startsWith(prefix))
    );
    const mappedTags = displayTags.map(t => this._mapTagToUI(t));

    return `
      <div class="w-full h-full flex items-center justify-center bg-gray-50 px-6">
        <div class="w-full max-w-2xl bg-white rounded-2xl shadow-xl border-2 border-xjtlu-navy overflow-hidden flex flex-col animate-fade-in">
          
          <div class="bg-xjtlu-navy px-8 py-6 text-center">
            <h1 class="text-2xl font-black text-white tracking-widest">
              ${t('tag_showcase_title')}
            </h1>
            <p class="text-white/70 text-sm mt-2">
              ${t('tag_showcase_desc')}
            </p>
          </div>

          <div class="p-8 flex flex-col gap-8">
            
            <!-- 标签墙 -->
            <div class="flex flex-col gap-3">
              <span class="text-xs font-bold text-xjtlu-gray uppercase tracking-wider">${t('tag_showcase_label')}</span>
              <div class="flex flex-wrap gap-2">
                ${mappedTags.length > 0 
                  ? mappedTags.map(t => `
                      <span class="tag-badge ${t.colorCls} px-3 py-1.5 text-sm shadow-sm"
                            data-tooltip-title="${this._escapeAttr(t.label)}"
                            data-tooltip-desc="${this._escapeAttr(t.desc)}"
                            data-tooltip-type="info">
                        <i data-lucide="${t.icon}" class="lucide w-4 h-4"></i>
                        ${t.label}
                      </span>
                    `).join('')
                  : `<span class="text-gray-400 italic text-sm">${t('tag_showcase_empty')}</span>`
                }
              </div>
            </div>

            <div class="h-px bg-gray-100"></div>

            <!-- 软背景评分 -->
            <div class="flex items-center justify-between bg-blue-50 rounded-xl p-4 border border-blue-100">
              <div class="flex flex-col">
                <span class="text-sm font-bold text-xjtlu-navy">${t('tag_showcase_soft_title')}</span>
                <span class="text-xs text-xjtlu-gray mt-1">${t('tag_showcase_soft_desc')}</span>
              </div>
              <span class="text-3xl font-black text-xjtlu-blue">${softScore}</span>
            </div>

          </div>

          <div class="p-6 bg-gray-50 border-t border-gray-100 flex justify-end">
            <button id="btn-reveal-ending" class="xjtlu-btn xjtlu-btn--primary text-base px-8 py-3">
              ${t('tag_showcase_btn')}
              <i data-lucide="arrow-right" class="lucide w-5 h-5"></i>
            </button>
          </div>

        </div>
      </div>
    `;
  }

  _bindEvents() {
    this._container?.querySelector('#btn-reveal-ending')?.addEventListener('click', () => {
      StateManager.setGamePhase(CONSTANTS.GAME_PHASE.ENDING);
    });
  }

  _mapTagToUI(tag) {
    const dict = {
      'GPA_Top':  { label: t('tag_gpa_top_label'),  icon: 'graduation-cap', colorCls: 'tag-badge--blue',  desc: t('tag_gpa_top_desc') },
      'GPA_High': { label: t('tag_gpa_high_label'), icon: 'graduation-cap', colorCls: 'tag-badge--blue',  desc: t('tag_gpa_high_desc') },
      'GPA_Mid':  { label: t('tag_gpa_mid_label'),  icon: 'graduation-cap', colorCls: 'tag-badge--gray',  desc: t('tag_gpa_mid_desc') },
      'GPA_Low':  { label: t('tag_gpa_low_label'),  icon: 'alert-triangle', colorCls: 'tag-badge--red',   desc: t('tag_gpa_low_desc') },
      'IELTS_7.5':{ label: t('tag_ielts_75_label'), icon: 'languages',      colorCls: 'tag-badge--blue',  desc: t('tag_ielts_75_desc') },
      'IELTS_7.0':{ label: t('tag_ielts_70_label'), icon: 'languages',      colorCls: 'tag-badge--blue',  desc: t('tag_ielts_70_desc') },
      'IELTS_6.5':{ label: t('tag_ielts_65_label'), icon: 'languages',      colorCls: 'tag-badge--gray',  desc: t('tag_ielts_65_desc') },
      'IELTS_6.0':{ label: t('tag_ielts_60_label'), icon: 'languages',      colorCls: 'tag-badge--red',   desc: t('tag_ielts_60_desc') },
      'IELTS_5.5':{ label: t('tag_ielts_55_label'), icon: 'alert-triangle', colorCls: 'tag-badge--red',   desc: t('tag_ielts_55_desc') },
      'Internship_Exp': { label: t('tag_internship_label'), icon: 'briefcase', colorCls: 'tag-badge--green', desc: t('tag_internship_desc') },
      'Research_Exp':   { label: t('tag_research_label'),   icon: 'microscope', colorCls: 'tag-badge--green', desc: t('tag_research_desc') },
      'Perfect_Agency': { label: t('tag_perfect_agency_label'), icon: 'file-check', colorCls: 'tag-badge--blue', desc: t('tag_perfect_agency_desc') },
      'Reliable_Agency':{ label: t('tag_reliable_agency_label'),icon: 'shield-check',colorCls: 'tag-badge--green',desc: t('tag_reliable_agency_desc') },
      'Scam_Agency':    { label: t('tag_scam_agency_label'),    icon: 'skull',       colorCls: 'tag-badge--red',   desc: t('tag_scam_agency_desc') },
      'DIY_Applicant':  { label: t('tag_diy_label'),           icon: 'user-cog',    colorCls: 'tag-badge--yellow',desc: t('tag_diy_desc') },
      'Study_Buddy':    { label: t('tag_study_buddy_label'),    icon: 'users',       colorCls: 'tag-badge--yellow',desc: t('tag_study_buddy_desc') },
      'Anxious':        { label: t('tag_anxious_label'),        icon: 'frown',       colorCls: 'tag-badge--gray',  desc: t('tag_anxious_desc') },
      'Sick':           { label: t('tag_sick_label'),           icon: 'thermometer', colorCls: 'tag-badge--gray',  desc: t('tag_sick_desc') },
    };
    return dict[tag] || { label: tag, icon: 'tag', colorCls: 'tag-badge--gray', desc: t('tag_unknown_label') };
  }

  _escapeAttr(value) {
    return String(value ?? '')
      .replace(/&/g, '&amp;')
      .replace(/"/g, '&quot;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');
  }
}
