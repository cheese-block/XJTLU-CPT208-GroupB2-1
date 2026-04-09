/**
 * @fileoverview 应用入口（M0 初始化验证）
 *
 * M0 阶段职责：
 *   1. 初始化 Lucide 图标
 *   2. 注入吉祥物 SVG
 *   3. 渲染静态状态栏预览
 *   4. 绑定飘字动效测试按钮
 *   5. 绑定危险警告测试按钮
 *   6. 向控制台输出验证信息
 *
 * 注意：M0 不涉及任何游戏逻辑，不导入 Engine / StateManager。
 */

import { CONSTANTS } from './src/utils/constants.js';

// ─────────────────────────────────────────────────────────────
// 1. DOMContentLoaded 入口
// ─────────────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  initLucide();
  injectMascot();
  renderStatusBarPreview();
  bindTestButtons();
  printBootLog();
});

// ─────────────────────────────────────────────────────────────
// 2. 初始化 Lucide 图标
//    必须在 DOM 渲染完毕后调用，将 <i data-lucide="..."> 替换为 SVG
// ─────────────────────────────────────────────────────────────
function initLucide() {
  if (typeof lucide === 'undefined') {
    console.error('[M0] Lucide 未加载，请检查 CDN 连接。');
    return;
  }
  lucide.createIcons();
  console.info('[M0] ✅ Lucide 图标初始化完成。');
}

// ─────────────────────────────────────────────────────────────
// 3. 注入吉祥物 SVG（疲惫白鹅 · idle 状态）
//    M0 阶段使用内联 SVG 占位，后续由 assets/images/mascot/ 替换
// ─────────────────────────────────────────────────────────────
function injectMascot() {
  const container = document.getElementById('mascot-container');
  if (!container) return;

  // 内联占位 SVG：粗线条疲惫鹅轮廓
  // 采用深蓝色粗线条（stroke: #003366，stroke-width: 3.5）
  container.innerHTML = `
    <svg
      viewBox="0 0 120 120"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="疲惫白鹅吉祥物"
      style="width:100%;height:100%;"
    >
      <!-- 身体 -->
      <ellipse
        cx="60" cy="78" rx="30" ry="28"
        fill="#F0F4FF" stroke="#003366" stroke-width="3.5"
        stroke-linecap="round"
      />
      <!-- 头部 -->
      <circle
        cx="60" cy="38" r="20"
        fill="#F0F4FF" stroke="#003366" stroke-width="3.5"
      />
      <!-- 脖子连接（遮盖接缝）-->
      <rect x="50" y="54" width="20" height="8"
        fill="#F0F4FF" stroke="none"
      />
      <!-- 嘴巴（扁平三角）-->
      <path
        d="M72 38 L84 35 L72 42 Z"
        fill="#FFC200" stroke="#003366" stroke-width="2"
        stroke-linejoin="round"
      />
      <!-- 左黑眼圈 -->
      <ellipse cx="53" cy="36" rx="5" ry="3.5"
        fill="#003366" opacity="0.18"
      />
      <!-- 右黑眼圈 -->
      <ellipse cx="67" cy="36" rx="5" ry="3.5"
        fill="#003366" opacity="0.18"
      />
      <!-- 左眼 -->
      <circle cx="53" cy="36" r="2.5" fill="#003366" />
      <circle cx="54" cy="35" r="0.8" fill="white" />
      <!-- 右眼 -->
      <circle cx="67" cy="36" r="2.5" fill="#003366" />
      <circle cx="68" cy="35" r="0.8" fill="white" />
      <!-- 疲惫眉（下压）-->
      <path d="M49 30 Q53 32 57 30"
        stroke="#003366" stroke-width="2.5"
        fill="none" stroke-linecap="round"
      />
      <path d="M63 30 Q67 32 71 30"
        stroke="#003366" stroke-width="2.5"
        fill="none" stroke-linecap="round"
      />
      <!-- XJTLU T恤纹样（简化蓝色领口）-->
      <path d="M42 65 Q60 60 78 65"
        stroke="#004B9B" stroke-width="3"
        fill="none" stroke-linecap="round"
      />
      <!-- 翅膀（左）-->
      <path d="M30 75 Q20 68 24 58 Q32 65 40 72"
        fill="#E8EFFF" stroke="#003366" stroke-width="3"
        stroke-linecap="round" stroke-linejoin="round"
      />
      <!-- 翅膀（右）-->
      <path d="M90 75 Q100 68 96 58 Q88 65 80 72"
        fill="#E8EFFF" stroke="#003366" stroke-width="3"
        stroke-linecap="round" stroke-linejoin="round"
      />
      <!-- 脚（左）-->
      <path d="M50 104 L46 112 M46 112 L42 115 M46 112 L50 115"
        stroke="#FFC200" stroke-width="3"
        fill="none" stroke-linecap="round"
      />
      <!-- 脚（右）-->
      <path d="M70 104 L74 112 M74 112 L70 115 M74 112 L78 115"
        stroke="#FFC200" stroke-width="3"
        fill="none" stroke-linecap="round"
      />
    </svg>
  `;
  console.info('[M0] ✅ 吉祥物 SVG 注入完成。');
}

