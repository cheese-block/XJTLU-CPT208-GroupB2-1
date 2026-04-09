/**
 * @fileoverview 应用入口（M1 更新）
 *
 * M1 新增职责：
 *   1. 初始化 StateManager（含存档恢复）
 *   2. 订阅状态变更，刷新状态栏预览
 *   3. 验证所有 StateManager 方法（控制台断言）
 *   4. 测试按钮升级：通过 StateManager API 修改状态，验证响应式渲染
 *
 * M0 功能保留：
 *   - Lucide 初始化
 *   - 吉祥物 SVG 注入
 *   - 飘字动效
 *   - 危险叠层
 */

import { CONSTANTS }          from './src/utils/constants.js';
import { getStateSummary }    from './src/state/GameState.js';
import * as StateManager      from './src/state/StateManager.js';
import { formatTimestamp, log } from './src/utils/helpers.js';

// ─────────────────────────────────────────────────────────────
// 1. 启动
// ─────────────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  initLucide();
  injectMascot();

  // ── M1：初始化状态管理器 ──────────────────────────────────
  StateManager.initStateManager();

  // ── M1：订阅状态变更 → 刷新状态栏 ───────────────────────
  StateManager.subscribe((state) => {
    renderStatusBar(state);
    updateDangerOverlay(state);
    flushFloatingTexts();
  });

  // ── 测试按钮绑定 ─────────────────────────────────────────
  bindTestButtons();

  // ── M1：控制台验证 ───────────────────────────────────────
  runM1Verification();
});

// ─────────────────────────────────────────────────────────────
// 2. Lucide 初始化
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
// 3. 吉祥物 SVG（与 M0 相同）
// ─────────────────────────────────────────────────────────────
function injectMascot() {
  const container = document.getElementById('mascot-container');
  if (!container) return;

  container.innerHTML = `
    <svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg"
      role="img" aria-label="疲惫白鹅吉祥物" style="width:100%;height:100%;">
      <ellipse cx="60" cy="78" rx="30" ry="28"
        fill="#F0F4FF" stroke="#003366" stroke-width="3.5" stroke-linecap="round"/>
      <circle cx="60" cy="38" r="20"
        fill="#F0F4FF" stroke="#003366" stroke-width="3.5"/>
      <rect x="50" y="54" width="20" height="8" fill="#F0F4FF" stroke="none"/>
      <path d="M72 38 L84 35 L72 42 Z"
        fill="#FFC200" stroke="#003366" stroke-width="2" stroke-linejoin="round"/>
      <ellipse cx="53" cy="36" rx="5" ry="3.5" fill="#003366" opacity="0.18"/>
      <ellipse cx="67" cy="36" rx="5" ry="3.5" fill="#003366" opacity="0.18"/>
      <circle cx="53" cy="36" r="2.5" fill="#003366"/>
      <circle cx="54" cy="35" r="0.8" fill="white"/>
      <circle cx="67" cy="36" r="2.5" fill="#003366"/>
      <circle cx="68" cy="35" r="0.8" fill="white"/>
      <path d="M49 30 Q53 32 57 30" stroke="#003366" stroke-width="2.5"
        fill="none" stroke-linecap="round"/>
      <path d="M63 30 Q67 32 71 30" stroke="#003366" stroke-width="2.5"
        fill="none" stroke-linecap="round"/>
      <path d="M42 65 Q60 60 78 65" stroke="#004B9B" stroke-width="3"
        fill="none" stroke-linecap="round"/>
      <path d="M30 75 Q20 68 24 58 Q32 65 40 72"
        fill="#E8EFFF" stroke="#003366" stroke-width="3"
        stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M90 75 Q100 68 96 58 Q88 65 80 72"
        fill="#E8EFFF" stroke="#003366" stroke-width="3"
        stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M50 104 L46 112 M46 112 L42 115 M46 112 L50 115"
        stroke="#FFC200" stroke-width="3" fill="none" stroke-linecap="round"/>
      <path d="M70 104 L74 112 M74 112 L70 115 M74 112 L78 115"
        stroke="#FFC200" stroke-width="3" fill="none" stroke-linecap="round"/>
    </svg>`;

  // 重新激活 Lucide（mascot 内无 lucide 图标，但以防万一）
  if (typeof lucide !== 'undefined') lucide.createIcons();
  log('info', 'Main', '✅ 吉祥物注入完成');
}

