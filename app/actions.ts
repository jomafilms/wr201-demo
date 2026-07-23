"use server";

import { revalidatePath } from "next/cache";
import { getCurrentUser } from "@/lib/session";
import { createItem } from "@/lib/items";

export async function addItem(formData: FormData) {
  const user = await getCurrentUser();
  if (!user) throw new Error("Not signed in");

  const title = String(formData.get("title") ?? "").trim();
  const body = String(formData.get("body") ?? "").trim();
  if (!title) return; // title is required; ignore empty submits

  await createItem({ userId: user.id, title, body });
  revalidatePath("/");
}
