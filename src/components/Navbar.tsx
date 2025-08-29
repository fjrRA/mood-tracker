"use client";

import Link from "next/link";

export default function Navbar() {
  return (
    <header className="sticky top-0 bg-white border-b">
      <div className="mx-auto max-w-3xl px-4 py-3 flex items-center justify-between">
        <Link href="/" className="font-bold text-lg">
          Mood Tracker
        </Link>
        <Link
          href="/add"
          className="px-3 py-1.5 rounded bg-blue-600 text-white hover:bg-blue-700"
        >
          Tambah
        </Link>
      </div>
    </header>
  );
}
