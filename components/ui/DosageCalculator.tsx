"use client";

import { useMemo, useState } from "react";
import { calculerDosage } from "@/lib/dosage";

type ApplicationType = "soupe" | "sauce" | "plat_cuise";

const MIN_TAUX = 0.5;
const MAX_TAUX = 4;

const DEFAULT_TAUX_BY_APP: Record<ApplicationType, number> = {
  soupe: 1.0,
  sauce: 1.8,
  plat_cuise: 2.4,
};

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

export function DosageCalculator() {
  const [application, setApplication] = useState<ApplicationType>("soupe");
  const [poidsTotalKg, setPoidsTotalKg] = useState<number>(10);
  const [tauxIncorporation, setTauxIncorporation] = useState<number>(
    DEFAULT_TAUX_BY_APP.soupe,
  );
  const [tauxManuel, setTauxManuel] = useState(false);

  const { masseConcentreKg, masseBaseKg } = useMemo(() => {
    const safePoids = Number.isFinite(poidsTotalKg) ? poidsTotalKg : 0;
    const safeTaux = clamp(
      Number.isFinite(tauxIncorporation) ? tauxIncorporation : DEFAULT_TAUX_BY_APP[application],
      MIN_TAUX,
      MAX_TAUX,
    );

    return calculerDosage({
      quantiteProduitKg: safePoids,
      tauxConcentrePourcentMassique: safeTaux,
    });
  }, [application, poidsTotalKg, tauxIncorporation]);

  const tauxAffiche = useMemo(() => {
    const safeTaux = clamp(tauxIncorporation, MIN_TAUX, MAX_TAUX);
    return safeTaux;
  }, [tauxIncorporation]);

  return (
    <section
      className="rounded-3xl border border-[#F6F0E3]/15 bg-[#041326]/35 px-4 py-8 text-[#F6F0E3] sm:px-6"
      aria-label="Calculateur de dosage"
    >
      <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="inline-flex items-center gap-2 rounded-full border border-[#F6F0E3]/20 bg-[#F6F0E3]/5 px-3 py-1 text-xs font-semibold uppercase tracking-wide">
            Dosage
          </p>
          <h2 className="mt-3 text-balance text-2xl font-semibold sm:text-3xl">
            Calculateur de concentré
          </h2>
          <p className="mt-2 text-sm text-[#F6F0E3]/80">
            Choisissez une application, indiquez le poids total et ajustez le taux
            (0.5% a 4%).
          </p>
        </div>

        <div className="rounded-2xl border border-[#F6F0E3]/15 bg-[#0B1B3A]/35 p-4 sm:min-w-[220px]">
          <p className="text-xs font-semibold uppercase tracking-widest text-[#F6F0E3]/60">
            Resultat
          </p>
          <div
            className="mt-2 grid grid-cols-1 gap-2"
            aria-live="polite"
          >
            <div>
              <p className="text-sm font-semibold">Concentre necessaire</p>
              <p className="text-2xl font-semibold text-[#FFF8E7]">
                {masseConcentreKg.toFixed(3)} kg
              </p>
            </div>
            <div>
              <p className="text-sm font-semibold">Base a completer</p>
              <p className="text-lg font-semibold text-[#F6F0E3]/90">
                {masseBaseKg.toFixed(3)} kg
              </p>
            </div>
          </div>
          <p className="mt-3 text-xs text-[#F6F0E3]/60">
            Taux applique : {tauxAffiche.toFixed(2)}%
          </p>
        </div>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-1">
          <label className="block text-sm font-semibold" htmlFor="application">
            Application
          </label>
          <select
            id="application"
            name="application"
            value={application}
            onChange={(e) => {
              const nextApp = e.target.value as ApplicationType;
              setApplication(nextApp);
              if (!tauxManuel) {
                setTauxIncorporation(DEFAULT_TAUX_BY_APP[nextApp]);
              }
            }}
            className="mt-2 w-full rounded-2xl border border-[#F6F0E3]/20 bg-[#0B1B3A]/25 px-4 py-3 text-[#F6F0E3] shadow-sm outline-none focus:border-[#F6F0E3]/35"
          >
            <option value="soupe">Soupe</option>
            <option value="sauce">Sauce</option>
            <option value="plat_cuise">Plat cuisine</option>
          </select>
        </div>

        <div className="lg:col-span-1">
          <label className="block text-sm font-semibold" htmlFor="poidsTotalKg">
            Poids total (kg)
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
            className="mt-2 w-full rounded-2xl border border-[#F6F0E3]/20 bg-[#0B1B3A]/25 px-4 py-3 text-[#F6F0E3] shadow-sm outline-none focus:border-[#F6F0E3]/35"
          />
        </div>

        <div className="lg:col-span-1">
          <label className="block text-sm font-semibold" htmlFor="tauxIncorporation">
            Taux d&apos;incorporation (%)
          </label>
          <input
            id="tauxIncorporation"
            type="range"
            min={MIN_TAUX}
            max={MAX_TAUX}
            step={0.05}
            value={tauxAffiche}
            onChange={(e) => {
              const next = Number(e.target.value);
              setTauxManuel(true);
              setTauxIncorporation(next);
            }}
            className="mt-2 w-full accent-[#FFF8E7]"
          />

          <div className="mt-2 flex flex-wrap items-center justify-between gap-3">
            <span className="text-xs font-semibold text-[#F6F0E3]/60">
              {MIN_TAUX.toFixed(1)}%
            </span>
            <div className="flex items-center gap-2">
              <input
                type="number"
                min={MIN_TAUX}
                max={MAX_TAUX}
                step={0.05}
                value={Number.isFinite(tauxAffiche) ? tauxAffiche : MIN_TAUX}
                onChange={(e) => {
                  const next = Number(e.target.value);
                  setTauxManuel(true);
                  setTauxIncorporation(Number.isFinite(next) ? next : MIN_TAUX);
                }}
                className="w-[96px] rounded-2xl border border-[#F6F0E3]/20 bg-[#0B1B3A]/25 px-3 py-2 text-[#F6F0E3] shadow-sm outline-none focus:border-[#F6F0E3]/35 sm:w-[110px]"
              />
              <span className="text-sm font-semibold text-[#F6F0E3]">%</span>
            </div>
            <span className="text-xs font-semibold text-[#F6F0E3]/60">
              {MAX_TAUX.toFixed(0)}%
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

