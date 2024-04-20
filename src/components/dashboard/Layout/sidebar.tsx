"use client"
import React from "react"
import { CalendarDays, ListChecks, StickyNote, BookA, Home, GraduationCap, Lightbulb, LibraryBig } from "lucide-react"
import Link from "next/link"
import { api } from "@/convex/_generated/api"
import { useConvexAuth, useQuery } from "convex/react"
import { Badge } from "@/components/ui/badge"
import { UserButton } from "@clerk/nextjs"
import { usePathname } from "next/navigation"

const DashboardSidebar = () => {
  const pathname = usePathname()
  const { isAuthenticated } = useConvexAuth()
  const tasks = useQuery(
    api.tasks.getTasks,
    !isAuthenticated ? "skip" : undefined
  )

  const pendingTasksCount = tasks?.filter((task) => task.status === "PENDING").length ?? 0

  return (
    <div className="hidden bg-white md:block pl-8 pt-4">
      <div className="flex h-full max-h-screen flex-col gap-2 justify-center mt-8">
        <div className="flex h-14 items-center lg:h-[60px] mr-6">
          <Link href="/" className="flex items-center gap-2 font-semibold">
            <Lightbulb className="size-7" />
            <span className="text-xl font-bold">StudentOS</span>
          </Link>
        </div>
        <div className="flex-1 mt-24">
          <nav className="grid items-start text-sm font-medium mr-6">
            <Link
              href="/dashboard"
              className={`my-1 font-regular flex items-center gap-3 rounded-lg px-3 py-2 transition-all duration-200 ${pathname == "/dashboard" ? "bg-primaryGray text-white hover:text-white" : "bg-none text-mutedGray hover:text-primaryGray"}`}
            >
              <Home className="h-4 w-4" />
              Home
            </Link>
            <Link
              href="/dashboard/subjects"
              className={`my-1 font-regular flex items-center gap-3 rounded-lg px-3 py-2 transition-all duration-200 ${pathname == "/dashboard/subjects" ? "bg-primaryGray text-white hover:text-white" : "bg-none text-mutedGray hover:text-primaryGray"}`}
            >
              <LibraryBig className="h-4 w-4" />
              Subjects
            </Link>
            <Link
              href="/dashboard/calendar"
              className={`my-1 font-regular flex items-center gap-3 rounded-lg px-3 py-2 transition-all duration-200 ${pathname == "/dashboard/calendar" ? "bg-primaryGray text-white hover:text-white" : "bg-none text-mutedGray hover:text-primaryGray"}`}
            >
              <CalendarDays className="h-4 w-4" />
              Calendar
            </Link>
            <Link
              href="/dashboard/grade-sheet"
              className={`my-1 font-regular flex items-center gap-3 rounded-lg px-3 py-2 transition-all duration-200 ${pathname == "/dashboard/grade-sheet" ? "bg-primaryGray text-white hover:text-white" : "bg-none text-mutedGray hover:text-primaryGray"}`}
            >
              <GraduationCap className="h-4 w-4" />
              Grade Sheet
            </Link>
            <Link
              href="/dashboard/tasks"
              className={`my-1 font-regular flex items-center gap-3 rounded-lg px-3 py-2 transition-all duration-200 ${pathname == "/dashboard/tasks" ? "bg-primaryGray text-white hover:text-white" : "bg-none text-mutedGray hover:text-primaryGray"}`}
            >
              <ListChecks className="h-4 w-4" />
              Tasks
              {pendingTasksCount > 0 && (
                <Badge className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primaryGray">
                  {pendingTasksCount}
                </Badge>
              )}
            </Link>
            <Link
              href="/dashboard/notes"
              className={`my-1 font-regular flex items-center gap-3 rounded-lg px-3 py-2 transition-all duration-200 ${pathname == "/dashboard/notes" ? "bg-primaryGray text-white hover:text-white" : "bg-none text-mutedGray hover:text-primaryGray"}`}
            >
              <StickyNote className="h-4 w-4" />
              Notes{" "}
            </Link>
            <Link
              href="/dashboard/learn-resources"
              className={`my-1 font-regular flex items-center gap-3 rounded-lg px-3 py-2 transition-all duration-200 ${pathname == "/dashboard/learn-resources" ? "bg-primaryGray text-white hover:text-white" : "bg-none text-mutedGray hover:text-primaryGray"}`}
            >
              <BookA className="h-4 w-4" />
              Learn Resources
            </Link>
          </nav>
        </div>
        <div className="mb-20 flex items-center">
          <UserButton afterSignOutUrl="/" />
          <div className="flex flex-col justify-center text-sm leading-4 ml-4">
            <p className="text-primaryGray">John Doe</p>
            <p className="text-mutedGray">Test@test.com</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DashboardSidebar
