"use client";

import { useRouter } from "next/navigation";
import { signOut } from "@/lib/auth-client";

export default function SignOutButton() {
  const router = useRouter();
  return (
    <button
      onClick={async () => {
        await signOut();
        router.refresh();
      }}
      className="text-sm underline"
    >
      Sign out
    </button>
  );
}
