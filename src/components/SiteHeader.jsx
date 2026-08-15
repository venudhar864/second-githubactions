import { formatDuration } from '../lib/sessions.js';

export default function SiteHeader({ totalMinutes }) {
  return (
    <header className="masthead">
      <div className="masthead__mark" aria-hidden="true">
        <span />
        <span />
        <span />
      </div>
      <div>
        <h1 className="masthead__title">Cadence</h1>
        <p className="masthead__tagline">Focus sessions, tracked.</p>
      </div>
      <p className="masthead__total">
        <span className="masthead__total-value">{formatDuration(totalMinutes)}</span>
        <span className="masthead__total-label">focused so far</span>
      </p>
    </header>
  );
}
