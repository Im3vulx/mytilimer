import { NextResponse } from "next/server";
import { getPrisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { intensityId, poidsTotalKg, taux, masseConcentreKg } = body ?? {};
    if (
      typeof intensityId !== "string" ||
      typeof poidsTotalKg !== "number" ||
      poidsTotalKg <= 0 ||
      typeof taux !== "number" ||
      typeof masseConcentreKg !== "number"
    ) {
      return NextResponse.json({ ok: false }, { status: 400 });
    }
    const prisma = getPrisma();
    await prisma.dosageCalcEvent.create({
      data: { intensityId, poidsTotalKg, taux, masseConcentreKg },
    });
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
