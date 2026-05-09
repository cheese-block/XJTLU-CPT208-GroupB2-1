/**
 * @fileoverview 院系选择 Screen（M4）
 *
 * 功能：
 *   - 展示西浦各大学院卡片
 *   - SAT 可选，其余显示"敬请期待"
 *   - 选择 SAT 后进入游戏主界面（MAP）
 */

import * as StateManager from '../../state/StateManager.js';
import { CONSTANTS }     from '../../utils/constants.js';
import { log, isMobile } from '../../utils/helpers.js';
import { t, resolveI18nText } from '../../utils/i18n.js';

// ─────────────────────────────────────────────────────────────
// 学院数据
// ─────────────────────────────────────────────────────────────
const SCHOOLS = [
  {
    id:          'SAT',
    title:       { zh: '先进计算学院', en: 'School of Advanced Technology' },
    abbr:        'SAT',
    icon:        'cpu',
    color:       'blue',
    available:   true,
    tags:        { zh: ['计算机科学', '人工智能', '电子工程'], en: ['CS', 'AI', 'EEE'] },
    applyTraits: { 
      zh: ['重视数学成绩', '看重科研背景', '竞争激烈'], 
      en: ['Math Focus', 'Research Matters', 'Highly Competitive'] 
    },
    description: {
      zh: '西浦最大的工科学院，毕业生主要申请英美计算机、数据科学及电子工程方向研究生。申请竞争激烈，GPA 和科研经历是核心竞争力。',
      en: 'The largest engineering school. Graduates mainly apply for CS, Data Science, and EEE programs in the UK/US. GPA and research experience are key.'
    },
  },
  {
    id:          'IBSS',
    title:       { zh: '艾尔伯特商学院', en: 'International Business School Suzhou' },
    abbr:        'IBSS',
    icon:        'trending-up',
    color:       'gray',
    available:   false,
    tags:        { zh: ['金融', '管理', '市场营销'], en: ['Finance', 'Management', 'Marketing'] },
    applyTraits: { 
      zh: ['重视实习经历', '需要雅思高分', '商科竞争大'], 
      en: ['Internships Focus', 'High IELTS Req', 'Huge Competition'] 
    },
    description: { zh: '敬请期待', en: 'Coming Soon' },
  },
  {
    id:          'DES',
    title:       { zh: '设计学院', en: 'School of Design' },
    abbr:        'DES',
    icon:        'pen-tool',
    color:       'gray',
    available:   false,
    tags:        { zh: ['工业设计', 'UI/UX', '视觉传达'], en: ['Industrial', 'UI/UX', 'Visual Comm'] },
    applyTraits: { 
      zh: ['作品集为王', '创意思维', '跨学科背景'], 
      en: ['Portfolio is King', 'Creative Thinking', 'Interdisciplinary'] 
    },
    description: { zh: '敬请期待', en: 'Coming Soon' },
  },
  {
    id:          'SCI',
    title:       { zh: '理学院', en: 'School of Science' },
    abbr:        'SCI',
    icon:        'flask-conical',
    color:       'gray',
    available:   false,
    tags:        { zh: ['数学', '物理', '化学'], en: ['Math', 'Physics', 'Chemistry'] },
    applyTraits: { 
      zh: ['科研为核心', '博士申请居多', '奖学金竞争'], 
      en: ['Research-centric', 'Mostly PhD Apps', 'Scholarship Comp'] 
    },
    description: { zh: '敬请期待', en: 'Coming Soon' },
  },
  {
    id:          'AHL',
    title:       { zh: '人文社科学院', en: 'School of Arts, Humanities and Languages' },
    abbr:        'AHL',
    icon:        'book-marked',
    color:       'gray',
    available:   false,
    tags:        { zh: ['英语', '传媒', '社会学'], en: ['English', 'Media', 'Sociology'] },
    applyTraits: { 
      zh: ['文书质量关键', '语言要求高', '方向多元'], 
      en: ['Essay Quality is Key', 'High Lang Req', 'Diverse Paths'] 
    },
    description: { zh: '敬请期待', en: 'Coming Soon' },
  },
  {
    id:          'ARCH',
    title:       { zh: '建筑学院', en: 'School of Architecture' },
    abbr:        'ARCH',
    icon:        'building-2',
    color:       'gray',
    available:   false,
    tags:        { zh: ['建筑设计', '城市规划', '景观'], en: ['Architecture', 'Urban Planning', 'Landscape'] },
    applyTraits: { 
      zh: ['作品集决定命运', '5年制', '出路广泛'], 
      en: ['Portfolio is Destiny', '5-Year Prog', 'Broad Prospects'] 
    },
    description: { zh: '敬请期待', en: 'Coming Soon' },
  },
];

