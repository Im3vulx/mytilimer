import { AnalyticsTracker, DosageCalculator, HeroSection, ProductProcess } from "@/components/ui";

export const metadata = {
  title:
    "Ingrédient Umami B2B — Concentré de Moules de Bouchot | Mytilimer Professionnel",
  description:
    "Concentré de moules de bouchot pour industriels. Ingrédient Umami B2B, Clean Label et valorisation coproduits marins. Calculez votre dosage recommandé (0,5% à 4%).",
};

export default function Home() {
  return (
    <main className="min-h-screen bg-canvas">
      <AnalyticsTracker page="/" />
      <HeroSection />

      <section
        id="dosage"
        className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6 sm:py-16"
      >
        <div className="max-w-3xl">
          <div
            className="inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-semibold uppercase tracking-widest"
            style={{
              border: "1px solid var(--border-soft)",
              background: "var(--border-faint)",
              color: "var(--color-brand)",
            }}
          >
            <span
              className="inline-block h-1.5 w-1.5 rounded-full"
              style={{ background: "linear-gradient(135deg, #F0B27A, #2ECECE)" }}
            />
            Outil B2B
          </div>
          <h2
            className="mt-4 text-balance text-3xl leading-tight sm:text-4xl"
            style={{
              fontFamily: "var(--font-fraunces), serif",
              fontStyle: "italic",
              color: "var(--color-brand)",
            }}
          >
            Ingrédient Umami B2B
          </h2>
          <p className="mt-3 text-pretty text-base leading-relaxed opacity-78" style={{ color: "var(--color-body)" }}>
            Formulation simplifiée pour la saveur, approche Clean Label et valorisation
            coproduits marins : le concentré de moules de bouchot pour vos sauces,
            soupes et plats cuisinés.
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
