"use client"

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
import { Authenticated } from "convex/react"
import * as Frigade from "@frigade/react"

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
      const hasStoredUserSameCredentials =
        storedUser && JSON.parse(storedUser)._id === myUser._id
      if (!storedUser || !hasStoredUserSameCredentials) {
        localStorage.setItem("user", JSON.stringify(myUser))
      }
    }
  }, [myUser])

  const isTextEditor = pathname.startsWith(
    `/${locale}/dashboard/text-editor/doc`
  )

  const { flow } = Frigade.useFlow("your-flow-id")

  useEffect(() => {
    const handlePathChange = async () => {
      if (flow) {
        await flow.reload() // Reload the flow to check for new selectors

        // If we're on the new task page and the current step is still step 2
        if (
          pathname === `${locale}/dashboard/tasks` &&
          flow.getCurrentStepIndex() === 1
        ) {
          // Wait a bit for the DOM to fully load
          setTimeout(() => {
            flow.getCurrentStep()?.complete()
            flow.forward()
          }, 500)
        }
      }
    }

    handlePathChange()
  }, [pathname, flow])

  const apiKey = process.env.NEXT_PUBLIC_FRIGADE_API_KEY

  return (
    <Frigade.Provider apiKey={apiKey ? apiKey : ""} userId={myUser?._id}>
      <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
        <Authenticated>
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
          <div
            id="onboarding-tour-selector-1"
            className="fixed left-1/2 top-1/2 z-[2500] -translate-x-1/2 -translate-y-1/2 transform"
          />
          <Frigade.Tour
            flowId="flow_VIdtJ1vD"
            zIndex={100000}
            spotlight={true}
            sideOffset={10}
            forceMount={true}
          />
        </Authenticated>
      </div>
    </Frigade.Provider>
  )
}

export default DashboardClient
