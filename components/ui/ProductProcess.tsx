import { CheckCircle2, Leaf, Factory, Truck } from "lucide-react";

const steps = [
  {
    idx: "01",
    title: "Selection du bouchot",
    description: "Matiere premiere soigneusement choisie pour une base aromatique fidele.",
    icon: Leaf,
  },
  {
    idx: "02",
    title: "Extraction & concentration",
    description: "Un procede maitrise pour preservier les notes et la lisibilite ingredient.",
    icon: Factory,
  },
  {
    idx: "03",
    title: "Clean Label & controle",
    description: "Une verification orientee usage industriel et qualite constante.",
    icon: CheckCircle2,
  },
  {
    idx: "04",
    title: "Livraison B2B",
    description: "Consolidation, conditionnement et remise sur planification.",
    icon: Truck,
  },
] as const;

export function ProductProcess() {
  return (
    <section
      id="product-process"
      className="bg-[#06162B] px-4 py-12 text-[#F6F0E3] sm:py-16"
      aria-label="Process de production"
    >
      <div className="mx-auto w-full max-w-6xl">
        <div className="max-w-2xl">
          <p className="inline-flex items-center gap-2 rounded-full border border-[#F6F0E3]/20 bg-[#F6F0E3]/5 px-3 py-1 text-xs font-semibold uppercase tracking-wide">
            Product process
          </p>
          <h2 className="mt-4 text-balance text-3xl font-semibold leading-tight sm:text-4xl">
            Du moule au concentre : une methode claire.
          </h2>
          <p className="mt-3 text-pretty text-base leading-relaxed text-[#F6F0E3]/80">
            Un pipeline pense pour l&apos;agroalimentaire : simplicite des ingredients, constance
            de gout, et efficacite operationnelle.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step) => {
            const Icon = step.icon;
            return (
              <div
                key={step.idx}
                className="relative overflow-hidden rounded-2xl border border-[#F6F0E3]/15 bg-[#0B1B3A]/35 p-5"
              >
                <div className="absolute -right-10 -top-10 h-24 w-24 rounded-full bg-[#0EA5E9]/10 blur-2xl" />
                <div className="relative flex items-start gap-3">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-[#F6F0E3]/15 bg-[#041326]/50">
                    <Icon className="h-5 w-5 text-[#FFF8E7]" aria-hidden="true" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-semibold uppercase tracking-widest text-[#F6F0E3]/60">
                      {step.idx}
                    </p>
                    <h3 className="mt-1 text-base font-semibold">{step.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-[#F6F0E3]/80">
                      {step.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-10 flex flex-col gap-3 rounded-2xl border border-[#F6F0E3]/15 bg-[#041326]/30 p-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-semibold">Un resultat mesure</p>
            <p className="mt-1 text-sm text-[#F6F0E3]/75">
              Pour vos recettes, vos process, et vos exigences industrielles.
            </p>
          </div>
          <a
            href="/contact"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-[#F6F0E3] px-5 py-3 text-sm font-semibold text-[#041326] transition hover:bg-[#FFF8E7]"
          >
            Parler a un expert
          </a>
        </div>
      </div>
    </section>
  );
}

