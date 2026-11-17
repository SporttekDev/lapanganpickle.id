import { NextResponse, type NextRequest } from "next/server";

/*
  Routing bahasa (Next.js 16 memakai nama "proxy", dulu "middleware").

  - Bahasa Indonesia (default) tanpa prefix:  /about, /service, /contact
    -> URL SAMA dengan situs WordPress lama, jadi peringkat Google aman.
  - Bahasa Inggris di prefix /en:             /en/about, /en/service
  - /id/... dialihkan ke versi tanpa prefix agar tidak ada URL ganda.
*/
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname === "/id" || pathname.startsWith("/id/")) {
    const url = request.nextUrl.clone();
    url.pathname = pathname.slice(3) || "/";
    return NextResponse.redirect(url, 308);
  }

  if (pathname === "/en" || pathname.startsWith("/en/")) {
    return NextResponse.next();
  }

  // Indonesia: tampilkan halaman dari folder [lang]=id tanpa mengubah URL di browser
  const url = request.nextUrl.clone();
  url.pathname = pathname === "/" ? "/id" : `/id${pathname}`;
  return NextResponse.rewrite(url);
}

export const config = {
  // lewati api, file internal Next.js, dan file statis (yang punya titik: .png, .xml, dll.)
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
