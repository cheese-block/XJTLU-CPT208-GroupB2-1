import * as StateManager from '../../state/StateManager.js';
import { previewEffects, clearPreview } from '../UIManager.js';
import { resolveI18nText, t } from '../../utils/i18n.js';

export class EventCardScreen {
  constructor() {
    this._container = null;
    this._event = null;
    this._sceneIndex = 0;
    this._onEventEnd = null;
  }

  mount(container, state) {
    this._container = container;
    container.innerHTML = this._buildHTML();
    if (typeof lucide !== 'undefined') lucide.createIcons();
  }

  unmount() {
    this._container = null;
    clearPreview();
  }

  onStateChange(state) {}

  startEvent(eventData, onEventEnd) {
    this._event = eventData;
    this._sceneIndex = 0;
    this._onEventEnd = onEventEnd;
    this._playScene(0);
  }

  _playScene(index) {
    const scenes = this._event?.scenes;
    if (!scenes || index >= scenes.length) {
      if (this._event?.event_id) StateManager.markEventTriggered(this._event.event_id);
      this._onEventEnd?.();
      return;
    }
    
    this._sceneIndex = index;
    const scene = scenes[index];

    // 【新增】：解析声明式建筑解锁
    if (scene.unlock_building) {
      scene.unlock_building.forEach(bId => StateManager.unlockBuilding(bId));
    }

    // 场景自带的基础 effects 应该在进入场景时立即结算
    if (scene.effects && Object.keys(scene.effects).length > 0) {
       StateManager.applyStatDelta(scene.effects, this._buildEffectLabels(scene.effects));
       // 结算后清空，防止在某些极端情况下重复触发（此时操作的是 GameLoop 传来的深拷贝副本，很安全）
       scene.effects = null;
    }

    // 更新界面文本
    const titleEl = this._container.querySelector('#ec-title');
    const textEl = this._container.querySelector('#ec-text');
    const tipEl = this._container.querySelector('#ec-tip');
    
    titleEl.textContent = resolveI18nText(this._event.title, t('ec_card_title'));
    textEl.innerHTML = resolveI18nText(scene.text, '').replace(/\n/g, '<br>');
    
    const sceneTip = resolveI18nText(scene.tip, '');
    if (sceneTip) {
      tipEl.innerHTML = `<i data-lucide="lightbulb" class="lucide w-4 h-4"></i> ${sceneTip}`;
      tipEl.classList.remove('hidden');
    } else {
      tipEl.classList.add('hidden');
    }

    // 渲染选项或继续按钮
    const choicesContainer = this._container.querySelector('#ec-choices');
    if (scene.choices && scene.choices.length > 0) {
      this._renderChoices(choicesContainer, scene.choices);
    } else {
      // 纯文本推进
      choicesContainer.innerHTML = `
        <button class="ec-btn w-full px-6 py-4 rounded-xl border-2 border-gray-200 bg-gray-50 text-gray-700 font-bold hover:bg-gray-100 transition-colors flex items-center justify-center gap-2">
          ${t('btn_continue')} <i data-lucide="arrow-right" class="lucide w-4 h-4"></i>
        </button>
      `;
      choicesContainer.querySelector('button').addEventListener('click', () => {
        // 【修复】：移除此处的 effects 结算，已移至顶部
        this._playScene(index + 1);
      });
    }

    if (typeof lucide !== 'undefined') lucide.createIcons({ root: this._container });
  }

  // ───────────────────────────────────────────────────────────
  // 渲染选项（修复：支持数值/标签判定变体文本）
  // ───────────────────────────────────────────────────────────

