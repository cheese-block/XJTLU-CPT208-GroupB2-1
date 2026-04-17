/**
 * @fileoverview 状态管理器
 *
 * 职责：
 *   - 持有当前游戏状态的单例引用
 *   - 提供所有状态读写的唯一入口（防止 Engine/UI 层直接操作 state）
 *   - 封装 localStorage 的存取逻辑
 *   - 执行数值边界校验（clamp）
 *   - 管理 Tag 和 Buff 的增删
 *
 * 设计原则：
 *   - 所有修改状态的方法都必须调用 _notifyChange() 通知 UI 层
 *   - Engine 层通过调用本模块的方法来修改状态，禁止直接赋值
 */

import { CONSTANTS }                    from '../utils/constants.js';
import { createInitialState, getStateSummary } from './GameState.js';
import { clamp, deepClone, formatTimestamp, log } from '../utils/helpers.js';

// ─────────────────────────────────────────────────────────────
// 模块内部单例
// ─────────────────────────────────────────────────────────────

/** @type {import('./GameState.js').GameState} */
let _state = null;

// 【新增】：全局持久化状态（独立于单局游戏）
let _globalState = {
  playCount: 0,           // 历史开局次数
  unlockedEndings: [],    // 已解锁的结局 ID 列表
  unlockedAchievements: []// 预留成就系统
};

/**
 * 变更监听器列表。
 * UI 层通过 StateManager.subscribe() 注册回调，
 * 每次状态变化后自动调用。
 * @type {Array<function(GameState): void>}
 */
const _listeners = [];

// ─────────────────────────────────────────────────────────────
// 内部工具
// ─────────────────────────────────────────────────────────────

/**
 * 通知所有已注册的 UI 监听器。
 * 每次状态发生有意义的变化后调用。
 */
function _notifyChange() {
  const snapshot = deepClone(_state); // 传递不可变快照，防止 UI 层意外修改
  _listeners.forEach((fn) => {
    try { fn(snapshot); }
    catch (e) { log('error', 'StateManager', '监听器执行异常', e); }
  });
}

/**
 * 属性名 → 允许的数值范围映射。
 * 仅对有上下限约束的属性进行 clamp。
 */
const STAT_BOUNDS = Object.freeze({
  AP:               { min: 0, max: CONSTANTS.AP_MAX_PER_MONTH },
  Mental_Health:    { min: CONSTANTS.MENTAL_HEALTH_MIN,    max: CONSTANTS.MENTAL_HEALTH_MAX    },
  Physical_Health:  { min: CONSTANTS.PHYSICAL_HEALTH_MIN,  max: CONSTANTS.PHYSICAL_HEALTH_MAX  },
  Academic_Ability: { min: CONSTANTS.ACADEMIC_ABILITY_MIN, max: CONSTANTS.ACADEMIC_ABILITY_MAX },
  English_Ability:  { min: CONSTANTS.ENGLISH_ABILITY_MIN,  max: CONSTANTS.ENGLISH_ABILITY_MAX  },
  Money:            { min: CONSTANTS.MONEY_MIN,            max: CONSTANTS.MONEY_MAX            }, // 【新增】将资金限制在 0-100
});

// ─────────────────────────────────────────────────────────────
// 全局持久化数据 (Meta-progression)
// ─────────────────────────────────────────────────────────────

function _loadGlobalState() {
  try {
    const raw = localStorage.getItem(CONSTANTS.GLOBAL_SAVE_KEY);
    if (raw) {
      _globalState = { ..._globalState, ...JSON.parse(raw) };
    }
  } catch (e) {
    log('error', 'StateManager', '读取全局存档失败', e);
  }
}

function _saveGlobalState() {
  try {
    localStorage.setItem(CONSTANTS.GLOBAL_SAVE_KEY, JSON.stringify(_globalState));
  } catch (e) {
    log('error', 'StateManager', '保存全局存档失败', e);
  }
}

export function getPlayCount() {
  return _globalState.playCount;
}

export function unlockEnding(endingId) {
  if (!_globalState.unlockedEndings.includes(endingId)) {
    _globalState.unlockedEndings.push(endingId);
    _saveGlobalState();
    log('info', 'StateManager', `🏆 解锁新结局图鉴：${endingId}`);
  }
}

