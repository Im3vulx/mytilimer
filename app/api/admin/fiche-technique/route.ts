import { NextResponse } from "next/server";
import { getOrCreateFicheTechnique, updateFicheTechnique } from "@/lib/ficheTechniqueRepo";
import { validateFicheTechniquePayload } from "@/lib/ficheTechniqueValidation";
import { isAuthenticated } from "@/lib/auth";

export const dynamic = "force-dynamic";
export const revalidate = 0;

const unauthorized = () =>
  NextResponse.json({ error: "Non autorisé" }, { status: 401 });

export async function GET() {
  if (!(await isAuthenticated())) return unauthorized();
  const fiche = await getOrCreateFicheTechnique();
  return NextResponse.json({ ok: true, fiche });
}

export async function PUT(req: Request) {
  if (!(await isAuthenticated())) return unauthorized();
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

