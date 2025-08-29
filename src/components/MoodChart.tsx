"use client";

import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  TimeScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  type TooltipItem,
  type ChartData,
  type ChartOptions,
} from "chart.js";
import "chartjs-adapter-date-fns";
import type { Mood } from "@/types/mood";
import { useMemo } from "react";

ChartJS.register(TimeScale, LinearScale, PointElement, LineElement, Tooltip, Legend);

type Props = { data: Mood[] };

export default function MoodChart({ data }: Props) {
  // 1) Siapkan points {x: Date, y: level}
  const points = useMemo(
    () =>
      data
        .slice()
        .sort((a, b) => a.date.localeCompare(b.date))
        .map((m) => ({
          x: new Date(`${m.date}T00:00:00`),
          y: m.level as 1 | 2 | 3 | 4 | 5,
        })),
    [data]
  );

  // 2) ChartData dengan generic yang tepat
  const chartData: ChartData<"line", { x: Date; y: 1 | 2 | 3 | 4 | 5 }[], unknown> = useMemo(
    () => ({
      datasets: [
        {
          label: "Mood Level",
          data: points,
          tension: 0.35,
          borderWidth: 2,
          borderColor: "rgba(59,130,246,1)",
          backgroundColor: "rgba(59,130,246,0.25)",
          pointRadius: 3,
          pointHoverRadius: 5,
          fill: true,
          spanGaps: true,
          // parsing: false as const, // <- opsional; sebenarnya boleh dihapus
        },
      ],
    }),
    [points]
  );

  // 3) ChartOptions dengan literal 'time'
  const options: ChartOptions<"line"> = useMemo(
    () => ({
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        x: {
          type: "time",                 // <- literal, bukan string generic
          time: { unit: "day" as const },
          grid: { display: true },
        },
        y: {
          min: 1,
          max: 5,
          ticks: { stepSize: 1 },
        },
      },
      plugins: {
        legend: { display: false },
        tooltip: {
          callbacks: {
            label: (ctx: TooltipItem<"line">) => `Level: ${ctx.parsed.y}`,
          },
        },
      },
    }),
    []
  );

  if (points.length === 0) {
    return <p className="text-sm text-gray-500">Belum ada data untuk ditampilkan pada grafik.</p>;
  }

  return (
    <div className="rounded-xl border bg-white p-4">
      <h3 className="mb-3 font-semibold">Mood Trends</h3>
      <div className="relative h-64 sm:h-72">
        <Line data={chartData} options={options} />
      </div>
    </div>
  );
}
