// Optional demo data. Requires at least one signed-up user (auth owns the user
// table). Run `pnpm db:seed` after creating an account in the app.
import { db } from "./index";
import { user, items } from "./schema";

async function main() {
  const [first] = await db.select().from(user).limit(1);
  if (!first) {
    console.log("No user yet — sign up in the app first, then re-run pnpm db:seed.");
    return;
  }
  await db.insert(items).values([
    { userId: first.id, title: "First item", body: "Seeded from db/seed.ts" },
    { userId: first.id, title: "Second item", body: "Only this user can see these." },
  ]);
  console.log(`Seeded 2 items for ${first.email}.`);
}

main().then(() => process.exit(0));
