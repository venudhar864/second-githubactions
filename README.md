# Cadence — React sample project

A small, complete React app you can use as a starting point: Vite for the build,
Vitest + Testing Library for tests, ESLint and Prettier for the toolchain.

**No CI workflows are included** — `.github/` is intentionally absent so you can wire
up GitHub Actions yourself. See [Hooking up CI](#hooking-up-ci) for the script names
you'll want to call.

## Requirements

- Node.js 20 or newer (`.nvmrc` is set to 20)
- npm 10+

## Getting started

```bash
npm install
npm run dev
```

The dev server starts on http://localhost:5173.

## Scripts

| Script                  | What it does                                        |
| ----------------------- | --------------------------------------------------- |
| `npm run dev`           | Start the dev server with hot reload                |
| `npm run build`         | Production build into `dist/`                       |
| `npm run preview`       | Serve the built output locally                      |
| `npm run lint`          | ESLint over the whole project                       |
| `npm run lint:fix`      | ESLint with autofix                                 |
| `npm run format`        | Rewrite files with Prettier                         |
| `npm run format:check`  | Fail if anything is unformatted (use this in CI)    |
| `npm test`              | Run the test suite once                             |
| `npm run test:watch`    | Run tests in watch mode                             |
| `npm run test:coverage` | Run tests and emit `text` + `lcov` coverage reports |
| `npm run ci`            | lint → format check → test → build, in one command  |

## Project structure

```
react-sample-app/
├── index.html              # Vite entry HTML
├── vite.config.js          # Build + Vitest config (they share one file)
├── eslint.config.js        # ESLint flat config
├── .env.example            # Copy to .env.local
├── public/
│   └── favicon.svg
└── src/
    ├── main.jsx            # React root
    ├── App.jsx             # Composition only — no logic lives here
    ├── App.test.jsx        # Component tests
    ├── components/         # Presentational components
    │   ├── SiteHeader.jsx
    │   ├── SessionForm.jsx
    │   ├── SessionList.jsx
    │   ├── SessionItem.jsx
    │   └── StatsPanel.jsx
    ├── hooks/
    │   └── useSessions.js  # All state, via useReducer
    ├── lib/
    │   ├── sessions.js     # Pure helpers (validation, stats, formatting)
    │   ├── sessions.test.js
    │   └── storage.js      # localStorage wrapper that never throws
    ├── styles/
    │   └── index.css       # Design tokens + component styles
    └── test/
        └── setup.js        # Testing Library setup, runs before each suite
```

The shape worth copying: **pure functions in `lib/`, state in `hooks/`, and dumb
components in `components/`.** Business logic tested without rendering anything is
fast and stays useful when the UI changes.

## Environment variables

Copy `.env.example` to `.env.local`. Only variables prefixed with `VITE_` are exposed
to client code, reachable as `import.meta.env.VITE_API_BASE_URL`. Never put a secret in
one — everything in the bundle is public.

## Hooking up CI

Your workflow will want roughly this sequence. All of it is already wired as scripts:

```bash
npm ci                    # clean, lockfile-exact install
npm run lint
npm run format:check
npm run test:coverage
npm run build
```

Two things worth knowing when you write the workflow:

- **`npm ci` needs a lockfile.** Run `npm install` once locally and commit
  `package-lock.json` before your first CI run, or the step will fail.
- **Deploying to a subpath** (GitHub Pages project sites serve from
  `/<repo-name>/`) breaks asset URLs on a default build. `vite.config.js` reads a
  `BASE_PATH` env var for exactly this, so build with
  `BASE_PATH=/<repo-name>/ npm run build` and no config edit is needed.

The build output is a static `dist/` folder — it deploys anywhere that serves files.

## Adding a route

Routing is deliberately left out to keep the sample small. When you need it:

```bash
npm install react-router-dom
```

Then wrap `<App />` in a router inside `src/main.jsx`. If you deploy to a static host,
either use `HashRouter` or configure the host to rewrite unknown paths to
`index.html`, otherwise a hard refresh on a nested route returns a 404.

## License

MIT — use it however you like.
