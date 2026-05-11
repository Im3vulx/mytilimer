"use client";

import React, { useState } from "react";
import { Bubbles } from "@/components/ui";

export default function ContactPage() {
  const [status, setStatus] = useState<{
    type: "success" | "error" | null;
    msg: string;
  }>({ type: null, msg: "" });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setStatus({ type: null, msg: "" });

    const formData = new FormData(e.currentTarget);
    const payload = {
      companyName: formData.get("companyName"),
      contactName: formData.get("contactName"),
      email: formData.get("email"),
      message: formData.get("message"),
    };

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (response.ok) {
        setStatus({ type: "success", msg: "Votre demande a été envoyée avec succès !" });
        (e.target as HTMLFormElement).reset();
      } else {
        setStatus({ type: "error", msg: result.error || "Une erreur est survenue." });
      }
    } catch {
      setStatus({ type: "error", msg: "Impossible de joindre le serveur." });
    } finally {
      setLoading(false);
    }
  };

  const inputClass = "rounded-xl px-4 py-3 text-sm outline-none transition focus:ring-1";

  return (
    <section
      className="relative px-4 py-14 sm:px-6 bg-canvas"
      style={{ minHeight: "calc(100dvh - 57px)" }}
    >
      <Bubbles prominent />

      {/* Background blob */}
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden="true"
        style={{ opacity: "var(--blob-opacity)" }}
      >
        <svg
          className="absolute -right-24 -top-12 w-[480px]"
          viewBox="0 0 400 400"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="contactBlob" x1="10%" y1="0%" x2="90%" y2="100%">
              <stop offset="0%" stopColor="#F0B27A" />
              <stop offset="50%" stopColor="#2ECECE" />
              <stop offset="100%" stopColor="#1A4BBD" />
            </linearGradient>
          </defs>
          <path
            d="M215,15 C280,-5,360,48,375,150 C390,252,330,355,215,370 C100,385,15,315,15,200 C15,85,100,32,180,16 C197,12,208,18,215,15 Z"
            fill="url(#contactBlob)"
          />
        </svg>
      </div>

      <div className="relative mx-auto w-full max-w-2xl">
        {/* Header */}
        <div className="mb-10">
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
            Contact B2B
          </div>
          <h1
            className="mt-4 text-3xl sm:text-4xl"
            style={{
              fontFamily: "var(--font-fraunces), serif",
              fontStyle: "italic",
              color: "var(--color-brand)",
            }}
          >
            Parlez à notre équipe
          </h1>
          <p className="mt-3 text-base leading-relaxed opacity-72" style={{ color: "var(--color-body)" }}>
            Demande d&apos;échantillon, cahier des charges, dosage — nos experts vous répondent.
          </p>
        </div>

        {/* Form card */}
        <div
          className="rounded-3xl p-px"
          style={{ background: "var(--border-soft)" }}
        >
          <div
            className="rounded-[calc(1.5rem-1px)] p-6 sm:p-8"
            style={{ background: "var(--color-surface)" }}
          >
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                <div className="flex flex-col gap-2">
                  <label htmlFor="companyName" className="text-sm font-semibold" style={{ color: "var(--color-brand)" }}>
                    Entreprise *
                  </label>
                  <input
                    id="companyName"
                    name="companyName"
                    type="text"
                    required
                    placeholder="Ex: Arômes & Co."
                    className={inputClass}
                    style={{
                      border: "1px solid var(--border-faint)",
                      background: "var(--color-canvas)",
                      color: "var(--color-brand)",
                    }}
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="contactName" className="text-sm font-semibold" style={{ color: "var(--color-brand)" }}>
                    Nom du contact
                  </label>
                  <input
                    id="contactName"
                    name="contactName"
                    type="text"
                    placeholder="Ex: Jean Dupont"
                    className={inputClass}
                    style={{
                      border: "1px solid var(--border-faint)",
                      background: "var(--color-canvas)",
                      color: "var(--color-brand)",
                    }}
                  />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="email" className="text-sm font-semibold" style={{ color: "var(--color-brand)" }}>
                  Email professionnel *
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  placeholder="jean@entreprise.com"
                  className={inputClass}
                  style={{
                    border: "1px solid var(--border-faint)",
                    background: "var(--color-canvas)",
                    color: "var(--color-brand)",
                  }}
                />
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="message" className="text-sm font-semibold" style={{ color: "var(--color-brand)" }}>
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={4}
                  placeholder="Décrivez votre besoin, application visée, volume estimé…"
                  className={`${inputClass} resize-none`}
                  style={{
                    border: "1px solid var(--border-faint)",
                    background: "var(--color-canvas)",
                    color: "var(--color-brand)",
                  }}
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-full py-3.5 text-sm font-semibold transition-opacity hover:opacity-85 disabled:opacity-60"
                style={{
                  background: "var(--color-brand)",
                  color: "var(--color-canvas)",
                }}
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="h-4 w-4 animate-spin" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Envoi en cours…
                  </span>
                ) : (
                  "Envoyer ma demande"
                )}
              </button>

              {status.msg && (
                <div
                  className="rounded-xl p-4 text-sm text-center font-medium"
                  style={{
                    border: `1px solid ${status.type === "success" ? "rgba(46,206,206,0.3)" : "rgba(239,68,68,0.3)"}`,
                    background: status.type === "success" ? "rgba(46,206,206,0.10)" : "rgba(239,68,68,0.10)",
                    color: status.type === "success" ? "#2ECECE" : "#f87171",
                  }}
                >
                  {status.msg}
                </div>
              )}
            </form>
          </div>
        </div>

        <p className="mt-6 text-center text-xs opacity-40" style={{ color: "var(--color-body)" }}>
          Mytilimer Professionnel — 22 Rue de l&apos;Huîtrier, 35260 Cancale
        </p>
      </div>
    </section>
  );
}
