// proxy.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  const { pathname, searchParams } = request.nextUrl;
  if (pathname === "/login" || pathname === "/register") {
    const secret = searchParams.get("secret");
    const validSecret = process.env.ADMIN_SECRET_KEY;

    if (!secret || secret !== validSecret) {
      return NextResponse.rewrite(new URL("/404-not-found", request.url));
    }
  }

  const res = NextResponse.next();
  res.headers.set("x-pathname", request.nextUrl.pathname);
  return res;
}

export const config = {
  matcher: ["/((?!_next|favicon.ico).*)"],
};
