import { formatDuration } from '../lib/sessions.js';

export default function SessionItem({ session, onToggle, onRemove }) {
  const { id, label, minutes, tag, done } = session;

  return (
    <li className={`session${done ? ' session--done' : ''}`}>
      <input
        type="checkbox"
        className="session__check"
        id={`session-${id}`}
        checked={done}
        onChange={() => onToggle(id)}
      />
      <label className="session__label" htmlFor={`session-${id}`}>
        <span className="session__name">{label}</span>
        <span className="session__meta">
          <span className="session__tag">{tag}</span>
          <span aria-hidden="true">·</span>
          <span>{formatDuration(minutes)}</span>
        </span>
      </label>
      <button
        type="button"
        className="button button--ghost"
        onClick={() => onRemove(id)}
        aria-label={`Delete ${label}`}
      >
        Delete
      </button>
    </li>
  );
}
