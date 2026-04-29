import { NextResponse } from "next/server";
import { getOrCreateFicheTechnique } from "@/lib/ficheTechniqueRepo";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET() {
  const fiche = await getOrCreateFicheTechnique();
  return NextResponse.json({ ok: true, fiche });
}

