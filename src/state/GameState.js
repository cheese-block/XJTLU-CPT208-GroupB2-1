/**
 * @fileoverview 游戏状态机定义
 *
 * 职责：
 *   - 定义完整的 GameState 数据结构（作为 JSDoc 类型注释）
 *   - 提供 createInitialState() 工厂函数
 *   - 不包含任何业务逻辑，不依赖 Engine 层
 */

import { CONSTANTS } from '../utils/constants.js';

// ─────────────────────────────────────────────────────────────
// JSDoc 类型定义（IDE 智能提示 + 自文档化）
// ─────────────────────────────────────────────────────────────

/**
 * @typedef {Object} StatDelta
 * @property {string} stat    - 属性名，如 'Mental_Health'
 * @property {number} delta   - 变化量（可正可负）
 * @property {string} label   - UI 显示文本，如 '心理健康'
 */

/**
 * @typedef {Object} BuffEffect
 * @property {number}  [AP_cost_modifier]       - AP 消耗修正（如 -1 代表少花 1 AP）
 * @property {Object}  [stat_modifier]          - 数值收益修正
 * @property {string}  stat_modifier.stat       - 目标属性名
 * @property {string|null} stat_modifier.action - 限定的行动 ID，null=全局生效
 * @property {number}  stat_modifier.delta      - 额外加成
 * @property {number}  [event_prob_modifier]    - 随机事件概率修正（如 -0.05）
 */

/**
 * @typedef {Object} ActiveBuff
 * @property {string}   buffId           - 唯一标识
 * @property {string}   label            - UI 显示名称
 * @property {string}   icon             - Lucide 图标名
 * @property {'permanent'|'months'|'one_time'} durationType
 * @property {number|null} remainingMonths - 剩余月数（durationType='months' 时有效）
 * @property {BuffEffect} effects
 * @property {string}   source_event_id  - 来源事件 ID
 */

/**
 * @typedef {Object} SemesterGPARecord
 * @property {string} phase    - 学期阶段，如 'Y3_SEM1'
 * @property {number} rawScore - Academic_Ability 期末分数（0-100）
 * @property {number} gpa      - 换算后的 GPA（如 3.5）
 * @property {string} tag      - GPA 标签，如 'GPA_High'
 */

/**
 * @typedef {Object} PendingEvent
 * @property {string} eventId
 * @property {'scheduled'|'chain'|'random'} source
 */

/**
 * @typedef {Object} GameState
 *
 * // 元信息
 * @property {string}  version
 * @property {string}  school
 * @property {number|null} saveTimestamp
 *
 * // 时间系统
 * @property {number}  currentMonth      - 1–12
 * @property {string}  currentPhase      - 'Y3_SEM1' 等
 *
 * // 消耗类资源
 * @property {number}  AP
 * @property {number}  AP_used_this_month
 * @property {number}  Mental_Health
 * @property {number}  Physical_Health
 * @property {number}  Money
 *
 * // 抽象能力值
 * @property {number}  Academic_Ability
 * @property {number}  English_Ability
 *
 * // 标签系统
 * @property {string[]} tags
 *
 * // Buff 系统
 * @property {ActiveBuff[]} activeBuff
 *
 * // GPA 追踪
 * @property {SemesterGPARecord[]} semesterGPA
 * @property {number|null} cumulativeGPA
 *
 * // 事件系统
 * @property {string[]}        triggeredEventIds
 * @property {PendingEvent[]}  pendingEventQueue
 * @property {Object|null}     currentEvent
 * @property {number}          currentDialogIndex
 *
 * // 流程控制
 * @property {string}          gamePhase
 * @property {boolean}         isProcessing
 * @property {StatDelta[]}     pendingStatChanges
 */

// ─────────────────────────────────────────────────────────────
// 工厂函数
// ─────────────────────────────────────────────────────────────

/**
 * 创建一份全新的初始游戏状态。
 * 每次"新游戏"时调用，返回一个干净的状态对象。
 *
 * @returns {GameState}
 */
export function createInitialState() {
  const startMonth = 1;

  return {
    // ── 元信息 ──────────────────────────────────────────────
    version:       CONSTANTS.SAVE_VERSION,
    school:        'SAT',
    saveTimestamp: null,

    // ── 时间系统 ─────────────────────────────────────────────
    currentMonth:  startMonth,
    currentPhase:  CONSTANTS.MONTH_TO_PHASE[startMonth],

    // ── 消耗类资源 ───────────────────────────────────────────
    AP:                 CONSTANTS.AP_MAX_PER_MONTH,
    AP_used_this_month: 0,
    Mental_Health:      CONSTANTS.MENTAL_HEALTH_INIT,
    Physical_Health:    CONSTANTS.PHYSICAL_HEALTH_INIT,
    Money:              CONSTANTS.MONEY_INIT,

    // ── 抽象能力值 ───────────────────────────────────────────
    Academic_Ability: CONSTANTS.ACADEMIC_ABILITY_INIT,
    English_Ability:  CONSTANTS.ENGLISH_ABILITY_INIT,

    // ── 临时剧情数值（事件链专用，不显示在常驻 UI）──────────
    Agency_Score: 0,  // 【新增】中介风云事件链的隐藏分数

    // ── 标签系统 ─────────────────────────────────────────────
    tags: [],

    // 修改初始解锁列表：增加 fb, pb, eb, gym（cb 改为后续解锁）
    unlockedBuildings: ['sb', 'dorm', 'fb', 'pb', 'eb', 'gym'],

    // ── Buff 系统 ────────────────────────────────────────────
    activeBuff: [],

    // ── GPA 追踪 ─────────────────────────────────────────────
    semesterGPA:   [],
    cumulativeGPA: null,

    // ── 事件系统 ─────────────────────────────────────────────
    triggeredEventIds: [],
    pendingEventQueue: [],
    currentEvent:      null,
    currentDialogIndex: 0,

    // ── 流程控制 ─────────────────────────────────────────────
    gamePhase:          CONSTANTS.GAME_PHASE.TITLE,
    isProcessing:       false,
    pendingStatChanges: [],
  };
}

// ─────────────────────────────────────────────────────────────
// 状态快照工具（测试 / 调试用）
// ─────────────────────────────────────────────────────────────

/**
 * 返回状态的人类可读摘要（用于控制台调试）。
 * @param {GameState} state
 * @returns {Object}
 */
export function getStateSummary(state) {
  return {
    进度:     `Month ${state.currentMonth} · ${CONSTANTS.PHASE_LABELS[state.currentPhase] ?? state.currentPhase}`,
    AP:        `${state.AP} / ${CONSTANTS.AP_MAX_PER_MONTH}（本月已用 ${state.AP_used_this_month}）`,
    心理健康:  state.Mental_Health,
    身体健康:  state.Physical_Health,
    金钱:     `¥${state.Money.toLocaleString('zh-CN')}`,
    学力:      state.Academic_Ability,
    英语能力:  state.English_Ability,
    累计GPA:   state.cumulativeGPA ?? '暂无',
    标签:      state.tags.length > 0 ? state.tags.join(', ') : '（无）',
    Buffs:     state.activeBuff.map(b => b.label).join(', ') || '（无）',
    已触发事件: state.triggeredEventIds.length,
    游戏阶段:  state.gamePhase,
  };
}