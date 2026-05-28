import { createHmac, randomBytes, timingSafeEqual } from "crypto";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const SESSION_COOKIE = "admin_session";

function hmacSign(value: string): string {
  const secret = process.env.ADMIN_PASSWORD ?? "";
  return createHmac("sha256", secret).update(value).digest("hex");
}

export function generateToken(): string {
  const rand = randomBytes(32).toString("hex");
  return `${rand}.${hmacSign(rand)}`;
}

export function verifyToken(value: string): boolean {
  const dot = value.lastIndexOf(".");
  if (dot === -1) return false;
  const rand = value.slice(0, dot);
  const sig = value.slice(dot + 1);
  const expected = Buffer.from(hmacSign(rand), "hex");
  const actual = Buffer.from(sig, "hex");
  if (expected.length !== actual.length) return false;
  return timingSafeEqual(expected, actual);
}

export async function requireAuth(): Promise<void> {
  const jar = await cookies();
  const val = jar.get(SESSION_COOKIE)?.value ?? "";
  if (!verifyToken(val)) {
    redirect("/admin/login");
  }
}

export async function isAuthenticated(): Promise<boolean> {
  const jar = await cookies();
  return verifyToken(jar.get(SESSION_COOKIE)?.value ?? "");
}
