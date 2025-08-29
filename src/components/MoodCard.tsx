"use client";

import Link from "next/link";
import { useState } from "react";
import { useMoodStore } from "@/store/useMoodStore";
import type { Mood } from "@/types/mood";
import { moodEmoji, moodColor } from "@/types/mood";
import ConfirmDialog from "./ConfirmDialog";

export default function MoodCard({ mood }: { mood: Mood }) {
  const remove = useMoodStore((s) => s.remove);
  const [confirmOpen, setConfirmOpen] = useState(false);

  const dateStr = new Date(mood.date).toLocaleDateString();

  return (
    <>
      <div className="rounded-xl border bg-white p-3 sm:p-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          {/* Left: icon + text */}
          <div className="flex items-start gap-3 min-w-0">
            <div
              className={`shrink-0 w-10 h-10 sm:w-12 sm:h-12 grid place-items-center rounded-full text-xl sm:text-2xl ${moodColor[mood.level]}`}
            >
              {moodEmoji[mood.level]}
            </div>
            <div className="min-w-0">
              <div className="font-semibold">
                <time dateTime={mood.date}>{dateStr}</time>
              </div>
              {mood.note && (
                <p className="text-sm text-gray-600 break-words">
                  {mood.note}
                </p>
              )}
            </div>
          </div>

          {/* Right: actions */}
          <div className="grid grid-cols-2 gap-2 sm:flex sm:flex-nowrap sm:gap-3 w-full sm:w-auto">
            <Link
              href={`/edit/${mood.id}`}
              className="px-3 py-2 rounded border text-center"
              aria-label={`Edit entri tanggal ${dateStr}`}
            >
              Edit
            </Link>
            <button
              onClick={() => setConfirmOpen(true)}
              className="px-3 py-2 rounded bg-red-600 text-white text-center"
              aria-label={`Hapus entri tanggal ${dateStr}`}
            >
              Hapus
            </button>
          </div>
        </div>
      </div>

      <ConfirmDialog
        open={confirmOpen}
        title="Hapus Entri?"
        description="Tindakan ini tidak dapat dibatalkan."
        confirmText="Hapus"
        cancelText="Batal"
        onCancel={() => setConfirmOpen(false)}
        onConfirm={() => {
          remove(mood.id);
          setConfirmOpen(false);
        }}
      />
    </>
  );
}
