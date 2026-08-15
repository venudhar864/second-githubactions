import { useCallback, useEffect, useMemo, useReducer } from 'react';
import { readJSON, writeJSON } from '../lib/storage.js';
import { createSession, summarise } from '../lib/sessions.js';

const STORAGE_KEY = 'cadence.sessions.v1';

const seed = [
  {
    id: 'seed-1',
    label: 'Rewrite the onboarding email',
    minutes: 45,
    tag: 'writing',
    startedAt: new Date().toISOString(),
    done: true,
  },
  {
    id: 'seed-2',
    label: 'Pair on the payments bug',
    minutes: 90,
    tag: 'deep work',
    startedAt: new Date().toISOString(),
    done: false,
  },
];

function reducer(state, action) {
  switch (action.type) {
    case 'add':
      return [createSession(action.payload), ...state];
    case 'toggle':
      return state.map((s) => (s.id === action.id ? { ...s, done: !s.done } : s));
    case 'remove':
      return state.filter((s) => s.id !== action.id);
    case 'clearCompleted':
      return state.filter((s) => !s.done);
    case 'reset':
      return action.payload;
    default:
      throw new Error(`Unknown action: ${action.type}`);
  }
}

function init(initial) {
  if (initial) return initial;
  return readJSON(STORAGE_KEY, seed);
}

/**
 * Owns every piece of session state. Components stay presentational, which
 * makes them trivial to test and swap out.
 */
export function useSessions(initial) {
  const [sessions, dispatch] = useReducer(reducer, initial, init);

  useEffect(() => {
    writeJSON(STORAGE_KEY, sessions);
  }, [sessions]);

  const add = useCallback((payload) => dispatch({ type: 'add', payload }), []);
  const toggle = useCallback((id) => dispatch({ type: 'toggle', id }), []);
  const remove = useCallback((id) => dispatch({ type: 'remove', id }), []);
  const clearCompleted = useCallback(() => dispatch({ type: 'clearCompleted' }), []);

  const stats = useMemo(() => summarise(sessions), [sessions]);

  return { sessions, stats, add, toggle, remove, clearCompleted };
}
