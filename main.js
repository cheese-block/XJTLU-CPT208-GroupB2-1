import { CONSTANTS }          from './src/utils/constants.js';
import * as StateManager      from './src/state/StateManager.js';
import { log }                from './src/utils/helpers.js';

import { initUIManager, registerScreen } from './src/ui/UIManager.js';
import { initGameLoop, checkBadEndings } from './src/engine/GameLoop.js';
import { TitleScreen }        from './src/ui/screens/TitleScreen.js';
import { SchoolSelectScreen } from './src/ui/screens/SchoolSelectScreen.js';
import { MapScreen }          from './src/ui/screens/MapScreen.js';
import { VNScreen }           from './src/ui/screens/VNScreen.js';
import { MonthSummaryScreen } from './src/ui/screens/MonthSummaryScreen.js';
import { initTooltipManager } from './src/ui/components/TooltipManager.js';
import { TagShowcaseScreen }  from './src/ui/screens/TagShowcaseScreen.js';
import { EndingScreen }       from './src/ui/screens/EndingScreen.js';
import { EventCardScreen }    from './src/ui/screens/EventCardScreen.js';
import { CollectionScreen }   from './src/ui/screens/CollectionScreen.js';

let _vnScreen = null;
let _eventCardScreen = null;

document.addEventListener('DOMContentLoaded', () => {

  initLucide();
  StateManager.initStateManager();

  // 【新增调用】：初始化全局 Tooltip
  initTooltipManager();

  // 【修改 2】：在 initGameLoop 调用时传入两个 Screen
  _vnScreen = new VNScreen();
  _eventCardScreen = new EventCardScreen();

  initGameLoop(_vnScreen, _eventCardScreen);

  // 【修复】：合并注册逻辑，确保所有 Screen（包括 EVENT_CARD）都被正确注册，删除多余的重复注册块
  registerScreen(CONSTANTS.GAME_PHASE.TITLE,         new TitleScreen());
  registerScreen(CONSTANTS.GAME_PHASE.SCHOOL_SELECT, new SchoolSelectScreen());
  registerScreen(CONSTANTS.GAME_PHASE.MAP,           new MapScreen());
  registerScreen(CONSTANTS.GAME_PHASE.VN,            _vnScreen);
  registerScreen(CONSTANTS.GAME_PHASE.EVENT_CARD,    _eventCardScreen);
  registerScreen(CONSTANTS.GAME_PHASE.MONTH_SUMMARY, new MonthSummaryScreen());
  registerScreen(CONSTANTS.GAME_PHASE.TAG_SHOWCASE,  new TagShowcaseScreen());
  registerScreen(CONSTANTS.GAME_PHASE.ENDING,        new EndingScreen());
  registerScreen(CONSTANTS.GAME_PHASE.COLLECTION,    new CollectionScreen());

  initUIManager();

  // 【修改点】：在全局监听中加入 Bad End 检查，移除全屏红框警告
  StateManager.subscribe((state) => {
    StateManager.consumePendingStatChanges();

    // 全局 Bad End 拦截（防止死循环，只有在非结局界面才检查）
    if (state.gamePhase !== CONSTANTS.GAME_PHASE.ENDING && 
        state.gamePhase !== CONSTANTS.GAME_PHASE.TAG_SHOWCASE) {
      checkBadEndings();
    }
  });

  StateManager.setGamePhase(CONSTANTS.GAME_PHASE.TITLE);
  log('info', 'Main', '🚀 应用启动完成');

  // 调试工具
  window._testVN = (eventId) => {
    import('./src/data/events.js').then(({ EVENTS }) => {
      const event = EVENTS[eventId];
      if (!event) { console.error('事件不存在:', eventId); return; }
      StateManager.setGamePhase(CONSTANTS.GAME_PHASE.VN);
      setTimeout(() => {
        _vnScreen.startEvent(event, () => {
          StateManager.setGamePhase(CONSTANTS.GAME_PHASE.MAP);
        });
      }, 100);
    });
  };

  window._addBuff = (buff) => StateManager.addBuff(buff);
  window._testAddBuff = () => {
    StateManager.addBuff({
      buffId: 'test_buff', label: '雅思搭子', icon: 'users',
      durationType: 'months', remainingMonths: 3,
      effects: { stat_modifier: { stat: 'English_Ability',
        action: 'study_ielts', delta: 3 } },
      source_event_id: 'test',
    });
  };
});

function initLucide() {
  if (typeof lucide === 'undefined') {
    console.error('[Main] Lucide 未加载');
    return;
  }
  lucide.createIcons();
  log('info', 'Main', '✅ Lucide 初始化完成');
}