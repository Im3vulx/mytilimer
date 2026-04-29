"use client";

import { useMemo, useState } from "react";
import type { FicheTechnique, Nutrition100g } from "@/lib/ficheTechniqueTypes";
import { allowedDesignations } from "@/lib/ficheTechniqueValidation";

type Props = {
  initial: FicheTechnique;
};

type ApiState =
  | { status: "idle" }
  | { status: "loading" }
  | { status: "success"; message: string }
  | { status: "error"; message: string };

function InputNumber({
  label,
  value,
  onChange,
  step,
  min,
}: {
  label: string;
  value: number;
  onChange: (next: number) => void;
  step?: number;
  min?: number;
}) {
  return (
    <label className="block">
      <span className="text-xs font-semibold text-[#F6F0E3]/70">{label}</span>
      <input
        type="number"
        value={Number.isFinite(value) ? value : 0}
        step={step}
        min={min}
        onChange={(e) => {
          const next = Number(e.target.value);
          onChange(Number.isFinite(next) ? next : 0);
        }}
        className="mt-1 w-full rounded-2xl border border-[#F6F0E3]/20 bg-[#0B1B3A]/25 px-4 py-3 text-[#F6F0E3] outline-none focus:border-[#F6F0E3]/35"
      />
    </label>
  );
}

function NutritionBlock({
  title,
  value,
  onChange,
}: {
  title: string;
  value: Nutrition100g;
  onChange: (next: Nutrition100g) => void;
}) {
  const fields = useMemo(
    () =>
      [
        { key: "energieKcal", label: "Energie (kcal / 100g)", step: 0.1 },
        { key: "proteinesG", label: "Proteines (g / 100g)", step: 0.1 },
        { key: "glucidesG", label: "Glucides (g / 100g)", step: 0.1 },
        { key: "dontSucresG", label: "Dont sucres (g / 100g)", step: 0.01 },
        { key: "lipidesG", label: "Lipides (g / 100g)", step: 0.1 },
        { key: "acidesGrasSaturesG", label: "AG saturés (g / 100g)", step: 0.1 },
        { key: "selG", label: "Sel (g / 100g)", step: 0.1 },
        { key: "omega3TotalG", label: "Total Omega-3 (g / 100g)", step: 0.01 },
        { key: "omega3EPA_G", label: "EPA (g / 100g)", step: 0.01 },
        { key: "omega3DHA_G", label: "DHA (g / 100g)", step: 0.01 },
      ] as const,
    [],
  );

  return (
    <div className="rounded-3xl border border-[#F6F0E3]/15 bg-[#041326]/20 p-5">
      <h3 className="text-base font-semibold">{title}</h3>
      <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
        {fields.map((f) => (
          <InputNumber
            key={f.key}
            label={f.label}
            step={f.step}
            value={value[f.key]}
            min={0}
            onChange={(next) => onChange({ ...value, [f.key]: next })}
          />
        ))}
      </div>
    </div>
  );
}

export function FicheTechniqueAdminForm({ initial }: Props) {
  const [form, setForm] = useState<FicheTechnique>(initial);
  const [apiState, setApiState] = useState<ApiState>({ status: "idle" });

  return (
    <form
      className="space-y-8"
      onSubmit={async (e) => {
        e.preventDefault();
        setApiState({ status: "loading" });

        try {
          const res = await fetch("/api/admin/fiche-technique", {
            method: "PUT",
            headers: { "content-type": "application/json" },
            body: JSON.stringify(form),
          });
          const data = (await res.json()) as { ok: boolean; error?: string };
          if (!res.ok || !data.ok) {
            throw new Error(data.error ?? "Erreur lors de la mise a jour");
          }
          setApiState({ status: "success", message: "Mise a jour enregistree" });
        } catch (err) {
          setApiState({
            status: "error",
            message: err instanceof Error ? err.message : "Erreur interne",
          });
        }
      }}
    >
      <div className="rounded-3xl border border-[#F6F0E3]/15 bg-[#041326]/35 p-5">
        <h2 className="text-xl font-semibold">Fiche technique</h2>
        <p className="mt-1 text-sm text-[#F6F0E3]/75">
          Modifiez les parametres techniques et les indicateurs nutritionnels.
        </p>

        <div className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-3">
          <label className="block">
            <span className="text-xs font-semibold text-[#F6F0E3]/70">
              Designation autorisee
            </span>
            <select
              value={form.designationAutorisee}
              onChange={(e) => setForm((prev) => ({ ...prev, designationAutorisee: e.target.value }))}
              className="mt-1 w-full rounded-2xl border border-[#F6F0E3]/20 bg-[#0B1B3A]/25 px-4 py-3 text-[#F6F0E3] outline-none focus:border-[#F6F0E3]/35"
            >
              {allowedDesignations.map((d) => (
                <option key={d} value={d}>
                  {d}
                </option>
              ))}
            </select>
          </label>

          <InputNumber
            label="Taux extrait sec min (liquide, %)"
            value={form.tauxExtraitSecMinPct}
            step={0.1}
            min={0}
            onChange={(next) => setForm((prev) => ({ ...prev, tauxExtraitSecMinPct: next }))}
          />

          <InputNumber
            label="Taux extrait sec max (liquide, %)"
            value={form.tauxExtraitSecMaxPct}
            step={0.1}
            min={0}
            onChange={(next) => setForm((prev) => ({ ...prev, tauxExtraitSecMaxPct: next }))}
          />

          <InputNumber
            label="pH"
            value={form.ph}
            step={0.1}
            min={0}
            onChange={(next) => setForm((prev) => ({ ...prev, ph: next }))}
          />

          <InputNumber
            label="Dosage min (%)."
            value={form.dosageMinPct}
            step={0.05}
            min={0}
            onChange={(next) => setForm((prev) => ({ ...prev, dosageMinPct: next }))}
          />

          <InputNumber
            label="Dosage max (%)."
            value={form.dosageMaxPct}
            step={0.05}
            min={0}
            onChange={(next) => setForm((prev) => ({ ...prev, dosageMaxPct: next }))}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <NutritionBlock
          title="Liquide (pour 100g)"
          value={form.nutrition.LIQUIDE}
          onChange={(next) =>
            setForm((prev) => ({
              ...prev,
              nutrition: { ...prev.nutrition, LIQUIDE: next },
            }))
          }
        />
        <NutritionBlock
          title="Poudre (pour 100g)"
          value={form.nutrition.POUDRE}
          onChange={(next) =>
            setForm((prev) => ({
              ...prev,
              nutrition: { ...prev.nutrition, POUDRE: next },
            }))
          }
        />
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <button
          type="submit"
          disabled={apiState.status === "loading"}
          className="inline-flex items-center justify-center rounded-full bg-[#F6F0E3] px-5 py-3 text-sm font-semibold text-[#041326] transition hover:bg-[#FFF8E7] disabled:opacity-60"
        >
          {apiState.status === "loading" ? "Sauvegarde..." : "Enregistrer"}
        </button>
        <p className="text-sm text-[#F6F0E3]/70">
          {apiState.status === "success" ? apiState.message : null}
          {apiState.status === "error" ? `Erreur: ${apiState.message}` : null}
        </p>
      </div>
    </form>
  );
}

