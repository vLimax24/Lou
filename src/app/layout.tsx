"use client"
import { Toaster } from "@/components/ui/sonner"
import { env } from "@/env"
import * as React from "react"
import { useAuthFromNextAuth } from "@/hooks/auth/useAuthFromNextAuth"
import "@/styles/globals.css"
import { ConvexProviderWithAuth, ConvexReactClient } from "convex/react"
import { SessionProvider } from "next-auth/react"
import { Inter } from "next/font/google"
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
})

// do not cache this layout
export const revalidate = 0
const convex = new ConvexReactClient(env.NEXT_PUBLIC_CONVEX_URL)


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
 

 

  return (
    <html lang="en">
      <SessionProvider>
        <body className={`font-sans ${inter.variable}`}>
          <ConvexProviderWithAuth client={convex} useAuth={useAuthFromNextAuth}>{children}</ConvexProviderWithAuth>
          <Toaster />
        </body>
      </SessionProvider>
    </html>
  )
}
