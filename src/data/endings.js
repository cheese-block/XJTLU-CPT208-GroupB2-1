/**
 * @fileoverview 结局数据库
 * priority 越小，优先级越高。
 */

export const ENDINGS = [
  // ── 0. 强制 Bad Endings (中途触发) ──
  {
    id: 'bad_end_depression',
    priority: 0,
    title: '抑郁退学',
    condition: (tags) => tags.includes('__BAD_END_DEPRESSION__'),
    description: '长期的焦虑和高压彻底击垮了你的心理防线。你不得不办理了休学手续，回家休养。申研？那已经是上辈子的事了。',
    tip: '复盘：心理健康永远是第一位的。不要为了卷履历而透支自己，适时的休息和求助至关重要。',
    theme: 'danger'
  },
  {
    id: 'bad_end_hospitalized',
    priority: 0,
    title: '停学住院',
    condition: (tags) => tags.includes('__BAD_END_HOSPITALIZED__'),
    description: '连续的熬夜和缺乏锻炼让你的身体发出了最后的警告。你在医院的病床上醒来，错过了所有的申请季 DDL。',
    tip: '复盘：身体是革命的本钱。每周去几次 GYM 或者早点睡觉，比多刷两套雅思题更有价值。',
    theme: 'danger'
  },

  // ── 1. 顶级结局 (G5 / 顶尖名校) ──
  {
    id: 'offer_g5',
    priority: 10,
    title: 'G5 梦校 Offer',
    // 条件：GPA 高 + 雅思达标 + 软背景极佳 + 没被黑中介坑
    condition: (tags, softScore) => 
      tags.includes('GPA_High') && 
      (tags.includes('IELTS_7.0') || tags.includes('IELTS_7.5')) &&
      softScore >= 20 &&
      !tags.includes('Scam_Agency'),
    description: '经过地狱般的折磨和完美的规划，你收到了伦敦大学学院 (UCL) 的录取通知书！你的履历无懈可击，所有的汗水都在这一刻得到了回报。',
    tip: '复盘：完美的申请 = 扎实的硬件 (GPA+雅思) + 出彩的软背景 (科研/实习) + 靠谱的申请渠道。你做到了极致。',
    theme: 'success'
  },

  // ── 2. 被黑中介坑的特殊结局 ──
  {
    id: 'scam_trap',
    priority: 20,
    title: '全聚德 (中介暴雷)',
    condition: (tags) => tags.includes('Scam_Agency'),
    description: '你满心欢喜地等待着“保录”的 Offer，却发现中介的老师已经失联。由于你没有申请邮箱的密码，你甚至不知道他们到底有没有帮你递交申请。最终，你一无所获。',
    tip: '复盘：永远不要相信“保录”的鬼话！申请邮箱的控制权必须在自己手里，这是底线。',
    theme: 'warning'
  },

  // ── 3. 中坚力量 (Top 50) ──
  {
    id: 'offer_top50',
    priority: 30,
    title: '百强名校 Offer',
    condition: (tags, softScore) => 
      (tags.includes('GPA_High') || tags.includes('GPA_Mid')) && 
      (tags.includes('IELTS_6.5') || tags.includes('IELTS_7.0') || tags.includes('IELTS_7.5')),
    description: '虽然没能触及最顶尖的王冠，但你依然拿到了一所世界排名前 50 的优秀大学 Offer。这是一个非常稳健且令人羡慕的结果。',
    tip: '复盘：硬件达标是申请的敲门砖。在西浦，保持一个过得去的 GPA 和及格的雅思，就能保住下限。',
    theme: 'primary'
  },

  // ── 4. 语言班结局 (雅思没考出来) ──
  {
    id: 'offer_presessional',
    priority: 40,
    title: '带条件录取 (配语言班)',
    condition: (tags) => tags.includes('GPA_Mid') || tags.includes('GPA_High'),
    description: '你的专业课成绩不错，但雅思始终差了一口气。学校给你发了 Conditional Offer，你必须提前两个月去英国读昂贵的语言班。',
    tip: '复盘：语言成绩是很多人的阿喀琉斯之踵。早点考出雅思，能为你省下几万块的语言班学费和巨大的心理压力。',
    theme: 'primary'
  },

  // ── 99. 兜底结局 (Gap Year) ──
  {
    id: 'gap_year',
    priority: 99,
    title: '被迫 Gap Year',
    condition: () => true, // 无条件触发兜底
    description: 'GPA 惨淡，雅思没出分，履历一片空白。看着同学们纷纷晒出 Offer，你默默关掉了朋友圈，开始搜索“如何准备二战”。',
    tip: '复盘：申研是一场马拉松，临时抱佛脚是行不通的。尽早规划，或者考虑其他的出路吧。',
    theme: 'warning'
  }
];