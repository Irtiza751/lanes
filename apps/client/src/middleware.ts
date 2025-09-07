import { cookies } from "next/headers";
import { NextResponse, NextRequest } from "next/server";

const publicPages = ["/", "/signin", "/signup"];

export async function middleware(request: NextRequest) {
  const cookieStore = await cookies();
  const { pathname, origin } = request.nextUrl;
  const accessToken = cookieStore.get("access_token")?.value;
  // console.log("accessToken", request.cookies);
  const isPublicRoute = publicPages.includes(pathname);

  // If not logged in → force signin
  if (!accessToken && !isPublicRoute) {
    return NextResponse.redirect(`${origin}/signin`);
  }

  // If logged in and trying to access signin/signup → bounce back to previous page
  if (accessToken && (pathname === "/signin" || pathname === "/signup")) {
    return NextResponse.redirect(`${origin}/`);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|images|fonts).*)"],
};