// ─────────────────────────────────────────────────────────────
// 4. 渲染状态栏预览（静态数据，验证 CSS 样式）
// ─────────────────────────────────────────────────────────────
function renderStatusBarPreview() {
  const bar = document.getElementById('status-bar-preview');
  if (!bar) return;

  // 使用设计文档中的初始值
  const mockState = {
    currentMonth:     1,
    AP:               3,   // 已用 2 点，验证方块显示
    Mental_Health:    80,
    Physical_Health:  15,  // 故意低于 20，验证危险警告色
    Money:            50000,
    Academic_Ability: 0,
    English_Ability:  40,
  };

  bar.innerHTML = buildStatusBarHTML(mockState);

  // 重新激活新注入的 Lucide 图标
  if (typeof lucide !== 'undefined') lucide.createIcons();

  // Physical_Health 低于阈值 → 触发危险叠层演示
  if (mockState.Physical_Health < CONSTANTS.PHYSICAL_HEALTH_WARN) {
    document.getElementById('danger-overlay')?.classList.add('is-active');
    console.warn(
      `[M0] ⚠️ Physical_Health (${mockState.Physical_Health}) 低于警告线 ` +
      `(${CONSTANTS.PHYSICAL_HEALTH_WARN})，危险叠层已激活。`
    );
  }

  console.info('[M0] ✅ 状态栏预览渲染完成。');
}

/**
 * 根据 state 生成状态栏 HTML 字符串
 * 后续 StatusBar.js 组件将使用相同的逻辑，此处先内联实现用于验证。
 * @param {object} state
 * @returns {string} HTML 字符串
 */
