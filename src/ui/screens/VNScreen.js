/**
 * @fileoverview 视觉小说 Screen
 *
 * 布局：
 *   上部 70-80%：背景插画（或纯色占位）+ 选项层
 *   下部 20-30%：对话框（DialogBox）
 *
 * 事件数据结构（来自 events.js）：
 * {
 *   event_id, title, trigger_month,
 *   scenes: [
 *     { text, speaker?, bg?, tip? },   // 普通旁白段落
 *     { text, speaker?, bg?, tip?,
 *       choices: [                      // 抉择节点
 *         { text, effects, tags_added, flavor_text, next_event_id? }
 *       ]
 *     }
 *   ]
 * }
 *
 * 流程：
 *   1. 依次展示 scenes
 *   2. 遇到 choices → 停止推进，显示选项
 *   3. 玩家选择 → 应用 effects/tags → 显示 flavor_text
 *   4. 若有 next_event_id → 注入队列；否则结束事件
 *   5. 事件结束 → 回调 onEventEnd()
 */

import * as StateManager from '../../state/StateManager.js';
import { CONSTANTS }     from '../../utils/constants.js';
import { DialogBox }     from '../components/DialogBox.js';
import { ChoicePanel }   from '../components/ChoicePanel.js';
import { log }           from '../../utils/helpers.js';

// 背景图占位色（无插画时使用）
const BG_FALLBACK = 'linear-gradient(135deg, #001f4d 0%, #003366 50%, #004B9B 100%)';

export class VNScreen {
  constructor() {
    this._container   = null;
    this._dialogBox   = null;
    this._choicePanel = null;

    this._event       = null;   // 当前事件完整数据
    this._sceneIndex  = 0;      // 当前 scene 索引
    this._onEventEnd  = null;   // 事件结束回调

    this._bound_onClick = null;
  }

  // ───────────────────────────────────────────────────────────
  // Screen 接口
  // ───────────────────────────────────────────────────────────

  mount(container, state) {
    this._container = container;
    container.innerHTML = this._buildHTML();

    // 挂载子组件
    this._dialogBox = new DialogBox();
    this._dialogBox.mount(container.querySelector('#vn-dialog-layer'));

    this._choicePanel = new ChoicePanel();
    this._choicePanel.mount(container.querySelector('#vn-choice-layer'));

    // 全局点击推进
    this._bound_onClick = (e) => this._handleClick(e);
    container.addEventListener('click', this._bound_onClick);

    if (typeof lucide !== 'undefined') lucide.createIcons();
    log('info', 'VNScreen', '✅ 已挂载');
  }

  unmount() {
    this._container?.removeEventListener('click', this._bound_onClick);
    this._dialogBox?.unmount();
    this._choicePanel?.unmount();

    this._container   = null;
    this._dialogBox   = null;
    this._choicePanel = null;
    this._event       = null;
    this._onEventEnd  = null;

    log('info', 'VNScreen', '已卸载');
  }

  onStateChange(_state) {}

  // ───────────────────────────────────────────────────────────
  // 公共 API（由 EventEngine / GameLoop 调用）
  // ───────────────────────────────────────────────────────────

  /**
   * 启动一个事件的 VN 展示。
   * @param {object}   eventData   完整事件对象
   * @param {function} onEventEnd  事件播放完毕的回调
   */
  startEvent(eventData, onEventEnd) {
    this._event      = eventData;
    this._sceneIndex = 0;
    this._onEventEnd = onEventEnd;

    log('info', 'VNScreen', `▶ 开始事件：${eventData.event_id}`);
    this._playScene(0);
  }

  // ───────────────────────────────────────────────────────────
  // 场景推进
  // ───────────────────────────────────────────────────────────

