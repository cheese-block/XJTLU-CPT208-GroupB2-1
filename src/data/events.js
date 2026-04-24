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
        text: { zh: '“但在那之外，【学力】和【英语】是你冲刺名校的弹药。期末考试会清算你的学力，雅思考试会检验你的英语。\n\n不过，没必要为了刷分就死磕在科学楼里。这学校的各个建筑在数值影响上其实差不太多，多去别处转转，说不定能触发什么奇遇。”', en: '"Beyond that, [Academic] and [English] are your ammo for top schools. Finals settle your academic level, and IELTS tests your English.\n\nStill, do not tunnel in one building just to grind stats. Buildings are not that different overall. Explore more places, you may trigger surprises."' },
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
        text: { zh: '“当你手握选项时，你会看到那些浮动的圆点。直觉会指引你……\n\n现在就做个决定吧：桌上这杯过期三天的冰美式，你要喝掉提神吗？”', en: '"When choices appear, you will see floating dots. Trust your intuition...\n\nNow decide: there is a three-day-expired iced Americano on the desk. Drink it for a boost?"' },
        tip:  { zh: '鼠标悬浮选项即可预览数值变化圆点。圆点的位置代表该数值将有变化，圆点内容预示变动幅度。', en: 'Hover over choices to preview stat-change indicators. Dot position shows which stat changes; dot size indicates magnitude.' },
        choices: [
          {
            text: { zh: '闭着眼睛灌下去', en: 'Chug it with eyes closed' },
            effects: { Physical_Health: -10, Academic_Ability: +5 },
            flavor_text: { zh: '（心脏狂跳。这玩意儿简直是毒药，但你感觉现在能解开微积分大题了。）', en: '(Your heart is racing. This feels like poison, but you suddenly feel able to solve hardcore calculus.)' }
          },
          {
            text: { zh: '稳妥起见，倒进下水道', en: 'Play safe and pour it down the drain' },
            effects: { Mental_Health: -5 },
            flavor_text: { zh: '（白白倒掉咖啡让你感到一丝浪费的愧疚，但至少保住了肠胃。）', en: '(Wasting coffee feels a bit guilty, but at least your stomach survives.)' }
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
            effects:    { Agency_Score: +15, Mental_Health: -5 },
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
            effects:    { Agency_Score: +15, Mental_Health: -5 },
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
            effects:    { English_Ability: +6, Mental_Health: -15, Money: -15 },
            tags_added: [],
            flavor_text: { zh: '你交了学费，每天八小时高强度刷题。暑假结束时，你的耳朵对英音产生了条件反射，但连续的熬夜让你的黑眼圈深了不少。', en: 'Tuition paid. Eight hours of high-intensity practice daily. By the end of summer, your ears react instinctively to British accents, but consecutive all-nighters have deepened your dark circles.' },
            tip:        { zh: '语言成绩是很多人的阿喀琉斯之踵。集中精力解决它是非常务实的选择。', en: 'Language scores are the Achilles\' heel for many. Focusing energy on resolving it is a very pragmatic choice.' },
          },
          {
            text:       { zh: '去大厂实习，积累真实项目经验', en: 'Big Tech internship: Gain real project experience' },
            effects:    { Mental_Health: -15, Physical_Health: -10, Money: +20 },
            tags_added: ['Internship_Exp'],
            flavor_text: { zh: '你成功拿到了一份为期八周的实习。每天挤地铁、开会、写周报。工资不多，但简历上多了一行沉甸甸的真实经历。', en: 'Successfully landed an eight-week internship. Commuting, meetings, and weekly reports. The pay is modest, but your resume now boasts a substantial line of real experience.' },
            tip:        { zh: '对于申请偏就业导向的硕士项目，一段对口的实习经历往往比高出 0.5 分的雅思更有说服力。', en: 'For career-oriented Master\'s programs, a relevant internship is often more persuasive than an extra 0.5 on your IELTS score.' },
          },
          {
            text:       { zh: '好好休息，为大四养精蓄锐', en: 'Proper rest: Recharge for the final year' },
            effects:    { Mental_Health: +20, Physical_Health: +20 },
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
  // 地点事件：SA~SD 专业课楼 (解耦“波动类”数值和“积累类”数值)
  // ════════════════════════════════════════════════════════

  'loc_sb_001': {
    event_id: 'loc_sb_001', type: 'location', title: { zh: '蓝屏的制裁', en: 'Blue Screen of Punishment' },
    scenes: [{
      text: { zh: '你在 SD 楼的机房跑了一下午的数据。进度条到 99% 时，电脑风扇发出一声惨叫，屏幕变成了纯粹之蓝。不幸的是你没按过保存。', en: 'You\'ve been running data in the SD building lab all afternoon. At 99%, the fan lets out a scream, and the screen turns pure blue. Unfortunately, you never hit save.' },
      choices: [
        {
          text: { zh: '不接受现实，盯着蓝屏发呆', en: 'Deny reality and stare at the blue screen' },
          effects: { Mental_Health: -15, Academic_Ability: -2 }
        },
        {
          text: { zh: '事已至此，先吃饭吧', en: 'It is what it is. Time for dinner.' },
          effects: { Money: -10, Mental_Health: -5 }
        }
      ]
    }]
  },

  'loc_sb_002': {
    event_id: 'loc_sb_002', type: 'location', title: { zh: '完美的实验数据', en: 'Perfect Experimental Data' },
    scenes: [{
      text: { zh: '物理实验课上，你们组随便测了一次，数据点竟然完美贴合了理论曲线。连教授路过都点了点头。', en: 'In physics lab, your group takes a quick measurement, and the data points fit the theoretical curve perfectly. Even the professor nods in approval as he walks by.' },
      choices: [
        {
          text: { zh: '就这样吧，提前一小时下课去打游戏', en: 'Leave it at that. Class ends an hour early for gaming.' },
          effects: { Mental_Health: +15, Academic_Ability: +3 }
        },
        {
          text: { zh: '觉得这数据好得不真实，坚持换个仪器重测', en: 'Think it\'s too good to be true. Insist on retesting with a different instrument.' },
          effects: { Academic_Ability: +8, Mental_Health: -10 },
          flavor_text: { zh: '第二组数据烂得像一坨泥。你完全不能理解发生了什么。', en: 'The second set of data is garbage. You have no idea what just happened.' }
        }
      ]
    }]
  },

  'loc_sb_003': {
    event_id: 'loc_sb_003', type: 'location', title: { zh: '留学生的问路', en: 'International Student Asking for Directions' },
    scenes: [{
      text: { zh: '一个看起来很着急的留学生在 SA 楼梯口拦住你：“Excuse me, do you know where the lab SA214 is?”', en: 'A frantic-looking international student stops you at the SA stairs: "Excuse me, do you know where the lab SA214 is?"' },
      choices: [
        {
          text: { zh: '热情待人，亲自带他上楼，顺带聊了聊', en: 'Be helpful: Lead him upstairs and have a chat on the way.' },
          effects: { English_Ability: +3, Physical_Health: -5 }
        },
        {
          text: { zh: '比划了一通："Go straight, then turn left."', en: 'Gesture vaguely: "Go straight, then turn left."' },
          effects: { English_Ability: +1 }
        }
      ]
    }]
  },

  'loc_sb_004': {
    event_id: 'loc_sb_004', type: 'location', title: { zh: '讲座后排的披萨', en: 'Pizza at the Back of the Lecture' },
    scenes: [{
      text: { zh: 'SD 楼有一场冗长的学术讲座。你完全听不懂台上的老师在讲什么，但教室后排摆着三大盒免费的山姆零食。', en: 'There\'s a tedious academic lecture in the SD building. You don\'t understand a word the speaker is saying, but there are three huge boxes of free Sam\'s Club snacks at the back.' },
      choices: [
        {
          text: { zh: '溜到后排偷吃零食，血糖过山车后放弃理解讲座内容，开始低头刷手机', en: 'Sneak to the back for snacks. After a sugar rush, give up on the lecture and scroll your phone.' },
          effects: { Money: +10, Mental_Health: +10, Physical_Health: -10, Academic_Ability: -3 }
        },
        {
          text: { zh: '强打精神，尝试理解讲座内容', en: 'Force yourself to stay awake and try to understand the lecture.' },
          effects: { Academic_Ability: +7, English_Ability: +2, Mental_Health: -10 },
          flavor_text: { zh: '讲座老师开始重新组织自己的语言，也许是因为注意到了你呆滞的表情', en: 'The speaker starts rephrasing their points, perhaps noticing your glazed expression.' }
        }
      ]
    }]
  },

  'loc_sb_005': {
    event_id: 'loc_sb_005', type: 'location', title: { zh: '降噪耳机的背叛', en: 'Betrayal of Noise-Canceling Headphones' },
    scenes: [{
      text: { zh: '自习室里，你旁边的哥们正在用青轴机械键盘疯狂输出。就在这时，你的降噪耳机在播报“Battery Low”后彻底关机。', en: 'In the study room, the guy next to you is pounding away on a mechanical keyboard with clicky blue switches. Just then, your noise-canceling headphones announce "Battery Low" and shut down.' },
      choices: [
        {
          text: { zh: '靠意志力硬抗青轴的物理超度', en: 'Endure the mechanical keyboard onslaught through sheer willpower.' },
          effects: { Mental_Health: -15, Academic_Ability: +3 }
        },
        {
          text: { zh: '去星巴克点杯美式接着学', en: 'Head to Starbucks, order an Americano, and keep studying.' },
          effects: { Money: -8, Mental_Health: +10, Academic_Ability: +6 }
        }
      ]
    }]
  },

  'loc_sb_006': {
    event_id: 'loc_sb_006', type: 'location', title: { zh: 'TA 的灵魂拷问', en: 'TA\'s Soul-Searching Question' },
    scenes: [{
      text: { zh: 'Tutorial 课上，外籍 TA 指着你作业里的一段奇葩代码问：“Why did you use this function here?”', en: 'In a tutorial, the international TA points to a bizarre snippet in your code: "Why did you use this function here?"' },
      choices: [
        {
          text: { zh: '诚实低头："I copied it from StackOverflow."', en: 'Honestly admit: "I copied it from StackOverflow."' },
          effects: { Mental_Health: +5, Academic_Ability: -2 },
          flavor_text: { zh: 'TA 叹了口气，放过了你。', en: 'The TA sighs and lets you off the hook.' }
        },
        {
          text: { zh: '强行现编一段听起来很高级的技术原理解释', en: 'Improvise a high-level technical explanation on the spot.' },
          effects: { English_Ability: +2, Mental_Health: -10, Academic_Ability: +4 }
        }
      ]
    }]
  },

  'loc_sb_007': {
    event_id: 'loc_sb_007', type: 'location', title: { zh: '消失的雨伞', en: 'The Disappearing Umbrella' },
    scenes: [{
      text: { zh: '晚课结束，外面下起了暴雨。你放在 SA 一楼伞架上的透明雨伞不见了，而旁边放着一把不知道是谁的黑伞。', en: 'Evening class ends, and it\'s pouring outside. Your transparent umbrella is gone from the SA lobby rack, replaced by a mysterious black one.' },
      choices: [
        {
          text: { zh: '顺走那把黑伞，撑回宿舍', en: 'Take the black umbrella and head back to the dorm.' },
          effects: { Mental_Health: -10, Physical_Health: +10 },
          flavor_text: { zh: '人不犯我我不犯人，要怪，就怪这乱世吧。', en: 'Eye for an eye. Blame the cruel world, not me.' }
        },
        {
          text: { zh: '认命了，把书包顶在头上冲进暴雨里', en: 'Accept your fate. Put your bag over your head and dash into the storm.' },
          effects: { Physical_Health: -20, Mental_Health: +10, Money: -5 },
          flavor_text: { zh: '你在雨中狂奔，突然觉得这种电影主角般的悲惨经历还挺解压的。', en: 'Running through the rain, you suddenly find this cinematic misery quite cathartic.' }
        }
      ]
    }]
  },

  'loc_sb_008': {
    event_id: 'loc_sb_008', type: 'location', title: { zh: '迟到的签到表', en: 'The Tardy Sign-in Sheet' },
    scenes: [{
      text: { zh: '你睡过了头，迟到了整整五十分钟。当你从后门溜进教室时，发现教授正在前排传阅一张签到表。你有点紧张，不想有一丝在两百人面前被老师训斥的可能。', en: 'You overslept and arrived fifty minutes late. Slipping through the back door, you see the professor passing around a sign-in sheet at the front. Nerves kick in; you want zero chance of being scolded in front of two hundred people.' },
      choices: [
        {
          text: { zh: '弯着腰像特工一样潜行到前排去签字', en: 'Sneak to the front like a secret agent to sign the sheet.' },
          effects: { Mental_Health: -15, Academic_Ability: +4 },
          flavor_text: { zh: '很多学生看到了你奇异搞笑的行为。', en: 'Many students witness your bizarrely comical performance.' }
        },
        {
          text: { zh: '摆烂放弃签到，坐在最后一排开始补觉', en: 'Give up on signing. Sit in the last row and start napping.' },
          effects: { Mental_Health: +10, Physical_Health: +10, Academic_Ability: -4 },
          flavor_text: { zh: '“就当我没来上课吧。”', en: '"Just pretend I never showed up."' }
        }
      ]
    }]
  },

  'loc_sb_009': {
    event_id: 'loc_sb_009', type: 'location', title: { zh: '自动贩卖机的嘲讽', en: 'Mockery of the Vending Machine' },
    scenes: [{
      text: { zh: '你在 SD 楼一楼的自动贩卖机买罐装百事可乐。扫码，付款，机械臂动了一下，然后卡住了。你的可乐悬停在半空中。', en: 'You buy a can of Pepsi from the vending machine on the first floor of SD. Scan, pay, the arm moves... and jams. Your soda is now suspended in mid-air.' },
      choices: [
        {
          text: { zh: '左右观察无人，对着机器狠狠踹了一脚', en: 'Check for witnesses, then give the machine a solid kick.' },
          effects: { Physical_Health: -5, Mental_Health: +5 },
          flavor_text: { zh: '可乐没掉下来，而你的脚趾隐隐作痛。但至少你的郁闷减轻了一些。', en: 'The soda stays put, and your toe throbs. But at least you feel a bit better.' }
        },
        {
          text: { zh: '不信邪，再买一瓶，试图用第二瓶把第一瓶砸下来', en: 'Buy another one and try to knock the first can down.' },
          effects: { Money: -10, Mental_Health: -10 },
          flavor_text: { zh: '现在有两瓶可乐卡在半空中。', en: 'Now there are two cans suspended in mid-air.' }
        }
      ]
    }]
  },

  'loc_sb_010': {
    event_id: 'loc_sb_010', type: 'location', title: { zh: '祖传复习资料', en: 'Ancestral Revision Materials' },
    scenes: [{
      text: { zh: '一个大四的学长在群里兜售某门地狱级专业课的“祖传复习大礼包”，包含历年卷、重点批注和往届高分作业，标价 150 元。', en: 'A senior is selling an "Ancestral Revision Pack" for a notorious course in a group chat. It includes past papers, highlighted notes, and high-scoring assignments for 150 RMB.' },
      choices: [
        {
          text: { zh: '咬牙转账', en: 'Grit your teeth and transfer the money.' },
          effects: { Money: -13, Academic_Ability: +10 }
        },
        {
          text: { zh: '决定靠自己啃 PPT', en: 'Decide to tackle the lecture slides on your own.' },
          effects: { Mental_Health: -13, Academic_Ability: +5 },
          flavor_text: { zh: '你花了一整晚自己整理重点，虽然学到了很多，但总觉得别人在走捷径，越想越气。', en: 'You spend all night organizing notes. You learned a lot, but the thought of others taking a shortcut keeps you annoyed.' }
        }
      ]
    }]
  },

  'loc_sb_011': {
    event_id: 'loc_sb_011', type: 'location', title: { zh: '致命的查重率', en: 'Deadly Similarity Rate' },
    scenes: [{
      text: { zh: '距离作业提交（DDL）还有两小时。你把写好的 Essay 传到 Turnitin 上查重，屏幕上赫然跳出一个红色的数字：45% Similarity。', en: 'Two hours to the deadline. You upload your essay to Turnitin, and a glaring red number pops up: 45% Similarity.' },
      choices: [
        {
          text: { zh: '用同义词替换大法把每一句话都改得面目全非', en: 'Rewrite every sentence beyond recognition using synonyms.' },
          effects: { Mental_Health: -13, Academic_Ability: +5, English_Ability: +3 },
          flavor_text: { zh: '查重率降到了 15%。但你交上去的已经不是一篇论文，而是一堆毫无逻辑的单词拼盘。', en: 'Similarity drops to 15%. But what you submitted is no longer an essay; it\'s a word salad of nonsensical synonyms.' }
        },
        {
          text: { zh: '花钱开一个 AI 降重软件的高级会员', en: 'Pay for a premium AI paraphrasing tool subscription.' },
          effects: { Money: -10, Mental_Health: +10, Academic_Ability: -2, English_Ability: -1 }
        }
      ]
    }]
  },

  'loc_sb_012': {
    event_id: 'loc_sb_012', type: 'location', title: { zh: '教授的慈悲', en: 'Professor\'s Mercy' },
    scenes: [{
      text: { zh: '由于这学期大家都抱怨某门课太难，教授在课上宣布：“这周末的 Assignment 4 取消了，所有人这项平时分直接给满分。”', en: 'As everyone complained the course was too hard, the professor announced: "Assignment 4 is canceled. Everyone gets full marks for this component."' },
      choices: [
        {
          text: { zh: '赞美教授！立刻回宿舍《原神》启动', en: 'Praise the Prof! Head back to the dorm and fire up Genshin.' },
          effects: { Mental_Health: +15 }
        },
        {
          text: { zh: '既然没压力了，反而静下心来把它当练习做一遍', en: 'With the pressure off, sit down and do it as a practice run.' },
          effects: { Academic_Ability: +9, Mental_Health: +10 },
          flavor_text: { zh: '没有分数压迫的纯粹求知，让你体验到了久违的学术快感。', en: 'Learning for the sake of learning, without grade pressure, gives you a long-lost academic thrill.' }
        }
      ]
    }]
  },

  'loc_sb_013': {
    event_id: 'loc_sb_013', type: 'location', title: { zh: 'Grammarly 的诱惑', en: 'Temptation of Grammarly' },
    scenes: [{
      text: { zh: '你在写报告，免费版的 Grammarly 提示你的文章里有 48 个“高级语法错误”，但要求你升级到 Premium 套餐后才能查看。', en: 'Writing a report, free Grammarly flags 48 "advanced grammatical errors" but requires a Premium upgrade to see them.' },
      choices: [
        {
          text: { zh: '冲一个礼拜高级会员，一键全部自动修改', en: 'Buy a one-week Premium sub and auto-fix everything.' },
          effects: { Money: -10,  Mental_Health: +10, Academic_Ability: -2, English_Ability: -1 },
          flavor_text: { zh: '文章看起来非常地道。不过你完全不知道它帮你改了什么，你的语感甚至退化了。', en: 'The essay looks polished. However, you have no idea what was changed; your linguistic intuition has actually regressed.' }
        },
        {
          text: { zh: '坚决不充钱，自己对着词典一个个扒出来改掉', en: 'Refuse to pay. Use a dictionary to fix every single error yourself.' },
          effects: { Mental_Health: -15, English_Ability: +3, Academic_Ability: +6 }
        }
      ]
    }]
  },

  'loc_sb_014': {
    event_id: 'loc_sb_014', type: 'location', title: { zh: '走错教室的旁听', en: 'Auditing the Wrong Class' },
    scenes: [{
      text: { zh: '你提前十分钟走进 SA 的教室，坐下听了一会儿才发现，台上讲的是隔壁专业的课。但教授讲的一个理论似乎能解决你最近的疑惑。', en: 'You walk into an SA classroom ten minutes early. After listening for a while, you realize it\'s for a different major. However, a theory the professor mentions seems to solve a puzzle you\'ve been having.' },
      choices: [
        {
          text: { zh: '假装自己就是这个专业的，试着听课看看是否能有所收获', en: 'Pretend you belong there. See if you can learn something new.' },
          effects: { Academic_Ability: +7, English_Ability: +1 },
          flavor_text: { zh: '也许你真的能成为复合型人才。', en: 'Perhaps you really are destined to be a multi-disciplinary talent.' }
        },
        {
          text: { zh: '太尴尬了，趁教授转身写板书时溜走', en: 'Too awkward. Slip out while the professor is writing on the board.' },
          effects: { Mental_Health: -5 }
        }
      ]
    }]
  },

  'loc_sb_015': {
    event_id: 'loc_sb_015', type: 'location', title: { zh: '遗落的“武功秘籍”', en: 'The Forgotten "Secret Manual"' },
    scenes: [{
      text: { zh: '你在空教室自习，发现桌洞里有一本被人遗忘的课本。随便翻开一页，是密密麻麻的用三种颜色笔做的学霸笔记。', en: 'Studying in an empty room, you find a forgotten textbook in a desk. Flipping it open, you see dense, multi-colored notes from a top student.' },
      choices: [
        {
          text: { zh: '据为己有，有便宜不占王八蛋', en: 'Keep it. Finders keepers.' },
          effects: { Academic_Ability: +10, Mental_Health: +15 },
          flavor_text: { zh: '你白嫖了学霸的智慧结晶，感觉很赚。', en: 'You\'ve absorbed a genius\'s insights for free. What a steal.' }
        },
        {
          text: { zh: '追出教室，把书交给了正在找东西的学霸本人', en: 'Chase after the student and return the book.' },
          effects: { Mental_Health: +5, English_Ability: +2 },
          flavor_text: { zh: '学霸是个留学生，他很感谢你。你们用英语聊了一会。', en: 'The student is an international student. He is very grateful, and you chat for a while in English.' }
        }
      ]
    }]
  },

  'loc_sb_016': {
    event_id: 'loc_sb_016', type: 'location', title: { zh: '跑步机上的文献', en: 'Literature on the Treadmill' },
    scenes: [{
      text: { zh: '你这周都没运动，身体已经感觉生锈了。但明天的 Seminar 还有两篇全英文文献没读。', en: 'You haven\'t exercised all week and feel like you\'re rusting. But there are still two English papers to read for tomorrow\'s seminar.' },
      choices: [
        {
          text: { zh: '去健身房，一边在跑步机上快走一边看文献', en: 'Go to the gym. Read the papers while power-walking on the treadmill.' },
          effects: { Physical_Health: +8, Academic_Ability: +3, Mental_Health: -10 },
          flavor_text: { zh: '你既锻炼了身体又看了书，但这种一心二用让你觉得心累。', en: 'You got both done, but the multitasking leaves you feeling mentally drained.' }
        },
        {
          text: { zh: '抛开一切罪恶感，去操场结结实实地跑了五公里', en: 'Cast aside the guilt. Go to the track and run a solid five kilometers.' },
          effects: { Physical_Health: +15, Mental_Health: +15, Academic_Ability: -2 },
          flavor_text: { zh: '大汗淋漓之后，你觉得那两篇文献根本不重要，健康才是第一位的。', en: 'After a good sweat, the papers seem trivial. Health comes first.' }
        }
      ]
    }]
  },

  'loc_sb_017': {
    event_id:         'loc_sb_017',
    type:             'location',
    title:            { zh: '昂贵的橄榄枝', en: 'An Expensive Olive Branch' },
    scenes: [
      {
        text: { zh: '专业课下课后，以严厉著称的教授叫住了你：“你上次的大作业的思路不错。我课题组最近在做个项目，缺个打杂的，要不要来？没有钱，但最后发 Paper 可以带你的名字。”', en: 'After class, a notoriously strict professor stops you: "Your last assignment had a good approach. My research group is starting a project and needs an assistant. No pay, but your name will be on the final paper. Interested?"' },
        tip:  { zh: '软背景提升：教授推荐信 (LoR) 是申研材料中的重要一环。与教授建立良好关系，不仅能获得强推，还能积累宝贵的科研经历，但会极大消耗精力。', en: 'Soft Background: Letters of Recommendation (LoR) are crucial for applications. Building a relationship with a professor can secure a strong LoR and valuable research experience, but it\'s a major time sink.' },
        choices: [
          {
            text:       { zh: '这是千载难逢的机会，我卖身了！', en: 'This is a rare opportunity. I\'m in!' },
            effects:    { Mental_Health: -20, Physical_Health: -15, Academic_Ability: +10 },
            tags_added: ['Research_Exp'],
            flavor_text: { zh: '你加入了课题组，开始了每周跑实验室、通宵看外文文献的日子。你获得了宝贵的科研经历，代价是你的发际线退后了一厘米。', en: 'You join the group, spending your weeks in labs and pull all-nighters with foreign literature. You gain invaluable experience at the cost of a receding hairline.' },
          },
          {
            text:       { zh: '感谢教授，但我目前想全力保 GPA。', en: 'Thank you, Professor, but I need to focus on my GPA right now.' },
            effects:    { Mental_Health: +8 },
            flavor_text: { zh: '教授冷淡地点了点头，转身离开了。你保住了睡眠和周末，但也可能错失了一封强有力的推荐信。', en: 'The professor nods coldly and walks away. You saved your sleep and weekends but might have missed out on a powerful LoR.' },
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
        text: { zh: '你在图书馆刷题刷得头昏脑涨，随手刷新了一下雅思报名官网。居然刷出了下个月初的一个退考考位！距离报名截止只剩十分钟了。报名费 2170 元。', en: 'Studying in the library has left you lightheaded. On a whim, you refresh the IELTS registration site. A canceled slot for early next month has just appeared! There are only ten minutes left until the deadline. The fee is 2,170 RMB.' },
        tip:  { zh: '时间规划：雅思成绩有效期为 2 年。最晚应在申请季当年的暑假结束前考出达标成绩。', en: 'Time Management: IELTS results are valid for 2 years. Aim to get your target score before the summer break of your application year.' },
        choices: [
          {
            text:    { zh: '管不了那么多了，先锁考位！', en: 'Lock it in now!' },
            effects: { Mental_Health: -5, Money: -10 },
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
    event_id: 'loc_ir_data_clean', type: 'location', title: { zh: '廉价劳动力', en: 'Cheap Labor' },
    scenes: [{
      text: { zh: '教授丢给你一个包含十万条脏数据的 Excel 表格，让你周末前清理干净。这活毫无技术含量，纯粹是体力劳动。', en: 'The professor dumps an Excel sheet with 100,000 messy rows on you, demanding it be cleaned by the weekend. It\'s mindless, brute-force labor.' },
      choices: [
        {
          text: { zh: '老老实实当黑工', en: 'Be a dutiful laborer' },
          effects: { Mental_Health: -18, Physical_Health: -10 },
          flavor_text: { zh: '你点鼠标点到手抽筋。虽然没学到什么新知识，但教授对你的服从性非常满意——这也许对要推荐信有帮助。', en: 'Your hand cramps from endless clicking. You learned nothing, but the professor is pleased with your obedience—which might help with a future reference.' },
        },
        {
          text: { zh: '花钱买个脚本自动处理', en: 'Pay for an automation script' },
          effects: { Money: -12, Mental_Health: +8 },
          flavor_text: { zh: '你在网上找人写了个自动化脚本，五分钟搞定。你用省下的时间看了一部电影，良心很平静。', en: 'You find someone online to write a script that finishes the job in five minutes. You spend the saved time watching a movie with a clear conscience.' },
        },
      ],
    }],
  },

  'loc_ir_professor_meeting': {
    event_id: 'loc_ir_professor_meeting', type: 'location', title: { zh: '组会拷问', en: 'Group Meeting Inquest' },
    scenes: [{
      text: { zh: '在周度组会上，教授突然点名让你汇报最近阅读的文献。你其实只看了个摘要。', en: 'During the weekly group meeting, the professor suddenly calls on you to present the literature you\'ve been reading. You\'ve only skimmed the abstracts.' },
      choices: [
        {
          text: { zh: '硬着头皮瞎编', en: 'Try to wing it' },
          effects: { Mental_Health: -22, Academic_Ability: -5 },
          flavor_text: { zh: '教授一眼看穿了你的窘迫，当着全组的面把你批评了一顿。你恨不得找个地缝钻进去。', en: 'The professor sees right through your struggle and reprimands you in front of the entire group. You wish you could vanish into thin air.' },
        },
        {
          text: { zh: '坦诚道歉，保证下次补上', en: 'Apologize and promise to catch up' },
          effects: { Mental_Health: -10, Academic_Ability: +5 },
          flavor_text: { zh: '你诚恳地承认了错误。教授虽然不悦，但没有过多刁难。你暗下决心今晚回去把文献读完。', en: 'You honestly admit your mistake. The professor is displeased but doesn\'t press further. You vow to finish the reading tonight.' },
        },
      ],
    }],
  },

  'loc_ir_paper_publish': {
    event_id: 'loc_ir_paper_publish', type: 'location', title: { zh: '论文署名', en: 'Paper Authorship' },
    scenes: [{
      text: { zh: '课题组准备投一篇顶级会议论文。教授暗示你，如果愿意包揽所有繁琐的排版和校对工作，可以给你挂个四作。', en: 'The group is preparing a paper for a top-tier conference. The professor hints that if you handle all the tedious formatting and proofreading, you can be the fourth author.' },
      choices: [
        {
          text: { zh: '接下苦差事！为了简历！', en: 'Accept the grind! For the CV!' },
          effects: { Academic_Ability: +10, Physical_Health: -18, Mental_Health: -8 },
          flavor_text: { zh: '你连续熬了三个通宵做完了排版和校对。论文投出去了，你的名字在最后。简历上多了一行，但身体亮起了红灯。', en: 'You pull three consecutive all-nighters for formatting and proofreading. The paper is submitted with your name at the end. Your CV gained a line, but your health is flagging.' },
        },
        {
          text: { zh: '太累了，婉拒', en: 'Politely decline' },
          effects: { Physical_Health: +12, Academic_Ability: -8 },
          flavor_text: { zh: '你礼貌地婉拒了。教授有些失望，但没有强迫。你保住了睡眠，但错过了一个简历加分项。', en: 'You politely decline. The professor is disappointed but doesn\'t push. You save your sleep but miss out on a resume booster.' },
        },
      ],
    }],
  },

  'loc_ir_equipment_booking': {
    event_id: 'loc_ir_equipment_booking', type: 'location', title: { zh: '抢占仪器', en: 'Snagging Equipment' },
    scenes: [{
      text: { zh: '实验室的高精度设备这周只剩下一个深夜时段可以预约了，而你明天早上还有早八的课。', en: 'The lab\'s high-precision equipment only has one slot left this week: late at night. You have an 8:00 AM class tomorrow.' },
      choices: [
        {
          text: { zh: '预约！大不了通宵', en: 'Book it! All-nighter it is.' },
          effects: { Academic_Ability: +8, Physical_Health: -18 },
          flavor_text: { zh: '你预约了凌晨的时段，通宵跑完了实验。数据很好，但你在早八课上直接睡死了。', en: 'You book the slot and spend the night in the lab. The data is excellent, but you crash completely during your 8:00 AM class.' },
        },
        {
          text: { zh: '放弃，等下周再做', en: 'Skip it and wait until next week' },
          effects: { Mental_Health: +8, Academic_Ability: -8 },
          flavor_text: { zh: '你选择了睡眠。下周再约吧，实验进度会慢一些，但人还在。', en: 'You choose sleep. Waiting until next week means slower progress, but at least you stay sane.' },
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
    event_id: 'loc_dorm_001', type: 'location', title: { zh: '闲不住？上咸鱼！', en: 'Idle Hands? Go to Xianyu!' },
    scenes: [{
      text: { zh: '你看着桌上那摞几乎全新的雅思剑桥真题。自从买回来后，它们唯一的价值就是用来垫显示器。', en: 'You stare at the stack of nearly pristine Cambridge IELTS past papers. Since buying them, their only purpose has been acting as a monitor stand.' },
      choices: [
        {
          text: { zh: '挂到闲鱼上，半价打包出给大一新生', en: 'Sell them on Xianyu to a freshman' },
          effects: { Money: +10, English_Ability: -2, Mental_Health: +10 },
          flavor_text: { zh: '看着微信到账提示，你感到一阵轻松。你不仅卖掉了书，还卖掉了对英语的最后一丝负罪感。', en: 'The WeChat payment notification brings instant relief. You haven\'t just sold the books; you\'ve sold your last shred of guilt about your English prep.' }
        },
        {
          text: { zh: '撤下显示器，强迫自己做一套听力', en: 'Remove the monitor and force a listening test' },
          effects: { Mental_Health: -15, English_Ability: +4 }
        }
      ]
    }]
  },

  'loc_dorm_002': {
    event_id: 'loc_dorm_002', type: 'location', title: { zh: '违规电器的诱惑', en: 'Temptation of Illegal Appliances' },
    scenes: [{
      text: { zh: '月底了，你的微信零钱只剩两位数。室友从床底摸出一个违规电煮锅：“今晚别点外卖了，我煮泡面加淀粉肠，来点不？”', en: 'It\'s the end of the month, and your WeChat balance is in the double digits. Your roommate pulls an illegal electric pot from under the bed: "No delivery tonight. I\'m making ramen with starch sausages. Want some?"' },
      choices: [
        {
          text: { zh: '加入这场盛宴，连汤都喝干净', en: 'Join the feast and drink the broth' },
          effects: { Money: +10, Physical_Health: -10, Mental_Health: +15 },
          flavor_text: { zh: '高钠碳水带来的快乐是无与伦比的，哪怕第二天早上你肿得像个发面馒头。', en: 'The joy of high-sodium carbs is unparalleled, even if you wake up looking like a puffy steamed bun the next morning.' }
        },
        {
          text: { zh: '坚守健康底线，花钱点一份轻食沙拉', en: 'Hold the health line and order a salad' },
          effects: { Money: -8, Physical_Health: +3, Mental_Health: -8 },
          flavor_text: { zh: '仔细想想花钱吃草何意味，看着室友们大快朵颐，你觉得自己既破财又憋屈。', en: 'Paying for "grass" while your roommates feast feels pointless. You\'ve lost money and your dignity.' }
        }
      ]
    }]
  },

  'loc_dorm_003': {
    event_id: 'loc_dorm_003', type: 'location', title: { zh: '深夜的 CS2', en: 'Late Night CS2' },
    scenes: [{
      text: { zh: '凌晨一点，室友戴着耳机在打 CS2，正在激情指挥：“A小！A小！他残了！特么的你会不会玩！”', en: 'It\'s 1:00 AM. Your roommate is wearing headphones and shouting instructions in CS2: "A Short! A Short! He\'s lit! Do you even know how to play?!"' },
      choices: [
        {
          text: { zh: '戴上降噪耳机，在床上背单词', en: 'Wear noise-canceling headphones and study' },
          effects: { English_Ability: +3, Physical_Health: -10, Mental_Health: -10 }
        },
        {
          text: { zh: '这能学得进？一起开黑算了', en: 'Can\'t study like this. Might as well play.' },
          effects: { Mental_Health: +15, Physical_Health: -10, Academic_Ability: -2 },
          flavor_text: { zh: '你用一波五杀拯救了室友的排位分，也摧毁了你明天早八的起床意志。', en: 'Your ace saves your roommate\'s rank but destroys your will to wake up for your 8:00 AM class.' }
        }
      ]
    }]
  },

  'loc_dorm_004': {
    event_id: 'loc_dorm_004', type: 'location', title: { zh: '沉浸式学习 VLOG', en: 'Immersive Study VLOG' },
    scenes: [{
      text: { zh: '你本来打算复习，但推送让你点开了一个“清华学霸 4 小时沉浸式学习 VLOG”。视频里的桌搭很精致，笔记很漂亮。', en: 'You intended to revise, but a notification lures you into a "4-Hour Immersive Study VLOG with a Tsinghua Genius." The desk setup is exquisite; the notes are beautiful.' },
      choices: [
        {
          text: { zh: '看了半小时，感觉自己似乎也成为清华的一份子了', en: 'Watch for 30 mins and feel like a genius' },
          effects: { Mental_Health: +10, Academic_Ability: -3 },
          flavor_text: { zh: '看着别人学习，你的大脑分泌了虚假的成就感。你今天什么都没学，但至少睡得很香。', en: 'Watching others study triggers a false sense of achievement. You learned nothing today, but at least you\'ll sleep well.' }
        },
        {
          text: { zh: '被焦虑感逼迫，选择去刷专业课习题', en: 'Forced by anxiety to actually study' },
          effects: { Mental_Health: -15, Academic_Ability: +8 }
        }
      ]
    }]
  },

  'loc_dorm_005': {
    event_id: 'loc_dorm_005', type: 'location', title: { zh: 'G 胖的微笑', en: 'Lord Gaben\'s Smile' },
    scenes: [{
      text: { zh: 'Steam 秋季特卖。你愿望单里那个眼馋了半年的 3A 大作《荒野○镖客》直接打骨折，只要 89 块钱。', en: 'Steam Autumn Sale. That AAA masterpiece "Red Dead ○" on your wishlist is 80% off, just 89 RMB.' },
      choices: [
        {
          text: { zh: '没玩过这游戏不配说自己是笔电小子！', en: 'Not playing this is a crime for laptop owners!' },
          effects: { Money: -7, Mental_Health: +15, Academic_Ability: -2 },
          flavor_text: { zh: '《宇宙机○人》不如《黑○话》一根。', en: '"Astro ○" is nothing compared to "Black ○".' }
        },
        {
          text: { zh: '不买，去 B 站看 UP 主的实况视频，聊以解馋', en: 'Don\'t buy. Watch a walkthrough on Bilibili instead.' },
          effects: { Money: +5, Mental_Health: +10 },
          flavor_text: { zh: '白嫖虽然快乐，但云玩家的体验终究差了点意思。', en: 'Watching for free is fine, but the "cloud gamer" experience is never quite the same.' }
        }
      ]
    }]
  },

  'loc_dorm_006': {
    event_id: 'loc_dorm_006', type: 'location', title: { zh: '富哥的求助', en: 'Rich Classmate\'s Plea' },
    scenes: [{
      text: { zh: 'EAP 课上认识的富哥同学在微信上敲你：“兄弟明天 Java 大作业救一下，我真写不明白，给你 600 辛苦费咋样？”', en: 'A rich classmate you met in EAP pings you on WeChat: "Bro, I\'m dying with this Java assignment. I just don\'t get it. I\'ll give you 600 RMB if you can save me. Deal?"' },
      choices: [
        {
          text: { zh: '收钱办事，重构那坨意大利面代码', en: 'Take the money and refactor that spaghetti code' },
          effects: { Money: +15, Academic_Ability: +10, Mental_Health: -15 },
          flavor_text: { zh: '你赚了钱，顺便把知识点吃透了，不过你看他代码时气的差点脑溢血。', en: 'You made some cash and mastered the material, but reading his code nearly gave you a stroke.' }
        },
        {
          text: { zh: '嫌麻烦拒绝，有这时间不如玩原神', en: 'Refuse. Better spend the time on Genshin.' },
          effects: { Mental_Health: +8, Money: -5 }
        }
      ]
    }]
  },

  'loc_dorm_007': {
    event_id: 'loc_dorm_007', type: 'location', title: { zh: '凌晨三点的虚无', en: '3:00 AM Nihilism' },
    scenes: [{
      text: { zh: '凌晨三点，你在床上辗转反侧。虚无主义袭击了你，你觉得考研、留学、GPA 都毫无意义，人类不过是宇宙中的尘埃。', en: 'It\'s 3:00 AM, and you\'re tossing and turning. Nihilism strikes: you feel that grad school, applications, and GPA are all meaningless. Humans are but dust in the cosmos.' },
      choices: [
        {
          text: { zh: '戴上耳机，任由自己沉溺在悲伤里', en: 'Put on headphones and sink into the sorrow' },
          effects: { Mental_Health: -15, Physical_Health: -10 },
          flavor_text: { zh: '全网最伤感的bgm，听完不哭你来打我。尤其是最后一首建议点赞收藏起来以免找不到。夜深人静的时候个人听，前奏一响立马emo。没猜错的话，艾特列表中的第三位一定是你生命中最重要的存在。你表情包里的第二排第三个就是你现在的心情带上耳机，用心感受这浓浓的伤感氛围。评论区留下你的手机电量相当于一百的，那就做一天朋友。听完艾特一位你喜欢的博主，看他会不会来接你。有人找了十年，只听前奏就已沦陷。记得分享给你的姐妹，看看你姐妹会给你回什么。如果不回，建议两人断了，就问你敢不敢在评论区留下你想对喜欢的人说的话，万一他看到了留下一句祝福。听说打出l d，据说百分之九十的打出来都是老大。如果不是，请打在评论区，让我看看你就是那百分之十。废话不多说，就让我们听听有哪些伤感bgm，键盘打出七四八三二幺，如果相似的，那么就做一周兄弟听完不哭，下个月的奶茶我包了。不要单独一个人听，建议分享给闺蜜一起听。据说这几个星座听完之后，两周内回进到那个有缘的地方去进行修炼。下面让我们听听网友总结的最伤感的十首bgm吧。一首是经典，看看你听过几首关上灯，戴上耳机，让我们用心感受一下这几首音乐歌曲天花板。@你闺蜜过来看看你闺蜜会不会来接你。心情不好的时候，千万不要怕你听完后瞬间落泪，如果没有落泪，那算我输，让我们一起欣赏网友总结的emo歌曲天花板先准备好纸巾，以免落泪了。来不及，bgm上', en: 'The saddest BGM on the internet... One listen and you\'re instantly emo. Loneliness at its finest.' }
        },
        {
          text: { zh: '睡不着也无事做，刷点题打发时间', en: 'Can\'t sleep, might as well grind some problems' },
          effects: { Mental_Health: +15, Academic_Ability: +10, Physical_Health: -15 },
          flavor_text: { zh: '因为彻底放弃了功利心，知识点竟然过目不忘。这种看破红尘带来了内心的极度平静。', en: 'Having abandoned all worldly ambition, you find yourself absorbing knowledge effortlessly. This detachment brings an unexpected, profound inner peace.' }
        }
      ]
    }]
  },

  'loc_dorm_008': {
    event_id: 'loc_dorm_008', type: 'location', title: { zh: '疯狂星期四', en: 'Crazy Thursday' },
    scenes: [{
      text: { zh: '今天是星期四。你 QQ、微信的各个群聊都在刷不知道哪里偷的“疯狂星期四”文案。', en: 'It\'s Thursday. Every group chat on QQ and WeChat is being spammed with "Crazy Thursday" copy-pastas stolen from who-knows-where.' },
      choices: [
        {
          text: { zh: '复制其中最难绷的一条，转发到各个群里，并配上你的收款码', en: 'Copy the cringiest one, spam it, and attach your QR code' },
          effects: { Money: +10, Mental_Health: +10 },
          flavor_text: { zh: '可能是佩服你自己开盒自己的胆识，居然真的有个富哥给你转了 50。你没去买肯德基，而是去食堂吃了一周的挂面。这就是互联网的魅力。', en: 'Perhaps impressed by your sheer audacity, someone actually sends you 50 RMB. You don\'t buy KFC; you eat noodles in the canteen for a week instead. The magic of the internet.' }
        },
        {
          text: { zh: '实在受不了这种互联网讨口子的行为，让 AI 引经据典现编一段三千字雄文痛斥他们', en: 'Can\'t stand the digital begging. Have an AI write a 3,000-word critique.' },
          effects: { Mental_Health: +15, Academic_Ability: +5 },
          flavor_text: { zh: '虽然你扮了扫兴鬼，但赢得了道德高地。在看到 AI 生成出“君子忧道不忧贫”的时候，你觉得自己灵魂升华了。', en: 'You were a killjoy, but you won the moral high ground. Seeing the AI quote "The noble man worries about the Way, not poverty," you feel your soul ascending.' }
        }
      ]
    }]
  },

  'loc_dorm_009': {
    event_id: 'loc_dorm_009', type: 'location', title: { zh: 'Steam 饰品理财', en: 'Steam Skin Investment' },
    scenes: [{
      text: { zh: '日常的一天，你偶然地发现，你两年前 5 块钱买的 CS 皮肤竟然涨到了 400 块，而且现在涨势似乎也还行。', en: 'Just an ordinary day, but you notice that a CS skin you bought for 5 RMB two years ago has spiked to 400 RMB. It seems to be still climbing.' },
      choices: [
        {
          text: { zh: '赶紧抛售。落袋为安，今晚加餐！', en: 'Sell immediately. Take the profit and feast tonight!' },
          effects: { Money: +15, Mental_Health: +15 },
          flavor_text: { zh: '看着余额增加，你觉得自己就是西浦巴菲特。虽然第二天它又涨了 100。', en: 'Watching your balance grow, you feel like the Warren Buffett of XJTLU. Of course, it goes up another 100 RMB the next day.' }
        },
        {
          text: { zh: '我就是西浦赌神，给我擦皮鞋', en: 'I am the God of Gamblers. Shine my shoes.' },
          effects: { Money: -10, Mental_Health: -15 },
          flavor_text: { zh: '倒狗你赢了。', en: 'Scalper wins again.' }
        }
      ]
    }]
  },

  'loc_dorm_010': {
    event_id: 'loc_dorm_010', type: 'location', title: { zh: '床头夜聊的虚妄', en: 'The Vanity of Pillow Talk' },
    scenes: [{
      text: { zh: '凌晨一点，宿舍熄灯。室友突然叹了口气：“兄弟，你说咱们这专业毕业以后能干嘛？”以此为契机，宿舍瞬间进入了经典睡得着但夜聊环节。', en: '1:00 AM. Lights out. Your roommate sighs: "Bro, what can we even do with this major after graduation?" And just like that, the dorm enters the classic late-night philosophy session.' },
      choices: [
        {
          text: { zh: '翻个身，跟他大谈特谈国际局势、AI 发展和未来经济形势', en: 'Roll over and lecture him on geopolitics, AI, and the global economy' },
          effects: { Mental_Health: +15, Physical_Health: -10, Academic_Ability: -3 },
          flavor_text: { zh: '聊到凌晨四点，你们觉得已经掌握了世界运行的底层逻辑，万物皆是草芥——除了明天的早九。', en: 'By 4:00 AM, you feel you\'ve mastered the underlying logic of the universe. Everything is trivial—except for your 9:00 AM class.' }
        },
        {
          text: { zh: '“能干嘛？进厂打螺丝呗。”戴上耳塞强行睡觉', en: '"Work in a factory, obviously." Put in earplugs and sleep.' },
          effects: { Physical_Health: +10, Mental_Health: -10, English_Ability: +3 },
          flavor_text: { zh: '你在梦里竟然梦到自己在国外的流水线工厂打黑工。', en: 'You actually dream about working on an overseas assembly line.' }
        }
      ]
    }]
  },

  'loc_dorm_011': {
    event_id: 'loc_dorm_011', type: 'location', title: { zh: '洗衣间的生化危机', en: 'Biohazard in the Laundry Room' },
    scenes: [{
      text: { zh: '你端着装脏衣服的桶去洗衣间，发现有人用公共洗衣机洗内裤袜子……🤮', en: 'Carrying your laundry basket, you find someone using the public machine for underwear and socks... 🤮' },
      choices: [
        {
          text: { zh: '捏着鼻子拿出来，然后花钱开“高温桶自洁”后再洗', en: 'Take them out, pay for high-temp self-clean, then wash.' },
          effects: { Money: -5, Mental_Health: -10, Physical_Health: +5 }
        },
        {
          text: { zh: '都放洗衣液了有啥关系，直接洗', en: 'It\'s fine, there\'s detergent. Just wash.' },
          effects: { Physical_Health: -13, Mental_Health: -10, Money: +5 },
          flavor_text: { zh: '“为啥老发痒？”', en: '"Why does it keep itching?"' }
        }
      ]
    }]
  },

  'loc_dorm_012': {
    event_id: 'loc_dorm_012', type: 'location', title: { zh: '过期的蛋白粉', en: 'Expired Protein Powder' },
    scenes: [{
      text: { zh: '隔壁爱好健身的学长要毕业了，送了你半桶快过期的进口分离乳清蛋白粉。', en: 'A gym-rat senior next door is graduating and gives you half a tub of imported whey isolate that\'s about to expire.' },
      choices: [
        {
          text: { zh: '挂在二手群里，以低廉的价格卖给不知情的学弟', en: 'Sell it cheap to an unsuspecting freshman in the second-hand group' },
          effects: { Money: +12, Mental_Health: -10 },
          flavor_text: { zh: '钱到账了。但你总怕半夜学弟捂着肚子来敲门暗杀你，良心受到了隐隐的谴责。', en: 'Money received. But you live in fear of a freshman with a stomachache knocking on your door at night for revenge. Guilt gnaws at you.' }
        },
        {
          text: { zh: '秉承着珍惜食物的原则，尝试在早晨猛喝两大勺代替早饭', en: 'Respect the food. Chug two huge scoops for breakfast.' },
          effects: { Physical_Health: -15, Money: +5 },
          flavor_text: { zh: '和马桶一起度过了难忘的一天。', en: 'Spent an unforgettable day bonding with the toilet.' }
        }
      ]
    }]
  },

  'loc_dorm_013': {
    event_id:         'loc_dorm_013',
    type:             'location',
    title:            { zh: '室友的觉醒', en: 'Roommate\'s Awakening' },
    forbidden_tags:   ['IELTS_7.0', 'IELTS_7.5'],
    scenes: [
      {
        text: { zh: '你正躺在床上刷视频，平时最爱打游戏的室友突然搬回一整套《剑桥雅思》，神色凝重地对你说：“兄弟我不想再徒耗人生了。以后每天早上七点，我们互相监督背单词咋样？谁不起谁是狗。”', en: 'While scrolling videos, your gamer roommate suddenly brings home a full set of Cambridge IELTS books. He looks serious: "Bro, I\'m done wasting my life. Starting tomorrow, we\'re doing vocab at 7 AM every day. First one to snooze is a coward. You in?"' },
        choices: [
          {
            text:       { zh: '👍', en: '👍' },
            effects:    { English_Ability: +4, Mental_Health: -10, Physical_Health: -5 },
            tags_added: ['Study_Buddy'],
            flavor_text: { zh: '你们达成了神圣的契约。虽然每天早起极其痛苦，但在互相鄙视的驱动下，你确实比一个人单打独斗有效率多了。', en: 'A sacred pact is formed. While waking up early is agony, the fear of mutual contempt makes you far more efficient than studying alone.' },
          },
          {
            text:       { zh: '👎', en: '👎' },
            effects:    { Mental_Health: +5 },
            flavor_text: { zh: '室友的热血只维持了三天，随后那套真题就成了他的泡面盖。你庆幸自己没有跟着瞎折腾，保住了安稳的睡眠。', en: 'His passion lasted three days. The books are now just ramen covers. You\'re glad you didn\'t bother; your sleep remains undisturbed.' },
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