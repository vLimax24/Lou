"use client"

import * as React from "react"
import { SessionProvider } from "next-auth/react"
import type { Session } from "next-auth"

interface AuthProviderProps {
  children: React.ReactNode
  session: Session | null
}

export const AuthProvider = ({ children, session }: AuthProviderProps) => <SessionProvider session={session}>{children}</SessionProvider>