// ─────────────────────────────────────────────────────────────
// Screen 类
// ─────────────────────────────────────────────────────────────
export class SchoolSelectScreen {
  constructor() {
    this._container = null;
  }

  // ───────────────────────────────────────────────────────────
  // Screen 接口
  // ───────────────────────────────────────────────────────────

  mount(container, _state) {
    this._container = container;
    
    if (isMobile()) {
      container.innerHTML = this._buildMobileHTML();
    } else {
      container.innerHTML = this._buildHTML();
    }

    if (typeof lucide !== 'undefined') lucide.createIcons();
    this._bindEvents();
    log('info', 'SchoolSelectScreen', '✅ 已挂载');
  }

  unmount() {
    this._container = null;
  }

  onStateChange(_state) {}

  // ───────────────────────────────────────────────────────────
  // HTML 构建
  // ───────────────────────────────────────────────────────────

  _buildHTML() {
    return `
      <div class="w-full h-full flex flex-col bg-white overflow-hidden">
        <div class="shrink-0 px-6 md:px-8 pt-4 md:pt-10 pb-3 md:pb-6 border-b-2 border-gray-100 flex flex-col md:block">
          <p class="text-[0.6rem] md:text-xs font-bold text-xjtlu-blue tracking-[0.25em] uppercase mb-0.5 md:mb-1">
            ${t('school_select_step')}
          </p>
          <div class="flex items-center justify-between">
            <h1 class="text-xl md:text-3xl font-black text-xjtlu-navy leading-tight">
              ${t('school_select_title')}
            </h1>
            <!-- 手机端横屏时，提示文字移到右侧以节省高度 -->
            <p class="hidden md:hidden sm:block text-[0.65rem] text-xjtlu-gray leading-relaxed max-w-[200px] text-right">
              ${t('school_select_desc')}
            </p>
          </div>
          <p class="text-[0.65rem] md:text-sm text-xjtlu-gray mt-1 md:mt-2 leading-relaxed sm:hidden md:block">
            ${t('school_select_desc')}
          </p>
        </div>

        <div class="flex-1 overflow-y-auto custom-scroll px-4 md:px-8 py-3 md:py-6">
          <div class="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4 max-w-5xl mx-auto">
            ${SCHOOLS.map(s => this._buildCard(s)).join('')}
          </div>
        </div>

        <div class="shrink-0 px-6 md:px-8 py-2 md:py-4 border-t border-gray-100 flex items-center justify-center gap-2 text-[0.6rem] md:text-xs text-xjtlu-gray">
          <i data-lucide="info" class="lucide w-3 h-3 md:w-3.5 md:h-3.5"></i>
          ${t('school_select_demo_hint')}
        </div>
      </div>
    `;
  }

