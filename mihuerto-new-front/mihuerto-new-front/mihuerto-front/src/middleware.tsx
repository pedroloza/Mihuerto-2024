import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const userCookie = request.cookies.get('user')?.value;
  let user;

  try {
    user = userCookie ? JSON.parse(userCookie) : null;
  } catch (error) {
    user = null;
  }

  if (
    path.split("/")[1] !== "authentication" &&
    !request.cookies.has("token")
  ) {
    return NextResponse.redirect(new URL("/authentication/login", request.url));
  }
  if (path.split("/")[1] === "authentication" && request.cookies.has("token")) {
    return NextResponse.redirect(new URL(`/dashboard/home`, request.url));
  }

  const adminPaths = [
    "/dashboard/users",
    "/dashboard/users/:id",
    "/dashboard/farmers",
    "/dashboard/farmers/:id",
    "/dashboard/roles",
    "/dashboard/roles/:id",
  ];

  if (
      adminPaths.some(p => new RegExp(p.replace(/:\w+/g, '\\w+')).test(path))
      && user && user?.idRole?.name !== "admin"
  ) {
    return NextResponse.redirect(new URL('/dashboard/home', request.url));
  }

  const creatorPaths = [
    "/dashboard/categories",
    "/dashboard/crops",
    "/dashboard/crops/:id",
    "/dashboard/crops/new",
    "/dashboard/plagues",
    "/dashboard/fertilizer",
    "/dashboard/reproduction"
  ]


  if (
      creatorPaths.some(p => new RegExp(p.replace(/:\w+/g, '\\w+')).test(path))
      && user && (user?.idRole?.name !== "admin" && user?.idRole?.name !== "creador")
  ) {
    return NextResponse.redirect(new URL('/dashboard/home', request.url));
  }

  const reportsPaths = [
    "/reports/admins",
  ]

  if (
      reportsPaths.some(p => new RegExp(p.replace(/:\w+/g, '\\w+')).test(path))
      && user && (user?.idRole?.name !== "admin" && user?.idRole?.name !== "informe")
  ) {
    return NextResponse.redirect(new URL('/dashboard/home', request.url));
  }



  return NextResponse.next();
}

export const config = {
  matcher: [
    "/",
    "/dashboard/:path*",
    "/authentication/login",
    "/dashboard/users",
    "/dashboard/users/new",
    "/dashboard/users/:id",
    "/dashboard/farmers",
    "/dashboard/farmers/:id",
    "/dashboard/roles",
    "/dashboard/roles/new",
    "/dashboard/roles/:id",
    "/dashboard/categories",
    "/dashboard/crops",
    "/dashboard/crops/:id",
    "/dashboard/crops/new",
    "/dashboard/plagues",
    "/dashboard/fertilizer",
    "/dashboard/reproduction",
    "/reports/admins",
    "/reports/crops-by-user",
    "/reports/user-by-crops",
  ],
};