// ─────────────────────────────────────────────────────────────
// 初始化 / 获取状态
// ─────────────────────────────────────────────────────────────

/**
 * 初始化状态管理器。
 * 优先从 localStorage 恢复存档，否则创建初始状态。
 * 应在应用启动时调用一次。
 * @returns {import('./GameState.js').GameState} 当前状态快照
 */
export function initStateManager() {
  _loadGlobalState(); // 【新增】应用启动时加载全局数据

  const saved = loadGame();
  if (saved) {
    const { valid, errors } = validateState(saved);
    if (valid) {
      _state = saved;
      log('info', 'StateManager', '✅ 从存档恢复状态', `Month ${_state.currentMonth}`);
    } else {
      log('warn', 'StateManager', '存档校验失败，已重置', errors);
      _state = createInitialState();
    }
  } else {
    _state = createInitialState();
    // 【修改】：如果没有单局存档，说明是首次打开或刚通关，不在这里加 playCount，在进入游戏时加
    log('info', 'StateManager', '✅ 创建全新游戏状态');
  }
  return deepClone(_state);
}

/**
 * 获取当前状态的不可变快照。
 * UI 层应使用此方法读取状态，而非持有内部引用。
 * @returns {import('./GameState.js').GameState}
 */
export function getState() {
  if (!_state) {
    throw new Error('[StateManager] 状态未初始化，请先调用 initStateManager()');
  }
  return deepClone(_state);
}

// ─────────────────────────────────────────────────────────────
// 订阅 / 取消订阅
// ─────────────────────────────────────────────────────────────

/**
 * 注册状态变更监听器（UI 层调用）。
 * @param {function(GameState): void} listener
 * @returns {function(): void} 取消订阅函数
 */
export function subscribe(listener) {
  _listeners.push(listener);
  // 立即以当前状态触发一次，让 UI 完成初始渲染
  try { listener(deepClone(_state)); }
  catch (e) { log('error', 'StateManager', '初始监听器执行异常', e); }

  // 返回取消订阅函数
  return () => {
    const idx = _listeners.indexOf(listener);
    if (idx !== -1) _listeners.splice(idx, 1);
  };
}

// ─────────────────────────────────────────────────────────────
// 数值修改
// ─────────────────────────────────────────────────────────────

/**
 * 批量修改状态数值，自动 clamp，并记录待飘字队列。
 *
 * @param {Object} deltas
 *   属性名 → 变化量的映射，例如：
 *   { Mental_Health: -10, Money: -30000, Academic_Ability: +5 }
 *
 * @param {Object} [labels]
 *   属性名 → UI 显示名称，例如：
 *   { Mental_Health: '心理健康', Money: '资金' }
 *   省略时使用属性名本身。
 *
 * @returns {Object} 实际发生的变化量（clamp 后可能与输入不同）
 */
export function applyStatDelta(deltas, labels = {}) {
  if (!_state) throw new Error('[StateManager] 状态未初始化');

  const actualDeltas = {};

  for (const [stat, rawDelta] of Object.entries(deltas)) {
    if (!(stat in _state)) {
      log('warn', 'StateManager', `未知属性：${stat}，已跳过`);
      continue;
    }

    const oldValue   = _state[stat];
    const bounds     = STAT_BOUNDS[stat];
    let   newValue   = oldValue + rawDelta;

    if (bounds) {
      newValue = clamp(newValue, bounds.min, bounds.max);
    }

    const actualDelta = newValue - oldValue;
    _state[stat]      = newValue;
    actualDeltas[stat] = actualDelta;

    // 仅当数值真正发生变化时，推入飘字队列
    if (actualDelta !== 0) {
      _state.pendingStatChanges.push({
        stat,
        delta: actualDelta,
        label: labels[stat] ?? stat,
      });
    }

    log(
      'debug', 'StateManager',
      `${stat}: ${oldValue} → ${newValue}（Δ${actualDelta >= 0 ? '+' : ''}${actualDelta}）`
    );
  }

  _notifyChange();
  return actualDeltas;
}

/**
 * 消费（清空）待飘字队列，返回队列内容后清空。
 * 由 FloatingText 组件在渲染飘字后调用。
 * @returns {import('./GameState.js').StatDelta[]}
 */
