# PLAN_AGENTS_V3 — One Hub (Agent Summary)

## Project Summary

One Hub is a client-only, modular personal dashboard built with Vue 3 + Vite. It uses file-based storage as the source of truth, with Markdown and JSON as the primary formats. GitHub integration is optional and exists only to back up or sync those files to git.

There is no backend service, no API server, and no SSE layer in the current architecture.

## Key Decisions

- Client-only app: all user-facing logic runs in the browser.
- File storage is the source of truth.
- Data is stored in plain text files for portability and inspectability.
- GitHub sync is optional and must never be required for normal use.
- Modules are frontend-driven and loaded from the One config.
- Module routes are registered in Vue Router and can expose shortcuts.
- The app shell and navigation are built from loaded module metadata.
- The existing CSS system is the design system and must be respected.
- Prefer explicit `RouterLink` navigation and reusable keyboard bindings.
- `.agents/plan/` is the persistent planning workspace for humans and agents.
- Keep `PLAN_HUMAN.md` and `PLAN_AGENTS.md` synchronized.
- When the user introduces a new rule, record it here immediately.
- In Handoff mode, write a compact `.agents/plan/HANDOFF.md` with recent work and current state.

## Rules for Agents

- Do not assume any backend exists.
- Do not add server-side APIs, SSE streams, or database layers.
- Do not introduce state stores that replace the file-based model without explicit approval.
- Do not edit the shared CSS system casually.
- Reuse the utility classes and spacing system already present in the repo.
- Avoid custom component style blocks unless absolutely necessary.
- If a shared CSS helper is needed, prefer the `/* custom */` section of `system.css`.
- Use the `useKb` composable for keyboard handling.
- Use the shared `Kbd` component to show shortcuts.
- Use `RouterLink` for navigation items that should remain link-like.
- Keep module loading lazy and config-driven.
- Treat config and module data files as the main integration boundary.
- When the user introduces a new rule, record it in this file so the instruction stays recoverable later.

## Global Steps (High Level)

1. Frontend shell and routing
2. File storage and config loading
3. Module contract and registry
4. Lazy module loading
5. Navigation shell and main routes
6. Keyboard shortcut helpers
7. Optional GitHub sync/backups
8. Tests for core flows

## Modules (Summary)

- **Habits**: habits.json + daily logs; streaks + heatmap.
- **Notes**: markdown files; editor + preview.
- **Workouts**: per‑workout JSON + templates + exercises.
- **Bookmarks**: spaces.json + icon cache.
- **Finance**: transactions.ndjson + fuel parsing.
- **Monitoring**: monitors.json + checks/logs NDJSON.

## Module Expectations

- Each module must define a stable `label`, `slug`, and `description`.
- Each module must expose `init(one)` and `load(one)` hooks.
- Modules may expose Vue Router routes.
- Modules may expose a `main` route for top-level navigation.
- Modules may expose route shortcuts.
- Modules may expose components and views without global registration.
- Modules may define their own data types and a central data file name when needed.

## Working Style

- Prefer small, focused edits.
- Keep layout and visual changes aligned with the existing CSS system.
- When changing navigation, preserve explicit link semantics.
- When adding shortcuts, prefer a reusable composable over per-component ad hoc listeners.
- When adding module features, keep them file-first and client-side.
- When updating plans, keep outputs compact, factual, and immediately reusable by another session.

## Open Choices

- Exact file naming conventions for each module can still evolve.
- GitHub sync UX and conflict handling should be decided when the sync layer is implemented.
- The final set of core modules can grow over time.
