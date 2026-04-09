import * as StateManager from '../../state/StateManager.js';
import { CONSTANTS }     from '../../utils/constants.js';
import { determineEnding } from '../../engine/EndingEngine.js';

export class EndingScreen {
  constructor() {
    this._container = null;
  }

  mount(container, state) {
    this._container = container;
    
    // 结算结局
    const ending = determineEnding(state);
    
    container.innerHTML = this._buildHTML(ending);
    if (typeof lucide !== 'undefined') lucide.createIcons();
    this._bindEvents();
  }

  unmount() {
    this._container = null;
  }

  onStateChange(_state) {}

  _buildHTML(ending) {
    const themeMap = {
      'success': { bg: 'bg-green-50', border: 'border-green-600', text: 'text-green-700', icon: 'award' },
      'primary': { bg: 'bg-blue-50',  border: 'border-blue-600',  text: 'text-blue-700',  icon: 'mail-check' },
      'warning': { bg: 'bg-amber-50', border: 'border-amber-500', text: 'text-amber-700', icon: 'mail-warning' },
      'danger':  { bg: 'bg-red-50',   border: 'border-red-600',   text: 'text-red-700',   icon: 'skull' },
    };
    const theme = themeMap[ending.theme] || themeMap['primary'];

    return `
      <div class="w-full h-full flex items-center justify-center bg-gray-900 px-6 relative overflow-hidden">
        
        <!-- 背景光晕 -->
        <div class="absolute inset-0 flex items-center justify-center opacity-20 pointer-events-none">
          <div class="w-[800px] h-[800px] rounded-full ${theme.bg} blur-3xl"></div>
        </div>

        <div class="w-full max-w-xl bg-white rounded-xl shadow-2xl z-10 flex flex-col overflow-hidden animate-fade-in">
          
          <!-- 顶部横幅 -->
          <div class="${theme.bg} ${theme.border} border-b-4 px-8 py-10 flex flex-col items-center text-center">
            <div class="w-20 h-20 rounded-full bg-white shadow-md flex items-center justify-center mb-4">
              <i data-lucide="${theme.icon}" class="lucide w-10 h-10 ${theme.text}"></i>
            </div>
            <p class="text-xs font-bold ${theme.text} tracking-[0.2em] uppercase mb-2">Final Result</p>
            <h1 class="text-4xl font-black text-gray-900">${ending.title}</h1>
          </div>

          <!-- 正文描述 -->
          <div class="px-8 py-8 flex flex-col gap-6">
            <p class="text-gray-700 leading-relaxed text-lg">
              ${ending.description}
            </p>

            <!-- 知识点复盘 -->
            <div class="bg-gray-50 border-l-4 border-xjtlu-yellow p-4 rounded-r-lg mt-2">
              <div class="flex items-center gap-2 mb-1">
                <i data-lucide="lightbulb" class="lucide w-4 h-4 text-xjtlu-yellow"></i>
                <span class="text-xs font-bold text-gray-500 uppercase tracking-wider">老师的复盘</span>
              </div>
              <p class="text-sm text-gray-600 leading-relaxed">
                ${ending.tip}
              </p>
            </div>
          </div>

          <!-- 底部按钮 -->
          <div class="px-8 py-6 bg-gray-50 border-t border-gray-100 flex gap-4">
            <button id="btn-restart" class="xjtlu-btn xjtlu-btn--primary w-full justify-center py-3 text-base">
              <i data-lucide="rotate-ccw" class="lucide w-5 h-5"></i>
              重新开始游戏
            </button>
          </div>

        </div>
      </div>
    `;
  }

  _bindEvents() {
    this._container?.querySelector('#btn-restart')?.addEventListener('click', () => {
      StateManager.resetGame();
      StateManager.setGamePhase(CONSTANTS.GAME_PHASE.TITLE);
    });
  }
}