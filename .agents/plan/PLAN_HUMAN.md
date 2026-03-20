# ONE_PLAN — One Hub (Client-Only, File-Based)

## Table of Contents

- [Project Summary](#project-summary)
- [Detailed Steps](#detailed-steps)
  - [Step 1 — Frontend Stack](#step-1--frontend-stack)
  - [Step 2 — File Storage Layer](#step-2--file-storage-layer)
  - [Step 3 — Central Config (Runtime JSON)](#step-3--central-config-runtime-json)
  - [Step 4 — Module Contract (Frontend)](#step-4--module-contract-frontend)
  - [Step 5 — Module Loading and Registry](#step-5--module-loading-and-registry)
  - [Step 6 — App Shell, Navigation, and Shortcuts](#step-6--app-shell-navigation-and-shortcuts)
  - [Step 7 — Git Sync Policy](#step-7--git-sync-policy)
  - [Step 8 — Tests](#step-8--tests)
- [Modules](#modules)
  - [Bookmarks](#bookmarks)
  - [Notes](#notes)
  - [Workouts](#workouts)
  - [Habits](#habits)
  - [Finance](#finance)
  - [Monitoring](#monitoring)
- [Working Rules](#working-rules)

## Project Summary

One Hub is a client-only, modular personal hub built with Vue 3 + Vite + Vue Router. There is no backend anymore. All data lives in local files, primarily Markdown and JSON, with optional GitHub integration used only for backup and sync.

The app revolves around a central `One` context that loads the runtime config, initializes active modules, registers their routes, and exposes shared services to the UI. Modules remain frontend-first and file-backed.

---

## Detailed Steps

## Step 1 — Frontend Stack

- [x] Choose frontend app location (`apps/one/`)
- [x] Create Vue 3 + Vite + TypeScript app
- [x] Enable TS strict mode and set alias `@/` -> `src/`
- [x] Install core libs: `vue-router`
- [x] Install PrimeVue + theme + icons
- [x] Set up the root `App.vue` shell
- [x] Add `IndexPage` route as landing page
- [x] Add a typed `One` provide/inject context
- [x] Add a typed `useOne()` consumer helper
- [X] Verify app boot still works after each core shell change

## Step 2 — File Storage Layer

- [ ] Define the file-first storage model
- [ ] Decide the canonical runtime file locations
- [ ] Keep Markdown and JSON as the primary formats
- [ ] Keep storage concerns separated from UI concerns
- [ ] Add helpers for reading/writing structured files
- [ ] Add helpers for list-based content files when needed
- [ ] Add helpers for one-file-per-entity structures when needed
- [ ] Treat local files as the source of truth
- [ ] Never require a backend to read or write app data
- [ ] Keep storage formats human-readable and git-friendly

## Step 3 — Central Config (Runtime JSON)

- [ ] Decide the config path for the One runtime file
- [ ] Define the config schema
- [ ] Include the active `modules` list as string slugs
- [ ] Include app-level settings and shared core options
- [ ] Load config early during app bootstrap
- [ ] Expose config through the `One` context
- [ ] Keep config editable as plain JSON
- [ ] Avoid hard-coding module availability in the shell
- [ ] Make config updates observable by the app shell

## Step 4 — Module Contract (Frontend)

- [x] Define `OneModule` TypeScript interface
- [x] Create a module route type with `label`, `shortcut`, and `main`
- [x] Add `init(one)` hook for first use only
- [x] Add `load(one)` hook for data loading/sync
- [x] Allow modules to expose Vue Router-compatible routes
- [x] Allow modules to expose `main` routes for the app shell
- [x] Allow modules to expose reusable components
- [x] Allow modules to expose routed views
- [x] Allow modules to define internal types
- [x] Allow modules to define a central data filename when needed
- [ ] Add more module helpers only when a real module needs them

## Step 5 — Module Loading and Registry

- [x] Load modules lazily from `src/modules/*`
- [x] Load only module slugs listed in config
- [x] Initialize each active module once
- [x] Load module data after init
- [x] Register module routes into Vue Router
- [x] Keep track of loaded modules in `One`
- [x] Keep track of loaded routes in `One`
- [ ] Add a stable module registry if the module count grows too large
- [ ] Add module lookup helpers only if they reduce duplication
- [ ] Keep module discovery frontend-only

## Step 6 — App Shell, Navigation, and Shortcuts

- [x] Build a responsive shell in `App.vue`
- [x] Show the app title in the shell
- [x] Show loaded main routes in navigation
- [x] Use explicit `RouterLink` items for navigation
- [x] Keep active-route styling on the links
- [x] Add a desktop sidebar
- [x] Add a mobile drawer overlay
- [x] Make the drawer close on route click
- [x] Hide route keybinds on mobile
- [x] Add a reusable `Kbd` component for keycap display
- [x] Add a reusable `useKb` composable for hotkeys
- [x] Bind route shortcuts from modules
- [x] Bind `Ctrl+K` to the PowerBar focus toggle
- [ ] Keep app-wide shortcuts centralized when possible
- [ ] Reuse the existing CSS system for layout and spacing
- [ ] Avoid custom style blocks unless absolutely necessary

## Step 7 — Git Sync Policy

- [ ] Keep GitHub integration optional
- [ ] Use git only as a backup/sync layer for files
- [ ] Preserve local file storage as the canonical state
- [ ] Make sync opt-in and transparent to the user
- [ ] Keep sync logic separate from module logic
- [ ] Decide which files are included in backups
- [ ] Decide how conflicts are reported and resolved
- [ ] Avoid any assumption that sync is always available

## Step 8 — Tests

- [ ] Unit test config loading
- [ ] Unit test module loading from config slugs
- [ ] Unit test route registration from modules
- [ ] Unit test shortcut binding helper
- [ ] Unit test the `One` context contract
- [ ] UI smoke test app boot and shell rendering
- [ ] UI smoke test module navigation
- [ ] UI smoke test PowerBar focus toggle
- [ ] Avoid backend tests because there is no backend layer

---

## Modules

## Bookmarks

- [x] Define module scaffold in `src/modules/bookmarks/`
- [x] Export module metadata (`label`, `slug`, `description`)
- [x] Export module routes
- [x] Mark the main bookmarks route with `main: true`
- [x] Add a route shortcut for the main bookmarks view
- [x] Add a routed view component
- [x] Add reusable module components when needed
- [ ] Define the file format for bookmark storage
- [ ] Decide whether bookmarks are one file or multiple files
- [ ] Decide whether icons or metadata are stored separately
- [ ] Add list/search UI for saved links
- [ ] Add create/edit/delete flows for bookmarks
- [ ] Add any module-specific commands later if needed
- [ ] Data files:
  - [ ] `data/bookmarks/bookmarks.json`
  - [ ] `data/bookmarks/icons/<hash>.png`
- [ ] Features:
  - [ ] Categories + groups
  - [ ] Auto‑fetch icon by URL
  - [ ] Offline icon cache in IndexedDB
- [ ] UI:
  - [ ] `/bookmarks`

## Notes

- [ ] Define module scaffold in `src/modules/notes/`
- [ ] Export module metadata (`label`, `slug`, `description`)
- [ ] Export module routes
- [ ] Mark the main notes route with `main: true`
- [ ] Add a route shortcut for the main notes view
- [ ] Add a routed view component
- [ ] Add reusable note editor/view components
- [ ] Decide the notes file naming scheme
- [ ] Decide whether notes are stored as individual Markdown files or indexed collections
- [ ] Add list/search/filter UI
- [ ] Add note creation, editing, and deletion flows
- [ ] Add preview/rendering behavior for Markdown notes
- [ ] Data files:
  - [ ] `data/notes/<date>-<slug>.md`
- [ ] API:
  - [ ] CRUD notes
  - [ ] Slug generation
- [ ] UI:
  - [ ] Markdown editor + preview
  - [ ] `/notes`, `/notes/:id`

## Workouts

- [ ] Define module scaffold in `src/modules/workouts/`
- [ ] Export module metadata (`label`, `slug`, `description`)
- [ ] Export module routes
- [ ] Mark the main workouts route with `main: true`
- [ ] Add a route shortcut for the main workouts view
- [ ] Add routed views for list, detail, and templates
- [ ] Add reusable workout components
- [ ] Define the workouts file structure
- [ ] Decide how templates, sessions, and exercises are stored
- [ ] Add session creation and editing flows
- [ ] Add history and summary views
- [ ] Add progress/stat calculation helpers
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

## Habits

- [ ] Define module scaffold in `src/modules/habits/`
- [ ] Export module metadata (`label`, `slug`, `description`)
- [ ] Export module routes
- [ ] Mark the main habits route with `main: true`
- [ ] Add a route shortcut for the main habits view
- [ ] Add a routed view component
- [ ] Add reusable habit tracking components
- [ ] Define the habits file structure
- [ ] Decide how daily logs and habit definitions are stored
- [ ] Add habit CRUD flows
- [ ] Add daily completion tracking
- [ ] Add streak and overview calculations
- [ ] Add dashboard-friendly summaries
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

## Finance

- [ ] Define module scaffold in `src/modules/finance/`
- [ ] Export module metadata (`label`, `slug`, `description`)
- [ ] Export module routes
- [ ] Mark the main finance route with `main: true`
- [ ] Add a route shortcut for the main finance view
- [ ] Add routed view components
- [ ] Define the finance file structure
- [ ] Decide how transactions, categories, and accounts are stored
- [ ] Add list/filter/search UI
- [ ] Add import flows if needed
- [ ] Add summary calculations
- [ ] Add any helper transforms for file-based data
- [ ] Data files:
  - [ ] `data/finance/transactions.ndjson`
  - [ ] `data/finance/index.json` (banks/categories)
- [ ] Features:
  - [ ] Filter by bank/category/date
  - [ ] Fuel parsing from note (e.g., `Yaris - 33.5L`)
  - [ ] Fuel price computation
- [ ] UI:
  - [ ] `/finance`

## Monitoring

- [ ] Define module scaffold in `src/modules/monitoring/`
- [ ] Export module metadata (`label`, `slug`, `description`)
- [ ] Export module routes
- [ ] Mark the main monitoring route with `main: true`
- [ ] Add a route shortcut for the main monitoring view
- [ ] Add routed view components
- [ ] Define the monitoring file structure
- [ ] Decide whether checks are local-only or can point to remote targets
- [ ] Add overview and detail screens
- [ ] Add status history views
- [ ] Add log/file-backed event display
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

---

## Working Rules

- Keep the app client-only.
- Never reintroduce backend assumptions unless the architecture explicitly changes.
- Keep file storage the source of truth.
- Respect the existing CSS system in `src/assets/css/`.
- Reuse utility classes first.
- Avoid custom style blocks whenever possible.
- If shared CSS must be added, put it only in `system.css` under the `/* custom */` section.
- Use `RouterLink` for explicit links.
- Use `useKb` for shortcut registration and cleanup.
- Use `Kbd` for keybind display.
- Prefer lazy module loading driven by config.
- Keep module routes and navigation derived from loaded module metadata.
