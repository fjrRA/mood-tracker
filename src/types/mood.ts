export type Mood = {
  id: string;           
  date: string;         
  level: 1|2|3|4|5;
  note?: string;
};

export const moodEmoji: Record<Mood["level"], string> = {
  1: "😢", 2: "🙁", 3: "😐", 4: "🙂", 5: "😃",
};

export const moodColor: Record<Mood["level"], string> = {
  1: "bg-red-100 text-red-700",
  2: "bg-orange-100 text-orange-700",
  3: "bg-yellow-100 text-yellow-700",
  4: "bg-green-100 text-green-700",
  5: "bg-blue-100 text-blue-700",
};
