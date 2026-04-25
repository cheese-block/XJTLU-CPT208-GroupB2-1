import { beforeEach, describe, expect, it, vi } from 'vitest';

const { mockState, stateManagerMock } = vi.hoisted(() => {
  const localState = {
    tags: [],
    pendingEventQueue: [],
    Mental_Health: 50,
    Physical_Health: 50,
    Money: 50,
  };

  const localMock = {
    getState: vi.fn(() => localState),
    addTag: vi.fn((tag) => {
      if (!localState.tags.includes(tag)) localState.tags.push(tag);
    }),
    dequeueEvent: vi.fn(() => {
      localState.pendingEventQueue.shift();
    }),
    enqueueEventBack: vi.fn((event) => {
      localState.pendingEventQueue.push(event);
    }),
  };

  return { mockState: localState, stateManagerMock: localMock };
});

vi.mock('../../src/state/StateManager.js', () => stateManagerMock);

import { checkBadEndings } from '../../src/engine/GameLoop.js';

describe('GameLoop.checkBadEndings', () => {
  beforeEach(() => {
    mockState.tags = [];
    mockState.pendingEventQueue = [];
    mockState.Mental_Health = 50;
    mockState.Physical_Health = 50;
    mockState.Money = 50;
    vi.clearAllMocks();
  });

  it('returns false when no death condition is met', () => {
    expect(checkBadEndings()).toBe(false);
    expect(stateManagerMock.addTag).not.toHaveBeenCalled();
    expect(stateManagerMock.enqueueEventBack).not.toHaveBeenCalled();
  });

  it('triggers death when mental reaches 100 and enqueues death event', () => {
    mockState.Mental_Health = 100;
    mockState.pendingEventQueue = [{ eventId: 'dummy_1' }, { eventId: 'dummy_2' }];

    expect(checkBadEndings()).toBe(true);
    expect(mockState.tags).toContain('__BAD_END_MENTAL_100__');
    expect(stateManagerMock.dequeueEvent).toHaveBeenCalledTimes(2);
    expect(stateManagerMock.enqueueEventBack).toHaveBeenCalledWith({
      eventId: 'death_mental_100',
      source: 'chain',
    });
  });

  it('is idempotent after any bad ending tag already exists', () => {
    mockState.tags = ['__BAD_END_MONEY_0__'];

    expect(checkBadEndings()).toBe(true);
    expect(stateManagerMock.addTag).not.toHaveBeenCalled();
    expect(stateManagerMock.enqueueEventBack).not.toHaveBeenCalled();
  });
});
