-- CreateEnum
CREATE TYPE "FormatNutrition" AS ENUM ('LIQUIDE', 'POUDRE');

-- CreateTable
CREATE TABLE "ParametresTechniques" (
    "id" INTEGER NOT NULL DEFAULT 1,
    "designationAutorisee" TEXT NOT NULL,
    "tauxExtraitSecMinPct" DECIMAL(5,2) NOT NULL,
    "tauxExtraitSecMaxPct" DECIMAL(5,2) NOT NULL,
    "ph" DECIMAL(3,1) NOT NULL,
    "dosageMinPct" DECIMAL(4,2) NOT NULL,
    "dosageMaxPct" DECIMAL(4,2) NOT NULL,

    CONSTRAINT "ParametresTechniques_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "NutritionIndicateur" (
    "id" SERIAL NOT NULL,
    "format" "FormatNutrition" NOT NULL,
    "energieKcal" DECIMAL(6,1) NOT NULL,
    "proteinesG" DECIMAL(6,2) NOT NULL,
    "glucidesG" DECIMAL(6,2) NOT NULL,
    "dontSucresG" DECIMAL(6,2) NOT NULL,
    "lipidesG" DECIMAL(6,2) NOT NULL,
    "acidesGrasSaturesG" DECIMAL(6,2) NOT NULL,
    "selG" DECIMAL(6,2) NOT NULL,
    "omega3TotalG" DECIMAL(6,2) NOT NULL,
    "omega3EPA_G" DECIMAL(6,2) NOT NULL,
    "omega3DHA_G" DECIMAL(6,2) NOT NULL,
    "parametresTechniquesId" INTEGER NOT NULL,

    CONSTRAINT "NutritionIndicateur_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "NutritionIndicateur_parametresTechniquesId_format_key" ON "NutritionIndicateur"("parametresTechniquesId", "format");

-- AddForeignKey
ALTER TABLE "NutritionIndicateur" ADD CONSTRAINT "NutritionIndicateur_parametresTechniquesId_fkey" FOREIGN KEY ("parametresTechniquesId") REFERENCES "ParametresTechniques"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
