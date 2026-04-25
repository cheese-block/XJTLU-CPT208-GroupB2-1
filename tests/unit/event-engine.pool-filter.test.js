import { afterEach, describe, expect, it } from 'vitest';
import { buildEventPool } from '../../src/engine/EventEngine.js';
import { EVENTS } from '../../src/data/events.js';

const TEST_EVENT_ID = '__test_random_event__';
const TEST_REPEATABLE_ID = '__test_repeatable_random__';

afterEach(() => {
  delete EVENTS[TEST_EVENT_ID];
  delete EVENTS[TEST_REPEATABLE_ID];
});

describe('EventEngine.buildEventPool', () => {
  it('filters by month and forbidden tags', () => {
    EVENTS[TEST_EVENT_ID] = {
      event_id: TEST_EVENT_ID,
      type: 'random',
      available_months: [2],
      forbidden_tags: ['Blocked'],
    };

    const blockedState = {
      currentMonth: 2,
      tags: ['Blocked'],
      triggeredEventIds: [],
    };
    const wrongMonthState = {
      currentMonth: 1,
      tags: [],
      triggeredEventIds: [],
    };
    const validState = {
      currentMonth: 2,
      tags: [],
      triggeredEventIds: [],
    };

    expect(buildEventPool(blockedState).some((e) => e.event_id === TEST_EVENT_ID)).toBe(false);
    expect(buildEventPool(wrongMonthState).some((e) => e.event_id === TEST_EVENT_ID)).toBe(false);
    expect(buildEventPool(validState).some((e) => e.event_id === TEST_EVENT_ID)).toBe(true);
  });

  it('excludes triggered non-repeatable events and keeps repeatable ones', () => {
    EVENTS[TEST_EVENT_ID] = {
      event_id: TEST_EVENT_ID,
      type: 'random',
      repeatable: false,
    };
    EVENTS[TEST_REPEATABLE_ID] = {
      event_id: TEST_REPEATABLE_ID,
      type: 'random',
      repeatable: true,
    };

    const state = {
      currentMonth: 1,
      tags: [],
      triggeredEventIds: [TEST_EVENT_ID, TEST_REPEATABLE_ID],
    };

    const pool = buildEventPool(state);
    expect(pool.some((e) => e.event_id === TEST_EVENT_ID)).toBe(false);
    expect(pool.some((e) => e.event_id === TEST_REPEATABLE_ID)).toBe(true);
  });
});
