import { Prisma } from "@prisma/client";
import type { NutritionIndicateur } from "@prisma/client";
import { getPrisma } from "@/lib/prisma";
import { defaultFicheTechnique } from "@/lib/ficheTechniqueDefaults";
import type { FicheTechnique } from "@/lib/ficheTechniqueTypes";

function decimalToNumber(value: Prisma.Decimal | number): number {
  if (typeof value === "number") return value;
  return value.toNumber();
}

function nutritionRowToDto(row: NutritionIndicateur) {
  return {
    energieKcal: decimalToNumber(row.energieKcal),
    proteinesG: decimalToNumber(row.proteinesG),
    glucidesG: decimalToNumber(row.glucidesG),
    dontSucresG: decimalToNumber(row.dontSucresG),
    lipidesG: decimalToNumber(row.lipidesG),
    acidesGrasSaturesG: decimalToNumber(row.acidesGrasSaturesG),
    selG: decimalToNumber(row.selG),
    omega3TotalG: decimalToNumber(row.omega3TotalG),
    omega3EPA_G: decimalToNumber(row.omega3EPA_G),
    omega3DHA_G: decimalToNumber(row.omega3DHA_G),
  };
}

export async function getOrCreateFicheTechnique(): Promise<FicheTechnique> {
  // Permet de builder/tester en local sans config DB.
  if (!process.env.DATABASE_URL) {
    const liquide = defaultFicheTechnique.nutrition.find((n) => n.format === "LIQUIDE");
    const poudre = defaultFicheTechnique.nutrition.find((n) => n.format === "POUDRE");
    if (!liquide || !poudre) throw new Error("Defaults nutrition incomplets");

    return {
      designationAutorisee: defaultFicheTechnique.designationAutorisee,
      tauxExtraitSecMinPct: defaultFicheTechnique.tauxExtraitSecMinPct,
      tauxExtraitSecMaxPct: defaultFicheTechnique.tauxExtraitSecMaxPct,
      ph: defaultFicheTechnique.ph,
      dosageMinPct: defaultFicheTechnique.dosageMinPct,
      dosageMaxPct: defaultFicheTechnique.dosageMaxPct,
      nutrition: {
        LIQUIDE: {
          energieKcal: liquide.energieKcal,
          proteinesG: liquide.proteinesG,
          glucidesG: liquide.glucidesG,
          dontSucresG: liquide.dontSucresG,
          lipidesG: liquide.lipidesG,
          acidesGrasSaturesG: liquide.acidesGrasSaturesG,
          selG: liquide.selG,
          omega3TotalG: liquide.omega3TotalG,
          omega3EPA_G: liquide.omega3EPA_G,
          omega3DHA_G: liquide.omega3DHA_G,
        },
        POUDRE: {
          energieKcal: poudre.energieKcal,
          proteinesG: poudre.proteinesG,
          glucidesG: poudre.glucidesG,
          dontSucresG: poudre.dontSucresG,
          lipidesG: poudre.lipidesG,
          acidesGrasSaturesG: poudre.acidesGrasSaturesG,
          selG: poudre.selG,
          omega3TotalG: poudre.omega3TotalG,
          omega3EPA_G: poudre.omega3EPA_G,
          omega3DHA_G: poudre.omega3DHA_G,
        },
      },
    };
  }

  const prisma = getPrisma();
  const existing = await prisma.parametresTechniques.findFirst({
    include: { nutrition: true },
  });

  if (existing) {
    const liquideRow = existing.nutrition.find((n) => n.format === "LIQUIDE");
    const poudreRow = existing.nutrition.find((n) => n.format === "POUDRE");

    if (liquideRow && poudreRow) {
      return {
        designationAutorisee: existing.designationAutorisee,
        tauxExtraitSecMinPct: decimalToNumber(existing.tauxExtraitSecMinPct),
        tauxExtraitSecMaxPct: decimalToNumber(existing.tauxExtraitSecMaxPct),
        ph: decimalToNumber(existing.ph),
        dosageMinPct: decimalToNumber(existing.dosageMinPct),
        dosageMaxPct: decimalToNumber(existing.dosageMaxPct),
        nutrition: {
          LIQUIDE: nutritionRowToDto(liquideRow),
          POUDRE: nutritionRowToDto(poudreRow),
        },
      };
    }
  }

  // Initialisation (premier deploy) avec les valeurs du brief.
  const created = await prisma.parametresTechniques.create({
    data: {
      id: 1,
      designationAutorisee: defaultFicheTechnique.designationAutorisee,
      tauxExtraitSecMinPct: new Prisma.Decimal(defaultFicheTechnique.tauxExtraitSecMinPct),
      tauxExtraitSecMaxPct: new Prisma.Decimal(defaultFicheTechnique.tauxExtraitSecMaxPct),
      ph: new Prisma.Decimal(defaultFicheTechnique.ph),
      dosageMinPct: new Prisma.Decimal(defaultFicheTechnique.dosageMinPct),
      dosageMaxPct: new Prisma.Decimal(defaultFicheTechnique.dosageMaxPct),
      nutrition: {
        create: defaultFicheTechnique.nutrition.map((n) => ({
          format: n.format,
          energieKcal: new Prisma.Decimal(n.energieKcal),
          proteinesG: new Prisma.Decimal(n.proteinesG),
          glucidesG: new Prisma.Decimal(n.glucidesG),
          dontSucresG: new Prisma.Decimal(n.dontSucresG),
          lipidesG: new Prisma.Decimal(n.lipidesG),
          acidesGrasSaturesG: new Prisma.Decimal(n.acidesGrasSaturesG),
          selG: new Prisma.Decimal(n.selG),
          omega3TotalG: new Prisma.Decimal(n.omega3TotalG),
          omega3EPA_G: new Prisma.Decimal(n.omega3EPA_G),
          omega3DHA_G: new Prisma.Decimal(n.omega3DHA_G),
        })),
      },
    },
    include: { nutrition: true },
  });

  const liquideRow = created.nutrition.find((n) => n.format === "LIQUIDE")!;
  const poudreRow = created.nutrition.find((n) => n.format === "POUDRE")!;

  return {
    designationAutorisee: created.designationAutorisee,
    tauxExtraitSecMinPct: decimalToNumber(created.tauxExtraitSecMinPct),
    tauxExtraitSecMaxPct: decimalToNumber(created.tauxExtraitSecMaxPct),
    ph: decimalToNumber(created.ph),
    dosageMinPct: decimalToNumber(created.dosageMinPct),
    dosageMaxPct: decimalToNumber(created.dosageMaxPct),
    nutrition: {
      LIQUIDE: nutritionRowToDto(liquideRow),
      POUDRE: nutritionRowToDto(poudreRow),
    },
  };
}

