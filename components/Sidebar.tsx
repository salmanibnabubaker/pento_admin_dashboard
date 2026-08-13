"use client";

import Link from "next/link";

export default function Sidebar() {
  return (
    <aside className="w-64 bg-black text-white min-h-screen p-5">
      <h1 className="text-2xl font-bold mb-10">
        PENTO Admin
      </h1>

      <nav className="space-y-4">
        <Link href="/dashboard">
          Dashboard
        </Link>

        <br />

        <Link href="/quotes">
          Quotes
        </Link>

        <br />

        <Link href="/tickets">
          Tickets
        </Link>

        <br />

        <Link href="/dealers">
          Dealers
        </Link>

        <br />

        <Link href="/users">
          Users
        </Link>
      </nav>
    </aside>
  );
}