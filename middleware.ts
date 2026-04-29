import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

function unauthorized() {
  return new NextResponse("Unauthorized", {
    status: 401,
    headers: {
      "WWW-Authenticate": 'Basic realm="Admin"',
    },
  });
}

function decodeBasicAuth(authHeader: string) {
  // Format: "Basic base64(user:pass)"
  const base64 = authHeader.slice("Basic ".length);
  const decoded = atob(base64);
  const idx = decoded.indexOf(":");
  const username = decoded.slice(0, idx);
  const password = decoded.slice(idx + 1);
  return { username, password };
}

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const isProtected =
    pathname.startsWith("/admin") || pathname.startsWith("/api/admin");

  if (!isProtected) return NextResponse.next();

  const expectedUser = process.env.ADMIN_USERNAME;
  const expectedPass = process.env.ADMIN_PASSWORD;
  if (!expectedUser || !expectedPass) return unauthorized();

  const authHeader = req.headers.get("authorization") ?? "";
  if (!authHeader.startsWith("Basic ")) return unauthorized();

  try {
    const { username, password } = decodeBasicAuth(authHeader);
    if (username !== expectedUser || password !== expectedPass) return unauthorized();
    return NextResponse.next();
  } catch {
    return unauthorized();
  }
}

export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*"],
};

