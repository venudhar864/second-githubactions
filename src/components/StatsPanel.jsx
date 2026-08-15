import { formatDuration } from '../lib/sessions.js';

export default function StatsPanel({ stats }) {
  const max = Math.max(1, ...stats.byTag.map((entry) => entry.minutes));

  return (
    <section className="panel stats">
      <h2 className="panel__title">This stretch</h2>

      <dl className="stats__grid">
        <div>
          <dt>Completed</dt>
          <dd>{stats.completed}</dd>
        </div>
        <div>
          <dt>Planned</dt>
          <dd>{stats.planned}</dd>
        </div>
        <div>
          <dt>Longest</dt>
          <dd>{formatDuration(stats.longest)}</dd>
        </div>
      </dl>

      {stats.byTag.length > 0 && (
        <div className="bars">
          {stats.byTag.map(({ tag, minutes }) => (
            <div className="bars__row" key={tag}>
              <span className="bars__label">{tag}</span>
              <span className="bars__track">
                <span
                  className="bars__fill"
                  style={{ inlineSize: `${(minutes / max) * 100}%` }}
                />
              </span>
              <span className="bars__value">{formatDuration(minutes)}</span>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
