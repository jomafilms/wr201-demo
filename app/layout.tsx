import type { Metadata } from "next";
import "./globals.css";
import { getCurrentUser } from "@/lib/session";
import TopNav from "./TopNav";

export const metadata: Metadata = {
  title: "Items — wr201 demo",
  description: "A tiny per-user items app + agent workflow starter.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await getCurrentUser();
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col">
        <TopNav email={user?.email ?? null} />
        {children}
      </body>
    </html>
  );
}