// ─────────────────────────────────────────────────────────────
// 4. 响应式状态栏渲染
//    由 StateManager.subscribe() 回调驱动
// ─────────────────────────────────────────────────────────────

/**
 * 根据最新 state 重新渲染状态栏。
 * @param {import('./src/state/GameState.js').GameState} state
 */
function renderStatusBar(state) {
  const bar = document.getElementById('status-bar-preview');
  if (!bar) return;

  bar.innerHTML = buildStatusBarHTML(state);

  // 状态栏内有 Lucide 图标，重新初始化
  if (typeof lucide !== 'undefined') lucide.createIcons();
}

/**
 * 根据 state 生成状态栏 HTML（与 M0 相同，抽离为独立函数）。
 * @param {object} state
 * @returns {string}
 */
function buildStatusBarHTML(state) {
  const {
    currentMonth, AP, Mental_Health, Physical_Health,
    Money, Academic_Ability, English_Ability,
  } = state;

  const phase      = CONSTANTS.MONTH_TO_PHASE[currentMonth]     ?? '—';
  const phaseLabel = CONSTANTS.PHASE_LABELS[phase]              ?? phase;
  const monthLabel = CONSTANTS.MONTH_TO_REALWORLD[currentMonth] ?? `Month ${currentMonth}`;

  const apPips = Array.from({ length: CONSTANTS.AP_MAX_PER_MONTH }, (_, i) =>
    `<span class="ap-pip ${i < AP ? 'ap-pip--filled' : 'ap-pip--empty'}"></span>`
  ).join('');

  const mentalDanger   = Mental_Health   < CONSTANTS.MENTAL_HEALTH_WARN;
  const physicalDanger = Physical_Health < CONSTANTS.PHYSICAL_HEALTH_WARN;
  const moneyWarn      = Money           < CONSTANTS.MONEY_WARN_THRESHOLD;

  const mentalFill   = mentalDanger   ? 'health-bar__fill--danger'   : 'health-bar__fill--mental';
  const physicalFill = physicalDanger ? 'health-bar__fill--danger'   : 'health-bar__fill--physical';
  const moneyColor   = moneyWarn      ? 'text-xjtlu-red font-black'  : 'text-xjtlu-navy';

  const moneyStr = `¥${Math.abs(Money).toLocaleString('zh-CN')}${Money < 0 ? '（负）' : ''}`;

  return `
    <div class="flex flex-col mr-2 shrink-0">
      <span class="text-[0.6rem] font-bold text-xjtlu-gray tracking-widest uppercase">${phaseLabel}</span>
      <span class="text-xs font-black text-xjtlu-navy leading-tight">${monthLabel}</span>
    </div>
    <div class="w-px h-8 bg-gray-200 shrink-0"></div>

    <!-- AP -->
    <div class="stat-item shrink-0" id="stat-ap" title="行动点 Action Points">
      <i data-lucide="zap" class="lucide w-4 h-4 text-xjtlu-yellow"></i>
      <div class="flex flex-col gap-0.5">
        <span class="stat-item__label">AP</span>
        <div class="ap-pip-group">${apPips}</div>
      </div>
    </div>
    <div class="w-px h-8 bg-gray-200 shrink-0"></div>

    <!-- 心理健康 -->
    <div class="stat-item" id="stat-mental" title="心理健康">
      <i data-lucide="brain" class="lucide w-4 h-4 text-xjtlu-blue"></i>
      <div class="flex flex-col gap-1 flex-1 min-w-0">
        <div class="flex justify-between items-center gap-1">
          <span class="stat-item__label">心理</span>
          <span class="stat-item__value text-[0.75rem] ${mentalDanger ? 'text-xjtlu-red' : ''}">${Mental_Health}</span>
        </div>
        <div class="health-bar">
          <div class="health-bar__fill ${mentalFill}" style="width:${Mental_Health}%"></div>
        </div>
      </div>
    </div>

    <!-- 身体健康 -->
    <div class="stat-item" id="stat-physical" title="身体健康">
      <i data-lucide="heart-pulse" class="lucide w-4 h-4 text-xjtlu-green"></i>
      <div class="flex flex-col gap-1 flex-1 min-w-0">
        <div class="flex justify-between items-center gap-1">
          <span class="stat-item__label">身体</span>
          <span class="stat-item__value text-[0.75rem] ${physicalDanger ? 'text-xjtlu-red' : ''}">${Physical_Health}</span>
        </div>
        <div class="health-bar">
          <div class="health-bar__fill ${physicalFill}" style="width:${Physical_Health}%"></div>
        </div>
      </div>
    </div>
    <div class="w-px h-8 bg-gray-200 shrink-0"></div>

    <!-- 学力 -->
    <div class="stat-item shrink-0" id="stat-academic" title="学力">
      <i data-lucide="graduation-cap" class="lucide w-4 h-4 text-xjtlu-navy"></i>
      <div class="flex flex-col">
        <span class="stat-item__label">学力</span>
        <span class="stat-item__value">${Academic_Ability}</span>
      </div>
    </div>

    <!-- 英语能力 -->
    <div class="stat-item shrink-0" id="stat-english" title="英语能力">
      <i data-lucide="languages" class="lucide w-4 h-4 text-xjtlu-light"></i>
      <div class="flex flex-col">
        <span class="stat-item__label">英语</span>
        <span class="stat-item__value">${English_Ability}</span>
      </div>
    </div>
    <div class="w-px h-8 bg-gray-200 shrink-0"></div>

    <!-- 金钱 -->
    <div class="stat-item shrink-0" id="stat-money" title="资金">
      <i data-lucide="coins" class="lucide w-4 h-4 text-xjtlu-amber"></i>
      <div class="flex flex-col">
        <span class="stat-item__label">资金</span>
        <span class="stat-item__value ${moneyColor} text-[0.75rem]">${moneyStr}</span>
      </div>
    </div>`;
}

