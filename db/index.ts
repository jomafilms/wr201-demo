// The DB is a ONE-LINE SWAP. Default is local SQLite; production is Neon Postgres.
// Only DATABASE_URL and the driver import change — the schema stays identical.
// See README "Make it real: swap SQLite -> Neon".
import { drizzle } from "drizzle-orm/libsql";
import { createClient } from "@libsql/client";
import * as schema from "./schema";

const url = process.env.DATABASE_URL;
if (!url) throw new Error("DATABASE_URL is not set (see .env.example)");

const client = createClient({ url });
export const db = drizzle(client, { schema });
