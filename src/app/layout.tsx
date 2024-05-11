"use client"
import * as React from "react"
import { ConvexReactClient } from "convex/react"
import { ConvexProviderWithClerk } from "convex/react-clerk"
import { ClerkProvider, useAuth } from "@clerk/nextjs"
import { env } from "@/env"
import { Inter } from "next/font/google"
import { Toaster } from "@/components/ui/sonner"
import "@/styles/globals.css"
import "@/styles/prosemirror.css"

const inter = Inter({ subsets: ["latin"] })

// do not cache this layout
export const revalidate = 0
const convex = new ConvexReactClient(env.NEXT_PUBLIC_CONVEX_URL)

const RootLayout = ({ children }: { children: React.ReactNode }) => {

  
  return (
    <ClerkProvider publishableKey={env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}>
      <html lang="en">
        <body className={inter.className}>
          <ConvexProviderWithClerk client={convex} useAuth={useAuth}>
            {children}
          </ConvexProviderWithClerk>
          <Toaster richColors />
        </body>
      </html>
    </ClerkProvider>
  )
}

export default RootLayout
