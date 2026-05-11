import Image from "next/image";
import { Flag, Leaf, Sparkles, Info } from "lucide-react";
import { Bubbles } from "./Bubbles";

const features = [
  {
    icon: Flag,
    title: "100% Français",
    desc: "Moules de bouchot, littoral français.",
    tooltip:
      "Coproduit issu de moules de bouchot (Mytilus Edulis) sous-taille, élevées sur le littoral français. Fabriqué à Cancale en Bretagne (atelier Kerbone). Brevet FR3037481A1.",
  },
  {
    icon: Leaf,
    title: "Clean Label",
    desc: "Listes d'ingrédients simplifiées.",
    tooltip:
      "Aucun additif ni exhausteur artificiel. Remplace fumets et additifs. Étiquetage : « extrait de moule » ou « arôme naturel de moule » (CE n°1334/2088).",
  },
  {
    icon: Sparkles,
    title: "Saveur Umami",
    desc: "Notes marines et iodées concentrées.",
    tooltip:
      "Concentration à 40%. Dosage d'incorporation 0,5–4% selon l'application. Renforce les notes marines et crustacés, abaisse le taux de sel sans compromettre le goût.",
  },
] as const;

export function HeroSection() {
  return (
    <section
      className="relative bg-canvas text-body"
      aria-label="Présentation"
    >
      <Bubbles />

      {/* Animated blobs — no overflow-hidden so they bleed into next section */}
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden="true"
        style={{ opacity: "var(--blob-opacity)" }}
      >
        <svg
          className="absolute -right-28 -top-16 w-[640px]"
          viewBox="0 0 500 500"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{ animation: "blob-drift 18s ease-in-out infinite" }}
        >
          <defs>
            <linearGradient id="heroBlob1" x1="10%" y1="0%" x2="90%" y2="100%">
              <stop offset="0%" stopColor="#F0B27A" />
              <stop offset="45%" stopColor="#2ECECE" />
              <stop offset="100%" stopColor="#1A4BBD" />
            </linearGradient>
          </defs>
          <path
            d="M270,18 C345,-4,448,54,468,178 C488,302,428,418,302,448 C176,478,58,418,26,292 C-6,166,58,52,178,18 C214,6,242,28,270,18 Z"
            fill="url(#heroBlob1)"
          />
        </svg>
        <svg
          className="absolute -bottom-32 -left-12 w-[380px]"
          viewBox="0 0 300 300"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{ animation: "blob-drift 22s 3s ease-in-out infinite reverse" }}
        >
          <defs>
            <linearGradient id="heroBlob2" x1="100%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#2ECECE" />
              <stop offset="100%" stopColor="#1A4BBD" />
            </linearGradient>
          </defs>
          <path
            d="M155,28 C215,8,285,62,278,152 C271,242,192,298,112,282 C32,266,-8,184,18,104 C44,24,100,44,155,28 Z"
            fill="url(#heroBlob2)"
          />
        </svg>
      </div>

      {/* ── Two-column hero ── */}
      <div className="relative mx-auto grid w-full max-w-6xl grid-cols-1 gap-8 px-4 pt-12 sm:pt-16 lg:grid-cols-12 lg:items-start">
        {/* Left — copy */}
        <div className="lg:col-span-7">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/media/logo_mytilimerpro_RVB.png"
            alt="Mytilimer Professionnel"
            className="h-14 w-auto object-contain"
          />

          <div
            className="mt-4 inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-semibold uppercase tracking-widest"
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
            Ingrédient · B2B · Origine France
          </div>

          <h1
            className="mt-4 text-balance text-4xl leading-[1.08] tracking-tight sm:text-[3.2rem]"
            style={{
              fontFamily: "var(--font-fraunces), serif",
              fontStyle: "italic",
              color: "var(--color-brand)",
            }}
          >
            Concentré de chair
            <br />
            <span style={{ fontStyle: "normal" }}>de moules de bouchot</span>
          </h1>

          <p
            className="mt-3 text-xl font-semibold"
            style={{
              background: "linear-gradient(90deg, #C8924A 0%, #1E9E9E 55%, #3B72CC 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            La 5ème saveur, concentrée.
          </p>

          <p className="mt-4 max-w-xl text-pretty text-base leading-relaxed text-body opacity-80">
            Une base aromatique marine et umami pour industriels agroalimentaires et
            aromaticiens — Clean Label, 100% Français, Brevet FR3037481A1.
          </p>

          {/* Feature badges */}
          <div className="mt-7 grid grid-cols-1 gap-3 sm:grid-cols-3">
            {features.map(({ icon: Icon, title, desc, tooltip }) => (
              <div key={title} className="group relative">
                <div
                  className="flex cursor-default items-start gap-3 rounded-2xl p-4 transition-all"
                  style={{
                    border: "1px solid var(--border-faint)",
                    background: "var(--border-faint)",
                  }}
                >
                  <Info
                    className="absolute right-3 top-3 h-3.5 w-3.5 opacity-30 transition-opacity group-hover:opacity-70"
                    style={{ color: "var(--color-brand)" }}
                    aria-hidden="true"
                  />
                  <div
                    className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg"
                    style={{
                      background: "var(--border-soft)",
                      border: "1px solid var(--border-faint)",
                    }}
                  >
                    <Icon className="h-4 w-4" style={{ color: "var(--color-brand)" }} aria-hidden="true" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold" style={{ color: "var(--color-brand)" }}>
                      {title}
                    </p>
                    <p className="mt-0.5 text-xs leading-relaxed opacity-65" style={{ color: "var(--color-body)" }}>
                      {desc}
                    </p>
                  </div>
                </div>
                <div
                  className="pointer-events-none absolute bottom-full left-0 z-20 mb-2 w-72 scale-95 rounded-xl p-4 text-xs leading-relaxed opacity-0 shadow-xl transition-all duration-200 group-hover:scale-100 group-hover:opacity-100"
                  style={{
                    background: "var(--color-surface)",
                    border: "1px solid var(--border-soft)",
                    color: "var(--color-body)",
                  }}
                  role="tooltip"
                >
                  {tooltip}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right — product photo only */}
        <div className="lg:col-span-5">
          <div
            className="relative overflow-hidden rounded-3xl"
            style={{
              aspectRatio: "4/5",
              animation: "float 8s ease-in-out infinite",
              border: "1px solid var(--border-soft)",
            }}
          >
            <Image
              src="/media/illustration/3.png"
              alt="Concentré de moules de bouchot — forme liquide et poudre"
              fill
              className="object-cover"
              priority
              sizes="(max-width: 1024px) 100vw, 40vw"
            />
            <div
              className="absolute inset-x-0 bottom-0 h-24"
              style={{
                background: "linear-gradient(to top, rgba(10,10,80,0.72) 0%, transparent 100%)",
              }}
            />
            <p className="absolute bottom-4 left-4 right-4 text-xs font-medium text-white opacity-80">
              Forme liquide et poudre — deux formats B2B disponibles
            </p>
          </div>
        </div>
      </div>

      {/* ── Full-width CTA strip ── */}
      <div className="relative mx-auto w-full max-w-6xl px-4 pb-12 pt-6 sm:pb-16">
        <div
          className="rounded-3xl p-px"
          style={{ background: "var(--border-soft)" }}
        >
          <div
            className="rounded-[calc(1.5rem-1px)] p-6 sm:p-8"
            style={{ background: "var(--color-surface)" }}
          >
            <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
              {/* Left text */}
              <div className="max-w-xl">
                <p
                  className="text-xs font-semibold uppercase tracking-widest opacity-55"
                  style={{ color: "var(--color-brand)" }}
                >
                  Prêt pour vos tests B2B
                </p>
                <h2
                  className="mt-1 text-xl font-semibold sm:text-2xl"
                  style={{
                    fontFamily: "var(--font-fraunces), serif",
                    color: "var(--color-brand)",
                  }}
                >
                  Demandez un échantillon
                </h2>
                <p
                  className="mt-2 text-sm leading-relaxed opacity-72"
                  style={{ color: "var(--color-body)" }}
                >
                  Proposition adaptée à votre cahier des charges — dosage, format
                  liquide ou poudre, volume et délais.
                </p>
              </div>

              {/* Right: specs + buttons */}
              <div className="flex flex-col gap-4 sm:items-end">
                <div className="flex flex-wrap gap-2">
                  {[
                    { k: "Concentration", v: "40%" },
                    { k: "Dosage", v: "0,5–4%" },
                    { k: "Format", v: "Liq. & Poudre" },
                  ].map((item) => (
                    <div
                      key={item.k}
                      className="rounded-xl px-3 py-2 text-center"
                      style={{
                        border: "1px solid var(--border-faint)",
                        background: "var(--border-faint)",
                      }}
                    >
                      <p
                        className="text-[9px] font-semibold uppercase tracking-wide opacity-48"
                        style={{ color: "var(--color-brand)" }}
                      >
                        {item.k}
                      </p>
                      <p className="text-sm font-semibold" style={{ color: "var(--color-brand)" }}>
                        {item.v}
                      </p>
                    </div>
                  ))}
                </div>
                <div className="flex flex-wrap gap-3">
                  <a
                    href="/contact"
                    className="inline-flex items-center justify-center rounded-full px-5 py-2.5 text-sm font-semibold transition-opacity hover:opacity-85"
                    style={{ background: "var(--color-brand)", color: "var(--color-canvas)" }}
                  >
                    Contacter notre équipe
                  </a>
                  <a
                    href="#product-process"
                    className="inline-flex items-center justify-center rounded-full px-5 py-2.5 text-sm font-semibold transition opacity-[0.82] hover:opacity-100"
                    style={{ border: "1px solid var(--border-soft)", color: "var(--color-brand)" }}
                  >
                    Voir le process
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
