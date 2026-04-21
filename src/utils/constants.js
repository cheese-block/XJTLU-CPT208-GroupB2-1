/**
 * @fileoverview 全局常量定义
 * 所有"魔法数字"集中于此，禁止在业务代码中直接使用字面量。
 */

export const CONSTANTS = Object.freeze({

  // ─────────────────────────────────────────────────────────
  // 【存档系统】
  // ─────────────────────────────────────────────────────────
  SAVE_KEY:     'xjtlu_sim_save',   // localStorage key
  GLOBAL_SAVE_KEY: 'xjtlu_sim_global_data', // 【新增】全局持久化存档（多周目、图鉴）
  SAVE_VERSION: '1.0.0',           // 存档版本（迁移兼容用）

  // ─────────────────────────────────────────────────────────
  // 【AP（行动点）】
  // ─────────────────────────────────────────────────────────
  AP_MAX_PER_MONTH: 5,

  // ─────────────────────────────────────────────────────────
  // 【新增】：展会版 Demo 最大月份
  // ─────────────────────────────────────────────────────────
  MAX_MONTHS: 4,

  // ─────────────────────────────────────────────────────────
  // 【生存属性 A类：心理、身体、资金】(0-100 走钢丝，两端皆死)
  // ─────────────────────────────────────────────────────────
  MENTAL_HEALTH_INIT:       50,
  MENTAL_HEALTH_MAX:       100,
  MENTAL_HEALTH_MIN:         0,

  PHYSICAL_HEALTH_INIT:     50,
  PHYSICAL_HEALTH_MAX:     100,
  PHYSICAL_HEALTH_MIN:       0,

  MONEY_INIT:               50,
  MONEY_MAX:               100,
  MONEY_MIN:                 0,

  // ─────────────────────────────────────────────────────────
  // 【目标属性 B类：英语、学力】(积累型，越高越好)(展会版上限下调至 50)
  // ─────────────────────────────────────────────────────────
  ENGLISH_ABILITY_INIT:  15,
  ENGLISH_ABILITY_MAX:   40,
  ENGLISH_ABILITY_MIN:    0,

  ACADEMIC_ABILITY_INIT: 0,
  ACADEMIC_ABILITY_MAX:  60,
  ACADEMIC_ABILITY_MIN:  0,

  // ─────────────────────────────────────────────────────────
  // 【随机事件】
  // ─────────────────────────────────────────────────────────
  RANDOM_EVENT_BASE_PROB: 0.20,  // 每次消耗 AP 后触发随机事件的基础概率（20%）

  // ─────────────────────────────────────────────────────────
  // 【雅思出分阈值】(按 40 分上限等比例缩放)
  //   按 minAbility 从高到低排列，取第一个满足条件的
  // ─────────────────────────────────────────────────────────
  IELTS_THRESHOLDS: [
    { minAbility: 34, tag: 'IELTS_7.5', band: '7.5' }, // 约 85%
    { minAbility: 28, tag: 'IELTS_7.0', band: '7.0' }, // 约 70%
    { minAbility: 20, tag: 'IELTS_6.5', band: '6.5' }, // 约 50%
    { minAbility: 12, tag: 'IELTS_6.0', band: '6.0' }, // 约 30%
    { minAbility:  0, tag: 'IELTS_5.5', band: '5.5' },
  ],

  // ─────────────────────────────────────────────────────────
  // 【GPA 转换阈值】(按 60 分上限等比例缩放)
  //   Academic_Ability → GPA 数值 + 标签
  // ─────────────────────────────────────────────────────────
  GPA_THRESHOLDS: [
    { minAbility: 50, gpa: 3.8, tag: 'GPA_Top'  }, // 约 83%
    { minAbility: 38, gpa: 3.3, tag: 'GPA_High' }, // 约 63%
    { minAbility: 24, gpa: 2.8, tag: 'GPA_Mid'  }, // 约 40%
    { minAbility:  0, gpa: 2.2, tag: 'GPA_Low'  },
  ],

  // ─────────────────────────────────────────────────────────
  // 【月份 → 游戏阶段（Phase）映射】
  // ─────────────────────────────────────────────────────────
  MONTH_TO_PHASE: Object.freeze({
    1:  'Y3_SEM1',   2:  'Y3_SEM1',   3:  'Y3_SEM1',  4: 'Y3_SEM1',
    5:  'Y3_WINTER',
    6:  'Y3_SEM2',   7:  'Y3_SEM2',   8:  'Y3_SEM2',  9: 'Y3_SEM2',
    10: 'Y3_SUMMER', 11: 'Y3_SUMMER',
    12: 'Y4_SEM1',
  }),

  // ─────────────────────────────────────────────────────────
  // 【月份 → 现实月份（UI 显示文案）】
  // ─────────────────────────────────────────────────────────
  MONTH_TO_REALWORLD: Object.freeze({
    1:  '9月',
    2:  '10月',
    3:  '11月',
    4:  '12月',
    5:  '1-2月 (寒假)',
    6:  '3月',
    7:  '4月',
    8:  '5月',
    9:  '6月',
    10: '7月 (暑假)',
    11: '8月 (暑假)',
    12: '9月 (申请季)',
  }),

  // ─────────────────────────────────────────────────────────
  // 【Phase → 中文标签（UI 状态栏显示用）】
  // ─────────────────────────────────────────────────────────
  PHASE_LABELS: Object.freeze({
    Y3_SEM1:   '大三上学期',
    Y3_WINTER: '寒假',
    Y3_SEM2:   '大三下学期',
    Y3_SUMMER: '大三暑假',
    Y4_SEM1:   '大四上学期',
  }),

  // ─────────────────────────────────────────────────────────
  // 【gamePhase 枚举】
  // ─────────────────────────────────────────────────────────
  GAME_PHASE: Object.freeze({
    TITLE:         'TITLE',
    SCHOOL_SELECT: 'SCHOOL_SELECT',
    MAP:           'MAP',
    VN:            'VN',
    EVENT_CARD:    'EVENT_CARD',
    MONTH_SUMMARY: 'MONTH_SUMMARY',
    TAG_SHOWCASE:  'TAG_SHOWCASE',
    ENDING:        'ENDING',
    COLLECTION:    'COLLECTION',   // 新增
  }),

  // ─────────────────────────────────────────────────────────
  // 【特殊（强制）事件时间表】【因展会版 Demo 而修改】
  // ─────────────────────────────────────────────────────────
  SCHEDULED_EVENTS: Object.freeze([
    { month: 1,  eventId: 'unlock_ia_notice'            }, // 第 1 个月结束时触发（大三下开局）
    { month: 2,  eventId: 'summer_internship_decision'  }, // 第 2 个月结束时触发（暑假开局）
    { month: 2,  eventId: 'ielts_guarantee'             }, // 第 2 个月结束时触发（暑假开局）
    { month: 3,  eventId: 'agency_investigation_late'   }, 
    { month: 4,  eventId: 'sem1_final_exam'             }, // 第 4 个月结束时触发（大结局清算）
    // 注意：final_application 从此处移除，改为代码逻辑手动触发
    { month: 9,  eventId: 'sem2_final_exam'             },
  ]),

  // ─────────────────────────────────────────────────────────
  // 【学期末/初月份】
  // ─────────────────────────────────────────────────────────
  SEMESTER_END_MONTHS: Object.freeze([4, 9]),
  SEMESTER_START_MONTHS: Object.freeze([1, 6]),

  // ─────────────────────────────────────────────────────────
  // 【屏幕 ID → DOM id 映射】
  // ─────────────────────────────────────────────────────────
  SCREEN_IDS: Object.freeze({
    TITLE:         'screen-title',
    SCHOOL_SELECT: 'screen-school-select',
    MAP:           'screen-map',
    VN:            'screen-vn',
    EVENT_CARD:    'screen-event-card',
    MONTH_SUMMARY: 'screen-month-summary',
    TAG_SHOWCASE:  'screen-tag-showcase',
    ENDING:        'screen-ending',
    COLLECTION:    'screen-collection',  // 新增
    BOOT:          'screen-boot',
  }),

  // ─────────────────────────────────────────────────────────
  // 【调试模式】
  // ─────────────────────────────────────────────────────────
  MAP_DEBUG: false,
  LOG_LEVEL: 'debug',

});