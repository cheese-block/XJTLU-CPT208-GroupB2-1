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
  it('ACTIONS keys match action.id and required fields exist', () => {
    for (const [actionKey, action] of Object.entries(ACTIONS)) {
      expect(action.id).toBe(actionKey);
      expect(typeof action.buildingId).toBe('string');
      expect(action.buildingId.length).toBeGreaterThan(0);
      expect(action.label && typeof action.label === 'object').toBe(true);
      expect(typeof action.apCost).toBe('number');
    }
  });

  it('BUILDINGS have unique IDs and required fields', () => {
    const ids = BUILDINGS.map((b) => b.id);
    const unique = new Set(ids);
    expect(unique.size).toBe(ids.length);

    for (const building of BUILDINGS) {
      expect(typeof building.id).toBe('string');
      expect(building.id.length).toBeGreaterThan(0);
      expect(building.title && typeof building.title === 'object').toBe(true);
      expect(Array.isArray(building.actions)).toBe(true);
    }
  });

  it('EVENTS keys match event_id and required fields exist', () => {
    for (const [eventKey, event] of Object.entries(EVENTS)) {
      expect(event.event_id).toBe(eventKey);
      expect(typeof event.type).toBe('string');
      expect(event.type.length).toBeGreaterThan(0);
      expect(event.title && typeof event.title === 'object').toBe(true);
    }
  });

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
