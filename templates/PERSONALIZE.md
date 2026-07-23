# Personalize — fill this in once, for yourself

The workflow skills are intentionally generic: they carry **no** names, stacks, or preferences.
Everything personal lives in data files, never in the skills. There are two places:

1. **Per-person (you)** — this file. Copy its contents into your global `~/.claude/CLAUDE.md`
   so every project inherits your defaults. Fill in the brackets and delete the rest.
2. **Per-project** — `docs/PROJECT-RULES.md` in each project (business rules, stack, guardrails).
   `/init` interviews you to create it.

That's the whole method: **skills stay generic; you personalize the data.**

---

## About me
- **Name / role:** [your name — what agents should call you]
- **Team size / context:** [e.g. solo, tiny team — drives how much process is worth it]
- **Defaults I prefer:** [e.g. flat architecture, DRY, no skeleton loaders]

## My default stack
<!-- So agents don't ask every time. Override per-project in PROJECT-RULES.md. -->
- **Framework:** [e.g. Next.js / React, or "varies"]
- **Package manager:** [npm / pnpm / yarn / bun]
- **Dev command + port flag:** [e.g. `npm run dev -- -p <port>`]

## How I want agents to work
- [e.g. "Ask before destructive or outward-facing actions."]
- [e.g. "Commit code + docs together; never separately."]
- [e.g. "When in doubt, ask rather than guess."]

## My own optional/personal skills (if any)
<!-- Account-specific automations you build go in your OWN skills repo, not the shared one.
     List them here so you remember they exist. -->
- [none yet]
