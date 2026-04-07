import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(request: NextRequest): NextResponse {
  if (!request.nextUrl.pathname.startsWith("/admin"))
    return NextResponse.next();
  if (request.nextUrl.pathname === "/admin/login") return NextResponse.next();

  const secret = request.cookies.get("admin_secret")?.value;
  if (!secret) {
    const login = new URL("/admin/login", request.url);
    login.searchParams.set("from", request.nextUrl.pathname);
    return NextResponse.redirect(login);
  }
  return NextResponse.next();
}

export const config = { matcher: ["/admin/:path*"] };
