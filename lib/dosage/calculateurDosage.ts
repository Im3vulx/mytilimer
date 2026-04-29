export type DosageCalculatorInput = {
  /**
   * Quantite totale du produit final (en kg).
   */
  quantiteProduitKg: number;
  /**
   * Taux cible de concentré (en % massique du produit final).
   * Exemple: 12 = 12% du poids total.
   */
  tauxConcentrePourcentMassique: number;
};

export type DosageCalculatorResult = {
  /**
   * Quantite de concentré à incorporer (en kg).
   */
  masseConcentreKg: number;
  /**
   * Quantite de base à compléter (en kg).
   */
  masseBaseKg: number;
};

function assertFiniteNumber(value: unknown, fieldName: string): asserts value is number {
  if (typeof value !== "number" || !Number.isFinite(value)) {
    throw new Error(`Champ invalide: ${fieldName}`);
  }
}

/**
 * Calcul simple basé sur un pourcentage massique.
 * (Sera étendu selon les paramètres métiers réels.)
 */
export function calculerDosage(input: DosageCalculatorInput): DosageCalculatorResult {
  const { quantiteProduitKg, tauxConcentrePourcentMassique } = input;

  assertFiniteNumber(quantiteProduitKg, "quantiteProduitKg");
  assertFiniteNumber(tauxConcentrePourcentMassique, "tauxConcentrePourcentMassique");

  if (quantiteProduitKg < 0) throw new Error("quantiteProduitKg doit etre >= 0");
  if (tauxConcentrePourcentMassique < 0 || tauxConcentrePourcentMassique > 100) {
    throw new Error("tauxConcentrePourcentMassique doit etre entre 0 et 100");
  }

  const masseConcentreKg = (quantiteProduitKg * tauxConcentrePourcentMassique) / 100;
  const masseBaseKg = quantiteProduitKg - masseConcentreKg;

  return { masseConcentreKg, masseBaseKg };
}

