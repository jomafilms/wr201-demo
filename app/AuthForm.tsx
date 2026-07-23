"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn, signUp } from "@/lib/auth-client";

type Mode = "sign-in" | "sign-up";

export default function AuthForm() {
  const router = useRouter();
  const [mode, setMode] = useState<Mode>("sign-in");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  async function onSubmit(formData: FormData) {
    setBusy(true);
    setError(null);
    const email = String(formData.get("email"));
    const password = String(formData.get("password"));
    const name = String(formData.get("name") ?? email);

    const res =
      mode === "sign-up"
        ? await signUp.email({ email, password, name })
        : await signIn.email({ email, password });

    setBusy(false);
    if (res.error) {
      setError(res.error.message ?? "Something went wrong");
      return;
    }
    router.refresh();
  }

  return (
    <form action={onSubmit} className="flex flex-col gap-3 max-w-sm">
      <h2 className="text-lg font-semibold">
        {mode === "sign-up" ? "Create an account" : "Sign in"}
      </h2>

      {mode === "sign-up" && (
        <input name="name" placeholder="Name" className="border rounded px-3 py-2" />
      )}
      <input
        name="email"
        type="email"
        required
        placeholder="Email"
        className="border rounded px-3 py-2"
      />
      <input
        name="password"
        type="password"
        required
        minLength={8}
        placeholder="Password (min 8 chars)"
        className="border rounded px-3 py-2"
      />

      {error && <p className="text-sm text-red-600">{error}</p>}

      <button
        type="submit"
        disabled={busy}
        className="rounded bg-black text-white px-3 py-2 disabled:opacity-50"
      >
        {busy ? "..." : mode === "sign-up" ? "Sign up" : "Sign in"}
      </button>

      <button
        type="button"
        onClick={() => setMode(mode === "sign-up" ? "sign-in" : "sign-up")}
        className="text-sm underline text-left"
      >
        {mode === "sign-up"
          ? "Have an account? Sign in"
          : "New here? Create an account"}
      </button>
    </form>
  );
}
