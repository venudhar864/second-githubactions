import SessionItem from './SessionItem.jsx';

export default function SessionList({ sessions, onToggle, onRemove, onClearCompleted }) {
  const completed = sessions.filter((s) => s.done).length;

  if (!sessions.length) {
    return (
      <section className="panel empty">
        <h2 className="panel__title">Sessions</h2>
        <p className="empty__line">Nothing planned yet.</p>
        <p className="empty__hint">Add your first session and it shows up here.</p>
      </section>
    );
  }

  return (
    <section className="panel">
      <div className="panel__header">
        <h2 className="panel__title">Sessions</h2>
        {completed > 0 && (
          <button
            type="button"
            className="button button--ghost"
            onClick={onClearCompleted}
          >
            Clear {completed} completed
          </button>
        )}
      </div>
      <ul className="session-list">
        {sessions.map((session) => (
          <SessionItem
            key={session.id}
            session={session}
            onToggle={onToggle}
            onRemove={onRemove}
          />
        ))}
      </ul>
    </section>
  );
}
