"use client";

import { useState } from "react";
import { HeatmapCanvas } from "@/components/ui";

type EventPoint = { xPct: number; yPct: number; type: string };

export function HeatmapSection({
  events,
  total,
}: {
  events: EventPoint[];
  total: number;
}) {
  const [filter, setFilter] = useState<"all" | "click" | "hover">("all");

  const points = events
    .filter((e) => filter === "all" || e.type === filter)
    .map(({ xPct, yPct }) => ({ xPct, yPct }));

  const clickCount = events.filter((e) => e.type === "click").length;
  const hoverCount = events.filter((e) => e.type === "hover").length;

  return (
    <div
      className="rounded-2xl overflow-hidden"
      style={{ border: "1px solid var(--border-soft)", background: "var(--color-surface)" }}
    >
      <div
        className="px-5 py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3"
        style={{ borderBottom: "1px solid var(--border-faint)" }}
      >
        <div>
          <h2 className="font-semibold text-sm" style={{ color: "var(--color-brand)" }}>
            Heatmap — Homepage
          </h2>
          <p className="text-xs mt-0.5 opacity-55" style={{ color: "var(--color-brand)" }}>
            {total} événement{total !== 1 ? "s" : ""} enregistré{total !== 1 ? "s" : ""}
          </p>
        </div>

        <div className="flex items-center gap-1.5">
          {(
            [
              { key: "all", label: `Tous (${total})` },
              { key: "click", label: `Clics (${clickCount})` },
              { key: "hover", label: `Pauses (${hoverCount})` },
            ] as const
          ).map(({ key, label }) => (
            <button
              key={key}
              onClick={() => setFilter(key)}
              className="px-3 py-1.5 rounded-full text-xs font-semibold transition-all"
              style={
                filter === key
                  ? { background: "var(--color-brand)", color: "var(--color-canvas)" }
                  : {
                      border: "1px solid var(--border-soft)",
                      background: "transparent",
                      color: "var(--color-brand)",
                      opacity: 0.6,
                    }
              }
            >
              {label}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2 text-xs opacity-50" style={{ color: "var(--color-brand)" }}>
          <span className="inline-block w-3 h-3 rounded-full bg-blue-600" /> Faible
          <span className="inline-block w-3 h-3 rounded-full bg-amber-500 ml-1" /> Moyen
          <span className="inline-block w-3 h-3 rounded-full bg-red-500 ml-1" /> Fort
        </div>
      </div>

      <div className="p-4">
        {points.length === 0 ? (
          <div
            className="rounded-xl flex items-center justify-center text-sm opacity-40"
            style={{ background: "#070f1e", height: 200, color: "var(--color-brand)" }}
          >
            Aucun événement — visitez la homepage pour générer des données
          </div>
        ) : (
          <HeatmapCanvas points={points} />
        )}
      </div>
    </div>
  );
}