export function consumePendingStatChanges() {
  const changes = deepClone(_state.pendingStatChanges);
  _state.pendingStatChanges = [];
  return changes;
}

// ─────────────────────────────────────────────────────────────
// AP 专用操作
// ─────────────────────────────────────────────────────────────

/**
 * 尝试消耗 AP。
 * @param {number} [cost=1]
 * @returns {boolean} 是否成功（AP 不足时返回 false，不修改状态）
 */
export function consumeAP(cost = 1) {
  if (!_state) throw new Error('[StateManager] 状态未初始化');

  if (_state.AP < cost) {
    log('info', 'StateManager', `AP 不足：需要 ${cost}，当前 ${_state.AP}`);
    return false;
  }

  _state.AP               -= cost;
  _state.AP_used_this_month += cost;

  _state.pendingStatChanges.push({
    stat:  'AP',
    delta: -cost,
    label: '行动点',
  });

  _notifyChange();
  log('debug', 'StateManager', `消耗 AP ${cost}，剩余 ${_state.AP}`);
  return true;
}

/**
 * 月初重置 AP。
 */
export function resetAPForNewMonth() {
  _state.AP               = CONSTANTS.AP_MAX_PER_MONTH;
  _state.AP_used_this_month = 0;
  log('debug', 'StateManager', `AP 已重置为 ${CONSTANTS.AP_MAX_PER_MONTH}`);
  // 月初重置不产生飘字
}

// ─────────────────────────────────────────────────────────────
// 标签 (Tag) 操作
// ─────────────────────────────────────────────────────────────

/**
 * 添加标签（自动去重）。
 * @param {string} tag
 * @returns {boolean} 是否为新增（已存在返回 false）
 */
export function addTag(tag) {
  if (!_state) throw new Error('[StateManager] 状态未初始化');

  if (_state.tags.includes(tag)) {
    log('debug', 'StateManager', `标签已存在，跳过：${tag}`);
    return false;
  }

  _state.tags.push(tag);
  log('info', 'StateManager', `✅ 获得标签：${tag}`);
  _notifyChange();
  return true;
}

/**
 * 移除标签。
 * @param {string} tag
 * @returns {boolean} 是否成功（不存在返回 false）
 */
export function removeTag(tag) {
  if (!_state) throw new Error('[StateManager] 状态未初始化');

  const idx = _state.tags.indexOf(tag);
  if (idx === -1) return false;

  _state.tags.splice(idx, 1);
  log('info', 'StateManager', `移除标签：${tag}`);
  _notifyChange();
  return true;
}

/**
 * 检查是否持有某标签。
 * @param {string} tag
 * @returns {boolean}
 */
export function hasTag(tag) {
  return _state?.tags.includes(tag) ?? false;
}

// ─────────────────────────────────────────────────────────────
// Buff 操作
// ─────────────────────────────────────────────────────────────

/**
 * 添加 Buff（同 buffId 的旧条目将被覆盖）。
 * @param {import('./GameState.js').ActiveBuff} buff
 */
export function addBuff(buff) {
  if (!_state) throw new Error('[StateManager] 状态未初始化');

  const existing = _state.activeBuff.findIndex(b => b.buffId === buff.buffId);
  if (existing !== -1) {
    _state.activeBuff[existing] = buff;
    log('info', 'StateManager', `Buff 已刷新：${buff.label}`);
  } else {
    _state.activeBuff.push(buff);
    log('info', 'StateManager', `✅ 获得 Buff：${buff.label}`);
  }

  _notifyChange();
}

/**
 * 移除 Buff。
 * @param {string} buffId
 * @returns {boolean}
 */
export function removeBuff(buffId) {
  if (!_state) throw new Error('[StateManager] 状态未初始化');

  const idx = _state.activeBuff.findIndex(b => b.buffId === buffId);
  if (idx === -1) return false;

  const removed = _state.activeBuff.splice(idx, 1)[0];
  log('info', 'StateManager', `移除 Buff：${removed.label}`);
  _notifyChange();
  return true;
}

