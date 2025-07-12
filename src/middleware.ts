import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { match as matchLocale } from "@formatjs/intl-localematcher";
import Negotiator from "negotiator";
import { i18n, LanguageType, Locale } from "./i18n.config";
import {withAuth} from "next-auth/middleware";
import { getToken } from "next-auth/jwt";
import { Pages, Routes, UserRole } from "./constants/enums";


function getLocale(request: NextRequest): string | undefined {
  const negotiatorHeaders: Record<string, string> = {};
  request.headers.forEach((value, key) => (negotiatorHeaders[key] = value));

  const locales: LanguageType[] = i18n.locales;
  const languages = new Negotiator({ headers: negotiatorHeaders }).languages();
  let locale = "";

  try {
    locale = matchLocale(languages, locales, i18n.defaultLocale);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars
  } catch (error: any) {
    locale = i18n.defaultLocale;
  }
  return locale;
}

//withAuth function work on server side and return true or false // she take middleware of next to work insid it if user autentify and return callback true 
// so we should creat logic of verify token inside our middleware function

export default withAuth(async function middleware(request: NextRequest) {
  // logic of get localisation 
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-url", request.url);

  const responce = NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
  const pathname = request.nextUrl.pathname;
  const pathnameIsMissingLocale = i18n.locales.every(
    (locale) => !pathname.startsWith(`/${locale}`)
  );
  // Redirect if there is no locale
  if (pathnameIsMissingLocale) {
    const locale = getLocale(request);
    return NextResponse.redirect(new URL(`/${locale}${pathname}`, request.url));
  }

  //create logic of verify autentification 
  // getToken under the hood this function search cokies of our request if we have token 
  const isAuth = await getToken({req:request});
  const currentLocale = request.url.split("/")[3] as Locale;//localost:3000/en or ar 
  const isAuthPage = pathname.startsWith(`/${currentLocale}/${Routes.AUTH}`);// presise url that start with "en/auth" if true return true 
  const protectedRoutes = [Routes.PROFILE,Routes.ADMIN]//list of route that we should protected
  const isProtectedRoute = protectedRoutes.some((route)=>//some this function check array if we have element equal condition she return true or false 
    pathname.startsWith(`/${currentLocale}/${route}`)// this is our condition 
  );
  //if user not loggedin and try to access Protected route
  if (!isAuth && isProtectedRoute){
    return NextResponse.redirect(
      new URL(`/${currentLocale}/${Routes.AUTH}/${Pages.LOGIN}`,request.url)
    );
  }
  //if user loggedin and try to access auth pages  
  if (isAuthPage && isAuth){
    const role = isAuth.role;
    if(role === UserRole.ADMIN){
       return NextResponse.redirect(
      new URL(`/${currentLocale}/${Routes.ADMIN}`,request.url)
    );
    }
    return NextResponse.redirect(
      new URL(`/${currentLocale}/${Routes.PROFILE}`,request.url)
    );
  }
 //if user loggedin and he isn't adminand  try to access admin page 
  if(isAuth && pathname.startsWith(`/${currentLocale}/${Routes.ADMIN}`)){
    const role = isAuth.role;
    if(role !== UserRole.ADMIN){
      return NextResponse.redirect(
        new URL(`/${currentLocale}/${Routes.PROFILE}`,request.url)
      )
    }
  }

  return responce;

},
{
  callbacks: {
    async authorized(){
      return true;
    }
  }
});

export const config = {
  // Matcher ignoring `/_next/`, `/api/`, ..etc
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml).*)",
  ],
};