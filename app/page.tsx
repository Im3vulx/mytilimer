import { DosageCalculator, HeroSection, ProductProcess } from "@/components/ui";

export const metadata = {
  title:
    "Ingrédient Umami B2B - Valorisation coproduits marins | Concentré de moules",
  description:
    "Concentré de moules de bouchot pour industriels. Ingrédient Umami B2B, Clean Label et Valorisation coproduits marins. Calculez votre dosage recommandé (0,5% à 4%).",
};

export default function Home() {
  return (
    <main className="min-h-screen bg-[#041326]">
      <HeroSection />

      <section className="mx-auto w-full max-w-6xl px-4 py-12 text-[#F6F0E3] sm:px-6 sm:py-16">
        <div className="max-w-3xl">
          <h2 className="text-balance text-3xl font-semibold leading-tight sm:text-4xl">
            Ingrédient Umami B2B
          </h2>
          <p className="mt-3 text-pretty text-base leading-relaxed text-[#F6F0E3]/85">
            Une formulation simplifiée pour la saveur, avec une approche Clean Label
            et une Valorisation coproduits marins : le concentré de moules de
            bouchot pour vos sauces, soupes et plats cuisinés.
          </p>
        </div>

        <div className="mt-8">
          <DosageCalculator />
        </div>
      </section>

      <ProductProcess />
    </main>
  );
}
