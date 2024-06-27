"use client"

import TutorialDialog from "@/components/dashboard/Dialogs/tutorial/TutorialDialog"
import DashboardHeader from "@/components/dashboard/Layout/header"
import DashboardSidebar from "@/components/dashboard/Layout/sidebar"
import { api } from "@/convex/_generated/api"
import { useConvexAuth, useQuery } from "convex/react"
import * as React from "react"
import { useEffect } from "react"
import { Toaster } from "@/components/ui/sonner"
import { cn } from "@/lib/utils"
import { usePathname } from "next/navigation"
import { useLocale } from "next-intl"
import { useRouter } from "next/navigation"

const DashboardClient = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useConvexAuth()
  const pathname = usePathname()
  const locale = useLocale()

  const myUser = useQuery(api.users.getMyUser)
  const router = useRouter()
  const subjects = useQuery(
    api.subjects.getUserSubjects,
    !isAuthenticated ? "skip" : undefined
  )

  useEffect(() => {
    if (!subjects) return
    if (subjects.length <= 0) {
      router.push("/welcome")
    }
  }, [subjects])

  useEffect(() => {
    if (typeof window !== "undefined" && myUser) {
      const storedUser = localStorage.getItem("user")
      if (!storedUser) {
        localStorage.setItem("user", JSON.stringify(myUser))
      }
    }
  }, [myUser])

  const isTextEditor = pathname.startsWith(
    `/${locale}/dashboard/text-editor/doc`
  )

  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <DashboardSidebar />
      <div className="flex flex-col">
        <DashboardHeader />
        <main
          className={cn(
            "h-full w-full gap-4 overflow-y-hidden bg-[#FAFAFA] lg:gap-6",
            isTextEditor ? "p-0" : "p-5 lg:p-10"
          )}
        >
          {children}
        </main>
        <Toaster richColors />
      </div>
    </div>
  )
}

export default DashboardClient
