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

  // ════════════════════════════════════════════════════════
  // 核心剧情链：中介风云 (Agency Saga)
  // ════════════════════════════════════════════════════════

  // ── 1. 起心动念 (Month 3 触发) ──
  'agency_part1': {
    event_id:     'agency_part1',
    type:         'scheduled',
    title:        '中介风云：起心动念',
    scenes: [
      {
        text: '三月，春招的氛围开始在校园里蔓延。对床的室友一边刷着手机一边问你：“朋友圈好多人都在晒中介签约图了，你打算什么时候开始弄申研的事？”',
        choices: [
          {
            text:       '“急什么，等 7 月放暑假了再慢慢看，先搞期末。”',
            effects:    { Agency_Score: -10 },
            tags_added: ['Agency_Wait'],
            flavor_text: '室友点点头觉得有理。你心安理得地打开了专业课 PPT，决定把这个让人焦虑的问题推迟到暑假再面对。',
            tip:        '时间规划雷区：找中介的最晚时间是暑假前！拖到 7-8 月才定中介，会导致背景提升和文书头脑风暴的时间极其被动。'
          },
          {
            text:       '“确实该开始了，我这周末就去了解一下。”',
            effects:    { Agency_Score: +10 },
            next_event_id: 'agency_investigation',
            tags_added: ['Agency_Start'],
            flavor_text: '你深吸了一口气，虽然专业课压力很大，但你清楚申研是一场持久战，早起的鸟儿才有虫吃。',
            tip:        '最佳时间：建议在申请季当年的春节后 (2-4月) 开始接触和筛选中介，为后续的背景提升留出充足时间。'
          },
          {
            text:       '“中介都是骗钱的，我要全程 DIY！”',
            effects:    {},
            tags_added: ['DIY_Applicant'],
            flavor_text: '你决定把命运交给自己。省下了几万块钱，但接下来的选校、网申、写文书，将是一场孤独且硬核的战斗。',
            tip:        '硬核之路：DIY 能最大程度锻炼信息检索能力，但需要极强的时间管理、抗压能力和英语写作功底。'
          }
        ]
      }
    ]
  },

  // ── 2. 尽职调查 (早鸟线 Month 4) ──
  'agency_investigation': {
    event_id:       'agency_investigation',
    type:           'chain',
    title:          '中介风云：尽职调查',
    scenes: [
      {
        text: '你趁着周末有空，决定先在网上做做功课。面对眼花缭乱的留学市场和各种天花乱坠的宣传，你决定采用哪种方式进行初步筛选？',
        choices: [
          {
            text:       '重点看机构官方号发出的“名校 Offer 案例”和“学员好评截图”。',
            effects:    { Agency_Score: -10 },
            next_event_id: 'agency_consult_1',
            flavor_text: '看着满屏的录取通知书和“感谢神仙老师”的聊天记录，你感到一种强烈的安全感，迅速锁定了机构。',
            tip:        '幸存者偏差：机构永远只会展示成功的案例。光看官方发出的光鲜截图，你永远看不到水面下那些被坑的受害者。'
          },
          {
            text:       '去小红书、知乎搜索机构名字，看网友评价。',
            effects:    { Agency_Score: +5 },
            next_event_id: 'agency_consult_1',
            flavor_text: '你搜了一下午，发现评价好坏参半。有人夸上天，也有人长篇大论地避雷。你越看越迷茫，不知道该相信谁。',
            tip:        '信息甄别：社交媒体上的评价极易被水军操控。好评可能是刷的，差评也可能是同行恶意竞争，参考价值有限。'
          },
          {
            text:       '通过西浦校友群，设法加上去年签过这家机构的学长私聊。',
            effects:    { Agency_Score: +15, Mental_Health: -5 },
            next_event_id: 'agency_consult_1',
            flavor_text: '几经周折，你终于加上了一位学长。学长告诉你：“这家还行，但后期催文书一定要凶一点，不然他们会拖。”你获得了极其宝贵的真实情报。',
            tip:        '口碑调研核心：寻找中介最靠谱的方式，是尝试联系该中介的过往真实学生获取反馈，尤其是同背景的直系学长学姐。'
          }
        ]
      }
    ]
  },

  // ── 2. 尽职调查 (拖延线 Month 7) ──
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
            text:       '重点看机构官方号发出的“名校 Offer 案例”和“学员好评截图”。',
            effects:    { Agency_Score: -10 },
            next_event_id: 'agency_consult_1',
            flavor_text: '看着满屏的录取通知书和“感谢神仙老师”的聊天记录，你感到一种强烈的安全感，迅速锁定了机构。',
            tip:        '幸存者偏差：机构永远只会展示成功的案例。光看官方发出的光鲜截图，你永远看不到水面下那些被坑的受害者。'
          },
          {
            text:       '去小红书、知乎搜索机构名字，看网友评价。',
            effects:    { Agency_Score: +5 },
            next_event_id: 'agency_consult_1',
            flavor_text: '你搜了一下午，发现评价好坏参半。有人夸上天，也有人长篇大论地避雷。你越看越迷茫，不知道该相信谁。',
            tip:        '信息甄别：社交媒体上的评价极易被水军操控。好评可能是刷的，差评也可能是同行恶意竞争，参考价值有限。'
          },
          {
            text:       '通过西浦校友群，设法加上去年签过这家机构的学长私聊。',
            effects:    { Agency_Score: +15, Mental_Health: -5 },
            next_event_id: 'agency_consult_1',
            flavor_text: '几经周折，你终于加上了一位学长。学长告诉你：“这家还行，但后期催文书一定要凶一点，不然他们会拖。”你获得了极其宝贵的真实情报。',
            tip:        '口碑调研核心：寻找中介最靠谱的方式，是尝试联系该中介的过往真实学生获取反馈，尤其是同背景的直系学长学姐。'
          }
        ]
      }
    ]
  },

  // ── 3. 机构巡礼：承诺与流程 (完全还原图片文本) ──
  'agency_consult_1': {
    event_id: 'agency_consult_1',
    type:     'chain',
    title:    '中介风云：机构巡礼 (1/3)',
    scenes: [
      {
        text: '你开始了实地考察。在沟通申请流程和目标院校时，两家机构给出了截然不同的方案。你更倾向于哪一种服务模式？',
        choices: [
          {
            text:       '机构甲：“无忧托管”模式<br>“我们有自研的 CRM 申请系统，你的所有大学网申账号由总部统一管理。这能确保你绝对不会漏掉任何一封面试邀请邮件。另外，基于我们的内部数据模型，你的背景走我们的 VIP 通道，稳拿前 50。”',
            effects:    { Agency_Score: -15 },
            next_event_id: 'agency_consult_2',
            flavor_text: '你觉得这种“全包”服务非常省心，毕竟大四还要忙毕设，有个系统统一管理邮件能避免很多麻烦。',
            tip:        '信息透明与夸大承诺：警惕“保证录取”的承诺。更重要的是，拒绝无法提供申请邮箱账号的中介！如果没有绝对控制权，你甚至不知道他们到底有没有帮你递交申请。'
          },
          {
            text:       '机构乙：“共创指导”模式<br>“我们不作‘保录’承诺，G5 需要冲刺，前 50 是稳妥区间。申请邮箱需要你自己注册并保管，我们会手把手教你填网申，但你必须保证每天自己登录邮箱检查进度。”',
            effects:    { Agency_Score: +15 },
            next_event_id: 'agency_consult_2',
            flavor_text: '你觉得这家机构有些保守，而且让你自己管邮箱意味着你需要投入更多的精力去盯进度。',
            tip:        '掌握主动权：中介只是辅助，你才是申请的主人。将账号密码握在自己手里，拥有所有材料的最终审核权和提交权，是底线。'
          }
        ]
      }
    ]
  },

  // ── 4. 机构巡礼：团队与文书 (完全还原图片文本) ──
  'agency_consult_2': {
    event_id: 'agency_consult_2',
    type:     'chain',
    title:    '中介风云：机构巡礼 (2/3)',
    scenes: [
      {
        text: '接下来，你询问了最核心的文书创作和后期团队的安排。',
        choices: [
          {
            text:       '机构甲：“矩阵式流水线”<br>“我们采用高效的矩阵式团队协作。前期规划师定方向，中期有外籍导师润色语言。即使某个环节的老师请假，系统也会无缝指派下一位同级别专家接手，绝对不耽误你的进度。”',
            effects:    { Agency_Score: -15 },
            next_event_id: 'agency_consult_3',
            flavor_text: '“矩阵式团队”听起来非常专业且高效，你觉得这种大机构的标准化流程能保证文书的下限。',
            tip:        '人员流动与模板化雷区：所谓“无缝接手”往往是频繁更换顾问的遮羞布。流水线作业极易导致文书千篇一律，缺乏个人特色。'
          },
          {
            text:       '机构乙：“专属责任制”<br>“我将是你从头到尾的唯一主负责顾问，我的名字会直接写在合同里。文书需要我们一起头脑风暴，从零开始写。因为不套模板，出稿周期可能会比同行多出一周左右。”',
            effects:    { Agency_Score: +15 },
            next_event_id: 'agency_consult_3',
            flavor_text: '专属负责听起来不错，但“不套模板”、“出稿慢”让你有些担心赶不上第一批申请的早班车。',
            tip:        '顾问稳定性：问清顾问从业年限，并确保合同中书写顾问姓名，防止签约后频繁换人导致申请中断。优秀的文书必须经过深度的个人挖掘。'
          }
        ]
      }
    ]
  },

  // ── 5. 机构巡礼：合同与付款 (完全还原图片文本) ──
  'agency_consult_3': {
    event_id: 'agency_consult_3',
    type:     'chain',
    title:    '中介风云：机构巡礼 (3/3)',
    scenes: [
      {
        text: '最终到了看合同的环节。面对厚厚的条款和报价单，你需要做出最后的决定。',
        choices: [
          {
            text:       '机构甲：“早鸟优惠”全款<br>“今天签约可以享受 15% 的早鸟折扣，需一次性付清全款。如果最终零录取，我们将扣除已发生的行政建档费和翻译费后，退还剩余部分。”',
            effects:    { Agency_Score: -20, Money: -45000 },
            next_event_id: 'agency_settlement',
            flavor_text: '15% 的折扣让你非常心动。你觉得“扣除行政费”是合理的商业条款，毕竟人家也付出了劳动。你拿起了签字笔……',
            tip:        '退款与付款雷区：强烈建议阶段性付款。退款条款必须明确“全拒得”的具体退款比例，警惕“酌情扣除部分费用”这种极具操作空间的模糊字眼。'
          },
          {
            text:       '机构乙：“阶段付款”无折扣<br>“我们不打折。费用分三期：签约 30%，文书定稿 40%，首个 Offer 30%。如果全拒得，服务费 100% 全退。但注意，大学的申请费和成绩单公证费需要你额外自理。”',
            effects:    { Agency_Score: +15, Money: -15000 },
            next_event_id: 'agency_settlement',
            flavor_text: '没有折扣让你有些肉痛，而且还需要额外自理申请费。但分期付款的方式确实减轻了你当下的资金压力。你拿起了签字笔……',
            tip:        '合同细节：阶段性付款能最大程度约束中介的后期服务质量。同时，提前确认好哪些属于“附加费用”，能避免后期的隐形消费扯皮。'
          }
        ]
      }
    ]
  },

  // ── 6. 尘埃落定 ──
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
                text: '凭借着极高的防坑意识，你成功避开了所有深坑，签订了一份几乎完美的合同。你不仅找了一个得力的辅助，更把主动权死死地焊在了自己手里。'
              },
              {
                required_stat: { stat: 'Agency_Score', min: 0, max: 39 },
                tags_added: ['Reliable_Agency'],
                type: 'neutral',
                text: '你避开了一些明显的陷阱，但在某些看似“行业标准”的条款上还是妥协了。这份合同中规中矩，未来的申请结果，只能祈祷分给你的老师足够负责了。'
              },
              {
                required_stat: { stat: 'Agency_Score', max: -1 },
                tags_added: ['Scam_Agency'],
                type: 'negative',
                text: '你在一声声“保录”和“无忧托管”的承诺中迷失了自我。你觉得这笔钱买到了通往名校的免死金牌，连今晚的晚风都变得格外温柔。你丝毫没有意识到，命运的绞索已经悄悄套在了脖子上。'
              }
            ]
          }
        ]
      }
    ]
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