import { describe, expect, it } from 'vitest';
import { formatDuration, summarise, validate } from './sessions.js';

describe('validate', () => {
  it('rejects an empty label', () => {
    expect(validate({ label: '   ', minutes: 30 }).label).toBeTruthy();
  });

  it('rejects a non-positive duration', () => {
    expect(validate({ label: 'Read', minutes: 0 }).minutes).toBeTruthy();
  });

  it('accepts a well-formed session', () => {
    expect(validate({ label: 'Read', minutes: 30 })).toEqual({});
  });
});

describe('summarise', () => {
  const sessions = [
    { minutes: 60, tag: 'writing', done: true },
    { minutes: 30, tag: 'writing', done: true },
    { minutes: 90, tag: 'deep work', done: false },
  ];

  it('counts only completed minutes', () => {
    expect(summarise(sessions).totalMinutes).toBe(90);
  });

  it('splits completed and planned', () => {
    const stats = summarise(sessions);
    expect(stats.completed).toBe(2);
    expect(stats.planned).toBe(1);
  });

  it('groups completed minutes by tag', () => {
    expect(summarise(sessions).byTag).toEqual([{ tag: 'writing', minutes: 90 }]);
  });
});

describe('formatDuration', () => {
  it.each([
    [0, '0m'],
    [45, '45m'],
    [60, '1h'],
    [95, '1h 35m'],
  ])('formats %i minutes as %s', (input, expected) => {
    expect(formatDuration(input)).toBe(expected);
  });
});
