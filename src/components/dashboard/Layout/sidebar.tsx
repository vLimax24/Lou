"use client"
import React from "react"
import { CalendarDays, ListChecks, StickyNote, BookA, Home, GraduationCap, Lightbulb, LibraryBig } from "lucide-react"
import Link from "next/link"
import { api } from "@/convex/_generated/api"
import { useConvexAuth, useQuery } from "convex/react"
import { Badge } from "@/components/ui/badge"
import { usePathname } from "next/navigation"
import NotificationDialog from "@/components/dashboard/notification" // Import the new component here

const DashboardSidebar = () => {
  const pathname = usePathname()
  const { isAuthenticated } = useConvexAuth()
  const tasks = useQuery(
    api.tasks.getTasks,
    !isAuthenticated ? "skip" : undefined
  )

  const pendingTasksCount = tasks?.filter((task) => task.status === "PENDING").length ?? 0

  return (
    <div className="hidden border-r bg-muted/40 md:block">
      <div className="flex h-full max-h-screen flex-col gap-2">
        <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
          <Link href="/" className="flex items-center gap-2 font-semibold">
            <Lightbulb className="h-6 w-6" />
            <span>StudentOS</span>
          </Link>
          <NotificationDialog />
        </div>
        <div className="flex-1">
          <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
            <Link
              href="/dashboard"
              className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary ${pathname == "/dashboard" ? "bg-muted text-primary" : "bg-none text-muted-foreground"}`}
            >
              <Home className="h-4 w-4" />
              Home
            </Link>
            <Link
              href="/dashboard/subjects"
              className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary ${pathname == "/dashboard/subjects" ? "bg-muted text-primary" : "bg-none text-muted-foreground"}`}
            >
              <LibraryBig className="h-4 w-4" />
              Subjects
            </Link>
            <Link
              href="/dashboard/calendar"
              className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary ${pathname == "/dashboard/calendar" ? "bg-muted text-primary" : "bg-none text-muted-foreground"}`}
            >
              <CalendarDays className="h-4 w-4" />
              Calendar
            </Link>
            <Link
              href="/dashboard/grade-sheet"
              className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary ${pathname == "/dashboard/grade-sheet" ? "bg-muted text-primary" : "bg-none text-muted-foreground"}`}
            >
              <GraduationCap className="h-4 w-4" />
              Grade Sheet
            </Link>
            <Link
              href="/dashboard/tasks"
              className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary ${pathname == "/dashboard/tasks" ? "bg-muted text-primary" : "bg-none text-muted-foreground"}`}
            >
              <ListChecks className="h-4 w-4" />
              Tasks
              {pendingTasksCount > 0 && (
                <Badge className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full">
                  {pendingTasksCount}
                </Badge>
              )}
            </Link>
            <Link
              href="/dashboard/notes"
              className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary ${pathname == "/dashboard/notes" ? "bg-muted text-primary" : "bg-none text-muted-foreground"}`}
            >
              <StickyNote className="h-4 w-4" />
              Notes{" "}
            </Link>
            <Link
              href="/dashboard/learn-resources"
              className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary ${pathname == "/dashboard/learn-resources" ? "bg-muted text-primary" : "bg-none text-muted-foreground"}`}
            >
              <BookA className="h-4 w-4" />
              Learn Resources
            </Link>
          </nav>
        </div>
      </div>
    </div>
  )
}

export default DashboardSidebar
