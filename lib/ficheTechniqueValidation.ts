import type { FicheTechnique } from "./ficheTechniqueTypes";

export const allowedDesignations = [
  "Concentré de moule à 35%",
  "Extrait de moule",
  "Arôme naturel de moule",
] as const;

export function parseNumber(value: unknown, fieldName: string): number {
  if (typeof value !== "number" || !Number.isFinite(value)) {
    throw new TypeError(`Champ invalide: ${fieldName}`);
  }
  return value;
}

export function validateFicheTechniquePayload(payload: unknown): FicheTechnique {
  if (!payload || typeof payload !== "object") {
    throw new Error("Payload invalide");
  }
  const p = payload as Partial<FicheTechnique>;

  const designationAutorisee = p.designationAutorisee;
  if (typeof designationAutorisee !== "string") {
    throw new TypeError("designationAutorisee invalide");
  }
  if (!allowedDesignations.includes(designationAutorisee as (typeof allowedDesignations)[number])) {
    throw new Error("designationAutorisee non autorisee");
  }

  const tauxExtraitSecMinPct = parseNumber(p.tauxExtraitSecMinPct, "tauxExtraitSecMinPct");
  const tauxExtraitSecMaxPct = parseNumber(p.tauxExtraitSecMaxPct, "tauxExtraitSecMaxPct");
  const ph = parseNumber(p.ph, "ph");
  const dosageMinPct = parseNumber(p.dosageMinPct, "dosageMinPct");
  const dosageMaxPct = parseNumber(p.dosageMaxPct, "dosageMaxPct");

  // Brief: cible 35% à 40% (version liquide).
  if (tauxExtraitSecMinPct < 35 || tauxExtraitSecMaxPct < 35) {
    throw new Error("Taux extrait sec doit etre entre 35% et 40%");
  }
  if (tauxExtraitSecMinPct > 40 || tauxExtraitSecMaxPct > 40) {
    throw new Error("Taux extrait sec doit etre entre 35% et 40%");
  }
  if (tauxExtraitSecMinPct > tauxExtraitSecMaxPct) {
    throw new Error("tauxExtraitSecMinPct doit etre <= tauxExtraitSecMaxPct");
  }
  if (ph <= 0 || ph >= 14) {
    throw new Error("ph invalide");
  }
  // Brief: dosage recommande entre 0.5% et 4%.
  if (dosageMinPct < 0.5 || dosageMaxPct < 0.5) {
    throw new Error("dosageMinPct et dosageMaxPct doivent etre entre 0.5% et 4%");
  }
  if (dosageMinPct > 4 || dosageMaxPct > 4) {
    throw new Error("dosageMinPct et dosageMaxPct doivent etre entre 0.5% et 4%");
  }
  if (dosageMinPct > dosageMaxPct) {
    throw new Error("dosageMinPct doit etre <= dosageMaxPct");
  }

  const nutrition = p.nutrition;
  if (!nutrition || typeof nutrition !== "object") {
    throw new Error("nutrition invalide");
  }

  const nutritionRecord = nutrition as Record<string, unknown>;
  const liquide = nutritionRecord.LIQUIDE;
  const poudre = nutritionRecord.POUDRE;
  if (!liquide || !poudre) {
    throw new Error("nutrition doit contenir LIQUIDE et POUDRE");
  }

  function validateNutritionBlock(block: unknown, label: string) {
    const record = block as Record<string, unknown>;
    const requiredKeys: Array<keyof FicheTechnique["nutrition"]["LIQUIDE"]> = [
      "energieKcal",
      "proteinesG",
      "glucidesG",
      "dontSucresG",
      "lipidesG",
      "acidesGrasSaturesG",
      "selG",
      "omega3TotalG",
      "omega3EPA_G",
      "omega3DHA_G",
    ];
    for (const key of requiredKeys) {
      const v = record[key as string];
      if (typeof v !== "number" || !Number.isFinite(v) || v < 0) {
        throw new Error(`${label}.${String(key)} invalide`);
      }
    }
  }

  validateNutritionBlock(liquide, "nutrition.LIQUIDE");
  validateNutritionBlock(poudre, "nutrition.POUDRE");

  return payload as FicheTechnique;
}

