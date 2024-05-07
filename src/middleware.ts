import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { decodeJWT } from "./lib/utils";

const privatePaths = [
  "/account-management",
  "/roles-management",
  "/models-management",
  "/tenant-management",
  "/user-activation",
  "/change-password",
];
const authPaths = [
  "/login",
  "/register",
  "/reset-password",
  "/forgot-password",
  "/activate-account",
];

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const accessToken = request.cookies.get("accessToken")?.value;
  const permissions = decodeJWT(accessToken!)?.permissions || [];
  if (
    pathname === "/account-management" &&
    !permissions.includes("Pages.Users")
  ) {
    return NextResponse.redirect(new URL("/permission-denied", request.url));
  }
  if (
    pathname === "/roles-management" &&
    !permissions.includes("Pages.Roles")
  ) {
    return NextResponse.redirect(new URL("/permission-denied", request.url));
  }
  if (
    pathname === "/tenant-management" &&
    !permissions.includes("Pages.Tenants")
  ) {
    return NextResponse.redirect(new URL("/permission-denied", request.url));
  }
  if (
    pathname === "/user-activation" &&
    !permissions.includes("Pages.Users.Activation")
  ) {
    return NextResponse.redirect(new URL("/permission-denied", request.url));
  }

  // If user is not logged in, redirect to login page
  if (privatePaths.some((path) => pathname.startsWith(path)) && !accessToken) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
  if (pathname === "/" && !accessToken) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
  // If user is logged in, redirect to me page
  if (authPaths.some((path) => pathname.startsWith(path)) && accessToken) {
    return NextResponse.redirect(new URL("/", request.url));
  }
  // If user dont have permission, redirect to permission denied page

  return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    "/",
    "/login",
    "/register",
    "/reset-password",
    "/forgot-password",
    "/activate-account",
    "/account-management",
    "/roles-management",
    "/tenant-management",
    "/user-activation",
    "/change-password",
  ],
};
