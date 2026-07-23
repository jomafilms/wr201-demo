// Data access for items — the single place that reads/writes the items table.
// Every query is scoped to a userId, so a user can only ever see their own rows.
import { eq, desc } from "drizzle-orm";
import { db } from "@/db";
import { items, type Item } from "@/db/schema";

export async function listItems(userId: string): Promise<Item[]> {
  return db
    .select()
    .from(items)
    .where(eq(items.userId, userId))
    .orderBy(desc(items.createdAt));
}

export async function createItem(input: {
  userId: string;
  title: string;
  body: string;
}): Promise<void> {
  await db.insert(items).values(input);
}
