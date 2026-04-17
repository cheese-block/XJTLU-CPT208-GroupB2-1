import * as StateManager from '../../state/StateManager.js';
import { previewEffects, clearPreview } from '../UIManager.js';

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

    // 更新界面文本
    const titleEl = this._container.querySelector('#ec-title');
    const textEl = this._container.querySelector('#ec-text');
    const tipEl = this._container.querySelector('#ec-tip');
    
    titleEl.textContent = this._event.title || '突发事件';
    textEl.innerHTML = scene.text.replace(/\n/g, '<br>');
    
    if (scene.tip) {
      tipEl.innerHTML = `<i data-lucide="lightbulb" class="lucide w-4 h-4"></i> ${scene.tip}`;
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
          继续 <i data-lucide="arrow-right" class="lucide w-4 h-4"></i>
        </button>
      `;
      choicesContainer.querySelector('button').addEventListener('click', () => {
        // 纯文本如果有影响，直接结算
        if (scene.effects && Object.keys(scene.effects).length > 0) {
           StateManager.applyStatDelta(scene.effects, this._buildEffectLabels(scene.effects));
        }
        this._playScene(index + 1);
      });
    }

    if (typeof lucide !== 'undefined') lucide.createIcons({ root: this._container });
  }

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
            <span class="font-bold text-sm">${choice.text}</span>
            ${isLocked ? `<i data-lucide="lock" class="lucide w-4 h-4 shrink-0"></i>` : ''}
          </div>
          ${isLocked ? `<span class="text-[0.65rem] text-xjtlu-red">需要 [${choice.required_tag}]</span>` : ''}
        </button>
      `;
    }).join('');

    // 绑定事件
    const btns = container.querySelectorAll('.ec-btn:not([disabled])');
    btns.forEach(btn => {
      const choice = choices[btn.dataset.index];
      
      btn.addEventListener('mouseenter', () => previewEffects(choice.effects, hasExactBuff));
      btn.addEventListener('mouseleave', () => clearPreview());
      
      btn.addEventListener('click', () => {
        clearPreview();
        if (choice.effects) StateManager.applyStatDelta(choice.effects, this._buildEffectLabels(choice.effects));
        if (choice.tags_added) choice.tags_added.forEach(tag => StateManager.addTag(tag));
        if (choice.next_event_id) StateManager.enqueueEventFront({ eventId: choice.next_event_id, source: 'chain' });
        StateManager.saveGame();
        
        // 如果选项有额外文本，作为下一幕显示；否则直接推进
        if (choice.flavor_text) {
          this._event.scenes.splice(this._sceneIndex + 1, 0, { text: choice.flavor_text, tip: choice.tip });
        }
        this._playScene(this._sceneIndex + 1);
      });
    });
  }

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
    Object.keys(effects ?? {}).forEach(key => {
      result[key] = labelMap[key] ?? key;
    });
    return result;
  }

  _buildHTML() {
    return `
      <!-- 半透明毛玻璃背景遮罩 -->
      <div class="absolute inset-0 bg-black/40 backdrop-blur-sm z-0"></div>
      
      <!-- 居中偏上容器 -->
      <div class="relative z-10 w-full h-full flex items-start justify-center pt-24 px-6">
        
        <!-- 卡片主体: 左右分栏 -->
        <div class="w-full max-w-3xl bg-white rounded-2xl shadow-2xl flex flex-col md:flex-row overflow-hidden border-2 border-xjtlu-navy animate-fade-in">
          
          <!-- 左侧：剧情描述 (60%) -->
          <div class="md:w-3/5 bg-gray-50 p-8 flex flex-col justify-between border-b md:border-b-0 md:border-r border-gray-200">
            <div>
              <div class="flex items-center gap-2 mb-4">
                <i data-lucide="compass" class="lucide w-5 h-5 text-xjtlu-blue"></i>
                <h2 id="ec-title" class="text-base font-black text-xjtlu-navy tracking-widest">事件</h2>
              </div>
              <p id="ec-text" class="text-[0.95rem] text-gray-700 leading-relaxed font-medium"></p>
            </div>
            
            <div id="ec-tip" class="hidden mt-6 bg-yellow-50 border-l-4 border-xjtlu-yellow p-3 text-xs text-yellow-800 rounded-r-lg flex items-start gap-2">
            </div>
          </div>

          <!-- 右侧：选项区 (40%) -->
          <div class="md:w-2/5 p-6 bg-white flex flex-col justify-center">
            <p class="text-[0.65rem] font-bold text-gray-400 uppercase tracking-widest mb-4 text-center">请做出抉择</p>
            <div id="ec-choices" class="flex flex-col gap-3">
              <!-- 动态注入按钮 -->
            </div>
          </div>

        </div>
      </div>
    `;
  }
}