/**
 * 获取特定 Buff 对象（深克隆）。
 * @param {string} buffId
 * @returns {import('./GameState.js').ActiveBuff | null}
 */
export function getBuff(buffId) {
  const buff = _state?.activeBuff.find(b => b.buffId === buffId);
  return buff ? deepClone(buff) : null;
}

// ─────────────────────────────────────────────────────────────
// 游戏阶段控制
// ─────────────────────────────────────────────────────────────

/**
 * 切换游戏阶段（gamePhase），通知 UIManager 切换 Screen。
 * @param {string} phase  CONSTANTS.GAME_PHASE 中的枚举值
 */
// export function setGamePhase(phase) {
//   if (!_state) throw new Error('[StateManager] 状态未初始化');

//   const prev = _state.gamePhase;
//   _state.gamePhase = phase;
//   log('info', 'StateManager', `GamePhase: ${prev} → ${phase}`);
//   _notifyChange();
// }
export function setGamePhase(phase) {
  if (!_state) throw new Error('[StateManager] 状态未初始化');

  const prev = _state.gamePhase;
  _state.gamePhase = phase;
  log('info', 'StateManager', `GamePhase: ${prev} → ${phase}`);

  // 离开 TITLE 时说明玩家做出了第一个有效操作，触发首次存档
  if (prev === CONSTANTS.GAME_PHASE.TITLE && phase !== CONSTANTS.GAME_PHASE.TITLE) {
    saveGame();
  }

  _notifyChange();
}

/**
 * 设置 isProcessing 互斥锁。
 * @param {boolean} value
 */
export function setProcessing(value) {
  if (!_state) return;
  _state.isProcessing = value;
  // 不触发 _notifyChange（避免频繁重渲染）
}

// ─────────────────────────────────────────────────────────────
// 月份推进
// ─────────────────────────────────────────────────────────────

/**
 * 推进到下一个月份，更新 currentMonth 和 currentPhase。
 * 调用方（nextMonth 编排函数）负责在此之前完成当月结算。
 * @returns {{ newMonth: number, newPhase: string, isGameEnd: boolean }}
 */
export function advanceMonth() {
  if (!_state) throw new Error('[StateManager] 状态未初始化');

  const newMonth = _state.currentMonth + 1;
  const isGameEnd = newMonth > 12;

  if (!isGameEnd) {
    _state.currentMonth = newMonth;
    _state.currentPhase = CONSTANTS.MONTH_TO_PHASE[newMonth];
    resetAPForNewMonth();

    // 学期初清零 Academic_Ability
    if (CONSTANTS.SEMESTER_START_MONTHS.includes(newMonth)) {
      _state.Academic_Ability = 0;
      log('info', 'StateManager', `学期初：Academic_Ability 已清零（Month ${newMonth}）`);
    }
  }

  log('info', 'StateManager', isGameEnd ? '游戏结束' : `推进至 Month ${newMonth}`);
  _notifyChange();

  return {
    newMonth:  isGameEnd ? _state.currentMonth : newMonth,
    newPhase:  _state.currentPhase,
    isGameEnd,
  };
}

// ─────────────────────────────────────────────────────────────
// 事件系统辅助
// ─────────────────────────────────────────────────────────────

/**
 * 将事件标记为已触发（唯一性保证）。
 * @param {string} eventId
 */
export function markEventTriggered(eventId) {
  if (!_state) throw new Error('[StateManager] 状态未初始化');
  if (!_state.triggeredEventIds.includes(eventId)) {
    _state.triggeredEventIds.push(eventId);
  }
}

/**
 * 向事件队列头部插入事件（高优先级，如特殊大事件）。
 * @param {import('./GameState.js').PendingEvent} event
 */
export function enqueueEventFront(event) {
  if (!_state) throw new Error('[StateManager] 状态未初始化');
  _state.pendingEventQueue.unshift(event);
  log('debug', 'StateManager', `事件入队（头部）：${event.eventId}`);
}

/**
 * 向事件队列尾部追加事件（普通优先级）。
 * @param {import('./GameState.js').PendingEvent} event
 */
export function enqueueEventBack(event) {
  if (!_state) throw new Error('[StateManager] 状态未初始化');
  _state.pendingEventQueue.push(event);
  log('debug', 'StateManager', `事件入队（尾部）：${event.eventId}`);
}

