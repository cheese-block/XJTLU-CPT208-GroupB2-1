/**
 * 单建筑死磕蒙特卡洛：同一 action 重复整局，估计坏结局率与学力分布。
 * 用法：node scripts/simulate-building-only.mjs [actionId] [runs]
 * 无参数时：遍历所有非空 eventPool 的 action，各跑默认次数。
 * 环境变量 STATS=1 时额外打印各池波动条「推向0/推向100」强度比（仅统计带 effects 的选项）。
 */

import { EVENTS } from '../src/data/events.js';
import { ACTIONS } from '../src/data/actions.js';
import { CONSTANTS } from '../src/utils/constants.js';

const FLUCT = ['Mental_Health', 'Physical_Health', 'Money'];
const ACCUM = ['Academic_Ability', 'English_Ability'];

const BOUNDS = {
  Mental_Health: { min: CONSTANTS.MENTAL_HEALTH_MIN, max: CONSTANTS.MENTAL_HEALTH_MAX },
  Physical_Health: { min: CONSTANTS.PHYSICAL_HEALTH_MIN, max: CONSTANTS.PHYSICAL_HEALTH_MAX },
  Money: { min: CONSTANTS.MONEY_MIN, max: CONSTANTS.MONEY_MAX },
  Academic_Ability: { min: CONSTANTS.ACADEMIC_ABILITY_MIN, max: CONSTANTS.ACADEMIC_ABILITY_MAX },
  English_Ability: { min: CONSTANTS.ENGLISH_ABILITY_MIN, max: CONSTANTS.ENGLISH_ABILITY_MAX },
};

function clamp(val, min, max) {
  return Math.min(max, Math.max(min, val));
}

function isBadEnd(s) {
  if (s.Mental_Health <= 0 || s.Mental_Health >= 100) return true;
  if (s.Physical_Health <= 0 || s.Physical_Health >= 100) return true;
  if (s.Money <= 0 || s.Money >= 100) return true;
  return false;
}

function applyEffects(state, deltas) {
  const next = { ...state };
  for (const [k, raw] of Object.entries(deltas)) {
    if (!(k in next)) continue;
    const b = BOUNDS[k];
    let v = next[k] + raw;
    if (b) v = clamp(v, b.min, b.max);
    next[k] = v;
  }
  return next;
}

/** 收集事件内所有「叶子」choice 的 effects（含多 scene） */
function collectChoiceEffectLeaves(event) {
  const out = [];
  const walk = (scenes) => {
    if (!Array.isArray(scenes)) return;
    for (const scene of scenes) {
      if (scene.choices?.length) {
        for (const ch of scene.choices) {
          const eff = ch.effects && typeof ch.effects === 'object' ? { ...ch.effects } : {};
          if (Object.keys(eff).length) out.push(eff);
        }
      }
      if (scene.scenes) walk(scene.scenes);
    }
  };
  walk(event?.scenes);
  return out;
}

function pickRandomChoiceEffects(eventId) {
  const ev = EVENTS[eventId];
  if (!ev) return {};
  const leaves = collectChoiceEffectLeaves(ev);
  if (!leaves.length) return {};
  return leaves[Math.floor(Math.random() * leaves.length)];
}

function initialState() {
  return {
    Mental_Health: CONSTANTS.MENTAL_HEALTH_INIT,
    Physical_Health: CONSTANTS.PHYSICAL_HEALTH_INIT,
    Money: CONSTANTS.MONEY_INIT,
    Academic_Ability: CONSTANTS.ACADEMIC_ABILITY_INIT,
    English_Ability: CONSTANTS.ENGLISH_ABILITY_INIT,
  };
}

