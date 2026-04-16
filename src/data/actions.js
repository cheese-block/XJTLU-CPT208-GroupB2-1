/**
 * @fileoverview 地图建筑的行动定义（重构为抽卡卡池）
 */

export const ACTIONS = {
  // ── FB 基础楼 ──────────────────────────────────────────────
  'study_class': {
    id:          'study_class',
    buildingId:  'fb',
    label:       '上课自习',
    apCost:      1,
    icon:        'book-open',
    eventPool:   ['loc_fb_lecture', 'loc_fb_group_work'],
  },

  // ── CB 图书馆 ──────────────────────────────────────────────
  'study_ielts': {
    id:          'study_ielts',
    buildingId:  'cb',
    label:       '刷雅思题库',
    apCost:      1,
    icon:        'languages',
    eventPool:   ['loc_cb_ielts_mock', 'loc_cb_seat_war'],
  },

  // ── PB 公共楼 ──────────────────────────────────────────────
  'relax_pb':  {
    id:          'relax_pb',
    buildingId:  'pb',
    label:       '去 PB 放松',
    apCost:      1,
    icon:        'coffee',
    eventPool:   ['loc_pb_coffee_chat', 'loc_pb_club_activity'],
  },

  // ── EB 工科楼 ──────────────────────────────────────────────
  'study_research': {
    id:          'study_research',
    buildingId:  'eb',
    label:       '做课程项目',
    apCost:      1,
    icon:        'code-2',
    eventPool:   ['loc_eb_debug_night', 'loc_eb_equipment_fail'],
  },

  // ── IR 科研中心 ────────────────────────────────────────────
  'research_ir': {
    id:          'research_ir',
    buildingId:  'ir',
    label:       '参与科研项目',
    apCost:      1,
    icon:        'microscope',
    tagsProgress: 'Research_Exp', // 累计 3 次获得科研标签
    eventPool:   ['loc_ir_data_clean', 'loc_ir_professor_meeting'],
  },

  // ── IA 学术交流中心 ────────────────────────────────────────
  'consult_ia': {
    id:          'consult_ia',
    buildingId:  'ia',
    label:       '咨询申研信息',
    apCost:      1,
    icon:        'message-circle',
    eventPool:   ['loc_ia_anxiety_talk', 'loc_ia_alumni_share'],
  },

  // ── GYM 体育馆 ────────────────────────────────────────────
  'exercise': {
    id:          'exercise',
    buildingId:  'gym',
    label:       '去健身房锻炼',
    apCost:      1,
    icon:        'dumbbell',
    eventPool:   ['loc_gym_heavy_lift', 'loc_gym_yoga'],
  },

  // ── 宿舍 ──────────────────────────────────────────────────
  'rest': {
    id:          'rest',
    buildingId:  'dorm',
    label:       '回宿舍休息',
    apCost:      1,
    icon:        'moon',
    eventPool:   ['loc_dorm_gaming', 'loc_dorm_sleep'],
  },
};