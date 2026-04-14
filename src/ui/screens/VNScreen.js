/**
 * @fileoverview 视觉小说 Screen（M7 完整版）
 */

import * as StateManager from '../../state/StateManager.js';
import { CONSTANTS }     from '../../utils/constants.js';
import { DialogBox }     from '../components/DialogBox.js';
import { ChoicePanel }   from '../components/ChoicePanel.js';
import { log }           from '../../utils/helpers.js';

const BG_FALLBACK = 'linear-gradient(135deg, #001f4d 0%, #003366 50%, #004B9B 100%)';

export class VNScreen {
  constructor() {
    this._container      = null;
    this._dialogBox      = null;
    this._choicePanel    = null;
    this._event          = null;
    this._sceneIndex     = 0;
    this._onEventEnd     = null;
    this._bound_onClick  = null;
    this._waitingAdvance = false;
    
    // 【新增】：多选队列状态
    this._multiChoiceQueue  = [];
    this._isMultiChoiceText = false;
  }

  // ───────────────────────────────────────────────────────────
  // Screen 接口
  // ───────────────────────────────────────────────────────────

  mount(container, state) {
    this._container = container;
    container.innerHTML = this._buildHTML();

    this._dialogBox = new DialogBox();
    this._dialogBox.mount(container.querySelector('#vn-dialog-layer'));

    this._choicePanel = new ChoicePanel();
    this._choicePanel.mount(container.querySelector('#vn-choice-layer'));

    this._bound_onClick = (e) => this._handleClick(e);
    container.addEventListener('click', this._bound_onClick);

    if (typeof lucide !== 'undefined') lucide.createIcons();
    log('info', 'VNScreen', '✅ 已挂载');
  }

  unmount() {
    this._container?.removeEventListener('click', this._bound_onClick);
    this._dialogBox?.unmount();
    this._choicePanel?.unmount();
    this._container      = null;
    this._dialogBox      = null;
    this._choicePanel    = null;
    this._event          = null;
    this._onEventEnd     = null;
    this._waitingAdvance = false;
    
    // 【新增】：清理多选队列状态
    this._multiChoiceQueue  = [];
    this._isMultiChoiceText = false;
    log('info', 'VNScreen', '已卸载');
  }

  onStateChange(_state) {}

  // ───────────────────────────────────────────────────────────
  // 公共 API
  // ───────────────────────────────────────────────────────────

  /**
   * 启动一个事件的 VN 展示。
   * @param {object}   eventData
   * @param {function} onEventEnd
   */
  startEvent(eventData, onEventEnd) {
    this._event          = eventData;
    this._sceneIndex     = 0;
    this._onEventEnd     = onEventEnd;
    this._waitingAdvance = false;

    log('info', 'VNScreen', `▶ 开始事件：${eventData.event_id}`);
    this._playScene(0);
  }

  // ───────────────────────────────────────────────────────────
  // 场景推进
  // ───────────────────────────────────────────────────────────

  _playScene(index) {
    const scenes = this._event?.scenes;
    log('debug', 'VNScreen',
      `_playScene(${index})，共 ${scenes?.length} 个场景`);

    if (!scenes || index >= scenes.length) {
      log('debug', 'VNScreen', '所有场景播放完毕，调用 _endEvent()');
      this._endEvent();
      return;
    }

    this._sceneIndex = index;
    const scene      = scenes[index];

    this._updateBackground(scene.bg ?? null);

    if (scene.choices && scene.choices.length > 0) {
      this._dialogBox.show({
        text:       scene.text,
        speaker:    scene.speaker ?? '',
        tip:        scene.tip ?? '',
        showHint:   false,
        onComplete: () => {
          // 【修改点】：获取当前 tags 并传入
          const playerTags = StateManager.getState().tags || [];
          this._showChoices(scene.choices, scene.choice_type === 'multiple', playerTags);
        },
      });
    } else {
      // 普通旁白：打印完等待点击
      this._dialogBox.show({
        text:     scene.text,
        speaker:  scene.speaker ?? '',
        tip:      scene.tip ?? '',
        showHint: true,
      });
    }
  }

  // ───────────────────────────────────────────────────────────
  // 点击处理
  // ───────────────────────────────────────────────────────────

