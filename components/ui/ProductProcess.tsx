import Image from "next/image";
import Link from "next/link";
import { Bubbles } from "./Bubbles";

const steps = [
  {
    idx: "01",
    title: "Sélection du bouchot",
    description:
      "Moules de bouchot françaises, sous-taille, sélectionnées à Cancale en Bretagne.",
    img: "/media/illustration/6.png",
    imgAlt: "Mains de pêcheur tenant une moule de bouchot fraîche",
  },
  {
    idx: "02",
    title: "Extraction & concentration",
    description:
      "Hydrolyse enzymatique maîtrisée — préserve les notes marines et la saveur umami.",
    img: "/media/illustration/9.png",
    imgAlt: "Machine industrielle de tri et d'extraction des moules",
  },
  {
    idx: "03",
    title: "Clean Label & contrôle",
    description:
      "Vérification qualité orientée usage industriel. Brevet FR3037481A1.",
    img: "/media/illustration/11.png",
    imgAlt: "Conditionnement des produits Mytilimer sur ligne de production",
  },
  {
    idx: "04",
    title: "Livraison B2B",
    description:
      "Conditionnement adapté : bidon 10L (liquide) ou sac PET 20kg (poudre).",
    img: "/media/illustration/12.png",
    imgAlt: "Vue aérienne du site de production Mytilimer à Cancale",
  },
] as const;

export function ProductProcess() {
  return (
    <section
      id="product-process"
      className="relative bg-surface px-4 py-12 sm:py-16"
      aria-label="Process de production"
    >
      <Bubbles />

      {/* Decorative blob */}
      <div
        className="pointer-events-none absolute inset-0 overflow-hidden"
        aria-hidden="true"
        style={{ opacity: "var(--blob-opacity)" }}
      >
        <svg
          className="absolute -right-16 top-1/2 w-[320px] -translate-y-1/2"
          viewBox="0 0 300 300"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{ animation: "blob-drift 20s 5s ease-in-out infinite" }}
        >
          <defs>
            <linearGradient id="processBlob" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#F0B27A" />
              <stop offset="100%" stopColor="#2ECECE" />
            </linearGradient>
          </defs>
          <path
            d="M160,25 C220,5,290,58,278,148 C266,238,188,295,110,280 C32,265,-8,184,20,106 C48,28,105,42,160,25 Z"
            fill="url(#processBlob)"
          />
        </svg>
      </div>

      <div className="relative mx-auto w-full max-w-6xl">
        <div className="max-w-2xl">
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
            Process de fabrication
          </div>
          <h2
            className="mt-4 text-balance text-3xl leading-tight sm:text-4xl"
            style={{
              fontFamily: "var(--font-fraunces), serif",
              fontStyle: "italic",
              color: "var(--color-brand)",
            }}
          >
            Du moule au concentré,{" "}
            <span style={{ fontStyle: "normal" }}>une méthode claire.</span>
          </h2>
          <p
            className="mt-3 text-pretty text-base leading-relaxed opacity-75"
            style={{ color: "var(--color-body)" }}
          >
            Un process pensé pour l&apos;agroalimentaire : ingrédients simples, constance
            de goût, efficacité opérationnelle.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step) => (
            <div
              key={step.idx}
              className="group relative overflow-hidden rounded-2xl transition-transform duration-300 hover:-translate-y-1"
              style={{
                border: "1px solid var(--border-faint)",
                background: "var(--border-faint)",
              }}
            >
              {/* Photo header */}
              <div className="relative h-44 overflow-hidden">
                <Image
                  src={step.img}
                  alt={step.imgAlt}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
                {/* Gradient overlay */}
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(to bottom, transparent 40%, rgba(10,10,60,0.75) 100%)",
                  }}
                />
                {/* Step number badge over photo */}
                <span
                  className="absolute left-3 top-3 rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest"
                  style={{
                    background: "rgba(10,10,60,0.65)",
                    border: "1px solid rgba(246,222,184,0.25)",
                    color: "#F6DEB8",
                    backdropFilter: "blur(6px)",
                  }}
                >
                  {step.idx}
                </span>
              </div>

              {/* Text content */}
              <div className="p-4">
                <h3
                  className="text-base font-semibold"
                  style={{ color: "var(--color-brand)" }}
                >
                  {step.title}
                </h3>
                <p
                  className="mt-2 text-sm leading-relaxed opacity-72"
                  style={{ color: "var(--color-body)" }}
                >
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA strip */}
        <div
          className="mt-10 flex flex-col gap-3 rounded-2xl p-5 sm:flex-row sm:items-center sm:justify-between"
          style={{
            border: "1px solid var(--border-soft)",
            background: "var(--border-faint)",
          }}
        >
          <div>
            <p className="text-sm font-semibold" style={{ color: "var(--color-brand)" }}>
              Un résultat mesuré
            </p>
            <p className="mt-1 text-sm opacity-70" style={{ color: "var(--color-body)" }}>
              Pour vos recettes, vos process et vos exigences industrielles.
            </p>
          </div>
          <Link
            href="/contact"
            className="inline-flex shrink-0 items-center justify-center rounded-full px-5 py-3 text-sm font-semibold transition-opacity hover:opacity-85"
            style={{
              background: "var(--color-brand)",
              color: "var(--color-canvas)",
            }}
          >
            Parler à un expert
          </Link>
        </div>
      </div>
    </section>
  );
}
