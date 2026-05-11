import { NextResponse } from "next/server";
import { getPrisma } from "@/lib/prisma";

export type ContactB2BPayload = {
  companyName: string;
  contactName?: string;
  email: string;
  phone?: string;
  message: string;
};

function isNonEmptyString(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

/**
 * API B2B de contact (handler Next.js App Router).
 * L'envoi email / persistance sera branché ultérieurement.
 */
export async function POST(req: Request) {
  try {
    const contentType = req.headers.get("content-type") || "";
    if (!contentType.toLowerCase().includes("application/json")) {
      return NextResponse.json(
        { ok: false, error: "Content-Type doit etre application/json" },
        { status: 415 },
      );
    }

    const body = (await req.json()) as Partial<ContactB2BPayload> | null;

    const companyName = body?.companyName;
    const email = body?.email;
    const message = body?.message;

    if (!isNonEmptyString(companyName)) {
      return NextResponse.json({ ok: false, error: "companyName requis" }, { status: 400 });
    }
    if (!isNonEmptyString(email)) {
      return NextResponse.json({ ok: false, error: "email requis" }, { status: 400 });
    }
    if (!isNonEmptyString(message)) {
      return NextResponse.json({ ok: false, error: "message requis" }, { status: 400 });
    }

    const prisma = getPrisma();
    await prisma.contactLead.create({
      data: {
        companyName,
        contactName: body?.contactName ?? null,
        email,
        phone: body?.phone ?? null,
        message,
      },
    });

    return NextResponse.json(
      {
        ok: true,
        received: {
          companyName,
          contactName: body?.contactName ?? null,
          email,
          phone: body?.phone ?? null,
          message,
        },
      },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json(
      { ok: false, error: error instanceof Error ? error.message : "Erreur interne" },
      { status: 500 },
    );
  }
}

