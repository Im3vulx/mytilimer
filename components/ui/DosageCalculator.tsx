"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { calculerDosage } from "@/lib/dosage";

type IntensityId = "delicat" | "leger" | "prononce" | "intense";

const intensityPresets: {
  id: IntensityId;
  label: string;
  sublabel: string;
  taux: number;
  dot: string;
}[] = [
  { id: "delicat", label: "Délicat", sublabel: "Fond marin subtil", taux: 0.5, dot: "○" },
  { id: "leger", label: "Léger", sublabel: "Notes marines légères", taux: 1.0, dot: "◔" },
  { id: "prononce", label: "Prononcé", sublabel: "Saveur umami marquée", taux: 2.0, dot: "◕" },
  { id: "intense", label: "Intense", sublabel: "Caractère moule affirmé", taux: 3.5, dot: "●" },
];

const MIN_TAUX = 0.5;
const MAX_TAUX = 4;

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

export function DosageCalculator() {
  const [intensity, setIntensity] = useState<IntensityId>("leger");
  const [poidsTotalKg, setPoidsTotalKg] = useState<number>(10);
  const [tauxManuel, setTauxManuel] = useState<number | null>(null);
  const [showManuel, setShowManuel] = useState(false);

  const taux = useMemo(() => {
    if (tauxManuel !== null) return clamp(tauxManuel, MIN_TAUX, MAX_TAUX);
    return intensityPresets.find((p) => p.id === intensity)?.taux ?? 1.0;
  }, [intensity, tauxManuel]);

  const { masseConcentreKg, masseBaseKg } = useMemo(() => {
    const safePoids = Number.isFinite(poidsTotalKg) ? poidsTotalKg : 0;
    return calculerDosage({
      quantiteProduitKg: safePoids,
      tauxConcentrePourcentMassique: taux,
    });
  }, [poidsTotalKg, taux]);

  const trackTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(() => {
    if (poidsTotalKg <= 0) return;
    if (trackTimerRef.current) clearTimeout(trackTimerRef.current);
    trackTimerRef.current = setTimeout(() => {
      fetch("/api/track/dosage", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          intensityId: tauxManuel !== null ? "manuel" : intensity,
          poidsTotalKg,
          taux,
          masseConcentreKg,
        }),
        keepalive: true,
      }).catch(() => {});
    }, 1500);
    return () => {
      if (trackTimerRef.current) clearTimeout(trackTimerRef.current);
    };
  }, [poidsTotalKg, taux, intensity, tauxManuel, masseConcentreKg]);

  return (
    <section
      className="rounded-3xl px-4 py-8 sm:px-6"
      style={{
        border: "1px solid var(--border-soft)",
        background: "var(--border-faint)",
      }}
      aria-label="Calculateur de dosage"
    >
      {/* Header */}
      <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <div
            className="inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-semibold uppercase tracking-widest"
            style={{
              border: "1px solid var(--border-soft)",
              background: "var(--border-faint)",
              color: "var(--color-brand)",
            }}
          >
            Dosage
          </div>
          <h2
            className="mt-3 text-balance text-2xl font-semibold sm:text-3xl"
            style={{ color: "var(--color-brand)" }}
          >
            Calculateur de concentré
          </h2>
          <p className="mt-2 text-sm opacity-72" style={{ color: "var(--color-body)" }}>
            Choisissez une intensité, indiquez le poids total de votre recette.
          </p>
        </div>

        {/* Result */}
        <div
          className="rounded-2xl p-4 sm:min-w-[220px]"
          style={{
            border: "1px solid var(--border-soft)",
            background: "var(--border-faint)",
          }}
        >
          <p
            className="text-xs font-semibold uppercase tracking-widest opacity-55"
            style={{ color: "var(--color-brand)" }}
          >
            Résultat
          </p>
          <div className="mt-2 grid grid-cols-1 gap-2" aria-live="polite">
            <div>
              <p className="text-sm font-semibold" style={{ color: "var(--color-body)" }}>
                Concentré nécessaire
              </p>
              <p className="text-2xl font-semibold" style={{ color: "var(--color-brand)" }}>
                {masseConcentreKg.toFixed(3)} kg
              </p>
            </div>
            <div>
              <p className="text-sm font-semibold" style={{ color: "var(--color-body)" }}>
                Base à compléter
              </p>
              <p className="text-lg font-semibold opacity-88" style={{ color: "var(--color-brand)" }}>
                {masseBaseKg.toFixed(3)} kg
              </p>
            </div>
          </div>
          <p className="mt-3 text-xs opacity-55" style={{ color: "var(--color-brand)" }}>
            Taux appliqué : {taux.toFixed(2)}%
          </p>
        </div>
      </div>

      {/* Intensity presets */}
      <div className="mt-8">
        <p className="text-sm font-semibold" style={{ color: "var(--color-brand)" }}>
          Intensité souhaitée
        </p>
        <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-4">
          {intensityPresets.map((preset) => {
            const active = tauxManuel === null && intensity === preset.id;
            return (
              <button
                key={preset.id}
                onClick={() => {
                  setIntensity(preset.id);
                  setTauxManuel(null);
                }}
                className="flex flex-col items-start rounded-xl px-4 py-3 text-left transition-all"
                style={{
                  border: active ? "1px solid var(--color-brand)" : "1px solid var(--border-faint)",
                  background: active ? "var(--color-brand)" : "var(--border-faint)",
                  color: active ? "var(--color-canvas)" : "var(--color-brand)",
                }}
              >
                <span className="text-base">{preset.dot}</span>
                <span className="mt-1 text-sm font-semibold">{preset.label}</span>
                <span
                  className="mt-0.5 text-[10px] opacity-70 leading-tight"
                  style={{ color: active ? "var(--color-canvas)" : "var(--color-body)" }}
                >
                  {preset.sublabel}
                </span>
                <span
                  className="mt-1 text-[11px] font-mono opacity-60"
                  style={{ color: active ? "var(--color-canvas)" : "var(--color-brand)" }}
                >
                  {preset.taux}%
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Weight input */}
      <div className="mt-6">
        <label
          className="block text-sm font-semibold"
          style={{ color: "var(--color-brand)" }}
          htmlFor="poidsTotalKg"
        >
          Poids total de la recette (kg)
        </label>
        <input
          id="poidsTotalKg"
          inputMode="decimal"
          type="number"
          step={0.1}
          min={0}
          value={poidsTotalKg}
          onChange={(e) => {
            const next = Number(e.target.value);
            setPoidsTotalKg(Number.isFinite(next) ? next : 0);
          }}
          className="mt-2 w-full max-w-xs rounded-xl px-4 py-3 text-sm outline-none transition"
          style={{
            border: "1px solid var(--border-soft)",
            background: "var(--color-surface)",
            color: "var(--color-brand)",
          }}
        />
      </div>

      {/* Fine-tune toggle */}
      <div className="mt-4">
        <button
          onClick={() => setShowManuel((s) => !s)}
          className="text-xs font-medium underline underline-offset-4 transition-opacity hover:opacity-80"
          style={{ color: "var(--color-brand)", opacity: 0.55 }}
        >
          {showManuel ? "Masquer" : "Affinage précis du taux →"}
        </button>

        {showManuel && (
          <div className="mt-3 flex flex-wrap items-center gap-3">
            <input
              type="range"
              min={MIN_TAUX}
              max={MAX_TAUX}
              step={0.05}
              value={taux}
              onChange={(e) => setTauxManuel(Number(e.target.value))}
              className="w-48 accent-[var(--color-brand)]"
              aria-label="Taux d'incorporation en pourcentage"
            />
            <input
              type="number"
              min={MIN_TAUX}
              max={MAX_TAUX}
              step={0.05}
              value={taux}
              onChange={(e) => setTauxManuel(Number(e.target.value))}
              className="w-24 rounded-xl px-3 py-2 text-sm outline-none"
              style={{
                border: "1px solid var(--border-soft)",
                background: "var(--color-surface)",
                color: "var(--color-brand)",
              }}
            />
            <span className="text-sm font-semibold" style={{ color: "var(--color-brand)" }}>%</span>
          </div>
        )}
      </div>
    </section>
  );
}
