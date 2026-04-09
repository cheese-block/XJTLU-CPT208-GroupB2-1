/**
 * @fileoverview Buff 管理引擎
 *
 * 职责：
 *   - 计算 Buff 对行动收益（数值）的修正
 *   - 计算 Buff 对 AP 消耗的修正
 */

/**
 * 遍历玩家当前的所有 Buff，对基础收益进行修正。
 * @param {object} state       当前游戏状态
 * @param {string} actionId    当前正在执行的行动 ID
 * @param {object} baseEffects 行动的基础收益（如 { English_Ability: +6, Mental_Health: -8 }）
 * @returns {object}           修正后的最终收益
 */
export function applyBuffModifiers(state, actionId, baseEffects) {
  // 深拷贝一份基础收益，避免污染原始数据
  const modifiedEffects = { ...baseEffects };

  if (!state.activeBuff || state.activeBuff.length === 0) {
    return modifiedEffects;
  }

  state.activeBuff.forEach(buff => {
    if (buff.effects && buff.effects.stat_modifier) {
      const mod = buff.effects.stat_modifier;
      
      // 判断该 Buff 是否对当前行动生效（action 为 null 代表全局生效）
      if (!mod.action || mod.action === actionId) {
        // 如果基础收益中已经有这个属性，则叠加；如果没有，则新增
        if (modifiedEffects[mod.stat] !== undefined) {
          modifiedEffects[mod.stat] += mod.delta;
        } else {
          modifiedEffects[mod.stat] = mod.delta;
        }
      }
    }
  });

  return modifiedEffects;
}

/**
 * 计算 Buff 对 AP 消耗的修正（如某些 Buff 可以减少 AP 消耗）。
 * @param {object} state 
 * @param {string} actionId 
 * @returns {number} AP 修正值（负数代表减少消耗）
 */
export function getAPCostModifier(state, actionId) {
  let costMod = 0;
  if (!state.activeBuff) return costMod;

  state.activeBuff.forEach(buff => {
    if (buff.effects && buff.effects.AP_cost_modifier) {
      costMod += buff.effects.AP_cost_modifier;
    }
  });

  return costMod;
}