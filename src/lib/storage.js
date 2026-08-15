/**
 * A thin wrapper over localStorage that never throws.
 *
 * Storage can be unavailable (private browsing, disabled cookies, SSR, a
 * sandboxed iframe). Rather than guarding every call site, this falls back to
 * an in-memory Map so the app keeps working — it just forgets on reload.
 */

const memory = new Map();

function backend() {
  try {
    const probe = '__cadence_probe__';
    window.localStorage.setItem(probe, '1');
    window.localStorage.removeItem(probe);
    return window.localStorage;
  } catch {
    return null;
  }
}

export function readJSON(key, fallback) {
  const store = backend();
  try {
    const raw = store ? store.getItem(key) : memory.get(key);
    return raw == null ? fallback : JSON.parse(raw);
  } catch {
    return fallback;
  }
}

export function writeJSON(key, value) {
  const raw = JSON.stringify(value);
  const store = backend();
  try {
    if (store) store.setItem(key, raw);
    else memory.set(key, raw);
    return true;
  } catch {
    // Quota exceeded, or storage vanished mid-session. Keep it in memory.
    memory.set(key, raw);
    return false;
  }
}

export function clearKey(key) {
  const store = backend();
  try {
    if (store) store.removeItem(key);
  } catch {
    /* ignore */
  }
  memory.delete(key);
}
