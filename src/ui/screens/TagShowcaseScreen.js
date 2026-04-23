import * as StateManager from '../../state/StateManager.js';
import { CONSTANTS }     from '../../utils/constants.js';
import { calculateSoftScore } from '../../engine/EndingEngine.js';

export class TagShowcaseScreen {
  constructor() {
    this._container = null;
  }

  mount(container, state) {
    this._container = container;
    // 【修复】：加入 try-catch 防止未知 Tag 导致渲染崩溃白屏
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
    const isEn = StateManager.getLang() === 'en'; // 【新增定义】
    
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
              ${isEn ? 'Profile Review' : '人生印记复盘'}
            </h1>
            <p class="text-white/70 text-sm mt-2">
              <!-- 【修改】：文案适配 Demo -->
              ${isEn ? 'Everything you achieved in this Demo.' : '你在本次 Demo 中积累的所有筹码'}
            </p>
          </div>

          <div class="p-8 flex flex-col gap-8">
            
            <!-- 标签墙 -->
            <div class="flex flex-col gap-3">
              <span class="text-xs font-bold text-xjtlu-gray uppercase tracking-wider">获得的所有标签</span>
              <div class="flex flex-wrap gap-2">
                ${mappedTags.length > 0 
                  ? mappedTags.map(t => `
                      <span class="tag-badge ${t.colorCls} px-3 py-1.5 text-sm shadow-sm"
                            data-tooltip-title="${t.label}"
                            data-tooltip-desc="${t.desc}"
                            data-tooltip-type="info">
                        <i data-lucide="${t.icon}" class="lucide w-4 h-4"></i>
                        ${t.label}
                      </span>
                    `).join('')
                  : `<span class="text-gray-400 italic text-sm">空空如也...</span>`
                }
              </div>
            </div>

            <div class="h-px bg-gray-100"></div>

            <!-- 软背景评分 -->
            <div class="flex items-center justify-between bg-blue-50 rounded-xl p-4 border border-blue-100">
              <div class="flex flex-col">
                <span class="text-sm font-bold text-xjtlu-navy">软背景综合评分</span>
                <span class="text-xs text-xjtlu-gray mt-1">影响顶尖名校录取的关键隐藏分</span>
              </div>
              <span class="text-3xl font-black text-xjtlu-blue">${softScore}</span>
            </div>

          </div>

          <div class="p-6 bg-gray-50 border-t border-gray-100 flex justify-end">
            <button id="btn-reveal-ending" class="xjtlu-btn xjtlu-btn--primary text-base px-8 py-3">
              查看最终录取结果
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
      'GPA_Top':  { label: 'GPA 3.8 优秀', icon: 'graduation-cap', colorCls: 'tag-badge--blue', desc: 'GPA 达到 3.8，顶尖水平，G5 的敲门砖。' },
      'GPA_High': { label: '高 GPA', icon: 'graduation-cap', colorCls: 'tag-badge--blue', desc: 'GPA 大于 3.3，极具竞争力。' },
      'GPA_Mid':  { label: '中等 GPA', icon: 'graduation-cap', colorCls: 'tag-badge--gray', desc: 'GPA 在 2.8 - 3.3 之间，中规中矩。' },
      'GPA_Low':  { label: '低 GPA', icon: 'alert-triangle', colorCls: 'tag-badge--red', desc: 'GPA 低于 2.8，申请阻力很大。' },
      'IELTS_7.5':{ label: '雅思 7.5', icon: 'languages', colorCls: 'tag-badge--blue', desc: '横扫绝大多数名校语言要求。' },
      'IELTS_7.0':{ label: '雅思 7.0', icon: 'languages', colorCls: 'tag-badge--blue', desc: '满足绝大多数名校语言要求。' },
      'IELTS_6.5':{ label: '雅思 6.5', icon: 'languages', colorCls: 'tag-badge--gray', desc: '刚好够用，部分名校可能需配语言班。' },
      'IELTS_6.0':{ label: '雅思 6.0', icon: 'languages', colorCls: 'tag-badge--red', desc: '语言成绩偏低，选择受限。' },
      'IELTS_5.5':{ label: '雅思 5.5', icon: 'alert-triangle', colorCls: 'tag-badge--red', desc: '基本无缘直录，必须读语言班。' },
      'Internship_Exp': { label: '实习经历', icon: 'briefcase', colorCls: 'tag-badge--green', desc: '真实的职场经历，软背景加分。' },
      'Research_Exp':   { label: '科研经历', icon: 'microscope', colorCls: 'tag-badge--green', desc: '参与过教授项目，极具含金量。' },
      'Reliable_Agency':{ label: '靠谱中介', icon: 'shield-check', colorCls: 'tag-badge--green', desc: '避开了申请路上的大坑。' },
      'Perfect_Agency': { label: '契约守护者', icon: 'file-check', colorCls: 'tag-badge--blue', desc: '你签订了一份极其稳健的合同，并将申请主动权牢牢握在手中。' },
      'Reliable_Agency':{ label: '靠谱中介', icon: 'shield-check', colorCls: 'tag-badge--green', desc: '成功避开了申请路上的大坑，获得了一个合格的辅助。' },
      'Scam_Agency':    { label: '黑中介受害者', icon: 'skull', colorCls: 'tag-badge--red', desc: '在一声声“保录”中迷失，失去了申请账号的控制权，前途未卜。' },
      'DIY_Applicant':  { label: '硬核 DIY', icon: 'user-cog', colorCls: 'tag-badge--yellow', desc: '不依赖任何外部机构，独立完成了复杂的申研全流程。' },
      'Study_Buddy':    { label: '雅思搭子', icon: 'users', colorCls: 'tag-badge--yellow', desc: '有人陪伴的备考之路。' },
      'Anxious':        { label: '曾陷入焦虑', icon: 'frown', colorCls: 'tag-badge--gray', desc: '心理健康曾亮起红灯。' },
      'Sick':           { label: '曾大病一场', icon: 'thermometer', colorCls: 'tag-badge--gray', desc: '身体曾发出严重警告。' },
    };
    return dict[tag] || { label: tag, icon: 'tag', colorCls: 'tag-badge--gray', desc: '未知印记' };
  }
}