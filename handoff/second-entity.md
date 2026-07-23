# HANDOFF — Add a second entity: projects

**Mode:** build
**Created:** 2026-07-23  ·  **Lane:** projects-entity · solo

> Paste this into a fresh session with `@handoff/second-entity.md` plus any notes. Self-contained — act from this + the docs it points to.

## Goal
Add a `projects` table (per user), and give each item an optional `projectId` so items can belong to a project. Add a simple project picker on the add-item form and show the project name (or "No project") in the list.

## Why / problem
This is the first taste of **relations**: a second table, a foreign key from `items` to `projects`, and a query that joins/filters by it. It reinforces the same rules at one more level: flat schema, single source of truth (`db/schema.ts`), and per-user scoping applied to *both* tables.

## Settled — don't re-litigate
- Keep it flat: two tables (`projects`, `items`), one FK. No many-to-many, no join table.
- `projects` are per-user too — a project has a `userId`, exactly like items.
- `item.projectId` is **optional** (an item can have no project). Use a nullable column.
- All schema changes go in `db/schema.ts` first, then `pnpm db:push`.

## Read & trace first
- `docs/CURRENT-STATUS.md` (current state)
- `docs/PROJECT-RULES.md` — Rule 3 (single source of truth), Rule 6 (per-user isolation applies to projects too)
- `db/schema.ts` — mirror the `items` pattern for `projects`; add `projectId` to `items`
- `lib/items.ts` — the choke point for item reads/writes; add a sibling `lib/projects.ts` for project reads/writes (same shape, scoped by userId)
- `app/actions.ts` — add an `addProject` action; extend `addItem` to accept `projectId`
- `app/page.tsx` — a small "add project" form + a `<select>` of the user's projects on the item form

## Do
1. In `db/schema.ts`: add a `projects` table (`id`, `userId` FK→user, `name`, `createdAt` — mirror `items`). Add `projectId: text("project_id").references(() => projects.id)` (nullable) to `items`. Declare `projects` **above** `items` so the reference resolves.
2. `pnpm db:push`.
3. Add `lib/projects.ts` with `listProjects(userId)` and `createProject({ userId, name })` — same scoping pattern as `lib/items.ts` (DRY: same shape, don't reinvent).
4. In `app/actions.ts`: add `addProject(formData)`; extend `addItem` to read and store `projectId`.
5. In `app/page.tsx`: add a tiny "new project" form, a `<select name="projectId">` populated from `listProjects(user.id)` on the item form, and show the project name on each item.

## Done when
- You can create a project, then create an item assigned to it, and the item shows its project name.
- Items with no project still work (nullable FK).
- Projects and items are both scoped per user (two-browser test still passes).
- `pnpm build` is green.

## Open questions for owner
- Delete behavior: if a project is deleted, should its items be deleted or just un-assigned? (Default: leave items, set `projectId` null — but confirm.)

## Constraints
- Two tables, one FK, flat. No join table, no cascade surprises. Keep `lib/projects.ts` a mirror of `lib/items.ts` — don't duplicate logic across them beyond the table.
