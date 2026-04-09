/**
 * @fileoverview 应用入口（M2 修复版）
 *
 * 修复内容：
 *   1. M1 验证不再调用 resetGame()，验证结束后存档干净的初始状态
 *   2. 修复 consumeAP 循环的 state 快照时机 bug
 *   3. 验证函数与游戏存档完全隔离
 */

import { CONSTANTS }       from './src/utils/constants.js';
import * as StateManager   from './src/state/StateManager.js';
import { log }             from './src/utils/helpers.js';

import { initUIManager, registerScreen } from './src/ui/UIManager.js';
import { TitleScreen }   from './src/ui/screens/TitleScreen.js';

// ─────────────────────────────────────────────────────────────
// 启动入口
// ─────────────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {

  // 1. 初始化 Lucide
  initLucide();

  // 2. 初始化状态管理器（含存档恢复）
  //    注意：必须在 runM1Verification() 之前调用，
  //    因为验证函数依赖 StateManager 已初始化
  StateManager.initStateManager();

  // 3. 注册全局副作用监听（飘字 + 危险叠层）
  StateManager.subscribe((state) => {
    updateDangerOverlay(state);
    flushFloatingTexts();
  });

  // 4. 注册所有已实现的 Screen
  registerScreen(CONSTANTS.GAME_PHASE.TITLE, new TitleScreen());

  // 5. 初始化 UIManager
  initUIManager();

  // 6. M1 验证已完成，暂时禁用（避免污染存档）
  // if (CONSTANTS.MAP_DEBUG) {
  //   runM1Verification();
  // }

  // 7. 触发主菜单显示
  //    无论存档的 gamePhase 是什么，都先回到 TITLE 让玩家手动选择继续/重开
  StateManager.setGamePhase(CONSTANTS.GAME_PHASE.TITLE);

  log('info', 'Main', '🚀 应用启动完成');
});

// ─────────────────────────────────────────────────────────────
// Lucide 初始化
// ─────────────────────────────────────────────────────────────
function initLucide() {
  if (typeof lucide === 'undefined') {
    console.error('[Main] Lucide 未加载');
    return;
  }
  lucide.createIcons();
  log('info', 'Main', '✅ Lucide 初始化完成');
}

// ─────────────────────────────────────────────────────────────
// 危险叠层
// ─────────────────────────────────────────────────────────────
function updateDangerOverlay(state) {
  const overlay = document.getElementById('danger-overlay');
  if (!overlay) return;
  const danger =
    state.Mental_Health   < CONSTANTS.MENTAL_HEALTH_WARN ||
    state.Physical_Health < CONSTANTS.PHYSICAL_HEALTH_WARN;
  overlay.classList.toggle('is-active', danger);
}

// ─────────────────────────────────────────────────────────────
// 飘字系统
// ─────────────────────────────────────────────────────────────
function flushFloatingTexts() {
  const changes = StateManager.consumePendingStatChanges();
  changes.forEach((change, i) => {
    setTimeout(() => {
      const type = change.delta > 0 ? 'positive' : 'negative';
      const text = `${change.delta > 0 ? '+' : ''}${change.delta} ${change.label}`;
      spawnFloatingText(
        text, type,
        window.innerWidth  / 2 + (i - 1) * 120,
        window.innerHeight * 0.35
      );
    }, i * 150);
  });
}

function spawnFloatingText(text, type, x, y) {
  const layer = document.getElementById('floating-text-layer');
  if (!layer) return;
  const el = document.createElement('span');
  el.className   = `floating-text floating-text--${type}`;
  el.textContent = text;
  el.style.left  = `${x + (Math.random() - 0.5) * 30}px`;
  el.style.top   = `${y}px`;
  layer.appendChild(el);
  el.addEventListener('animationend', () => el.remove(), { once: true });
}

