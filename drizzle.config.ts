import { defineConfig } from "drizzle-kit";
import dotenv from "dotenv";

// drizzle-kit runs outside Next.js, so load env from .env.local ourselves.
dotenv.config({ path: ".env.local" });

const url = process.env.DATABASE_URL;
if (!url) throw new Error("DATABASE_URL is not set (see .env.example)");

export default defineConfig({
  schema: "./db/schema.ts",
  out: "./drizzle",
  dialect: "sqlite", // swap to "postgresql" for Neon
  dbCredentials: { url },
});
