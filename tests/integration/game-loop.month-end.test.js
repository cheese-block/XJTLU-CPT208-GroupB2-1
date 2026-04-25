import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import * as StateManager from '../../src/state/StateManager.js';
import { initGameLoop, resolveMonthEnd } from '../../src/engine/GameLoop.js';
import { CONSTANTS } from '../../src/utils/constants.js';
import { createImmediateScreen } from '../helpers/fake-screens.js';

describe('GameLoop month-end integration', () => {
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

  it('calls onMonthEnd and advances month for normal month flow', async () => {
    const onMonthEnd = vi.fn();

    resolveMonthEnd(onMonthEnd);
    await vi.runAllTimersAsync();

    const state = StateManager._getInternalState();
    expect(state.currentMonth).toBe(2);
    expect(onMonthEnd).toHaveBeenCalledTimes(1);
    expect(onMonthEnd.mock.calls[0][0]).toMatchObject({ newMonth: 2 });
  });

  it('enters MONTH_SUMMARY at game-end month instead of calling onMonthEnd', async () => {
    const internal = StateManager._getInternalState();
    internal.currentMonth = CONSTANTS.MAX_MONTHS;

    const onMonthEnd = vi.fn();
    resolveMonthEnd(onMonthEnd);
    await vi.runAllTimersAsync();

    const state = StateManager._getInternalState();
    expect(state.gamePhase).toBe(CONSTANTS.GAME_PHASE.MONTH_SUMMARY);
    expect(onMonthEnd).not.toHaveBeenCalled();
  });
});
