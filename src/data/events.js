/**
 * @fileoverview 事件数据库
 */

export const EVENTS = {

  // ════════════════════════════════════════════════════════
  // 轮回引导剧情
  // ════════════════════════════════════════════════════════

  'tutorial_intro_1': {
    event_id: 'tutorial_intro_1',
    type:     'chain',
    title:    '无名笔记',
    scenes: [
      {
        text: '大三开学的第一天。你在宿舍的抽屉深处，发现了一本没有署名的黑色笔记。翻开第一页，字迹凌乱且狂躁。',
      },
      {
        speaker: '笔记上的字',
        text:    '"又一个被名校光环吸引的飞蛾。你以为只要死读书就能拿到 Offer 吗？"',
      },
      {
        speaker: '笔记上的字',
        text:    '"抬头看看你头顶的那些筹码。理智、躯壳、金钱、学识……"',
        tip:     '注意观察屏幕顶部的状态栏。',
      },
      {
        speaker: '笔记上的字',
        text:    '"任何一项枯竭，都会让你万劫不复。但别忘了，极度的膨胀同样会带来毁灭。保持平衡，在深渊上走钢丝吧。"',
        tip:     '心理、身体、资金任何一项归零或达到满值，都会直接触发游戏结束！',
      },
      {
        speaker: '笔记上的字',
        text:    '"当你把手放在命运的选项上时，注视那些浮现的圆点……它们会预示你的得失。"',
        tip:     '将鼠标悬浮在事件选项上，状态栏对应图标旁会出现圆点。白点代表增加，黑点代表减少。圆点越大，幅度越剧烈。',
      },
      {
        text: '一阵冷风吹过，笔记的书页哗啦作响，随后猛地合上。\n\n你深吸了一口气。申研的齿轮，开始转动了。',
      },
    ],
  },

  'tutorial_intro_2': {
    event_id: 'tutorial_intro_2',
    type:     'chain',
    title:    '似曾相识',
    scenes: [
      {
        text: '大三开学的第一天。你看着熟悉的宿舍天花板，脑海中闪过一些支离破碎的失败记忆。',
      },
      {
        speaker: '幻听',
        text:    '"又重来了？看来你已经见识过失衡的代价了。"',
      },
      {
        speaker: '幻听',
        text:    '"记住，四股势力的平衡高于一切。别再重蹈覆辙。"',
      },
      {
        text: '声音渐渐远去。你揉了揉太阳穴，重新拿起了书本。',
      },
    ],
  },

  // ════════════════════════════════════════════════════════
  // 特殊大事件（Scheduled Events）
  // ════════════════════════════════════════════════════════

  // 【新增】：IA 建筑解锁提示
  'unlock_ia_notice': {
    event_id:      'unlock_ia_notice',
    type:          'scheduled',
    trigger_month: 3,
    title:         '春招季的暗流',
    scenes: [
      {
        text: '三月，春招的氛围开始在校园里蔓延。你注意到，最近校园周边多了很多发传单的西装男女。\n\n朋友圈里，已经有同学开始晒出和留学中介的签约合同了。',
      },
      {
        text: '申研是一场信息战。也许你该去趟 <span class="text-xjtlu-blue font-bold">IA（国际学术交流中心）</span> 看看了，那里是各大机构和校方合作宣讲的集散地。',
        tip:  '新建筑【IA】已解锁！在地图上点击蓝色高亮的 IA 建筑，可以开始接触并筛选留学中介。',
      }
    ],
  },

  'sem1_final_exam': {
    event_id:      'sem1_final_exam',
    type:          'scheduled',
    trigger_month: 4,
    title:         '大三上 · 期末考试',
    scenes: [
      {
        text: '十二月，苏州的妖风裹挟着湿冷吹过校园。SA 楼的走廊里贴满了各种复习资料，CB 图书馆的座位从清晨六点半就被占满。期末周，到了。',
      },
      {
        text: '你翻开堆积如山的课件，开始了最后的冲刺。这学期你在专业课上流下的每一滴汗水，都将在接下来几天内转化为成绩单上冷冰冰的数字。',
        tip:  '核心要点：西浦采用百分制与 GPA 双轨制。对于申请英系名校，均分（百分制）往往比 GPA 更加致命。一门核心专业课的拉胯，可能需要三门选修课才能补回来。',
      },
      {
        text: '最后一门考试结束，你走出考场，冬日的阳光有些刺眼。不管结果如何，大三上学期已经成为历史了。',
      },
    ],
  },

  'agency_part1': {
    event_id:     'agency_part1',
    type:         'location',
    title:        '中介风云：起心动念',
    scenes: [
      {
        text: '你走进了 IA（国际学术交流中心）。走廊里贴满了各大留学机构的讲座海报，几个中介老师正在给学生发传单。你意识到，是时候考虑申研的事了。', // 【修改】：稍微调整了文案以契合主动前往建筑的语境
        choices: [
          {
            text:       '"急什么，等 7 月放暑假了再慢慢看，先搞期末。"',
            effects:    { Agency_Score: -10 },
            tags_added: ['Agency_Wait'],
            flavor_text: '室友点点头觉得有理。你心安理得地打开了专业课 PPT，决定把这个让人焦虑的问题推迟到暑假再面对。',
            tip:        '时间规划雷区：找中介的最晚时间是暑假前！拖到 7-8 月才定中介，会导致背景提升和文书头脑风暴的时间极其被动。',
          },
          {
            text:       '"确实该开始了，趁此机会现在就去了解一下吧。"',
            effects:    { Agency_Score: +10 },
            next_event_id: 'agency_investigation',
            tags_added: ['Agency_Start'],
            flavor_text: '你深吸了一口气，虽然专业课压力很大，但你清楚申研是一场持久战，早起的鸟儿才有虫吃。',
            tip:        '最佳时间：建议在申请季当年的春节后 (2-4月) 开始接触和筛选中介，为后续的背景提升留出充足时间。',
          },
          {
            text:       '"中介都是骗钱的，我要全程 DIY！"',
            effects:    {},
            tags_added: ['DIY_Applicant'],
            flavor_text: '你决定把命运交给自己。省下了几万块钱，但接下来的选校、网申、写文书，将是一场孤独且硬核的战斗。',
            tip:        '硬核之路：DIY 能最大程度锻炼信息检索能力，但需要极强的时间管理、抗压能力和英语写作功底。',
          },
        ],
      },
    ],
  },

  'agency_investigation': {
    event_id: 'agency_investigation',
    type:     'chain',
    title:    '中介风云：尽职调查',
    scenes: [
      {
        text: '你趁着周末有空，决定先在网上做做功课。面对眼花缭乱的留学市场和各种天花乱坠的宣传，你决定采用哪种方式进行初步筛选？',
        choices: [
          {
            text:       '重点看机构官方号发出的"名校 Offer 案例"和"学员好评截图"。',
            effects:    { Agency_Score: -10 },
            next_event_id: 'agency_consult_1',
            flavor_text: '看着满屏的录取通知书，你感到一种强烈的安全感，迅速锁定了机构。',
            tip:        '幸存者偏差：机构永远只会展示成功的案例，你永远看不到水面下那些被坑的受害者。',
          },
          {
            text:       '去小红书、知乎搜索机构名字，看网友评价。',
            effects:    { Agency_Score: +5 },
            next_event_id: 'agency_consult_1',
            flavor_text: '你搜了一下午，发现评价好坏参半。你越看越迷茫，不知道该相信谁。',
            tip:        '信息甄别：社交媒体上的评价极易被水军操控，参考价值有限。',
          },
          {
            text:       '通过西浦校友群，联系去年签过这家机构的学长私聊。',
            effects:    { Agency_Score: +15, Mental_Health: -5 },
            next_event_id: 'agency_consult_1',
            flavor_text: '几经周折，你终于加上了一位学长。学长告诉你："这家还行，但后期催文书一定要凶一点，不然他们会拖。"',
            tip:        '口碑调研核心：寻找中介最靠谱的方式，是联系该中介的过往真实学生获取反馈。',
          },
        ],
      },
    ],
  },

  'agency_investigation_late': {
    event_id:       'agency_investigation_late',
    type:           'scheduled',
    required_tags:  ['Agency_Wait'],
    forbidden_tags: ['DIY_Applicant'],
    title:          '中介风云：尽职调查',
    scenes: [
      {
        text: '期末终于考完了，暑假近在眼前。你猛然发现周围同学都已经签好中介开始写文书了，你急忙开始做功课。面对眼花缭乱的市场，你决定采用哪种方式进行初步筛选？',
        choices: [
          {
            text:       '重点看机构官方号发出的"名校 Offer 案例"和"学员好评截图"。',
            effects:    { Agency_Score: -10 },
            next_event_id: 'agency_consult_1',
            flavor_text: '看着满屏的录取通知书，你感到一种强烈的安全感，迅速锁定了机构。',
            tip:        '幸存者偏差：机构永远只会展示成功的案例，你永远看不到水面下那些被坑的受害者。',
          },
          {
            text:       '去小红书、知乎搜索机构名字，看网友评价。',
            effects:    { Agency_Score: +5 },
            next_event_id: 'agency_consult_1',
            flavor_text: '你搜了一下午，发现评价好坏参半。你越看越迷茫，不知道该相信谁。',
            tip:        '信息甄别：社交媒体上的评价极易被水军操控，参考价值有限。',
          },
          {
            text:       '通过西浦校友群，联系去年签过这家机构的学长私聊。',
            effects:    { Agency_Score: +15, Mental_Health: -5 },
            next_event_id: 'agency_consult_1',
            flavor_text: '几经周折，你终于加上了一位学长。学长告诉你："这家还行，但后期催文书一定要凶一点，不然他们会拖。"',
            tip:        '口碑调研核心：寻找中介最靠谱的方式，是联系该中介的过往真实学生获取反馈。',
          },
        ],
      },
    ],
  },

  'agency_consult_1': {
    event_id: 'agency_consult_1',
    type:     'chain',
    title:    '中介风云：机构巡礼 (1/3)',
    scenes: [
      {
        text: '你开始了实地考察。在沟通申请流程和目标院校时，两家机构给出了截然不同的方案。你更倾向于哪一种服务模式？',
        choices: [
          {
            text:       '机构甲："无忧托管"模式——所有大学网申账号由总部统一管理，基于内部数据模型，稳拿前 50。',
            effects:    { Agency_Score: -15 },
            next_event_id: 'agency_consult_2',
            flavor_text: '你觉得这种"全包"服务非常省心，毕竟大四还要忙毕设，有个系统统一管理能避免很多麻烦。',
            tip:        '警惕"保证录取"的承诺，更重要的是拒绝无法提供申请邮箱账号的中介。如果没有控制权，你甚至不知道他们有没有帮你递交申请。',
          },
          {
            text:       '机构乙："共创指导"模式——申请邮箱由你自己注册保管，手把手指导填网申，但你必须每天自己登录检查进度。',
            effects:    { Agency_Score: +15 },
            next_event_id: 'agency_consult_2',
            flavor_text: '你觉得这家机构有些保守，而且让你自己管邮箱意味着需要投入更多精力。',
            tip:        '掌握主动权：中介只是辅助，你才是申请的主人。将账号密码握在自己手里是底线。',
          },
        ],
      },
    ],
  },

  'agency_consult_2': {
    event_id: 'agency_consult_2',
    type:     'chain',
    title:    '中介风云：机构巡礼 (2/3)',
    scenes: [
      {
        text: '接下来，你询问了最核心的文书创作和后期团队的安排。',
        choices: [
          {
            text:       '机构甲："矩阵式流水线"——即使某个环节的老师请假，系统也会无缝指派同级别专家接手，绝对不耽误进度。',
            effects:    { Agency_Score: -15 },
            next_event_id: 'agency_consult_3',
            flavor_text: '"矩阵式团队"听起来非常专业，你觉得这种大机构的标准化流程能保证文书的下限。',
            tip:        '所谓"无缝接手"往往是频繁更换顾问的遮羞布。流水线作业极易导致文书千篇一律，缺乏个人特色。',
          },
          {
            text:       '机构乙："专属责任制"——唯一主负责顾问，名字写在合同里，文书从零开始写，出稿周期可能比同行多一周。',
            effects:    { Agency_Score: +15 },
            next_event_id: 'agency_consult_3',
            flavor_text: '专属负责听起来不错，但"不套模板"、"出稿慢"让你有些担心赶不上第一批申请的早班车。',
            tip:        '确保合同中书写顾问姓名，防止签约后频繁换人。优秀的文书必须经过深度的个人挖掘。',
          },
        ],
      },
    ],
  },

  'agency_consult_3': {
    event_id: 'agency_consult_3',
    type:     'chain',
    title:    '中介风云：机构巡礼 (3/3)',
    scenes: [
      {
        text: '最终到了看合同的环节。面对厚厚的条款和报价单，你需要做出最后的决定。',
        choices: [
          {
            text:       '机构甲："早鸟优惠"全款——今天签约享 15% 折扣，需一次性付清。零录取则扣除行政建档费和翻译费后退还剩余。',
            effects:    { Agency_Score: -20, Money: -45 },
            next_event_id: 'agency_settlement',
            flavor_text: '15% 的折扣让你非常心动。你拿起了签字笔……',
            tip:        '强烈建议阶段性付款。退款条款必须明确"全拒得"的具体退款比例，警惕"酌情扣除部分费用"这种模糊字眼。',
          },
          {
            text:       '机构乙："阶段付款"无折扣——费用分三期，首个 Offer 后付尾款。全拒得服务费 100% 全退，但申请费需额外自理。',
            effects:    { Agency_Score: +15, Money: -15 },
            next_event_id: 'agency_settlement',
            flavor_text: '没有折扣让你有些肉痛，而且还需要额外自理申请费。但分期付款确实减轻了当下的资金压力。你拿起了签字笔……',
            tip:        '阶段性付款能最大程度约束中介的后期服务质量。提前确认附加费用，避免后期隐形消费扯皮。',
          },
        ],
      },
    ],
  },

  'agency_settlement': {
    event_id: 'agency_settlement',
    type:     'chain',
    title:    '中介风云：尘埃落定',
    scenes: [
      {
        text: '经过漫长的对比和谈判，你终于签下了一份合同。',
        choices: [
          {
            text: '查看最终签约结果',
            flavor_text: '至于结果如何，时间会给出答案。',
            flavor_text_variants: [
              {
                required_stat: { stat: 'Agency_Score', min: 40 },
                tags_added: ['Reliable_Agency', 'Perfect_Agency'],
                type: 'positive',
                text: '凭借着极高的防坑意识，你成功避开了所有深坑，签订了一份几乎完美的合同。你不仅找了一个得力的辅助，更把主动权死死地焊在了自己手里。',
              },
              {
                required_stat: { stat: 'Agency_Score', min: 0, max: 39 },
                tags_added: ['Reliable_Agency'],
                type: 'neutral',
                text: '你避开了一些明显的陷阱，但在某些看似"行业标准"的条款上还是妥协了。这份合同中规中矩，未来的申请结果，只能祈祷分给你的老师足够负责了。',
              },
              {
                required_stat: { stat: 'Agency_Score', max: -1 },
                tags_added: ['Scam_Agency'],
                type: 'negative',
                text: '你在一声声"保录"和"无忧托管"的承诺中迷失了自我。你丝毫没有意识到，命运的绞索已经悄悄套在了脖子上。',
              },
            ],
          },
        ],
      },
    ],
  },

  'sem2_final_exam': {
    event_id:      'sem2_final_exam',
    type:          'scheduled',
    trigger_month: 9,
    title:         '大三下 · 期末考试',
    scenes: [
      {
        text: '六月，苏州进入了漫长的梅雨季节。大三下学期的期末考试悄然而至，这也是申研前最重要的一次成绩定格。',
      },
      {
        text: '考场里空调嗡嗡作响，你盯着试卷，努力把这学期积累的知识转化为分数。',
        tip:  '核心要点：大三下的成绩对申研至关重要！这是你递交申请时，招生官能看到的最新、最完整的一份成绩单。',
      },
      {
        text: '交卷的那一刻，你感到一阵轻松，又夹杂着一丝对未来的茫然。大三，就这样结束了。',
      },
    ],
  },

  'summer_internship_decision': {
    event_id:      'summer_internship_decision',
    type:          'scheduled',
    trigger_month: 10,
    title:         '暑期去向：弯道超车还是原地踏步？',
    scenes: [
      {
        text: '七月，暑假开始了。微信群里，同学们开始分享各自的计划：有人去了大厂实习，有人报了封闭式雅思班，有人选择出去旅行，还有人还没想好。',
      },
      {
        text: '你的手机屏幕上同时打开着三个页面：某大厂的实习 JD、一个昂贵的雅思强化班报名链接，以及……一张机票比价网站。暑假两个月，怎么用？',
        tip:  '规划指南：暑期是申研准备的最后一段黄金时期。实习能大幅强化软背景，雅思备考能解决语言死线。两者不可兼得时，需根据自身最致命的短板来抉择。',
        choices: [
          {
            text:       '全力冲刺雅思，报名封闭强化班',
            effects:    { English_Ability: +5, Mental_Health: -20, Money: -25 },
            tags_added: [],
            flavor_text: '你交了学费，每天八小时高强度刷题。暑假结束时，你的耳朵对英音产生了条件反射，但连续的熬夜让你的黑眼圈深了不少。',
            tip:        '语言成绩是很多人的阿喀琉斯之踵。集中精力解决它是非常务实的选择。',
          },
          {
            text:       '去大厂实习，积累真实项目经验',
            effects:    { Mental_Health: -15, Physical_Health: -10, Money: +20 },
            tags_added: ['Internship_Exp'],
            flavor_text: '你成功拿到了一份为期八周的实习。每天挤地铁、开会、写周报。工资不多，但简历上多了一行沉甸甸的真实经历。',
            tip:        '对于申请偏就业导向的硕士项目，一段对口的实习经历往往比高出 0.5 分的雅思更有说服力。',
          },
          {
            text:       '好好休息，为大四养精蓄锐',
            effects:    { Mental_Health: +30, Physical_Health: +25 },
            tags_added: [],
            flavor_text: '你拒绝了所有的内卷邀约，睡到自然醒，追完了几部剧。开学时你神清气爽——但隐约觉得，同学们的简历似乎比你厚了一大截。',
            tip:        '休息固然重要，但在竞争白热化的申请季前夕选择彻底躺平，可能需要你在大四付出成倍的代价来偿还。',
          },
        ],
      },
    ],
  },

  'ielts_guarantee': {
    event_id:      'ielts_guarantee',
    type:          'scheduled',
    trigger_month: 8,
    required_tags: [],
    forbidden_tags: ['IELTS_5.5', 'IELTS_6.0', 'IELTS_6.5', 'IELTS_7.0', 'IELTS_7.5'],
    title:         '最后的考位',
    scenes: [
      {
        text: '八月了，你还没有考出雅思成绩。你刷了整整两天官网，终于抢到了一个别人退掉的考位。这是暑假结束前最后的机会了。',
        tip:  '语言成绩是申请的硬门槛。如果这次还考不出来，申请季将非常被动。',
        choices: [
          {
            text:    '立刻报名，背水一战',
            effects: { Money: -20 },
            flavor_text: '你咬咬牙交了报名费。没有退路了。',
            next_event_id: 'ielts_exam_result',
          },
          {
            text:    '算了，等开学再说',
            effects: { Mental_Health: +5 },
            flavor_text: '你关掉了报名页面。开学后考位会更紧张，但你实在没有勇气面对又一次考试。',
            tip:     '拖延是雅思备考最大的敌人。越往后拖，压力越大，出分越难。',
          },
        ],
      },
    ],
  },

  'final_application': {
    event_id:      'final_application',
    type:          'scheduled',
    trigger_month: 12,
    title:         '递交申请：掷出命运的骰子',
    scenes: [
      {
        text: '大四九月。申请季正式拉开帷幕。你坐在电脑前，盯着十几所学校的网申系统。一年半的准备，浓缩成了这个界面上的几个填写框。',
      },
      {
        text: 'PS 改了十几稿，推荐信找了三位教授，成绩单已经盖章扫描。你检查了最后一遍材料，你的履历，就是你这一年半的全部答案。',
        tip:  '申请材料清单：个人陈述 (PS)、推荐信 (LoR)、简历 (CV)、成绩单 (Transcript)、语言成绩。缺一不可。',
      },
      {
        text: '你深吸一口气，点下了 Submit 按钮。\n\n屏幕上弹出了绿色的 "Application Submitted"。\n\n接下来，只能交给时间了。',
      },
    ],
  },

  // ════════════════════════════════════════════════════════
  // 随机事件（保留有选择的三个）
  // ════════════════════════════════════════════════════════

  'random_ielts_opportunity': {
    event_id:         'random_ielts_opportunity',
    type:             'random',
    title:            '雅思考位放出',
    available_months: [2, 3, 5, 7, 8, 10, 11],
    forbidden_tags:   ['IELTS_7.5'],  // 改为只有7.5才禁止触发，允许6.0/6.5重考
    weight:           1.2,
    scenes: [
      {
        text: '你在刷手机时偶然看到，下个月初的雅思考试突然放出了几个考位。报名费 2170 元。你心里盘算了一下自己最近的复习状态……',
        tip:  '时间规划：雅思成绩有效期为 2 年。最晚应在申请季当年的暑假结束前考出达标成绩，如果成绩不理想，还来得及在 9-10 月进行二战。',
        choices: [
          {
            text:    '冲了！立刻缴费报名！',
            effects: { Money: -20 },
            flavor_text: '你咬咬牙交了报名费。看着日历上标红的考试日期，你的心跳开始加速，接下来的几周注定是地狱模式。',
            next_event_id: 'ielts_exam_result',
          },
          {
            text:    '先去目标院校官网查查具体要求',
            effects: { Mental_Health: +5 },
            flavor_text: '你没有冲动，而是打开了 UCL 的官网。你发现他们不仅要求总分 7.0，还要求单项不低于 6.5。你决定再沉淀一下。',
            tip:     '绝对不要只听信中介或旁人的说法！必须亲自上目标院校官网查询。文科专业的要求通常比理工科更高。',
          },
        ],
      },
    ],
  },

  'ielts_exam_result': {
    event_id: 'ielts_exam_result',
    type:     'chain',
    title:    '雅思出分日',
    scenes: [
      {
        text: '两周后，一个普通的下午。你收到了一条来自教育部考试中心的短信。你深吸一口气，颤抖着手登录了查分网站……',
      },
      {
        text: '（雅思成绩将在此显示）',
      },
    ],
  },

  'random_study_buddy': {
    event_id:         'random_study_buddy',
    type:             'random',
    title:            '雅思搭子',
    available_months: [1, 2, 3, 4, 6, 7, 8],
    forbidden_tags:   ['IELTS_7.0', 'IELTS_7.5'],
    weight:           1.0,
    scenes: [
      {
        text: '室友推开你的房间门："我最近也在备考雅思，要不要一起？两个人互相监督，听力对答案也方便点。"',
        choices: [
          {
            text:       '好啊，一起去 CB 卷！',
            effects:    { Mental_Health: +8, English_Ability: +3 },
            tags_added: ['Study_Buddy'],
            flavor_text: '从这周开始，你们约定每天一起去图书馆刷题。有了同伴的监督，连枯燥的阅读题都没那么面目可憎了。',
          },
          {
            text:       '谢了，但我习惯一个人按自己的节奏学',
            effects:    { Mental_Health: +3 },
            flavor_text: '室友点点头，没有勉强。你关上房门，戴上降噪耳机。安静和专注，是你目前最需要的东西。',
          },
        ],
      },
    ],
  },

  'random_professor_chat': {
    event_id:         'random_professor_chat',
    type:             'random',
    title:            '教授的橄榄枝',
    available_months: [1, 2, 3, 4, 6, 7, 8, 9],
    forbidden_tags:   [],
    weight:           0.8,
    scenes: [
      {
        text: '下课后，专业课教授叫住了你："你上次那份 Assignment 写得很有深度。我最近有个课题组缺人手，有没有兴趣来帮帮忙？"',
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
            flavor_text: '教授表示理解，并鼓励你继续保持成绩。你错过了一个潜在的科研机会，但也保住了摇摇欲坠的发际线和睡眠时间。',
          },
        ],
      },
    ],
  },

  // ════════════════════════════════════════════════════════
  // 地点事件：SA~SD 专业课楼 (重构版 - 高张力数值平衡)
  // ════════════════════════════════════════════════════════

  'loc_sb_001': {
    event_id: 'loc_sb_001', type: 'location', title: '空调战争',
    scenes: [{
      text: 'SA 楼的空调今天调到了二十度。你穿着短袖冻得发抖，而教授还在台上念着 PPT。',
      choices: [
        {
          text: '靠体温硬抗，死盯投影屏幕上的公式',
          effects: { Physical_Health: -25, Academic_Ability: +8 }
        },
        {
          text: '套上连帽衫，靠在椅背上闭目养神',
          effects: { Physical_Health: +15, Mental_Health: +15, Academic_Ability: -5 },
          flavor_text: '你睡得很暖和。醒来时黑板已经擦干净了。'
        }
      ]
    }]
  },

  'loc_sb_002': {
    event_id: 'loc_sb_002', type: 'location', title: '教授原题',
    scenes: [{
      text: '最后一节复习课，教授指着某道例题顿了一下：“大家要理解它的思路。”隔壁同学已经把题目截图发到了群里。',
      choices: [
        {
          text: '疯狂截图，今晚熬夜背下这道题的每一个步骤',
          effects: { Academic_Ability: +8, Physical_Health: -20, Mental_Health: -20 }
        },
        {
          text: '把群里的截图存进手机，决定先去补个觉',
          effects: { Mental_Health: +15, Academic_Ability: -4 },
          flavor_text: '这张截图在你的相册里躺到了毕业。'
        }
      ]
    }]
  },

  'loc_sb_003': {
    event_id: 'loc_sb_003', type: 'location', title: '小组作业分工',
    scenes: [{
      text: '五人小组会议。沉默了半分钟后，终于有人问：“那……我们怎么分工？”',
      choices: [
        {
          text: '叹口气，主动揽下最难的数据分析部分',
          effects: { Academic_Ability: +8, Mental_Health: -30, Physical_Health: -15 }
        },
        {
          text: '抢先开口，拿走最简单的 Introduction',
          effects: { Mental_Health: +20, Academic_Ability: -6 },
          flavor_text: '你交差了。至于最后的分数，听天由命吧。'
        }
      ]
    }]
  },

  'loc_sb_004': {
    event_id: 'loc_sb_004', type: 'location', title: '课上点名',
    scenes: [{
      text: '教授的目光扫过全场，停在了你身上：“你来回答一下这个问题？”',
      choices: [
        {
          text: '结结巴巴地用散装英语硬编一个答案',
          effects: { English_Ability: +3, Mental_Health: -20, Academic_Ability: +4 },
          flavor_text: '教授帮你纠正了语法，你尴尬得出了一身汗，但记住了这个知识点。'
        },
        {
          text: '坦然低头："Sorry, I have no idea."',
          effects: { Mental_Health: +15, Academic_Ability: -5 }
        }
      ]
    }]
  },

  'loc_sb_005': {
    event_id: 'loc_sb_005', type: 'location', title: 'FYP 导师组会',
    scenes: [{
      text: 'FYP 导师看着你那只有一页纸的进度报告，问：“你自己觉得推进得怎么样？”',
      choices: [
        {
          text: '老实挨训，并记下他给出的修改建议',
          effects: { Mental_Health: -25, Academic_Ability: +8 }
        },
        {
          text: '强行画大饼，承诺下周一定能出初步结果',
          effects: { Mental_Health: +10, Academic_Ability: -8 },
          flavor_text: '导师满意地点头。你走出办公室，意识到自己挖了个填不上的坑。'
        }
      ]
    }]
  },

  'loc_sb_006': {
    event_id: 'loc_sb_006', type: 'location', title: '抖腿的同学',
    scenes: [{
      text: '你左边的同学疯狂抖腿，桌上的水瓶跟着共振。你已经完全听不进课了。',
      choices: [
        {
          text: '戴上降噪耳机，强行把注意力死磕在 PPT 上',
          effects: { Mental_Health: -20, Academic_Ability: +8 }
        },
        {
          text: '默默收拾书包，搬到后排的角落顺便摸鱼',
          effects: { Mental_Health: +20, Academic_Ability: -8 },
          flavor_text: '新座位视野很差，但你刷手机刷得很舒服。'
        }
      ]
    }]
  },

  'loc_sb_007': {
    event_id: 'loc_sb_007', type: 'location', title: '期中重点包',
    scenes: [{
      text: '期中考前夜，课程群里突然有人发了一份 62 页的“期中重点整理 PDF”。',
      choices: [
        {
          text: '花钱去文印室打出来，今晚买杯咖啡死磕这 62 页',
          effects: { Money: -20, Physical_Health: -25, Academic_Ability: +8 }
        },
        {
          text: '点击下载，收藏，告诉自己“待会再看”',
          effects: { Mental_Health: +10, Academic_Ability: -5 },
          flavor_text: '你再也没有打开过这个文件。'
        }
      ]
    }]
  },

  'loc_sb_008': {
    event_id: 'loc_sb_008', type: 'location', title: '“这个不考”',
    scenes: [{
      text: '教授指着 PPT 上一堆复杂的公式说：“This part... you don\'t need to worry about it in the exam.”',
      choices: [
        {
          text: '跟着全班一起松口气，划掉笔记开始回微信',
          effects: { Mental_Health: +15, Academic_Ability: -8 }
        },
        {
          text: '继续听，把这部分复杂的推导过程硬啃下来',
          effects: { Academic_Ability: +8, Mental_Health: -15, English_Ability: +2 },
          flavor_text: '这部分知识后来出现在了研究生的面试题里。'
        }
      ]
    }]
  },

  'loc_sb_009': {
    event_id: 'loc_sb_009', type: 'location', title: '失踪的组员',
    scenes: [{
      text: 'DDL 只剩三天。你们的共享文档里，那个负责核心代码的组员依然毫无动静，群消息已读不回分析。',
      choices: [
        {
          text: '点个外卖通宵，把他的部分也写了',
          effects: { Money: -15, Physical_Health: -30, Academic_Ability: +8 },
          flavor_text: '成绩不错。他在群里发了句“大家辛苦啦！”，你没有回复。'
        },
        {
          text: '只管好自己的部分，剩下的听天由命',
          effects: { Mental_Health: +15, Academic_Ability: -8 }
        }
      ]
    }]
  },

  'loc_sb_010': {
    event_id: 'loc_sb_010', type: 'location', title: '录播泄露答案',
    scenes: [{
      text: '这周的课程录播里，教授忘记切屏，不小心展示了下次作业的参考答案。视频正在群里疯传。',
      choices: [
        {
          text: '赶紧截图，照着抄完交差',
          effects: { Mental_Health: +20, Academic_Ability: -8 }
        },
        {
          text: '写邮件匿名举报，维护学术公平',
          effects: { Mental_Health: -25, Academic_Ability: +6 },
          flavor_text: '录播被删了。你在群里被骂了三天，但你自己把题做出来了。'
        }
      ]
    }]
  },

  'loc_sb_011': {
    event_id: 'loc_sb_011', type: 'location', title: '早八的 SA 电梯',
    scenes: [{
      text: '早上 8:55。SA 一楼的电梯前排了二十多米长的队，而你的专业课在五楼，教授以“准点点名”著称。',
      choices: [
        {
          text: '咬牙冲进楼梯间，一口气爬上五楼',
          effects: { Physical_Health: -25, Mental_Health: -15, Academic_Ability: +5 },
          flavor_text: '你踩着铃声瘫坐在座位上，肺里全是血腥味，但你拿到了出勤分。'
        },
        {
          text: '佛系排队，顺便去一楼全家买个肉包子边吃边等',
          effects: { Money: -15, Mental_Health: +20, Academic_Ability: -5 }
        }
      ]
    }]
  },

  'loc_sb_012': {
    event_id: 'loc_sb_012', type: 'location', title: '玄学示波器',
    scenes: [{
      text: '物理实验课。你这台示波器跳出的波形像是在跳街舞，完全不符合理论预期。TA（助教）正在指导另一组，看起来半小时内没空理你。',
      choices: [
        {
          text: '拍两下机器，强行凑几组看起来“合理”的数据填进报告',
          effects: { Mental_Health: +20, Academic_Ability: -8 },
          flavor_text: '报告顺利提交。期末考到这道实验题时，你对着卷子发了十分钟的呆。'
        },
        {
          text: '举手死等 TA，用英语磕磕绊绊地解释故障，重做一遍',
          effects: { Physical_Health: -15, English_Ability: +3, Academic_Ability: +6 }
        }
      ]
    }]
  },

  'loc_sb_013': {
    event_id: 'loc_sb_013', type: 'location', title: '黑板上的负号',
    scenes: [{
      text: '教授在黑板上推导了一个占据半面墙的复杂公式。但你非常确定，他在第三步漏写了一个负号，导致后面的结果全错了。',
      choices: [
        {
          text: '举手打断，用英语指出他的错误',
          effects: { Mental_Health: -20, English_Ability: +3, Academic_Ability: +4 },
          flavor_text: '全班的目光刺得你发毛。教授愣了一下，说“Good catch”，并在你的平时分表上画了个勾。'
        },
        {
          text: '保持沉默，只在自己的笔记上默默把负号补上',
          effects: { Mental_Health: +10, Academic_Ability: -4 }
        }
      ]
    }]
  },

  'loc_sb_014': {
    event_id: 'loc_sb_014', type: 'location', title: '59 分的 Office Hours',
    scenes: [{
      text: '期中成绩出了，你考了 59 分（在英制评分中，差 1 分及格/升档）。你现在正站在教授办公室的门外。',
      choices: [
        {
          text: '敲门进去，用毕生所学的英语词汇强行 argue 这 1 分',
          effects: { Mental_Health: -30, English_Ability: +3, Academic_Ability: +6 },
          flavor_text: '你扯了十五分钟。教授被你烦得不行，在卷子上找了个步骤分给你加上了。'
        },
        {
          text: '在门口站了三分钟，叹了口气，转身回宿舍',
          effects: { Mental_Health: +10, Academic_Ability: -5 }
        }
      ]
    }]
  },

  'loc_sb_015': {
    event_id: 'loc_sb_015', type: 'location', title: '软件授权到期',
    scenes: [{
      text: '晚上十一点的 SA 机房。你刚准备导出期末项目，弹窗提示：“MATLAB 学生试用版已过期”。',
      choices: [
        {
          text: '掏出银行卡，当场买下一个月的正版授权',
          effects: { Money: -30, Academic_Ability: +6 }
        },
        {
          text: '打开论坛和网盘，通宵寻找并安装破解版',
          effects: { Physical_Health: -25, Mental_Health: -15, Academic_Ability: +4 },
          flavor_text: '凌晨三点，你终于装好了。顺便还附赠了一个关不掉的流氓弹窗。'
        }
      ]
    }]
  },

  'loc_sb_016': {
    event_id: 'loc_sb_016', type: 'location', title: '大神的施舍',
    scenes: [{
      text: '你运气爆棚，和系里均分 4.0 的“大神”分到了一组。刚建完群，大神就发来文件压缩包：“我都做完了，你们挂个名就行。”',
      choices: [
        {
          text: '回复“谢谢义父！”，然后打开游戏',
          effects: { Mental_Health: +30, Academic_Ability: -8 },
          flavor_text: '这门课你拿了 A。但你完全不知道这个项目是用什么语言写的。'
        },
        {
          text: '硬着头皮点开大神的源码，一行行看，不懂就去群里问他',
          effects: { Mental_Health: -20, Academic_Ability: +8 }
        }
      ]
    }]
  },

  'loc_sb_017': {
    event_id: 'loc_sb_017', type: 'location', title: 'Pre 上的死寂',
    scenes: [{
      text: '小组 Presentation 现场。轮到你的室友发言时，他看着台下的外教，大脑突然宕机，拿着提示卡的手在抖。死寂已经持续了十秒。',
      choices: [
        {
          text: '走过去拍拍他的肩膀，接管他的麦克风替他讲完',
          effects: { Mental_Health: -25, English_Ability: +3, Academic_Ability: +4 },
          flavor_text: '你们组的分数保住了。但他下台后整整一天没跟你说话。'
        },
        {
          text: '站在旁边用眼神鼓励他，陪他一起罚站',
          effects: { Mental_Health: +10, Academic_Ability: -8 }
        }
      ]
    }]
  },

  'loc_sb_018': {
    event_id: 'loc_sb_018', type: 'location', title: '生理极限',
    scenes: [{
      text: '两小时连排课的第二节。你的肚子发出了一声巨大的轰鸣，连前排的同学都回头看了你一眼。你饿得有些低血糖了。',
      choices: [
        {
          text: '从后门溜出去，去自动贩卖机买个面包',
          effects: { Money: -15, Physical_Health: +15, Academic_Ability: -8 },
          flavor_text: '你啃着面包回来时，黑板上已经多出了三个你看不懂的推懂公式。'
        },
        {
          text: '灌下半瓶凉水强行压制胃酸，继续死盯 PPT',
          effects: { Physical_Health: -30, Mental_Health: -15, Academic_Ability: +8 }
        }
      ]
    }]
  },

  // ════════════════════════════════════════════════════════
  // 地点事件：CB 图书馆
  // ════════════════════════════════════════════════════════

  'loc_cb_ielts_mock': {
    event_id: 'loc_cb_ielts_mock', type: 'location', title: '雅思模拟题',
    scenes: [{
      text: '你在图书馆做剑桥雅思模拟题。旁边的人一直在疯狂抖腿，还时不时发出啧啧声，严重干扰你的听力部分。',
      choices: [
        {
          text: '戴上降噪耳机，强行专注',
          effects: { English_Ability: +5, Mental_Health: -12 },
          flavor_text: '你屏蔽了外界干扰，完成了一套极难的试卷。英语水平有所提升，但心情非常烦躁。',
        },
        {
          text: '拍桌子让他安静',
          effects: { Mental_Health: +8, English_Ability: -2 },
          flavor_text: '你大声斥责了他，他灰溜溜地走了。你觉得非常解气，但接下来的时间你都在回味刚才的争吵，一个字也没看进去。',
        },
      ],
    }],
  },

  'loc_cb_seat_war': {
    event_id: 'loc_cb_seat_war', type: 'location', title: '占座风波',
    scenes: [{
      text: '期末周的图书馆一座难求。你发现一个座位上只放了一包干瘪的纸巾，显然已经很久没人了。',
      choices: [
        {
          text: '把纸巾推开，直接坐下学',
          effects: { Academic_Ability: +8, Mental_Health: -10 },
          flavor_text: '你学了两个小时后，纸巾的主人回来了并冷嘲热讽。你硬着头皮没理他，但心里一阵添堵。',
        },
        {
          text: '算了，去便利店买杯咖啡再找地方',
          effects: { Money: -8, Mental_Health: +8, English_Ability: +3 },
          flavor_text: '你花钱买了一杯咖啡，找到了一个安静的角落坐下。钱花了，但状态出奇地好。',
        },
      ],
    }],
  },

  'loc_cb_couple': {
    event_id: 'loc_cb_couple', type: 'location', title: '情侣的噪音',
    scenes: [{
      text: '一对情侣坐在你对面，一边看书一边互相喂零食，还发出咯咯的笑声。你正在做雅思阅读计时练习。',
      choices: [
        {
          text: '怒视他们，用眼神警告',
          effects: { Mental_Health: +8, English_Ability: -2 },
          flavor_text: '你的眼神攻势只持续了三秒，他们完全没理你。你气不打一处来，完全没法专注了。',
        },
        {
          text: '换个地方，买副耳机',
          effects: { Money: -20, English_Ability: +5, Mental_Health: +5 },
          flavor_text: '你果断换了位置，买了副降噪耳机。从此世界清净了，英语水平也稳步提升。',
        },
      ],
    }],
  },

  'loc_cb_close_time': {
    event_id: 'loc_cb_close_time', type: 'location', title: '闭馆音乐',
    scenes: [{
      text: '晚上十点，图书馆响起了萨克斯名曲《回家》。但你的雅思作文还差最后一段没写完。',
      choices: [
        {
          text: '无视保安，死皮赖脸写完',
          effects: { English_Ability: +5, Mental_Health: -8 },
          flavor_text: '你在保安催促的眼神下写完了最后一段。质量一般，但你坚持下来了。',
        },
        {
          text: '收拾书包，明天再说',
          effects: { Physical_Health: +8, English_Ability: -2 },
          flavor_text: '你顺从地离开了。走在回宿舍的路上，夜风还挺凉爽。那段作文……明天再说吧。',
        },
      ],
    }],
  },

  'loc_cb_lost_found': {
    event_id: 'loc_cb_lost_found', type: 'location', title: '遗落的秘籍',
    scenes: [{
      text: '你在书架缝隙里捡到一本学长遗落的《雅思口语当季题库》，里面密密麻麻写满了高分素材。',
      choices: [
        {
          text: '据为己有，疯狂背诵',
          effects: { English_Ability: +5, Mental_Health: -8 },
          flavor_text: '你如获至宝地把它塞进了书包。背诵的过程很痛苦，但你感觉口语素材库充实了不少。',
        },
        {
          text: '交到失物招领处',
          effects: { Mental_Health: +12, Academic_Ability: +5 },
          flavor_text: '你把书交了上去。心情异常轻松，仿佛做了一件很正确的事，下午的状态也出奇地好。',
        },
      ],
    }],
  },

  // ════════════════════════════════════════════════════════
  // 地点事件：PB 公共楼
  // ════════════════════════════════════════════════════════

  'loc_pb_foreigner': {
    event_id: 'loc_pb_foreigner', type: 'location', title: '走廊偶遇',
    scenes: [{
      text: '在 PB 走廊等电梯时，一位你不认识的外籍教师主动和你打招呼，问你是哪个专业的。',
      choices: [
        {
          text: '礼貌回应，用英语聊了几句',
          effects: { English_Ability: +4, Mental_Health: +8 },
          flavor_text: '你们聊了大约五分钟。他给你推荐了一篇他刚发表的论文，说对你的方向很有参考价值。这种意外的交流让你心情不错。',
        },
        {
          text: '点点头，低头看手机',
          effects: { Mental_Health: -5 },
          flavor_text: '你尴尬地回避了对话。电梯门关上后，你有点后悔——那好像是一个不错的聊天机会。',
        },
      ],
    }],
  },

  'loc_pb_gossip': {
    event_id: 'loc_pb_gossip', type: 'location', title: '申研焦虑传播',
    scenes: [{
      text: '你在 PB 便利店排队时，听到前面两个人在讨论："听说今年 UCL 计算机线又涨了，均分 85 都被拒了。"',
      choices: [
        {
          text: '偷听细节，疯狂对标自己',
          effects: { Mental_Health: -18, Academic_Ability: +5 },
          flavor_text: '你把他们的对话记在了手机备忘录里。回宿舍后越想越焦虑，但也因此多看了两个小时专业课。',
        },
        {
          text: '戴上耳机，拒绝制造焦虑',
          effects: { Mental_Health: +12 },
          flavor_text: '你果断打开了音乐。道听途说的信息往往失真，你没必要为了一句话乱了自己的节奏。',
        },
      ],
    }],
  },

  'loc_pb_convenience': {
    event_id: 'loc_pb_convenience', type: 'location', title: '便利店',
    scenes: [{
      text: '你路过 PB 便利店，肚子刚好有点饿。货架上摆着热乎乎的关东煮和刚到货的进口零食。',
      choices: [
        {
          text: '买一份关东煮，好好吃顿饭',
          effects: { Physical_Health: +8, Money: -8 },
          flavor_text: '热乎乎的关东煮让你整个人暖和了不少。有时候，一顿好饭比什么都重要。',
        },
        {
          text: '忍住，回宿舍吃泡面省钱',
          effects: { Money: +5, Physical_Health: -5 },
          flavor_text: '你成功抵制了消费欲望，省下了这笔钱。泡面的味道依然是申研期间最熟悉的味道。',
        },
      ],
    }],
  },

  'loc_pb_cross_major': {
    event_id: 'loc_pb_cross_major', type: 'location', title: '跨专业搭话',
    scenes: [{
      text: '在 PB 的公共座位区，一个 IBSS 的同学看到你在写东西，凑过来问："你们 SAT 的申研是不是特别卷？我们商科感觉还好。"',
      choices: [
        {
          text: '聊开了，互相分享申研经验',
          effects: { Mental_Health: +12, English_Ability: +3 },
          flavor_text: '你们聊了将近一个小时。你第一次了解到商科申研的逻辑，对方也对计算机方向的竞争烈度表示震惊。意外地收获了一些新视角。',
        },
        {
          text: '敷衍几句，继续低头写东西',
          effects: { Mental_Health: -8 },
          flavor_text: '你礼貌但冷淡地结束了对话。有点不近人情，但你确实没有时间。',
        },
      ],
    }],
  },

  'loc_pb_professor_hallway': {
    event_id: 'loc_pb_professor_hallway', type: 'location', title: '走廊遇见教授',
    scenes: [{
      text: '你在 PB 走廊遇见了你的专业课教授。他看起来很闲，正在看手机。你知道期末考试就在下个月。',
      choices: [
        {
          text: '主动打招呼，顺便套话考试重点',
          effects: { Academic_Ability: +5, Mental_Health: -10 },
          flavor_text: '教授友善地和你聊了几句，但在"考试重点"这个问题上笑而不语。你没套到任何有用的信息，但教授好像对你印象深了一些。',
        },
        {
          text: '装作没看见，低头快走',
          effects: { Mental_Health: +5 },
          flavor_text: '你成功假装没看见。有时候，保持距离是最轻松的选择。',
        },
      ],
    }],
  },

  // ════════════════════════════════════════════════════════
  // 地点事件：IR 科研中心
  // ════════════════════════════════════════════════════════

  'loc_ir_data_clean': {
    event_id: 'loc_ir_data_clean', type: 'location', title: '廉价劳动力',
    scenes: [{
      text: '教授丢给你一个包含十万条脏数据的 Excel 表格，让你周末前清理干净。这活毫无技术含量，纯粹是体力劳动。',
      choices: [
        {
          text: '老老实实当黑工',
          effects: { Mental_Health: -18, Physical_Health: -10 },
          flavor_text: '你点鼠标点到手抽筋。虽然没学到什么新知识，但教授对你的服从性非常满意——这也许对要推荐信有帮助。',
        },
        {
          text: '花钱买个脚本自动处理',
          effects: { Money: -12, Mental_Health: +8 },
          flavor_text: '你在网上找人写了个自动化脚本，五分钟搞定。你用省下的时间看了一部电影，良心很平静。',
        },
      ],
    }],
  },

  'loc_ir_professor_meeting': {
    event_id: 'loc_ir_professor_meeting', type: 'location', title: '组会拷问',
    scenes: [{
      text: '在周度组会上，教授突然点名让你汇报最近阅读的文献。你其实只看了个摘要。',
      choices: [
        {
          text: '硬着头皮瞎编',
          effects: { Mental_Health: -22, Academic_Ability: -5 },
          flavor_text: '教授一眼看穿了你的窘迫，当着全组的面把你批评了一顿。你恨不得找个地缝钻进去。',
        },
        {
          text: '坦诚道歉，保证下次补上',
          effects: { Mental_Health: -10, Academic_Ability: +5 },
          flavor_text: '你诚恳地承认了错误。教授虽然不悦，但没有过多刁难。你暗下决心今晚回去把文献读完。',
        },
      ],
    }],
  },

  'loc_ir_paper_publish': {
    event_id: 'loc_ir_paper_publish', type: 'location', title: '论文署名',
    scenes: [{
      text: '课题组准备投一篇顶级会议论文。教授暗示你，如果愿意包揽所有繁琐的排版和校对工作，可以给你挂个四作。',
      choices: [
        {
          text: '接下苦差事！为了简历！',
          effects: { Academic_Ability: +10, Physical_Health: -18, Mental_Health: -8 },
          flavor_text: '你连续熬了三个通宵做完了排版和校对。论文投出去了，你的名字在最后。简历上多了一行，但身体亮起了红灯。',
        },
        {
          text: '太累了，婉拒',
          effects: { Physical_Health: +12, Academic_Ability: -8 },
          flavor_text: '你礼貌地婉拒了。教授有些失望，但没有强迫。你保住了睡眠，但错过了一个简历加分项。',
        },
      ],
    }],
  },

  'loc_ir_equipment_booking': {
    event_id: 'loc_ir_equipment_booking', type: 'location', title: '抢占仪器',
    scenes: [{
      text: '实验室的高精度设备这周只剩下一个深夜时段可以预约了，而你明天早上还有早八的课。',
      choices: [
        {
          text: '预约！大不了通宵',
          effects: { Academic_Ability: +8, Physical_Health: -18 },
          flavor_text: '你预约了凌晨的时段，通宵跑完了实验。数据很好，但你在早八课上直接睡死了。',
        },
        {
          text: '放弃，等下周再做',
          effects: { Mental_Health: +8, Academic_Ability: -8 },
          flavor_text: '你选择了睡眠。下周再约吧，实验进度会慢一些，但人还在。',
        },
      ],
    }],
  },

  // ════════════════════════════════════════════════════════
  // 地点事件：GYM 健身房
  // ════════════════════════════════════════════════════════

  'loc_gym_heavy_lift': {
    event_id: 'loc_gym_heavy_lift', type: 'location', title: '极限重量',
    scenes: [{
      text: '你在健身房挑战深蹲个人极限。还差最后一下，但你的腿已经开始发抖了。',
      choices: [
        {
          text: '咬牙硬蹲！',
          effects: { Physical_Health: +18, Mental_Health: +12, Academic_Ability: -8 },
          flavor_text: '你成功突破了极限！多巴胺疯狂分泌，你感觉自己无所不能，但接下来的三天你连楼梯都下不了。',
        },
        {
          text: '安全第一，放弃',
          effects: { Physical_Health: +8, Mental_Health: -5 },
          flavor_text: '你把杠铃放回了架子上。虽然没受伤，但隐隐有些挫败感。',
        },
      ],
    }],
  },

  'loc_gym_yoga': {
    event_id: 'loc_gym_yoga', type: 'location', title: '冥想与拉伸',
    scenes: [{
      text: '你报了一节瑜伽课。教练让你闭上眼睛，清空大脑里所有的 DDL 和雅思单词。',
      choices: [
        {
          text: '彻底放空自己',
          effects: { Mental_Health: +20, Physical_Health: +12, Money: -10 },
          flavor_text: '伴随着舒缓的音乐，你感受到了久违的宁静。这钱花得值。',
        },
        {
          text: '闭着眼睛偷偷背单词',
          effects: { English_Ability: +3, Mental_Health: -12 },
          flavor_text: '即便在瑜伽垫上，你的大脑依然在高速运转。你记住了几个词根，但下课后感觉比上课前还累。',
        },
      ],
    }],
  },

  'loc_gym_treadmill_race': {
    event_id: 'loc_gym_treadmill_race', type: 'location', title: '暗中较劲',
    scenes: [{
      text: '你旁边跑步机上的人突然调高了速度。男人的胜负欲让你也不自觉地按下了加速键。',
      choices: [
        {
          text: '跑赢他！冲刺！',
          effects: { Physical_Health: +15, Mental_Health: +8, Academic_Ability: -8 },
          flavor_text: '你跑赢了。对方默默调低了速度。你擦着汗走出健身房，步伐比平时轻快了很多。',
        },
        {
          text: '认怂，保持自己的配速',
          effects: { Physical_Health: +8, Mental_Health: -5 },
          flavor_text: '你没有上头。成熟的人知道，不是每场较劲都值得参与。',
        },
      ],
    }],
  },

  'loc_gym_protein_shake': {
    event_id: 'loc_gym_protein_shake', type: 'location', title: '蛋白粉推销',
    scenes: [{
      text: '练完后肌肉酸痛。前台向你推销一款进口高级分离乳清蛋白粉，说能加速恢复，但价格不菲。',
      choices: [
        {
          text: '买！身体是革命的本钱',
          effects: { Money: -18, Physical_Health: +12 },
          flavor_text: '你咬牙买下了。蛋白粉的味道还不错，恢复速度确实快了一些。',
        },
        {
          text: '太贵了，回去吃两个鸡蛋',
          effects: { Money: +8, Physical_Health: +3 },
          flavor_text: '你礼貌拒绝了推销。食堂的水煮蛋同样含有蛋白质，效果慢一点但便宜实惠。',
        },
      ],
    }],
  },

  // ════════════════════════════════════════════════════════
  // 地点事件：宿舍
  // ════════════════════════════════════════════════════════

  'loc_dorm_sleep': {
    event_id: 'loc_dorm_sleep', type: 'location', title: '躺平一天',
    scenes: [{
      text: '外面狂风暴雨，你躺在温暖的被窝里，听着雨声。你现在什么都不想干，也不需要做任何选择。',
      choices: [
        {
          text: '就这样躺平',
          effects: { Mental_Health: +20, Physical_Health: +15, Academic_Ability: -8 },
          flavor_text: '你睡了整整十二个小时。身体和心灵都得到了修复，代价是今天的学习进度彻底停摆了。',
        },
      ],
    }],
  },

  'loc_dorm_gaming': {
    event_id: 'loc_dorm_gaming', type: 'location', title: '罪恶的连败',
    scenes: [{
      text: '晚上十点，你打开游戏准备"只玩一把就睡"。结果遭遇了史诗级的三连败，队友的嘲讽让你血压飙升。',
      choices: [
        {
          text: '怒开下一把，赢了才睡！',
          effects: { Mental_Health: -22, Physical_Health: -18, Academic_Ability: -8 },
          flavor_text: '你一直打到天亮，最终以七连败结束了战斗。你不仅没复习，还感觉身体被掏空。',
        },
        {
          text: '强行关机，深呼吸睡觉',
          effects: { Mental_Health: +8, Physical_Health: +12 },
          flavor_text: '你凭借极强的自制力按下了电源键。虽然带着不甘入睡，但第二天醒来时，你庆幸自己做出了正确的决定。',
        },
      ],
    }],
  },

  'loc_dorm_takeaway': {
    event_id: 'loc_dorm_takeaway', type: 'location', title: '外卖失窃',
    scenes: [{
      text: '你在宿舍楼下等了半个小时，发现自己点的外卖被别人拿走了。',
      choices: [
        {
          text: '气炸了，联系客服追责',
          effects: { Mental_Health: -18, Money: +8 },
          flavor_text: '你花了一个小时和客服扯皮，最终拿到了退款。钱是回来了，但心情彻底坏掉了。',
        },
        {
          text: '自认倒霉，泡碗面吃',
          effects: { Physical_Health: -8, Mental_Health: -8 },
          flavor_text: '你默默回宿舍泡了碗面。食物不好，心情也不好，但至少省了力气。',
        },
      ],
    }],
  },

  'loc_dorm_noise': {
    event_id: 'loc_dorm_noise', type: 'location', title: '楼上的蹦迪',
    scenes: [{
      text: '凌晨一点，楼上的宿舍突然开始大声放音乐，甚至还有人在跳绳。你明天还要早起去上课。',
      choices: [
        {
          text: '上去敲门对线',
          effects: { Mental_Health: -12, English_Ability: +3 },
          flavor_text: '你上去交涉，对方是一群外国留学生，完全没有意识到这么吵。你用英语沟通了五分钟，他们道歉并关小了音乐。意外练了口语。',
        },
        {
          text: '戴上耳塞强行睡觉',
          effects: { Physical_Health: -8, Mental_Health: -5 },
          flavor_text: '你选择了最省事的方式。耳塞隔音效果一般，你睡得很浅，第二天精神萎靡。',
        },
      ],
    }],
  },

  'loc_dorm_study_buddy': {
    event_id: 'loc_dorm_study_buddy', type: 'location', title: '意外的学习搭子',
    scenes: [{
      text: '你本来打算躺着刷手机，结果室友把专业书摊在桌上说："一起卷吧，我要看到凌晨两点。"\n\n你们就这样无声地并排学了起来。',
      choices: [
        {
          text: '跟上节奏，一起卷',
          effects: { Academic_Ability: +8, English_Ability: +3, Mental_Health: +8 },
          flavor_text: '有人陪着的自习效率出奇地高。你们谁也没说话，但书页翻动的声音让人觉得踏实。',
        },
      ],
    }],
  },

  'loc_dorm_insomnia': {
    event_id: 'loc_dorm_insomnia', type: 'location', title: '失眠',
    scenes: [{
      text: '你躺在床上盯着天花板。脑子里转的都是：雅思还没考、GPA 够不够、中介靠不靠谱……越想越睡不着。',
      choices: [
        {
          text: '起来背单词，反正睡不着',
          effects: { English_Ability: +3, Physical_Health: -12, Mental_Health: -8 },
          flavor_text: '你背了两个小时单词，天快亮了才迷迷糊糊睡过去。单词记住了一些，但身体状态很差。',
        },
        {
          text: '强迫自己闭眼，什么都不想',
          effects: { Physical_Health: -12, Mental_Health: -15 },
          flavor_text: '你什么都没做，就这样焦虑地躺到了天亮。这是最坏的结果——既没有休息，也没有做任何事情。',
        },
      ],
    }],
  },

};