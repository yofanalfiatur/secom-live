import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

export default createMiddleware({
  locales: routing.locales,
  defaultLocale: routing.defaultLocale,
  localePrefix: routing.localePrefix,

  //turn off locale detection browser
  localeDetection: false,
});

export const config = {
  matcher: ["/", "/((?!api|_next|.*\\..*).*)"],
};
