/** Pure helpers for session records. Kept free of React so they're easy to test. */

export const TAGS = ['deep work', 'writing', 'review', 'learning'];

export function createSession({ label, minutes, tag }) {
  return {
    id:
      typeof crypto !== 'undefined' && crypto.randomUUID
        ? crypto.randomUUID()
        : `s_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
    label: label.trim(),
    minutes: Number(minutes),
    tag,
    startedAt: new Date().toISOString(),
    done: false,
  };
}

export function validate({ label, minutes }) {
  const errors = {};
  if (!label || !label.trim()) {
    errors.label = 'Name the session so you can recognise it later.';
  } else if (label.trim().length > 60) {
    errors.label = 'Keep it under 60 characters.';
  }
  const n = Number(minutes);
  if (!Number.isFinite(n) || n <= 0) {
    errors.minutes = 'Enter a length in minutes.';
  } else if (n > 480) {
    errors.minutes = 'Cap a single session at 8 hours.';
  }
  return errors;
}

export function summarise(sessions) {
  const done = sessions.filter((s) => s.done);
  const totalMinutes = done.reduce((sum, s) => sum + s.minutes, 0);
  const byTag = TAGS.map((tag) => ({
    tag,
    minutes: done.filter((s) => s.tag === tag).reduce((sum, s) => sum + s.minutes, 0),
  })).filter((entry) => entry.minutes > 0);

  return {
    completed: done.length,
    planned: sessions.length - done.length,
    totalMinutes,
    longest: done.reduce((max, s) => Math.max(max, s.minutes), 0),
    byTag,
  };
}

export function formatDuration(minutes) {
  if (!minutes) return '0m';
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  if (!h) return `${m}m`;
  return m ? `${h}h ${m}m` : `${h}h`;
}
