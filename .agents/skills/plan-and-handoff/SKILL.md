---
name: plan-and-handoff
description: Maintain `.agents/plan/` files for projects that need synchronized human and agent planning, plus compact handoff state. Use when the user asks to plan work, persist project rules, update agent-facing knowledge, or prepare a handoff between sessions.
---

# plan-and-handoff

Use this skill for projects that keep shared knowledge in `.agents/plan/`.

## Modes

The mode is supplied by the request context.

- `Planning`: maintain the plan files.
- `Handoff`: prepare a compact transition file for the next agent/session.

## Planning

Maintain these files together:

- `.agents/plan/PLAN_HUMAN.md`
- `.agents/plan/PLAN_AGENTS.md`

Rules:

- Keep `PLAN_HUMAN.md` readable, checklist-driven, and ordered by execution.
- Keep `PLAN_AGENTS.md` dense, compact, and optimized for agents.
- Update incrementally; do not overwrite useful existing content.
- Persist every new user rule in `PLAN_AGENTS.md`.
- Only reflect a rule in `PLAN_HUMAN.md` if it changes the human plan.
- Keep agent-only workflow notes out of `PLAN_HUMAN.md`.
- Use the repository’s current architecture and constraints as the plan source of truth.

Suggested `PLAN_AGENTS.md` sections:

- Project Summary
- Constraints
- Main Steps
- Rules for Agents
- Working Style

## Handoff

Write `.agents/plan/HANDOFF.md` as a compact agent-resume file.

Include only:

- last completed task
- current task / next step
- recent relevant changes
- blockers or risks
- files most likely needed next

Rules:

- Keep it short and machine-friendly.
- Prefer bullets over prose.
- Capture only what another agent needs to resume immediately.
- Update `PLAN_AGENTS.md` first if new user rules appeared during the work.

## Operating Rules

- Treat user-defined rules as persistent unless the user reverses them.
- Keep planning artifacts synchronized with the conversation.
- Prefer deterministic, low-token outputs.
- Do not add explanatory noise to the plan files.
