// The plain-language spec that produced this app — the "conversation → PRD" artifact.
// Full copy-paste version lives in PROMPT.md at the repo root (single source of truth for the story).
const PROMPT = `Build a tiny multi-user "items" app — a teaching demo. Keep it minimal and solid.

- Stack: Next.js (App Router, TypeScript) + Drizzle ORM + BetterAuth.
  DB: local SQLite by default, small swap to Neon Postgres for production.
- Auth: email + password — sign up, sign in, sign out. No verification emails
  (so it runs with zero config).
- Data: one items table — id, userId, title, body, createdAt.
  Every item belongs to a user (userId foreign key).
- Behavior: a signed-in user adds an item (title + optional body) and sees
  only their own. Signed-out users get a sign-in form.
- Chrome: one shared top nav in the layout — brand (→ home), an About link,
  and when signed in the user's email + sign out. Defined once, on every page.
- Rules: schema in one place; no hardcoded values; per-user queries always
  scoped by the session user id (never a client value); small files.
- Verify: the two-browser test must pass — two accounts, separate data.`;

const STACK: [string, string][] = [
  ["Pages + UI", "Next.js (App Router) + React"],
  ["Data", "Drizzle ORM — schema in one file"],
  ["Database", "local SQLite → small swap for Neon Postgres"],
  ["Auth", "BetterAuth — email + password"],
  ["Version control", "git — commit every working state"],
];

export default function About() {
  return (
    <main className="max-w-3xl mx-auto p-8 flex flex-col gap-6">
      <h1 className="text-2xl font-bold">About this demo</h1>

      <p className="opacity-80">
        A deliberately tiny app: sign in, add items, and each account sees only
        its own. It exists to show the four things that turn a page into a real
        app — data, persistence, users, and version control — with as few moving
        parts as possible.
      </p>

      <section className="flex flex-col gap-2">
        <h2 className="text-lg font-semibold">What it&apos;s made of</h2>
        <dl className="flex flex-col divide-y divide-black/10 dark:divide-white/10 border-y border-black/10 dark:border-white/10">
          {STACK.map(([k, v]) => (
            <div key={k} className="flex flex-col sm:flex-row sm:gap-4 py-2">
              <dt className="font-medium sm:w-40 shrink-0">{k}</dt>
              <dd className="opacity-75 text-sm sm:text-base">{v}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="flex flex-col gap-2">
        <h2 className="text-lg font-semibold">The prompt that built it</h2>
        <p className="text-sm opacity-70">
          One plain-language spec — talk the idea through, let the agent turn it
          into a build. This is that spec (also in{" "}
          <code className="text-xs">PROMPT.md</code>, ready to copy and run in an
          empty folder).
        </p>
        <pre className="text-xs sm:text-sm whitespace-pre-wrap border rounded p-4 bg-black/[.03] dark:bg-white/[.04] overflow-x-auto">
          {PROMPT}
        </pre>
      </section>

      <section className="flex flex-col gap-2">
        <h2 className="text-lg font-semibold">How to know it&apos;s real</h2>
        <ul className="list-disc pl-5 flex flex-col gap-1 text-sm opacity-80">
          <li>
            <strong>Hard-refresh it, come back tomorrow.</strong> Still there? It saved.
          </li>
          <li>
            <strong>Open a second browser, sign in as someone else.</strong>{" "}
            Separate data? Real multi-user.
          </li>
        </ul>
      </section>
    </main>
  );
}
