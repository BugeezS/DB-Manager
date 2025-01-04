import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  // Get the token from cookies
  const token = request.cookies.get("token");
  const { pathname } = request.nextUrl;

  // Check if it's an auth route
  const isAuthRoute = pathname.startsWith("/auth");

  // If no token and trying to access protected route
  if (!token && !isAuthRoute) {
    const loginUrl = new URL("/auth/login", request.url);
    return NextResponse.redirect(loginUrl);
  }

  // If has token and trying to access auth routes
  if (token && isAuthRoute) {
    const dashboardUrl = new URL("/dashboard", request.url);
    return NextResponse.redirect(dashboardUrl);
  }

  return NextResponse.next();
}

// Update matcher to catch all protected routes
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