/**
 * 从队列头部取出下一个待处理事件，并设为 currentEvent。
 * @param {Object} eventData  完整的事件数据对象（从 events.js 查找）
 * @returns {Object} eventData
 */
export function startEvent(eventData) {
  if (!_state) throw new Error('[StateManager] 状态未初始化');

  _state.pendingEventQueue.shift(); // 移除队首
  _state.currentEvent      = eventData;
  _state.currentDialogIndex = 0;

  log('info', 'StateManager', `▶ 开始事件：${eventData.event_id}`);
  _notifyChange();
  return deepClone(eventData);
}

/**
 * 将队首事件从 pendingEventQueue 中移除（无需启动事件时使用）。
 * 用于清理数据不存在的无效事件记录，防止队列卡死。
 */
export function dequeueEvent() {
  if (!_state || _state.pendingEventQueue.length === 0) return;
  const removed = _state.pendingEventQueue.shift();
  log('warn', 'StateManager', `已移除无效队首事件：${removed?.eventId}`);
  _notifyChange();
}


/**
 * 清除当前事件（事件结束后调用）。
 */
export function clearCurrentEvent() {
  if (!_state) return;
  _state.currentEvent      = null;
  _state.currentDialogIndex = 0;
  _notifyChange();
}

/**
 * 推进对话索引。
 * @returns {number} 新的 dialogIndex
 */
export function advanceDialogIndex() {
  if (!_state) throw new Error('[StateManager] 状态未初始化');
  _state.currentDialogIndex++;
  return _state.currentDialogIndex;
}

// ─────────────────────────────────────────────────────────────
// GPA 记录
// ─────────────────────────────────────────────────────────────

/**
 * 追加一条学期 GPA 记录，并更新 cumulativeGPA。
 * @param {import('./GameState.js').SemesterGPARecord} record
 */
export function recordSemesterGPA(record) {
  if (!_state) throw new Error('[StateManager] 状态未初始化');

  _state.semesterGPA.push(record);

  // 重新计算累计 GPA（简单平均）
  const total = _state.semesterGPA.reduce((sum, r) => sum + r.gpa, 0);
  _state.cumulativeGPA = Math.round((total / _state.semesterGPA.length) * 100) / 100;

  log(
    'info', 'StateManager',
    `GPA 记录：${record.phase} → ${record.gpa}，累计 GPA：${_state.cumulativeGPA}`
  );
  _notifyChange();
}

// ─────────────────────────────────────────────────────────────
// 持久化（localStorage）
// ─────────────────────────────────────────────────────────────

/**
 * 自动存档（静默执行，无 UI 提示）。
 * 将当前 _state 序列化写入 localStorage。
 */
export function saveGame() {
  if (!_state) return;

  _state.saveTimestamp = Date.now();

  // gamePhase 属于 UI 状态，不持久化
  // 读档后统一从 MAP 界面继续（语义：继续游戏 = 回到地图）
  const dataToSave = {
    ..._state,
    gamePhase: CONSTANTS.GAME_PHASE.MAP,
  };

  try {
    localStorage.setItem(CONSTANTS.SAVE_KEY, JSON.stringify(dataToSave));
    log('debug', 'StateManager', `💾 自动存档 @ ${formatTimestamp(_state.saveTimestamp)}`);
  } catch (e) {
    log('error', 'StateManager', '存档失败（localStorage 不可用）', e);
  }
}

/**
 * 从 localStorage 读取存档。
 * @returns {import('./GameState.js').GameState | null}
 */
