# Getting started — first run + orientation

**Mode:** setup (no code changes)
**Goal:** get the app running locally and understand what's here, before doing any task.
**Why:** a fresh clone has **no `.env.local`** (it's gitignored), so the app won't start until you create one. This brief removes that first-run cliff.

## Do (in order)

1. `cp .env.example .env.local` — your local settings. Defaults work as-is (local SQLite + a dev auth secret). Generate a real `BETTER_AUTH_SECRET` (`openssl rand -base64 32`) only when you deploy.
2. `pnpm install`
3. `pnpm db:push` — creates `./local.db` from `db/schema.ts`.
4. `pnpm dev` → open http://localhost:3000, sign up, add an item.

## Verify (the two checks)

- **Persistence:** add an item, **hard-refresh** — still there (it wrote to the database).
- **Per-user isolation:** sign in as a second person in an incognito window — each sees only their own items.

## Orient (read these, in this order)

- `README.md` — what this is + quick start.
- `docs/PROJECT-RULES.md` — the code values every change must hold to.
- `docs/CURRENT-STATUS.md` — where things stand + what's next.
- `.claude/CLAUDE.md` — the workflow cycle and the pinned tech stack (don't revert newer libs from memory).
- `PROMPT.md` — the plain-language spec that built this (the "conversation → PRD" artifact).

## Then pick a task

Three teaching briefs are ready — drop one into a fresh session with `@handoff/<file>.md`:
- `handoff/add-a-field.md` — add a "tag" field (schema → form → list).
- `handoff/per-user-visibility.md` — enforce + test per-user scoping (two-browser test).
- `handoff/second-entity.md` — add a `projects` table; items belong to a project.

## Done when

The app runs at http://localhost:3000, both checks pass, and you know where the rules + status live.

## Lane

n/a — no code changes.
