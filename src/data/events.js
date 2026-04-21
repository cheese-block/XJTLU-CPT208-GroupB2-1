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
    title:    '延毕之灵',
    scenes: [
      {
        text: '“你就是这届新来的卷王吗？”\n\n（一个眼袋发黑的半透明学长飘在你的床头。）',
        choices: [
          { text: '（点头）' }
        ]
      },
      {
        text: '“所以你就是那个每天六点霸占自习室，硬生生拉高专业均分，最后害我没学上的家伙？”',
        choices: [
          { text: '（无动于衷）' }
        ]
      },
      {
        text: '“好吧……你现在接手这个烂摊子了，祝你好运。这学校里的人都卷疯了，你会见识到的。”',
        choices: [
          { text: '什么？' }
        ]
      },
      {
        text: '“为了让你的头发在脑袋上多留一阵子，尽力保持顶上那几股数值的平衡吧。不要归零，也别试图彻底塞满它们，走极端只会引来毁灭。”',
        choices: [
          { text: '那我该怎么做抉择？' }
        ]
      },
      {
        text: '“当你手握选项时，你会看到那些浮动的圆点。直觉会指引你……\n\n现在就做个决定吧：桌上这杯过期三天的冰美式，你要喝掉提神吗？”',
        tip:  '鼠标悬浮选项即可查看圆点。灰色代表将有变化，圆点内容预示变动幅度。',
        choices: [
          {
            text: '闭着眼睛灌下去',
            effects: { Physical_Health: -10, Academic_Ability: +5 },
            flavor_text: '（心脏狂跳。这玩意儿简直是毒药，但你感觉现在能解开微积分大题了。）'
          },
          {
            text: '稳妥起见，倒进下水道',
            effects: { Mental_Health: -5 },
            flavor_text: '（白白倒掉咖啡让你感到一丝浪费的愧疚，但至少保住了肠胃。）'
          }
        ]
      },
      {
        text: '（延毕之灵若有所思地看着你，然后慢慢飘散了。）\n\n你背上书包，推开了宿舍的门。',
        choices: [
          { text: '进入申请季' }
        ]
      }
    ],
  },

  'tutorial_intro_2': {
    event_id: 'tutorial_intro_2',
    type:     'chain',
    title:    '幽魂再临',
    scenes: [
      {
        text: '“你就是这届新来的卷王吗？”\n\n（半透明的学长再次飘在你的床头。）',
        choices: [
          { text: '又来了……' }
        ]
      },
      {
        text: '“哈哈，玩笑而已。我知道我们都已经经历过一遍了。这就是申请季的诅咒，明白吗？”',
        choices: [
          { text: '（保持沉默）' }
        ]
      },
      {
        text: '“我们会记住这所学校的每一届学生，记住他们每一次因为绩点的妥协，每一次因为雅思的崩溃，久不忘怀……”',
        choices: [
          { text: '何意味……' },
          { text: '怎么做到的……' }
        ]
      },
      {
        text: '“据说只有传说中『保录中介』才能让我们愉快地花钱免除这些受诅咒的劳役，但是他们当真存在吗？”',
        choices: [
          { 
            text: '不，捷径并不存在。',
            flavor_text: '“这是个有意思的实证主义说法。尽管我也希望能被花钱捞一把。'
          },
          { 
            text: '他们或许真的存在。',
            flavor_text: '“有趣的想法。或许捷径真的存在，或许我们会受到折磨不过是因为信息差。'
          }
        ]
      },
      {
        text: '“再去碰碰运气吧，试着别死那么早。”',
        choices: [
          { 
            text: '（面对现实）',
            flavor_text: '（幽灵慢悠悠地飘散而去……）'
          }
        ]
      }
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
  // 地点事件：SA~SD 专业课楼 (解耦“波动类”数值和“积累类”数值)
  // ════════════════════════════════════════════════════════

  'loc_sb_001': {
    event_id: 'loc_sb_001', type: 'location', title: '蓝屏的制裁',
    scenes: [{
      text: '你在 SD 楼的机房跑了一下午的数据。进度条到 99% 时，电脑风扇发出一声惨叫，屏幕变成了纯粹之蓝。不幸的是你没按过保存。',
      choices: [
        {
          text: '不接受现实，盯着蓝屏发呆',
          effects: { Mental_Health: -15, Academic_Ability: -2 }
        },
        {
          text: '事已至此，先吃饭吧',
          effects: { Money: -10, Mental_Health: -5 }
        }
      ]
    }]
  },

  'loc_sb_002': {
    event_id: 'loc_sb_002', type: 'location', title: '完美的实验数据',
    scenes: [{
      text: '物理实验课上，你们组随便测了一次，数据点竟然完美贴合了理论曲线。连教授路过都点了点头。',
      choices: [
        {
          text: '就这样吧，提前一小时下课去打游戏',
          effects: { Mental_Health: +20, Academic_Ability: +3 }
        },
        {
          text: '觉得这数据好得不真实，坚持换个仪器重测',
          effects: { Academic_Ability: +7, Mental_Health: -10 },
          flavor_text: '第二组数据烂得像一坨泥。你完全不能理解发生了什么。'
        }
      ]
    }]
  },

  'loc_sb_003': {
    event_id: 'loc_sb_003', type: 'location', title: '留学生的问路',
    scenes: [{
      text: '一个看起来很着急的留学生在 SA 楼梯口拦住你：“Excuse me, do you know where the lab SA214 is?”',
      choices: [
        {
          text: '热情待人，亲自带他上楼，顺带聊了聊',
          effects: { English_Ability: +3, Physical_Health: -5 }
        },
        {
          text: '比划了一通："Go straight, then turn left."',
          effects: { English_Ability: +1 }
        }
      ]
    }]
  },

  'loc_sb_004': {
    event_id: 'loc_sb_004', type: 'location', title: '讲座后排的披萨',
    scenes: [{
      text: 'SD 楼有一场冗长的学术讲座。你完全听不懂台上的老师在讲什么，但教室后排摆着三大盒免费的山姆零食。',
      choices: [
        {
          text: '溜到后排偷吃零食，血糖过山车后放弃理解讲座内容，开始低头刷手机',
          effects: { Money: +10, Mental_Health: +10, Physical_Health: -10, Academic_Ability: -3 }
        },
        {
          text: '强打精神，尝试理解讲座内容',
          effects: { Academic_Ability: +7, English_Ability: +2, Mental_Health: -10 },
          flavor_text: '讲座老师开始重新组织自己的语言，也许是因为注意到了你呆滞的表情'
        }
      ]
    }]
  },

  'loc_sb_005': {
    event_id: 'loc_sb_005', type: 'location', title: '降噪耳机的背叛',
    scenes: [{
      text: '自习室里，你旁边的哥们正在用青轴机械键盘疯狂输出。就在这时，你的降噪耳机在播报“Battery Low”后彻底关机。',
      choices: [
        {
          text: '靠意志力硬抗青轴的物理超度',
          effects: { Mental_Health: -25, Academic_Ability: +4 }
        },
        {
          text: '去星巴克点杯美式接着学',
          effects: { Money: -30, Mental_Health: +15, Academic_Ability: +7 }
        }
      ]
    }]
  },

  'loc_sb_006': {
    event_id: 'loc_sb_006', type: 'location', title: 'TA 的灵魂拷问',
    scenes: [{
      text: 'Tutorial 课上，外籍 TA 指着你作业里的一段奇葩代码问：“Why did you use this function here?”',
      choices: [
        {
          text: '诚实低头："I copied it from StackOverflow."',
          effects: { Mental_Health: +10, Academic_Ability: -3 },
          flavor_text: 'TA 叹了口气，放过了你。'
        },
        {
          text: '强行现编一段听起来很高级的技术原理解释',
          effects: { English_Ability: +2, Mental_Health: -15, Academic_Ability: +4 }
        }
      ]
    }]
  },

  'loc_sb_007': {
    event_id: 'loc_sb_007', type: 'location', title: '消失的雨伞',
    scenes: [{
      text: '晚课结束，外面下起了暴雨。你放在 SA 一楼伞架上的透明雨伞不见了，而旁边放着一把不知道是谁的黑伞。',
      choices: [
        {
          text: '顺走那把黑伞，撑回宿舍',
          effects: { Mental_Health: -10, Physical_Health: +10 },
          flavor_text: '人不犯我我不犯人，要怪，就怪这乱世吧。'
        },
        {
          text: '认命了，把书包顶在头上冲进暴雨里',
          effects: { Physical_Health: -25, Mental_Health: +10, Money: -5 },
          flavor_text: '你在雨中狂奔，突然觉得这种电影主角般的悲惨经历还挺解压的。'
        }
      ]
    }]
  },

  'loc_sb_008': {
    event_id: 'loc_sb_008', type: 'location', title: '迟到的签到表',
    scenes: [{
      text: '你睡过了头，迟到了整整五十分钟。当你从后门溜进教室时，发现教授正在前排传阅一张签到表。你有点紧张，不想有一丝在两百人面前被老师训斥的可能。',
      choices: [
        {
          text: '弯着腰像特工一样潜行到前排去签字',
          effects: { Mental_Health: -15, Academic_Ability: +3 },
          flavor_text: '很多学生看到了你奇异搞笑的行为。'
        },
        {
          text: '摆烂放弃签到，坐在最后一排开始补觉',
          effects: { Mental_Health: +10, Physical_Health: +10, Academic_Ability: -4 },
          flavor_text: '“就当我没来上课吧。”'
        }
      ]
    }]
  },

  'loc_sb_009': {
    event_id: 'loc_sb_009', type: 'location', title: '自动贩卖机的嘲讽',
    scenes: [{
      text: '你在 SD 楼一楼的自动贩卖机买罐装百事可乐。扫码，付款，机械臂动了一下，然后卡住了。你的可乐悬停在半空中。',
      choices: [
        {
          text: '左右观察无人，对着机器狠狠踹了一脚',
          effects: { Physical_Health: -5, Mental_Health: +15 },
          flavor_text: '可乐没掉下来，而你的脚趾隐隐作痛。但至少你的郁闷减轻了一些。'
        },
        {
          text: '不信邪，再买一瓶，试图用第二瓶把第一瓶砸下来',
          effects: { Money: -15, Mental_Health: -20 },
          flavor_text: '现在有两瓶可乐卡在半空中。'
        }
      ]
    }]
  },

  'loc_sb_010': {
    event_id: 'loc_sb_010', type: 'location', title: '祖传复习资料',
    scenes: [{
      text: '一个大四的学长在群里兜售某门地狱级专业课的“祖传复习大礼包”，包含历年卷、重点批注和往届高分作业，标价 150 元。',
      choices: [
        {
          text: '咬牙转账',
          effects: { Money: -15, Academic_Ability: +9 }
        },
        {
          text: '决定靠自己啃 PPT',
          effects: { Mental_Health: -15, Academic_Ability: +4 },
          flavor_text: '你花了一整晚自己整理重点，虽然学到了一点，但总觉得别人在走捷径，越想越气。'
        }
      ]
    }]
  },

  'loc_sb_011': {
    event_id: 'loc_sb_011', type: 'location', title: '致命的查重率',
    scenes: [{
      text: '距离作业提交（DDL）还有两小时。你把写好的 Essay 传到 Turnitin 上查重，屏幕上赫然跳出一个红色的数字：45% Similarity。',
      choices: [
        {
          text: '用同义词替换大法把每一句话都改得面目全非',
          effects: { Mental_Health: -15, Academic_Ability: +4, English_Ability: +2 },
          flavor_text: '查重率降到了 15%。但你交上去的已经不是一篇论文，而是一堆毫无逻辑的单词拼盘。'
        },
        {
          text: '花钱开一个 AI 降重软件的高级会员',
          effects: { Money: -15, Mental_Health: +10, Academic_Ability: -2, English_Ability: -1 }
        }
      ]
    }]
  },

  'loc_sb_012': {
    event_id: 'loc_sb_012', type: 'location', title: '教授的慈悲',
    scenes: [{
      text: '由于这学期大家都抱怨某门课太难，教授在课上宣布：“这周末的 Assignment 4 取消了，所有人这项平时分直接给满分。”',
      choices: [
        {
          text: '赞美教授！立刻回宿舍《原神》启动',
          effects: { Mental_Health: +25 }
        },
        {
          text: '既然没压力了，反而静下心来把它当练习做一遍',
          effects: { Academic_Ability: +12, Mental_Health: +10 },
          flavor_text: '没有分数压迫的纯粹求知，让你体验到了久违的学术快感。'
        }
      ]
    }]
  },

  'loc_sb_013': {
    event_id: 'loc_sb_013', type: 'location', title: 'Grammarly 的诱惑',
    scenes: [{
      text: '你在写报告，免费版的 Grammarly 提示你的文章里有 48 个“高级语法错误”，但要求你升级到 Premium 套餐后才能查看。',
      choices: [
        {
          text: '冲一个礼拜高级会员，一键全部自动修改',
          effects: { Money: -15, Academic_Ability: +10, English_Ability: -2 },
          flavor_text: '文章看起来非常地道。不过你完全不知道它帮你改了什么，你的语感甚至退化了。'
        },
        {
          text: '坚决不充钱，自己对着词典一个个扒出来改掉',
          effects: { Mental_Health: -20, English_Ability: +3, Academic_Ability: +6 }
        }
      ]
    }]
  },

  'loc_sb_014': {
    event_id: 'loc_sb_014', type: 'location', title: '走错教室的旁听',
    scenes: [{
      text: '你提前十分钟走进 SA 的教室，坐下听了一会儿才发现，台上讲的是隔壁专业的课。但教授讲的一个理论似乎能解决你最近的疑惑。',
      choices: [
        {
          text: '假装自己就是这个专业的，津津有味地听完',
          effects: { Academic_Ability: +8, English_Ability: +1 }
        },
        {
          text: '觉得太尴尬了，趁教授转身写板书时溜走',
          effects: { Mental_Health: -5 }
        }
      ]
    }]
  },

  'loc_sb_015': {
    event_id: 'loc_sb_015', type: 'location', title: '遗落的“武功秘籍”',
    scenes: [{
      text: '你在空教室自习，发现桌洞里有一本被人遗忘的课本。随便翻开一页，是密密麻麻的用三种颜色笔做的学霸笔记。',
      choices: [
        {
          text: '据为己有，有便宜不占王八蛋',
          effects: { Academic_Ability: +10, Mental_Health: +15 },
          flavor_text: '你白嫖了学霸的智慧结晶，感觉自己今天赚翻了。'
        },
        {
          text: '追出教室，把书交给了正在找东西的学霸本人',
          effects: { Mental_Health: +5, English_Ability: +2 },
          flavor_text: '学霸是个留学生，他对你千恩万谢，你们用英语聊了十分钟。'
        }
      ]
    }]
  },

  'loc_sb_016': {
    event_id: 'loc_sb_016', type: 'location', title: '跑步机上的文献',
    scenes: [{
      text: '你这周都没运动，身体已经感觉生锈了。但明天的 Seminar 还有两篇全英文文献没读。',
      choices: [
        {
          text: '去健身房，一边在跑步机上快走一边看文献',
          effects: { Physical_Health: +8, Academic_Ability: +3, Mental_Health: -15 },
          flavor_text: '你既锻炼了身体又看了书，但这种一心二用让你觉得活着好累。'
        },
        {
          text: '抛开一切罪恶感，去操场结结实实地跑了五公里',
          effects: { Physical_Health: +15, Mental_Health: +15, Academic_Ability: -2 },
          flavor_text: '大汗淋漓之后，你觉得那两篇文献根本不重要，健康才是第一位的。'
        }
      ]
    }]
  },

  'loc_sb_017': {
    event_id:         'loc_sb_017',
    type:             'location',
    title:            '昂贵的橄榄枝',
    scenes: [
      {
        text: '专业课下课后，以严厉著称的教授叫住了你：“你上次的大作业的思路不错。我课题组最近在做个项目，缺个打杂的，要不要来？没有钱，但最后发 Paper 可以带你的名字。”',
        tip:  '软背景提升：教授推荐信 (LoR) 是申研材料中的重要一环。与教授建立良好关系，不仅能获得强推，还能积累宝贵的科研经历，但会极大消耗精力。',
        choices: [
          {
            text:       '这是千载难逢的机会，我卖身了！',
            effects:    { Mental_Health: -20, Physical_Health: -15, Academic_Ability: +5 },
            tags_added: ['Research_Exp'],
            flavor_text: '你加入了课题组，开始了每周跑实验室、通宵看外文文献的日子。你获得了宝贵的科研经历，代价是你的发际线退后了一厘米。',
          },
          {
            text:       '感谢教授，但我目前想全力保 GPA。',
            effects:    { Mental_Health: +8 },
            flavor_text: '教授冷淡地点了点头，转身离开了。你保住了睡眠和周末，但也可能错失了一封强有力的推荐信。',
          },
        ],
      },
    ],
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

  'loc_cb_ielts_opportunity': {
    event_id:         'loc_cb_ielts_opportunity',
    type:             'location',
    title:            '极限捡漏',
    // 依然限制只有在没考到最高分时才会触发
    forbidden_tags:   ['IELTS_7.5'],  
    scenes: [
      {
        text: '你在图书馆刷题刷得头昏脑涨，随手刷新了一下雅思报名官网。居然刷出了下个月初的一个退考考位！距离报名截止只剩十分钟了。报名费 2170 元。',
        tip:  '时间规划：雅思成绩有效期为 2 年。最晚应在申请季当年的暑假结束前考出达标成绩。',
        choices: [
          {
            text:    '管不了那么多了，先锁考位！',
            effects: { Mental_Health: -5, Money: -20 },
            flavor_text: '你颤抖着扫码付了款。看着日历上标红的考试日期，你的心跳开始加速，接下来的几周注定是地狱模式。',
            next_event_id: 'ielts_exam_result',
          },
          {
            text:    '理智点，我连剑桥 14 都没刷完……',
            effects: { Mental_Health: +5 },
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

  // ════════════════════════════════════════════════════════
  // 地点事件：PB 公共楼
  // ════════════════════════════════════════════════════════



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



  // ════════════════════════════════════════════════════════
  // 地点事件：宿舍
  // ════════════════════════════════════════════════════════

  'loc_dorm_001': {
    event_id: 'loc_dorm_001', type: 'location', title: '闲不住？上咸鱼！',
    scenes: [{
      text: '你看着桌上那摞几乎全新的雅思剑桥真题。自从买回来后，它们唯一的价值就是用来垫显示器。',
      choices: [
        {
          text: '挂到闲鱼上，半价打包出给大一新生',
          effects: { Money: +15, English_Ability: -2, Mental_Health: +10 },
          flavor_text: '看着微信到账提示，你感到一阵轻松。你不仅卖掉了书，还卖掉了对英语的最后一丝负罪感。'
        },
        {
          text: '撤下显示器，强迫自己做一套听力',
          effects: { Mental_Health: -15, English_Ability: +3 }
        }
      ]
    }]
  },

  'loc_dorm_002': {
    event_id: 'loc_dorm_002', type: 'location', title: '违规电器的诱惑',
    scenes: [{
      text: '月底了，你的微信零钱只剩两位数。室友从床底摸出一个违规电煮锅：“今晚别点外卖了，我煮泡面加淀粉肠，来点不？”',
      choices: [
        {
          text: '加入这场盛宴，连汤都喝干净',
          effects: { Money: +15, Physical_Health: -10, Mental_Health: +15 },
          flavor_text: '高钠碳水带来的快乐是无与伦比的，哪怕第二天早上你肿得像个发面馒头。'
        },
        {
          text: '坚守健康底线，花钱点一份轻食沙拉',
          effects: { Money: -10, Mental_Health: -5 },
          flavor_text: '仔细想想花钱吃草何意味，看着室友们大快朵颐，你觉得自己既破财又憋屈。'
        }
      ]
    }]
  },

  'loc_dorm_003': {
    event_id: 'loc_dorm_003', type: 'location', title: '深夜的 CS2',
    scenes: [{
      text: '凌晨一点，室友戴着耳机在打 CS2，正在激情指挥：“A小！A小！他残了！特么的你会不会玩！”',
      choices: [
        {
          text: '戴上降噪耳机，在床上背单词',
          effects: { English_Ability: +3, Physical_Health: -10, Mental_Health: -15 }
        },
        {
          text: '这能学得进？一起开黑算了',
          effects: { Mental_Health: +20, Physical_Health: -10, Academic_Ability: -2 },
          flavor_text: '你用一波五杀拯救了室友的排位分，也摧毁了你明天早八的起床意志。'
        }
      ]
    }]
  },

  'loc_dorm_004': {
    event_id: 'loc_dorm_004', type: 'location', title: '沉浸式学习 VLOG',
    scenes: [{
      text: '你本来打算复习，但推送让你点开了一个“清华学霸 4 小时沉浸式学习 VLOG”。视频里的桌搭很精致，笔记很漂亮。',
      choices: [
        {
          text: '看了半小时，感觉自己似乎也成为清华的一份子了',
          effects: { Mental_Health: +10, Academic_Ability: -3 },
          flavor_text: '看着别人学习，你的大脑分泌了虚假的成就感。你今天什么都没学，但至少睡得很香。'
        },
        {
          text: '被焦虑感逼迫，选择去刷专业课习题',
          effects: { Mental_Health: -15, Academic_Ability: +10 }
        }
      ]
    }]
  },

  'loc_dorm_005': {
    event_id: 'loc_dorm_005', type: 'location', title: 'G 胖的微笑',
    scenes: [{
      text: 'Steam 秋季特卖。你愿望单里那个眼馋了半年的 3A 大作《荒野○镖客》直接打骨折，只要 89 块钱。',
      choices: [
        {
          text: '没玩过这游戏不配说自己是笔电小子！',
          effects: { Money: -10, Mental_Health: +15, Academic_Ability: -2 },
          flavor_text: '《宇宙机○人》不如《黑○话》一根！'
        },
        {
          text: '不买，去 B 站看 UP 主的实况视频，聊以解馋',
          effects: { Money: +5, Mental_Health: +10 },
          flavor_text: '白嫖虽然快乐，但云玩家的体验终究差了点意思。'
        }
      ]
    }]
  },

  'loc_dorm_006': {
    event_id: 'loc_dorm_006', type: 'location', title: '富哥的求助',
    scenes: [{
      text: 'EAP 课上认识的富哥同学在微信上敲你：“兄弟明天 Java 大作业救一下，我真写不明白，给你 600 辛苦费咋样？”',
      choices: [
        {
          text: '收钱办事，重构那坨意大利面代码',
          effects: { Money: +20, Academic_Ability: +10, Mental_Health: -15 },
          flavor_text: '你赚了钱，顺便把知识点吃透了，不过你看他代码时气的差点脑溢血。'
        },
        {
          text: '嫌麻烦拒绝，有这时间不如玩原神',
          effects: { Mental_Health: +5, Money: -5 }
        }
      ]
    }]
  },

  'loc_dorm_007': {
    event_id: 'loc_dorm_007', type: 'location', title: '凌晨三点的虚无',
    scenes: [{
      text: '凌晨三点，你在床上辗转反侧。虚无主义袭击了你，你觉得考研、留学、GPA 都毫无意义，人类不过是宇宙中的尘埃。',
      choices: [
        {
          text: '戴上耳机，任由自己沉溺在悲伤里',
          effects: { Mental_Health: -15, Physical_Health: -10 },
          flavor_text: '全网最伤感的bgm，听完不哭你来打我。尤其是最后一首建议点赞收藏起来以免找不到。夜深人静的时候个人听，前奏一响立马emo。没猜错的话，艾特列表中的第三位一定是你生命中最重要的存在。你表情包里的第二排第三个就是你现在的心情带上耳机，用心感受这浓浓的伤感氛围。评论区留下你的手机电量相当于一百的，那就做一天朋友。听完艾特一位你喜欢的博主，看他会不会来接你。有人找了十年，只听前奏就已沦陷。记得分享给你的姐妹，看看你姐妹会给你回什么。如果不回，建议两人断了，就问你敢不敢在评论区留下你想对喜欢的人说的话，万一他看到了留下一句祝福。听说打出l d，据说百分之九十的打出来都是老大。如果不是，请打在评论区，让我看看你就是那百分之十。废话不多说，就让我们听听有哪些伤感bgm，键盘打出七四八三二幺，如果相似的，那么就做一周兄弟听完不哭，下个月的奶茶我包了。不要单独一个人听，建议分享给闺蜜一起听。据说这几个星座听完之后，两周内回进到那个有缘的地方去进行修炼。下面让我们听听网友总结的最伤感的十首bgm吧。一首是经典，看看你听过几首关上灯，戴上耳机，让我们用心感受一下这几首音乐歌曲天花板。@你闺蜜过来看看你闺蜜会不会来接你。心情不好的时候，千万不要怕你听完后瞬间落泪，如果没有落泪，那算我输，让我们一起欣赏网友总结的emo歌曲天花板先准备好纸巾，以免落泪了。来不及，bgm上'
        },
        {
          text: '睡不着也无事做，刷点题打发时间',
          effects: { Mental_Health: +15, Academic_Ability: +10, Physical_Health: -15 },
          flavor_text: '因为彻底放弃了功利心，知识点竟然过目不忘。这种看破红尘带来了内心的极度平静。'
        }
      ]
    }]
  },

  'loc_dorm_008': {
    event_id: 'loc_dorm_008', type: 'location', title: '疯狂星期四',
    scenes: [{
      text: '今天是星期四。你 QQ、微信的各个群聊都在刷不知道哪里偷的“疯狂星期四”文案。',
      choices: [
        {
          text: '复制其中最难绷的一条，转发到各个群里，并配上你的收款码',
          effects: { Money: +10, Mental_Health: +10 },
          flavor_text: '可能是佩服你自己开盒自己的胆识，居然真的有个富哥给你转了 50。你没去买肯德基，而是去食堂吃了一周的挂面。这就是互联网的魅力。'
        },
        {
          text: '实在受不了这种互联网讨口子的行为，让 AI 引经据典现编一段三千字雄文痛斥他们',
          effects: { Mental_Health: +15, Academic_Ability: +5 },
          flavor_text: '虽然你扮了扫兴鬼，但赢得了道德高地。在看到 AI 生成出“君子忧道不忧贫”的时候，你觉得自己灵魂升华了。'
        }
      ]
    }]
  },

  'loc_dorm_009': {
    event_id: 'loc_dorm_009', type: 'location', title: 'Steam 饰品理财',
    scenes: [{
      text: '日常的一天，你偶然地发现，你两年前 5 块钱买的 CS 皮肤竟然涨到了 400 块，而且现在涨势似乎也还行。',
      choices: [
        {
          text: '赶紧抛售。落袋为安，今晚加餐！',
          effects: { Money: +15, Mental_Health: +15 },
          flavor_text: '看着余额增加，你觉得自己就是西浦巴菲特。虽然第二天它又涨了 100。'
        },
        {
          text: '我就是西浦赌神，给我擦皮鞋',
          effects: { Money: -10, Mental_Health: -15 },
          flavor_text: '倒狗你赢了。'
        }
      ]
    }]
  },

  'loc_dorm_010': {
    event_id: 'loc_dorm_010', type: 'location', title: '床头夜聊的虚妄',
    scenes: [{
      text: '凌晨一点，宿舍熄灯。室友突然叹了口气：“兄弟，你说咱们这专业毕业以后能干嘛？”以此为契机，宿舍瞬间进入了经典睡得着但夜聊环节。',
      choices: [
        {
          text: '翻个身，跟他大谈特谈国际局势、AI 发展和未来经济形势',
          effects: { Mental_Health: +15, Physical_Health: -10, Academic_Ability: -3 },
          flavor_text: '聊到凌晨四点，你们觉得已经掌握了世界运行的底层逻辑，万物皆是草芥——除了明天的早九。'
        },
        {
          text: '“能干嘛？进厂打螺丝呗。”戴上耳塞强行睡觉',
          effects: { Physical_Health: +10, Mental_Health: -10, English_Ability: +2 },
          flavor_text: '你在梦里竟然梦到自己在国外的流水线工厂打黑工。'
        }
      ]
    }]
  },

  'loc_dorm_011': {
    event_id: 'loc_dorm_011', type: 'location', title: '洗衣间的生化危机',
    scenes: [{
      text: '你端着装脏衣服的桶去洗衣间，发现有人用公共洗衣机洗内裤袜子……🤮',
      choices: [
        {
          text: '捏着鼻子拿出来，然后花钱开“高温桶自洁”后再洗',
          effects: { Money: -5, Mental_Health: -10, Physical_Health: +5 }
        },
        {
          text: '都放洗衣液了有啥关系，直接洗',
          effects: { Physical_Health: -15, Mental_Health: -10, Money: +5 },
          flavor_text: '“为啥老发痒？”'
        }
      ]
    }]
  },

  'loc_dorm_012': {
    event_id: 'loc_dorm_012', type: 'location', title: '过期的蛋白粉',
    scenes: [{
      text: '隔壁爱好健身的学长要毕业了，送了你半桶快过期的进口分离乳清蛋白粉。',
      choices: [
        {
          text: '挂在二手群里，以低廉的价格卖给不知情的学弟',
          effects: { Money: +15, Mental_Health: -10 },
          flavor_text: '钱到账了。但你总怕半夜学弟捂着肚子来敲门暗杀你，良心受到了隐隐的谴责。'
        },
        {
          text: '秉承着珍惜食物的原则，尝试在早晨猛喝两大勺代替早饭',
          effects: { Physical_Health: -15, Money: +5 },
          flavor_text: '和马桶一起度过了难忘的一天。'
        }
      ]
    }]
  },

  'loc_dorm_013': {
    event_id:         'loc_dorm_013',
    type:             'location',
    title:            '室友的觉醒',
    forbidden_tags:   ['IELTS_7.0', 'IELTS_7.5'],
    scenes: [
      {
        text: '你正躺在床上刷视频，平时最爱打游戏的室友突然搬回一整套《剑桥雅思》，神色凝重地对你说：“兄弟我不想再徒耗人生了。以后每天早上七点，我们互相监督背单词咋样？谁不起谁是狗。”',
        choices: [
          {
            text:       '👍',
            effects:    { English_Ability: +3, Mental_Health: -10, Physical_Health: -5 },
            tags_added: ['Study_Buddy'],
            flavor_text: '你们达成了神圣的契约。虽然每天早起极其痛苦，但在互相鄙视的驱动下，你确实比一个人单打独斗有效率多了。',
          },
          {
            text:       '👎',
            effects:    { Mental_Health: +5 },
            flavor_text: '室友的热血只维持了三天，随后那套真题就成了他的泡面盖。你庆幸自己没有跟着瞎折腾，保住了安稳的睡眠。',
          },
        ],
      },
    ],
  },

  // ════════════════════════════════════════════════════════
  // 各建筑保底事件（Default / Filler Events）
  // ════════════════════════════════════════════════════════

  'default_fb': {
    event_id: 'default_fb', type: 'location', title: '基础楼日常',
    scenes: [{ text: 'FB 的大厅里贴满了各种社团活动海报。你在这里上了一节通识课，阶梯教室里空调的嗡嗡声让你有点犯困。' }]
  },
  'default_sb': {
    event_id: 'default_sb', type: 'location', title: '理工楼日常',
    scenes: [{ text: '教授今天按部就班地讲完了 PPT。你记了满屏的笔记，下课时教室里充满了收拾书包的声音。' }]
  },
  'default_cb': {
    event_id: 'default_cb', type: 'location', title: '图书馆日常',
    scenes: [{ text: '图书馆里一如既往地安静，只有偶尔翻书的声音和远处打印机的轰鸣。你专注地完成了一段学习任务。' }]
  },
  'default_pb': {
    event_id: 'default_pb', type: 'location', title: '公共楼日常',
    scenes: [{ text: '你在 PB 穿行，应急通道的楼梯上挤满了来不及等电梯的学生，便利店的关东煮香气飘得很远。今天没什么特别的人和你打招呼。' }]
  },
  'default_eb': { // 原 IR 文案移交至此
    event_id: 'default_eb', type: 'location', title: '工科楼日常',
    scenes: [{ text: '机房电脑的风扇嗡嗡作响，你盯着跑了一半的脚本，确认没有报错后记录下了今天的数据。' }]
  },
  'default_ir': { // 编写新的科研中心文案
    event_id: 'default_ir', type: 'location', title: '科研中心日常',
    scenes: [{ text: 'IR 的会议室里正在进行一场小型的学术研讨。你整理着最近的文献综述，空气中弥漫着高端咖啡和高端论文的味道。' }]
  },
  'default_gym': {
    event_id: 'default_gym', type: 'location', title: '健身房日常',
    scenes: [{ text: '完成最后一组器械后，你擦了擦汗。镜子里的你看起来和昨天没什么不同，但肌肉的酸胀感提醒你今天没有虚度。' }]
  },
  'default_dorm': {
    event_id: 'default_dorm', type: 'location', title: '宿舍日常',
    scenes: [{ text: '你回到了宿舍，今日无事发生。室友们都在忙自己的事，你换上睡衣，享受这难得的片刻宁静。' }]
  },
  'default_ia': {
    event_id: 'default_ia', type: 'location', title: 'IA 日常',
    scenes: [{ text: 'IA 的咨询台前排着小队。你翻看了一下最近的宣讲会排期表，并没有发现特别感兴趣的项目。' }]
  },

};