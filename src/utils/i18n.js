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
  'how_to_desc': { 
    zh: '1. 消耗【行动点】在校园建筑中进行活动。\n2. 注意平衡【心理】、【身体】和【资金】，归零或触顶都会导致游戏直接失败！\n3. 努力提升【学力】和【英语】，它们会在学期末转化为 GPA 和雅思成绩。\n4. 你的最终目标是在大四申请季（Month 12）前，积累足够的硬件与软背景，拿到梦校 Offer。', 
    en: '1. Spend [AP] to perform actions in campus buildings.\n2. Balance your [Mental], [Physical], and [Money]. Hitting 0 or 100 will result in an instant Game Over!\n3. Improve [Academic] and [English] to boost your GPA and IELTS scores at the end of the term.\n4. Your ultimate goal is to build a strong profile before the Application Season (Month 12) to secure your dream Offer.' 
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

  // ── 月末总结 ──
  'summary_title': { zh: '学期总结', en: 'Term Summary' },
  'summary_end': { zh: '结束', en: 'Ended' },
  'summary_exam_result': { zh: '📝 期末成绩', en: '📝 Final Exam Results' },
  'summary_gpa': { zh: 'GPA', en: 'GPA' },
  'summary_next': { zh: '即将进入', en: 'Entering' },
  'summary_btn_start': { zh: '开始', en: 'Start' },

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