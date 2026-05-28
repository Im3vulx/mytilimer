import { getOrCreateFicheTechnique } from "@/lib/ficheTechniqueRepo";
import { FicheTechniqueAdminForm } from "@/components/ui/FicheTechniqueAdminForm";
import { requireAuth } from "@/lib/auth";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function Page() {
  await requireAuth();
  const fiche = await getOrCreateFicheTechnique();
  return (
    <main className="mx-auto w-full max-w-5xl px-4 py-10 sm:px-6">
      <div className="rounded-3xl border border-[#F6F0E3]/15 bg-[#041326] p-6 sm:p-8">
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl font-semibold text-[#FFF8E7]">Admin - Fiche technique</h1>
          <p className="text-sm text-[#F6F0E3]/70">
            Protegee. Modifiez les valeurs et enregistrez : elles seront lues cote public.
          </p>
        </div>

        <div className="mt-6">
          <FicheTechniqueAdminForm initial={fiche} />
        </div>
      </div>
    </main>
  );
}

