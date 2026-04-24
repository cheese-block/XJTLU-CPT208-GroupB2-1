/**
 * @fileoverview 结局数据库
 * priority 越小，优先级越高。
 */

export const ENDINGS = [
  // ── 0. 强制 Bad Endings (走钢丝死亡结局) ──
  {
    id: 'bad_end_mental_0',
    priority: 0,
    title: { zh: '抑郁退学', en: 'Dropped Out due to Depression' },
    condition: (tags) => tags.includes('__BAD_END_MENTAL_0__'),
    description: { zh: '长期的焦虑和高压彻底击垮了你的心理防线。你不得不办理了休学手续，回家休养。申研？那已经是上辈子的事了。', en: 'Long-term anxiety and high pressure have completely broken your mental defenses. You had to take a leave of absence and go home to recover. Applications? That\'s a past life now.' },
    tip: { zh: '心理健康归零。在内卷的同时，也要注意排解压力。', en: 'Mental Health hit zero. While grinding, don\'t forget to decompress.' },
    theme: 'danger'
  },
  {
    id: 'bad_end_mental_100',
    priority: 0,
    title: { zh: '看破红尘', en: 'Enlightened Zen' },
    condition: (tags) => tags.includes('__BAD_END_MENTAL_100__'),
    description: { zh: '你的心态实在太好了。你突然觉得“人生苦短，何必卷学历”，于是你果断放弃申研，买了一张去大理的单程票，成为了一名快乐的数字游民。', en: 'Your mindset is just too good. You suddenly feel "life is short, why bother with degrees?" You decide to drop the applications, buy a one-way ticket to Dali, and become a happy digital nomad.' },
    tip: { zh: '心理健康触顶。申研需要适度的焦虑感作为驱动力，太佛系是拿不到 Offer 的。', en: 'Mental Health maxed out. Applications need a bit of drive; being too zen won\'t get you an Offer.' },
    theme: 'warning'
  },
  {
    id: 'bad_end_physical_0',
    priority: 0,
    title: { zh: '积劳成疾', en: 'Hospitalized from Overwork' },
    condition: (tags) => tags.includes('__BAD_END_PHYSICAL_0__'),
    description: { zh: '连续的熬夜和缺乏锻炼让你的身体发出了最后的警告。你在医院的病床上醒来，错过了所有的申请季 DDL。', en: 'Consecutive all-nighters and lack of exercise have sent your body a final warning. You wake up in a hospital bed, having missed all the application deadlines.' },
    tip: { zh: '身体健康归零。身体是革命的本钱，不要为了赶 Due 连命都不要了。', en: 'Physical Health hit zero. Health is the foundation; don\'t trade your life for a "due".' },
    theme: 'danger'
  },
  {
    id: 'bad_end_physical_100',
    priority: 0,
    title: { zh: '沉迷举铁', en: 'Gym Obsession' },
    condition: (tags) => tags.includes('__BAD_END_PHYSICAL_100__'),
    description: { zh: '你沉迷健身无法自拔，不仅练出了八块腹肌，还能深蹲 200kg。你被星探发掘去做了全职健身教练兼模特，觉得读书没意思，申研计划无限期搁置。', en: 'You\'ve become addicted to the gym, sporting an eight-pack and a 200kg squat. A scout discovered you for full-time fitness modeling. Studying feels pointless now; applications are shelved indefinitely.' },
    tip: { zh: '身体健康触顶。四肢发达是好事，但别忘了你来大学是干什么的。', en: 'Physical Health maxed out. Being fit is great, but don\'t forget why you\'re at university.' },
    theme: 'warning'
  },
  {
    id: 'bad_end_money_0',
    priority: 0,
    title: { zh: '破产老赖', en: 'Bankruptcy' },
    condition: (tags) => tags.includes('__BAD_END_MONEY_0__'),
    description: { zh: '你花光了所有的积蓄，交不起雅思考试费，付不起中介费，甚至连饭都吃不起了。你被迫终止申请，开始全职打工还债。', en: 'You\'ve spent every penny and can\'t afford IELTS fees, agency fees, or even food. You\'re forced to stop your applications and start working full-time to pay off debts.' },
    tip: { zh: '资金归零。申研是一场极其烧钱的战争，请合理规划你的财务。', en: 'Money hit zero. Applications are an expensive war; plan your finances wisely.' },
    theme: 'danger'
  },
  {
    id: 'bad_end_money_100',
    priority: 0,
    title: { zh: '搞钱狂魔', en: 'Money Maker' },
    condition: (tags) => tags.includes('__BAD_END_MONEY_100__'),
    description: { zh: '你在兼职和倒卖二手书中发现了搞钱的乐趣，月入十万。你看着那点微薄的研究生起薪，决定直接创业，放弃申研。', en: 'You found the joy of making money through part-time gigs and reselling books, earning 100k a month. Staring at a Master\'s starting salary, you decide to just start a business and skip grad school.' },
    tip: { zh: '资金触顶。你已经掌握了财富密码，研究生学历对你来说确实不重要了。', en: 'Money maxed out. You\'ve found the wealth code; a Master\'s degree really isn\'t that important to you anymore.' },
    theme: 'warning'
  },

  // ── 1. 顶级结局 (G5 / 顶尖名校) ──
  {
    id: 'offer_g5',
    priority: 10,
    title: { zh: 'G5 梦校 Offer', en: 'G5 Dream School Offer' },
    condition: (tags, softScore) =>
      tags.includes('GPA_Top') &&
      (tags.includes('IELTS_7.0') || tags.includes('IELTS_7.5')) &&
      softScore >= 20 &&
      !tags.includes('Scam_Agency'),
    description: { zh: '经过地狱般的折磨和完美的规划，你收到了伦敦大学学院 (UCL) 的录取通知书！你的履历无懈可击，所有的汗水都在这一刻得到了回报。', en: 'After hellish torture and perfect planning, you\'ve received an admission letter from UCL! Your profile was flawless; every drop of sweat has finally paid off.' },
    tip: { zh: '完美的申请 = 扎实的硬件 (GPA+雅思) + 出彩的软背景 (科研/实习) + 靠谱的申请渠道。你做到了极致。', en: 'Perfect Application = Solid Hardware (GPA+IELTS) + Brilliant Soft Background (Research/Internship) + Reliable Channel. You did it to the max.' },
    theme: 'success'
  },

  // ── 2. 被黑中介坑的特殊结局 ──
  {
    id: 'scam_trap',
    priority: 20,
    title: { zh: '全聚德 (中介暴雷)', en: 'All-Rejected (Agency Scam)' },
    condition: (tags) => tags.includes('Scam_Agency'),
    description: { zh: '你满心欢喜地等待着"保录"的 Offer，却发现中介的老师已经失联。由于你没有申请邮箱的密码，你甚至不知道他们到底有没有帮你递交申请。最终，你一无所获。', en: 'You were happily waiting for your "guaranteed" Offer, only to find your agency contact has vanished. Since you don\'t have your portal passwords, you don\'t even know if they ever applied. You ended up with nothing.' },
    tip: { zh: '永远不要相信"保录"的鬼话！申请邮箱的控制权必须在自己手里，这是底线。', en: 'Never believe in "guaranteed admission"! Keeping control of your application portals is the absolute baseline.' },
    theme: 'warning'
  },

  // ── 3. 中坚力量 (Top 50) ──
  {
    id: 'offer_top50',
    priority: 30,
    title: { zh: '百强名校 Offer', en: 'Top 50 University Offer' },
    condition: (tags) =>
      (tags.includes('GPA_Top') || tags.includes('GPA_High') || tags.includes('GPA_Mid')) &&
      (tags.includes('IELTS_6.5') || tags.includes('IELTS_7.0') || tags.includes('IELTS_7.5')),
    description: { zh: '虽然没能触及最顶尖的王冠，但你依然拿到了一所世界排名前 50 的优秀大学 Offer。这是一个非常稳健且令人羡慕的结果。', en: 'Though you didn\'t touch the very top crown, you still secured an Offer from a world-class Top 50 university. This is a very solid and enviable result.' },
    tip: { zh: '硬件达标是申请的敲门砖。在西浦，保持一个过得去的 GPA 和及格的雅思，就能保住下限。', en: 'Hardware is the door-opener. At XJTLU, keeping a decent GPA and passing IELTS secures your floor.' },
    theme: 'primary'
  },

  // ── 4. 语言班结局 (GPA 达标但雅思未达标) ──
  {
    id: 'offer_presessional',
    priority: 40,
    title: { zh: '带条件录取 (配语言班)', en: 'Conditional Offer (Pre-sessional)' },
    condition: (tags) =>
      (tags.includes('GPA_Top') || tags.includes('GPA_High') || tags.includes('GPA_Mid')) &&
      (tags.includes('IELTS_6.0') || tags.includes('IELTS_5.5') ||
       (!tags.includes('IELTS_6.5') && !tags.includes('IELTS_7.0') && !tags.includes('IELTS_7.5'))),
    description: { zh: '你的专业课成绩不错，但雅思始终差了一口气。学校给你发了 Conditional Offer，你必须提前两个月去英国读昂贵的语言班。', en: 'Your academic grades were good, but your IELTS was just a bit short. The school gave you a Conditional Offer, meaning you must head to the UK two months early for expensive language courses.' },
    tip: { zh: '语言成绩是很多人的阿喀琉斯之踵。早点考出雅思，能为你省下几万块的语言班学费和巨大的心理压力。', en: 'Language scores are the Achilles\' heel for many. Getting your IELTS done early saves you thousands in tuition and massive stress.' },
    theme: 'primary'
  },

  // ── 99. 兜底结局 (Gap Year) ──
  {
    id: 'gap_year',
    priority: 99,
    title: { zh: '被迫 Gap Year', en: 'Forced Gap Year' },
    condition: () => true,
    description: { zh: 'GPA 惨淡，雅思没出分，履历一片空白。看着同学们纷纷晒出 Offer，你默默关掉了朋友圈，开始搜索"如何准备二战"。', en: 'With dismal GPA, no IELTS score, and a blank resume, you watch classmates post their Offers. You silently close your social feed and search for "how to prepare for a second attempt".' },
    tip: { zh: '申研是一场马拉松，临时抱佛脚是行不通的。尽早规划，或者考虑其他的出路吧。', en: 'Applications are a marathon; last-minute cramming won\'t work. Plan early or consider other paths.' },
    theme: 'warning'
  }
];
