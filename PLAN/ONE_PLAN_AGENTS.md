# PLAN_AGENTS_V2 — One Hub (Agent Summary)

## Project Summary
One Hub is a self‑hosted, modular personal dashboard built with Vue 3 + Vite + PrimeVue. It uses **file‑based storage** (JSON/NDJSON/Markdown) for portability and Git backups. The backend (Node + Fastify) reads/writes files and streams changes to clients via **SSE**.

## Key Decisions
- File storage is the source of truth (no SQLite).
- Data is stored under `data/` with mixed formats by module.
- Git auto‑sync runs on batched file changes.
- Module system is in‑repo; modules export routes/widgets/commands.
- PrimeVue is the chosen UI component library.
- SSE is used to push updates to clients.

## Global Steps (High Level)
1. Frontend setup (Vue 3 + PrimeVue)
2. Backend setup (Fastify + file IO)
3. Central config (`one.config.json`)
4. Module contracts (front + back)
5. Power bar
6. SSE streaming
7. Git sync policy
8. Tests

## Modules (Summary)
- **Habits**: habits.json + daily logs; streaks + heatmap.
- **Notes**: markdown files; editor + preview.
- **Workouts**: per‑workout JSON + templates + exercises.
- **Bookmarks**: spaces.json + icon cache.
- **Finance**: transactions.ndjson + fuel parsing.
- **Monitoring**: monitors.json + checks/logs NDJSON.

## Open Choices
- Final styling choices within PrimeVue theme.
- Exact streak definitions for habits/workouts.
- Docker monitor support depends on socket access.
