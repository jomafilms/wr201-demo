# [Project Name] — Current Status

**Last Updated:** YYYY-MM-DD
**Last Commit:** `[hash]` ([description])
**Branch:** main
**Launch:** pre-launch  <!-- pre-launch | launched (YYYY-MM-DD). The /migrate skill reads this to gate prod DB migrations. -->

---

## What Was Last Done

<!-- Move completed items here from "In Progress" -->

---

## What's In Progress

<!-- What's actively being worked on right now. -->
<!-- SINGLE SOURCE OF TRUTH. Concurrent sessions: don't write churn here mid-task — -->
<!-- use your transient lane file docs/status/active/<lane>.md, then fold it in at /update. -->
<!-- Live lanes currently open: see docs/status/active/ -->

---

## What's Next

<!-- Lean INDEX of upcoming work — one line each. The full brief for a non-trivial task -->
<!-- lives in handoff/<feature>.md (paste-ready: @handoff/<feature>.md into a fresh session). -->
<!-- - <feature> [Mode: build | design/investigate | fix | research] → handoff/<feature>.md -->
<!-- Trivial follow-ups can stay a one-liner with no handoff file. -->

---

## Known Issues / Blockers

<!-- Anything preventing progress -->

---

## Open Decisions Needing [Owner]

<!-- Questions that need a human decision before code can proceed -->

---

## Code Quality Criteria (always enforce)

- **DRY:** No duplicated logic. Extract shared helpers.
- **No hardcoded values:** All configurable values in config files.
- **File size:** Target 250-300 lines max. Split if larger.
- **Maintainable:** Small team must be able to understand any file quickly.
- **Testable:** Functions should be unit-testable independently.
- **Business rules:** Code must match `docs/PROJECT-RULES.md`

---

## Reference Docs (Tier 1 — rarely change)

<!-- List your project's always-relevant docs here -->
- `docs/PROJECT-RULES.md` — business rules and constraints
- `docs/vision.md` — product vision (if applicable)