/** 与 GameLoop 一致：80% 池内随机，20% 保底（无数值） */
function simulateRun(actionId) {
  const action = ACTIONS[actionId];
  if (!action) return { dead: true, reason: 'unknown_action', months: 0, ap: 0, academicEnd: 0 };

  const pool = action.eventPool || [];
  let s = initialState();

  for (let month = 1; month <= CONSTANTS.MAX_MONTHS; month++) {
    for (let ap = 0; ap < CONSTANTS.AP_MAX_PER_MONTH; ap++) {
      let eventId = action.guaranteedEventId;
      if (pool.length > 0 && Math.random() < 0.8) {
        eventId = pool[Math.floor(Math.random() * pool.length)];
      }
      const ev = EVENTS[eventId];
      if (ev && !String(eventId).startsWith('default_')) {
        const eff = pickRandomChoiceEffects(eventId);
        s = applyEffects(s, eff);
      }
      if (isBadEnd(s)) {
        return { dead: true, month, ap, academicEnd: s.Academic_Ability, englishEnd: s.English_Ability };
      }
    }
  }
  return { dead: false, academicEnd: s.Academic_Ability, englishEnd: s.English_Ability };
}

function poolSymmetryStats(poolIds) {
  const toward0 = { Mental_Health: 0, Physical_Health: 0, Money: 0 };
  const toward100 = { Mental_Health: 0, Physical_Health: 0, Money: 0 };
  for (const id of poolIds) {
    const ev = EVENTS[id];
    if (!ev) continue;
    for (const eff of collectChoiceEffectLeaves(ev)) {
      for (const k of FLUCT) {
        const v = eff[k];
        if (v == null || v === 0) continue;
        if (v < 0) toward0[k] += -v;
        else toward100[k] += v;
      }
    }
  }
  return { toward0, toward100 };
}

function printPoolStats() {
  console.log('\n--- Pool fluctuation symmetry (sum |neg| vs sum pos) ---\n');
  const pools = [
    ['study_class', ACTIONS.study_class.eventPool],
    ['rest', ACTIONS.rest.eventPool],
    ['research_ir', ACTIONS.research_ir.eventPool],
    ['study_ielts', ACTIONS.study_ielts.eventPool],
  ];
  for (const [name, ids] of pools) {
    if (!ids?.length) continue;
    const { toward0, toward100 } = poolSymmetryStats(ids);
    console.log(name, ids.length, 'events');
    for (const k of FLUCT) {
      const a = toward0[k];
      const b = toward100[k];
      const ratio = b === 0 ? (a === 0 ? 'n/a' : 'inf') : (a / b).toFixed(2);
      console.log(`  ${k}: toward0=${a} toward100=${b} ratio0/100=${ratio}`);
    }
  }
}

const DEFAULT_RUNS = 2000;
const argv = process.argv.slice(2).filter((a) => a !== '--stats');
const runs = Math.max(1, parseInt(argv[1] || process.env.RUNS || String(DEFAULT_RUNS), 10));

if (process.env.STATS === '1' || process.argv.includes('--stats')) {
  printPoolStats();
}

const targetAction = argv[0];

if (targetAction) {
  let dead = 0;
  let acSum = 0;
  for (let i = 0; i < runs; i++) {
    const r = simulateRun(targetAction);
    if (r.dead) dead++;
    acSum += r.academicEnd ?? 0;
  }
  console.log(JSON.stringify({
    actionId: targetAction,
    runs,
    badEndRate: dead / runs,
    avgAcademicEnd: acSum / runs,
  }, null, 2));
} else {
  const rows = [];
  for (const [aid, act] of Object.entries(ACTIONS)) {
    if (!act.eventPool?.length) continue;
    if (aid === 'visit_ia') continue;
    let dead = 0;
    let acSum = 0;
    for (let i = 0; i < runs; i++) {
      const r = simulateRun(aid);
      if (r.dead) dead++;
      acSum += r.academicEnd ?? 0;
    }
    rows.push({
      actionId: aid,
      runs,
      badEndRate: Number((dead / runs).toFixed(3)),
      avgAcademicEnd: Number((acSum / runs).toFixed(1)),
    });
  }
  console.log(JSON.stringify(rows, null, 2));
}
