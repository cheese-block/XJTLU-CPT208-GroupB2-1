/**
 * @fileoverview 事件数据库 (精修黄金剧情版)
 *
 * 包含：特殊大事件 (Scheduled) 与 随机小事件 (Random)
 * 知识库 (Knowledge Base) 已深度缝合至 tip 与 flavor_text 中。
 */

export const EVENTS = {

  // ════════════════════════════════════════════════════════
  // 新手引导剧情（仅首次进入游戏触发）
  // ════════════════════════════════════════════════════════

  'tutorial_intro': {
    event_id: 'tutorial_intro',
    type:     'chain',
    title:    '新学期，新征程',
    scenes: [
      {
        text: '九月，苏州的秋风还带着一丝暑气。大三的第一天，你拖着行李箱走进宿舍，发现室友已经把桌子收拾得井井有条，正盯着电脑屏幕皱眉头。',
        bg:   null,
      },
      {
        speaker: '室友',
        text:    '"你来了！正好，我在看申研的事。你知道吗，咱们专业去年有人大三下就开始准备了，结果大四九月就拿到 UCL 的 Offer 了。"',
        bg:   null,
      },
      {
        text: '你把行李随手一扔，凑过去看了一眼他的屏幕——密密麻麻的院校排名和申请要求。你心里隐约有些发慌，但嘴上还是说："大三才刚开始，急什么。"',
        bg:   null,
      },
      {
        speaker: '室友',
        text:    '"急什么？"他转过椅子，一脸认真，"申研不是大四才开始的事。GPA 要从现在开始攒，雅思要早点考，最好大三暑假前就能搞定。你看，这是去年学长发在群里的时间线……"',
        bg:   null,
        tip:  '游戏目标：你将经历从大三上到大四上，共 12 个月的申研准备期。每月分配行动点（AP），积累 GPA、雅思成绩和软背景，在大四九月前攒够一份有竞争力的申请履历。',
      },
      {
        text: '你接过他递来的手机，看着那张时间轴，第一次意识到——这场仗，比你想象的要早得多。',
        bg:   null,
      },
      {
        speaker: '室友',
        text:    '"行了，先把东西放好吧。对了，你有没有想好申哪个方向？计算机还是数据科学？不同方向对雅思和 GPA 的要求差挺多的，早点想清楚，选课的时候也好有个重点。"',
        bg:   null,
      },
      {
        text: '你环顾了一眼这间将要住上两年的宿舍，深吸了一口气。\n\n大三，正式开始了。',
        bg:   null,
        tip:  '操作提示：点击左侧校园地图上的建筑，在右侧面板选择行动并消耗 AP。每月有 5 点 AP，用完后点击"结束本月"进入下一个月。注意保持心理和身体健康，归零会直接触发 Bad Ending！',
      },
    ],
  },

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
        bg:   null, // 【修改】：移除不存在的图片路径，使用默认蓝色背景
      },
      {
        text: '你翻开堆积如山的课件，开始了最后的冲刺。这学期你在专业课上流下的每一滴汗水（或摸掉的每一条鱼），都将在接下来几天内转化为成绩单上冷冰冰的数字。',
        bg:   null, // 【修改】：移除不存在的图片路径，使用默认蓝色背景
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

  // ════════════════════════════════════════════════════════
  // 新增随机事件：纯剧情事件（无选项，仅作数值扰动和氛围渲染）
  // ════════════════════════════════════════════════════════
  'random_canteen_encounter': {
    event_id:         'random_canteen_encounter',
    type:             'random',
    title:            '食堂偶遇',
    available_months: [1, 2, 3, 6, 7, 8, 9],
    forbidden_tags:   [],
    weight:           1.2,
    scenes: [
      {
        text: '食堂午饭高峰期，你端着托盘找座位，发现整个一楼只剩下一个空位，就在一个陌生同学对面。',
        bg:   null,
      },
      {
        text: '你们沉默地吃了五分钟饭。然后他突然抬起头问："你是 SAT 的吗？你们专业申研一般去哪？"',
        bg:   null,
      },
      {
        text: '你们就这样聊了整整一顿饭的时间。他告诉你他在备考 GRE，打算申美国。你第一次意识到，原来不是所有人都去英国。',
        bg:   null,
        effects: { Mental_Health: +8 },
      },
    ],
  },
  'random_offer_news': {
    event_id:         'random_offer_news',
    type:             'random',
    title:            '朋友圈的 Offer',
    available_months: [10, 11, 12],
    forbidden_tags:   [],
    weight:           1.3,
    scenes: [
      {
        text: '你在刷朋友圈，看到一个大三的学长晒出了 UCL 的 Offer，配文是"早申请早安心，祝大家都能拿到梦校"。',
        bg:   null,
      },
      {
        text: '你数了数他发布的时间——他是在大三的暑假就开始准备的，比你早了整整一年。',
        bg:   null,
        effects: { Mental_Health: -12 },
      },
      {
        text: '你关掉朋友圈，打开了雅思题库。\n\n有些焦虑，但也有些清醒。',
        bg:   null,
      },
    ],
  },
  'random_power_outage': {
    event_id:         'random_power_outage',
    type:             'random',
    title:            '突然停电',
    available_months: [1, 2, 3, 4, 6, 7, 8, 9, 10, 11, 12],
    forbidden_tags:   [],
    weight:           0.7,
    scenes: [
      {
        text: '晚上九点，宿舍楼突然停电。整栋楼陷入黑暗，走廊里传来一阵骚动和笑声。',
        bg:   null,
      },
      {
        text: '你摸黑找到了手机，打开手电筒。室友们开始用手机刷短视频，有人提议打牌。\n\n你看了眼手机里没做完的雅思模拟题，又看了看室友们。',
        bg:   null,
      },
      {
        text: '电一个小时后恢复了。你没有打牌，但也没有做题——你就这样坐在黑暗里发了一个小时的呆，脑子里什么都没想，又好像什么都想了。',
        bg:   null,
        effects: { Mental_Health: +12, Physical_Health: +5 },
      },
    ],
  },
  'random_rainy_day': {
    event_id:         'random_rainy_day',
    type:             'random',
    title:            '梅雨季',
    available_months: [7, 8, 9],
    forbidden_tags:   [],
    weight:           1.0,
    scenes: [
      {
        text: '苏州的梅雨季说来就来。连续一周，天空像是破了个洞，雨水没有停过一刻。',
        bg:   null,
      },
      {
        text: '你的书包湿了，鞋子湿了，连放在桌上的教材角都翘起来了。\n\n图书馆的暖气让空气里弥漫着一股潮湿的霉味，你坐在那里，感觉连思维都变得黏糊糊的。',
        bg:   null,
        effects: { Mental_Health: -8, Physical_Health: -5 },
      },
      {
        text: '但也有一件好事：雨天路上没有人，你第一次在上课路上戴着耳机听完了一整套雅思听力真题，没有任何干扰。',
        bg:   null,
        effects: { English_Ability: +3 },
      },
    ],
  },
  'random_late_night_eb': {
    event_id:         'random_late_night_eb',
    type:             'random',
    title:            'EB 深夜的灯光',
    available_months: [3, 4, 8, 9, 10, 11, 12],
    forbidden_tags:   [],
    weight:           0.9,
    scenes: [
      {
        text: '凌晨十二点，你从 EB 的机房走出来，发现外面的天空意外地清澈，能看到几颗星星。',
        bg:   null,
      },
      {
        text: '你回头看了看 EB 的楼，三楼的灯还亮着，那是另一个课题组的实验室。你不知道里面的人在做什么，但你突然觉得，此刻整个校园里，有很多人和你一样，正在为某件事情拼命。',
        bg:   null,
        effects: { Mental_Health: +10 },
      },
      {
        text: '你骑上单车，往宿舍方向踏去。夜风很凉，但不冷。',
        bg:   null,
      },
    ],
  },
  'random_gym_encounter': {
    event_id:         'random_gym_encounter',
    type:             'random',
    title:            '健身房的对话',
    available_months: [1, 2, 6, 7, 10, 11],
    forbidden_tags:   [],
    weight:           0.8,
    scenes: [
      {
        text: '你在 GYM 跑步机上跑步，旁边的人突然摘下耳机问你："你是大几的？"',
        bg:   null,
      },
      {
        speaker: '陌生人',
        text:    '"大四了？那你应该快申请了吧。我去年这时候也是这样，每天跑步就是为了发泄压力。后来拿到 Edinburgh 的 Offer，现在回来交流。"',
        bg:     null,
      },
      {
        text: '他重新戴上耳机，继续跑步。你看着他的侧脸，心里涌起一种奇怪的情绪——不是羡慕，更像是某种遥远的希望。',
        bg:   null,
        effects: { Mental_Health: +15 },
      },
    ],
  },
  'random_deadline_panic': {
    event_id:         'random_deadline_panic',
    type:             'random',
    title:            'DDL 前的崩溃',
    available_months: [3, 4, 8, 9, 11, 12],
    forbidden_tags:   [],
    weight:           1.1,
    scenes: [
      {
        text: '距离 Assignment 提交截止还有六小时，你盯着屏幕，突然发现自己完全不知道该写什么。',
        bg:   null,
        effects: { Mental_Health: -10 },
      },
      {
        text: '你去洗了把脸，喝了杯水，在宿舍楼道里来回走了十分钟。\n\n然后你重新坐下，打开文档，从结论开始倒着写。',
        bg:   null,
      },
      {
        text: '凌晨四点，你提交了那份作业。它不完美，但它完成了。\n\n你关上电脑，倒头就睡，连牙都没刷。',
        bg:   null,
        effects: { Physical_Health: -8 },
      },
    ],
  },

  // ════════════════════════════════════════════════════════
  // 地点抽卡事件 (Location Events) - 资源置换与走钢丝
  // ════════════════════════════════════════════════════════

  'loc_fb_lecture': {
    event_id: 'loc_fb_lecture', type: 'location', title: '催眠的专业课',
    scenes: [{
      text: '教授的 PPT 密密麻麻全是字，语调平缓得像是在念经。你的眼皮越来越沉，但你清楚这门课的期末均分极低。',
      bg: 'assets/images/events/classroom.png',
      choices: [
        {
          text: '猛灌咖啡，死磕到底',
          effects: { Academic_Ability: +20, Mental_Health: -15, Physical_Health: -10, Money: -5 },
          flavor_text: '你强撑着记下了所有考点，感觉大脑在燃烧，心脏也因为摄入过多咖啡因而狂跳。'
        },
        {
          text: '后排摸鱼，闭目养神',
          effects: { Mental_Health: +15, Physical_Health: +10, Academic_Ability: -5 },
          flavor_text: '你睡了一个极其香甜的觉。虽然错过了一些知识点，但你感觉自己又活过来了。'
        }
      ]
    }]
  },

  'loc_fb_group_work': {
    event_id: 'loc_fb_group_work', type: 'location', title: '小组作业的灾难',
    scenes: [{
      text: '到了 Group Work 环节，你发现你的队友一个在打游戏，另一个说自己生病了无法参与。',
      bg: 'assets/images/events/classroom.png',
      choices: [
        {
          text: '一个人扛下所有 (Carry)',
          effects: { Academic_Ability: +25, Mental_Health: -25, Physical_Health: -15 },
          flavor_text: '你熬了两个通宵做完了四个人的工作量。你学到了很多，但也对人类失去了信任。'
        },
        {
          text: '摆烂，大家一起死',
          effects: { Mental_Health: +5, Academic_Ability: -15 },
          flavor_text: '你决定不惯着他们。最终你们交了一份垃圾上去，你的心态很平稳，但成绩单不会好看。'
        }
      ]
    }]
  },

  'loc_cb_ielts_mock': {
    event_id: 'loc_cb_ielts_mock', type: 'location', title: '雅思听力地狱',
    scenes: [{
      text: '你在图书馆做剑桥雅思听力模考。旁边的人一直在疯狂抖腿，还时不时发出啧啧声。',
      bg: 'assets/images/events/library.png',
      choices: [
        {
          text: '戴上降噪耳机，强行专注',
          effects: { English_Ability: +15, Mental_Health: -15 },
          flavor_text: '你屏蔽了外界的干扰，完成了一套极难的试卷。你的英语水平有所提升，但心情非常烦躁。'
        },
        {
          text: '拍桌子让他安静',
          effects: { Mental_Health: +10, English_Ability: -5 },
          flavor_text: '你大声斥责了他，他灰溜溜地走了。你觉得非常解气，但接下来的时间你都在回味刚才的争吵，一个字也没看进去。'
        }
      ]
    }]
  },

  'loc_cb_seat_war': {
    event_id: 'loc_cb_seat_war', type: 'location', title: '占座风波',
    scenes: [{
      text: '期末周的图书馆一座难求。你发现一个座位上只放了一包干瘪的纸巾，显然已经很久没人了。',
      bg: 'assets/images/events/library.png',
      choices: [
        {
          text: '把纸巾推开，直接坐下学',
          effects: { Academic_Ability: +15, Mental_Health: -10 },
          flavor_text: '你学了两个小时后，纸巾的主人回来了并冷嘲热讽。你硬着头皮没理他，但心里一阵添堵。'
        },
        {
          text: '算了，去星巴克花钱买座',
          effects: { Money: -15, Mental_Health: +10, Academic_Ability: +10 },
          flavor_text: '你花 40 块买了一杯星冰乐，在舒适的沙发上学了一下午。金钱确实能换来体面和效率。'
        }
      ]
    }]
  },

  'loc_pb_coffee_chat': {
    event_id: 'loc_pb_coffee_chat', type: 'location', title: '同辈压力',
    scenes: [{
      text: '在 PB 喝咖啡时，你遇到了隔壁专业的卷王。他无意间向你透露，他已经拿到了两段大厂实习和一段牛剑暑研。',
      bg: 'assets/images/events/pb.png',
      choices: [
        {
          text: '虚心请教他的时间管理方法',
          effects: { Academic_Ability: +10, Mental_Health: -25 },
          flavor_text: '他给你展示了他精确到分钟的日程表。你学到了一些技巧，但随之而来的是铺天盖地的焦虑和自我怀疑。'
        },
        {
          text: '敷衍两句，迅速逃离',
          effects: { Mental_Health: +5 },
          flavor_text: '你选择捂住耳朵不听。只要我跑得够快，同辈压力就追不上我。'
        }
      ]
    }]
  },

  'loc_pb_club_activity': {
    event_id: 'loc_pb_club_activity', type: 'location', title: '社团聚餐',
    scenes: [{
      text: '社团今晚在 PB 聚餐，大家提议去吃一顿人均 200 的日料，然后去唱 K。',
      bg: 'assets/images/events/pb.png',
      choices: [
        {
          text: '去！难得放松一下',
          effects: { Mental_Health: +30, Money: -25, Physical_Health: -10 },
          flavor_text: '你们玩到了凌晨两点。你彻底忘记了申研的烦恼，但干瘪的钱包和第二天宿醉的头痛提醒了你现实的残酷。'
        },
        {
          text: '婉拒，说自己要回去赶 Due',
          effects: { Money: +0, Mental_Health: -10, Academic_Ability: +10 },
          flavor_text: '看着朋友圈里他们热闹的合影，你独自在台灯下啃着冷面包。孤独，是申研人的必修课。'
        }
      ]
    }]
  },

  'loc_eb_debug_night': {
    event_id: 'loc_eb_debug_night', type: 'location', title: '无尽的 Bug',
    scenes: [{
      text: '你在 EB 机房做 Final Project。代码跑不通，报错信息你连看都看不懂。此时已经是晚上 11 点了。',
      bg: 'assets/images/events/lab.png',
      choices: [
        {
          text: '通宵！不调出来不回宿舍',
          effects: { Academic_Ability: +25, Physical_Health: -25, Mental_Health: -15 },
          flavor_text: '凌晨四点，你终于发现只是少了一个分号。你看着正常运行的程序，感觉自己像个神，但你的心脏正在抗议。'
        },
        {
          text: '放弃挣扎，花钱找淘宝代做',
          effects: { Money: -30, Academic_Ability: -10, Mental_Health: +15 },
          flavor_text: '你花了 500 块钱买了个现成的代码交了上去。你获得了充足的睡眠，但你的良心和专业能力都在隐隐作痛。'
        }
      ]
    }]
  },

  'loc_eb_equipment_fail': {
    event_id: 'loc_eb_equipment_fail', type: 'location', title: '设备故障',
    scenes: [{
      text: '你正准备导出跑了三天的实验数据，实验室的电脑突然蓝屏了。',
      bg: 'assets/images/events/lab.png',
      choices: [
        {
          text: '深呼吸，从头再跑一次',
          effects: { Academic_Ability: +15, Mental_Health: -20 },
          flavor_text: '你强压下砸电脑的冲动，重新配置环境。你的抗压能力得到了极大的锻炼。'
        },
        {
          text: '崩溃大哭，直接回宿舍',
          effects: { Mental_Health: +10, Academic_Ability: -15 },
          flavor_text: '你把键盘一推，直接罢工。大哭一场后心情好多了，但这个项目的进度彻底完蛋了。'
        }
      ]
    }]
  },

  'loc_ir_data_clean': {
    event_id: 'loc_ir_data_clean', type: 'location', title: '廉价劳动力',
    scenes: [{
      text: '教授丢给你一个包含十万条脏数据的 Excel 表格，让你周末前清理干净。这活毫无技术含量。',
      bg: 'assets/images/events/research.png',
      choices: [
        {
          text: '老老实实当黑工',
          effects: { Mental_Health: -20, Physical_Health: -10 },
          flavor_text: '你点鼠标点到手抽筋。虽然没学到什么新知识，但教授对你的服从性非常满意，这也许对要推荐信有帮助。'
        },
        {
          text: '花钱买个脚本自动处理',
          effects: { Money: -15, Mental_Health: +10 },
          flavor_text: '你在闲鱼上花钱找人写了个 Python 脚本，五分钟搞定。你用省下的时间看了一部电影。'
        }
      ]
    }]
  },

  'loc_ir_professor_meeting': {
    event_id: 'loc_ir_professor_meeting', type: 'location', title: '组会拷问',
    scenes: [{
      text: '在周度组会上，教授突然点名让你汇报最近阅读的文献。你其实只看了个摘要。',
      bg: 'assets/images/events/research.png',
      choices: [
        {
          text: '硬着头皮瞎编',
          effects: { Mental_Health: -25, Academic_Ability: -5 },
          flavor_text: '教授一眼看穿了你的窘迫，当着全组的面把你批评了一顿。你恨不得找个地缝钻进去。'
        },
        {
          text: '坦诚道歉，保证下次补上',
          effects: { Mental_Health: -10, Academic_Ability: +5 },
          flavor_text: '你诚恳地承认了错误。教授虽然不悦，但也没有过多刁难。你暗下决心今晚回去把文献读完。'
        }
      ]
    }]
  },

  'loc_ia_anxiety_talk': {
    event_id: 'loc_ia_anxiety_talk', type: 'location', title: '残酷的现实',
    scenes: [{
      text: 'IA 的老师给你看了一份往届录取数据：“以你目前的背景，想申 G5 几乎是不可能的，建议降低预期。”',
      bg: 'assets/images/events/office.png',
      choices: [
        {
          text: '不信邪，偏要头铁冲刺',
          effects: { Mental_Health: -15, Academic_Ability: +15, English_Ability: +15 },
          flavor_text: '这句话激起了你的斗志。你把目标院校的 Logo 设为壁纸，开始了破釜沉舟的复习。'
        },
        {
          text: '接受现实，调整选校策略',
          effects: { Mental_Health: +15, Academic_Ability: -5 },
          flavor_text: '你叹了口气，把目标从 UCL 换成了排名 100 开外的学校。虽然不甘心，但焦虑感确实减轻了不少。'
        }
      ]
    }]
  },

  'loc_ia_alumni_share': {
    event_id: 'loc_ia_alumni_share', type: 'location', title: '校友分享会',
    scenes: [{
      text: '你参加了一场优秀校友的申研分享会。门票需要 50 元。',
      bg: 'assets/images/events/office.png',
      choices: [
        {
          text: '买票入场，认真做笔记',
          effects: { Money: -5, Academic_Ability: +10, Mental_Health: -10 },
          flavor_text: '干货很多，但校友光鲜亮丽的履历让你深感自己的不足，压力倍增。'
        },
        {
          text: '太贵了，不如回宿舍睡觉',
          effects: { Money: +0, Mental_Health: +10, Physical_Health: +5 },
          flavor_text: '你省下了 50 块钱，并在宿舍度过了一个惬意的下午。'
        }
      ]
    }]
  },

  'loc_gym_heavy_lift': {
    event_id: 'loc_gym_heavy_lift', type: 'location', title: '极限重量',
    scenes: [{
      text: '你在健身房挑战深蹲个人极限。还差最后一下，但你的腿已经开始发抖了。',
      bg: 'assets/images/events/gym.png',
      choices: [
        {
          text: '咬牙硬蹲！',
          effects: { Physical_Health: +25, Mental_Health: +15, Academic_Ability: -10 },
          flavor_text: '你成功突破了极限！多巴胺疯狂分泌，你感觉自己无所不能，但接下来的三天你连楼梯都下不了。'
        },
        {
          text: '安全第一，放弃',
          effects: { Physical_Health: +10, Mental_Health: -5 },
          flavor_text: '你把杠铃放回了架子上。虽然没受伤，但隐隐有些挫败感。'
        }
      ]
    }]
  },

  'loc_gym_yoga': {
    event_id: 'loc_gym_yoga', type: 'location', title: '冥想与拉伸',
    scenes: [{
      text: '你报了一节瑜伽课。教练让你闭上眼睛，清空大脑里所有的 DDL 和雅思单词。',
      bg: 'assets/images/events/gym.png',
      choices: [
        {
          text: '彻底放空自己',
          effects: { Mental_Health: +25, Physical_Health: +15, Money: -10 },
          flavor_text: '伴随着舒缓的音乐，你感受到了久违的宁静。这 100 块钱的课时费花得值。'
        },
        {
          text: '闭着眼睛偷偷背单词',
          effects: { English_Ability: +10, Mental_Health: -15, Physical_Health: +0 },
          flavor_text: '即便在瑜伽垫上，你的大脑依然在高速运转。你记住了几个词根，但下课后感觉比上课前还累。'
        }
      ]
    }]
  },

  'loc_dorm_gaming': {
    event_id: 'loc_dorm_gaming', type: 'location', title: '罪恶的连败',
    scenes: [{
      text: '晚上 10 点，你打开游戏准备“只玩一把就睡”。结果遭遇了史诗级的三连败，队友的嘲讽让你血压飙升。',
      bg: 'assets/images/events/dorm.png',
      choices: [
        {
          text: '怒开下一把，赢了才睡！',
          effects: { Mental_Health: -25, Physical_Health: -20, Academic_Ability: -10 },
          flavor_text: '你一直打到天亮，最终以一波七连败结束了战斗。你不仅没复习，还感觉身体被掏空。'
        },
        {
          text: '强行关机，深呼吸睡觉',
          effects: { Mental_Health: +10, Physical_Health: +15 },
          flavor_text: '你凭借极强的自制力按下了电源键。虽然带着不甘入睡，但第二天醒来时，你庆幸自己做出了正确的决定。'
        }
      ]
    }]
  },

  'loc_dorm_sleep': {
    event_id: 'loc_dorm_sleep', type: 'location', title: '保底的港湾',
    scenes: [{
      text: '外面狂风暴雨，你躺在温暖的被窝里，听着雨声。你现在什么都不想干。',
      bg: 'assets/images/events/dorm.png',
      choices: [
        {
          text: '就这样躺平一天',
          effects: { Mental_Health: +25, Physical_Health: +20, Academic_Ability: -15, English_Ability: -10 },
          flavor_text: '你睡了整整 14 个小时。你的身体和心灵都得到了极大的修复，代价是你的学习进度被别人远远甩开。'
        }
      ]
    }]
  },

};