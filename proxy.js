import { auth } from "@/auth";
import { NextResponse } from "next/server";

export default auth((req) => {
  const isAuth = !!req.auth;
  const path = req.nextUrl.pathname;
  const isProtected = path.startsWith("/resume") || path.startsWith("/dashboard");

  if (isProtected && !isAuth) {
    const landingLoginUrl = new URL("/", req.nextUrl.origin);
    landingLoginUrl.searchParams.set("auth", "login");
    landingLoginUrl.searchParams.set("callbackUrl", path);
    return NextResponse.redirect(landingLoginUrl);
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/resume/:path*", "/dashboard/:path*"],
};
