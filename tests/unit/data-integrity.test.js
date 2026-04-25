import { describe, expect, it } from 'vitest';
import { ACTIONS } from '../../src/data/actions.js';
import { BUILDINGS } from '../../src/data/buildings.js';
import { EVENTS } from '../../src/data/events.js';
import { CONSTANTS } from '../../src/utils/constants.js';

function collectEventReferences() {
  const refs = [];

  for (const event of Object.values(EVENTS)) {
    const scenes = Array.isArray(event.scenes) ? event.scenes : [];
    for (const scene of scenes) {
      if (Array.isArray(scene.unlock_building)) {
        for (const buildingId of scene.unlock_building) {
          refs.push({ kind: 'unlock_building', from: event.event_id, target: buildingId });
        }
      }

      const choices = Array.isArray(scene.choices) ? scene.choices : [];
      for (const choice of choices) {
        if (choice.next_event_id) {
          refs.push({ kind: 'next_event_id', from: event.event_id, target: choice.next_event_id });
        }
      }
    }
  }

  return refs;
}

describe('Data integrity & reference checks', () => {
  it('ACTIONS references valid buildings and events', () => {
    const buildingIds = new Set(BUILDINGS.map((b) => b.id));
    const eventIds = new Set(Object.keys(EVENTS));

    for (const action of Object.values(ACTIONS)) {
      expect(buildingIds.has(action.buildingId)).toBe(true);

      if (action.guaranteedEventId) {
        expect(eventIds.has(action.guaranteedEventId)).toBe(true);
      }

      const pool = Array.isArray(action.eventPool) ? action.eventPool : [];
      for (const eventId of pool) {
        expect(eventIds.has(eventId)).toBe(true);
      }
    }
  });

  it('EVENTS nested references are valid', () => {
    const buildingIds = new Set(BUILDINGS.map((b) => b.id));
    const eventIds = new Set(Object.keys(EVENTS));
    const refs = collectEventReferences();

    for (const ref of refs) {
      if (ref.kind === 'unlock_building') {
        expect(buildingIds.has(ref.target)).toBe(true);
      }
      if (ref.kind === 'next_event_id') {
        expect(eventIds.has(ref.target)).toBe(true);
      }
    }
  });

  it('scheduled events reference existing event IDs', () => {
    const eventIds = new Set(Object.keys(EVENTS));
    for (const row of CONSTANTS.SCHEDULED_EVENTS) {
      expect(eventIds.has(row.eventId)).toBe(true);
    }
  });
});