export async function updateFicheTechnique(input: FicheTechnique) {
  // No-op en local si la DB n'est pas configuree.
  if (!process.env.DATABASE_URL) return;

  // On garde un seul enregistrement de parametrage (id = 1).
  const id = 1;

  const prisma = getPrisma();
  return prisma.$transaction(async (tx) => {
    await tx.parametresTechniques.update({
      where: { id },
      data: {
        designationAutorisee: input.designationAutorisee,
        tauxExtraitSecMinPct: new Prisma.Decimal(input.tauxExtraitSecMinPct),
        tauxExtraitSecMaxPct: new Prisma.Decimal(input.tauxExtraitSecMaxPct),
        ph: new Prisma.Decimal(input.ph),
        dosageMinPct: new Prisma.Decimal(input.dosageMinPct),
        dosageMaxPct: new Prisma.Decimal(input.dosageMaxPct),
      },
    });

    const liquide = input.nutrition.LIQUIDE;
    const poudre = input.nutrition.POUDRE;

    await tx.nutritionIndicateur.upsert({
      where: {
        parametresTechniquesId_format: {
          parametresTechniquesId: id,
          format: "LIQUIDE",
        },
      },
      create: {
        format: "LIQUIDE",
        energieKcal: new Prisma.Decimal(liquide.energieKcal),
        proteinesG: new Prisma.Decimal(liquide.proteinesG),
        glucidesG: new Prisma.Decimal(liquide.glucidesG),
        dontSucresG: new Prisma.Decimal(liquide.dontSucresG),
        lipidesG: new Prisma.Decimal(liquide.lipidesG),
        acidesGrasSaturesG: new Prisma.Decimal(liquide.acidesGrasSaturesG),
        selG: new Prisma.Decimal(liquide.selG),
        omega3TotalG: new Prisma.Decimal(liquide.omega3TotalG),
        omega3EPA_G: new Prisma.Decimal(liquide.omega3EPA_G),
        omega3DHA_G: new Prisma.Decimal(liquide.omega3DHA_G),
        parametresTechniquesId: id,
      },
      update: {
        energieKcal: new Prisma.Decimal(liquide.energieKcal),
        proteinesG: new Prisma.Decimal(liquide.proteinesG),
        glucidesG: new Prisma.Decimal(liquide.glucidesG),
        dontSucresG: new Prisma.Decimal(liquide.dontSucresG),
        lipidesG: new Prisma.Decimal(liquide.lipidesG),
        acidesGrasSaturesG: new Prisma.Decimal(liquide.acidesGrasSaturesG),
        selG: new Prisma.Decimal(liquide.selG),
        omega3TotalG: new Prisma.Decimal(liquide.omega3TotalG),
        omega3EPA_G: new Prisma.Decimal(liquide.omega3EPA_G),
        omega3DHA_G: new Prisma.Decimal(liquide.omega3DHA_G),
      },
    });

    await tx.nutritionIndicateur.upsert({
      where: {
        parametresTechniquesId_format: {
          parametresTechniquesId: id,
          format: "POUDRE",
        },
      },
      create: {
        format: "POUDRE",
        energieKcal: new Prisma.Decimal(poudre.energieKcal),
        proteinesG: new Prisma.Decimal(poudre.proteinesG),
        glucidesG: new Prisma.Decimal(poudre.glucidesG),
        dontSucresG: new Prisma.Decimal(poudre.dontSucresG),
        lipidesG: new Prisma.Decimal(poudre.lipidesG),
        acidesGrasSaturesG: new Prisma.Decimal(poudre.acidesGrasSaturesG),
        selG: new Prisma.Decimal(poudre.selG),
        omega3TotalG: new Prisma.Decimal(poudre.omega3TotalG),
        omega3EPA_G: new Prisma.Decimal(poudre.omega3EPA_G),
        omega3DHA_G: new Prisma.Decimal(poudre.omega3DHA_G),
        parametresTechniquesId: id,
      },
      update: {
        energieKcal: new Prisma.Decimal(poudre.energieKcal),
        proteinesG: new Prisma.Decimal(poudre.proteinesG),
        glucidesG: new Prisma.Decimal(poudre.glucidesG),
        dontSucresG: new Prisma.Decimal(poudre.dontSucresG),
        lipidesG: new Prisma.Decimal(poudre.lipidesG),
        acidesGrasSaturesG: new Prisma.Decimal(poudre.acidesGrasSaturesG),
        selG: new Prisma.Decimal(poudre.selG),
        omega3TotalG: new Prisma.Decimal(poudre.omega3TotalG),
        omega3EPA_G: new Prisma.Decimal(poudre.omega3EPA_G),
        omega3DHA_G: new Prisma.Decimal(poudre.omega3DHA_G),
      },
    });
  });
}