function buildStatusBarHTML(state) {
  const {
    currentMonth,
    AP,
    Mental_Health,
    Physical_Health,
    Money,
    Academic_Ability,
    English_Ability,
  } = state;

  const phase      = CONSTANTS.MONTH_TO_PHASE[currentMonth]    ?? '—';
  const phaseLabel = CONSTANTS.PHASE_LABELS[phase]             ?? phase;
  const monthLabel = CONSTANTS.MONTH_TO_REALWORLD[currentMonth] ?? `Month ${currentMonth}`;

  // AP 方块
  const apPips = Array.from({ length: CONSTANTS.AP_MAX_PER_MONTH }, (_, i) => {
    const filled = i < AP;
    return `<span class="ap-pip ${filled ? 'ap-pip--filled' : 'ap-pip--empty'}"></span>`;
  }).join('');

  // 血条填充色：低于警告线变红
  const mentalColor    = Mental_Health    < CONSTANTS.MENTAL_HEALTH_WARN    ? 'health-bar__fill--danger' : 'health-bar__fill--mental';
  const physicalColor  = Physical_Health  < CONSTANTS.PHYSICAL_HEALTH_WARN  ? 'health-bar__fill--danger' : 'health-bar__fill--physical';
  const mentalPct      = Math.max(0, Math.min(100, Mental_Health));
  const physicalPct    = Math.max(0, Math.min(100, Physical_Health));

  // 金钱警告
  const moneyColor = Money < CONSTANTS.MONEY_WARN_THRESHOLD ? 'text-xjtlu-red' : 'text-xjtlu-navy';
  const moneyStr   = `¥${Money.toLocaleString('zh-CN')}`;

  return `
    <!-- 学期标签 -->
    <div class="flex flex-col mr-2 shrink-0">
      <span class="text-[0.6rem] font-bold text-xjtlu-gray tracking-widest uppercase">
        ${phaseLabel}
      </span>
      <span class="text-xs font-black text-xjtlu-navy leading-tight">
        ${monthLabel}
      </span>
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
    <div class="stat-item" id="stat-mental" title="心理健康 Mental Health">
      <i data-lucide="brain" class="lucide w-4 h-4 text-xjtlu-blue"></i>
      <div class="flex flex-col gap-1 flex-1 min-w-0">
        <div class="flex justify-between items-center">
          <span class="stat-item__label">心理</span>
          <span class="stat-item__value text-[0.75rem] ${Mental_Health < CONSTANTS.MENTAL_HEALTH_WARN ? 'text-xjtlu-red' : ''}">
            ${Mental_Health}
          </span>
        </div>
        <div class="health-bar">
          <div
            class="health-bar__fill ${mentalColor}"
            style="width: ${mentalPct}%"
          ></div>
        </div>
      </div>
    </div>

    <!-- 身体健康 -->
    <div class="stat-item" id="stat-physical" title="身体健康 Physical Health">
      <i data-lucide="heart-pulse" class="lucide w-4 h-4 text-xjtlu-green"></i>
      <div class="flex flex-col gap-1 flex-1 min-w-0">
        <div class="flex justify-between items-center">
          <span class="stat-item__label">身体</span>
          <span class="stat-item__value text-[0.75rem] ${Physical_Health < CONSTANTS.PHYSICAL_HEALTH_WARN ? 'text-xjtlu-red' : ''}">
            ${Physical_Health}
          </span>
        </div>
        <div class="health-bar">
          <div
            class="health-bar__fill ${physicalColor}"
            style="width: ${physicalPct}%"
          ></div>
        </div>
      </div>
    </div>

    <div class="w-px h-8 bg-gray-200 shrink-0"></div>

    <!-- 学力 -->
    <div class="stat-item shrink-0" id="stat-academic" title="学力 Academic Ability">
      <i data-lucide="graduation-cap" class="lucide w-4 h-4 text-xjtlu-navy"></i>
      <div class="flex flex-col">
        <span class="stat-item__label">学力</span>
        <span class="stat-item__value">${Academic_Ability}</span>
      </div>
    </div>

    <!-- 英语能力 -->
    <div class="stat-item shrink-0" id="stat-english" title="英语能力 English Ability">
      <i data-lucide="languages" class="lucide w-4 h-4 text-xjtlu-light"></i>
      <div class="flex flex-col">
        <span class="stat-item__label">英语</span>
        <span class="stat-item__value">${English_Ability}</span>
      </div>
    </div>

    <div class="w-px h-8 bg-gray-200 shrink-0"></div>

    <!-- 金钱 -->
    <div class="stat-item shrink-0" id="stat-money" title="金钱 Money">
      <i data-lucide="coins" class="lucide w-4 h-4 text-xjtlu-amber"></i>
      <div class="flex flex-col">
        <span class="stat-item__label">资金</span>
        <span class="stat-item__value ${moneyColor} text-[0.75rem]">${moneyStr}</span>
      </div>
    </div>
  `;
}

