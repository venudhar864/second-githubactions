import SiteHeader from './components/SiteHeader.jsx';
import SessionForm from './components/SessionForm.jsx';
import SessionList from './components/SessionList.jsx';
import StatsPanel from './components/StatsPanel.jsx';
import { useSessions } from './hooks/useSessions.js';

export default function App() {
  const { sessions, stats, add, toggle, remove, clearCompleted } = useSessions();

  return (
    <div className="shell">
      <SiteHeader totalMinutes={stats.totalMinutes} />

      <main className="layout">
        <div className="layout__side">
          <SessionForm onAdd={add} />
          <StatsPanel stats={stats} />
        </div>

        <div className="layout__main">
          <SessionList
            sessions={sessions}
            onToggle={toggle}
            onRemove={remove}
            onClearCompleted={clearCompleted}
          />
        </div>
      </main>

      <footer className="footer">
        <p>Sample React app — Vite, Vitest, ESLint. Wire up your own CI.</p>
      </footer>
    </div>
  );
}
