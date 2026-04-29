import { NextResponse } from "next/server";
import { getOrCreateFicheTechnique, updateFicheTechnique } from "@/lib/ficheTechniqueRepo";
import { validateFicheTechniquePayload } from "@/lib/ficheTechniqueValidation";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET() {
  const fiche = await getOrCreateFicheTechnique();
  return NextResponse.json({ ok: true, fiche });
}

export async function PUT(req: Request) {
  try {
    const payload = await req.json();
    const fiche = validateFicheTechniquePayload(payload);

    // S'assure qu'une ligne existe avant l'update (premier deploy).
    await getOrCreateFicheTechnique();
    await updateFicheTechnique(fiche);

    return NextResponse.json({ ok: true });
  } catch (error) {
    return NextResponse.json(
      {
        ok: false,
        error: error instanceof Error ? error.message : "Erreur interne",
      },
      { status: 400 },
    );
  }
}

