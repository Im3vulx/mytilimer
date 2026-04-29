export type FormatNutrition = "LIQUIDE" | "POUDRE";

export type Nutrition100g = {
  energieKcal: number;
  proteinesG: number;
  glucidesG: number;
  dontSucresG: number;
  lipidesG: number;
  acidesGrasSaturesG: number;
  selG: number;
  omega3TotalG: number;
  omega3EPA_G: number;
  omega3DHA_G: number;
};

export type FicheTechniqueNutrition = {
  LIQUIDE: Nutrition100g;
  POUDRE: Nutrition100g;
};

export type FicheTechnique = {
  designationAutorisee: string;
  tauxExtraitSecMinPct: number;
  tauxExtraitSecMaxPct: number;
  ph: number;
  dosageMinPct: number;
  dosageMaxPct: number;
  nutrition: FicheTechniqueNutrition;
};

