# wr201-demo — Current Status

**Last Updated:** 2026-07-23
**Last Commit:** `(uncommitted)` (initial scaffold + demo app + workflow starter)
**Branch:** main
**Launch:** pre-launch

---

## 👋 First time here? (read this first)

Fresh clone or new machine? Get it running before touching anything:

1. `cp .env.example .env.local` — creates your local settings (SQLite + a dev auth secret; works as-is).
2. `pnpm install`
3. `pnpm db:push` — creates the local SQLite database (`./local.db`).
4. `pnpm dev` → http://localhost:3000

Then confirm it's real: add an item and **hard-refresh** (it persists), and sign in as a second user in an incognito window (separate data). Full walkthrough: **`handoff/getting-started.md`**. Deploy: **`SETUP.md`**.

---

## What Was Last Done

- Scaffolded Next.js 16 (App Router, TypeScript, Tailwind 4).
- Added Drizzle ORM with local SQLite (`@libsql/client`), schema in one file `db/schema.ts`.
- Wired BetterAuth email+password (`lib/auth.ts`, route handler at `app/api/auth/[...all]`).
- Built the items app: sign up / sign in / sign out, a title+body form, and a per-user list (each row has a `userId` FK — you only see your own).
- Verified end to end: `pnpm install`, `pnpm db:push`, `pnpm build` all green; real signup writes to SQLite; item write + re-read persists.
- Seeded the agent workflow layer: `.claude/skills/` (init, wrap, update, check, dev, project-status, sync-skills), `templates/`, this docs set, and three paste-ready briefs in `handoff/`.

---

## What's In Progress

- Nothing in flight. Clean, bootable baseline.

---

## What's Next

<!-- These three are teaching briefs — paste one into a fresh session with @handoff/<file>.md -->
- add-a-field [Mode: build] → handoff/add-a-field.md — add a "tag" field to items (schema → form → list).
- per-user-visibility [Mode: build] → handoff/per-user-visibility.md — enforce + test per-user scoping (two-browser test).
- second-entity [Mode: build] → handoff/second-entity.md — add a `projects` table; items belong to a project.

---

## Known Issues / Blockers

- None. A fresh clone has no `.env.local` or `local.db` (both gitignored) — run `cp .env.example .env.local`, then `pnpm db:push` once. See the first-time block above.

---

## Open Decisions Needing Owner

- None right now.

---

## Code Quality Criteria (always enforce)

- **DRY:** No duplicated logic. Extract shared helpers.
- **No hardcoded values:** All configurable values in env/config.
- **File size:** Target 250-300 lines max. Split if larger.
- **Maintainable:** Small team must be able to understand any file quickly.
- **Testable:** Functions should be unit-testable independently.
- **Business rules:** Code must match `docs/PROJECT-RULES.md`

---

## Reference Docs (Tier 1 — rarely change)

- `handoff/getting-started.md` — first-run walkthrough + orientation (start here)
- `docs/PROJECT-RULES.md` — code values + technical constraints
- `README.md` — what this is, quick start, the two tests, how to reuse as a starter