// ─────────────────────────────────────────────────────────────
// 5. 危险叠层（响应式）
// ─────────────────────────────────────────────────────────────

/**
 * 根据 state 决定是否激活危险边框叠层。
 * @param {object} state
 */
function updateDangerOverlay(state) {
  const overlay = document.getElementById('danger-overlay');
  if (!overlay) return;

  const danger =
    state.Mental_Health   < CONSTANTS.MENTAL_HEALTH_WARN ||
    state.Physical_Health < CONSTANTS.PHYSICAL_HEALTH_WARN;

  overlay.classList.toggle('is-active', danger);
}

// ─────────────────────────────────────────────────────────────
// 6. 飘字：消费 pendingStatChanges 并渲染
// ─────────────────────────────────────────────────────────────

/**
 * 从 StateManager 消费待飘字队列并渲染。
 * 在每次 subscribe 回调时调用。
 */
function flushFloatingTexts() {
  const changes = StateManager.consumePendingStatChanges();
  const bar = document.getElementById('status-bar-preview');

  changes.forEach((change, i) => {
    // 尝试找到对应 stat 的 DOM 锚点，否则默认显示在状态栏中央
    const statId  = `stat-${change.stat.toLowerCase().replace('_', '-')}`;
    const anchor  = document.getElementById(statId) ?? bar;
    const rect    = anchor?.getBoundingClientRect();

    const x = rect ? rect.left + rect.width / 2 : window.innerWidth / 2;
    const y = rect ? rect.top                   : window.innerHeight / 2;

    // 错开多个飘字，避免完全重叠
    setTimeout(() => {
      const type = change.delta > 0 ? 'positive' : 'negative';
      const text = `${change.delta > 0 ? '+' : ''}${change.delta} ${change.label}`;
      spawnFloatingText(text, type, x + (i * 30), y);
    }, i * 120);
  });
}

// ─────────────────────────────────────────────────────────────
// 7. 飘字生成（与 M0 相同，后续提取至 FloatingText.js）
// ─────────────────────────────────────────────────────────────

/**
 * @param {string} text
 * @param {'positive'|'negative'|'neutral'} type
 * @param {number} x
 * @param {number} y
 */
function spawnFloatingText(text, type, x, y) {
  const layer = document.getElementById('floating-text-layer');
  if (!layer) return;

  const el = document.createElement('span');
  el.className  = `floating-text floating-text--${type}`;
  el.textContent = text;
  el.style.left  = `${x + (Math.random() - 0.5) * 20}px`;
  el.style.top   = `${y}px`;

  layer.appendChild(el);
  el.addEventListener('animationend', () => el.remove(), { once: true });
}

// ─────────────────────────────────────────────────────────────
// 8. 测试按钮（升级为通过 StateManager API 修改状态）
// ─────────────────────────────────────────────────────────────

