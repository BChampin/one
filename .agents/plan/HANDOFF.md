# HANDOFF

## Last Completed

- Added `human-ai` skill under `.agents/skills/human-ai/`
- Added `agents/openai.yaml` for skill discovery
- Persisted the new rule: user-defined rules must be recorded in `PLAN_AGENTS.md`
- Cleaned `PLAN_HUMAN.md` to keep agent-only workflow notes out
- Switched bookmark link icons to `https://favicon.im/{domain}`

## Current State

- Skill/mode workflow is now defined:
  - `Planning` updates `.agents/plan/PLAN_HUMAN.md` + `.agents/plan/PLAN_AGENTS.md`
  - `Handoff` writes `.agents/plan/HANDOFF.md`
- Bookmarks module is file-backed from `public/oneData/bookmarks/bookmarks.md`
- Bookmarks UI already parses spaces/categories/links and displays tabs/cards/buttons

## Next Step

- If resuming feature work: add a local icon cache layer for bookmarks
- Likely direction:
  - browser-side cache for fetched favicon blobs
  - manifest/metadata for stale checks
  - keep `favicon.im` as fetch source

## Key Files

- `.agents/plan/PLAN_AGENTS.md`
- `.agents/plan/PLAN_HUMAN.md`
- `.agents/skills/human-ai/SKILL.md`
- `.agents/skills/human-ai/agents/openai.yaml`
- `apps/one/src/modules/bookmarks/components/BookmarkLinkButton.vue`
- `apps/one/src/modules/bookmarks/index.ts`
- `apps/one/src/modules/bookmarks/utils.ts`
