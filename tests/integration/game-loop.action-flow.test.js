import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import * as StateManager from '../../src/state/StateManager.js';
import { initGameLoop, executeAction } from '../../src/engine/GameLoop.js';
import { ACTIONS } from '../../src/data/actions.js';
import { CONSTANTS } from '../../src/utils/constants.js';
import { createImmediateScreen } from '../helpers/fake-screens.js';

describe('GameLoop action flow integration', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    localStorage.clear();
    StateManager.initStateManager();
    StateManager.setGamePhase(CONSTANTS.GAME_PHASE.MAP);
    initGameLoop(createImmediateScreen(), createImmediateScreen());
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('consumes AP and returns to MAP after a guaranteed event resolves', async () => {
    const action = ACTIONS.study_fb; // guaranteed default_fb
    const before = StateManager._getInternalState().AP;

    const started = executeAction(action.id, action);
    expect(started).toBe(true);

    await vi.runAllTimersAsync();

    const state = StateManager._getInternalState();
    expect(state.AP).toBe(before - 1);
    expect(state.gamePhase).toBe(CONSTANTS.GAME_PHASE.MAP);
  });

  it('fails fast when AP is insufficient', () => {
    StateManager.applyStatDelta({ AP: -999 });
    const action = ACTIONS.study_fb;

    const started = executeAction(action.id, action);
    expect(started).toBe(false);
  });
});