function bindTestButtons() {
  // 正向：Mental_Health +20, Academic_Ability +5
  document.getElementById('btn-test-positive')?.addEventListener('click', () => {
    StateManager.applyStatDelta(
      { Mental_Health: +20, Academic_Ability: +5 },
      { Mental_Health: '心理健康', Academic_Ability: '学力' }
    );
    StateManager.saveGame(); // ← 按钮点击后立即存档
  });

  // 负向：Mental_Health -15, Money -10000
  document.getElementById('btn-test-negative')?.addEventListener('click', () => {
    StateManager.applyStatDelta(
      { Mental_Health: -15, Money: -10000 },
      { Mental_Health: '心理健康', Money: '资金' }
    );
    StateManager.saveGame();
  });

  // 警告：Physical_Health 在 10/80 之间切换，验证叠层响应
  document.getElementById('btn-test-warning')?.addEventListener('click', () => {
    const state  = StateManager.getState();
    const target = state.Physical_Health < CONSTANTS.PHYSICAL_HEALTH_WARN ? 80 : 10;
    const delta  = target - state.Physical_Health;
    StateManager.applyStatDelta(
      { Physical_Health: delta },
      { Physical_Health: '身体健康' }
    );
    StateManager.saveGame();
  });
}

// ─────────────────────────────────────────────────────────────
// 9. M1 验证（控制台断言）
//
// 【修复说明】
//   验证函数在「隔离沙箱」中运行：
//   1. 验证开始前，将真实状态重置为初始值（clearSave + resetGame）
//   2. 所有断言基于初始状态，不依赖上次运行的存档
//   3. 验证结束后，同样保持干净的初始状态（不存档验证过程中的脏数据）
//   4. advanceMonth 等破坏性操作在验证末尾执行，执行后立即 resetGame 恢复
// ─────────────────────────────────────────────────────────────

