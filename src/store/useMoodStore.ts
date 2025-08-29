"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { Mood } from "@/types/mood";

type State = {
  moods: Mood[];
  add: (m: Mood) => void;
  update: (id: string, patch: Partial<Mood>) => void;
  remove: (id: string) => void;
  getById: (id: string) => Mood | undefined;
};

export const useMoodStore = create<State>()(
  persist(
    (set, get) => ({
      moods: [],
      add: (m) => set((s) => ({ moods: [...s.moods, m] })),
      update: (id, patch) =>
        set((s) => ({ moods: s.moods.map((x) => (x.id === id ? { ...x, ...patch } : x)) })),
      remove: (id) => set((s) => ({ moods: s.moods.filter((x) => x.id !== id) })),
      getById: (id) => get().moods.find((m) => m.id === id),
    }),
    {
      name: "mood-tracker",
      storage: createJSONStorage(() => localStorage),
      partialize: (s) => ({ moods: s.moods }),
      version: 1,
    }
  )
);
