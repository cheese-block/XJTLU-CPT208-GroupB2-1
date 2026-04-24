/**
 * @fileoverview 事件数据库
 */

const RAW_EVENTS = {

  // ════════════════════════════════════════════════════════
  // 轮回引导剧情
  // ════════════════════════════════════════════════════════

  'tutorial_intro_1': {
    event_id: 'tutorial_intro_1',
    type:     'chain',
    title:    { zh: '延毕之灵', en: 'Spirit of Delayed Graduation' },
    scenes: [
      {
        text: { zh: '“你就是这届新来的卷王吗？”\n\n（一个眼袋发黑的半透明学长飘在你的床头。）', en: '"So, you are the new try-hard this year?"\n\n(A half-transparent senior with dark eye bags floats over your bed.)' },
        choices: [
          { text: { zh: '也许是？', en: 'Maybe?' } }
        ]
      },
      {
        text: { zh: '“所以你就是那个每天六点霸占自习室，硬生生拉高专业均分，最后害我没学上的家伙？”', en: '"So you are the one who occupied the study room at 6 AM every day, pushed up the major average, and ruined my chances?"' },
        choices: [
          { text: { zh: '（无动于衷）', en: '(Unmoved)' } }
        ]
      },
      {
        text: { zh: '“好吧……你现在接手这个烂摊子了，祝你好运。这学校里的人都卷疯了，你会见识到的。”', en: '"Fine... this mess is yours now. Good luck. People here are insane with competition. You will see."' },
        choices: [
          { text: { zh: '什么？', en: 'What?' } }
        ]
      },
      {
        text: { zh: '“为了让你的头发在脑袋上多留一阵子，尽力保持顶上那几股数值的平衡吧。【心理】、【身体】、【资金】，不要归零，也别试图彻底塞满它们。持中守正，方能长久。\n\n好吧其实是作者意图增加游戏性的小巧思，请你接受。”', en: '"If you want to keep your hair a bit longer, keep those top stats balanced: [Mental], [Physical], and [Money]. Do not let them hit zero, and do not try to max them out either.\n\nOkay, this is actually a gameplay design choice. Please accept it."' },
        choices: [
          { text: { zh: '哦……', en: 'Oh...' } }
        ]
      },
      {
        text: { zh: '“【学力】和【英语】靠事件慢慢涨，期末和雅思会结算。\n\nDemo 里随机池主要在科学楼、宿舍、图书馆和科研中心；别的楼先当逛校园。选项越短越要信直觉——像喝酒伤身、睡觉回血这种常识。”', en: '"[Academic] and [English] climb through events; finals and IELTS settle them.\n\nIn this demo, deep pools are Science, Dorm, Library, and IR—other pins are mostly flavor. Short choices follow gut logic: drink hurts sleep heals."' },
        choices: [
          { text: { zh: '听着真麻烦。', en: 'Sounds troublesome.' } }
        ]
      },
      {
        text: { zh: '“申研就是这样。对了，如果你还有余力，记得在校园里多留意那些能增加你【软背景】的机会。现在光有分数可卷不过别人。”', en: '"That is how applications work. Also, if you still have energy, look for chances to improve your [soft background] on campus. Scores alone are not enough anymore."' },
        choices: [
          { text: { zh: '那我该怎么做抉择？', en: 'Then how should I choose?' } }
        ]
      },
      {
        text: { zh: '“选项旁会浮小圆点——悬停就能看见涨跌。别算太多，先练直觉。”', en: '"Dots by choices show deltas on hover. Do not overthink; train your gut."' },
        tip:  { zh: '鼠标悬浮选项即可预览数值变化圆点。', en: 'Hover choices to preview stat dots.' },
        choices: [
          {
            text: { zh: '关灯睡觉', en: 'Lights out, sleep' },
            effects: { Mental_Health: +6, Physical_Health: +6 },
            flavor_text: { zh: '（身体松下来，脑子也安静。）', en: '(Body unwinds; mind quiets.)' }
          },
          {
            text: { zh: '刷手机到天亮', en: 'Scroll phone till dawn' },
            effects: { Mental_Health: -6, Physical_Health: -6 },
            flavor_text: { zh: '（短视频上头，肩颈发硬。）', en: '(Short-video spiral; neck and shoulders lock up.)' }
          }
        ]
      },
      {
        text: { zh: '（延毕之灵若有所思地看着你，然后慢慢飘散了。）\n\n你背上书包，推开了宿舍的门。', en: '(The spirit of delayed graduation stares at you thoughtfully, then slowly fades away.)\n\nYou shoulder your bag and push open the dorm door.' },
        choices: [
          { text: { zh: '进入申请季', en: 'Enter Application Season' } }
        ]
      }
    ],
  },

  'tutorial_intro_2': {
    event_id: 'tutorial_intro_2',
    type:     'chain',
    title:    { zh: '幽魂再临', en: 'Ghost Returns' },
    scenes: [
      {
        text: { zh: '“你就是这届新来的卷王吗？”\n\n（半透明的学长再次飘在你的床头。）', en: '"So, you are the new try-hard this year?"\n\n(The half-transparent senior floats by your bed again.)' },
        choices: [
          { text: { zh: '又来了……', en: 'Again...?' } }
        ]
      },
      {
        text: { zh: '“哈哈，玩笑而已。我知道我们都已经经历过一遍了。这就是申请季的诅咒，明白吗？”', en: '"Haha, just kidding. I know we have done this before. That is the curse of application season, understand?"' },
        choices: [
          { text: { zh: '（保持沉默）', en: '(Stay silent)' } }
        ]
      },
      {
        text: { zh: '“我们会记住这所学校的每一届学生，记住他们每一次因为绩点的妥协，每一次因为雅思的崩溃，久不忘怀……”', en: '"We remember every cohort in this school: every compromise for GPA, every breakdown over IELTS... forever."' },
        choices: [
          { text: { zh: '何意味……', en: 'What does that mean...' } },
          { text: { zh: '怎么做到的……', en: 'How do you even do that...' } }
        ]
      },
      {
        text: { zh: '“据说只有传说中的『保录中介』才能让我们愉快地花钱免除这些受诅咒的劳役，但是他们当真存在吗？”', en: '"They say only the mythical guaranteed-admission agencies can free us from this cursed labor with money. But do they really exist?"' },
        choices: [
          { 
            text: { zh: '不，捷径并不存在。', en: 'No, shortcuts do not exist.' },
            flavor_text: { zh: '“这是个有意思的实证主义说法。尽管我也希望能被花钱捞一把。', en: '"Interesting empiricism. Though I also wish money could save me."' }
          },
          { 
            text: { zh: '他们或许真的存在。', en: 'Maybe they do exist.' },
            flavor_text: { zh: '“有趣的想法。或许捷径真的存在，或许我们会受到折磨不过是因为信息差。', en: '"Interesting thought. Maybe shortcuts exist, and we suffer only because of information gaps."' }
          }
        ]
      },
      {
        text: { zh: '“再去碰碰运气吧，试着别死那么早。”', en: '"Go try your luck again. Try not to die too early."' },
        choices: [
          { 
            text: { zh: '（面对现实）', en: '(Face reality)' },
            flavor_text: { zh: '（幽灵慢悠悠地飘散而去……）', en: '(The ghost drifts away slowly...)' }
          }
        ]
      }
    ],
  },

  // ════════════════════════════════════════════════════════
  // 特殊大事件（Scheduled Events）
  // ════════════════════════════════════════════════════════

  // IA 建筑解锁提示
  'unlock_ia_notice': {
    event_id:      'unlock_ia_notice',
    type:          'scheduled',
    trigger_month: 1,
    title:         { zh: '春招季的暗流', en: 'Undercurrent of Spring Recruiting' },
    scenes: [
      {
        text: { zh: '三月，春招的氛围开始在校园里蔓延。你注意到，最近校园周边多了很多发传单的西装男女。\n\n朋友圈里，已经有同学开始晒出和留学中介的签约合同了。', en: 'In March, the spring recruiting mood spreads across campus. You notice more suited people handing out flyers nearby.\n\nIn social feeds, some classmates are already posting contracts signed with study-abroad agencies.' },
      },
      {
        text: { zh: '申研是一场信息战。也许你该去趟 <span class="text-xjtlu-blue font-bold">IA（国际学术交流中心）</span> 看看了，那里是各大机构和校方合作宣讲的集散地。', en: 'Postgraduate application is an information war. Maybe you should visit <span class="text-xjtlu-blue font-bold">IA (International Academic Exchange Center)</span>, the hub for agency and school joint briefings.' },
        tip:  { zh: '新建筑【IA】已解锁！在地图上点击蓝色高亮的 IA 建筑，可以开始接触并筛选留学中介。', en: 'New building [IA] unlocked! Click the highlighted IA building on the map to start screening agencies.' },
        unlock_building: ['ia'] // 【新增】：声明式解锁建筑，引擎读到此幕时会自动解锁
      }
    ],
  },

  'sem1_final_exam': {
    event_id:      'sem1_final_exam',
    type:          'scheduled',
    trigger_month: 4,
    title:         { zh: '履历封笔之战', en: 'The Final Transcript Battle' },
    scenes: [
      {
        text: { zh: '十二月，苏州的妖风裹挟着湿冷吹过校园。SA 楼的走廊里贴满了各种复习资料，CB 图书馆的座位从清晨六点半就被占满。期末周，到了。', en: 'December in Suzhou. The biting wind carries a damp chill across the campus. Corridors in the SA building are plastered with revision notes, and CB Library seats have been occupied since 6:30 AM. Final Exam Week is here.' },
      },
      {
        text: { zh: '你翻开堆积如山的习题集和试卷，开始了最后的冲刺。这学期你在专业课上流下的每一滴汗水，都将在接下来几天内转化为成绩单上冷冰冰的数字。', en: 'You open your mountain of exercises and past papers for the final sprint. Every drop of sweat shed in your major courses this semester will be converted into cold, hard numbers on your transcript over the next few days.' },
        tip:  { zh: '西浦采用百分制与 GPA 双轨制。对于申请英系名校，均分（百分制）往往比 GPA 更加致命。一门核心专业课的拉胯，可能需要三门选修课才能补回来。', en: 'XJTLU uses both a percentage and GPA system. For top UK universities, the average percentage is often more critical than GPA. A poor grade in a single core module might require three elective courses to compensate.' },
      },
      {
        text: { zh: '最后一门考试结束，你走出考场，冬日的阳光有些刺眼。不管结果如何，在西浦的生活已经成为历史了。', en: 'As the last exam ends, you walk out of the hall into the piercing winter sunlight. Whatever the result, this chapter of life at XJTLU is now history.' },
      },
    ],
  },

  'agency_part1': {
    event_id:     'agency_part1',
    type:         'location',
    title:        { zh: '中介风云：起心动念', en: 'Agency Saga: First Thoughts' },
    scenes: [
      {
        text: { zh: '你走进了 IA（国际学术交流中心）。走廊里贴满了各大留学机构的讲座海报，几个中介老师正在给学生发传单。你意识到，是时候考虑申研的事了。', en: 'You step into the IA (International Academic Exchange Center). The corridors are plastered with posters from various study-abroad agencies, and representatives are busy handing out flyers. It dawns on you: it\'s time to take applications seriously.' },
        choices: [
          {
            text:       { zh: '"急什么，等 7 月放暑假了再慢慢看，先搞期末。"', en: '"What\'s the rush? I\'ll look into it during summer break in July. Finals first."' },
            effects:    { Agency_Score: -10 },
            tags_added: ['Agency_Wait'],
            flavor_text: { zh: '回宿舍后你心安理得地打开了专业课 PPT，打算先把今天的学校课程解决。你决定把这个找中介让人焦虑的问题推迟到暑假再面对。', en: 'Returning to your dorm, you open your lecture slides with a clear conscience. You\'ve successfully postponed the anxiety-inducing agency search until summer.' },
            tip:        { zh: '时间规划雷区：找中介的最晚时间是暑假前！拖到 7-8 月才定中介，会导致背景提升和文书头脑风暴的时间极其被动。', en: 'Time Management Trap: Before summer is the absolute latest you should pick an agency! Delaying until July or August leaves you with dangerously little time for profile building and brainstorming.' },
          },
          {
            text:       { zh: '"确实该开始了，趁此机会现在就去了解一下吧。"', en: '"It really is time to start. I\'ll take this chance to learn more now."' },
            effects:    { Agency_Score: +10 },
            next_event_id: 'agency_investigation',
            tags_added: ['Agency_Start'],
            flavor_text: { zh: '你稍微感到有些紧张，虽然专业课压力很大，但你清楚申研是一场持久战，早起的鸟儿才有虫吃。', en: 'A flutter of nerves hits you. Despite the heavy course load, you know applications are a marathon. The early bird catches the worm.' },
            tip:        { zh: '最佳时间：建议在申请季当年的春节后 (2-4月) 开始接触和筛选中介，为后续的背景提升留出充足时间。', en: 'Optimal Timing: It\'s best to start screening agencies right after Chinese New Year (Feb-Apr) to leave ample time for background enhancement.' },
          },
          {
            text:       { zh: '"中介都是骗钱的，我要全程 DIY！"', en: '"Agencies are just money pits. I\'m going full DIY!"' },
            effects:    {},
            tags_added: ['DIY_Applicant'],
            flavor_text: { zh: '你决定把命运交给自己。省下了几万块钱，但接下来的选校、网申、写文书，将是一场孤独且硬核的战斗。（在可能的完整版中可能会开发 DIY 挑战支线，敬请期待）', en: 'You decide to take your fate into your own hands. You\'ve saved thousands, but the road ahead—selecting schools, navigating portals, writing essays—will be a lonely and hardcore battle. (A DIY challenge branch may be added in the full version.)' },
            tip:        { zh: '硬核之路：DIY 能最大程度锻炼信息检索能力，但需要极强的时间管理、抗压能力和英语写作功底。', en: 'The Hardcore Path: DIY maximizes your information retrieval skills but requires exceptional time management, stress resistance, and English writing proficiency.' },
          },
        ],
      },
    ],
  },

  'agency_investigation': {
    event_id: 'agency_investigation',
    type:     'chain',
    title:    { zh: '中介风云：尽职调查', en: 'Agency Saga: Due Diligence' },
    scenes: [
      {
        text: { zh: '你趁着周末有空，决定先在网上做做功课。面对眼花缭乱的留学市场和各种天花乱坠的宣传，你决定采用哪种方式进行初步筛选？', en: 'With a free weekend, you decide to do some online research. Faced with a dizzying market and extravagant claims, which method will you use for your initial screening?' },
        choices: [
          {
            text:       { zh: '重点看机构官方号发出的"名校 Offer 案例"和"学员好评截图"。', en: 'Focus on official "Elite School Offers" and "Student Success Stories" posted by agencies.' },
            effects:    { Agency_Score: -10 },
            next_event_id: 'agency_consult_1',
            flavor_text: { zh: '看着满屏的录取通知书，你感到一种强烈的安全感，迅速锁定了机构。', en: 'Scrolling through endless offer letters gives you a strong sense of security. You quickly narrow down your choices.' },
            tip:        { zh: '幸存者偏差：机构永远只会展示成功的案例，你永远看不到水面下那些被坑的受害者。', en: 'Survivorship Bias: Agencies only showcase success stories; you\'ll never see the silent victims buried beneath the surface.' },
          },
          {
            text:       { zh: '去小红书、知乎搜索机构名字，看网友评价。', en: 'Search agency names on social media like Xiaohongshu or Zhihu for reviews.' },
            effects:    { Agency_Score: +5 },
            next_event_id: 'agency_consult_1',
            flavor_text: { zh: '你搜了一下午，发现评价好坏参半。你越看越迷茫，不知道该相信谁。', en: 'After an afternoon of searching, you find mixed reviews. The more you read, the more confused you become about who to trust.' },
            tip:        { zh: '信息甄别：社交媒体上的评价极易被水军操控，参考价值有限。', en: 'Information Discernment: Social media reviews are easily manipulated by paid posters; their reference value is limited.' },
          },
          {
            text:       { zh: '通过西浦校友群，联系去年签过这家机构的学长私聊。', en: 'Contact seniors through XJTLU alumni groups who signed with these agencies last year.' },
            effects:    { Agency_Score: +15, Physical_Health: -4 },
            next_event_id: 'agency_consult_1',
            flavor_text: { zh: '几经周折，你终于加上了一位学长。学长告诉你："这家还行，但后期催文书一定要凶一点，不然他们会拖。"', en: 'After some effort, you finally connect with a senior. They tell you: "They\'re okay, but you have to be aggressive about deadlines, or they\'ll procrastinate on your essays."' },
            tip:        { zh: '口碑调研核心：寻找中介最靠谱的方式，是联系该中介的过往真实学生获取反馈。', en: 'Reputation Research: The most reliable way to find an agency is to get feedback from their actual past students.' },
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
    title:          { zh: '中介风云：尽职调查', en: 'Agency Saga: Due Diligence' },
    scenes: [
      {
        text: { zh: '期末终于考完了，暑假近在眼前。你猛然发现周围同学都已经签好中介开始写文书了，你急忙开始做功课。面对眼花缭乱的市场，你决定采用哪种方式进行初步筛选？', en: 'Finals are finally over, and summer is near. Suddenly noticing that all your peers have already signed with agencies and started their essays, you scramble to do your research. Faced with a dizzying market, which method will you use for your initial screening?' },
        choices: [
          {
            text:       { zh: '重点看机构官方号发出的"名校 Offer 案例"和"学员好评截图"。', en: 'Focus on official "Elite School Offers" and "Student Success Stories" posted by agencies.' },
            effects:    { Agency_Score: -10 },
            next_event_id: 'agency_consult_1',
            flavor_text: { zh: '看着满屏的录取通知书，你感到一种强烈的安全感，迅速锁定了机构。', en: 'Scrolling through endless offer letters gives you a strong sense of security. You quickly narrow down your choices.' },
            tip:        { zh: '幸存者偏差：机构永远只会展示成功的案例，你永远看不到水面下那些被坑的受害者。', en: 'Survivorship Bias: Agencies only showcase success stories; you\'ll never see the silent victims buried beneath the surface.' },
          },
          {
            text:       { zh: '去小红书、知乎搜索机构名字，看网友评价。', en: 'Search agency names on social media like Xiaohongshu or Zhihu for reviews.' },
            effects:    { Agency_Score: +5 },
            next_event_id: 'agency_consult_1',
            flavor_text: { zh: '你搜了一下午，发现评价好坏参半。你越看越迷茫，不知道该相信谁。', en: 'After an afternoon of searching, you find mixed reviews. The more you read, the more confused you become about who to trust.' },
            tip:        { zh: '信息甄别：社交媒体上的评价极易被水军操控，参考价值有限。', en: 'Information Discernment: Social media reviews are easily manipulated by paid posters; their reference value is limited.' },
          },
          {
            text:       { zh: '通过西浦校友群，联系去年签过这家机构的学长私聊。', en: 'Contact seniors through XJTLU alumni groups who signed with these agencies last year.' },
            effects:    { Agency_Score: +15, Physical_Health: -4 },
            next_event_id: 'agency_consult_1',
            flavor_text: { zh: '几经周折，你终于加上了一位学长。学长告诉你："这家还行，但后期催文书一定要凶一点，不然他们会拖。"', en: 'After some effort, you finally connect with a senior. They tell you: "They\'re okay, but you have to be aggressive about deadlines, or they\'ll procrastinate on your essays."' },
            tip:        { zh: '口碑调研核心：寻找中介最靠谱的方式，是联系该中介的过往真实学生获取反馈。', en: 'Reputation Research: The most reliable way to find an agency is to get feedback from their actual past students.' },
          },
        ],
      },
    ],
  },

  'agency_consult_1': {
    event_id: 'agency_consult_1',
    type:     'chain',
    title:    { zh: '中介风云：机构巡礼 (1/3)', en: 'Agency Saga: Agency Tour (1/3)' },
    scenes: [
      {
        text: { zh: '你开始了实地考察。在沟通申请流程和目标院校时，两家机构给出了截然不同的方案。你更倾向于哪一种服务模式？', en: 'You begin your field research. When discussing application processes and target schools, two agencies propose vastly different models. Which service style do you prefer?' },
        choices: [
          {
            text:       { zh: '机构甲："无忧托管"模式——所有大学网申账号由总部统一管理，基于内部数据模型，稳拿前 50。', en: 'Agency A: "Carefree Managed" model—all application portals managed by headquarters based on internal data models. Guaranteed Top 50.' },
            effects:    { Agency_Score: -15 },
            next_event_id: 'agency_consult_2',
            flavor_text: { zh: '你觉得这种"全包"服务非常省心，毕竟大四还要忙毕设，有个系统统一管理能避免很多麻烦。', en: 'This "all-inclusive" service sounds perfect. With Year 4 thesis work ahead, having a system handle everything would save you so much trouble.' },
            tip:        { zh: '警惕"保证录取"的承诺，更重要的是拒绝无法提供申请邮箱账号的中介。如果没有控制权，你甚至不知道他们有没有帮你递交申请。', en: 'Beware of "guaranteed admission" promises. Most importantly, refuse any agency that won\'t provide your login credentials. Without control, you won\'t even know if they\'ve submitted your applications.' },
          },
          {
            text:       { zh: '机构乙："共创指导"模式——申请邮箱由你自己注册保管，手把手指导填网申，但你必须每天自己登录检查进度。', en: 'Agency B: "Co-creation" model—you register and keep your own accounts. They guide you through the process, but you must check progress daily yourself.' },
            effects:    { Agency_Score: +15 },
            next_event_id: 'agency_consult_2',
            flavor_text: { zh: '你觉得这家机构有些保守，而且让你自己管邮箱意味着需要投入更多精力。', en: 'This agency feels a bit conservative. Managing your own emails means more effort on your part.' },
            tip:        { zh: '掌握主动权：中介只是辅助，你才是申请的主人。将账号密码握在自己手里是底线。', en: 'Take Ownership: The agency is an assistant; you are the lead. Keeping your own passwords is non-negotiable.' },
          },
        ],
      },
    ],
  },

  'agency_consult_2': {
    event_id: 'agency_consult_2',
    type:     'chain',
    title:    { zh: '中介风云：机构巡礼 (2/3)', en: 'Agency Saga: Agency Tour (2/3)' },
    scenes: [
      {
        text: { zh: '接下来，你询问了最核心的文书创作和后期团队的安排。', en: 'Next, you inquire about the most critical parts: essay creation and the support team structure.' },
        choices: [
          {
            text:       { zh: '机构甲："专属责任制"——唯一主负责顾问，名字写在合同里，文书从零开始写，出稿周期可能比同行多一周。', en: 'Agency A: "Exclusive Responsibility"—a single dedicated consultant named in the contract. Essays written from scratch. Lead times may be a week longer.' },
            effects:    { Agency_Score: +15 },
            next_event_id: 'agency_consult_3',
            flavor_text: { zh: '专属负责听起来不错，但"不套模板"、"出稿慢"让你有些担心赶不上第一批申请的早班车。', en: 'Exclusive responsibility sounds good, but "no templates" and "slower turnaround" make you worry about missing the first round of applications.' },
            tip:        { zh: '确保合同中书写顾问姓名，防止签约后频繁换人。优秀的文书必须经过深度的个人挖掘。', en: 'Ensure the consultant\'s name is in the contract to prevent frequent staff changes. High-quality essays require deep personal digging.' },
          },
          {
            text:       { zh: '机构乙："矩阵式流水线"——即使某个环节的老师请假，系统也会无缝指派同级别专家接手，绝对不耽误进度。', en: 'Agency B: "Matrix Assembly Line"—even if a specific teacher is away, the system seamlessly assigns a peer expert. No delays in progress.' },
            effects:    { Agency_Score: -15 },
            next_event_id: 'agency_consult_3',
            flavor_text: { zh: '"矩阵式团队"听起来非常专业，你觉得这种大机构的标准化流程能保证文书的下限。', en: 'A "Matrix Team" sounds highly professional. You feel a large institution\'s standardized process will at least guarantee a certain quality floor.' },
            tip:        { zh: '所谓"无缝接手"往往是频繁更换顾问的遮羞布。流水线作业极易导致文书千篇一律，缺乏个人特色。', en: 'The term "seamless assignment" is often a mask for high consultant turnover. Assembly-line work results in cookie-cutter essays that lack personal flair.' },
          },
        ],
      },
    ],
  },

  'agency_consult_3': {
    event_id: 'agency_consult_3',
    type:     'chain',
    title:    { zh: '中介风云：机构巡礼 (3/3)', en: 'Agency Saga: Agency Tour (3/3)' },
    scenes: [
      {
        text: { zh: '最终到了看合同的环节。面对厚厚的条款和报价单，你需要做出最后的决定。', en: 'Finally, it\'s time to review the contracts. Facing thick terms and price lists, you must make your final decision.' },
        choices: [
          {
            text:       { zh: '机构甲："早鸟优惠"全款——今天签约享 15% 折扣，需一次性付清。零录取则扣除行政建档费和翻译费后退还剩余。', en: 'Agency A: "Early Bird" Full Payment—15% discount for signing today, paid upfront. If no admissions, the remainder is refunded minus filing and translation fees.' },
            effects:    { Agency_Score: -20, Money: -15 },
            next_event_id: 'agency_settlement',
            flavor_text: { zh: '15% 的折扣让你非常心动。你拿起了签字笔……', en: 'A 15% discount is very tempting. You pick up the pen...' },
            tip:        { zh: '强烈建议阶段性付款。退款条款必须明确"全拒得"的具体退款比例，警惕"酌情扣除部分费用"这种模糊字眼。', en: 'Staged payments are highly recommended. Refund terms must specify the exact percentage for "all-rejections," and beware of vague phrases like "discretionary deductions."' },
          },
          {
            text:       { zh: '机构乙："阶段付款"无折扣——费用分三期，首个 Offer 后付尾款。全拒得服务费 100% 全退，但申请费需额外自理。', en: 'Agency B: "Staged Payments" (No Discount)—fees split into three installments; the balance is due after the first Offer. 100% service fee refund for rejections, but you pay application fees.' },
            effects:    { Agency_Score: +15, Money: -20 },
            next_event_id: 'agency_settlement',
            flavor_text: { zh: '没有折扣让你有些肉痛，而且还需要额外自理申请费。但分期付款确实减轻了当下的资金压力。你拿起了签字笔……', en: 'The lack of discount stings, and paying application fees yourself is an extra cost. But installments ease the immediate financial burden. You pick up the pen...' },
            tip:        { zh: '阶段性付款能最大程度约束中介的后期服务质量。提前确认附加费用，避免后期隐形消费扯皮。', en: 'Staged payments maximize leverage over the agency\'s quality of service. Confirm all additional costs upfront to avoid hidden charges later.' },
          },
        ],
      },
    ],
  },

  'agency_settlement': {
    event_id: 'agency_settlement',
    type:     'chain',
    title:    { zh: '中介风云：尘埃落定', en: 'Agency Saga: The Dust Settles' },
    scenes: [
      {
        text: { zh: '经过漫长的对比和谈判，你终于签下了一份合同。', en: 'After long comparisons and negotiations, you finally sign a contract.' },
        choices: [
          {
            text: { zh: '查看最终签约结果', en: 'View the final signing result' },
            flavor_text: { zh: '至于结果如何，时间会给出答案。', en: 'As for the outcome, only time will tell.' },
            flavor_text_variants: [
              {
                required_stat: { stat: 'Agency_Score', min: 40 },
                tags_added: ['Reliable_Agency', 'Perfect_Agency'],
                type: 'positive',
                text: { zh: '凭借着极高的防坑意识，你成功避开了所有深坑，签订了一份几乎完美的合同。你不仅找了一个得力的辅助，更把主动权死死地焊在了自己手里。', en: 'With exceptional awareness, you dodged every pitfall and secured a nearly perfect contract. You haven\'t just found a capable assistant; you\'ve welded the steering wheel firmly into your own hands.' },
              },
              {
                required_stat: { stat: 'Agency_Score', min: 0, max: 39 },
                tags_added: ['Reliable_Agency'],
                type: 'neutral',
                text: { zh: '你避开了一些明显的陷阱，但在某些看似"行业标准"的条款上还是妥协了。这份合同中规中矩，未来的申请结果，只能祈祷分给你的老师足够负责了。', en: 'You avoided the obvious traps but compromised on several "industry standard" terms. The contract is mediocre; for your future applications, you can only pray that your assigned mentor is responsible enough.' },
              },
              {
                required_stat: { stat: 'Agency_Score', max: -1 },
                tags_added: ['Scam_Agency'],
                type: 'negative',
                text: { zh: '你在一声声"保录"和"无忧托管"的承诺中迷失了自我。你丝毫没有意识到，命运的绞索已经悄悄套在了脖子上。', en: 'Lulled by promises of "guaranteed admission" and "hands-off management," you lost yourself. You haven\'t noticed that fate\'s noose is already tightening around your neck.' },
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
    title:         { zh: '大三下 · 期末考试', en: 'Y3S2 Final Exams' },
    scenes: [
      {
        text: { zh: '六月，苏州进入了漫长的梅雨季节。大三下学期的期末考试悄然而至，这也是申研前最重要的一次成绩定格。', en: 'June. Suzhou enters the long, humid plum rain season. The Year 3 Semester 2 finals arrive quietly—the most crucial grade settlement before your applications.' },
      },
      {
        text: { zh: '考场里空调嗡嗡作响，你盯着试卷，努力把这学期积累的知识转化为分数。', en: 'The air conditioner hums in the exam hall. Staring at the paper, you strive to translate a semester\'s worth of accumulated knowledge into points.' },
        tip:  { zh: '核心要点：大三下的成绩对申研至关重要！这是你递交申请时，招生官能看到的最新、最完整的一份成绩单。', en: 'Core Point: Y3S2 grades are vital! This is the most recent and complete transcript admissions officers will see when you submit your application.' },
      },
      {
        text: { zh: '交卷的那一刻，你感到一阵轻松，又夹杂着一丝对未来的茫然。大三，就这样结束了。', en: 'The moment you hand in the paper, a sense of relief mixes with a slight haze about the future. Year 3 has come to an end.' },
      },
    ],
  },

  'summer_internship_decision': {
    event_id:      'summer_internship_decision',
    type:          'scheduled',
    trigger_month: 2,
    title:         { zh: '暑期去向：弯道超车还是原地踏步？', en: 'Summer Plans: Sprint Ahead or Stay Put?' },
    scenes: [
      {
        text: { zh: '七月，暑假开始了。微信群里，同学们开始分享各自的计划：有人去了大厂实习，有人报了封闭式雅思班，有人选择出去旅行，还有人还没想好。', en: 'July. Summer break begins. In WeChat groups, classmates share their plans: some at Big Tech internships, some in intensive IELTS bootcamps, some traveling, others still undecided.' },
      },
      {
        text: { zh: '你的手机屏幕上同时打开着三个页面：某大厂的实习 JD、一个昂贵的雅思强化班报名链接，以及……一张机票比价网站。暑假两个月，怎么用？', en: 'Your phone screen shows three tabs: an internship JD from a tech giant, an expensive IELTS bootcamp signup, and... a flight price comparison site. How will you spend these two months?' },
        tip:  { zh: '规划指南：暑期是申研准备的最后一段黄金时期。实习能大幅强化软背景，雅思备考能解决语言死线。两者不可兼得时，需根据自身最致命的短板来抉择。', en: 'Planning Guide: Summer is the final golden window for preparation. Internships significantly boost your soft background, while IELTS prep tackles language deadlines. If you can\'t have both, choose based on your most critical weakness.' },
        choices: [
          {
            text:       { zh: '全力冲刺雅思，报名封闭强化班', en: 'Full IELTS sprint: Enroll in an intensive bootcamp' },
            effects:    { English_Ability: +6, Money: -15, Physical_Health: -10 },
            tags_added: [],
            flavor_text: { zh: '你交了学费，每天八小时高强度刷题。暑假结束时，你的耳朵对英音产生了条件反射，但连续的熬夜让你的黑眼圈深了不少。', en: 'Tuition paid. Eight hours of high-intensity practice daily. By the end of summer, your ears react instinctively to British accents, but consecutive all-nighters have deepened your dark circles.' },
            tip:        { zh: '语言成绩是很多人的阿喀琉斯之踵。集中精力解决它是非常务实的选择。', en: 'Language scores are the Achilles\' heel for many. Focusing energy on resolving it is a very pragmatic choice.' },
          },
          {
            text:       { zh: '去大厂实习，积累真实项目经验', en: 'Big Tech internship: Gain real project experience' },
            effects:    { Money: +18, Physical_Health: -12, Mental_Health: +6 },
            tags_added: ['Internship_Exp'],
            flavor_text: { zh: '你成功拿到了一份为期八周的实习。每天挤地铁、开会、写周报。工资不多，但简历上多了一行沉甸甸的真实经历。', en: 'Successfully landed an eight-week internship. Commuting, meetings, and weekly reports. The pay is modest, but your resume now boasts a substantial line of real experience.' },
            tip:        { zh: '对于申请偏就业导向的硕士项目，一段对口的实习经历往往比高出 0.5 分的雅思更有说服力。', en: 'For career-oriented Master\'s programs, a relevant internship is often more persuasive than an extra 0.5 on your IELTS score.' },
          },
          {
            text:       { zh: '好好休息，为大四养精蓄锐', en: 'Proper rest: Recharge for the final year' },
            effects:    { Mental_Health: +10, Physical_Health: +12 },
            tags_added: [],
            flavor_text: { zh: '你拒绝了所有的内卷邀约，睡到自然醒，追完了几部剧。开学时你神清气爽——但隐约觉得，同学们的简历似乎比你厚了一大截。', en: 'You declined all \'try-hard\' invitations, slept in, and binged several shows. You feel refreshed for the new term—but can\'t help noticing your peers\' resumes look much thicker than yours.' },
            tip:        { zh: '休息固然重要，但在竞争白热化的申请季前夕选择彻底躺平，可能需要你在大四付出成倍的代价来偿还。', en: 'Rest is important, but choosing to completely \'lie flat\' right before a cutthroat application season might cost you double the effort to catch up later.' },
          },
        ],
      },
    ],
  },

  'ielts_guarantee': {
    event_id:      'ielts_guarantee',
    type:          'scheduled',
    trigger_month: 2,
    required_tags: [],
    forbidden_tags: ['IELTS_5.5', 'IELTS_6.0', 'IELTS_6.5', 'IELTS_7.0', 'IELTS_7.5'],
    title:         { zh: '最后的考位', en: 'The Last Slot' },
    scenes: [
      {
        text: { zh: '八月了，你还没有考出雅思成绩。你刷了整整两天官网，终于抢到了一个别人退掉的考位。这是暑假结束前最后的机会了。', en: 'It\'s August, and you still don\'t have an IELTS score. After refreshing the official site for two days, you finally snag a canceled slot. This is your last chance before summer ends.' },
        tip:  { zh: '语言成绩是申请的硬门槛。如果这次还考不出来，申请季将非常被动。', en: 'Language scores are a hard threshold. Failing to get a result now will leave you in a very vulnerable position during application season.' },
        choices: [
          {
            text:    { zh: '立刻报名，背水一战', en: 'Register immediately: One last stand' },
            effects: { Money: -10 },
            flavor_text: { zh: '你咬咬牙交了报名费。没有退路了。', en: 'You grit your teeth and pay the fee. There\'s no turning back now.' },
            next_event_id: 'ielts_exam_result',
          },
          {
            text:    { zh: '算了，等开学再说', en: 'Forget it, wait until the term starts' },
            effects: { Mental_Health: +5 },
            flavor_text: { zh: '你关掉了报名页面。开学后考位会更紧张，但你实在没有勇气面对又一次考试。', en: 'You close the tab. Slots will be even scarcer once the term starts, but you simply lack the courage to face another exam right now.' },
            tip:     { zh: '拖延是雅思备考最大的敌人。越往后拖，压力越大，出分越难。', en: 'Procrastination is the greatest enemy of IELTS prep. The longer you wait, the higher the pressure and the harder it is to score.' },
          },
        ],
      },
    ],
  },

  'final_application': {
    event_id:      'final_application',
    type:          'scheduled',
    trigger_month: 12,
    title:         { zh: '递交申请：掷出命运的骰子', en: 'Submit Application: Roll the Dice of Fate' },
    scenes: [
      {
        text: { zh: '大四九月。申请季正式拉开帷幕。你坐在电脑前，盯着十几所学校的网申系统。这一年半（以及过去三年）的准备，浓缩成了这个界面上的几个填写框。', en: 'September, Year 4. The application season officially begins. Sitting before your computer, you stare at the online portals for a dozen universities. Preparation from the last year and a half—and indeed, the past three years—is now condensed into a few text boxes on this interface.' },
      },
      {
        text: { zh: 'PS 改了十几稿，推荐信找了三位教授，成绩单已经盖章扫描。你检查了最后一遍材料，你的履历，就是你这四年的全部答案。', en: 'The Personal Statement has been through dozens of drafts, three professors provided references, and transcripts are stamped and scanned. You check your materials one last time. Your profile is the cumulative answer to your last four years.' },
        tip:  { zh: '申请季核心：材料递交只是第一步。在真实的申请中，后续的面试邀约、占位费缴纳、甚至是配语言班（Pre-sessional）的决策，同样决定了你最终的去向。', en: 'Application Core: Submission is only the first step. In reality, subsequent interview invites, deposit payments, and even pre-sessional English course decisions will determine your final destination.' },
      },
      {
        text: { zh: '你深吸一口气，点下了 Submit 按钮。\n\n屏幕上弹出了绿色的 "Application Submitted"。\n\n接下来，只能交给时间了。', en: 'You take a deep breath and hit the \'Submit\' button.\n\nA green \'Application Submitted\' message pops up on the screen.\n\nNow, it\'s all up to time.' },
      },
    ],
  },


  // ════════════════════════════════════════════════════════
  // 地点事件：SA~SD 专业课楼（单卡一句；选项短、因果直觉；避免波动换积累）
  // ════════════════════════════════════════════════════════

  'loc_sb_001': {
    event_id: 'loc_sb_001', type: 'location', title: { zh: '蓝屏', en: 'Blue Screen' },
    scenes: [{
      text: { zh: '机房跑到 99% 蓝屏，你没保存。', en: 'The lab PC bluescreens at 99%. You never saved.' },
      choices: [
        {
          text: { zh: '呆坐瞪屏', en: 'Stare at the screen' },
          effects: { Mental_Health: -8, Physical_Health: -3 },
          flavor_text: { zh: '胸闷，脖子僵。', en: 'Tight chest, stiff neck.' }
        },
        {
          text: { zh: '关机去食堂', en: 'Shut down and eat' },
          effects: { Money: -6, Mental_Health: +5 },
          flavor_text: { zh: '热饭下肚，人先活过来。', en: 'Hot food brings you back.' }
        }
      ]
    }]
  },

  'loc_sb_002': {
    event_id: 'loc_sb_002', type: 'location', title: { zh: '完美数据', en: 'Perfect Data' },
    scenes: [{
      text: { zh: '实验一次过线，教授点头。', en: 'Lab data lands on the curve; the prof nods.' },
      choices: [
        {
          text: { zh: '收工开黑', en: 'Call it a win, go game' },
          effects: { Mental_Health: +7, Academic_Ability: +4 },
          flavor_text: { zh: '轻松+1，笔记也记了两行。', en: 'Light mood; you still jot notes.' }
        },
        {
          text: { zh: '换仪器重测', en: 'Retest on another rig' },
          effects: { Physical_Health: -5, Academic_Ability: +6 },
          flavor_text: { zh: '折腾，但搞懂了误差从哪来。', en: 'Painful, but you learn where error comes from.' }
        }
      ]
    }]
  },

  'loc_sb_003': {
    event_id: 'loc_sb_003', type: 'location', title: { zh: '问路', en: 'Directions' },
    scenes: [{
      text: { zh: '留学生拦住你问 SA214。', en: 'A student asks where SA214 is.' },
      choices: [
        {
          text: { zh: '带上楼聊两句', en: 'Walk them up, chat' },
          effects: { English_Ability: +3, Physical_Health: -4 },
          flavor_text: { zh: '多爬两层，嘴也顺了。', en: 'Stairs and small talk.' }
        },
        {
          text: { zh: '指个大概', en: 'Point roughly' },
          effects: { English_Ability: +1, Mental_Health: +3 },
          flavor_text: { zh: '省事，心里略虚。', en: 'Quick; slight guilt.' }
        }
      ]
    }]
  },

  'loc_sb_004': {
    event_id: 'loc_sb_004', type: 'location', title: { zh: '讲座零食', en: 'Lecture Snacks' },
    scenes: [{
      text: { zh: '冗长讲座，后排免费零食山。', en: 'Long talk; free snacks at the back.' },
      choices: [
        {
          text: { zh: '后排开吃', en: 'Snack in the back' },
          effects: { Money: +6, Mental_Health: +8, Physical_Health: -8 },
          flavor_text: { zh: '甜腻犯困，腰也坐酸。', en: 'Sugar crash, stiff back.' }
        },
        {
          text: { zh: '硬听', en: 'Force yourself to listen' },
          effects: { Academic_Ability: +6, Physical_Health: -5 },
          flavor_text: { zh: '累，但抓到几句关键词。', en: 'Tired; a few keywords stick.' }
        }
      ]
    }]
  },

  'loc_sb_005': {
    event_id: 'loc_sb_005', type: 'location', title: { zh: '耳机没电', en: 'Headphones Dead' },
    scenes: [{
      text: { zh: '邻座青轴狂敲，耳机低电关机。', en: 'Clicky keys next to you; your ANC dies.' },
      choices: [
        {
          text: { zh: '进入心流硬写', en: 'Lock in and write' },
          effects: { Mental_Health: +5, Academic_Ability: +5 },
          flavor_text: { zh: '烦归烦，写顺了。', en: 'Noisy but you find flow.' }
        },
        {
          text: { zh: '买咖啡换座', en: 'Coffee, change seat' },
          effects: { Money: -8, Mental_Health: +8 },
          flavor_text: { zh: '换个角落，清静点。', en: 'Quieter corner.' }
        }
      ]
    }]
  },

  'loc_sb_006': {
    event_id: 'loc_sb_006', type: 'location', title: { zh: 'TA 提问', en: 'TA Question' },
    scenes: [{
      text: { zh: 'TA 指着你的代码问 Why here?', en: 'The TA points at your code: "Why here?"' },
      choices: [
        {
          text: { zh: '承认抄了 SO', en: 'Admit StackOverflow' },
          effects: { Mental_Health: +8, English_Ability: +2 },
          flavor_text: { zh: '松一口气，口语也顺了。', en: 'Relief; English flows.' }
        },
        {
          text: { zh: '现场编理由', en: 'Improvise' },
          effects: { Physical_Health: -4, English_Ability: +3 },
          flavor_text: { zh: '紧张，但练了嘴皮子。', en: 'Stress, but practice.' }
        }
      ]
    }]
  },

  'loc_sb_007': {
    event_id: 'loc_sb_007', type: 'location', title: { zh: '丢伞', en: 'Lost Umbrella' },
    scenes: [{
      text: { zh: '暴雨，你的伞没了，架上有把黑伞。', en: 'Storm; your umbrella is gone; a black one sits there.' },
      choices: [
        {
          text: { zh: '借用黑伞', en: 'Borrow the black one' },
          effects: { Mental_Health: -6, Physical_Health: +8 },
          flavor_text: { zh: '干着回屋，心里发虚。', en: 'Dry home, guilty mind.' }
        },
        {
          text: { zh: '顶包冲雨', en: 'Bag over head, run' },
          effects: { Physical_Health: -12, Mental_Health: +8, Money: -4 },
          flavor_text: { zh: '狼狈，但觉得自己挺硬气。', en: 'Soaked; oddly proud.' }
        }
      ]
    }]
  },

  'loc_sb_008': {
    event_id: 'loc_sb_008', type: 'location', title: { zh: '迟到', en: 'Late' },
    scenes: [{
      text: { zh: '迟到五十分钟，教授在传签到表。', en: 'Fifty minutes late; sign-in sheet up front.' },
      choices: [
        {
          text: { zh: '溜去前排签', en: 'Sneak to sign' },
          effects: { Mental_Health: -10, Physical_Health: -4 },
          flavor_text: { zh: '社死，但签上了。', en: 'Awkward; signed.' }
        },
        {
          text: { zh: '后排补觉', en: 'Back row nap' },
          effects: { Mental_Health: +6, Physical_Health: +8 },
          flavor_text: { zh: '缺勤，但睡饱了。', en: 'Absent; rested.' }
        }
      ]
    }]
  },

  'loc_sb_009': {
    event_id: 'loc_sb_009', type: 'location', title: { zh: '贩卖机卡罐', en: 'Stuck Can' },
    scenes: [{
      text: { zh: '可乐付款后卡在半空。', en: 'Paid; the can hangs mid-air.' },
      choices: [
        {
          text: { zh: '轻踹一脚', en: 'Kick lightly' },
          effects: { Physical_Health: -4, Mental_Health: +6 },
          flavor_text: { zh: '脚趾疼，气顺了点。', en: 'Toe hurts; mood eases.' }
        },
        {
          text: { zh: '再买一瓶砸', en: 'Buy second to dislodge' },
          effects: { Money: -8, Mental_Health: -8 },
          flavor_text: { zh: '两罐一起卡。', en: 'Two stuck now.' }
        }
      ]
    }]
  },

  'loc_sb_010': {
    event_id: 'loc_sb_010', type: 'location', title: { zh: '复习包', en: 'Revision Pack' },
    scenes: [{
      text: { zh: '群里有人卖祖传复习包，¥150。', en: 'Someone sells a revision pack for 150 RMB.' },
      choices: [
        {
          text: { zh: '转账买下', en: 'Buy it' },
          effects: { Money: -12, Academic_Ability: +8 },
          flavor_text: { zh: '省时间，钱包痛。', en: 'Fast; wallet hurts.' }
        },
        {
          text: { zh: '自己啃 PPT', en: 'DIY from slides' },
          effects: { Academic_Ability: +6, Mental_Health: +4 },
          flavor_text: { zh: '慢，但有掌控感。', en: 'Slow; feels earned.' }
        }
      ]
    }]
  },

  'loc_sb_011': {
    event_id: 'loc_sb_011', type: 'location', title: { zh: '查重飙红', en: 'High Similarity' },
    scenes: [{
      text: { zh: 'Turnitin 显示 45%。', en: 'Turnitin says 45%.' },
      choices: [
        {
          text: { zh: '手改降重', en: 'Rewrite by hand' },
          effects: { Physical_Health: -6, Academic_Ability: +5, English_Ability: +3 },
          flavor_text: { zh: '累，句子真懂了。', en: 'Tired; you own the sentences.' }
        },
        {
          text: { zh: '开降重会员', en: 'Pay for paraphrase tool' },
          effects: { Money: -10, Mental_Health: +8 },
          flavor_text: { zh: '省事，钱出去。', en: 'Easy; money out.' }
        }
      ]
    }]
  },

  'loc_sb_012': {
    event_id: 'loc_sb_012', type: 'location', title: { zh: '作业取消', en: 'Assignment Canceled' },
    scenes: [{
      text: { zh: '教授宣布本周作业取消，该项满分。', en: 'Prof cancels this week\'s HW; full credit.' },
      choices: [
        {
          text: { zh: '开玩放松', en: 'Relax and play' },
          effects: { Mental_Health: +7, Physical_Health: +4 },
          flavor_text: { zh: '人松了。', en: 'You unwind.' }
        },
        {
          text: { zh: '当练习写完', en: 'Still do it as drill' },
          effects: { Academic_Ability: +8, Mental_Health: +8 },
          flavor_text: { zh: '无分压力，纯练手。', en: 'No grade pressure; practice.' }
        }
      ]
    }]
  },

  'loc_sb_013': {
    event_id: 'loc_sb_013', type: 'location', title: { zh: 'Grammarly', en: 'Grammarly' },
    scenes: [{
      text: { zh: '免费 Grammarly 提示高级错误，要付费才显示。', en: 'Free Grammarly hides advanced fixes behind paywall.' },
      choices: [
        {
          text: { zh: '充一周会员', en: 'One-week Premium' },
          effects: { Money: -10, English_Ability: +4 },
          flavor_text: { zh: '快，但少琢磨。', en: 'Fast; less thinking.' }
        },
        {
          text: { zh: '手查词典改', en: 'Dictionary grind' },
          effects: { Physical_Health: -5, English_Ability: +5 },
          flavor_text: { zh: '慢，语感上来。', en: 'Slow; intuition grows.' }
        }
      ]
    }]
  },

  'loc_sb_014': {
    event_id: 'loc_sb_014', type: 'location', title: { zh: '走错教室', en: 'Wrong Room' },
    scenes: [{
      text: { zh: '坐错教室，发现是隔壁专业课。', en: 'Wrong class; another major\'s lecture.' },
      choices: [
        {
          text: { zh: '继续听', en: 'Stay and listen' },
          effects: { Academic_Ability: +6, English_Ability: +2 },
          flavor_text: { zh: '蹭到新思路。', en: 'New angle picked up.' }
        },
        {
          text: { zh: '溜走', en: 'Slip out' },
          effects: { Mental_Health: +4 },
          flavor_text: { zh: '少点尴尬。', en: 'Less awkward.' }
        }
      ]
    }]
  },

  'loc_sb_015': {
    event_id: 'loc_sb_015', type: 'location', title: { zh: '桌洞笔记', en: 'Desk Notes' },
    scenes: [{
      text: { zh: '桌洞里有本写满三色笔记的课本。', en: 'A textbook full of color notes in the desk.' },
      choices: [
        {
          text: { zh: '先翻看记下', en: 'Read and copy key bits' },
          effects: { Academic_Ability: +10 },
          flavor_text: { zh: '白嫖重点。', en: 'Free highlights.' }
        },
        {
          text: { zh: '交给失主', en: 'Return to owner' },
          effects: { Mental_Health: +8, English_Ability: +3 },
          flavor_text: { zh: '留学生道谢，聊了两句。', en: 'Thanks; short chat in English.' }
        }
      ]
    }]
  },

  'loc_sb_016': {
    event_id: 'loc_sb_016', type: 'location', title: { zh: '动与读', en: 'Move or Read' },
    scenes: [{
      text: { zh: '一周没动，明早 Seminar 还有两篇英文要读。', en: 'No exercise; two English papers for tomorrow.' },
      choices: [
        {
          text: { zh: '先精读一篇', en: 'Read one paper first' },
          effects: { Academic_Ability: +5, English_Ability: +3, Physical_Health: -4 },
          flavor_text: { zh: '久坐，眼酸。', en: 'Long sit; sore eyes.' }
        },
        {
          text: { zh: '去跑步', en: 'Go run' },
          effects: { Physical_Health: +12, Mental_Health: +6 },
          flavor_text: { zh: '文献明天再说。', en: 'Papers can wait.' }
        }
      ]
    }]
  },

  'loc_sb_017': {
    event_id:         'loc_sb_017',
    type:             'location',
    title:            { zh: '课题组邀请', en: 'Lab Invite' },
    scenes: [
      {
        text: { zh: '教授问你要不要来课题组打杂，没钱，发文可挂名。', en: 'Prof offers unpaid lab grunt work; paper credit possible.' },
        tip:  { zh: '软背景：LoR 与科研经历重要，但要量力而行。', en: 'LoR and research matter; pace yourself.' },
        choices: [
          {
            text:       { zh: '加入', en: 'Join' },
            effects:    { Academic_Ability: +8, Physical_Health: -12 },
            tags_added: ['Research_Exp'],
            flavor_text: { zh: '忙到飞起，学到真东西。', en: 'Busy; real skills.' },
          },
          {
            text:       { zh: '婉拒', en: 'Decline politely' },
            effects:    { Mental_Health: +6, Physical_Health: +6 },
            flavor_text: { zh: '睡眠保住了。', en: 'Sleep saved.' },
          },
        ],
      },
    ],
  },

  // ════════════════════════════════════════════════════════
  // 地点事件：CB 图书馆
  // ════════════════════════════════════════════════════════

  'loc_cb_ielts_opportunity': {
    event_id:         'loc_cb_ielts_opportunity',
    type:             'location',
    title:            { zh: '极限捡漏', en: 'Last-Minute Slot' },
    repeatable:       true,           // 【新增】：声明此事件可多次触发
    forbidden_tags:   ['IELTS_7.5'],  // 考到最高分后不再触发
    scenes: [
      {
        text: { zh: '刷题头昏，随手刷新雅思官网，跳出下月初退考位，十分钟截止报名。', en: 'You refresh IELTS site; a slot opens; ten minutes to register.' },
        tip:  { zh: '时间规划：雅思成绩有效期为 2 年。最晚应在申请季当年的暑假结束前考出达标成绩。', en: 'Time Management: IELTS results are valid for 2 years. Aim to get your target score before the summer break of your application year.' },
        choices: [
          {
            text:    { zh: '先锁考位', en: 'Lock slot' },
            effects: { Money: -8, Physical_Health: -3 },
            flavor_text: { zh: '你颤抖着扫码付了款。看着日历上标红的考试日期，你的心跳开始加速，接下来的几周注定是地狱模式。', en: 'With trembling hands, you scan the QR code and pay. Seeing the red-marked exam date on your calendar, your heart races. The coming weeks will be pure hell.' },
            next_event_id: 'ielts_exam_result',
          },
          {
            text:    { zh: '理智点，我连剑桥 14 都没刷完……', en: 'Be realistic. I haven\'t even finished Cambridge 14...' },
          },
        ],
      },
    ],
  },

  'loc_cb_quiet_row': {
    event_id: 'loc_cb_quiet_row', type: 'location', title: { zh: '静音区', en: 'Quiet Row' },
    scenes: [{
      text: { zh: '四楼静音区，键盘声像下雨。', en: 'Quiet floor; keyboards patter like rain.' },
      choices: [
        { text: { zh: '埋头写', en: 'Head down, write' }, effects: { Academic_Ability: +5, Physical_Health: -4 } },
        { text: { zh: '换靠窗位', en: 'Move window seat' }, effects: { Mental_Health: +8, English_Ability: +2 } },
      ],
    }],
  },

  'loc_cb_printer': {
    event_id: 'loc_cb_printer', type: 'location', title: { zh: '打印机', en: 'Printer' },
    scenes: [{
      text: { zh: '打印队列前面还有十几份。', en: 'A dozen jobs ahead in the queue.' },
      choices: [
        { text: { zh: '排队等', en: 'Wait in line' }, effects: { Physical_Health: -4, English_Ability: +3 }, flavor_text: { zh: '站着背了几个词。', en: 'Standing; you skim vocab.' } },
        { text: { zh: '回宿舍印', en: 'Print in dorm' }, effects: { Money: -5, Mental_Health: +6 } },
      ],
    }],
  },

  'loc_cb_group_slot': {
    event_id: 'loc_cb_group_slot', type: 'location', title: { zh: '讨论间', en: 'Group Room' },
    scenes: [{
      text: { zh: '预约到了一小时讨论间。', en: 'You booked a one-hour group room.' },
      choices: [
        { text: { zh: '练口语对练', en: 'Speaking drill' }, effects: { English_Ability: +5, Mental_Health: +4, Physical_Health: -3 } },
        { text: { zh: '独自过 PPT', en: 'Solo slides' }, effects: { Academic_Ability: +5, Mental_Health: +5 } },
      ],
    }],
  },

  'loc_cb_stack_books': {
    event_id: 'loc_cb_stack_books', type: 'location', title: { zh: '还书台', en: 'Returns' },
    scenes: [{
      text: { zh: '还书台有人留下一摞专业笔记。', en: 'Someone left a stack of course notes on the returns desk.' },
      choices: [
        { text: { zh: '翻两页记下', en: 'Skim two pages' }, effects: { Academic_Ability: +6 } },
        { text: { zh: '交给前台', en: 'Hand to desk' }, effects: { Mental_Health: +8, Money: +3 }, flavor_text: { zh: '前台登记了失物。', en: 'Staff logs lost-and-found.' } },
      ],
    }],
  },

  'ielts_exam_result': {
    event_id: 'ielts_exam_result',
    type:     'chain',
    title:    { zh: '雅思出分日', en: 'IELTS Result Day' },
    scenes: [
      {
        text: { zh: '两周后，一个普通的下午。你收到了一条来自教育部考试中心的短信。你深吸一口气，颤抖着手登录了查分网站……', en: 'Two weeks later, on an ordinary afternoon. You receive a text from the NEEA. Taking a deep breath, your hands tremble as you log into the results portal...' },
      },
      {
        text: { zh: '（雅思成绩将在此显示）', en: '(IELTS results will be displayed here)' },
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
    event_id: 'loc_ir_data_clean', type: 'location', title: { zh: '洗数据', en: 'Data Cleaning' },
    scenes: [{
      text: { zh: '十万行脏 Excel，周末前要干净。', en: '100k messy rows; clean by weekend.' },
      choices: [
        {
          text: { zh: '手点清洗', en: 'Click-clean by hand' },
          effects: { Physical_Health: -7, Mental_Health: -5 },
          flavor_text: { zh: '手酸，但不用动脑子。', en: 'Sore hands; mindless.' },
        },
        {
          text: { zh: '花钱买脚本', en: 'Buy a script' },
          effects: { Money: -10, Mental_Health: +8, Physical_Health: +4 },
          flavor_text: { zh: '省事，钱包轻一点。', en: 'Easy; lighter wallet.' },
        },
      ],
    }],
  },

  'loc_ir_professor_meeting': {
    event_id: 'loc_ir_professor_meeting', type: 'location', title: { zh: '组会提问', en: 'Meeting Question' },
    scenes: [{
      text: { zh: '组会突然让你讲本周文献。', en: 'You are asked to present this week\'s papers.' },
      choices: [
        {
          text: { zh: '坦白只看了摘要', en: 'Admit skim only' },
          effects: { Mental_Health: +6, Academic_Ability: +4 },
          flavor_text: { zh: '挨两句批，但知道该补哪。', en: 'Scolded; you know what to read.' },
        },
        {
          text: { zh: '硬扯两句', en: 'Bluff briefly' },
          effects: { Mental_Health: -8, Physical_Health: -4 },
          flavor_text: { zh: '紧张到胃抽。', en: 'Stress stomach.' },
        },
      ],
    }],
  },

  'loc_ir_paper_publish': {
    event_id: 'loc_ir_paper_publish', type: 'location', title: { zh: '排版换署名', en: 'Format for Credit' },
    scenes: [{
      text: { zh: '教授问谁愿意通宵排版换四作。', en: 'Prof needs overnight formatting; fourth author offered.' },
      choices: [
        {
          text: { zh: '接活', en: 'Take it' },
          effects: { Academic_Ability: +8, Physical_Health: -7 },
          flavor_text: { zh: '通宵换一行署名。', en: 'All-nighter for author line.' },
        },
        {
          text: { zh: '婉拒', en: 'Decline' },
          effects: { Mental_Health: +8, Physical_Health: +8 },
          flavor_text: { zh: '睡觉优先。', en: 'Sleep first.' },
        },
      ],
    }],
  },

  'loc_ir_equipment_booking': {
    event_id: 'loc_ir_equipment_booking', type: 'location', title: { zh: '仪器时段', en: 'Equipment Slot' },
    scenes: [{
      text: { zh: '只剩深夜仪器位，明早八点有课。', en: 'Only a midnight slot; 8 AM class tomorrow.' },
      choices: [
        {
          text: { zh: '约深夜', en: 'Book midnight' },
          effects: { Academic_Ability: +7, Physical_Health: -8 },
          flavor_text: { zh: '数据有了，人蔫了。', en: 'Data in; body out.' },
        },
        {
          text: { zh: '下周再说', en: 'Wait a week' },
          effects: { Mental_Health: +8, Physical_Health: +6 },
          flavor_text: { zh: '节奏慢一点。', en: 'Slower pace.' },
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
    event_id: 'loc_dorm_001', type: 'location', title: { zh: '真题垫显示器', en: 'IELTS Books as Stand' },
    scenes: [{
      text: { zh: '剑桥真题还在垫显示器。', en: 'Cambridge books still under your monitor.' },
      choices: [
        {
          text: { zh: '闲鱼出掉', en: 'Sell on Xianyu' },
          effects: { Money: +6, Mental_Health: +5 },
          flavor_text: { zh: '到账轻松。', en: 'Cash in; lighter mood.' }
        },
        {
          text: { zh: '做一套听力', en: 'One listening test' },
          effects: { English_Ability: +4, Physical_Health: -4 },
          flavor_text: { zh: '久坐脖子酸。', en: 'Stiff neck from sitting.' }
        }
      ]
    }]
  },

  'loc_dorm_002': {
    event_id: 'loc_dorm_002', type: 'location', title: { zh: '泡面夜', en: 'Ramen Night' },
    scenes: [{
      text: { zh: '室友端出违规锅煮面，月底你零钱不多。', en: 'Roommate cooks illegal-pot ramen; you are low on cash.' },
      choices: [
        {
          text: { zh: '蹭一碗', en: 'Join the bowl' },
          effects: { Money: +6, Mental_Health: +6, Physical_Health: -8 },
          flavor_text: { zh: '咸香快乐，略肿。', en: 'Salty joy; bit bloated.' }
        },
        {
          text: { zh: '点沙拉', en: 'Order salad' },
          effects: { Money: -8, Physical_Health: +6, Mental_Health: +4 },
          flavor_text: { zh: '花钱吃草，心里平衡。', en: 'Paid greens; feels fair.' }
        }
      ]
    }]
  },

  'loc_dorm_003': {
    event_id: 'loc_dorm_003', type: 'location', title: { zh: '室友开黑', en: 'Roommate Gaming' },
    scenes: [{
      text: { zh: '凌晨室友喊麦打 CS2。', en: 'Roommate shouts in CS2 at 1 AM.' },
      choices: [
        {
          text: { zh: '耳塞背单词', en: 'Earplugs, vocab' },
          effects: { English_Ability: +3, Mental_Health: -6 },
          flavor_text: { zh: '烦但背了几个词。', en: 'Annoying; a few words stick.' }
        },
        {
          text: { zh: '加入一局', en: 'Join one match' },
          effects: { Mental_Health: +6, Physical_Health: -8 },
          flavor_text: { zh: '爽完眼干。', en: 'Fun; dry eyes.' }
        }
      ]
    }]
  },

  'loc_dorm_004': {
    event_id: 'loc_dorm_004', type: 'location', title: { zh: '学习 vlog', en: 'Study VLOG' },
    scenes: [{
      text: { zh: '推送了一个四小时学习 vlog。', en: 'A 4-hour study VLOG pops up.' },
      choices: [
        {
          text: { zh: '看半小时当学了', en: 'Watch 30 min "as study"' },
          effects: { Mental_Health: +6, Physical_Health: -4 },
          flavor_text: { zh: '云学习，人放松。', en: 'Parasocial chill.' }
        },
        {
          text: { zh: '关掉刷题', en: 'Close and drill' },
          effects: { Academic_Ability: +6, Physical_Health: -5 },
          flavor_text: { zh: '久坐腰酸。', en: 'Sore back from sitting.' }
        }
      ]
    }]
  },

  'loc_dorm_005': {
    event_id: 'loc_dorm_005', type: 'location', title: { zh: 'Steam 打折', en: 'Steam Sale' },
    scenes: [{
      text: { zh: '愿望单大作史低。', en: 'Wishlist AAA hits all-time low.' },
      choices: [
        {
          text: { zh: '买下', en: 'Buy' },
          effects: { Money: -8, Mental_Health: +7 },
          flavor_text: { zh: '快乐充值。', en: 'Joy purchase.' }
        },
        {
          text: { zh: '云通关', en: 'Watch playthrough' },
          effects: { Money: +4, Mental_Health: +6 },
          flavor_text: { zh: '省钱略馋。', en: 'Saved; mild FOMO.' }
        }
      ]
    }]
  },

  'loc_dorm_006': {
    event_id: 'loc_dorm_006', type: 'location', title: { zh: '代写请求', en: 'Coding Favor' },
    scenes: [{
      text: { zh: '同学出六百求你改 Java 作业。', en: 'Classmate offers 600 RMB to fix Java homework.' },
      choices: [
        {
          text: { zh: '接活', en: 'Take the job' },
          effects: { Money: +12, Academic_Ability: +6, Physical_Health: -8 },
          flavor_text: { zh: '钱到手，熬了夜。', en: 'Paid; late night.' }
        },
        {
          text: { zh: '拒了', en: 'Refuse' },
          effects: { Mental_Health: +5, Physical_Health: +4 },
          flavor_text: { zh: '早睡。', en: 'Early sleep.' }
        }
      ]
    }]
  },

  'loc_dorm_007': {
    event_id: 'loc_dorm_007', type: 'location', title: { zh: '失眠', en: 'Insomnia' },
    scenes: [{
      text: { zh: '三点还醒着，脑子停不下来。', en: '3 AM; mind racing.' },
      choices: [
        {
          text: { zh: '听歌放空', en: 'Music, zone out' },
          effects: { Mental_Health: -8, Physical_Health: -5 },
          flavor_text: { zh: '更清醒了点。', en: 'Oddly more awake.' }
        },
        {
          text: { zh: '刷两道题', en: 'Do two problems' },
          effects: { Academic_Ability: +5, Mental_Health: +6, Physical_Health: -8 },
          flavor_text: { zh: '困意终于来了。', en: 'Sleepiness returns.' }
        }
      ]
    }]
  },

  'loc_dorm_008': {
    event_id: 'loc_dorm_008', type: 'location', title: { zh: '星期四文案', en: 'Thursday Meme' },
    scenes: [{
      text: { zh: '群里狂刷疯狂星期四梗。', en: 'Group chat spams Crazy Thursday memes.' },
      choices: [
        {
          text: { zh: '跟一条玩梗', en: 'Post one too' },
          effects: { Money: +6, Mental_Health: +8 },
          flavor_text: { zh: '有人真发了红包。', en: 'Someone tips you.' }
        },
        {
          text: { zh: '静音写两行', en: 'Mute and write two lines' },
          effects: { Academic_Ability: +4, Mental_Health: +4 },
          flavor_text: { zh: '小进度也是进度。', en: 'Tiny progress counts.' }
        }
      ]
    }]
  },

  'loc_dorm_009': {
    event_id: 'loc_dorm_009', type: 'location', title: { zh: '皮肤涨跌', en: 'Skin Price' },
    scenes: [{
      text: { zh: '两年前五块买的皮肤涨到四百。', en: 'A skin bought for 5 RMB is now 400.' },
      choices: [
        {
          text: { zh: '卖掉落袋', en: 'Sell for profit' },
          effects: { Money: +12, Mental_Health: +6 },
          flavor_text: { zh: '余额好看。', en: 'Nice balance.' }
        },
        {
          text: { zh: '捂盘', en: 'Hold longer' },
          effects: { Money: -6, Mental_Health: -8 },
          flavor_text: { zh: '第二天跌了。', en: 'It dips next day.' }
        }
      ]
    }]
  },

  'loc_dorm_010': {
    event_id: 'loc_dorm_010', type: 'location', title: { zh: '夜聊', en: 'Late Talk' },
    scenes: [{
      text: { zh: '熄灯后室友问毕业能干啥。', en: 'Lights out; roommate asks about jobs.' },
      choices: [
        {
          text: { zh: '聊到四点', en: 'Talk till 4' },
          effects: { Mental_Health: +6, Physical_Health: -12 },
          flavor_text: { zh: '痛快，明早起不来。', en: 'Bonded; no morning.' }
        },
        {
          text: { zh: '戴耳塞睡', en: 'Earplugs, sleep' },
          effects: { Physical_Health: +8, Mental_Health: +4 },
          flavor_text: { zh: '身体感谢。', en: 'Body thanks you.' }
        }
      ]
    }]
  },

  'loc_dorm_011': {
    event_id: 'loc_dorm_011', type: 'location', title: { zh: '公共洗衣机', en: 'Shared Washer' },
    scenes: [{
      text: { zh: '有人用公共机洗袜子。', en: 'Someone washed socks in the shared machine.' },
      choices: [
        {
          text: { zh: '自洁再洗', en: 'Self-clean then wash' },
          effects: { Money: -5, Mental_Health: +6, Physical_Health: +4 },
          flavor_text: { zh: '花小钱买安心。', en: 'Small fee; peace.' }
        },
        {
          text: { zh: '硬着头皮洗', en: 'Wash anyway' },
          effects: { Physical_Health: -10, Mental_Health: -6 },
          flavor_text: { zh: '心里膈应。', en: 'Feels gross.' }
        }
      ]
    }]
  },

  'loc_dorm_012': {
    event_id: 'loc_dorm_012', type: 'location', title: { zh: '临期蛋白粉', en: 'Near-Expiry Whey' },
    scenes: [{
      text: { zh: '学长送半桶快过期的粉。', en: 'Senior gives half tub of expiring whey.' },
      choices: [
        {
          text: { zh: '低价出群', en: 'Sell cheap in chat' },
          effects: { Money: +10, Mental_Health: -6 },
          flavor_text: { zh: '略心虚。', en: 'Slight guilt.' }
        },
        {
          text: { zh: '自己慢慢喝', en: 'Drink slowly yourself' },
          effects: { Physical_Health: +6, Mental_Health: +4 },
          flavor_text: { zh: '当加餐。', en: 'Snack boost.' }
        }
      ]
    }]
  },

  'loc_dorm_013': {
    event_id:         'loc_dorm_013',
    type:             'location',
    title:            { zh: '室友约早起', en: 'Roommate 7AM' },
    forbidden_tags:   ['IELTS_7.0', 'IELTS_7.5'],
    scenes: [
      {
        text: { zh: '室友抱回雅思真题，约你七点互督。', en: 'Roommate wants 7 AM IELTS buddy system.' },
        choices: [
          {
            text:       { zh: '同意', en: 'Agree' },
            effects:    { English_Ability: +4, Physical_Health: -6, Mental_Health: +4 },
            tags_added: ['Study_Buddy'],
            flavor_text: { zh: '早起累，但有伴。', en: 'Tired; paired study.' },
          },
          {
            text:       { zh: '婉拒', en: 'Decline' },
            effects:    { Mental_Health: +6, Physical_Health: +4 },
            flavor_text: { zh: '睡眠稳。', en: 'Sleep stable.' },
          },
        ],
      },
    ],
  },

  // ════════════════════════════════════════════════════════
  // 各建筑保底事件（Default / Filler Events）
  // ════════════════════════════════════════════════════════

  'default_fb': {
    event_id: 'default_fb', type: 'location', title: { zh: '基础楼日常', en: 'Foundation Building Routine' },
    scenes: [{ text: { zh: 'FB 的大厅里贴满了各种社团活动海报。你在这里上了一节通识课，阶梯教室里空调的嗡嗡声让你有点犯困。', en: 'Posters for various clubs fill the FB hall. You just finished a General Education class; the low hum of the air conditioner almost lulled you to sleep.' } }]
  },
  'default_sb': {
    event_id: 'default_sb', type: 'location', title: { zh: '理工楼日常', en: 'Science Building Routine' },
    scenes: [{ text: { zh: '教授今天按部就班地讲完了 PPT。你记了满屏的笔记，下课时教室里充满了收拾书包的声音。', en: 'The professor went through the slides as planned. Your screen is full of notes, and the room is now filled with the sound of students packing up.' } }]
  },
  'default_cb': {
    event_id: 'default_cb', type: 'location', title: { zh: '图书馆日常', en: 'Library Routine' },
    scenes: [{ text: { zh: '图书馆里一如既往地安静，只有偶尔翻书的声音和远处打印机的轰鸣。你专注地完成了一段学习任务。', en: 'The library is quiet as always, save for the occasional rustle of pages and the distant roar of a printer. You\'ve made solid progress on your tasks.' } }]
  },
  'default_pb': {
    event_id: 'default_pb', type: 'location', title: { zh: '公共楼日常', en: 'Public Building Routine' },
    scenes: [{ text: { zh: '你在 PB 穿行，应急通道的楼梯上挤满了来不及等电梯的学生，便利店的关东煮香气飘得很远。今天没什么特别的人和你打招呼。', en: 'Navigating through PB, you see students crowding the emergency stairs to avoid the elevators. The scent of oden from the convenience store drifts through the air.' } }]
  },
  'default_eb': { // 原 IR 文案移交至此
    event_id: 'default_eb', type: 'location', title: { zh: '工科楼日常', en: 'Engineering Building Routine' },
    scenes: [{ text: { zh: '机房电脑的风扇嗡嗡作响，你盯着跑了一半的脚本，确认没有报错后记录下了今天的数据。', en: 'The computer fans hum in the lab. Staring at your script, you confirm there are no errors and record the day\'s data.' } }]
  },
  'default_ir': { // 编写新的科研中心文案
    event_id: 'default_ir', type: 'location', title: { zh: '科研中心日常', en: 'Research Center Routine' },
    scenes: [{ text: { zh: 'IR 的会议室里正在进行一场小型的学术研讨。你整理着最近的文献综述，空气中弥漫着高端咖啡和高端论文的味道。', en: 'A small academic seminar is underway in an IR meeting room. As you organize your literature review, the air smells of premium coffee and high-level research.' } }]
  },
  'default_gym': {
    event_id: 'default_gym', type: 'location', title: { zh: '健身房日常', en: 'Gym Routine' },
    scenes: [{ text: { zh: '完成最后一组器械后，你擦了擦汗。镜子里的你看起来和昨天没什么不同，但肌肉的酸胀感提醒你今天没有虚度。', en: 'Sweating after your last set, you look in the mirror. You don\'t look different, but the muscle ache tells you today wasn\'t wasted.' } }]
  },
  'default_dorm': {
    event_id: 'default_dorm', type: 'location', title: { zh: '宿舍日常', en: 'Dormitory Routine' },
    scenes: [{ text: { zh: '你回到了宿舍，今日无事发生。室友们都在忙自己的事，你换上睡衣，享受这难得的片刻宁静。', en: 'Back in the dorm. Nothing special happened today. Your roommates are busy, so you change into pajamas and enjoy a moment of peace.' } }]
  },
  'default_ia': {
    event_id: 'default_ia', type: 'location', title: { zh: 'IA 日常', en: 'IA Routine' },
    scenes: [{ text: { zh: 'IA 的咨询台前排着小队。你翻看了一下最近的宣讲会排期表，并没有发现特别感兴趣的项目。', en: 'A small queue has formed at the IA info desk. You skim the briefing schedule but don\'t find anything that piques your interest.' } }]
  },

  // ════════════════════════════════════════════════════════
  // 死亡叙事事件（死亡前的最后告别）
  // ════════════════════════════════════════════════════════

  'death_mental_0': {
    event_id: 'death_mental_0', type: 'location', title: { zh: '心理崩溃', en: 'Mental Breakdown' },
    scenes: [{ text: { zh: '苏州的冬雨冷得刺骨，你坐在独墅湖边，看着水面上的倒影，突然觉得这一切都没有意义了。你的大脑像是一根绷得太紧终于断掉的琴弦，世界陷入了一片死寂。', en: 'The winter rain in Suzhou is bone-chilling. Sitting by Dushu Lake, staring at your reflection, you suddenly feel that none of this matters anymore. Your mind, like a string pulled too tight, finally snaps. The world falls into an eerie silence.' } }]
  },
  'death_mental_100': {
    event_id: 'death_mental_100', type: 'location', title: { zh: '彻底佛系', en: 'Enlightened Zen' },
    scenes: [{ text: { zh: '你悟了，你知道有更有意义的事在等着你去做。绩点、雅思、名校 Offer……这些不过是束缚灵魂的枷锁。你微笑着删掉了电脑里所有的申请材料，背起行囊，决定去寻找真正的自由。', en: 'You have attained enlightenment. You now know there are more meaningful things awaiting you. GPA, IELTS, top-tier Offers... these are but shackles for the soul. Smiling, you delete every application file on your computer, pack your bag, and set off to find true freedom.' } }]
  },
  'death_physical_0': {
    event_id: 'death_physical_0', type: 'location', title: { zh: '身体透支', en: 'Physical Collapse' },
    scenes: [{ text: { zh: '眼前的代码开始重叠，心跳快得像是在擂鼓。你试图站起来去接杯水，却发现四肢沉重如铅。在意识消失前的最后一秒，你听到了室友惊慌失措的呼喊声。', en: 'The code before your eyes begins to blur, and your heart thumps like a war drum. You try to stand for a glass of water, only to find your limbs as heavy as lead. In the final second before consciousness fades, you hear your roommate\'s frantic shouts.' } }]
  },
  'death_physical_100': {
    event_id: 'death_physical_100', type: 'location', title: { zh: '沉迷举铁', en: 'Gym Rat Obsession' },
    scenes: [{ text: { zh: '书本哪有杠铃亲切？你看着镜子里完美的肌肉线条，觉得申研这种久坐不动的活计简直是在亵渎人体这一上帝的完美造物。你决定把余生都交给健身房，去追求人类力量的极限。', en: 'Who needs books when you have barbells? Admiring your perfect muscle definition in the mirror, you realize that the sedentary life of an applicant is an insult to the divine machine that is the human body. You decide to dedicate the rest of your life to the gym, pursuing the absolute limits of human strength.' } }]
  },
  'death_money_0': {
    event_id: 'death_money_0', type: 'location', title: { zh: '资金断裂', en: 'Financial Ruin' },
    scenes: [{ text: { zh: '银行卡的余额变成了个位数。你交不起这个月的房租，也付不起雅思的报名费。现实的引力太沉重了，飞扬的名校梦怦然坠地。', en: 'Your bank balance has dropped to single digits. You can\'t cover this month\'s rent, let only the IELTS registration fee. The gravity of reality is too heavy; your soaring dreams of a top-tier university crash into the dirt.' } }]
  },
  'death_money_100': {
    event_id: 'death_money_100', type: 'location', title: { zh: '财富自由', en: 'Financial Freedom' },
    scenes: [{ text: { zh: '你发现自己随手搞的小生意竟然月入十万。看着那点微薄的研究生起薪，你陷入了沉思：我到底为什么还要去受那份申研的苦？', en: 'You discover that your side hustle is pulling in 100,000 RMB a month. Staring at the meager starting salary of a fresh Master\'s graduate, you fall into deep thought: Why on earth was I putting myself through the misery of applications?' } }]
  },

};

/**
 * 将事件文案字段规范化为双语对象：
 * - 已是 { zh, en } 的字段保持不变
 * - 纯字符串自动转为 { zh: str, en: str }（英文缺失时安全回退）
 */
function normalizeLocalizedField(value) {
  if (typeof value === 'string') {
    return { zh: value, en: value };
  }
  if (value && typeof value === 'object' && (value.zh || value.en)) {
    return {
      zh: typeof value.zh === 'string' ? value.zh : (typeof value.en === 'string' ? value.en : ''),
      en: typeof value.en === 'string' ? value.en : (typeof value.zh === 'string' ? value.zh : ''),
    };
  }
  return value;
}

function normalizeEvent(event) {
  const cloned = structuredClone(event);
  cloned.title = normalizeLocalizedField(cloned.title);

  if (Array.isArray(cloned.scenes)) {
    cloned.scenes = cloned.scenes.map(scene => {
      const nextScene = { ...scene };
      nextScene.text = normalizeLocalizedField(nextScene.text);
      nextScene.tip  = normalizeLocalizedField(nextScene.tip);

      if (Array.isArray(nextScene.choices)) {
        nextScene.choices = nextScene.choices.map(choice => {
          const nextChoice = { ...choice };
          nextChoice.text = normalizeLocalizedField(nextChoice.text);
          nextChoice.tip = normalizeLocalizedField(nextChoice.tip);
          nextChoice.flavor_text = normalizeLocalizedField(nextChoice.flavor_text);

          if (Array.isArray(nextChoice.flavor_text_variants)) {
            nextChoice.flavor_text_variants = nextChoice.flavor_text_variants.map(variant => ({
              ...variant,
              text: normalizeLocalizedField(variant.text),
            }));
          }
          return nextChoice;
        });
      }
      return nextScene;
    });
  }

  return cloned;
}

export const EVENTS = Object.fromEntries(
  Object.entries(RAW_EVENTS).map(([eventId, event]) => [eventId, normalizeEvent(event)])
);