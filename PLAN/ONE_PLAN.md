# ONE_PLAN — One Hub (File‑Based, PrimeVue)

## Table of Contents
- [Project Summary](#project-summary)
- [Detailed Steps](#detailed-steps)
  - [Step 1 — Frontend Stack](#step-1--frontend-stack)
  - [Step 2 — Backend Stack (File‑Based)](#step-2--backend-stack-file-based)
  - [Step 3 — Central Config (Runtime JSON)](#step-3--central-config-runtime-json)
  - [Step 4 — Module Contract (Frontend)](#step-4--module-contract-frontend)
  - [Step 5 — Module Contract (Backend, File Storage)](#step-5--module-contract-backend-file-storage)
  - [Step 6 — Power Bar](#step-6--power-bar)
  - [Step 7 — Server‑to‑Client Stream (SSE)](#step-7--server-to-client-stream-sse)
  - [Step 8 — Git Sync Policy](#step-8--git-sync-policy)
  - [Step 9 — Tests](#step-9--tests)
- [Modules](#modules)
  - [Habits](#habits)
  - [Notes](#notes)
  - [Workouts](#workouts)
  - [Bookmarks (Spaces)](#bookmarks-spaces)
  - [Finance](#finance)
  - [Monitoring](#monitoring)

## Project Summary
A self‑hosted, modular personal hub built with Vue 3 + Vite + PrimeVue. Data is stored as plain files (JSON/NDJSON/Markdown) for portability and Git‑sync backups. Modules are in‑repo and self‑contained, each exposing routes, widgets, and commands. The server reads/writes files and streams updates to clients via SSE.

---

## Detailed Steps

## Step 1 — Frontend Stack
- [X] Choose frontend app location (recommended `apps/one/` or `one/`)
- [X] Create Vue 3 + Vite + TypeScript app
- [X] Enable TS strict mode and set alias `@/` -> `src/`
- [X] Install core libs: `vue-router`, `pinia`
- [ ] Install PrimeVue + theme + icons
- [ ] Create base App Shell layout (top bar, main content, optional side rail)
- [ ] Add `DashboardView` route as landing page
- [ ] Implement module registry (`src/modules/registry.ts`)
- [ ] Implement router aggregation to load module routes
- [ ] Add module contract types (`ModuleDef`, `ModuleRoute`, `ModuleWidget`, `ModuleCommand`)
- [ ] Add power bar skeleton UI with placeholder commands
- [ ] Add config store/composable, fetch `/api/config` on app start (stub)
- [ ] Verify module routes render and navigation works

## Step 2 — Backend Stack (File‑Based)
- [ ] Choose backend location (recommended `apps/api/` or `api/`)
- [ ] Initialize Node + TypeScript project
- [ ] Install Fastify and core plugins
- [ ] Create `data/` folder structure for file storage
- [ ] Implement file IO helpers (read/write JSON, NDJSON, Markdown)
- [ ] Create health route (`GET /api/health`)
- [ ] Create config route (`GET /api/config`) that reads `one.config.json`
- [ ] Add file watcher to reload config into memory on change
- [ ] Add minimal auth session (single user, cookie‑based)
- [ ] Add CORS + request logging
- [ ] Add basic error handler
- [ ] Verify API server runs and `/api/config` returns JSON

## Step 3 — Central Config (Runtime JSON)
- [ ] Decide config path (recommended `one.config.json` at repo root or `config/one.config.json`)
- [ ] Define initial JSON schema for core config
- [ ] Include `commands` with `shortcut` + `ref` and `%s` templating
- [ ] Include `modules` list with `id` + `enabled` + per‑module settings
- [ ] Add `core` section for global behaviors (power bar, dashboard defaults)
- [ ] Implement backend config loader (read + validate + in‑memory cache)
- [ ] Add backend file watcher to hot‑reload config on changes
- [ ] Implement `/api/config` to return the cached config
- [ ] Implement frontend config store and fetch on app boot
- [ ] Add “reload config” trigger in UI (dev‑only for now)

## Step 4 — Module Contract (Frontend)
- [ ] Define `ModuleDef` TypeScript interface in `src/modules/types.ts`
- [ ] Create `defineModule()` helper to enforce contract typing
- [ ] Standardize module exports in `src/modules/<moduleId>/module.ts`
- [ ] Include module metadata (`id`, `name`, `icon`)
- [ ] Include `routes` (Vue Router records)
- [ ] Include optional `widgets` for dashboard cards
- [ ] Include optional `commands` for power bar
- [ ] Include optional `settingsSchema` + `defaults`
- [ ] Implement module registry loader (static import for in‑repo modules)
- [ ] Merge module routes into app router at startup
- [ ] Merge module commands into power bar store
- [ ] Render module widgets on dashboard if enabled

## Step 5 — Module Contract (Backend, File Storage)
- [ ] Define backend module interface (`id`, `routes`, `filePaths`, `ioHandlers`)
- [ ] Create `registerModule(app, moduleDef)` helper
- [ ] Load enabled modules from config at startup
- [ ] Register each module’s API routes on the Fastify instance
- [ ] Define file read/write utilities per module format
- [ ] Expose module list in `/api/config` (for UI checks)

## Step 6 — Power Bar
- [ ] Define `Command` model (`label`, `shortcut`, `ref`, `type`)
- [ ] Implement parser for `:shortcut` + `%s` templating
- [ ] Merge command sources in priority order:
  - [ ] Core config commands
  - [ ] Module commands
- [ ] Implement fuzzy search for command list
- [ ] Implement `Enter` handling:
  - [ ] If `ref` is URL, open in new tab with `%s` replaced
  - [ ] If `ref` is internal route, navigate in app
- [ ] Add command groups (e.g., Search, Modules, Utilities)
- [ ] Add UI feedback for unknown shortcut

## Step 7 — Server‑to‑Client Stream (SSE)
- [ ] Add `/api/stream` SSE endpoint
- [ ] Emit `data-change` events on file write:
  - [ ] Include `module` + affected `paths`
- [ ] Client subscribes on app boot
- [ ] On event, invalidate module cache and refetch

## Step 8 — Git Sync Policy
- [ ] Initialize Git repo inside `data/`
- [ ] Queue file changes for batch commit (e.g., every 30s or 10 changes)
- [ ] Commit message format: `data: update <module>`
- [ ] Auto‑push every N minutes or on idle
- [ ] Auto‑pull on startup + scheduled interval
- [ ] Conflict handling:
  - [ ] Save `*.local` and `*.remote` copies
  - [ ] Emit UI notice for manual resolution

## Step 9 — Tests
- [ ] Unit test: config loader (valid/invalid JSON, defaults)
- [ ] Unit test: module registry (enabled/disabled modules)
- [ ] Unit test: router aggregation (routes correctly registered)
- [ ] Unit test: command parser (`:shortcut`, `%s` replacement)
- [ ] API smoke test: `/api/health`
- [ ] API smoke test: `/api/config` returns merged config
- [ ] UI smoke test: app boot + power bar open
- [ ] UI smoke test: module route navigation
- [ ] SSE test: client receives `data-change` events

---

## Modules

## Habits
- [ ] Data files:
  - [ ] `data/habits/habits.json`
  - [ ] `data/habits/logs/YYYY-MM-DD.json`
- [ ] API:
  - [ ] CRUD habits
  - [ ] Daily logs (create/update by date)
  - [ ] Stats endpoint (streak, daily note)
- [ ] UI:
  - [ ] `/habits` + `/habits/:id`
  - [ ] GitHub‑style grid with hover details
- [ ] Computations:
  - [ ] Longest streak (global + per habit)
  - [ ] Daily note = done / total
- [ ] Tests:
  - [ ] CRUD + stats + UI grid hover

## Notes
- [ ] Data files:
  - [ ] `data/notes/<date>-<slug>.md`
- [ ] API:
  - [ ] CRUD notes
  - [ ] Slug generation
- [ ] UI:
  - [ ] Markdown editor + preview
  - [ ] `/notes`, `/notes/:id`
- [ ] Tests:
  - [ ] CRUD + preview rendering

## Workouts
- [ ] Data files:
  - [ ] `data/workouts/workouts/YYYY-MM-DD.json`
  - [ ] `data/workouts/templates.json`
  - [ ] `data/workouts/exercises.json`
- [ ] Features:
  - [ ] Templates
  - [ ] Autocomplete exercises
  - [ ] Prefill last sets
  - [ ] Weekly streak
  - [ ] Total weight moved
- [ ] UI:
  - [ ] `/workouts`, `/workouts/:id`, `/workouts/templates`
- [ ] Tests:
  - [ ] CRUD + stats + autocomplete

## Bookmarks (Spaces)
- [ ] Data files:
  - [ ] `data/bookmarks/spaces.json`
  - [ ] `data/bookmarks/icons/<hash>.png`
- [ ] Features:
  - [ ] Categories + groups
  - [ ] Auto‑fetch icon by URL
  - [ ] Offline icon cache in IndexedDB
- [ ] UI:
  - [ ] `/spaces`
- [ ] Tests:
  - [ ] CRUD + icon resolve + cache

## Finance
- [ ] Data files:
  - [ ] `data/finance/transactions.ndjson`
  - [ ] `data/finance/index.json` (banks/categories)
- [ ] Features:
  - [ ] Filter by bank/category/date
  - [ ] Fuel parsing from note (e.g., `Yaris - 33.5L`)
  - [ ] Fuel price computation
- [ ] UI:
  - [ ] `/finance`
- [ ] Tests:
  - [ ] CRUD + filters + fuel calc

## Monitoring
- [ ] Data files:
  - [ ] `data/monitoring/monitors.json`
  - [ ] `data/monitoring/checks.ndjson`
  - [ ] `data/monitoring/logs.ndjson`
- [ ] Features:
  - [ ] HTTP/TCP/self checks
  - [ ] Uptime %
  - [ ] Lightweight log ingestion
- [ ] UI:
  - [ ] `/monitoring`, `/monitoring/:id`, `/logs`
- [ ] Tests:
  - [ ] checks + uptime + logs
