"use client"
// component
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Menu, CalendarDays, ListChecks, StickyNote, BookA, Home, GraduationCap, Lightbulb, LibraryBig } from "lucide-react"
import { api } from "@/convex/_generated/api"
import { useConvexAuth, useQuery } from "convex/react"
import { usePathname } from "next/navigation"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { UserButton } from "@clerk/nextjs"
import Link from "next/link"

const DashboardHeader = () => {
  const { isAuthenticated } = useConvexAuth()
  const pathname = usePathname()
  const tasks = useQuery(
    api.tasks.getTasks,
    !isAuthenticated ? "skip" : undefined
  )

  const pendingTasksCount = tasks?.filter((task) => task.status === "PENDING").length ?? 0
  return (
    <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6 justify-between md:hidden">
      <p className="font-bold ml-4">Welcome back, John!</p>
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="shrink-0 md:hidden bg-primaryGray text-white right-0 hover:bg-primaryHoverGray hover:text-white transition-all duration-200">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="flex flex-col">
          <nav className="grid gap-2 text-lg font-medium">
            <Link
              href={"/"}
              className="flex items-center gap-2 text-lg font-semibold"
            >
              <Lightbulb className="h-6 w-6" />
              <span className="ml-5 text-black">StudentOS</span>
            </Link>
            <nav className="grid items-start text-sm font-medium mr-6 mt-16">
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
          <div className="mt-8 flex items-center">
            <UserButton afterSignOutUrl="/" />
            <div className="flex flex-col justify-center text-sm leading-4 ml-4">
              <p className="text-primaryGray">John Doe</p>
              <p className="text-mutedGray">Test@test.com</p>
            </div>
          </div>
          </nav>
        </SheetContent>
      </Sheet>
      
    </header>
  )
}

export default DashboardHeader
