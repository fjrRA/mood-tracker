"use client";

import { useRouter } from "next/navigation";
import { useMoodStore } from "@/store/useMoodStore";
import type { Mood } from "@/types/mood";
import { useEffect, useState } from "react";
import { uuid } from "@/utils/id";

type Props = { initial?: Mood };

export default function MoodForm({ initial }: Props) {
  const router = useRouter();
  const { add, update } = useMoodStore();
  const [date, setDate] = useState(initial?.date ?? "");
  const [level, setLevel] = useState<Mood["level"]>(initial?.level ?? 3);
  const [note, setNote] = useState(initial?.note ?? "");

  useEffect(() => {
    if (!initial) setDate(new Date().toISOString().slice(0, 10));
  }, [initial]);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (initial) {
      update(initial.id, { date, level, note: note || undefined });
    } else {
      const mood: Mood = {
        id: uuid(),
        date,
        level,
        note: note || undefined,
      };
      add(mood);
    }

    router.push("/");
  };

  return (
    <form onSubmit={onSubmit} className="space-y-4 max-w-md">
      <div>
        <label className="block mb-1 text-sm font-medium">Tanggal</label>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
          className="w-full rounded border p-2"
        />
      </div>

      <div>
        <label className="block mb-1 text-sm font-medium">Level Mood (1–5)</label>
        <input
          type="range" min={1} max={5}
          value={level}
          onChange={(e) => setLevel(Number(e.target.value) as Mood["level"])}
          className="w-full"
        />
        <div className="text-sm mt-1">Level: <b>{level}</b></div>
      </div>

      <div>
        <label className="block mb-1 text-sm font-medium">Catatan (opsional)</label>
        <textarea
          value={note}
          onChange={(e) => setNote(e.target.value)}
          rows={3}
          className="w-full rounded border p-2"
          placeholder="Tulis catatan singkat…"
        />
      </div>

      <div className="flex gap-2">
        <button type="submit" className="px-4 py-2 rounded bg-blue-600 text-white">
          {initial ? "Simpan Perubahan" : "Simpan"}
        </button>
        <button type="button" onClick={() => router.back()} className="px-4 py-2 rounded border">
          Batal
        </button>
      </div>
    </form>
  );
}