  _renderChoices(container, choices) {
    const state = StateManager.getState();
    const playerTags = state.tags || [];
    const hasExactBuff = state.activeBuff?.some(b => b.buffId === 'insight_buff');

    container.innerHTML = choices.map((choice, i) => {
      const isLocked = choice.required_tag && !playerTags.includes(choice.required_tag);
      const btnClass = isLocked 
        ? 'border-gray-200 bg-gray-50 text-gray-400 opacity-60 cursor-not-allowed'
        : 'border-xjtlu-blue bg-white text-xjtlu-navy hover:bg-xjtlu-blue hover:text-white hover:shadow-md cursor-pointer';

      return `
        <button class="ec-btn w-full text-left px-5 py-3.5 rounded-xl border-2 transition-all duration-200 flex flex-col gap-1.5 ${btnClass}" 
                data-index="${i}" ${isLocked ? 'disabled' : ''}>
          <div class="flex justify-between items-center w-full">
            <span class="font-bold text-sm">${resolveI18nText(choice.text, '')}</span>
            ${isLocked ? `<i data-lucide="lock" class="lucide w-4 h-4 shrink-0"></i>` : ''}
          </div>
          ${isLocked ? `<span class="text-[0.65rem] text-xjtlu-red">${t('vn_requires_tag')} [${choice.required_tag}]</span>` : ''}
        </button>
      `;
    }).join('');

    // 绑定点击事件
    const btns = container.querySelectorAll('.ec-btn:not([disabled])');
    btns.forEach(btn => {
      const choice = choices[btn.dataset.index];
      
      btn.addEventListener('mouseenter', () => previewEffects(choice.effects, hasExactBuff));
      btn.addEventListener('mouseleave', () => clearPreview());
      
      btn.addEventListener('click', () => {
        clearPreview();

        // 1. 判定变体逻辑（同 VNScreen，确保得分判定生效）
        const currentState = StateManager.getState();
        const currentTags = currentState.tags || [];
        let activeVariant = null;

        if (choice.flavor_text_variants) {
          for (const variant of choice.flavor_text_variants) {
            // 标签检查
            const tagPass = !variant.required_tag || currentTags.includes(variant.required_tag);
            // 数值检查
            let statPass = true;
            if (variant.required_stat) {
              const { stat, min, max } = variant.required_stat;
              const val = currentState[stat] ?? 0;
              if (min !== undefined && val < min) statPass = false;
              if (max !== undefined && val > max) statPass = false;
            }
            if (tagPass && statPass) { activeVariant = variant; break; }
          }
        }

        // 合并效果与标签
        const finalEffects = { ...choice.effects, ...(activeVariant?.effects || {}) };
        const finalTags    = [...(choice.tags_added || []), ...(activeVariant?.tags_added || [])];

        // 2. 应用数值变化
        if (Object.keys(finalEffects).length > 0) {
          StateManager.applyStatDelta(finalEffects, this._buildEffectLabels(finalEffects));
        }

        finalTags.forEach(tag => StateManager.addTag(tag));
        if (choice.next_event_id) {
          StateManager.enqueueEventFront({ eventId: choice.next_event_id, source: 'chain' });
        }
        StateManager.saveGame();
        
        // 3. 处理 Flavor Text
        let finalFlavorText = resolveI18nText(choice.flavor_text, '');
        if (activeVariant?.text) {
          const separator = finalFlavorText ? '<br><br>' : '';
          let colorClass = 'text-xjtlu-blue';
          if (activeVariant.type === 'positive') colorClass = 'text-xjtlu-green';
          if (activeVariant.type === 'negative') colorClass = 'text-xjtlu-red';
          finalFlavorText += `${separator}<span class="${colorClass} font-bold">${resolveI18nText(activeVariant.text, '')}</span>`;
        }

        if (finalFlavorText) {
          this._event.scenes.splice(this._sceneIndex + 1, 0, { text: finalFlavorText, tip: resolveI18nText(choice.tip, '') });
        }
        this._playScene(this._sceneIndex + 1);
      });
    });
  }

  _buildEffectLabels(effects) {
    const labelMap = {
      Mental_Health:    'stat_mental',
      Physical_Health:  'stat_physical',
      Money:            'stat_money',
      Academic_Ability: 'stat_academic',
      English_Ability:  'stat_english',
      AP:               'stat_ap',
    };
    const result = {};
    Object.keys(effects ?? {}).forEach(key => {
      result[key] = t(labelMap[key] || key);
    });
    return result;
  }

  _buildHTML() {
    return `
      <!-- 半透明毛玻璃背景遮罩 -->
      <div class="absolute inset-0 bg-black/40 backdrop-blur-sm z-0"></div>
      
      <!-- 【修改】：移除 pt-24 和 items-start，改为 items-center 实现完全居中 -->
      <div class="relative z-10 w-full h-full flex items-center justify-center px-6">
        
        <!-- 卡片主体: 左右分栏 -->
        <div class="w-full max-w-3xl bg-white rounded-2xl shadow-2xl flex flex-col md:flex-row overflow-hidden border-2 border-xjtlu-navy animate-fade-in">
          
          <!-- 左侧：剧情描述 (60%) -->
          <div class="md:w-3/5 bg-gray-50 p-8 flex flex-col justify-between border-b md:border-b-0 md:border-r border-gray-200">
            <div>
              <div class="flex items-center gap-2 mb-4">
                <i data-lucide="compass" class="lucide w-5 h-5 text-xjtlu-blue"></i>
                <h2 id="ec-title" class="text-base font-black text-xjtlu-navy tracking-widest">${t('ec_card_title')}</h2>
              </div>
              <p id="ec-text" class="text-[0.95rem] text-gray-700 leading-relaxed font-medium"></p>
            </div>
            
            <div id="ec-tip" class="hidden mt-6 bg-yellow-50 border-l-4 border-xjtlu-yellow p-3 text-xs text-yellow-800 rounded-r-lg flex items-start gap-2">
            </div>
          </div>

          <!-- 右侧：选项区 (40%) -->
          <div class="md:w-2/5 p-6 bg-white flex flex-col justify-center">
            <p class="text-[0.65rem] font-bold text-gray-400 uppercase tracking-widest mb-4 text-center">${t('ec_choice_prompt')}</p>
            <div id="ec-choices" class="flex flex-col gap-3">
              <!-- 动态注入按钮 -->
            </div>
          </div>

        </div>
      </div>
    `;
  }
}