  _handleClick(e) {
    // 点击选项按钮不触发推进
    if (e.target.closest('.vn-choice-btn')) return;

    // 若正在打印，跳过打印
    const consumed = this._dialogBox?.skipOrAdvance();
    if (consumed) return;

    // 若选项面板可见，不响应
    const choiceLayer = this._container?.querySelector('#vn-choice-layer');
    if (choiceLayer && !choiceLayer.classList.contains('hidden')) return;

    // 【新增】：处理多选队列的连续点击推进
    if (this._isMultiChoiceText) {
      if (this._multiChoiceQueue.length > 0) {
        this._showNextMultiChoiceItem();
      } else {
        this._isMultiChoiceText = false;
        this._playScene(this._sceneIndex); // 队列播完，进入下一幕
      }
      return;
    }

    if (this._waitingAdvance) {
      // flavor_text 已显示完，推进到预设好的下一 scene
      log('debug', 'VNScreen', `waitingAdvance 模式，推进到 scene ${this._sceneIndex}`);
      this._waitingAdvance = false;
      this._playScene(this._sceneIndex);
    } else {
      // 普通旁白推进
      log('debug', 'VNScreen', `普通推进，推进到 scene ${this._sceneIndex + 1}`);
      this._playScene(this._sceneIndex + 1);
    }
  }

  // ───────────────────────────────────────────────────────────
  // 选项
  // ───────────────────────────────────────────────────────────

  _showChoices(choices, isMultiple, playerTags) {
    this._choicePanel.show(choices, (result) => {
      if (Array.isArray(result)) {
        this._resolveMultipleChoices(choices, result);
      } else {
        this._resolveChoice(choices[result]);
      }
    }, isMultiple, playerTags); // 【修改点】：传入 playerTags
  }

  _resolveChoice(choice) {
    const currentState = StateManager.getState();
    const playerTags   = currentState.tags || [];

    // 遍历 variants，找到第一个满足条件的
    let activeVariant = null;
    if (choice.flavor_text_variants && choice.flavor_text_variants.length > 0) {
      for (const variant of choice.flavor_text_variants) {
        // 条件一：标签检查
        const tagPass = !variant.required_tag ||
                        playerTags.includes(variant.required_tag);

        // 条件二：数值范围检查（支持 required_stat: { stat, min, max }）
        let statPass = true;
        if (variant.required_stat) {
          const val = currentState[variant.required_stat.stat] ?? 0;
          if (variant.required_stat.min !== undefined && val < variant.required_stat.min) {
            statPass = false;
          }
          if (variant.required_stat.max !== undefined && val > variant.required_stat.max) {
            statPass = false;
          }
        }

        if (tagPass && statPass) {
          activeVariant = variant;
          break;
        }
      }
    }

    // 合并 effects 和 tags（基础 + variant 叠加）
    const finalEffects = { ...choice.effects, ...(activeVariant?.effects || {}) };
    const finalTags    = [
      ...(choice.tags_added || []),
      ...(activeVariant?.tags_added || []),
    ];

    // 拼接最终展示文本
    // 基础文本（可为空）+ variant 变色文本（可为空）
    let finalFlavorText = choice.flavor_text || '';
    if (activeVariant?.text) {
      let colorClass = 'text-xjtlu-blue';
      if (activeVariant.type === 'positive') colorClass = 'text-xjtlu-green';
      if (activeVariant.type === 'negative') colorClass = 'text-xjtlu-red';
      const separator  = finalFlavorText ? '<br><br>' : '';
      finalFlavorText += `${separator}<span class="${colorClass} font-bold">${activeVariant.text}</span>`;
    }

    // 结算数值
    if (Object.keys(finalEffects).length > 0) {
      StateManager.applyStatDelta(finalEffects, this._buildEffectLabels(finalEffects));
    }

    // 写入标签
    finalTags.forEach(tag => StateManager.addTag(tag));

    // 链式事件入队
    if (choice.next_event_id) {
      StateManager.enqueueEventFront({ eventId: choice.next_event_id, source: 'chain' });
    }

    StateManager.saveGame();

    if (finalFlavorText) {
      this._updateBackground(choice.bg ?? null);
      this._sceneIndex     = this._sceneIndex + 1;
      this._waitingAdvance = true;
      this._dialogBox.show({
        text:         finalFlavorText,
        showHint:     true,
        tip:          choice.tip ?? '',
        effects:      finalEffects,
        effectLabels: this._buildEffectLabels(finalEffects),
      });
    } else {
      // 没有任何文本展示（既无 flavor_text 也无匹配的 variant）
      // 直接推进到下一幕，不卡住
      this._playScene(this._sceneIndex + 1);
    }
  }


