import { NextResponse } from "next/server";
export function middleware() {
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/dashboard-client/:path*",
    "/api/tasks/:path*",
  ],
};
