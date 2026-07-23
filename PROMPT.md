# The prompt that built this

This is the plain-language spec that produced the whole app. It's the "conversation → PRD"
artifact: talk an idea through, let the agent turn it into a build.

**To run it live:** open an **empty folder** in your editor, then either

1. `/init` first (installs the workflow — rules, `/check`, `/wrap`) so the agent builds to a
   standard and you can gate + commit as you go, **then** paste the spec below; or
2. just paste the spec below and let the agent build, no workflow.

> Builds aren't byte-identical — an agent won't reproduce this repo exactly, and that's fine.
> The **spec** is the spec; the **two checks** at the bottom are what guarantee it came out solid.

---

## The spec (copy everything below)

Build a tiny multi-user "items" app — a teaching demo. Keep it minimal and solid.

- **Stack:** Next.js (App Router, TypeScript) + Drizzle ORM + BetterAuth.
  Database: local SQLite by default, a small swap to Neon Postgres for production
  (same schema — change `DATABASE_URL`, the Drizzle `dialect`, and the auth `provider`).
- **Auth:** email + password — sign up, sign in, sign out. No verification emails,
  so it runs with zero external config.
- **Data:** one `items` table — `id`, `userId`, `title`, `body`, `createdAt`.
  Every item belongs to a user (`userId` foreign key).
- **Behavior:** a signed-in user adds an item (title + optional body) and sees
  **only their own**. Signed-out users get a sign-in form.
- **Chrome:** one shared top nav in the layout — a brand that links home, an About link,
  and when signed in the user's email + a sign-out button. Defined **once**, shown on every page.
- **A second page:** an `/about` page describing what this is, its stack, and this very spec.
- **Rules:** schema in one place; no hardcoded values (config/env only); per-user queries
  always scoped by the **session** user id, never a value from the client; keep files small.
- **Verify before done:** the two-browser test must pass.

---

## The two checks (how you know it's real)

1. **Refresh test** — add something, refresh (or reopen the tab). Still there? It saved to the server.
2. **Two-browser test** — sign in as one person in a normal window and a *different* person in a
   private/incognito window. Each sees only their own items.

Pass both and it's crossed from a page to a real app.
