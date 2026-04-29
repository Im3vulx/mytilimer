import { Flag, Leaf, Sparkles } from "lucide-react";

export function HeroSection() {
  return (
    <section
      className="relative overflow-hidden bg-[#041326] text-[#F6F0E3]"
      aria-label="Presentation"
    >
      <div className="pointer-events-none absolute inset-0">
        {/* Degrades et lueurs pour l'univers bleu marine */}
        <div className="absolute -left-24 top-10 h-72 w-72 rounded-full bg-[#1B4D8A]/25 blur-3xl" />
        <div className="absolute right-0 top-32 h-80 w-80 rounded-full bg-[#0EA5E9]/15 blur-3xl" />
        <div className="absolute bottom-[-180px] left-1/2 h-96 w-[44rem] -translate-x-1/2 rounded-full bg-[#F6F0E3]/5 blur-3xl" />
      </div>

      <div className="relative mx-auto grid w-full max-w-6xl grid-cols-1 gap-8 px-4 py-12 sm:py-16 lg:grid-cols-12 lg:items-center">
        <div className="lg:col-span-7">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#F6F0E3]/20 bg-[#F6F0E3]/5 px-3 py-1 text-xs font-semibold uppercase tracking-wide">
            Concentre B2B pour l&apos;industrie agroalimentaire
          </div>

          <h1 className="mt-5 text-balance text-4xl font-semibold leading-[1.05] tracking-tight sm:text-5xl">
            Concentre de chair de moules de bouchot
            <span className="text-[#FFF8E7]">{" "}pour sublimer vos recettes</span>
          </h1>

          <p className="mt-4 max-w-xl text-pretty text-lg leading-relaxed text-[#F6F0E3]/85">
            Une base aromatique pensee pour la constance de gout, la lisibilite ingredient
            et la performance industrielle.
          </p>

          <div className="mt-7 grid grid-cols-1 gap-3 sm:grid-cols-3">
            <div className="flex items-start gap-3 rounded-2xl border border-[#F6F0E3]/15 bg-[#0B1B3A]/40 p-4">
              <div className="mt-1 flex h-10 w-10 items-center justify-center rounded-xl bg-[#F6F0E3]/10">
                <Flag className="h-5 w-5 text-[#FFF8E7]" aria-hidden="true" />
              </div>
              <div>
                <p className="text-sm font-semibold">100% Francais</p>
                <p className="mt-0.5 text-xs text-[#F6F0E3]/75">Origine controlee, approche filiere.</p>
              </div>
            </div>

            <div className="flex items-start gap-3 rounded-2xl border border-[#F6F0E3]/15 bg-[#0B1B3A]/40 p-4">
              <div className="mt-1 flex h-10 w-10 items-center justify-center rounded-xl bg-[#F6F0E3]/10">
                <Leaf className="h-5 w-5 text-[#FFF8E7]" aria-hidden="true" />
              </div>
              <div>
                <p className="text-sm font-semibold">Clean Label</p>
                <p className="mt-0.5 text-xs text-[#F6F0E3]/75">Des choix simples, comprehensibles.</p>
              </div>
            </div>

            <div className="flex items-start gap-3 rounded-2xl border border-[#F6F0E3]/15 bg-[#0B1B3A]/40 p-4">
              <div className="mt-1 flex h-10 w-10 items-center justify-center rounded-xl bg-[#F6F0E3]/10">
                <Sparkles className="h-5 w-5 text-[#FFF8E7]" aria-hidden="true" />
              </div>
              <div>
                <p className="text-sm font-semibold">Saveur Umami</p>
                <p className="mt-0.5 text-xs text-[#F6F0E3]/75">Une signature gustative maitrisee.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-5">
          <div className="rounded-3xl border border-[#F6F0E3]/15 bg-[#0B1B3A]/35 p-6">
            <h2 className="text-base font-semibold">Pret pour vos tests B2B</h2>
            <p className="mt-2 text-sm leading-relaxed text-[#F6F0E3]/80">
              Demandez un echantillon et recevez une proposition adaptee a votre cahier des charges.
            </p>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <a
                href="/api/contact"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[#F6F0E3] px-5 py-3 text-sm font-semibold text-[#041326] transition hover:bg-[#FFF8E7]"
              >
                Demander un echantillon
              </a>
              <a
                href="#product-process"
                className="inline-flex items-center justify-center rounded-full border border-[#F6F0E3]/25 bg-transparent px-5 py-3 text-sm font-semibold text-[#F6F0E3] transition hover:bg-[#F6F0E3]/10"
              >
                Voir le process
              </a>
            </div>

            <div className="mt-6 grid grid-cols-3 gap-3">
              {[
                { k: "Qualite", v: "constante" },
                { k: "Usage", v: "simple" },
                { k: "Gout", v: "umami" },
              ].map((item) => (
                <div
                  key={item.k}
                  className="rounded-2xl border border-[#F6F0E3]/10 bg-[#041326]/20 p-3"
                >
                  <p className="text-[11px] font-semibold uppercase tracking-wide text-[#F6F0E3]/70">
                    {item.k}
                  </p>
                  <p className="mt-1 text-sm font-semibold text-[#FFF8E7]">{item.v}</p>
                </div>
              ))}
            </div>
          </div>

          <p className="mt-4 text-xs text-[#F6F0E3]/60">
            Remarque: la demande d&apos;echantillon ouvrira un formulaire cote client lors de la phase suivante.
          </p>
        </div>
      </div>
    </section>
  );
}

