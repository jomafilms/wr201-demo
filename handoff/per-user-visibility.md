# HANDOFF — Verify & enforce per-user visibility

**Mode:** build
**Created:** 2026-07-23  ·  **Lane:** per-user-scoping · solo

> Paste this into a fresh session with `@handoff/per-user-visibility.md` plus any notes. Self-contained — act from this + the docs it points to.

## Goal
Confirm — and make impossible to break — that a user only ever sees and creates their own items. Add the **two-browser test** as the acceptance check and write it into the README's test section if it isn't already crisp.

## Why / problem
This is the app's core correctness property (`docs/PROJECT-RULES.md` Rule 6). It teaches the model that **a user is just a row, and every item points back to it by `userId`.** The failure mode to hunt for: any read or write that isn't scoped to the session user, or that trusts a `userId` coming from the client.

## Settled — don't re-litigate
- The current userId comes from the server session only (`lib/session.ts`), never from the form or the client.
- Reads/writes go through `lib/items.ts`, which already takes a `userId`. Keep that single choke point.

## Read & trace first
- `docs/CURRENT-STATUS.md` (current state)
- `docs/PROJECT-RULES.md` — Rule 6 (per-user isolation)
- `lib/session.ts` — `getCurrentUser()` (the only trusted source of the user id)
- `lib/items.ts` — every query is `.where(eq(items.userId, userId))` — confirm there is no unscoped read
- `app/actions.ts` — `addItem` takes `user.id` from the session, not from `formData` — confirm
- `app/page.tsx` — `listItems(user.id)` — confirm the list is scoped

## Do
1. Trace every read and write of `items`. Confirm each is scoped to the session user's id and none accept a client-supplied userId. Fix any that aren't.
2. Add a guard: `addItem` must throw/return if there's no session user (it already does — verify).
3. Run the two-browser test (below) and confirm isolation holds.
4. Make sure the README's "two-browser test" steps are accurate and plain-language.

## The two-browser test (acceptance check)
1. `pnpm dev`, open `http://localhost:3000`.
2. Browser A (normal window): sign up as `a@example.com`, add an item "A's note".
3. Browser B (a separate **incognito/private** window — separate cookies): sign up as `b@example.com`, add "B's note".
4. **Pass =** A sees only "A's note", B sees only "B's note". Refresh each — the list is unchanged and correct.

## Done when
- Every items query is provably scoped to the session user.
- The two-browser test passes as written.
- `pnpm build` is green.

## Open questions for owner
- None expected. If a genuinely shared/global list is ever wanted, that's a different feature — ask first.

## Constraints
- Do not add an "all items" or admin view. Do not read userId from the client.