function runM1Verification() {
  console.group('%c🦢 M1 验证报告', 'font-size:1.1rem;font-weight:900;color:#004B9B;');

  let passed = 0;
  let failed = 0;

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
  //  关键：验证前强制重置为初始状态，清除任何历史存档污染
  // ══════════════════════════════════════════════════════════
  StateManager.resetGame();

  // ── 初始状态验证 ──────────────────────────────────────────
  let state = StateManager.getState();

  assert('初始状态：currentMonth = 1',     state.currentMonth === 1,                        `实际：${state.currentMonth}`);
  assert('初始状态：AP = 5',               state.AP === CONSTANTS.AP_MAX_PER_MONTH,          `实际：${state.AP}`);
  assert('初始状态：Mental_Health = 80',   state.Mental_Health === 80,                      `实际：${state.Mental_Health}`);
  assert('初始状态：Physical_Health = 80', state.Physical_Health === 80,                    `实际：${state.Physical_Health}`);
  assert('初始状态：Money = 50000',        state.Money === 50000,                            `实际：${state.Money}`);
  assert('初始状态：English_Ability = 40', state.English_Ability === 40,                    `实际：${state.English_Ability}`);
  assert('初始状态：tags 为空数组',         Array.isArray(state.tags) && state.tags.length === 0);
  assert('初始状态：activeBuff 为空数组',   Array.isArray(state.activeBuff) && state.activeBuff.length === 0);
  assert('初始状态：gamePhase = TITLE',    state.gamePhase === CONSTANTS.GAME_PHASE.TITLE,  `实际：${state.gamePhase}`);

  // ── applyStatDelta + clamp 验证 ──────────────────────────
  StateManager.applyStatDelta({ Mental_Health: -90 });      // 80 - 90 = -10 → clamp → 0
  state = StateManager.getState();
  assert('clamp 下限：Mental_Health ≥ 0',  state.Mental_Health === 0,  `实际：${state.Mental_Health}`);

  StateManager.applyStatDelta({ Mental_Health: +200 });     // 0 + 200 = 200 → clamp → 100
  state = StateManager.getState();
  assert('clamp 上限：Mental_Health ≤ 100', state.Mental_Health === 100, `实际：${state.Mental_Health}`);

  StateManager.applyStatDelta({ Mental_Health: -20 });      // 100 - 20 = 80，恢复正常

  // ── consumeAP 验证 ────────────────────────────────────────
  const apBefore  = StateManager.getState().AP;             // 应为 5
  const apResult1 = StateManager.consumeAP(1);
  state           = StateManager.getState();
  assert('consumeAP(1) 返回 true',          apResult1 === true);
  assert('consumeAP(1) 后 AP 减少 1',       state.AP === apBefore - 1, `${apBefore} → ${state.AP}`);

  // 耗尽剩余 AP
  for (let i = 0; i < state.AP; i++) StateManager.consumeAP(1);
  const apExhausted = StateManager.consumeAP(1);            // AP 已为 0，应失败
  assert('AP 耗尽后 consumeAP 返回 false',  apExhausted === false);

  // ── resetAPForNewMonth 验证 ───────────────────────────────
  StateManager.resetAPForNewMonth();
  state = StateManager.getState();
  assert('resetAPForNewMonth：AP 恢复为 5', state.AP === CONSTANTS.AP_MAX_PER_MONTH, `实际：${state.AP}`);

  // ── Tag 操作验证 ──────────────────────────────────────────
  StateManager.addTag('TEST_TAG');
  assert('addTag：标签已添加',              StateManager.hasTag('TEST_TAG'));

  const dupResult = StateManager.addTag('TEST_TAG');
  assert('addTag 去重：重复添加返回 false', dupResult === false);

  StateManager.removeTag('TEST_TAG');
  assert('removeTag：标签已移除',          !StateManager.hasTag('TEST_TAG'));

  // ── Buff 操作验证 ─────────────────────────────────────────
  const testBuff = {
    buffId:          'test_buff',
    label:           '测试 Buff',
    icon:            'star',
    durationType:    'months',
    remainingMonths: 3,
    effects:         {},
    source_event_id: 'test',
  };
  StateManager.addBuff(testBuff);
  assert('addBuff：Buff 已添加',           StateManager.getBuff('test_buff') !== null);

  StateManager.removeBuff('test_buff');
  assert('removeBuff：Buff 已移除',        StateManager.getBuff('test_buff') === null);

  // ── 存档 / 读档验证 ──────────────────────────────────────
  StateManager.saveGame();
  assert('saveGame：localStorage 存在存档', StateManager.hasSave());

  const preview = StateManager.getSavePreview();
  assert('getSavePreview：返回有效对象',    preview !== null && typeof preview.month === 'number', `month: ${preview?.month}`);
  assert('getSavePreview：month = 1',      preview?.month === 1, `实际：${preview?.month}`);

  // ── validateState 验证 ────────────────────────────────────
  const { valid: v1 } = StateManager.validateState(StateManager.getState());
  assert('validateState：当前状态通过校验', v1);

  const { valid: v2 } = StateManager.validateState({ broken: true });
  assert('validateState：损坏数据返回 false', !v2);

  // ── advanceMonth 验证（放在最后，为破坏性操作）───────────
  const { newMonth, isGameEnd } = StateManager.advanceMonth();
  assert('advanceMonth：月份推进到 2',      newMonth === 2,      `实际：${newMonth}`);
  assert('advanceMonth：isGameEnd = false', isGameEnd === false, `实际：${isGameEnd}`);

  // ── recordSemesterGPA 验证 ────────────────────────────────
  StateManager.recordSemesterGPA({
    phase:    'Y3_SEM1',
    rawScore: 80,
    gpa:      3.8,
    tag:      'GPA_High',
  });
  state = StateManager.getState();
  assert('recordSemesterGPA：semesterGPA 有记录', state.semesterGPA.length === 1);
  assert('recordSemesterGPA：cumulativeGPA = 3.8', state.cumulativeGPA === 3.8, `实际：${state.cumulativeGPA}`);

  // ══════════════════════════════════════════════════════════
  //  验证结束：重置回干净的初始状态，避免污染后续游戏流程
  //  注意：此处「不」调用 saveGame()，保留干净的初始存档
  // ══════════════════════════════════════════════════════════
  StateManager.resetGame();
  // resetGame 内部已调用 clearSave + createInitialState + _notifyChange
  // 页面状态栏会刷新回初始值

  // ── 最终摘要 ──────────────────────────────────────────────
  console.log('%c─────────────────────────────────', 'color:#6B7280;');
  StateManager.debugPrintState();
  console.log(
    `%c结果：${passed} 通过 / ${failed} 失败`,
    failed > 0
      ? 'color:#D93025;font-size:1rem;font-weight:900;'
      : 'color:#1E8A44;font-size:1rem;font-weight:900;'
  );

  if (failed === 0) {
    console.log('%c🎉 M1 全部验证通过，可进入 M2。', 'color:#004B9B;font-weight:700;');
  }

  console.groupEnd();
}