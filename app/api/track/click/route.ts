import { NextResponse } from "next/server";
import { getPrisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { xPct, yPct, page = "/", type = "click" } = body ?? {};
    if (typeof xPct !== "number" || typeof yPct !== "number") {
      return NextResponse.json({ ok: false }, { status: 400 });
    }
    const prisma = getPrisma();
    await prisma.clickEvent.create({ data: { xPct, yPct, page, type } });
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
