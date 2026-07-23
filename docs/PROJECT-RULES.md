# wr201-demo — Project Rules

**Last Updated:** 2026-07-23
**Owner:** Project owner

<!-- This is the authoritative source for code values and constraints. -->
<!-- Agents check code against this doc. If code conflicts, they stop and ask. -->

---

## Code Values (the whole point of this repo)

The theme is "how I steer an agent to produce SOLID code." Every change must hold to these:

### Rule 1: DRY — one source of truth
- **Rule:** No duplicated logic. Shared behavior lives in one helper (e.g. all item reads/writes go through `lib/items.ts`; "who is logged in" is only `lib/session.ts`).
- **Why:** A tiny team can't maintain the same logic in three places.
- **Edge cases:** If you copy-paste a block, stop and extract it instead.

### Rule 2: No hardcoded values — config/env only
- **Rule:** URLs, secrets, DB connection, base URLs come from env (`.env.local`), never inlined in code.
- **Why:** The SQLite→Neon swap and any redeploy must be a config change, not a code hunt.
- **Edge cases:** A "temporary" hardcoded value is still a hardcoded value. Put it in env.

### Rule 3: Single source of truth for schema
- **Rule:** The database shape lives only in `db/schema.ts`. Nothing else redefines columns.
- **Why:** Drizzle + BetterAuth both read from it; two definitions drift and break auth.
- **Edge cases:** Adding a field = add a column here first, then everything else follows.

### Rule 4: Typed / closed vocabulary
- **Rule:** Prefer explicit TypeScript types and closed sets (unions/enums) over loose strings.
- **Why:** The compiler catches mistakes before a student does.

### Rule 5: Flat over nested, small files
- **Rule:** Keep the tree flat. Files target 250-300 lines max; split when larger.
- **Why:** Legibility for a newcomer is a first-class goal here.

### Rule 6: Per-user data isolation
- **Rule:** Every `items` row carries a `userId`. Every read/write is scoped to the current user's id — a user can only ever see or change their own rows.
- **Why:** This is the app's core correctness property and what the two-browser test proves.
- **Edge cases:** Never trust a userId from the client; always take it from the server session (`lib/session.ts`).

---

## Technical Constraints

- **Framework:** Next.js 16 (App Router), React 19
- **Language:** TypeScript
- **Styling:** Tailwind CSS 4 — plain and sparse. **No skeleton loaders**, no flourish.
- **Database:** Drizzle ORM. Default local SQLite (`@libsql/client`); production Neon Postgres via a one-line swap.
- **Auth:** BetterAuth (email + password).
- **File size max:** 250-300 lines per file
- **No hardcoded values:** everything configurable in env

---

## What Agents Should NOT Do

- Do not rename or fork the BetterAuth-owned tables (`user`/`session`/`account`/`verification`).
- Do not "modernize" BetterAuth/Drizzle code from memory — verify against their docs (see `.claude/CLAUDE.md`).
- Do not add skeleton loaders or UI flourish.
- Do not add dependencies without justification.
- Do not commit code without updating `docs/CURRENT-STATUS.md`.
- Do not trust a client-supplied userId — read it from the server session.
