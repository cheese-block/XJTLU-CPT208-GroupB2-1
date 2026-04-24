export const BUILDINGS = [
  {
    id:          'fb',
    title:       { zh: 'FB · 基础楼', en: 'FB · Foundation Building' },
    fullName:    'Foundation Building',
    icon:        'school',
    description: {
      zh: '大一新生的主要教学楼，承载了绝大多数通识基础课程。对大三大四的 SAT 学生来说，这里的课已经基本修完，偶尔路过会感慨时光飞逝。',
      en: 'The main building for freshmen, hosting most foundational courses. For Y3/Y4 SAT students, walking past here brings back memories of how fast time flies.'
    },
    lore:        {
      zh: '传说 FB 三楼的某间教室风水极好，坐那里复习的同学成绩都不低——但也可能只是因为那里离厕所最近，节省了时间。',
      en: 'Rumor has it that a specific classroom on the 3rd floor has great Feng Shui for finals—or maybe it\'s just because it\'s closest to the restroom.'
    },
    photo:       null,
    hotspot:     { x: 15.6, y: 8.7 },
    actions:     ['study_fb'],
  },

  {
    id:          'cb',
    title:       { zh: 'CB · 图书馆', en: 'CB · Central Building' },
    fullName:    'Central Building',
    icon:        'library',
    description: {
      zh: '西浦的核心图书馆。这里是备考雅思、刷真题的圣地，英文原版教材和学术数据库是你的主要武器。代价是：座位永远不够，旁边总有人在干扰你。',
      en: 'The core library. A holy ground for IELTS prep and past-paper grinding. The cost? There are never enough seats, and someone is always distracting you.'
    },
    lore:        {
      zh: '有人说图书馆五楼自习室是"卷王聚集地"，去那里的人不是在刷雅思就是在写 SOP，剩下的在假装刷雅思。',
      en: 'The 5th-floor study room is known as the "Try-hard Hub". People there are either grinding IELTS, writing SOPs, or pretending to grind IELTS.'
    },
    photo:       null,
    hotspot:     { x: 17.6, y: 31.3 },
    actions:     ['study_ielts'],
  },

  {
    id:          'sb',
    title:       { zh: 'SA~SD · 理工楼', en: 'SA~SD · Science Building' },
    fullName:    'Science Building A/B/C/D',
    icon:        'flask-conical',
    description: {
      zh: 'SAT 学院的核心教学区，大多数专业课在此进行。这里的课程密度高、考核压力大，是积累 GPA 的主战场，也是焦虑蔓延最快的地方。',
      en: 'The core teaching area for SAT students. High course density and heavy assessment pressure make it the main battlefield for GPA, and the fastest place for anxiety to spread.'
    },
    lore:        {
      zh: '期末周的 SA 楼走廊里，你能在五分钟内见到三种人：对着墙背公式的、抱着咖啡发呆的、和教授争分数的。',
      en: 'During finals week, you can see three types of people in the SA corridor: those memorizing formulas facing the wall, those staring blankly with coffee, and those arguing with professors for marks.'
    },
    photo:       null,
    hotspot:     { x: 39.9, y: 32.3 },
    actions:     ['study_class'],
  },

  {
    id:          'pb',
    title:       { zh: 'PB · 公共楼', en: 'PB · Public Building' },
    fullName:    'Public Building',
    icon:        'users',
    description: {
      zh: '校园里人流最杂的地方。便利店、部分课室和公共空间混在一起，经常能碰见其他学院的同学和外籍教师。一次普通的等电梯都可能带来意想不到的对话。',
      en: 'The most crowded place on campus. Convenience stores, classrooms, and public spaces are mixed together. A simple wait for the elevator might bring unexpected conversations.'
    },
    lore:        {
      zh: '有人在 PB 走廊认识了后来帮他写推荐信的教授。也有人在 PB 便利店买完薯片后，转头被同学安利进了一个完全不感兴趣的社团。',
      en: 'Someone met a professor in the PB corridor who later wrote their recommendation letter. Another bought chips and got dragged into a club they had zero interest in.'
    },
    photo:       null,
    hotspot:     { x: 54.8, y: 24.4 },
    actions:     ['social_pb'],
  },

  {
    id:          'mb',
    title:       { zh: 'MA~MB · 数学楼', en: 'MA~MB · Mathematics Building' },
    fullName:    'Mathematics Building A/B',
    icon:        'sigma',
    description: {
      zh: '数学系的主场，也是部分统计、数据分析类课程的上课地点。申研方向偏向数据科学的同学会在这里花大量时间。',
      en: 'Home turf for the Math department. Students aiming for Data Science will spend a lot of time here.'
    },
    lore:        {
      zh: '数学楼的黑板永远写满了没擦掉的公式，不知道是上节课留下的还是某位教授的灵感草稿。',
      en: 'The blackboards here are always covered in un-erased formulas. No one knows if it\'s from the last class or a professor\'s sudden inspiration.'
    },
    photo:       null,
    hotspot:     { x: 68.1, y: 27.4 },
    actions:     [],
  },

  {
    id:          'eb',
    title:       { zh: 'EB · 工科楼', en: 'EB · Engineering Building' },
    fullName:    'Engineering Building',
    icon:        'cpu',
    description: {
      zh: '包含计算机实验室、项目工作室和各类工程设备。虽然大量课程项目在这里完成，但 SAT 学生的专业课主场还是 SA~SD。',
      en: 'Houses computer labs and project studios. Though many projects are done here, the main battlefield for SAT is still SA~SD.'
    },
    lore:        {
      zh: 'EB 地下室的服务器机房发出的嗡嗡声是很多 SAT 学生的白噪音，据说在那里调 bug 效率特别高，因为你根本不知道外面几点了。',
      en: 'The humming of servers in the EB basement is white noise for many SAT students. They say debugging efficiency is highest there because you have no idea what time it is outside.'
    },
    photo:       null,
    hotspot:     { x: 70.0, y: 40.3 },
    actions:     ['work_eb'],
  },

  {
    id:          'ee',
    title:       { zh: 'EE · 电子电气楼', en: 'EE · Electrical Building' },
    fullName:    'Electrical and Electronic Engineering',
    icon:        'zap',
    description: {
      zh: '电子与电气工程方向的专属教学楼，配备专业实验设备。EEE 专业的同学在这里度过了大量时间。',
      en: 'Exclusive building for EEE majors, equipped with professional lab devices.'
    },
    lore:        {
      zh: '据说 EE 楼的示波器比某些同学的电脑还贵，但使用频率可能还不如那台电脑高。',
      en: 'They say the oscilloscopes in the EE building are more expensive than some students\' laptops, but might be used less frequently.'
    },
    photo:       null,
    hotspot:     { x: 56.0, y: 44.5 },
    actions:     [],
  },

  {
    id:          'ir',
    title:       { zh: 'IR · 国际科研中心', en: 'IR · Research Centre' },
    fullName:    'International Research Centre',
    icon:        'microscope',
    description: {
      zh: '承接国际科研项目的核心机构。参与教授课题组是积累科研软背景的最直接方式，但这里的工作强度不亚于实习，回报也同样不确定。',
      en: 'The core institution for international research. Joining a professor\'s lab is the most direct way to boost your soft background, but the workload is like a full-time internship.'
    },
    lore:        {
      zh: '能进 IR 做 RA 的学生不多，但每个人的简历上都会把这段经历写满整整一页。至于实际做了什么，只有导师和那台跑了三天的服务器知道。',
      en: 'Not many can enter IR as an RA, but those who do will fill a whole page of their resume with it. As for what they actually did, only the mentor and the server know.'
    },
    photo:       null,
    hotspot:     { x: 41.8, y: 62.6 },
    actions:     ['research_ir'],
  },

  {
    id:          'ia',
    title:       { zh: 'IA · 学术交流中心', en: 'IA · Exchange Centre' },
    fullName:    'International Academic Exchange and Collaboration Centre',
    icon:        'globe',
    description: {
      zh: '负责国际交流、留学申请咨询和校际合作项目的行政中心。每年申请季，这里的走廊会变成信息集散地，真假消息混杂流传。',
      en: 'The administrative center for international exchange and study abroad consulting. During application season, the corridors turn into an information hub of mixed truths and rumors.'
    },
    lore:        {
      zh: '每年十月申请季，IA 门口都会排起长队。有人来咨询，有人来碰运气，还有人只是来蹭空调的。',
      en: 'Every October, long lines form outside IA. Some come for consulting, some to try their luck, and some just for the free AC.'
    },
    photo:       null,
    hotspot:     { x: 60.3, y: 66.0 },
    actions:     ['visit_ia'],
  },

  {
    id:          'hs',
    title:       { zh: 'HS · 人文社科楼', en: 'HS · Humanities Building' },
    fullName:    'Humanities and Social Sciences Building',
    icon:        'book-marked',
    description: {
      zh: '人文与社会科学学院的主楼，偶尔会举办跨学科讲座和文化活动，是 SAT 学生拓展视野的好去处。',
      en: 'Main building for HSS. Occasionally hosts interdisciplinary lectures, a good place for SAT students to broaden their horizons.'
    },
    lore:        {
      zh: '有 SAT 的同学跑来旁听人文课，说是"换换脑子"，但其实只是因为这里的座椅比工科楼舒服。',
      en: 'Some SAT students audit humanities classes to "switch their brains", but actually it\'s just because the seats here are more comfortable than in the engineering buildings.'
    },
    photo:       null,
    hotspot:     { x: 59.7, y: 80.3 },
    actions:     [],
  },

  {
    id:          'es',
    title:       { zh: 'ES · 新兴科学楼', en: 'ES · Emerging Science' },
    fullName:    'Emerging and Interdisciplinary Science Building',
    icon:        'atom',
    description: {
      zh: '聚焦前沿与跨学科科研的新楼，部分 AI、生物信息学方向的课题组在此驻扎。',
      en: 'A new building focusing on cutting-edge and interdisciplinary research. Some AI and bioinformatics groups are stationed here.'
    },
    lore:        {
      zh: 'ES 楼还很新，走廊里的气味还带着装修的味道。但已经有人在这里发了顶会论文了。',
      en: 'The ES building is so new it still smells like renovation. But people have already published top-tier conference papers here.'
    },
    photo:       null,
    hotspot:     { x: 44.2, y: 94.5 },
    actions:     [],
  },

  {
    id:          'ibss',
    title:       { zh: 'IBSS · 商学院', en: 'IBSS · Business School' },
    fullName:    'International Business School Suzhou',
    icon:        'trending-up',
    description: {
      zh: '西浦国际商学院，拥有独立的教学和行政体系。对 SAT 学生而言，偶尔会有联合课程或商业竞赛合作机会。',
      en: 'International Business School Suzhou. For SAT students, there are occasional joint courses or business competition opportunities.'
    },
    lore:        {
      zh: 'IBSS 的同学永远穿得比你正式，手里拿着咖啡，走路带风。据说这是商学院的必修课。',
      en: 'IBSS students always dress more formally than you, walking with coffee in hand and a breeze in their step. Rumor says it\'s a mandatory course.'
    },
    photo:       null,
    hotspot:     { x: 34.2, y: 77.5 },
    actions:     [],
  },

  {
    id:          'db',
    title:       { zh: 'DB · 设计楼', en: 'DB · Design Building' },
    fullName:    'Design Building',
    icon:        'pen-tool',
    description: {
      zh: '设计学院的主楼，充满创意氛围。工科生偶尔会来这里参加 Hackathon 或跨学科项目，换换思维方式。',
      en: 'Main building for the School of Design, full of creative atmosphere. Engineering students occasionally come for Hackathons to change their mindset.'
    },
    lore:        {
      zh: 'DB 楼门口永远停着各种奇怪的装置艺术，有时候你分不清那是作品还是施工遗留物。',
      en: 'There are always weird installation arts parked outside DB. Sometimes you can\'t tell if it\'s an artwork or leftover construction material.'
    },
    photo:       null,
    hotspot:     { x: 64.8, y: 88.3 },
    actions:     [],
  },

  {
    id:          'gym',
    title:       { zh: 'GYM · 体育馆', en: 'GYM · Gymnasium' },
    fullName:    'Gymnasium',
    icon:        'dumbbell',
    description: {
      zh: '校园内的体育运动中心。唯一一个能让你在申研期间系统性恢复身体状态的地方，运动带来的多巴胺也是对抗焦虑的有效手段。',
      en: 'The sports center on campus. The only place where you can systematically recover your physical health. Dopamine from exercise is an effective weapon against anxiety.'
    },
    lore:        {
      zh: '有数据显示，GPA 最高的那批人里，有相当一部分是健身房常客。但也可能只是因为他们有时间管理能力。',
      en: 'Data shows that a significant portion of top-GPA students are gym regulars. Or maybe they just have better time management.'
    },
    photo:       null,
    hotspot:     { x: 83.1, y: 65.6 },
    actions:     ['exercise'],
  },

  {
    id:          'dorm',
    title:       { zh: '宿舍区', en: 'Dormitories' },
    fullName:    'Student Dormitories',
    icon:        'house',
    description: {
      zh: '你每天开始和结束的地方。这里是恢复心理状态最直接的场所，但过度依赖宿舍意味着你在把时间让给室友、手机和睡眠。',
      en: 'Where your day begins and ends. The most direct place to recover mental health, but over-relying on it means yielding your time to roommates, phones, and sleep.'
    },
    lore:        {
      zh: '有人在宿舍刷完了整套剑桥雅思，有人在宿舍打完了整个游戏库。命运的分叉点，往往就在熄灯后的那几个小时。',
      en: 'Someone finished a whole set of Cambridge IELTS in the dorm; another finished their entire Steam library. The divergence of fate often happens in the hours after lights out.'
    },
    photo:       null,
    hotspot:     { x: 64.7, y: 1.4 },
    actions:     ['rest'],
  },
];
