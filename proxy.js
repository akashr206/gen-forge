import { auth } from "@/auth";
import { NextResponse } from "next/server";

export default auth((req) => {
  const isAuth = !!req.auth;
  const isProtected = req.nextUrl.pathname.startsWith("/resume");

  if (isProtected && !isAuth) {
    const landingLoginUrl = new URL("/", req.nextUrl.origin);
    landingLoginUrl.searchParams.set("auth", "login");
    landingLoginUrl.searchParams.set("callbackUrl", req.nextUrl.pathname);
    return NextResponse.redirect(landingLoginUrl);
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/resume/:path*"],
};
