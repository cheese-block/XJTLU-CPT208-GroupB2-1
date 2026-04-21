/**
 * @fileoverview 地图建筑的行动定义
 */

export const ACTIONS = {

  'study_fb': {
    id: 'study_fb', buildingId: 'fb', label: '上通识课', label_en: 'General Course', apCost: 1, icon: 'book',
    guaranteedEventId: 'default_fb',
    eventPool: [], // 演示期暂空
  },

  'work_eb': {
    id: 'work_eb', buildingId: 'eb', label: '做实验项目', label_en: 'Lab Project', apCost: 1, icon: 'cpu',
    guaranteedEventId: 'default_eb',
    eventPool: [],
  },

  'study_class': {
    id: 'study_class', buildingId: 'sb', label: '上专业课', label_en: 'Major Course', apCost: 1, icon: 'flask-conical',
    guaranteedEventId: 'default_sb', // 新增
    eventPool: [
      'loc_sb_001', 'loc_sb_002', 'loc_sb_003', 'loc_sb_004',
      'loc_sb_005', 'loc_sb_006', 'loc_sb_007', 'loc_sb_008',
      'loc_sb_009', 'loc_sb_010', 'loc_sb_011', 'loc_sb_012',
      'loc_sb_013', 'loc_sb_014', 'loc_sb_015', 'loc_sb_016',
      'loc_sb_017'
    ],
  },

  'study_ielts': {
    id: 'study_ielts', buildingId: 'cb', label: '备考雅思', label_en: 'IELTS Prep', apCost: 1, icon: 'languages',
    guaranteedEventId: 'default_cb', // 新增
    eventPool: [
      'loc_cb_ielts_mock',
      'loc_cb_seat_war',
      'loc_cb_couple',
      'loc_cb_close_time',
      'loc_cb_lost_found',
      'loc_cb_ielts_opportunity' // 【新增】：雅思考位放出
    ],
  },

  'social_pb': {
    id: 'social_pb', buildingId: 'pb', label: '在 PB 闲逛', label_en: 'Hang out in PB', apCost: 1, icon: 'users',
    guaranteedEventId: 'default_pb', // 新增
    eventPool: [],
  },

  'research_ir': {
    id: 'research_ir', buildingId: 'ir', label: '参与科研项目', label_en: 'Research Project', apCost: 1, icon: 'microscope',
    tagsProgress: 'Research_Exp',
    guaranteedEventId: 'default_ir', // 新增
    eventPool: [
      'loc_ir_data_clean',
      'loc_ir_professor_meeting',
      'loc_ir_paper_publish',
      'loc_ir_equipment_booking',
    ],
  },

  'exercise': {
    id: 'exercise', buildingId: 'gym', label: '去健身房锻炼', label_en: 'Workout in Gym', apCost: 1, icon: 'dumbbell',
    guaranteedEventId: 'default_gym', // 新增
    eventPool: [],
  },

  'rest': {
    id: 'rest', buildingId: 'dorm', label: '回宿舍休息', label_en: 'Rest in Dorm', apCost: 1, icon: 'moon',
    guaranteedEventId: 'default_dorm', // 新增
    eventPool: [
      'loc_dorm_001', 'loc_dorm_002', 'loc_dorm_003', 'loc_dorm_004',
      'loc_dorm_005', 'loc_dorm_006', 'loc_dorm_007', 'loc_dorm_008',
      'loc_dorm_009', 'loc_dorm_010', 'loc_dorm_011', 'loc_dorm_012',
      'loc_dorm_013'
    ],
  },

  'visit_ia': {
    id: 'visit_ia', buildingId: 'ia', label: '前往咨询', label_en: 'Consulting', apCost: 1, icon: 'globe',
    guaranteedEventId: 'default_ia', // 新增
    eventPool: [
      'agency_part1'
    ],
  },

};