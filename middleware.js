import { NextResponse } from "next/server";

const protectedRoutes = ["/account", "/profile", "/settings"];

export function middleware(req) {
  const token = req.cookies.get("token"); 
  const url = req.nextUrl.clone();

  if (protectedRoutes.some((route) => url.pathname.startsWith(route))) {
    if (!token) {
      return NextResponse.redirect(new URL("/", req.url));
    }
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/account/:path*", "/profile/:path*", "/settings/:path*"],
};