  /**
   * 构建单个学院卡片。
   * @param {object} school
   */
  _buildCard(school) {
    const isAvailable = school.available;
    const lang = StateManager.getLang();

    const sName = resolveI18nText(school.title);
    const sDesc = resolveI18nText(school.description);
    
    // 处理数组类型的国际化
    const sTags = Array.isArray(school.tags) ? school.tags : (school.tags[lang] || school.tags['zh']);
    const sTraits = Array.isArray(school.applyTraits) ? school.applyTraits : (school.applyTraits[lang] || school.applyTraits['zh']);

    const cardBase = `
      relative flex flex-col gap-2 md:gap-3 p-3 md:p-5 rounded-xl md:rounded-2xl border-2 transition-all duration-200
      ${isAvailable ? 'border-xjtlu-blue bg-white cursor-pointer hover:bg-xjtlu-blue hover:text-white hover:shadow-lg hover:-translate-y-0.5 school-card' : 'border-gray-200 bg-gray-50 cursor-not-allowed opacity-60'}
    `;

    const tagsHTML = sTags.map(tag => `<span class="tag-badge ${isAvailable ? 'tag-badge--blue' : 'tag-badge--gray'} school-card__tag text-[0.55rem] md:text-[0.6rem] px-1.5 py-0.5 md:px-2 md:py-1">${tag}</span>`).join('');
    const traitsHTML = sTraits.map(trait => `<li class="flex items-center gap-1 md:gap-1.5 text-[0.6rem] md:text-xs school-card__trait"><i data-lucide="check-circle-2" class="lucide w-2.5 h-2.5 md:w-3 md:h-3 shrink-0 ${isAvailable ? 'text-xjtlu-blue school-card__trait-icon' : 'text-gray-400'}"></i>${trait}</li>`).join('');

    return `
      <div class="${cardBase}" data-school-id="${school.id}" role="${isAvailable ? 'button' : 'presentation'}" tabindex="${isAvailable ? '0' : '-1'}">
        <div class="absolute top-2 right-2 md:top-3 md:right-3">
          <span class="tag-badge ${isAvailable ? 'tag-badge--blue' : 'tag-badge--gray'} text-[0.55rem] md:text-[0.6rem] px-1.5 py-0.5 md:px-2 md:py-1">
            ${isAvailable ? t('school_select_available') : t('school_select_coming_soon')}
          </span>
        </div>

        <div class="flex items-center gap-2 md:gap-3">
          <div class="w-8 h-8 md:w-10 md:h-10 rounded-lg md:rounded-xl flex items-center justify-center shrink-0 ${isAvailable ? 'bg-xjtlu-blue/10 school-card__icon-wrap' : 'bg-gray-200'}">
            <i data-lucide="${school.icon}" class="lucide w-4 h-4 md:w-5 md:h-5 ${isAvailable ? 'text-xjtlu-blue school-card__icon' : 'text-gray-400'}"></i>
          </div>
          <!-- 【修复】：增加 pr-14 md:pr-16 防止长文本遮挡右上角徽章 -->
          <div class="min-w-0 pr-14 md:pr-16">
            <p class="font-black text-[0.75rem] md:text-sm leading-tight school-card__name">${sName}</p>
            <p class="text-[0.6rem] md:text-[0.65rem] mt-0.5 school-card__abbr ${isAvailable ? 'text-xjtlu-gray' : 'text-gray-400'}">
              ${school.abbr}
            </p>
          </div>
        </div>

        <div class="h-px bg-gray-100 school-card__divider"></div>
        <!-- 手机端横屏隐藏描述以节省空间，或者做行数限制 -->
        <p class="hidden md:block text-[0.65rem] md:text-xs leading-relaxed school-card__desc ${isAvailable ? 'text-gray-600' : 'text-gray-400'} line-clamp-2">${sDesc}</p>
        <div class="flex flex-wrap gap-1 md:gap-1.5">${tagsHTML}</div>
        <ul class="flex flex-col gap-1 md:gap-1.5 mt-auto">${traitsHTML}</ul>
      </div>
    `;
  }

  // ───────────────────────────────────────────────────────────
  // 事件绑定
  // ───────────────────────────────────────────────────────────

  _bindEvents() {
    this._container?.querySelectorAll('.school-card').forEach(card => {
      card.addEventListener('mouseenter', () => this._onCardHover(card, true));
      card.addEventListener('mouseleave', () => this._onCardHover(card, false));
      card.addEventListener('click',      () => this._onCardSelect(card));
    });
  }

