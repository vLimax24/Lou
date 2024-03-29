"use client"

import * as React from "react"
import { SessionProvider } from "next-auth/react"
import type { Session } from "next-auth"

interface AuthProviderProps {
  children: React.ReactNode
  session: Session | null
}

export function AuthProvider({ children, session }: AuthProviderProps): JSX.Element {
  return <SessionProvider session={session}>{children}</SessionProvider>
}