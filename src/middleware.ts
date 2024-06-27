import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server"
import createMiddleware from "next-intl/middleware"

const isProtectedRoute = createRouteMatcher([
  "/(.*)/dashboard",
  "/(.*)/welcome",
])

// Middleware to handle internationalization
const intlMiddleware = createMiddleware({
  // A list of all locales that are supported
  locales: ["en", "de"],

  // Used when no locale matches
  defaultLocale: "en",
})

export default clerkMiddleware((auth, req) => {
  if (isProtectedRoute(req)) auth().protect()

  // Apply internationalization middleware to all routes
  return intlMiddleware(req)
})

export const config = {
  // Match only internationalized pathnames and ignore /api route
  matcher: [
    "/((?!api|_next|_vercel|.*\\..*).*)",
    "/(de|en)/:path*", // This seems to be part of the internationalization config
  ],
}
