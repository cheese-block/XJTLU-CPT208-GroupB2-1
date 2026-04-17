/**
 * @fileoverview 地图建筑的行动定义（重构为抽卡卡池）
 */

export const ACTIONS = {
  'study_class': {
    id: 'study_class', buildingId: 'fb', label: '上课自习', apCost: 1, icon: 'book-open',
    eventPool: ['loc_fb_lecture', 'loc_fb_group_work', 'loc_fb_aircon', 'loc_fb_quiz', 'loc_fb_front_row'],
  },
  'study_ielts': {
    id: 'study_ielts', buildingId: 'cb', label: '刷雅思题库', apCost: 1, icon: 'languages',
    eventPool: ['loc_cb_ielts_mock', 'loc_cb_seat_war', 'loc_cb_couple', 'loc_cb_close_time', 'loc_cb_lost_found'],
  },
  'relax_pb':  {
    id: 'relax_pb', buildingId: 'pb', label: '去 PB 放松', apCost: 1, icon: 'coffee',
    eventPool: ['loc_pb_coffee_chat', 'loc_pb_club_activity', 'loc_pb_subway', 'loc_pb_gossip', 'loc_pb_promotion'],
  },
  'study_research': {
    id: 'study_research', buildingId: 'eb', label: '做课程项目', apCost: 1, icon: 'code-2',
    eventPool: ['loc_eb_debug_night', 'loc_eb_equipment_fail', 'loc_eb_server_crash', 'loc_eb_genius_help', 'loc_eb_stolen_code'],
  },
  'research_ir': {
    id: 'research_ir', buildingId: 'ir', label: '参与科研项目', apCost: 1, icon: 'microscope', tagsProgress: 'Research_Exp',
    eventPool: ['loc_ir_data_clean', 'loc_ir_professor_meeting', 'loc_ir_paper_publish', 'loc_ir_equipment_booking'],
  },
  'consult_ia': {
    id: 'consult_ia', buildingId: 'ia', label: '咨询申研信息', apCost: 1, icon: 'message-circle',
    eventPool: ['loc_ia_anxiety_talk', 'loc_ia_alumni_share', 'loc_ia_visa_rumor', 'loc_ia_agency_flyer'],
  },
  'exercise': {
    id: 'exercise', buildingId: 'gym', label: '去健身房锻炼', apCost: 1, icon: 'dumbbell',
    eventPool: ['loc_gym_heavy_lift', 'loc_gym_yoga', 'loc_gym_treadmill_race', 'loc_gym_protein_shake'],
  },
  'rest': {
    id: 'rest', buildingId: 'dorm', label: '回宿舍休息', apCost: 1, icon: 'moon',
    eventPool: ['loc_dorm_gaming', 'loc_dorm_sleep', 'loc_dorm_takeaway', 'loc_dorm_noise'],
  },
};