export function loadGame() {
  try {
    const raw = localStorage.getItem(CONSTANTS.SAVE_KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch (e) {
    log('error', 'StateManager', '读取存档失败', e);
    return null;
  }
}

/**
 * 清空存档（用于"重新开始"）。
 */
export function clearSave() {
  try {
    localStorage.removeItem(CONSTANTS.SAVE_KEY);
    log('info', 'StateManager', '🗑️ 存档已清空');
  } catch (e) {
    log('error', 'StateManager', '清空存档失败', e);
  }
}

/**
 * 检查是否存在有效存档。
 * @returns {boolean}
 */
export function hasSave() {
  try {
    return localStorage.getItem(CONSTANTS.SAVE_KEY) !== null;
  } catch {
    return false;
  }
}

/**
 * 获取存档预览信息（供主菜单"继续游戏"显示）。
 * @returns {{ month: number, phase: string, phaseLabel: string, timestamp: string } | null}
 */
export function getSavePreview() {
  const saved = loadGame();
  if (!saved) return null;

  const { valid } = validateState(saved);
  if (!valid) return null;

  return {
    month:      saved.currentMonth,
    phase:      saved.currentPhase,
    phaseLabel: CONSTANTS.PHASE_LABELS[saved.currentPhase] ?? saved.currentPhase,
    monthLabel: CONSTANTS.MONTH_TO_REALWORLD[saved.currentMonth] ?? `Month ${saved.currentMonth}`,
    timestamp:  formatTimestamp(saved.saveTimestamp),
  };
}

/**
 * 重置游戏：清空存档 + 重新初始化状态。
 * @returns {import('./GameState.js').GameState} 新状态快照
 */
export function resetGame() {
  clearSave();
  _state = createInitialState();
  
  // 【新增】：每次重新开始新游戏，游玩次数 +1
  _globalState.playCount += 1;
  _saveGlobalState();
  
  log('info', 'StateManager', `🔄 游戏已重置，当前是第 ${_globalState.playCount} 周目`);
  _notifyChange();
  return deepClone(_state);
}

// ─────────────────────────────────────────────────────────────
// 存档校验 / 迁移
// ─────────────────────────────────────────────────────────────

/**
 * 检查存档数据结构的完整性。
 * 用于防止旧版存档或损坏数据导致游戏崩溃。
 *
 * @param {any} data  从 localStorage 解析出的对象
 * @returns {{ valid: boolean, errors: string[] }}
 */
export function validateState(data) {
  const errors = [];

  if (!data || typeof data !== 'object') {
    return { valid: false, errors: ['存档不是有效对象'] };
  }

  // 必须字段检查
  const required = [
    'version', 'school', 'currentMonth', 'currentPhase',
    'AP', 'Mental_Health', 'Physical_Health', 'Money',
    'Academic_Ability', 'English_Ability',
    'tags', 'activeBuff', 'semesterGPA',
    'triggeredEventIds', 'pendingEventQueue',
    'gamePhase',
  ];

  for (const field of required) {
    if (!(field in data)) {
      errors.push(`缺少必要字段：${field}`);
    }
  }

  // 版本兼容性检查
  if (data.version && data.version !== CONSTANTS.SAVE_VERSION) {
    log('warn', 'StateManager', `存档版本不匹配：${data.version} → ${CONSTANTS.SAVE_VERSION}`);
    // 当前 MVP 版本：版本不匹配时直接重置（未来可做迁移）
    errors.push(`存档版本 ${data.version} 与当前版本 ${CONSTANTS.SAVE_VERSION} 不兼容`);
  }

  // 数值范围检查（宽松，仅检查明显异常）
  if (typeof data.currentMonth === 'number') {
    if (data.currentMonth < 1 || data.currentMonth > 12) {
      errors.push(`currentMonth 超出范围：${data.currentMonth}`);
    }
  }

  return {
    valid:  errors.length === 0,
    errors,
  };
}

/**
 * 存档迁移占位函数（未来版本更新时实现）。
 * @param {object} oldState
 * @returns {object} 迁移后的 state
 */
export function migrateState(oldState) {
  // MVP 阶段：暂不实现，直接返回原数据
  log('warn', 'StateManager', '存档迁移：当前版本无迁移逻辑，返回原数据');
  return oldState;
}

// ─────────────────────────────────────────────────────────────
// 调试工具（开发期专用）
// ─────────────────────────────────────────────────────────────

/**
 * 将完整状态摘要打印到控制台（调试用）。
 */
export function debugPrintState() {
  if (!_state) {
    log('warn', 'StateManager', '状态未初始化');
    return;
  }
  console.table(getStateSummary(_state));
}

/**
 * 暴露内部状态（仅测试用，生产环境不应调用）。
 * @returns {import('./GameState.js').GameState}
 */
export function _getInternalState() {
  return _state;
}