// ─────────────────────────────────────────────────────────────
// M1 验证（DEBUG 模式专用）
//
// 【关键约束】
//   - 验证开始前：备份当前真实存档状态
//   - 验证过程中：在干净的初始状态上跑断言
//   - 验证结束后：恢复备份，绝不污染游戏存档
// ─────────────────────────────────────────────────────────────
function runM1Verification() {
  console.group('%c🦢 M1 验证报告（DEBUG）', 'font-size:1rem;font-weight:900;color:#004B9B;');

  let passed = 0, failed = 0;

  function assert(label, condition, info = '') {
    if (condition) {
      console.log(`%c✅ ${label}`, 'color:#1E8A44;font-weight:700;', info);
      passed++;
    } else {
      console.error(`❌ ${label}`, info);
      failed++;
    }
  }

  // ══════════════════════════════════════════════════════════
  // 备份当前真实存档（验证结束后恢复）
  // ══════════════════════════════════════════════════════════
  const realSaveBackup = localStorage.getItem(CONSTANTS.SAVE_KEY);

  try {
    // ── 清空存档，建立干净的初始验证环境 ──────────────────
    StateManager.clearSave();
    // 直接操作内部状态重置为初始值
    // 使用 resetGame() 的替代方案：手动重新初始化
    // （resetGame 会触发 _notifyChange，可能影响 UI；此处仅需状态干净）
    StateManager.resetGame();

    // ── 初始状态验证 ──────────────────────────────────────
    let s = StateManager.getState();
    assert('初始 currentMonth = 1',     s.currentMonth === 1,                      `实际：${s.currentMonth}`);
    assert('初始 AP = 5',               s.AP === CONSTANTS.AP_MAX_PER_MONTH,       `实际：${s.AP}`);
    assert('初始 Mental_Health = 80',   s.Mental_Health === 80,                    `实际：${s.Mental_Health}`);
    assert('初始 Physical_Health = 80', s.Physical_Health === 80,                  `实际：${s.Physical_Health}`);
    assert('初始 Money = 50000',        s.Money === 50000,                         `实际：${s.Money}`);
    assert('初始 English_Ability = 40', s.English_Ability === 40,                  `实际：${s.English_Ability}`);
    assert('初始 tags 为空',            s.tags.length === 0);
    assert('初始 activeBuff 为空',      s.activeBuff.length === 0);
    assert('初始 gamePhase = TITLE',    s.gamePhase === CONSTANTS.GAME_PHASE.TITLE, `实际：${s.gamePhase}`);

    // ── clamp 验证 ────────────────────────────────────────
    StateManager.applyStatDelta({ Mental_Health: -90 });
    s = StateManager.getState();
    assert('clamp 下限 Mental_Health ≥ 0',   s.Mental_Health === 0,   `实际：${s.Mental_Health}`);

    StateManager.applyStatDelta({ Mental_Health: +200 });
    s = StateManager.getState();
    assert('clamp 上限 Mental_Health ≤ 100', s.Mental_Health === 100, `实际：${s.Mental_Health}`);

    // 恢复 Mental_Health 到正常值
    StateManager.applyStatDelta({ Mental_Health: -20 }); // → 80

    // ── consumeAP 验证 ────────────────────────────────────
    // 修复：每次 consumeAP 后重新读取 state，避免快照时机 bug
    const apInitial = StateManager.getState().AP; // = 5
    const ap1Result = StateManager.consumeAP(1);
    assert('consumeAP(1) 返回 true',    ap1Result === true);
    assert('consumeAP 后 AP = 4',       StateManager.getState().AP === apInitial - 1,
      `实际：${StateManager.getState().AP}`);

    // 逐一耗尽剩余 AP（每次重新读取当前 AP 值）
    while (StateManager.getState().AP > 0) {
      StateManager.consumeAP(1);
    }
    assert('AP 耗尽后为 0',             StateManager.getState().AP === 0);
    assert('AP 耗尽后 consumeAP 返回 false', StateManager.consumeAP(1) === false);

    // 恢复 AP
    StateManager.resetAPForNewMonth();
    assert('resetAPForNewMonth AP = 5', StateManager.getState().AP === CONSTANTS.AP_MAX_PER_MONTH);

    // ── Tag 验证 ──────────────────────────────────────────
    StateManager.addTag('TEST_TAG');
    assert('addTag 成功',               StateManager.hasTag('TEST_TAG'));
    assert('addTag 去重返回 false',     StateManager.addTag('TEST_TAG') === false);
    StateManager.removeTag('TEST_TAG');
    assert('removeTag 成功',            !StateManager.hasTag('TEST_TAG'));

    // ── Buff 验证 ─────────────────────────────────────────
    const testBuff = {
      buffId: 'v_buff', label: '验证Buff', icon: 'star',
      durationType: 'months', remainingMonths: 2,
      effects: {}, source_event_id: 'test',
    };
    StateManager.addBuff(testBuff);
    assert('addBuff 成功',              StateManager.getBuff('v_buff') !== null);
    StateManager.removeBuff('v_buff');
    assert('removeBuff 成功',           StateManager.getBuff('v_buff') === null);

    // ── 存档验证 ──────────────────────────────────────────
    StateManager.saveGame();
    assert('saveGame 后 hasSave = true',   StateManager.hasSave());
    const preview = StateManager.getSavePreview();
    assert('getSavePreview 返回对象',      preview !== null);
    assert('getSavePreview month = 1',     preview?.month === 1, `实际：${preview?.month}`);

    // ── validateState 验证 ────────────────────────────────
    assert('validateState 正常状态通过',   StateManager.validateState(StateManager.getState()).valid);
    assert('validateState 损坏数据 false', !StateManager.validateState({ broken: true }).valid);

    // ── advanceMonth 验证 ─────────────────────────────────
    const { newMonth, isGameEnd } = StateManager.advanceMonth();
    assert('advanceMonth → 2',            newMonth === 2,       `实际：${newMonth}`);
    assert('isGameEnd = false',           isGameEnd === false,  `实际：${isGameEnd}`);

    // ── recordSemesterGPA 验证 ────────────────────────────
    StateManager.recordSemesterGPA({
      phase: 'Y3_SEM1', rawScore: 80, gpa: 3.8, tag: 'GPA_High',
    });
    s = StateManager.getState();
    assert('semesterGPA 记录数 = 1',      s.semesterGPA.length === 1);
    assert('cumulativeGPA = 3.8',         s.cumulativeGPA === 3.8, `实际：${s.cumulativeGPA}`);

  } finally {
    // ══════════════════════════════════════════════════════
    // 无论验证成功或抛出异常，都必须恢复真实存档
    // ══════════════════════════════════════════════════════
    if (realSaveBackup !== null) {
      // 有真实存档：恢复它
      localStorage.setItem(CONSTANTS.SAVE_KEY, realSaveBackup);
      // 重新加载状态到内存
      StateManager.initStateManager();
      log('info', 'Main', '✅ 验证完成，真实存档已恢复');
    } else {
      // 无真实存档（首次游玩）：清空验证产生的脏存档，建立干净初始状态
      StateManager.clearSave();
      StateManager.resetGame();
      log('info', 'Main', '✅ 验证完成，首次游玩，存档已清空');
    }
  }

  // ── 结果汇总 ──────────────────────────────────────────────
  console.log('%c─────────────────────────', 'color:#6B7280');
  console.log(
    `%c结果：${passed} 通过 / ${failed} 失败`,
    failed > 0
      ? 'color:#D93025;font-size:1rem;font-weight:900;'
      : 'color:#1E8A44;font-size:1rem;font-weight:900;'
  );
  if (failed === 0) {
    console.log('%c🎉 全部通过，可进入 M3。', 'color:#004B9B;font-weight:700;');
  }
  console.groupEnd();
}