  /**
   * 悬浮时切换子元素颜色（white ↔ 原色）。
   * 纯 CSS group-hover 在 Tailwind CDN 模式下不稳定，改用 JS。
   * @param {HTMLElement} card
   * @param {boolean} isHover
   */
  _onCardHover(card, isHover) {
    const targets = {
      '.school-card__name':       ['text-xjtlu-navy',  'text-white'],
      '.school-card__abbr':       ['text-xjtlu-gray',  'text-white/70'],
      '.school-card__desc':       ['text-gray-600',    'text-white/80'],
      '.school-card__divider':    ['bg-gray-100',      'bg-white/20'],
      '.school-card__icon-wrap':  ['bg-xjtlu-blue/10', 'bg-white/20'],
      '.school-card__icon':       ['text-xjtlu-blue',  'text-white'],
      '.school-card__trait':      ['text-gray-600',    'text-white/80'],
      '.school-card__trait-icon': ['text-xjtlu-blue',  'text-white'],
      '.school-card__tag':        ['tag-badge--blue',  'tag-badge--white'],
    };

    for (const [selector, [base, hover]] of Object.entries(targets)) {
      card.querySelectorAll(selector).forEach(el => {
        if (isHover) { el.classList.remove(base); el.classList.add(hover); } 
        else { el.classList.remove(hover); el.classList.add(base); }
      });
    }
  }

  /**
   * 点击可用学院卡片，进入游戏。
   * @param {HTMLElement} card
   */
  _onCardSelect(card) {
    const schoolId = card.dataset.schoolId;
    const school   = SCHOOLS.find(s => s.id === schoolId);
    if (!school || !school.available) return;
    StateManager.saveGame();
    StateManager.setGamePhase(CONSTANTS.GAME_PHASE.MAP);
  }

  /**
   * 构建移动端专用 HTML (简洁列表/卡片布局)。
   * @returns {string}
   */
  _buildMobileHTML() {
    return `
      <div class="w-full h-full flex flex-col bg-gray-50 overflow-hidden">
        
        <!-- 顶部：简洁标题 -->
        <div class="shrink-0 px-5 pt-5 pb-3 bg-white border-b border-gray-100">
          <div class="flex items-center gap-2 mb-1">
            <span class="w-1.5 h-4 bg-xjtlu-blue rounded-full"></span>
            <p class="text-[0.6rem] font-bold text-xjtlu-blue tracking-[0.2em] uppercase">
              ${t('school_select_step')}
            </p>
          </div>
          <h1 class="text-xl font-black text-xjtlu-navy leading-tight">
            ${t('school_select_title')}
          </h1>
        </div>

        <!-- 中部：列表区域 -->
        <div class="flex-1 overflow-y-auto custom-scroll px-4 py-4">
          <div class="flex flex-col gap-3">
            ${SCHOOLS.map(s => this._buildMobileCard(s)).join('')}
          </div>
        </div>

        <!-- 底部：提示 -->
        <div class="shrink-0 px-5 py-3 bg-white border-t border-gray-100 flex items-center justify-center gap-2 text-[0.6rem] text-xjtlu-gray italic">
          <i data-lucide="info" class="lucide w-3 h-3"></i>
          ${t('school_select_demo_hint')}
        </div>
      </div>
    `;
  }

  /**
   * 构建移动端卡片。
   * @param {object} school
   */
  _buildMobileCard(school) {
    const isAvailable = school.available;
    const sName = resolveI18nText(school.title);
    
    return `
      <div class="relative flex items-center gap-4 p-4 rounded-xl border-2 transition-all 
                  ${isAvailable ? 'border-white bg-white shadow-sm school-card' : 'border-gray-100 bg-gray-50 opacity-60'}" 
           data-school-id="${school.id}">
        
        <div class="w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${isAvailable ? 'bg-xjtlu-blue/10 text-xjtlu-blue' : 'bg-gray-200 text-gray-400'}">
          <i data-lucide="${school.icon}" class="lucide w-6 h-6"></i>
        </div>

        <div class="flex-1 min-w-0">
          <div class="flex items-center gap-2">
            <h3 class="font-black text-sm text-xjtlu-navy truncate">${sName}</h3>
            ${isAvailable ? '' : `<span class="text-[0.5rem] px-1.5 py-0.5 rounded bg-gray-200 text-gray-500 uppercase font-bold">${t('school_select_coming_soon')}</span>`}
          </div>
          <p class="text-[0.6rem] text-xjtlu-gray mt-0.5">${school.abbr}</p>
        </div>

        ${isAvailable ? `
          <div class="shrink-0 w-8 h-8 rounded-full bg-xjtlu-blue/5 flex items-center justify-center text-xjtlu-blue">
            <i data-lucide="chevron-right" class="lucide w-5 h-5"></i>
          </div>
        ` : ''}
      </div>
    `;
  }
}
