/**
 * @fileoverview 地图建筑的行动定义
 */

export const ACTIONS = {
  'study_class': {
    id: 'study_class', buildingId: 'sb', label: '上专业课', apCost: 1, icon: 'flask-conical',
    eventPool: [
      'loc_sb_001', 'loc_sb_002', 'loc_sb_003', 'loc_sb_004',
      'loc_sb_005', 'loc_sb_006', 'loc_sb_007', 'loc_sb_008',
      'loc_sb_009', 'loc_sb_010', 'loc_sb_011', 'loc_sb_012',
      'loc_sb_013'
    ],
  },

  'study_ielts': {
    id: 'study_ielts', buildingId: 'cb', label: '备考雅思', apCost: 1, icon: 'languages',
    eventPool: [
      'loc_cb_ielts_mock',
      'loc_cb_seat_war',
      'loc_cb_couple',
      'loc_cb_close_time',
      'loc_cb_lost_found',
    ],
  },

  'social_pb': {
    id: 'social_pb', buildingId: 'pb', label: '在 PB 闲逛', apCost: 1, icon: 'users',
    eventPool: [
      'loc_pb_foreigner',
      'loc_pb_gossip',
      'loc_pb_convenience',
      'loc_pb_cross_major',
      'loc_pb_professor_hallway',
    ],
  },

  'research_ir': {
    id: 'research_ir', buildingId: 'ir', label: '参与科研项目', apCost: 1, icon: 'microscope',
    tagsProgress: 'Research_Exp',
    eventPool: [
      'loc_ir_data_clean',
      'loc_ir_professor_meeting',
      'loc_ir_paper_publish',
      'loc_ir_equipment_booking',
    ],
  },

  'exercise': {
    id: 'exercise', buildingId: 'gym', label: '去健身房锻炼', apCost: 1, icon: 'dumbbell',
    eventPool: [
      'loc_gym_heavy_lift',
      'loc_gym_yoga',
      'loc_gym_treadmill_race',
      'loc_gym_protein_shake',
    ],
  },

  'rest': {
    id: 'rest', buildingId: 'dorm', label: '回宿舍休息', apCost: 1, icon: 'moon',
    eventPool: [
      'loc_dorm_sleep',
      'loc_dorm_gaming',
      'loc_dorm_takeaway',
      'loc_dorm_noise',
      'loc_dorm_study_buddy',
      'loc_dorm_insomnia',
    ],
  },

  'visit_ia': {
    id: 'visit_ia', buildingId: 'ia', label: '前往咨询', apCost: 1, icon: 'globe',
    eventPool: [
      'agency_part1', // 【新增】：将中介事件放入 IA 卡池
    ],
  },

};