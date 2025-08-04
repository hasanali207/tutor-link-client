import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "./services/auth";



type Role = keyof typeof roleBasedPrivateRoutes;

const authRoutes = ["/login", "/register" ];

const roleBasedPrivateRoutes = {
  Student: [/^\/studentdashboard/,/^\/tutors/ ], //studentdeshboard
  Tutor: [/^\/tutor/, /^\/tutors(\/.*)?$/], //tutors
};

export const middleware = async (request: NextRequest) => {
  const { pathname } = request.nextUrl;

  const userInfo = await getCurrentUser();

  if (!userInfo) {
    if (authRoutes.includes(pathname)) {
      return NextResponse.next();
    } else {
      return NextResponse.redirect(
        new URL(
          `/login?redirectPath=${pathname}`,
          request.url
        )
      );
    }
  }

  if (userInfo?.role && roleBasedPrivateRoutes[userInfo?.role as Role]) {
    const routes = roleBasedPrivateRoutes[userInfo?.role as Role];
    // console.log("routes", routes);
    // console.log("pathname", pathname);
    if (routes.some((route) => pathname.match(route))) {
      return NextResponse.next();
    }
  }

  return NextResponse.redirect(new URL("/", request.url));
};

export const config = {
  matcher: [
    "/tutors",
    "/tutors/:path*",
    "/studentdashboard",
    "/studentdashboard/:path*",
    "/tutor",
    "/tutor/:path*"
  ],
};