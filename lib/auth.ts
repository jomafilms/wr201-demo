// BetterAuth server config. Newer than training cutoff — verified against
// better-auth.com docs, do not revert from memory. See .claude/CLAUDE.md.
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "@/db";
import * as schema from "@/db/schema";

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "sqlite", // swap to "pg" for Neon — the only auth-side change
    schema,
  }),
  emailAndPassword: {
    enabled: true,
  },
});
