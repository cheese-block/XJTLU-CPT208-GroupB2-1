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
    log('debug', 'VNScreen', `_playScene(${index})，共 ${scenes?.length} 个场景`);

    if (!scenes || index >= scenes.length) {
      log('debug', 'VNScreen', '所有场景播放完毕，调用 _endEvent()');
      this._endEvent();
      return;
    }

    this._sceneIndex = index;
    const scene      = scenes[index];

    // 【新增】：解析声明式建筑解锁
    if (scene.unlock_building) {
      scene.unlock_building.forEach(bId => StateManager.unlockBuilding(bId));
    }

    this._updateBackground(scene.bg ?? null);

    // scene 级别的数值自动结算
    if (scene.effects && Object.keys(scene.effects).length > 0) {
      StateManager.applyStatDelta(
        scene.effects,
        this._buildEffectLabels(scene.effects)
      );
    }

    if (scene.choices && scene.choices.length > 0) {
      this._dialogBox.show({
        text:       scene.text,
        speaker:    scene.speaker ?? '',
        tip:        scene.tip ?? '',
        showHint:   false,
        onComplete: () => {
          const playerTags = StateManager.getState().tags || [];
          this._showChoices(scene.choices, scene.choice_type === 'multiple', playerTags);
        },
      });
    } else {
      // 【新增】：获取透视 Buff 状态
      const currentState = StateManager.getState();
      const hasExactBuff = currentState.activeBuff?.some(b => b.buffId === 'insight_buff');

      // 普通旁白：打印完等待点击
      this._dialogBox.show({
        text:     scene.text,
        speaker:  scene.speaker ?? '',
        tip:      scene.tip ?? '',
        showHint: true,
        effects:      scene.effects ?? null,
        effectLabels: scene.effects ? this._buildEffectLabels(scene.effects) : {},
        hasExactBuff: hasExactBuff, // 【传入透视状态】
      });
    }
  }

  // ───────────────────────────────────────────────────────────
  // 点击处理
  // ───────────────────────────────────────────────────────────

  _handleClick(e) {
    // 点击选项按钮不触发推进
    if (e.target.closest('.vn-choices')) return;

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
    // 【修改】：获取完整 state 传递给 ChoicePanel
    const state = StateManager.getState();
    this._choicePanel.show(choices, (result) => {
      if (Array.isArray(result)) {
        this._resolveMultipleChoices(choices, result);
      } else {
        this._resolveChoice(choices[result]);
      }
    }, isMultiple, state); 
  }

  // ───────────────────────────────────────────────────────────
  // 选项处理（带调试日志版）
  // ───────────────────────────────────────────────────────────

  _resolveChoice(choice) {
    this._isMultiChoiceText = false;
    this._multiChoiceQueue = [];

    const currentState = StateManager.getState();
    const playerTags   = currentState.tags || [];
    const hasExactBuff = currentState.activeBuff?.some(b => b.buffId === 'insight_buff');

    // === 调试日志开始 ===
    console.group(`%c🔍 选项判定调试: ${choice.text}`, "color: #004B9B; font-weight: bold;");
    console.log("当前完整状态:", currentState);
    console.log("当前 Agency_Score:", currentState.Agency_Score);
    console.log("当前持有 Tags:", playerTags);
    // === 调试日志结束 ===

    let activeVariant = null;
    if (choice.flavor_text_variants && choice.flavor_text_variants.length > 0) {
      for (const [idx, variant] of choice.flavor_text_variants.entries()) {
        const tagPass = !variant.required_tag || playerTags.includes(variant.required_tag);
        
        let statPass = true;
        if (variant.required_stat) {
          const { stat, min, max } = variant.required_stat;
          const currentVal = currentState[stat] ?? 0;
          
          if (min !== undefined && currentVal < min) statPass = false;
          if (max !== undefined && currentVal > max) statPass = false;
          
          console.log(`检查变体 [${idx}]: 属性[${stat}] 要求(${min ?? '-∞'} 至 ${max ?? '+∞'}), 当前值: ${currentVal} -> ${statPass ? '✅' : '❌'}`);
        }

        const finalPass = tagPass && statPass;
        console.log(`检查变体 [${idx}]: 最终判定 -> ${finalPass ? '🎯 匹配成功' : '🚫 跳过'}`);

        if (finalPass) {
          activeVariant = variant;
          break;
        }
      }
    }

    console.log("最终选择的变体:", activeVariant);
    console.groupEnd();

    const finalEffects = { ...choice.effects, ...(activeVariant?.effects || {}) };
    const finalTags    = [...(choice.tags_added || []), ...(activeVariant?.tags_added || [])];

    let finalFlavorText = choice.flavor_text || '';
    if (activeVariant?.text) {
      let colorClass = 'text-xjtlu-blue';
      if (activeVariant.type === 'positive') colorClass = 'text-xjtlu-green';
      if (activeVariant.type === 'negative') colorClass = 'text-xjtlu-red';
      const separator  = finalFlavorText ? '<br><br>' : '';
      finalFlavorText += `${separator}<span class="${colorClass} font-bold">${activeVariant.text}</span>`;
    }

    if (Object.keys(finalEffects).length > 0) {
      StateManager.applyStatDelta(finalEffects, this._buildEffectLabels(finalEffects));
    }
    finalTags.forEach(tag => StateManager.addTag(tag));
    
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
        hasExactBuff: hasExactBuff,
      });
    } else {
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
    
    // 【新增】：获取透视 Buff 状态
    const currentState = StateManager.getState();
    const hasExactBuff = currentState.activeBuff?.some(b => b.buffId === 'insight_buff');

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

    this._dialogBox.show({
      text:         item.text,
      tip:          item.tip,
      showHint:     true,
      effects:      item.effects,
      effectLabels: this._buildEffectLabels(item.effects),
      hasExactBuff: hasExactBuff, // 【传入透视状态】
    });
  }


  // ───────────────────────────────────────────────────────────
  // 事件结束
  // ───────────────────────────────────────────────────────────

  _endEvent() {
    // 【修复】：事件结束时重置多选状态
    this._isMultiChoiceText = false;
    this._multiChoiceQueue = [];
    
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
      <img
        src="assets/images/logo.png"
        alt=""
        aria-hidden="true"
        style="width:220px; height:220px; object-fit:contain; opacity:0.15;"
        draggable="false"
      />
    `;
  }
}