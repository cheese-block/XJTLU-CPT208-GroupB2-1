import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import * as StateManager from '../../src/state/StateManager.js';
import { ACTIONS } from '../../src/data/actions.js';
import { CONSTANTS } from '../../src/utils/constants.js';
import { executeAction, initGameLoop, resolveMonthEnd } from '../../src/engine/GameLoop.js';
import { createImmediateScreen } from '../helpers/fake-screens.js';

function assertInvariants(state, prevMonth) {
  expect(state.Mental_Health).toBeGreaterThanOrEqual(CONSTANTS.MENTAL_HEALTH_MIN);
  expect(state.Mental_Health).toBeLessThanOrEqual(CONSTANTS.MENTAL_HEALTH_MAX);

  expect(state.Physical_Health).toBeGreaterThanOrEqual(CONSTANTS.PHYSICAL_HEALTH_MIN);
  expect(state.Physical_Health).toBeLessThanOrEqual(CONSTANTS.PHYSICAL_HEALTH_MAX);

  expect(state.Money).toBeGreaterThanOrEqual(CONSTANTS.MONEY_MIN);
  expect(state.Money).toBeLessThanOrEqual(CONSTANTS.MONEY_MAX);

  expect(state.AP).toBeGreaterThanOrEqual(0);
  expect(state.AP).toBeLessThanOrEqual(CONSTANTS.AP_MAX_PER_MONTH);
  expect(state.currentMonth).toBeGreaterThanOrEqual(prevMonth);
}

describe('Monte Carlo simulation with invariants', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('runs many random games without invariant violations or uncaught errors', async () => {
    const actions = Object.values(ACTIONS);
    const runs = 100;
    let crashes = 0;
    let badEndings = 0;
    let naturalEnds = 0;
    const badEndingByTag = {};
    const crashSnapshots = [];

    for (let run = 0; run < runs; run += 1) {
      let lastActionId = null;
      let steps = 0;
      try {
        localStorage.clear();
        StateManager.initStateManager();
        StateManager.setGamePhase(CONSTANTS.GAME_PHASE.MAP);
        initGameLoop(createImmediateScreen(), createImmediateScreen());

        let prevMonth = 1;

        while (steps < 300) {
          steps += 1;
          const state = StateManager._getInternalState();
          assertInvariants(state, prevMonth);

          const isDead = state.tags.some((t) => t.startsWith('__BAD_END_'));
          if (isDead) {
            badEndings += 1;
            const deathTag = state.tags.find((t) => t.startsWith('__BAD_END_')) ?? '__UNKNOWN_BAD_END__';
            badEndingByTag[deathTag] = (badEndingByTag[deathTag] ?? 0) + 1;
            break;
          }

          if (state.currentMonth > CONSTANTS.MAX_MONTHS) {
            naturalEnds += 1;
            break;
          }

          prevMonth = state.currentMonth;

          if (state.AP > 0) {
            const action = actions[Math.floor(Math.random() * actions.length)];
            lastActionId = action.id;
            executeAction(action.id, action);
            await vi.runAllTimersAsync();
          } else {
            lastActionId = '__MONTH_END__';
            resolveMonthEnd(() => {});
            await vi.runAllTimersAsync();
          }

          const next = StateManager._getInternalState();
          assertInvariants(next, prevMonth);
          if (next.currentMonth > CONSTANTS.MAX_MONTHS || next.gamePhase === CONSTANTS.GAME_PHASE.MONTH_SUMMARY) {
            naturalEnds += 1;
            break;
          }
        }
      } catch (error) {
        crashes += 1;
        const snapshot = StateManager._getInternalState();
        crashSnapshots.push({
          run,
          steps,
          lastActionId,
          month: snapshot?.currentMonth,
          AP: snapshot?.AP,
          Mental_Health: snapshot?.Mental_Health,
          Physical_Health: snapshot?.Physical_Health,
          Money: snapshot?.Money,
          tags: snapshot?.tags,
          message: error instanceof Error ? error.message : String(error),
        });
      }
    }

    const summary = {
      runs,
      crashes,
      badEndings,
      naturalEnds,
      badEndingByTag,
      crashSnapshots,
    };
    console.log('[MonteCarloSummary]', JSON.stringify(summary));

    if (crashSnapshots.length > 0) {
      throw new Error(`[MonteCarloCrash] ${JSON.stringify(crashSnapshots[0])}`);
    }

    expect(naturalEnds).toBeGreaterThan(0);
    expect(crashes).toBe(0);
    expect(badEndings + naturalEnds).toBe(runs);
  }, 30000);
});
