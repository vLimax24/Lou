"use client"
import React from "react"
import {
  CalendarDays,
  ListChecks,
  StickyNote,
  BookA,
  Home,
  GraduationCap,
  Lightbulb,
  LibraryBig,
  Loader2,
  CaseSensitive,
  FolderKanban
} from "lucide-react"
import Link from "next/link"
import { api } from "@/convex/_generated/api"
import { useConvexAuth, useQuery } from "convex/react"
import { Badge } from "@/components/ui/badge"
import { UserButton, useUser } from "@clerk/nextjs"
import { usePathname } from "next/navigation"

const DashboardSidebar = () => {
  const pathname = usePathname()
  const { user, isLoaded } = useUser()
  const { isAuthenticated } = useConvexAuth()
  const tasks = useQuery(
    api.tasks.getTasks,
    !isAuthenticated ? "skip" : undefined
  )


  const pendingTasksCount = tasks?.filter(task => task.status === "PENDING").length ?? 0

  return (
    <div className="sticky top-0 hidden h-screen overflow-y-hidden bg-white pl-8 pt-4 md:block overflow-x-hidden">
      <div className="mt-8 flex h-full max-h-screen flex-col justify-center gap-2">
        <div className="mr-6 flex h-14 items-center lg:h-[60px] justify-between">
          <Link href="/" className="flex items-center gap-2 font-semibold">
            <Lightbulb className="size-7" />
            <span className="text-xl font-bold">StudentOS</span>
          </Link>
        </div>
        <div className="mt-24 flex-1">
          <nav className="mr-6 grid items-start text-sm font-medium">
            <Link
              href="/dashboard"
              className={`my-1 flex items-center gap-3 rounded-lg px-3 py-2 font-regular transition-all duration-200 ${pathname == "/dashboard" ? "bg-primaryGray text-white hover:text-white" : "bg-none text-mutedGray hover:text-primaryGray"}`}
            >
              <Home className="h-4 w-4" />
              Home
            </Link>
            <Link
              href="/dashboard/subjects"
              className={`my-1 flex items-center gap-3 rounded-lg px-3 py-2 font-regular transition-all duration-200 ${pathname == "/dashboard/subjects" ? "bg-primaryGray text-white hover:text-white" : "bg-none text-mutedGray hover:text-primaryGray"}`}
            >
              <LibraryBig className="h-4 w-4" />
              Subjects
            </Link>
            <Link
              href="/dashboard/calendar"
              className={`my-1 flex items-center gap-3 rounded-lg px-3 py-2 font-regular transition-all duration-200 ${pathname == "/dashboard/calendar" ? "bg-primaryGray text-white hover:text-white" : "bg-none text-mutedGray hover:text-primaryGray"}`}
            >
              <CalendarDays className="h-4 w-4" />
              Calendar
            </Link>
            <Link
              href="/dashboard/projects"
              className={`my-1 flex items-center gap-3 rounded-lg px-3 py-2 font-regular transition-all duration-200 ${pathname == "/dashboard/projects" ? "bg-primaryGray text-white hover:text-white" : "bg-none text-mutedGray hover:text-primaryGray"}`}
            >
              <FolderKanban className="h-4 w-4" />
              Projects
            </Link>
            <Link
              href="/dashboard/grade-sheet"
              className={`my-1 flex items-center gap-3 rounded-lg px-3 py-2 font-regular transition-all duration-200 ${pathname == "/dashboard/grade-sheet" ? "bg-primaryGray text-white hover:text-white" : "bg-none text-mutedGray hover:text-primaryGray"}`}
            >
              <GraduationCap className="h-4 w-4" />
              Grade Sheet
            </Link>
            <Link
              href="/dashboard/tasks"
              className={`my-1 flex items-center gap-3 rounded-lg px-3 py-2 font-regular transition-all duration-200 ${pathname == "/dashboard/tasks" ? "bg-primaryGray text-white hover:text-white" : "bg-none text-mutedGray hover:text-primaryGray"}`}
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
              className={`my-1 flex items-center gap-3 rounded-lg px-3 py-2 font-regular transition-all duration-200 ${pathname == "/dashboard/notes" ? "bg-primaryGray text-white hover:text-white" : "bg-none text-mutedGray hover:text-primaryGray"}`}
            >
              <StickyNote className="h-4 w-4" />
              Notes{" "}
            </Link>
            <Link
              href="/dashboard/learn-resources"
              className={`my-1 flex items-center gap-3 rounded-lg px-3 py-2 font-regular transition-all duration-200 ${pathname == "/dashboard/learn-resources" ? "bg-primaryGray text-white hover:text-white" : "bg-none text-mutedGray hover:text-primaryGray"}`}
            >
              <BookA className="h-4 w-4" />
              Learn Resources
            </Link>
            <Link
              href="/dashboard/text-editor"
              className={`my-1 flex items-center gap-3 rounded-lg px-3 py-2 font-regular transition-all duration-200 ${pathname == "/dashboard/text-editor" ? "bg-primaryGray text-white hover:text-white" : "bg-none text-mutedGray hover:text-primaryGray"}`}
            >
              <CaseSensitive className="h-4 w-4" />
              Collaboration Editor
            </Link>
          </nav>
        </div>
        <div className="mb-20 flex items-center">
          <UserButton afterSignOutUrl="/" />
          <div className="ml-4 flex flex-col justify-center text-sm leading-4">
            {isLoaded ? (
              <>
                <p className="text-primaryGray">{user?.fullName}</p>
                <p className="text-mutedGray text-[0.7rem]">{user?.emailAddresses[0]?.emailAddress}</p>
              </>
            ) : (
              <Loader2 className="h-2 w-2 animate-spin" />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default DashboardSidebar
