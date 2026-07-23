# HANDOFF — Add a "tag" field to items

**Mode:** build
**Created:** 2026-07-23  ·  **Lane:** add-tag-field · solo

> Paste this into a fresh session with `@handoff/add-a-field.md` plus any notes. Self-contained — act from this + the docs it points to.

## Goal
Add an optional `tag` (short text) to each item: you can type a tag when adding an item, and it shows next to the item in the list.

## Why / problem
This is the smallest end-to-end change there is, and it teaches the core mental model: **a change touches more than one file.** "Add a field" = add a column in the schema, add an input in the form, add it to the display. If any one is missing, the feature is broken. Great first live demo of steering an agent through a whole slice.

## Settled — don't re-litigate
- `tag` is a single optional text field. No tag list, no autocomplete, no separate table. Keep it flat.
- The schema is the single source of truth (`db/schema.ts`). Start there.

## Read & trace first
- `docs/CURRENT-STATUS.md` (current state)
- `docs/PROJECT-RULES.md` — Rule 3 (single source of truth for schema), Rule 5 (flat, small)
- `db/schema.ts` — the `items` table (see `title`/`body` — `tag` follows the same shape)
- `app/actions.ts` — `addItem` reads form fields; add `tag` here
- `app/page.tsx` — the add-item `<form>` and the list `<li>` that renders each item
- `lib/items.ts` — `createItem` input type (add `tag`)

## Do
1. In `db/schema.ts`, add `tag: text("tag")` to the `items` table (nullable = optional). Export type is inferred automatically.
2. Run `pnpm db:push` to apply the new column to SQLite.
3. In `lib/items.ts`, add `tag?: string` to the `createItem` input and pass it through.
4. In `app/actions.ts` `addItem`, read `tag` from `formData` (trim; allow empty).
5. In `app/page.tsx`, add a `<input name="tag" placeholder="Tag (optional)">` to the form, and render `item.tag` in the list `<li>` when present.

## Done when
- You can add an item with a tag, and the tag shows in the list.
- Items without a tag still work (it's optional).
- `pnpm build` is green.

## Open questions for owner
- Should the tag be required instead of optional? (Default here: optional.)

## Constraints
- One field, flat. No new table, no new dependency. Keep files small.
