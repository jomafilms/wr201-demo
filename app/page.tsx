import { getCurrentUser } from "@/lib/session";
import { listItems } from "@/lib/items";
import { addItem } from "./actions";
import AuthForm from "./AuthForm";

export default async function Home() {
  const user = await getCurrentUser();

  if (!user) {
    return (
      <main className="max-w-3xl mx-auto p-8 flex flex-col gap-6">
        <h1 className="text-2xl font-bold">Items</h1>
        <p className="text-sm opacity-70">
          Sign in to see and add your own items. Each account only sees its own.
        </p>
        <AuthForm />
      </main>
    );
  }

  const items = await listItems(user.id);

  return (
    <main className="max-w-3xl mx-auto p-8 flex flex-col gap-6">
      <h1 className="text-2xl font-bold">Items</h1>

      <form action={addItem} className="flex flex-col gap-3 border rounded p-4">
        <input
          name="title"
          required
          placeholder="Title"
          className="border rounded px-3 py-2"
        />
        <textarea
          name="body"
          placeholder="Body (optional)"
          rows={2}
          className="border rounded px-3 py-2"
        />
        <button
          type="submit"
          className="rounded bg-black text-white px-3 py-2 self-start"
        >
          Add item
        </button>
      </form>

      <ul className="flex flex-col gap-3">
        {items.length === 0 && (
          <li className="opacity-60 text-sm">No items yet. Add one above.</li>
        )}
        {items.map((item) => (
          <li key={item.id} className="border rounded p-3">
            <div className="font-medium">{item.title}</div>
            {item.body && <div className="text-sm opacity-80">{item.body}</div>}
          </li>
        ))}
      </ul>
    </main>
  );
}
