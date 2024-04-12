"use client"
import { useRouter } from "next/navigation"
import * as React from "react"
import { api } from "@/convex/_generated/api"
import { useConvexAuth, useQuery } from "convex/react"
import DashboardHeader from "@/components/dashboard/Layout/header"
import DashboardSidebar from "@/components/dashboard/Layout/sidebar"
import { useEffect } from "react"
import useStoreUser from "@/hooks/auth/useStoreUser"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  useStoreUser()
  const router = useRouter()
  const { isAuthenticated, isLoading: AuthLoading } = useConvexAuth()

  if (!isAuthenticated && !AuthLoading) {
    router.push("/login")
  }

  const subjects = useQuery(
    api.subjects.getUserSubjects,
    !isAuthenticated ? "skip" : undefined
  )

  useEffect(() => {
    if (!subjects || !isAuthenticated) return
    if (subjects.length <= 0) {
      router.push("tutorial/subjects")
    }
  }, [subjects, isAuthenticated, router])

  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <DashboardSidebar />
      <div className="flex flex-col">
        <DashboardHeader />
        <div className="p-4">{children}</div>
      </div>
    </div>
  )
}
