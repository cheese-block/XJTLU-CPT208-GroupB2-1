/**
 * @fileoverview 国际化字典与翻译工具
 */
import { getLang } from '../state/StateManager.js';

export const DICT = {
  // ── 主菜单 ──
  'title_main': { zh: '西浦<br>申研模拟器', en: 'XJTLU<br>Postgrad Simulator' },
  'title_sub': { zh: '每一个抉择，都决定你的 Offer。', en: 'Every choice shapes your Offer.' },
  'btn_new_game': { zh: '开始游戏', en: 'New Game' },
  'btn_restart': { zh: '重新开始', en: 'Restart' },
  'btn_continue': { zh: '继续游戏', en: 'Continue' },
  'btn_how_to_play': { zh: '怎么玩？', en: 'How to Play' },
  'btn_collection': { zh: '结局图鉴', en: 'Endings' },
  'mascot_quote': { zh: '"申研这件事，<br>越早准备越好。"', en: '"The earlier you prepare,<br>the better."' },
  'school_label': { zh: 'SAT · 先进计算学院', en: 'SAT · School of Advanced Technology' },

  // ── 通用 ──
  'cancel': { zh: '取消', en: 'Cancel' },
  'modal_default_title': { zh: '确认操作', en: 'Confirm Action' },
  'modal_default_confirm': { zh: '确认', en: 'Confirm' },
  'modal_default_cancel': { zh: '取消', en: 'Cancel' },

  // ── 主菜单补充 ──
  'last_save': { zh: '上次存档：', en: 'Last save: ' },
  'restart_title': { zh: '重新开始', en: 'Restart Game' },
  'restart_desc': { 
    zh: '当前存档将被永久清除，这个操作无法撤销。\n确定要重新开始吗？', 
    en: 'Your current save will be permanently deleted. This cannot be undone.\nAre you sure?' 
  },
  'restart_btn': { zh: '确认重置', en: 'Confirm Reset' },

  // ── 怎么玩 (How to play) ──
  'how_to_title': { zh: '怎么玩？', en: 'How to Play?' },
  // 【修改】：适配 4 个月展会版文本
  'how_to_desc': { 
    zh: '1. 消耗【行动点】在校园建筑中进行活动。\n2. 注意平衡【心理】、【身体】和【资金】，归零或触顶都会导致游戏直接失败！\n3. 努力提升【学力】和【英语】，它们会在最终期末转化为 GPA 和雅思成绩。\n4. 本次 Demo 浓缩为 4 个关键阶段。请合理规划，在申请季结束前积累足够的筹码，拿到梦校 Offer。', 
    en: '1. Spend [AP] to perform actions in campus buildings.\n2. Balance your [Mental], [Physical], and [Money]. Hitting 0 or 100 will result in an instant Game Over!\n3. Improve [Academic] and [English] to boost your GPA and IELTS scores.\n4. This Demo is compressed into 4 key stages. Plan wisely to build a strong profile before the Application Season ends.' 
  },
  'how_to_confirm': { zh: '明白了', en: 'Got it' },

  // ── 学院选择 ──
  'school_select_step': { zh: 'Step 1 of 1', en: 'Step 1 of 1' },
  'school_select_title': { zh: '选择你的学院', en: 'Choose Your School' },
  'school_select_desc': { zh: '不同学院的申研路径截然不同。选择你所在的学院，开始你的申研之旅。', en: 'Different schools have entirely different paths for postgraduate applications. Choose yours to begin.' },
  'school_select_coming_soon': { zh: '敬请期待', en: 'Coming Soon' },
  'school_select_available': { zh: '可选', en: 'Available' },
  'school_select_demo_hint': { zh: 'MVP Demo 阶段仅开放 SAT 学院，更多学院将在后续版本推出', en: 'Only SAT is available in the MVP Demo. More schools coming soon.' },

  // ── 状态栏 ──
  'stat_ap': { zh: '行动点', en: 'AP' },
  'stat_mental': { zh: '心理', en: 'Mental' },
  'stat_physical': { zh: '身体', en: 'Physical' },
  'stat_money': { zh: '资金', en: 'Money' },
  'stat_academic': { zh: '学力', en: 'Academic' },
  'stat_english': { zh: '英语', en: 'English' },

  // ── 地图界面 ──
  'map_end_month': { zh: '结束本月', en: 'End Month' },
  'map_resume': { zh: '我的申请履历', en: 'My Profile' },
  'map_gpa': { zh: '累计 GPA', en: 'Cumulative GPA' },
  'map_ielts': { zh: '雅思成绩', en: 'IELTS Band' },
  'map_softbg': { zh: '软背景积累', en: 'Soft Background' },
  'map_buffs': { zh: '活跃状态 (Buffs)', en: 'Active Buffs' },
  'map_click_building': { zh: '点击地图上的建筑', en: 'Click on a building' },
  'map_actionable': { zh: '可执行行动的建筑', en: 'Actionable' },
  'map_info_only': { zh: '纯科普建筑', en: 'Info Only' },
  'map_ap_hint': { zh: '本月剩余行动点显示在顶部状态栏', en: 'Remaining AP is shown on the top bar' },
  'map_action_tag': { zh: '可行动', en: 'Actionable' },
  'map_info_tag': { zh: '纯科普', en: 'Info' },
  'map_student_says': { zh: '同学说', en: 'Rumors' },
  'map_empty_resume': { zh: '简历空空如也...去参加点活动吧', en: 'Your resume is empty... go do something!' },
  'map_no_buffs': { zh: '当前无特殊状态', en: 'No active status' },
  'map_tooltip_title': { zh: '状态与增益说明', en: 'Status & Buffs' },
  'map_tooltip_desc': { 
    zh: '你的履历将直接决定最终能拿到的 Offer 级别。<br><br>下方的活跃状态会在日常行动中提供额外加成。', 
    en: 'Your profile determines your final Offer.<br><br>Active buffs provide modifiers to your daily actions.' 
  },
  'map_no_score': { zh: '暂无', en: 'N/A' },
  'map_no_ielts': { zh: '未出分', en: 'No Score' },
  'map_confirm_end_month_title': { zh: '结束本月', en: 'End Month' },
  'map_confirm_end_month_btn': { zh: '进入下月', en: 'Proceed' },
  'map_confirm_end_month_cancel': { zh: '再看看', en: 'Cancel' },
  'map_ap_remaining_msg': { zh: '本月还有 <span class="text-xjtlu-red font-black">{ap} 点 AP</span> 未使用，结束本月将会清零。<br><br>确定要进入下个月吗？', en: 'You have <span class="text-xjtlu-red font-black">{ap} AP</span> left. It will be cleared.<br><br>Proceed to next month?' },
  'map_ap_exhausted_msg': { zh: '本月行动点已耗尽。<br><br>确定要结束本月行程，进入下个月吗？', en: 'You have exhausted your AP.<br><br>Proceed to next month?' },
  'map_buff_duration_permanent': { zh: '永久效果', en: 'Permanent' },
  'map_buff_duration_remaining': { zh: '剩余 {months} 个月', en: '{months} mo. left' },
  'map_stat_modifier_desc': { zh: '{action} {stat} {sign}{delta}', en: '{action} {stat} {sign}{delta}' },
  'map_prob_modifier_desc': { zh: '随机事件概率 {sign}{pct}%', en: 'Event Prob. {sign}{pct}%' },
  'map_action_relevant': { zh: '执行相关行动时', en: 'On relevant actions' },
  'map_action_every': { zh: '每次行动', en: 'Every action' },
  'map_milestone_y3s1': { zh: '大三上', en: 'Y3 Sem1' },
  'map_milestone_y3s2': { zh: '大三下', en: 'Y3 Sem2' },
  'map_milestone_summer': { zh: '暑假', en: 'Summer' },
  'map_milestone_apply': { zh: '申请季', en: 'Apply' },
  'map_tutorial_title': { zh: "💌 开发者寄语：致先行体验者", en: "💌 Developer's Note" },
  'map_tutorial_msg': { 
    zh: "欢迎体验由 GroupB2-1 开发的《西浦申研模拟器》MVP 测试版！<br><br>为了适配展会节奏，我们将原本的申请季<b>浓缩为了 4 个月（即 4 个回合）</b>。请合理规划行动点（AP），并留意以下限制：<br><br>📍 <b>探索范围</b><br>校园平面图上建筑对应的<b>蓝色图钉</b>代表可执行行动的建筑，<b>灰色图钉</b>目前仅作校园风貌展示及科普。<br>而由于 Demo 性质和工作量上的考虑，目前仅有<b>【科学楼 SA~SD】、【宿舍】、【图书馆 CB】</b>拥有较深的随机事件池。<br><br>🎓 <b>主线提醒</b><br>请留意地图上的新建筑解锁提醒（如第 2 个月开启的 <b>IA 楼</b>）。前往那里将触发影响游戏结局的【中介风云】核心事件线。<br><br>祝你在游玩过程中达成好结局，拿到梦校的 Offer！", 
    en: "Welcome to the MVP Demo of 'XJTLU Postgrad Simulator' by GroupB2-1!<br><br>To fit the event's pace, we've <b>compressed the timeline into 4 months (4 rounds)</b>. Please plan your Action Points (AP) wisely and note the following constraints:<br><br>📍 <b>Exploration</b><br>The <b>blue pins</b> on the map indicate actionable buildings, while <b>grey pins</b> are currently for display and info only.<br>Due to the Demo's scope, only <b>[SA~SD], [Dorm], and [Library CB]</b> feature extensive random event pools.<br><br>🎓 <b>Main Story Alert</b><br>Watch for new building unlocks (e.g., <b>IA Building</b> in Month 2). Visiting there will trigger the <b>'Agent Turmoil'</b> core storyline, which significantly impacts your final ending.<br><br>Good luck securing your dream Offer!" 
  },
  'map_tutorial_btn': { zh: "我已了解，开始体验。", en: "Got it, let's suffer!" },
  'map_dorm_label': { zh: '宿舍', en: 'Dorm' },

  // ── 月末总结 ──
  'summary_title': { zh: '学期总结', en: 'Term Summary' },
  'summary_title_final': { zh: '申研阶段性总结', en: 'Final Profile Review' }, // 新增
  'summary_end': { zh: '结束', en: 'Ended' },
  'summary_locked': { zh: '申研履历已锁定', en: 'Application Profile Locked' }, // 新增
  'summary_exam_result': { zh: '📝 履历封笔之战', en: '📝 Final GPA Settlement' }, // 修改
  'summary_gpa': { zh: '最终 GPA', en: 'Final GPA' }, // 修改
  'summary_next': { zh: '即将进入', en: 'Entering' },
  'summary_next_final': { zh: '接下来的流程', en: 'Next Step' }, // 新增
  'summary_next_desc_final': { zh: '投递申请并查看录取结果', en: 'Submit Application & Reveal Result' }, // 新增
  'summary_btn_start': { zh: '开始', en: 'Start' },
  'summary_btn_submit': { zh: '去投递申请 (Submit)', en: 'Submit Application' }, // 新增

  // ── 结局图鉴 ──
  'collection_title': { zh: '结局图鉴', en: 'Ending Collection' },
  'collection_unlocked': { zh: '已解锁', en: 'Unlocked' },
  'collection_back': { zh: '返回主菜单', en: 'Back to Title' },
  'collection_locked_title': { zh: '尚未解锁', en: 'Locked' },
  'collection_locked_desc': { zh: '尚未解锁', en: 'Not Unlocked Yet' },
  'collection_teacher_review': { zh: '老师的复盘', en: 'Teacher\'s Review' },
  'collection_theme_perfect': { zh: '完美结局', en: 'Perfect End' },
  'collection_theme_normal': { zh: '普通结局', en: 'Normal End' },
  'collection_theme_regret': { zh: '遗憾结局', en: 'Regret End' },
  'collection_theme_bad': { zh: 'Bad End', en: 'Bad End' },

    // ── 事件 UI 通用 ──
    'vn_click_continue': { zh: '点击继续 ▼', en: 'Click to continue ▼' },
    'vn_multi_select_prompt': { zh: '请选择你要执行的行动（可多选）', en: 'Choose actions to execute (multiple allowed)' },
    'vn_multi_confirm': { zh: '确认选择', en: 'Confirm Selection' },
    'vn_requires_tag': { zh: '需要', en: 'Requires' },

    // ── 结局页面 ──
    'ending_tip_title': { zh: '老师的复盘', en: 'Professor\'s Review' },
    'ending_restart_btn': { zh: '重新开始游戏', en: 'Restart Game' },

    // ── 属性名称补充 ──
    'stat_agency_score': { zh: '中介指数', en: 'Agency Score' },

    // ── 考试引擎 ──
    'exam_gpa_top_desc': { zh: '你的均分 ({gpa}) 非常亮眼。这让你在面对 G5 或顶尖名校的筛选时，已经握住了一张坚实的入场券。', en: 'Your high GPA ({gpa}) is a solid entry ticket to top-tier universities. You have a great advantage in the initial screening.' },
    'exam_gpa_mid_desc': { zh: '你的均分 ({gpa}) 处于中游。这是一个稳健的开端，但这意味着你需要在文书和软背景上展现出更多独特性。', en: 'Your GPA ({gpa}) is decent. It\'s a stable start, but you\'ll need a stronger SOP or soft background to stand out.' },
    'exam_gpa_low_desc': { zh: '你的均分 ({gpa}) 偏低。这会是你申请中的软肋，你可能需要更务实的选校策略，或寄希望于惊人的科研经历。', en: 'Your GPA ({gpa}) is relatively low. You may need a more realistic university list or an outstanding research background to compensate.' },
    'exam_ielts_high_desc': { zh: '雅思成绩 {band} 分！达到了大多数 G5 院校的语言要求，这个成绩可以安心提交申请了。', en: 'IELTS score: {band}! Meets language requirements for most G5 universities. You can submit your applications with confidence.' },
    'exam_ielts_mid_desc': { zh: '雅思成绩 {band} 分，达到了部分学校的要求，但申请顶尖院校可能仍有压力。考虑是否要再冲一次。', en: 'IELTS score: {band}. Meets requirements for some universities, but top-tier applications might still be risky. Consider a retake.' },
    'exam_ielts_low_desc': { zh: '雅思成绩 {band} 分，未达到多数目标院校的要求。需要继续备考，尽快重考。', en: 'IELTS score: {band}. Below the requirement for most target universities. You need to keep preparing and retake as soon as possible.' },

    // ── 选项指示器 ──
    'stat_change_large': { zh: '显著', en: 'significant' },
    'stat_change_small': { zh: '些许', en: 'slight' },
    'stat_change_tooltip': { zh: '{stat}将发生{change}变化', en: '{stat} will change {change}' },

    // ── 对话框 ──
    'stat_desc_large_pos': { zh: '大幅提升', en: 'increased significantly' },
    'stat_desc_small_pos': { zh: '小幅提升', en: 'increased slightly' },
    'stat_desc_large_neg': { zh: '大幅下降', en: 'decreased significantly' },
    'stat_desc_small_neg': { zh: '小幅下降', en: 'decreased slightly' },

    // ── 事件卡片 ──
    'ec_card_title': { zh: '事件', en: 'EVENT' },
    'ec_choice_prompt': { zh: '请做出抉择', en: 'MAKE YOUR CHOICE' },

    // ── 标签展示 ──
    'tag_showcase_title': { zh: '人生印记复盘', en: 'Profile Review' },
    'tag_showcase_desc': { zh: '你在本次 Demo 中积累的所有筹码', en: 'Everything you achieved in this Demo.' },
    'tag_showcase_label': { zh: '获得的所有标签', en: 'Tags Earned' },
    'tag_showcase_empty': { zh: '空空如也...', en: 'Nothing here...' },
    'tag_showcase_soft_title': { zh: '软背景综合评分', en: 'Soft Background Score' },
    'tag_showcase_soft_desc': { zh: '影响顶尖名校录取的关键隐藏分', en: 'The hidden score that impacts top-tier offers.' },
    'tag_showcase_btn': { zh: '查看最终录取结果', en: 'Reveal Final Result' },

    // ── 标签字典 ──
    'tag_gpa_top_label': { zh: 'GPA 3.8 优秀', en: 'Top GPA (3.8)' },
    'tag_gpa_top_desc': { zh: 'GPA 达到 3.8，顶尖水平，G5 的敲门砖。', en: 'GPA hit 3.8. Top-tier performance, a key to G5.' },
    'tag_gpa_high_label': { zh: '高 GPA', en: 'High GPA' },
    'tag_gpa_high_desc': { zh: 'GPA 大于 3.3，极具竞争力。', en: 'GPA > 3.3. Very competitive.' },
    'tag_gpa_mid_label': { zh: '中等 GPA', en: 'Decent GPA' },
    'tag_gpa_mid_desc': { zh: 'GPA 在 2.8 - 3.3 之间，中规中矩。', en: 'GPA between 2.8 - 3.3. Solid but standard.' },
    'tag_gpa_low_label': { zh: '低 GPA', en: 'Low GPA' },
    'tag_gpa_low_desc': { zh: 'GPA 低于 2.8，申请阻力很大。', en: 'GPA below 2.8. Applications will be tough.' },
    'tag_ielts_75_label': { zh: '雅思 7.5', en: 'IELTS 7.5' },
    'tag_ielts_75_desc': { zh: '横扫绝大多数名校语言要求。', en: 'Meets requirements for almost all top universities.' },
    'tag_ielts_70_label': { zh: '雅思 7.0', en: 'IELTS 7.0' },
    'tag_ielts_70_desc': { zh: '满足绝大多数名校语言要求。', en: 'Meets requirements for most top universities.' },
    'tag_ielts_65_label': { zh: '雅思 6.5', en: 'IELTS 6.5' },
    'tag_ielts_65_desc': { zh: '刚好够用，部分名校可能需配语言班。', en: 'Just enough, might need pre-sessional English for some.' },
    'tag_ielts_60_label': { zh: '雅思 6.0', en: 'IELTS 6.0' },
    'tag_ielts_60_desc': { zh: '语言成绩偏低，选择受限。', en: 'Score is low, limited options.' },
    'tag_ielts_55_label': { zh: '雅思 5.5', en: 'IELTS 5.5' },
    'tag_ielts_55_desc': { zh: '基本无缘直录，必须读语言班。', en: 'Direct entry unlikely, language course required.' },
    'tag_internship_label': { zh: '实习经历', en: 'Internship Exp.' },
    'tag_internship_desc': { zh: '真实的职场经历，软背景加分。', en: 'Real-world work experience. Boosts your profile.' },
    'tag_research_label': { zh: '科研经历', en: 'Research Exp.' },
    'tag_research_desc': { zh: '参与过教授项目，极具含金量。', en: 'Joined a professor\'s project. High value.' },
    'tag_perfect_agency_label': { zh: '契约守护者', en: 'Contract Guardian' },
    'tag_perfect_agency_desc': { zh: '你签订了一份极其稳健的合同，并将申请主动权牢牢握在手中。', en: 'You signed a solid contract and kept full control over your applications.' },
    'tag_reliable_agency_label': { zh: '靠谱中介', en: 'Reliable Agency' },
    'tag_reliable_agency_desc': { zh: '成功避开了申请路上的大坑，获得了一个合格的辅助。', en: 'Successfully avoided pitfalls and found a decent helper.' },
    'tag_scam_agency_label': { zh: '黑中介受害者', en: 'Scam Victim' },
    'tag_scam_agency_desc': { zh: '在一声声“保录”中迷失，失去了申请账号的控制权，前途未卜。', en: 'Lost in "guaranteed entry" promises. Lost control of your accounts. Uncertain future.' },
    'tag_diy_label': { zh: '硬核 DIY', en: 'Hardcore DIY' },
    'tag_diy_desc': { zh: '不依赖任何外部机构，独立完成了复杂的申研全流程。', en: 'Completed the complex application process entirely on your own.' },
    'tag_study_buddy_label': { zh: '雅思搭子', en: 'IELTS Buddy' },
    'tag_study_buddy_desc': { zh: '有人陪伴的备考之路。', en: 'Someone to prepare with.' },
    'tag_anxious_label': { zh: '曾陷入焦虑', en: 'Fell into Anxiety' },
    'tag_anxious_desc': { zh: '心理健康曾亮起红灯。', en: 'Mental health once hit a red light.' },
    'tag_sick_label': { zh: '曾大病一场', en: 'Once Very Ill' },
    'tag_sick_desc': { zh: '身体曾发出严重警告。', en: 'Physical health once gave a serious warning.' },
    'tag_unknown_label': { zh: '未知印记', en: 'Unknown' },

    // ── 月份名称 ──
    'month_1': { zh: '九月', en: 'Sep' },
    'month_2': { zh: '十月', en: 'Oct' },
    'month_3': { zh: '十一月', en: 'Nov' },
    'month_4': { zh: '十二月', en: 'Dec' },
    'month_5': { zh: '寒假', en: 'Winter Break' },
    'month_6': { zh: '三月', en: 'Mar' },
    'month_7': { zh: '四月', en: 'Apr' },
    'month_8': { zh: '五月', en: 'May' },
    'month_9': { zh: '六月', en: 'Jun' },
    'month_10': { zh: '暑假', en: 'Summer Break' },
    'month_11': { zh: '暑假', en: 'Summer Break' },
    'month_12': { zh: '申请季', en: 'Application Season' },

    // ── 雅思结果评价 ──
    'ielts_eval_75': { zh: '远超预期！', en: 'Far beyond expectations!' },
    'ielts_eval_70': { zh: '达到了目标！', en: 'Goal achieved!' },
    'ielts_eval_65': { zh: '勉强够用。', en: 'Barely enough.' },
    'ielts_eval_60': { zh: '不太理想。', en: 'Not ideal.' },
    'ielts_eval_low': { zh: '需要继续努力。', en: 'Need to keep trying.' },
    'ielts_score_label': { zh: '雅思成绩：', en: 'IELTS Score: ' },

    // ── 游戏结束确认 ──
    'demo_end_title': { zh: 'Demo 体验结束', en: 'Demo Completed' },
    'demo_end_msg': { zh: '你的申请履历已经锁定，开始复盘。', en: 'Your application profile is now locked. Time to review.' },
    'demo_end_btn': { zh: '开始复盘', en: 'Review' },
  };

/**
 * 获取对应语言的文本
 * @param {string} key 
 * @returns {string}
 */
export function t(key) {
  const lang = getLang() || 'zh';
  if (!DICT[key]) return key;
  return DICT[key][lang] || DICT[key]['zh'];
}

/**
 * 统一解析可国际化文本。
 * 支持：
 *  - 纯字符串（普通文本，或 DICT key）
 *  - 双语对象 { zh, en }
 *  - 键对象 { key: 'dict_key' }
 * @param {string|object|null|undefined} value
 * @param {string} [fallback='']
 * @returns {string}
 */
export function resolveI18nText(value, fallback = '') {
  const lang = getLang() || 'zh';

  if (value == null) return fallback;

  if (typeof value === 'string') {
    // 允许直接把 DICT key 当作文案引用
    if (DICT[value]) return t(value);
    return value;
  }

  if (typeof value === 'object') {
    if (typeof value.key === 'string') return t(value.key);

    const langValue = value[lang];
    if (typeof langValue === 'string' && langValue.length > 0) return langValue;

    if (typeof value.zh === 'string' && value.zh.length > 0) return value.zh;
    if (typeof value.en === 'string' && value.en.length > 0) return value.en;
  }

  return fallback;
}