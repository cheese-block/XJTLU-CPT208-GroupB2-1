/**
 * @fileoverview 通用工具函数库
 * 纯函数，无副作用，无外部依赖。
 */

// ─────────────────────────────────────────────────────────────
// 数值工具
// ─────────────────────────────────────────────────────────────

/**
 * 将数值钳制在 [min, max] 区间内。
 * 所有 applyStatDelta 调用必须经过此函数。
 * @param {number} value
 * @param {number} min
 * @param {number} max
 * @returns {number}
 */
export function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

/**
 * 在 [min, max] 之间生成随机整数（含两端）。
 * @param {number} min
 * @param {number} max
 * @returns {number}
 */
export function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * 按概率返回 true（0~1 之间的小数）。
 * @param {number} probability  例：0.20 代表 20%
 * @returns {boolean}
 */
export function rollChance(probability) {
  return Math.random() < probability;
}

// ─────────────────────────────────────────────────────────────
// 数组工具
// ─────────────────────────────────────────────────────────────

/**
 * 从数组中随机取一个元素，不修改原数组。
 * @template T
 * @param {T[]} arr
 * @returns {T | undefined}
 */
export function pickRandom(arr) {
  if (!arr || arr.length === 0) return undefined;
  return arr[Math.floor(Math.random() * arr.length)];
}

/**
 * 深克隆一个可序列化对象（用于存档读取后的安全拷贝）。
 * @template T
 * @param {T} obj
 * @returns {T}
 */
export function deepClone(obj) {
  return JSON.parse(JSON.stringify(obj));
}

// ─────────────────────────────────────────────────────────────
// 字符串工具
// ─────────────────────────────────────────────────────────────

/**
 * 格式化金钱数值为带逗号的人民币字符串。
 * @param {number} amount
 * @returns {string}  例："¥50,000"
 */
export function formatMoney(amount) {
  return `¥${Math.abs(amount).toLocaleString('zh-CN')}${amount < 0 ? '（负债）' : ''}`;
}

/**
 * 将 delta 数值格式化为带正负号的字符串。
 * @param {number} delta
 * @param {string} [unit='']  单位后缀，如 " AP"
 * @returns {string}  例："+20" / "-10 心理健康"
 */
export function formatDelta(delta, unit = '') {
  const sign = delta >= 0 ? '+' : '';
  return `${sign}${delta}${unit}`;
}

// ─────────────────────────────────────────────────────────────
// 时间工具
// ─────────────────────────────────────────────────────────────

/**
 * 返回可读的时间戳字符串（用于存档预览）。
 * @param {number} timestamp  Date.now()
 * @returns {string}  例："2025-01-15 14:32"
 */
export function formatTimestamp(timestamp) {
  if (!timestamp) return '—';
  const d = new Date(timestamp);
  const pad = (n) => String(n).padStart(2, '0');
  return (
    `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())} ` +
    `${pad(d.getHours())}:${pad(d.getMinutes())}`
  );
}

// ─────────────────────────────────────────────────────────────
// 日志工具（统一日志入口，后续可按 LOG_LEVEL 过滤）
// ─────────────────────────────────────────────────────────────

/**
 * @param {'debug'|'info'|'warn'|'error'} level
 * @param {string} module  模块名，如 'StateManager'
 * @param {...any} args
 */
export function log(level, module, ...args) {
  const prefix = `[${module}]`;
  switch (level) {
    case 'debug': console.debug(prefix, ...args); break;
    case 'info':  console.info(prefix,  ...args); break;
    case 'warn':  console.warn(prefix,  ...args); break;
    case 'error': console.error(prefix, ...args); break;
  }
}

// ─────────────────────────────────────────────────────────────
// 环境检测工具
// ─────────────────────────────────────────────────────────────

/**
 * 判断当前是否处于移动端环境。
 * 综合考虑指针类型和屏幕宽度。
 * @returns {boolean}
 */
export function isMobile() {
  // 1. 指针检测 (最准确的移动端特征)
  const isTouch = window.matchMedia("(pointer: coarse)").matches;
  
  // 2. 屏幕宽度检测 (处理模拟器或极小窗口)
  const isSmallScreen = window.innerWidth <= 1024;

  return isTouch || isSmallScreen;
}
