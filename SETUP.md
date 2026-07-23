# Setup — from a brand-new computer to a running app

You need five things: **remADE** (recommended editor — VS Code or Cursor also work), **Homebrew** (installs the rest), **Node** (runs the app), **git** (saves your work), and **Claude Code** (your agent). Then you run the demo.

If you already have some of these, skip those steps — each one starts with a way to check.

> **Mac instructions.** On Windows, install [Git for Windows](https://git-scm.com/download/win) and [Node LTS](https://nodejs.org) from their sites (skip Homebrew), then follow from Step 4. Ask for help if stuck — Windows has a couple more variables.

> **Why this path (fewest moving parts):** the demo saves data to a plain local file (SQLite). No database account, no cloud login, nothing to sign up for. Putting it on the internet (Vercel + Neon) comes later — see **Deploy** near the bottom.

---

## Step 0 — Open your Terminal

- **In remADE:** open the built-in terminal panel. That's where every command below goes — paste one line, press Return, wait for it to finish, then the next.
- **Not in remADE yet:** open the Mac app called **Terminal** (Spotlight → type "Terminal").

Paste a command, press **Return**, let it finish before the next one. If it asks for your password, type it (you won't see the characters — that's normal) and press Return.

---

## Step 1 — Command Line Tools (gives you git)

Check first:
```
git --version
```
If it prints a version number, you already have it — **skip to Step 2.**
If it pops up a window asking to install "command line developer tools," click **Install** and wait. That's git, done.

---

## Step 2 — Homebrew (the thing that installs everything else)

Check first:
```
brew --version
```
If it prints a version, skip to Step 3. Otherwise install it:
```
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```
When it finishes, it prints two "Next steps" lines. **Run them** (copy them from your screen). On most Macs they are:
```
echo 'eval "$(/opt/homebrew/bin/brew shellenv)"' >> ~/.zprofile
eval "$(/opt/homebrew/bin/brew shellenv)"
```
Confirm it worked:
```
brew --version
```

---

## Step 3 — Node + pnpm (runs the app)

Check first:
```
node --version
```
If it prints v20 or higher, skip to the pnpm line below. Otherwise:
```
brew install node
```
Then install pnpm (a faster installer the demo uses):
```
npm install -g pnpm
```
Confirm both:
```
node --version && pnpm --version
```

---

## Step 4 — Claude Code (your agent), if you don't have it

Check first:
```
claude --version
```
If that prints a version, skip this step. Otherwise:
```
npm install -g @anthropic-ai/claude-code
```
Then start it once to sign in:
```
claude
```
Follow the login prompt. (You'll need a Claude plan — any tier works.) Type `/exit` to leave.

---

## Step 5 — Get the project and run it

Your instructor will share the project (a GitHub link, or a folder). If it's a **link**, get it and move into it:
```
cd ~/Projects
git clone <the-link-your-instructor-gives-you> wr201-demo
cd wr201-demo
```
If you were given a **folder**, just `cd` into it.

Then bring it to life:
```
cp .env.example .env.local   # create your local settings (works as-is for local)
pnpm install       # download what the app needs (one-time, ~1 min)
pnpm db:push       # create the local database file
pnpm dev           # start the app
```
Open **http://localhost:3000** in your browser. You have a running app.

To stop it: click the terminal and press **Ctrl + C**. To start it again later: `pnpm dev`.

---

## Prove it's real (the two checks)

1. **Refresh test:** add something, then refresh the page (or close the tab and reopen it). Still there? It's actually saved.
2. **Two-browser test:** sign up as one person in your normal window, and as a *different* person in a private/incognito window. Each should see only their own data.

---

## Deploy — put it live (optional)

Local needs none of this. When you want real users to reach it, the clean path for this Next.js app is **Vercel** + a hosted database (**Neon**) — the local SQLite file doesn't persist in the cloud.

1. **Push to GitHub** — ask Claude Code to "create a GitHub repo and push it," or use the GitHub CLI / github.com.
2. **Create a free database** at [neon.tech](https://neon.tech) and copy its connection string.
3. **Switch the app to Postgres** — follow **"Make it real: SQLite → Neon"** in the repo's `README.md` (change `DATABASE_URL` + the Drizzle/auth Postgres settings; the schema stays the same).
4. **Import the repo at [vercel.com](https://vercel.com)** (New Project → import from GitHub). Add these environment variables in Vercel's dashboard, then deploy:
   - `DATABASE_URL` — your Neon connection string
   - `BETTER_AUTH_SECRET` — a long random string
   - `BETTER_AUTH_URL` — your live URL (e.g. `https://your-app.vercel.app`)

> **Cloudflare?** Doable, but a Next.js app on Cloudflare Workers needs the **OpenNext** adapter (`@opennextjs/cloudflare`) — more setup than Vercel. The easy "GitHub + one token" Cloudflare path is for apps built **Workers-native** (or Astro / static) from the start. For this demo, use Vercel.

---

## When something breaks

- **"command not found"** → the tool from a previous step didn't install, or the terminal needs a restart. Quit and reopen the terminal, then re-run that step's check line.
- **A port is busy / "3000 in use"** → another copy is already running. Stop it (Ctrl + C in that window), or run `pnpm dev -- -p 3001` and open http://localhost:3001.
- **Anything else** → copy the red error text and ask Claude Code: `claude` → paste it → "how do I fix this?"
