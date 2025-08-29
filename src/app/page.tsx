"use client";

import { useMoodStore } from "@/store/useMoodStore";
import MoodCard from "@/components/MoodCard";
import MoodChart from "@/components/MoodChart";

export default function HomePage() {
  const moods = useMoodStore((s) => s.moods).slice().sort((a, b) => a.date.localeCompare(b.date));

  return (
    <div className="space-y-4">
      {/* Mood Trends */}
      <MoodChart data={moods} />

      {/* List Entries */}
      {moods.length === 0 ? (
        <p className="text-gray-600">Belum ada entri. Klik “Tambah”.</p>
      ) : (
        <div className="space-y-3">
          {moods.map((m) => <MoodCard key={m.id} mood={m} />)}
        </div>
      )}
    </div>
  );
}