// ─────────────────────────────────────────────────────────────
// 5. 绑定测试按钮
// ─────────────────────────────────────────────────────────────
function bindTestButtons() {
  // 正向飘字
  document.getElementById('btn-test-positive')?.addEventListener('click', (e) => {
    spawnFloatingText('+20 心理健康', 'positive', e.clientX, e.clientY);
    spawnFloatingText('+5 学力',     'positive', e.clientX + 80, e.clientY - 10);
  });

  // 负向飘字
  document.getElementById('btn-test-negative')?.addEventListener('click', (e) => {
    spawnFloatingText('-10 心理健康', 'negative', e.clientX, e.clientY);
    spawnFloatingText('-¥30,000',    'negative', e.clientX + 90, e.clientY + 5);
  });

  // 危险警告切换
  document.getElementById('btn-test-warning')?.addEventListener('click', () => {
    const overlay = document.getElementById('danger-overlay');
    if (!overlay) return;

    if (overlay.classList.contains('is-active')) {
      overlay.classList.remove('is-active');
      console.info('[M0] 危险叠层：已关闭');
    } else {
      overlay.classList.add('is-active');
      console.warn('[M0] 危险叠层：已激活（模拟 Health < 20）');
    }
  });

  console.info('[M0] ✅ 测试按钮绑定完成。');
}

// ─────────────────────────────────────────────────────────────
// 6. 飘字动效（FloatingText 原型，后续提取到 FloatingText.js）
// ─────────────────────────────────────────────────────────────

/**
 * 在指定坐标生成飘字动画元素
 * @param {string} text     - 显示文本，如 "+20 心理健康" 或 "-¥30,000"
 * @param {'positive'|'negative'|'neutral'} type - 语义色
 * @param {number} x        - 屏幕 X 坐标（clientX）
 * @param {number} y        - 屏幕 Y 坐标（clientY）
 */
function spawnFloatingText(text, type, x, y) {
  const layer = document.getElementById('floating-text-layer');
  if (!layer) return;

  const el = document.createElement('span');
  el.className = `floating-text floating-text--${type}`;
  el.textContent = text;

  // 随机水平偏移（±20px），避免多个飘字完全重叠
  const offsetX = (Math.random() - 0.5) * 40;
  el.style.left = `${x + offsetX}px`;
  el.style.top  = `${y}px`;

  layer.appendChild(el);

  // 动画结束后自动清理 DOM
  el.addEventListener('animationend', () => el.remove(), { once: true });
}

// ─────────────────────────────────────────────────────────────
// 7. 启动日志（控制台验证）
// ─────────────────────────────────────────────────────────────
function printBootLog() {
  const styles = {
    title:   'font-size:1.2rem;font-weight:900;color:#004B9B;',
    section: 'font-weight:700;color:#003366;',
    ok:      'color:#1E8A44;font-weight:700;',
    info:    'color:#6B7280;',
  };

  console.log('%c🦢 西浦申研模拟器 启动', styles.title);
  console.log('%c─────────────────────────────────', styles.info);
  console.log('%c版本', styles.section, CONSTANTS.SAVE_VERSION);
  console.log('%c里程碑', styles.section, 'M0 · 脚手架验证');
  console.log('%c─────────────────────────────────', styles.info);
  console.log('%c常量加载', styles.ok, '✅');
  console.log('%cAP / 月', styles.info, CONSTANTS.AP_MAX_PER_MONTH);
  console.log('%c雅思阈值', styles.info, CONSTANTS.IELTS_THRESHOLDS.map(t => `${t.band}(≥${t.minAbility})`).join(' | '));
  console.log('%cGPA 阈值', styles.info, CONSTANTS.GPA_THRESHOLDS.map(t => `${t.gpa}(≥${t.minAbility})`).join(' | '));
  console.log('%c调度事件', styles.info, CONSTANTS.SCHEDULED_EVENTS.map(e => `Month${e.month}→${e.eventId}`).join(' / '));
  console.log('%c地图调试', styles.info, CONSTANTS.MAP_DEBUG ? '✅ 已开启' : '⛔ 已关闭');
  console.log('%c─────────────────────────────────', styles.info);
  console.log('%c✅ M0 初始化完成，等待 M1 状态机接入。', styles.ok);
}