import { beforeEach, describe, expect, it } from 'vitest';
import * as StateManager from '../../src/state/StateManager.js';

describe('StateManager.applyStatDelta', () => {
  beforeEach(() => {
    localStorage.clear();
    StateManager.initStateManager();
  });

  it('clamps bounded stats and reports actual delta', () => {
    const actual = StateManager.applyStatDelta({ Money: +1000 }, { Money: '资金' });
    const state = StateManager._getInternalState();

    expect(actual.Money).toBe(50); // 50 -> 100
    expect(state.Money).toBe(100);
  });

  it('does not push pending changes for hidden internal stats', () => {
    StateManager.consumePendingStatChanges();

    StateManager.applyStatDelta({ Agency_Score: +10, __debug: +5 });
    const pending = StateManager.consumePendingStatChanges();

    expect(pending).toEqual([]);
  });

  it('skips unknown stats safely', () => {
    const actual = StateManager.applyStatDelta({ NotARealStat: 123, Mental_Health: -5 });
    const state = StateManager._getInternalState();

    expect(actual).not.toHaveProperty('NotARealStat');
    expect(actual.Mental_Health).toBe(-5);
    expect(state.Mental_Health).toBe(45);
  });
});
