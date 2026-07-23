import Link from "next/link";
import SignOutButton from "./SignOutButton";

// One shared top nav for every page (rendered in layout.tsx). Single source of truth
// for navigation + the signed-in identity, so no page re-implements a header.
export default function TopNav({ email }: { email: string | null }) {
  return (
    <nav className="border-b border-black/10 dark:border-white/10">
      <div className="max-w-3xl mx-auto px-8 py-3 flex items-center justify-between gap-4">
        <Link href="/" className="font-semibold tracking-tight">
          wr201 demo
        </Link>
        <div className="flex items-center gap-4 text-sm">
          <Link href="/about" className="opacity-70 hover:opacity-100">
            About
          </Link>
          {email && (
            <>
              <span className="opacity-60 truncate hidden sm:inline max-w-[40vw]">
                {email}
              </span>
              <SignOutButton />
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
