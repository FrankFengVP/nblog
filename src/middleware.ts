import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import {
  isValidLocale,
  localeCookieName,
  resolvePreferredLocale,
  type Locale,
} from "@/lib/i18n";

const ONE_YEAR = 60 * 60 * 24 * 365;

function pathnameLocale(pathname: string): Locale | null {
  const segment = pathname.split("/")[1];
  return segment && isValidLocale(segment) ? segment : null;
}

function withLocaleCookie(response: NextResponse, locale: Locale) {
  response.cookies.set(localeCookieName, locale, {
    path: "/",
    maxAge: ONE_YEAR,
    sameSite: "lax",
  });
  return response;
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const currentLocale = pathnameLocale(pathname);

  if (currentLocale) {
    return withLocaleCookie(NextResponse.next(), currentLocale);
  }

  const preferred = resolvePreferredLocale(
    request.cookies.get(localeCookieName)?.value,
    request.headers.get("accept-language")
  );

  const url = request.nextUrl.clone();
  url.pathname = `/${preferred}${pathname === "/" ? "" : pathname}`;

  return withLocaleCookie(NextResponse.redirect(url), preferred);
}

export const config = {
  matcher: ["/((?!_next|api|favicon.ico|.*\\..*).*)"],
};
