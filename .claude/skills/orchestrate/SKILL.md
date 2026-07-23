---
name: orchestrate
description: Run a strategy→briefs→parallel-build session — get scope clear, write self-contained handoff briefs, spawn parallel builders isolated in git worktrees, watch them, and hold human-in-loop gates. Use when a session opens with several intents ("get these features moving") rather than one build task.
---

# /orchestrate — one strategy session drives many build sessions

**Advanced / optional.** Use when you have several things to build at once and want to parallelize without the builders clobbering each other. Assumes: git worktrees for isolation, and an agent runner that can spawn background or separate sessions.

**Optional project companion.** If `.claude/skills/orchestrate/PROJECT.md` exists, read it first — it holds project-specific gates, worktree traps, and learned rules. Keep project-specific content THERE, not in this file, so `/sync-skills` can refresh this file without wiping your notes.

**Division of labor (the core invariant):** THIS session is the orchestrator — it holds strategy, writes briefs, spawns and watches builders, and talks to the user. It does **not** write feature code (doc updates and one-line policy fixes are fine). Each builder gets ONE self-contained brief as its entire world. Never build a feature lane inline here; never paste strategy context into a builder.

## Phase 1 — INTAKE (get clear before anything runs)

1. Read `docs/CURRENT-STATUS.md` first, then the authoritative docs the intents touch (`docs/PROJECT-RULES.md` for business rules). Check `git status`, `git worktree list`, `docs/status/active/`, and `handoff/` — know what's already in flight before promising anything.
2. Interview until scope is unambiguous. Batch questions; don't drip them.
3. Split now-decisions from build-time decisions: answer the former; write the latter into each brief as "Open questions" with a **flagged default** so builders take the default instead of stalling. Decisions only a stakeholder can make go to the user, not into a brief.

## Phase 2 — BRIEF (write first, execute second)

1. **Verify code state before estimating.** Use read-only explore agents to check what actually exists (schema, flags, half-built features). Briefs must say "reuse X at `file:line`," not guess — the code is the truth; memory of what's built drifts fast.
2. Write one brief per lane, **self-contained**: TL;DR · what already exists / don't rebuild · the build · guardrails · acceptance checks · open questions with flagged defaults. A builder with zero other context must succeed from it. Name the gating skills it must run (`/check`, `/wrap`, and `/migrate` if it touches the database).
   - **Location encodes trust:** a genuinely unattended-safe lane (no taste, no behavior change, no prod) can live in `handoff/auto/<lane>.md`; everything else in `handoff/<lane>.md`.
3. Present the sequence (what's parallel-safe vs. dependent) and get the go. **Default to at most 2 concurrent builders** — more is hard to supervise, and if the user is also working, their attention is the scarce resource.

## Phase 3 — EXECUTE (isolate every builder)

- **Every parallel builder works in its own git worktree + branch.** A lane file is a sticky note, not a lock — two sessions in one tree physically share files and will corrupt each other's edits.
  ```
  git worktree add ../<repo>-<lane> -b <lane>
  ```
- Spawn each builder with its brief as the whole prompt, plus the guardrails: work in your worktree; start a dev server only when needed, on your own port; migrations **generate-only** (apply to dev via `/migrate`, never prod); **no push/merge to main**; deliver a branch + a report. If your agent runner supports background agents, prefer them — you're notified on completion, so no polling. Otherwise use separate interactive sessions.
- **Model choice per lane:** give judgment-heavy or ambiguous lanes (and the reviewers) a capable model; give well-specified mechanical sweeps a faster/cheaper one. The test: *if this lane hits something the brief didn't anticipate, do I want it to reason, or to stop and ask?* Reason → capable model; stop-and-ask → cheaper is fine.

## Phase 4 — WATCH (event-first, don't poll needlessly)

- If builders are tracked by your harness (background agents), you're **notified on completion — don't poll.**
- For untracked/interactive builders, watch for the signal that matters (new commits on their branches), with a **long fallback check** to catch a *stalled* builder — silence looks the same as healthy, and a blocked builder emits no event. Check more often only while a builder is near a known gate (a migration approval, a taste checkpoint, an open question).
- **Healthy** → a one-line status if the user's around. **Blocked / asking** → surface it with your recommendation and relay the answer. Feed a known fix INTO a stuck builder instead of watching it rediscover a solved problem.
- **Wrapped** → verify independently before trusting: merged to main, pushed, worktree removed, no leftover lane file, and if a migration shipped, the migration ledger in `CURRENT-STATUS.md` matches reality. For unattended builds, run a fresh adversarial reviewer against the branch diff before merging.

## Phase 5 — CLOSE (no orphans)

- Only clean up worktrees/sessions **this** orchestrator created. After a verified wrap: `git worktree remove` and delete the feature branch. Everything durable already lives in git (commits, folded status, archived handoff), so nothing is lost by closing.
- Follow-ups (a deferred prod step, a flagged decision) live in `CURRENT-STATUS.md` / `handoff/`, not in a lingering session — record them, then close.

## Human-in-loop gates — never automate past these

- **Prod DB writes** — only via `/migrate`, with explicit per-operation confirmation. Builders never touch prod.
- **Prod ops** (hosting env vars, domains/DNS, payment dashboards, live flag flips) — the user executes; you write the exact steps.
- **Business-rule / policy conflicts** — stop and ask.
- **Behavior changes** not pre-approved (who gets emailed, what counts as a sale, pricing, anything user-visible on a live surface) — present options + a recommendation, wait.
- **Anything outward-facing** (emails to real people, publishing, external services) — confirm first.
- Plus every gate in `docs/PROJECT-RULES.md` and the optional `PROJECT.md`.

## Generic gotchas worth knowing

- **Stage by explicit path in a shared tree** — `git add -A` sweeps stray artifacts and other sessions' files.
- **Worktree deps can hide package changes** — a wholesale `node_modules` symlink may resolve workspace packages to the main copy, so schema/type edits go invisible to the typechecker. A lane that changes package manifests needs a real install.
- **A worktree's copied `.env.local` still points its localhost URLs at the main repo's port** — start lane servers via `/dev` (which fixes the port), or rewrite the URL vars first.
- **Trust but verify every self-wrap** — a broken merge caught at the next event is cheap; caught tomorrow is not.

## Project companion — `PROJECT.md`

Create `.claude/skills/orchestrate/PROJECT.md` for anything project-specific: docs that win conflicts, this repo's worktree setup traps, extra human-in-loop gates, and dated learned rules (with the incident that taught them). It survives `/sync-skills`, which only refreshes this `SKILL.md`.