  /**
   * 播放指定索引的 scene。
   * @param {number} index
   */
  _playScene(index) {
    const scenes = this._event?.scenes;
    if (!scenes || index >= scenes.length) {
      // 所有 scene 播放完毕
      this._endEvent();
      return;
    }

    this._sceneIndex = index;
    const scene = scenes[index];

    // 更新背景
    this._updateBackground(scene.bg ?? null);

    // 若该 scene 有 choices，先显示文本，打印完后展示选项
    if (scene.choices && scene.choices.length > 0) {
      this._dialogBox.show({
        text:       scene.text,
        speaker:    scene.speaker ?? '',
        tip:        scene.tip ?? '',
        showHint:   false,  // 有选项时不显示"点击继续"
        onComplete: () => {
          this._showChoices(scene.choices);
        },
      });
    } else {
      // 普通旁白：打印完后等待点击
      this._dialogBox.show({
        text:     scene.text,
        speaker:  scene.speaker ?? '',
        tip:      scene.tip ?? '',
        showHint: true,
      });
    }
  }

  /**
   * 全局点击处理。
   * - 若对话框正在打印 → 跳过打印
   * - 若对话框打印完毕且无选项 → 推进到下一 scene
   * - 若正在展示选项 → 不响应（点击选项按钮自己处理）
   */
  _handleClick(e) {
    // 点击选项按钮不触发推进
    if (e.target.closest('.vn-choice-btn')) return;

    const consumed = this._dialogBox?.skipOrAdvance();
    if (consumed) return;  // 跳过了打印，等待下次点击

    // 有选项时不推进
    const choiceLayer = this._container?.querySelector('#vn-choice-layer');
    if (choiceLayer && !choiceLayer.classList.contains('hidden')) return;

    // 推进到下一 scene
    this._playScene(this._sceneIndex + 1);
  }

  // ───────────────────────────────────────────────────────────
  // 选项展示与处理
  // ───────────────────────────────────────────────────────────

  _showChoices(choices) {
    this._choicePanel.show(choices, (choiceIndex) => {
      this._resolveChoice(choices[choiceIndex], choiceIndex);
    });
  }

  /**
   * 处理玩家选择：应用数值效果、添加标签、显示后续文本。
   * @param {object} choice
   */
  _resolveChoice(choice) {
    // 应用数值效果
    if (choice.effects && Object.keys(choice.effects).length > 0) {
        const labels = this._buildEffectLabels(choice.effects);
        StateManager.applyStatDelta(choice.effects, labels);
    }

    // 添加标签
    if (choice.tags_added && choice.tags_added.length > 0) {
        choice.tags_added.forEach(tag => StateManager.addTag(tag));
    }

    // 注入连续事件
    if (choice.next_event_id) {
        StateManager.enqueueEventFront({
        eventId: choice.next_event_id,
        source:  'chain',
        });
    }

    StateManager.saveGame();

    // 显示 flavor_text，同时展示数值得失
    if (choice.flavor_text) {
        this._updateBackground(choice.bg ?? null);
        this._dialogBox.show({
        text:         choice.flavor_text,
        showHint:     true,
        tip:          choice.tip ?? '',
        // ↓ 新增：传入得失数值
        effects:      choice.effects ?? {},
        effectLabels: this._buildEffectLabels(choice.effects ?? {}),
        });
    } else {
        this._playScene(this._sceneIndex + 1);
    }
  }

  /** 获取当前 choices scene 的索引，供选完后推进用 */
  _getCurrentSceneIndex() {
    return this._sceneIndex; // 下次点击会 +1
  }

  // ───────────────────────────────────────────────────────────
  // 事件结束
  // ───────────────────────────────────────────────────────────

  _endEvent() {
    log('info', 'VNScreen', `✅ 事件结束：${this._event?.event_id}`);

    // 标记已触发
    if (this._event?.event_id) {
      StateManager.markEventTriggered(this._event.event_id);
    }

    this._onEventEnd?.();
  }

  // ───────────────────────────────────────────────────────────
  // 背景更新
  // ───────────────────────────────────────────────────────────

