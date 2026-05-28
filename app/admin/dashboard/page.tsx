import { getPrisma } from "@/lib/prisma";
import { HeatmapSection } from "./HeatmapSection";
import { Activity, FileText, LogOut, MousePointer, Users } from "lucide-react";
import { requireAuth, SESSION_COOKIE } from "@/lib/auth";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";
export const revalidate = 0;

const INTENSITY_LABELS: Record<string, string> = {
  delicat: "Délicat (0.5%)",
  leger: "Léger (1.0%)",
  prononce: "Prononcé (2.0%)",
  intense: "Intense (3.5%)",
  manuel: "Taux manuel",
};

const INTENSITY_COLORS: Record<string, string> = {
  delicat: "bg-sky-500",
  leger: "bg-cyan-500",
  prononce: "bg-amber-500",
  intense: "bg-red-500",
  manuel: "bg-violet-500",
};

function batchBucket(kg: number) {
  if (kg < 5) return "< 5 kg";
  if (kg < 20) return "5–20 kg";
  if (kg < 100) return "20–100 kg";
  return "> 100 kg";
}

const BUCKET_ORDER = ["< 5 kg", "5–20 kg", "20–100 kg", "> 100 kg"];

export default async function AdminDashboard() {
  await requireAuth();

  async function logout() {
    "use server";
    (await cookies()).delete(SESSION_COOKIE);
    redirect("/admin/login");
  }

  const prisma = getPrisma();

  const [leads, events, dosageEvents] = await Promise.all([
    prisma.contactLead.findMany({ orderBy: { createdAt: "desc" }, take: 10 }),
    prisma.clickEvent.findMany({ where: { page: "/" }, select: { xPct: true, yPct: true, type: true } }),
    prisma.dosageCalcEvent.findMany({ orderBy: { createdAt: "desc" } }),
  ]);

  const [totalLeads, totalDosage] = await Promise.all([
    prisma.contactLead.count(),
    prisma.dosageCalcEvent.count(),
  ]);

  const totalEvents = events.length;

  const avgBatch =
    dosageEvents.length > 0
      ? dosageEvents.reduce((s, e) => s + e.poidsTotalKg, 0) / dosageEvents.length
      : 0;

  const intensityCounts = dosageEvents.reduce<Record<string, number>>((acc, e) => {
    acc[e.intensityId] = (acc[e.intensityId] ?? 0) + 1;
    return acc;
  }, {});
  const maxIntensityCount = Math.max(...Object.values(intensityCounts), 1);

  const batchCounts = dosageEvents.reduce<Record<string, number>>((acc, e) => {
    const b = batchBucket(e.poidsTotalKg);
    acc[b] = (acc[b] ?? 0) + 1;
    return acc;
  }, {});
  const maxBatchCount = Math.max(...Object.values(batchCounts), 1);

  return (
    <div className="min-h-screen p-6 lg:p-8" style={{ background: "var(--color-canvas)" }}>
      <div className="max-w-7xl mx-auto space-y-8">

        {/* Header */}
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight" style={{ color: "var(--color-brand)" }}>
              Console Mytilimer
            </h1>
            <p className="text-sm mt-1 opacity-55" style={{ color: "var(--color-brand)" }}>
              Données collectées en temps réel sur la vitrine B2B
            </p>
          </div>
          <form action={logout}>
            <button
              type="submit"
              className="flex items-center gap-1.5 rounded-xl px-3 py-2 text-xs font-medium transition-opacity hover:opacity-70 shrink-0"
              style={{ border: "1px solid var(--border-soft)", color: "var(--color-brand)" }}
            >
              <LogOut size={13} />
              Déconnexion
            </button>
          </form>
        </div>

        {/* Stat cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard icon={<Users size={18} />} label="Leads contacts" value={totalLeads} accent="text-emerald-500" />
          <StatCard icon={<Activity size={18} />} label="Simulations dosage" value={totalDosage} accent="text-cyan-500" />
          <StatCard icon={<MousePointer size={18} />} label="Événements homepage" value={totalEvents} accent="text-violet-400" />
          <StatCard
            icon={<FileText size={18} />}
            label="Taille moy. recette"
            value={avgBatch > 0 ? `${avgBatch.toFixed(1)} kg` : "—"}
            accent="text-amber-500"
          />
        </div>

        {/* Middle row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

          {/* Contact leads */}
          <div
            className="rounded-2xl overflow-hidden"
            style={{ border: "1px solid var(--border-soft)", background: "var(--color-surface)" }}
          >
            <div
              className="px-5 py-4 flex items-center justify-between"
              style={{ borderBottom: "1px solid var(--border-faint)" }}
            >
              <h2 className="font-semibold text-sm" style={{ color: "var(--color-brand)" }}>Derniers leads</h2>
              <span className="text-xs opacity-45" style={{ color: "var(--color-brand)" }}>{totalLeads} total</span>
            </div>
            {leads.length === 0 ? (
              <p className="px-5 py-8 text-sm text-center opacity-40" style={{ color: "var(--color-brand)" }}>
                Aucun lead encore enregistré
              </p>
            ) : (
              <div style={{ borderTop: `1px solid transparent` }}>
                {leads.map((lead) => (
                  <div
                    key={lead.id}
                    className="px-5 py-3"
                    style={{ borderBottom: "1px solid var(--border-faint)" }}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0">
                        <p className="font-semibold text-sm truncate" style={{ color: "var(--color-brand)" }}>
                          {lead.companyName}
                        </p>
                        <p className="text-xs truncate opacity-55" style={{ color: "var(--color-brand)" }}>
                          {lead.email}
                        </p>
                      </div>
                      <time className="text-xs shrink-0 opacity-40" style={{ color: "var(--color-brand)" }}>
                        {new Date(lead.createdAt).toLocaleDateString("fr-FR", { day: "2-digit", month: "short" })}
                      </time>
                    </div>
                    <p className="text-xs mt-1 line-clamp-1 opacity-55" style={{ color: "var(--color-body)" }}>
                      {lead.message}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Dosage analytics */}
          <div
            className="rounded-2xl overflow-hidden"
            style={{ border: "1px solid var(--border-soft)", background: "var(--color-surface)" }}
          >
            <div
              className="px-5 py-4"
              style={{ borderBottom: "1px solid var(--border-faint)" }}
            >
              <h2 className="font-semibold text-sm" style={{ color: "var(--color-brand)" }}>Analyse dosage</h2>
              <p className="text-xs mt-0.5 opacity-45" style={{ color: "var(--color-brand)" }}>
                {totalDosage} simulation{totalDosage !== 1 ? "s" : ""}
              </p>
            </div>

            <div className="px-5 py-4 space-y-5">
              <div>
                <p
                  className="text-xs font-semibold uppercase tracking-widest mb-3 opacity-55"
                  style={{ color: "var(--color-brand)" }}
                >
                  Intensité choisie
                </p>
                <div className="space-y-2">
                  {Object.entries(INTENSITY_LABELS).map(([id, label]) => {
                    const count = intensityCounts[id] ?? 0;
                    const pct = maxIntensityCount > 0 ? (count / maxIntensityCount) * 100 : 0;
                    return (
                      <div key={id} className="flex items-center gap-3">
                        <span
                          className="text-xs w-32 shrink-0 truncate opacity-65"
                          style={{ color: "var(--color-brand)" }}
                        >
                          {label}
                        </span>
                        <div
                          className="flex-1 rounded-full h-1.5 overflow-hidden"
                          style={{ background: "var(--border-soft)" }}
                        >
                          <div
                            className={`h-full rounded-full transition-all ${INTENSITY_COLORS[id] ?? "bg-slate-500"}`}
                            style={{ width: `${pct}%` }}
                          />
                        </div>
                        <span className="text-xs w-6 text-right opacity-55" style={{ color: "var(--color-brand)" }}>
                          {count}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div>
                <p
                  className="text-xs font-semibold uppercase tracking-widest mb-3 opacity-55"
                  style={{ color: "var(--color-brand)" }}
                >
                  Volume recette
                </p>
                <div className="grid grid-cols-4 gap-2">
                  {BUCKET_ORDER.map((bucket) => {
                    const count = batchCounts[bucket] ?? 0;
                    const pct = maxBatchCount > 0 ? count / maxBatchCount : 0;
                    return (
                      <div key={bucket} className="flex flex-col items-center gap-1.5">
                        <div
                          className="w-full rounded-lg h-16 flex items-end overflow-hidden"
                          style={{ background: "var(--border-faint)" }}
                        >
                          <div
                            className="w-full bg-cyan-500 rounded-t-lg transition-all"
                            style={{ height: `${Math.max(pct * 100, count > 0 ? 8 : 0)}%` }}
                          />
                        </div>
                        <span
                          className="text-[10px] text-center leading-tight opacity-55"
                          style={{ color: "var(--color-brand)" }}
                        >
                          {bucket}
                        </span>
                        <span className="text-xs font-semibold" style={{ color: "var(--color-brand)" }}>
                          {count}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Heatmap */}
        <HeatmapSection events={events} total={totalEvents} />

      </div>
    </div>
  );
}

function StatCard({
  icon,
  label,
  value,
  accent,
}: {
  icon: React.ReactNode;
  label: string;
  value: number | string;
  accent: string;
}) {
  return (
    <div
      className="rounded-2xl p-4 flex items-center gap-3"
      style={{ border: "1px solid var(--border-soft)", background: "var(--color-surface)" }}
    >
      <div className={`${accent} opacity-75`}>{icon}</div>
      <div>
        <p className="text-xs opacity-55" style={{ color: "var(--color-brand)" }}>
          {label}
        </p>
        <p className={`text-xl font-bold ${accent}`}>{value}</p>
      </div>
    </div>
  );
}
