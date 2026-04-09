/**
 * @fileoverview B 类建筑的固定行动定义
 *
 * baseEffects 中的数值为基础值，实际结算时会经过 BuffEngine 修正。
 */

export const ACTIONS = {

  // ── FB 基础楼 ──────────────────────────────────────────────
  'study_class': {
    id:          'study_class',
    buildingId:  'fb',
    label:       '上课自习',
    apCost:      1,
    icon:        'book-open',
    baseEffects: {
      Academic_Ability: +8,
      Mental_Health:    -5,
    },
    labels: {
      Academic_Ability: '学力',
      Mental_Health:    '心理健康',
    },
    flavorText:  '连上三节专业课，教授的 PPT 像催眠符，但你硬撑着记下了所有考点。期末能不能过就看这次了。',
    bgImage:     'assets/images/events/classroom.png',
    mascotState: 'goose_sad',
  },

  // ── CB 图书馆 ──────────────────────────────────────────────
  'study_ielts': {
    id:          'study_ielts',
    buildingId:  'cb',
    label:       '刷雅思题库',
    apCost:      1,
    icon:        'languages',
    baseEffects: {
      English_Ability: +6,
      Mental_Health:   -8,
    },
    labels: {
      English_Ability: '英语能力',
      Mental_Health:   '心理健康',
    },
    flavorText:  '剑桥雅思 14 的听力让你仿佛置身伦敦地铁，阅读题让你的大脑直接宕机。但你的英语确实在进步。',
    bgImage:     'assets/images/events/library.png',
    mascotState: 'goose_sad',
  },

  // ── PB 公共楼 ──────────────────────────────────────────────
  'relax_pb':  {
    id:          'relax_pb',
    buildingId:  'pb',
    label:       '去 PB 放松',
    apCost:      1,
    icon:        'coffee',
    baseEffects: {
      Mental_Health:    +15,
      Physical_Health:  +5,
    },
    labels: {
      Mental_Health:   '心理健康',
      Physical_Health: '身体健康',
    },
    flavorText:  '在 PB 喝了杯奶茶，和几个同学聊了聊近况。有人已经拿到实习了，但你决定今天先不焦虑这件事。',
    bgImage:     'assets/images/events/pb.png',
    mascotState: 'goose_idle',
  },

  // ── EB 工科楼 ──────────────────────────────────────────────
  'study_research': {
    id:          'study_research',
    buildingId:  'eb',
    label:       '做课程项目',
    apCost:      1,
    icon:        'code-2',
    baseEffects: {
      Academic_Ability: +6,
      Mental_Health:    -6,
      Physical_Health:  -3,
    },
    labels: {
      Academic_Ability: '学力',
      Mental_Health:    '心理健康',
      Physical_Health:  '身体健康',
    },
    flavorText:  '在 EB 的机房里调 bug 调到深夜，最后终于跑通了。虽然眼睛快瞎了，但这段经历可以写进简历。',
    bgImage:     'assets/images/events/lab.png',
    mascotState: 'goose_sad',
  },

  // ── IR 科研中心 ────────────────────────────────────────────
  'research_ir': {
    id:          'research_ir',
    buildingId:  'ir',
    label:       '参与科研项目',
    apCost:      1,
    icon:        'microscope',
    baseEffects: {
      Mental_Health:    -8,
      Physical_Health:  -5,
    },
    labels: {
      Mental_Health:   '心理健康',
      Physical_Health: '身体健康',
    },
    tagsProgress: 'Research_Exp',   // 累计 3 次后获得标签（由 ActionEngine 处理）
    flavorText:   '跟着教授做了半天实验，大部分时间在处理数据和改 LaTeX 格式。但教授说你做得不错，这就够了。',
    bgImage:      'assets/images/events/research.png',
    mascotState:  'goose_sad',
  },

  // ── IA 学术交流中心 ────────────────────────────────────────
  'consult_ia': {
    id:          'consult_ia',
    buildingId:  'ia',
    label:       '咨询申研信息',
    apCost:      1,
    icon:        'message-circle',
    baseEffects: {
      Mental_Health: -3,
    },
    labels: {
      Mental_Health: '心理健康',
    },
    flavorText:   '和 IA 的老师聊了一个小时，得到了一些有用的信息，也对自己的申请方向更清晰了一点。',
    bgImage:      'assets/images/events/office.png',
    mascotState:  'goose_idle',
    knowledgeTip: '官方渠道是获取申研信息最可靠的方式之一。学校的国际交流办公室通常可以提供目标院校的联系方式和往届申请数据。',
  },

  // ── GYM 体育馆 ────────────────────────────────────────────
  'exercise': {
    id:          'exercise',
    buildingId:  'gym',
    label:       '去健身房锻炼',
    apCost:      1,
    icon:        'dumbbell',
    baseEffects: {
      Physical_Health: +20,
      Mental_Health:   +10,
    },
    labels: {
      Physical_Health: '身体健康',
      Mental_Health:   '心理健康',
    },
    flavorText:   '跑了五公里，举了举铁。出了一身汗之后，那些关于申研的焦虑好像也没那么沉重了。',
    bgImage:      'assets/images/events/gym.png',
    mascotState:  'goose_happy',
  },

  // ── 宿舍 ──────────────────────────────────────────────────
  'rest': {
    id:          'rest',
    buildingId:  'dorm',
    label:       '回宿舍休息',
    apCost:      1,
    icon:        'moon',
    baseEffects: {
      Mental_Health:   +20,
      Physical_Health: +10,
    },
    labels: {
      Mental_Health:   '心理健康',
      Physical_Health: '身体健康',
    },
    flavorText:   '在宿舍躺平打了一下午游戏，虽然什么都没学，但感觉自己又活过来了。明天再说吧。',
    bgImage:      'assets/images/events/dorm.png',
    mascotState:  'goose_happy',
  },
};