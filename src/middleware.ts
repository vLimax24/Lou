import { authMiddleware } from "@clerk/nextjs"

import createMiddleware from "next-intl/middleware"

authMiddleware({
  // Allow signed out users to access the specified routes:
  publicRoutes: ["/", "/api/getCollabToken/[userId]"],
  ignoredRoutes: ["/tutorial/(.*)", "/api"],
})

export default createMiddleware({
  // A list of all locales that are supported
  locales: ["en", "de"],

  // Used when no locale matches
  defaultLocale: "en",
})

export const config = {
  // Match only internationalized pathnames
  matcher: [
    "/((?!.+\\.[\\w]+$|_next).*)",
    "/(api|trpc)(.*)",
    "/",
    "/(de|en)/:path*",
  ],
}
