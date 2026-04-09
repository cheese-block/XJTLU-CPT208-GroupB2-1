/**
 * @fileoverview 事件数据库
 *
 * 每个事件包含：
 *   - scenes[]：按顺序播放的场景列表
 *   - 每个 scene 可包含 choices（抉择节点）
 *   - choices 可包含 next_event_id（连续事件链）
 *
 * 事件分类：
 *   - scheduled：特殊大事件（固定月份触发）
 *   - random：随机小事件（AP 消耗后概率触发）
 */

export const EVENTS = {

  // ════════════════════════════════════════════════════════
  // 特殊大事件（Scheduled Events）
  // ════════════════════════════════════════════════════════

  // ── Month 4：大三上期末考试 ──────────────────────────────
  'sem1_final_exam': {
    event_id:     'sem1_final_exam',
    type:         'scheduled',
    trigger_month: 4,
    title:        '大三上·期末考试',
    scenes: [
      {
        text: '十二月，西浦的冬天终于来了。走廊里贴满了各种复习资料，图书馆的座位从清晨开始就被占满。期末周，到了。',
        bg:   null,
      },
      {
        text: '你翻开堆积如山的课件，开始了最后的冲刺。这学期的学力积累，将在接下来几天内转化为你的成绩单。',
        bg:   null,
        tip:  '西浦采用百分制与 GPA 双轨制，期末成绩直接影响申研时的成绩单竞争力。',
      },
      {
        text: '考试结束，你走出考场，冬日的阳光有点刺眼。不管结果如何，这个学期已经成为历史了。',
        bg:   null,
      },
    ],
  },

  // ── Month 6：选择中介 ────────────────────────────────────
  'agency_selection': {
    event_id:     'agency_selection',
    type:         'scheduled',
    trigger_month: 6,
    title:        '寻找留学中介',
    scenes: [
      {
        text: '大三下学期，周围的同学开始陆续签约中介。你在小红书上刷到了两家机构的广告，决定去了解一下。',
        bg:   null,
      },
      {
        text: '你约了两家机构的顾问面谈。A 机构顾问西装革履，承诺"保录 G5"，报价 3 万全款，但拒绝透露申请账号密码。B 机构态度平实，不承诺保录，按阶段付款，合同里写明了退款条款。',
        bg:   null,
        tip:  '老师忠告：警惕"保录 Top 10"的夸大承诺。合法中介不可能保证录取结果。签约前必须确认合同包含"全拒得退款"条款，并坚持掌握申请邮箱的控制权。',
      },
      {
        text: '两家机构摆在你面前。你需要做出选择。',
        choices: [
          {
            text:       'A 机构：承诺保录 G5，全款 3 万，不给邮箱密码',
            effects:    { Money: -30000, Mental_Health: +5 },
            tags_added: ['Scam_Agency'],
            flavor_text: '你交了 3 万全款。虽然他们拒绝给你邮箱密码，但"保录"两个字让你焦虑的心情得到了极大的缓解。合同被顾问快速翻过，你没来得及细看退款条款……',
            tip:        '你选择了高风险选项。没有邮箱控制权意味着你无法独立跟踪申请进度，一旦出现纠纷将非常被动。',
          },
          {
            text:       'B 机构：不保录，按阶段付款，条款清晰',
            effects:    { Money: -10000, Mental_Health: -3 },
            tags_added: ['Reliable_Agency'],
            flavor_text: '你仔细核对了退款条款，确认包含"全拒得退首付"的保障后，交了首付。没有"保录"承诺让你有些忐忑，但账号密码在自己手里，心里踏实了一些。',
            tip:        '靠谱的选择。按阶段付款和退款保障是识别正规中介的重要标准。',
          },
        ],
      },
    ],
  },

  // ── Month 9：大三下期末考试 ──────────────────────────────
  'sem2_final_exam': {
    event_id:     'sem2_final_exam',
    type:         'scheduled',
    trigger_month: 9,
    title:        '大三下·期末考试',
    scenes: [
      {
        text: '六月，梅雨季节。大三下学期的期末考试悄然而至，这也是申研前最重要的一次成绩定格。',
        bg:   null,
      },
      {
        text: '考场里空调嗡嗡作响，你盯着试卷，努力把这学期积累的知识转化为分数。笔尖划过答题纸的声音显得格外清晰。',
        bg:   null,
        tip:  '大三下的 GPA 对申研至关重要——这是你递交申请时最新的一份成绩单，许多学校会重点审阅。',
      },
      {
        text: '交卷的那一刻，你感到一阵轻松，又夹杂着一丝茫然。大三，就这样结束了。',
        bg:   null,
      },
    ],
  },

  // ── Month 10：暑期实习决策 ──────────────────────────────
  'summer_internship_decision': {
    event_id:     'summer_internship_decision',
    type:         'scheduled',
    trigger_month: 10,
    title:        '暑期去向',
    scenes: [
      {
        text: '七月，暑假开始了。微信群里，同学们开始分享各自的暑期计划：有人去了大厂实习，有人报了线下培训班，有人选择出去旅行，还有人——和你一样——还没想好。',
        bg:   null,
      },
      {
        text: '你的手机屏幕上同时打开着三个页面：某大厂的实习 JD、一个雅思强化班的报名链接，以及……一张机票比价网站。暑假两个月，怎么用？',
        tip:  '暑期是申研准备的黄金时期。实习经历能强化软背景，雅思备考能提高语言成绩，两者都对最终申请有实质影响。',
        choices: [
          {
            text:       '全力冲刺雅思，争取暑假出分',
            effects:    { English_Ability: +20, Mental_Health: -15 },
            tags_added: [],
            flavor_text: '你报了一个雅思强化班，每天八小时刷题。暑假结束时，你的耳朵对英音产生了某种条件反射，但黑眼圈深了不少。',
          },
          {
            text:       '争取一段实习经历',
            effects:    { Mental_Health: -10, Physical_Health: -10, Money: +5000 },
            tags_added: ['Internship_Exp'],
            flavor_text: '你联系了几家公司，最终拿到了一份为期六周的实习。工资不多，但简历上多了一行真实的经历，这比什么都值钱。',
          },
          {
            text:       '好好休息，为大四养精蓄锐',
            effects:    { Mental_Health: +30, Physical_Health: +20 },
            tags_added: [],
            flavor_text: '你拒绝了所有邀约，睡到自然醒，追完了几部剧。开学时你神清气爽——但隐约觉得，同学们的简历又厚了一些。',
          },
        ],
      },
    ],
  },

  // ── Month 12：最终申请 ──────────────────────────────────
  'final_application': {
    event_id:     'final_application',
    type:         'scheduled',
    trigger_month: 12,
    title:        '递交申请',
    scenes: [
      {
        text: '大四九月。申请季正式开始。你坐在电脑前，盯着十几所学校的申请系统。一年半的准备，浓缩成了这个界面上的几个填写框。',
        bg:   null,
      },
      {
        text: 'PS 改了十几稿，推荐信找了三位教授，成绩单已经寄出。你的申请材料，就是你这一年半的全部答案。',
        bg:   null,
        tip:  '申请季的关键材料：个人陈述（PS）、推荐信（LoR）、简历（CV）、成绩单（Transcript）、语言成绩（IELTS/TOEFL）。缺一不可。',
      },
      {
        text: '你深吸一口气，点下了提交按钮。\n\n屏幕上弹出了绿色的"Application Submitted"。\n\n接下来，只能等待了。',
        bg:   null,
      },
    ],
  },

  // ════════════════════════════════════════════════════════
  // 随机小事件（Random Events）
  // ════════════════════════════════════════════════════════

  'random_study_buddy': {
    event_id:        'random_study_buddy',
    type:            'random',
    title:           '雅思搭子',
    available_months: [1, 2, 3, 4, 5, 6, 7, 8, 9],
    forbidden_tags:  ['IELTS_7.0', 'IELTS_7.5'],
    weight:          1.0,
    scenes: [
      {
        text: '室友推开你的房间门："我最近也在备考雅思，要不要一起？两个人互相监督，效率应该高不少。"',
        bg:   null,
        choices: [
          {
            text:       '好啊，一起备考！',
            effects:    { Mental_Health: +5 },
            tags_added: ['Study_Buddy'],
            flavor_text: '从这周开始，你们约定每天一起去图书馆刷两小时题。有人陪着，连听力都没那么枯燥了。',
          },
          {
            text:       '谢了，我更喜欢自己学',
            effects:    {},
            tags_added: [],
            flavor_text: '室友点点头，没有勉强。你关上房门，继续一个人刷剑桥雅思。安静，是你需要的。',
          },
        ],
      },
    ],
  },

  'random_ddl_crash': {
    event_id:        'random_ddl_crash',
    type:            'random',
    title:           'DDL 突袭',
    available_months: [1, 2, 3, 6, 7, 8],
    forbidden_tags:  [],
    weight:          1.0,
    scenes: [
      {
        text: '你正打算执行今天的计划，手机突然连续震动——课程群里炸锅了："教授把 Assignment 截止时间提前了三天？！"',
        bg:   null,
      },
      {
        text: '你打开 Learning Mall，确认了这个噩耗。三天内要交一份组队报告，而你们组还没开始写。',
        choices: [
          {
            text:       '临时抱佛脚，连夜赶完',
            effects:    { Academic_Ability: +3, Physical_Health: -15, Mental_Health: -10 },
            tags_added: [],
            flavor_text: '你熬了两个通宵，眼睛里布满血丝，但报告交上去了。教授的评语是"结构尚可，细节不足"。代价有点大。',
          },
          {
            text:       '和组员分工，按时完成',
            effects:    { Academic_Ability: +5, Mental_Health: -5 },
            tags_added: [],
            flavor_text: '你迅速拉了个会议，明确分工，各自负责一部分。虽然紧张，但大家都准时交了。团队作战，效率出奇的高。',
          },
        ],
      },
    ],
  },

  'random_professor_chat': {
    event_id:        'random_professor_chat',
    type:            'random',
    title:           '教授课后约谈',
    available_months: [1, 2, 3, 4, 6, 7, 8, 9],
    forbidden_tags:  [],
    weight:          0.7,
    scenes: [
      {
        text: '下课后，教授叫住了你："你上次那份作业写得不错，有没有兴趣参与我们课题组的一个小项目？"',
        bg:   null,
        tip:  '教授推荐信是申研材料中的重要一环。与教授建立良好关系，不仅有利于获得有分量的推荐信，也可能带来科研机会。',
        choices: [
          {
            text:       '当然！非常感兴趣',
            effects:    { Mental_Health: -5, Physical_Health: -5 },
            tags_added: ['Research_Exp'],
            flavor_text: '你加入了课题组，开始了每周两次的组会。工作量不小，但教授对你的印象明显好了很多——这对未来的推荐信是实质性的加分。',
          },
          {
            text:       '感谢教授，但目前时间有限',
            effects:    { Mental_Health: +3 },
            tags_added: [],
            flavor_text: '教授点点头，表示理解。你错过了一个机会，但也保住了自己的时间和精力。有时候，拒绝也是一种策略。',
          },
        ],
      },
    ],
  },

  'random_ielts_opportunity': {
    event_id:        'random_ielts_opportunity',
    type:            'random',
    title:           '报名雅思考试',
    available_months: [2, 3, 5, 7, 8],
    forbidden_tags:  ['IELTS_7.0', 'IELTS_7.5'],
    weight:          0.8,
    scenes: [
      {
        text: '你刷到了一个雅思考试名额，考试日期在下个月，报名费 2000 元。你现在的英语备考状态，值得一搏吗？',
        tip:  '雅思考试建议在英语能力充分准备后再报名，盲目参考不仅浪费报名费，低分成绩也可能影响心态。',
        choices: [
          {
            text:       '报名参加，实战检验',
            effects:    { Money: -2000 },
            tags_added: [],
            flavor_text: '你交了报名费，把考试日期标红在日历上。不管准没准备好，上场才知道真实水平。',
            next_event_id: 'ielts_exam_result',
          },
          {
            text:       '再准备一段时间再考',
            effects:    { Mental_Health: +5 },
            tags_added: [],
            flavor_text: '你关掉了报名页面。还没准备好，不能浪费机会。继续练，等下次名额。',
          },
        ],
      },
    ],
  },

  // 雅思考试结果（由 random_ielts_opportunity 链式触发）
  'ielts_exam_result': {
    event_id: 'ielts_exam_result',
    type:     'chain',
    title:    '雅思出分',
    scenes: [
      {
        text: '三周后，雅思成绩出炉。你颤抖着打开了查分页面……',
        bg:   null,
      },
      // 实际出分结果由 ExamEngine.resolveIeltsExam() 在触发前注入
      // 此处为占位场景，实际文本由引擎动态替换
      {
        text: '（雅思成绩将在此显示）',
        bg:   null,
      },
    ],
  },

};