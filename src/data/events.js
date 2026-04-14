/**
 * @fileoverview 事件数据库 (精修黄金剧情版)
 *
 * 包含：特殊大事件 (Scheduled) 与 随机小事件 (Random)
 * 知识库 (Knowledge Base) 已深度缝合至 tip 与 flavor_text 中。
 */

export const EVENTS = {

  // ════════════════════════════════════════════════════════
  // 特殊大事件（Scheduled Events - 固定月份触发）
  // ════════════════════════════════════════════════════════

  // ── Month 4：大三上期末考试 ──────────────────────────────
  'sem1_final_exam': {
    event_id:     'sem1_final_exam',
    type:         'scheduled',
    trigger_month: 4,
    title:        '大三上 · 期末考试',
    scenes: [
      {
        text: '十二月，苏州的妖风裹挟着湿冷吹过校园。FB 基础楼的走廊里贴满了各种复习资料，CB 图书馆的座位从清晨六点半就被占满。期末周，到了。',
        bg:   'assets/images/events/classroom.png',
      },
      {
        text: '你翻开堆积如山的课件，开始了最后的冲刺。这学期你在专业课上流下的每一滴汗水（或摸掉的每一条鱼），都将在接下来几天内转化为成绩单上冷冰冰的数字。',
        bg:   'assets/images/events/classroom.png',
        tip:  '核心要点：西浦采用百分制与 GPA 双轨制。对于申请英系名校，均分（百分制）往往比 GPA 更加致命。一门核心专业课的拉胯，可能需要三门选修课才能补回来。',
      },
      {
        text: '最后一门考试结束，你走出考场，冬日的阳光有些刺眼。不管结果如何，大三上学期已经成为历史了。',
        bg:   null,
      },
    ],
  },

  // ── Month 6：选择中介 (核心剧情) ─────────────────────────
  'agency_selection': {
    event_id:     'agency_selection',
    type:         'scheduled',
    trigger_month: 6,
    title:        '留学中介：捷径还是深坑？',
    scenes: [
      {
        text: '大三下学期，春招和申研的焦虑开始在宿舍蔓延。对床的室友昨天刚签了一家名叫“星耀前程”的机构，据说花了六万块。你也决定去实地考察一下。',
        bg:   null,
      },
      {
        speaker: 'A 机构顾问',
        text: '“同学你的背景很不错！只要交五万全款，我们有内部合作渠道，保录英国 G5！不过为了统一管理，申请邮箱和密码由我们全权掌管，你等好消息就行。”',
        bg:   null,
        tip:  '避雷警告：警惕任何“保证录取 Top 10”的承诺。申请结果取决于当年竞争情况，无人能百分百保证。拒绝无法提供申请邮箱账号的中介！',
      },
      {
        speaker: 'B 机构顾问',
        text: '“说实话，你的背景申前百有希望，但 G5 很难，我们需要在文书上多下功夫。我们按阶段收费，首付一万五，邮箱密码你自己拿着，全拒得退款条款都在合同里。”',
        bg:   null,
        tip:  '避雷指南：正规中介通常采用【阶段性付款】。合同中必须明确“全拒得”如何退款，且条款清晰无模糊字眼。',
      },
      {
        text: '两份合同摆在你的面前，或者……你也可以选择不签。你的决定是？',
        choices: [
          {
            text:       '签 A 机构：五万全款，"保录" G5，交出邮箱控制权',
            effects:    { Money: -50000, Mental_Health: +20 },
            tags_added: ['Scam_Agency'],
            flavor_text: '你刷卡交了五万全款。虽然看不到申请邮箱让你有些不安，但“保录 G5”的承诺像一针强心剂，你瞬间觉得未来一片光明，连复习都不想看了。',
            tip:        '老师的痛心复盘：永远不要相信“保录”的鬼话！没有邮箱控制权，你甚至不知道他们到底有没有帮你递交申请！你大概率踩坑了。'
          },
          {
            text:       '签 B 机构：首付一万五，阶段付款，自己掌握邮箱',
            effects:    { Money: -15000, Mental_Health: -5 },
            tags_added: ['Reliable_Agency'],
            flavor_text: '你仔细核对了“全拒得退首付”的条款并签了字。没有保录承诺让你依然感到压力，但把账号密码握在自己手里，让你觉得踏实。',
            tip:        '明智之选：保持主动权和知情权至关重要。中介只是辅助，你才是申请的主人。'
          },
          {
            text:       '谁也不签，决定全程 DIY',
            effects:    { Money: 0, Mental_Health: -15 },
            tags_added: ['DIY_Applicant'],
            flavor_text: '你谢绝了所有中介。省下了几万块钱，但接下来的选校、网申、催推荐信、写文书，全都要靠你自己了。你打开了电脑，深吸了一口气。',
            tip:        '硬核之路：DIY 能最大程度锻炼你的信息检索能力，但需要极强的时间管理、抗压能力和英语写作功底。祝你好运！'
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
    title:        '大三下 · 期末考试',
    scenes: [
      {
        text: '六月，苏州进入了漫长的梅雨季节。大三下学期的期末考试悄然而至，这也是申研前最重要的一次成绩定格。',
        bg:   null,
      },
      {
        text: '考场里空调嗡嗡作响，你盯着试卷，努力把这学期积累的知识转化为分数。笔尖划过答题纸的声音显得格外清晰。',
        bg:   null,
        tip:  '核心要点：大三下的成绩对申研至关重要！这是你递交申请时，招生官能看到的最新、最完整的一份成绩单。',
      },
      {
        text: '交卷的那一刻，你感到一阵轻松，又夹杂着一丝对未来的茫然。大三，就这样结束了。',
        bg:   null,
      },
    ],
  },

  // ── Month 10：暑期实习决策 ──────────────────────────────
  'summer_internship_decision': {
    event_id:     'summer_internship_decision',
    type:         'scheduled',
    trigger_month: 10,
    title:        '暑期去向：弯道超车还是原地踏步？',
    scenes: [
      {
        text: '七月，暑假开始了。微信群里，同学们开始分享各自的计划：有人去了大厂实习，有人报了封闭式雅思班，有人选择出去旅行，还有人还没想好。',
        bg:   null,
      },
      {
        text: '你的手机屏幕上同时打开着三个页面：某大厂的实习 JD、一个昂贵的雅思强化班报名链接，以及……一张机票比价网站。暑假两个月，怎么用？',
        tip:  '规划指南：暑期是申研准备的最后一段“黄金时期”。实习能大幅强化软背景，雅思备考能解决语言死线。两者不可兼得时，需根据自身最致命的短板来抉择。',
        choices: [
          {
            text:       '全力冲刺雅思，报名封闭强化班',
            effects:    { English_Ability: +25, Mental_Health: -20, Money: -8000 },
            tags_added: [],
            flavor_text: '你交了八千块学费，每天八小时高强度刷题。暑假结束时，你的耳朵对英音产生了条件反射，但连续的熬夜让你的黑眼圈深了不少。',
            tip:        '语言成绩是很多人的阿喀琉斯之踵。集中精力解决它是非常务实的选择。'
          },
          {
            text:       '去大厂实习，积累真实项目经验',
            effects:    { Mental_Health: -15, Physical_Health: -10, Money: +6000 },
            tags_added: ['Internship_Exp'],
            flavor_text: '你成功拿到了一份为期八周的实习。每天挤地铁、开会、写周报。工资不多，还要倒贴租房钱，但简历上多了一行沉甸甸的真实经历。',
            tip:        '对于申请偏就业导向的硕士项目（如商科、计算机），一段对口的实习经历往往比高出 0.5 分的雅思更有说服力。'
          },
          {
            text:       '好好休息，为大四养精蓄锐',
            effects:    { Mental_Health: +40, Physical_Health: +30 },
            tags_added: [],
            flavor_text: '你拒绝了所有的内卷邀约，睡到自然醒，追完了几部剧。开学时你神清气爽——但隐约觉得，同学们的简历似乎比你厚了一大截。',
            tip:        '休息固然重要，但在竞争白热化的申请季前夕选择彻底躺平，可能需要你在大四付出成倍的代价来偿还。'
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
    title:        '递交申请：掷出命运的骰子',
    scenes: [
      {
        text: '大四九月。申请季正式拉开帷幕。你坐在电脑前，盯着十几所学校的网申系统。一年半的准备，浓缩成了这个界面上的几个填写框。',
        bg:   null,
      },
      {
        text: 'PS 改了十几稿，推荐信找了三位教授，成绩单已经盖章扫描。你检查了最后一遍材料，你的履历，就是你这一年半的全部答案。',
        bg:   null,
        tip:  '申请材料清单：个人陈述 (PS)、推荐信 (LoR)、简历 (CV)、成绩单 (Transcript)、语言成绩。缺一不可。',
      },
      {
        text: '你深吸一口气，点下了 Submit 按钮。\n\n屏幕上弹出了绿色的 "Application Submitted"。\n\n接下来，只能交给时间了。',
        bg:   null,
      },
    ],
  },

  // ════════════════════════════════════════════════════════
  // 随机小事件（Random Events - 消耗 AP 后概率触发）
  // ════════════════════════════════════════════════════════

  'random_ielts_opportunity': {
    event_id:        'random_ielts_opportunity',
    type:            'random',
    title:           '雅思考位放出',
    available_months: [2, 3, 5, 7, 8, 10, 11],
    forbidden_tags:  ['IELTS_7.0', 'IELTS_7.5'],
    weight:          1.2,
    scenes: [
      {
        text: '你在刷手机时偶然看到，下个月初的雅思考试突然放出了几个考位。报名费 2170 元。你心里盘算了一下自己最近的复习状态……',
        tip:  '时间规划：雅思成绩有效期为 2 年。最晚应在申请季当年的暑假结束前考出达标成绩，如果成绩不理想，还来得及在 9-10 月进行二战。',
        choices: [
          {
            text:       '冲了！立刻缴费报名！',
            effects:    { Money: -2170 },
            tags_added: [],
            flavor_text: '你咬咬牙，交了 2170 元报名费。看着日历上标红的考试日期，你的心跳开始加速，接下来的几周注定是地狱模式。',
            next_event_id: 'ielts_exam_result',
          },
          {
            text:       '先去目标院校官网查查具体要求',
            effects:    { Mental_Health: +5 },
            tags_added: [],
            flavor_text: '你没有冲动，而是打开了 UCL 的官网。你发现他们不仅要求总分 7.0，还要求单项不低于 6.5。你觉得目前水平还不够稳，决定再沉淀一下。',
            tip:        '防坑指南：绝对不要只听信中介或旁人的说法！必须亲自上目标院校官网查询。文科专业的要求通常比理工科更高。'
          },
        ],
      },
    ],
  },

  // 雅思考试结果（由 random_ielts_opportunity 链式触发）
  'ielts_exam_result': {
    event_id: 'ielts_exam_result',
    type:     'chain',
    title:    '雅思出分日',
    scenes: [
      {
        text: '两周后，一个普通的下午。你收到了一条来自教育部考试中心的短信。你深吸一口气，颤抖着手登录了查分网站……',
        bg:   null,
      },
      // 实际出分结果由 GameLoop.js 在触发前动态注入到 scenes[1].text
      {
        text: '（雅思成绩将在此显示）',
        bg:   null,
      },
    ],
  },

  'random_study_buddy': {
    event_id:        'random_study_buddy',
    type:            'random',
    title:           '雅思搭子',
    available_months: [1, 2, 3, 4, 6, 7, 8],
    forbidden_tags:  ['IELTS_7.0', 'IELTS_7.5'],
    weight:          1.0,
    scenes: [
      {
        text: '室友推开你的房间门：“我最近也在备考雅思，要不要一起？两个人互相监督，听力对答案也方便点。”',
        bg:   null,
        choices: [
          {
            text:       '好啊，一起去 CB 卷！',
            effects:    { Mental_Health: +5 },
            tags_added: ['Study_Buddy'],
            flavor_text: '从这周开始，你们约定每天一起去图书馆刷题。有了同伴的监督，连枯燥的阅读题都没那么面目可憎了。',
          },
          {
            text:       '谢了，但我习惯一个人按自己的节奏学',
            effects:    {},
            tags_added: [],
            flavor_text: '室友点点头，没有勉强。你关上房门，戴上降噪耳机。安静和专注，是你目前最需要的东西。',
          },
        ],
      },
    ],
  },

  'random_professor_chat': {
    event_id:        'random_professor_chat',
    type:            'random',
    title:           '教授的橄榄枝',
    available_months: [1, 2, 3, 4, 6, 7, 8, 9],
    forbidden_tags:  [],
    weight:          0.8,
    scenes: [
      {
        text: '下课后，专业课教授叫住了你：“你上次那份 Assignment 写得很有深度。我最近有个课题组缺人手，有没有兴趣来帮帮忙？”',
        bg:   null,
        tip:  '软背景提升：教授推荐信 (LoR) 是申研材料中的重要一环。与教授建立良好关系，不仅能获得强推，还能积累宝贵的科研经历。',
        choices: [
          {
            text:       '当然！非常荣幸加入课题组',
            effects:    { Mental_Health: -10, Physical_Health: -5 },
            tags_added: ['Research_Exp'],
            flavor_text: '你加入了课题组，开始了每周跑实验室、看外文文献的日子。虽然占用了大量课余时间，但教授对你的态度明显亲络了许多。',
          },
          {
            text:       '感谢教授，但目前想全力保 GPA',
            effects:    { Mental_Health: +5 },
            tags_added: [],
            flavor_text: '教授表示理解，并鼓励你继续保持成绩。你错过了一个潜在的科研机会，但也保住了摇摇欲坠的发际线和睡眠时间。',
          },
        ],
      },
    ],
  },

};