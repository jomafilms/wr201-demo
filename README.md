# wr201-demo

Two things in one folder:

1. **A tiny demo app** — a per-user "items" app (sign up, add items with a title + body, see only your own). Deliberately generic so it can be re-themed live to whatever you want.
2. **An agent-workflow starter** — a clean, reusable setup for steering a coding agent (Claude Code) toward SOLID, maintainable code: skills, templates, and project docs you can copy into any new project.

The point is to show *how you steer an agent to produce SOLID code* — DRY, no hardcoded values, single source of truth, small flat files, typed, per-user data isolation.

---

## Prerequisites

- **Node 20+** and **pnpm** (`npm i -g pnpm`)
- That's it. The default database is a local SQLite file — no account, no server, nothing to sign up for.

## Quick start

```bash
cp .env.example .env.local   # create your local settings (works as-is)
pnpm install       # install dependencies
pnpm db:push       # create the SQLite schema (makes ./local.db)
pnpm dev           # start the app → http://localhost:3000
```

Open http://localhost:3000, create an account, and add an item.

> `.env.local` is gitignored, so a fresh clone has none — `cp .env.example .env.local` creates it. The defaults (SQLite + a dev auth secret) run as-is; generate a real `BETTER_AUTH_SECRET` (`openssl rand -base64 32`) before you deploy.

## The two tests (how you *see* it working)

**1. Refresh test — data actually persists.**
Add an item, then reload the page. It's still there. That means it was written to the database, not just held in memory.

**2. Two-browser test — each user sees only their own.**
1. In a normal window, sign up as `a@example.com` and add "A's note".
2. In a **separate incognito/private window** (separate cookies), sign up as `b@example.com` and add "B's note".
3. A sees only "A's note"; B sees only "B's note". Refresh each — still correct.

This works because every item row stores a `userId`, and every query is scoped to the logged-in user. A user is just a row; every item points back to it.

## Make it real: swap SQLite → Neon

The database is a one-line swap. To go from local SQLite to production [Neon](https://neon.tech) Postgres:

1. In `.env.local`, set `DATABASE_URL` to your Neon connection string (the commented example is in `.env.example`).
2. In `lib/auth.ts`, change the adapter `provider` from `"sqlite"` to `"pg"`.
3. In `drizzle.config.ts`, change `dialect` from `"sqlite"` to `"postgresql"`.

The schema in `db/schema.ts` stays identical. Run `pnpm db:push` against the new database and you're live.

---

## The workflow system

The `.claude/` folder makes an agent follow a repeatable loop instead of freelancing. Slash commands (run them inside Claude Code):

- **`/init`** — one-time setup of this workflow in a *new* project (copies skills + templates, interviews you for the project rules).
- **`/check`** — the quality gate: checks your current changes against the project rules and, when warranted, runs deeper bug/security scans.
- **`/wrap`** — the finish line: runs `/check`, updates the docs, commits, and writes a handoff for the next session. (`/update` is an alias.)
- **`/dev`** — start the local dev server for your working lane.
- **`/project-status`** — a timestamped snapshot of where the project stands.
- **`/sync-skills`** — pull the latest shared version of these skills.
- **`/migrate`** *(advanced)* — safe dev/prod database migrations: dev-first, launch-gated prod writes, a Neon rollback branch, and data-loss-safe rollback. A good 301 anchor once the app has real data.
- **`/orchestrate`** *(advanced)* — drive several parallel builders from one strategy session, each isolated in its own git worktree, with human-in-loop gates.

The docs the agent reads every time:

- `.claude/CLAUDE.md` — the workflow rules + the pinned tech stack (so agents don't "correct" newer libraries back to stale patterns).
- `docs/CURRENT-STATUS.md` — the single source of truth for project state.
- `docs/PROJECT-RULES.md` — the code values every change must hold to.
- `handoff/*.md` — paste-ready briefs for the next task. Three teaching briefs ship here: `add-a-field.md`, `per-user-visibility.md`, `second-entity.md`. Drop one into a fresh session with `@handoff/<file>.md`.

## Reuse this as your own starter

To start the workflow in a brand-new project of your own:

```bash
# point at wherever this repo lives, then run /init inside your new project
export SKILLS_SRC=/path/to/wr201-demo
```

Then open your new project in Claude Code and run **`/init`** — it copies the core skills and templates, sets up `docs/`, and interviews you to write that project's `PROJECT-RULES.md`. Personalize once (name, default stack, preferences) by copying `templates/PERSONALIZE.md` into your global `~/.claude/CLAUDE.md`.

---

## Project layout

```
wr201-demo/
├─ app/            # Next.js App Router — page, auth forms, server actions
├─ db/             # schema.ts (single source of truth) + client + seed
├─ lib/            # auth config, auth client, session + items data access
├─ docs/           # CURRENT-STATUS.md + PROJECT-RULES.md
├─ handoff/        # paste-ready next-task briefs (the teaching PRDs)
├─ templates/      # reusable workflow templates
└─ .claude/        # CLAUDE.md (workflow + tech stack) + skills/
```

## Tech stack (pinned)

Next.js 16 · React 19 · TypeScript · Tailwind CSS 4 · Drizzle ORM 0.45 · SQLite (`@libsql/client`) → Neon Postgres · BetterAuth 1.6 (email + password).

> BetterAuth and Drizzle move fast — if you extend them, check their docs (better-auth.com, orm.drizzle.team) rather than going from memory. See `.claude/CLAUDE.md`.