  _updateBackground(bgSrc) {
    const bgEl = this._container?.querySelector('#vn-bg');
    if (!bgEl) return;

    if (bgSrc) {
      bgEl.style.backgroundImage = `url('${bgSrc}')`;
      bgEl.style.backgroundSize  = 'cover';
      bgEl.style.backgroundPosition = 'center';
    } else {
      bgEl.style.backgroundImage = BG_FALLBACK;
    }
  }

  // ───────────────────────────────────────────────────────────
  // 工具
  // ───────────────────────────────────────────────────────────

  /**
   * 根据 effects 对象生成 labels 映射。
   * @param {object} effects  { Mental_Health: -10, Money: -30000 }
   * @returns {object}        { Mental_Health: '心理健康', Money: '资金' }
   */
  _buildEffectLabels(effects) {
    const labelMap = {
      Mental_Health:    '心理健康',
      Physical_Health:  '身体健康',
      Money:            '资金',
      Academic_Ability: '学力',
      English_Ability:  '英语能力',
      AP:               '行动点',
    };
    const result = {};
    Object.keys(effects).forEach(key => {
      result[key] = labelMap[key] ?? key;
    });
    return result;
  }

  // ───────────────────────────────────────────────────────────
  // HTML 骨架
  // ───────────────────────────────────────────────────────────

  _buildHTML() {
    return `
      <div class="w-full h-full flex flex-col relative overflow-hidden">

        <!-- 背景插画层（上部 70-80%）-->
        <div
          id="vn-bg"
          class="flex-1 relative"
          style="background: ${BG_FALLBACK};"
        >
          <!-- 吉祥物（无插画时显示）-->
          <div id="vn-mascot"
               class="absolute inset-0 flex items-center justify-center
                      pointer-events-none">
            ${this._getMascotSVG()}
          </div>
        </div>

        <!-- 选项层（绝对定位，叠在插画区中央）-->
        <!-- 修复：去掉 pointer-events-none -->
        <div
        id="vn-choice-layer"
        class="absolute inset-0 flex items-center justify-center hidden"
        style="z-index: 300;"
        >
          <!-- ChoicePanel 渲染到此处 -->
        </div>

        <!-- 对话框层（下部 20-30%）-->
        <div id="vn-dialog-layer"
             class="shrink-0"
             style="z-index: 200;">
          <!-- DialogBox 渲染到此处 -->
        </div>

      </div>
    `;
  }

  _getMascotSVG() {
    return `
      <svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg"
           style="width:180px;height:180px;opacity:0.25;">
        <ellipse cx="60" cy="78" rx="30" ry="28"
          fill="#F0F4FF" stroke="#ffffff" stroke-width="3.5"/>
        <circle cx="60" cy="38" r="20"
          fill="#F0F4FF" stroke="#ffffff" stroke-width="3.5"/>
        <rect x="50" y="54" width="20" height="8" fill="#F0F4FF"/>
        <path d="M72 38 L84 35 L72 42 Z"
          fill="#FFC200" stroke="#ffffff" stroke-width="2"/>
        <circle cx="53" cy="36" r="2.5" fill="#003366"/>
        <circle cx="67" cy="36" r="2.5" fill="#003366"/>
        <path d="M49 30 Q53 32 57 30" stroke="#ffffff" stroke-width="2.5"
          fill="none" stroke-linecap="round"/>
        <path d="M63 30 Q67 32 71 30" stroke="#ffffff" stroke-width="2.5"
          fill="none" stroke-linecap="round"/>
        <path d="M30 75 Q20 68 24 58 Q32 65 40 72"
          fill="#E8EFFF" stroke="#ffffff" stroke-width="3"/>
        <path d="M90 75 Q100 68 96 58 Q88 65 80 72"
          fill="#E8EFFF" stroke="#ffffff" stroke-width="3"/>
      </svg>
    `;
  }
}