  // ───────────────────────────────────────────────────────────
  // 【新增】：多选结算逻辑
  // ───────────────────────────────────────────────────────────
  _resolveMultipleChoices(choices, selectedIndices) {
    if (!selectedIndices || selectedIndices.length === 0) {
      // 如果玩家什么都没选直接提交，直接进入下一幕
      this._playScene(this._sceneIndex + 1);
      return;
    }

    const selectedChoices = selectedIndices.map(i => choices[i]);

    // 将选中的选项转化为队列
    this._multiChoiceQueue = selectedChoices.map(choice => ({
      text:          choice.flavor_text || '...',
      tip:           choice.tip || '',
      effects:       choice.effects || {},
      tags:          choice.tags_added || [],
      next_event_id: choice.next_event_id
    }));

    this._sceneIndex = this._sceneIndex + 1; // 预设好队列播放完毕后的下一幕
    this._isMultiChoiceText = true;
    this._showNextMultiChoiceItem();
  }

  _showNextMultiChoiceItem() {
    const item = this._multiChoiceQueue.shift();

    // 1. 结算当前选项的数值与标签（触发单次飘字）
    if (Object.keys(item.effects).length > 0) {
      const labels = this._buildEffectLabels(item.effects);
      StateManager.applyStatDelta(item.effects, labels);
    }
    item.tags.forEach(tag => StateManager.addTag(tag));
    
    if (item.next_event_id) {
      StateManager.enqueueEventFront({
        eventId: item.next_event_id,
        source:  'chain',
      });
    }
    StateManager.saveGame();

    // 2. 展示当前选项的反馈文本与知识点
    this._dialogBox.show({
      text:         item.text,
      tip:          item.tip,
      showHint:     true,
      effects:      item.effects,
      effectLabels: this._buildEffectLabels(item.effects),
    });
  }


  // ───────────────────────────────────────────────────────────
  // 事件结束
  // ───────────────────────────────────────────────────────────

  _endEvent() {
    log('info', 'VNScreen', `✅ 事件结束：${this._event?.event_id}`);

    if (this._event?.event_id) {
      StateManager.markEventTriggered(this._event.event_id);
    }

    this._onEventEnd?.();
  }

  // ───────────────────────────────────────────────────────────
  // 背景
  // ───────────────────────────────────────────────────────────

  _updateBackground(bgSrc) {
    const bgEl = this._container?.querySelector('#vn-bg');
    if (!bgEl) return;

    if (bgSrc) {
      bgEl.style.backgroundImage    = `url('${bgSrc}')`;
      bgEl.style.backgroundSize     = 'cover';
      bgEl.style.backgroundPosition = 'center';
    } else {
      bgEl.style.backgroundImage = BG_FALLBACK;
    }
  }

  // ───────────────────────────────────────────────────────────
  // 工具
  // ───────────────────────────────────────────────────────────

  _buildEffectLabels(effects) {
    const labelMap = {
      Mental_Health:    '心理健康',
      Physical_Health:  '身体健康',
      Money:            '资金',
      Academic_Ability: '学力',
      English_Ability:  '英语能力',
      AP:               '行动点',
      Agency_Score:     '中介指数', // 【新增】飘字翻译
    };
    const result = {};
    Object.keys(effects ?? {}).forEach(key => {
      result[key] = labelMap[key] ?? key;
    });
    return result;
  }


  // ───────────────────────────────────────────────────────────
  // HTML
  // ───────────────────────────────────────────────────────────

  _buildHTML() {
    return `
      <div class="w-full h-full flex flex-col relative overflow-hidden">

        <!-- 背景插画层 -->
        <div
          id="vn-bg"
          class="flex-1 relative"
          style="background: ${BG_FALLBACK};"
        >
          <!-- 吉祥物占位 -->
          <div id="vn-mascot"
               class="absolute inset-0 flex items-center justify-center
                      pointer-events-none">
            ${this._getMascotSVG()}
          </div>
        </div>

        <!-- 选项层 -->
        <div
          id="vn-choice-layer"
          class="absolute inset-0 flex items-center justify-center hidden"
          style="z-index: 300;"
        >
        </div>

        <!-- 对话框层 -->
        <div id="vn-dialog-layer"
             class="shrink-0"
             style="z-index: 200;">
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