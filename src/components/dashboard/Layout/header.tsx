"use client"
// component
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Menu,
  CalendarDays,
  ListChecks,
  StickyNote,
  BookA,
  Home,
  GraduationCap,
  LibraryBig,
  CaseSensitive,
} from "lucide-react"
import { api } from "@/convex/_generated/api"
import { useConvexAuth, useQuery } from "convex/react"
import { usePathname } from "next/navigation"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { UserButton } from "@clerk/nextjs"
import Link from "next/link"
import Logo from "../../../../public/logo.svg"
import Image from "next/image"
import { useTranslations } from "next-intl"
import { useParams } from "next/navigation"

const DashboardHeader = () => {
  const { isAuthenticated } = useConvexAuth()
  const pathname = usePathname()
  const tasks = useQuery(
    api.tasks.getTasks,
    !isAuthenticated ? "skip" : undefined
  )

  const params = useParams()
  const locale = params.locale

  const t = useTranslations()

  const pendingTasksCount =
    tasks?.filter(task => task.status === "PENDING").length ?? 0
  return (
    <header className=" flex h-14 items-center justify-between gap-4 border-b bg-white px-4 md:hidden lg:h-[60px] lg:px-6">
      <Link href="/" className="ml-5 flex items-center gap-1 font-semibold">
        <Image src={Logo} alt="Lou" width={40} height={40} draggable={false} />
        <h1 className="ml-2 text-[1.4rem] font-bold">Lou</h1>
      </Link>
      <Sheet>
        <SheetTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            className="right-0 shrink-0 rounded-lg bg-primaryBlue text-white transition-all duration-200 hover:bg-primaryHover hover:text-white md:hidden"
          >
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="flex flex-col">
          <nav className="ml-3 grid gap-2 text-lg font-medium">
            <Link href="/" className="flex items-center gap-1 font-semibold">
              <Image
                src={Logo}
                alt="Lou"
                width={40}
                height={40}
                draggable={false}
              />
              <h1 className="ml-2 text-[1.4rem] font-bold">Lou</h1>
            </Link>
            <nav className="mr-6 mt-16 grid items-start text-sm font-medium">
              <Link
                href="/dashboard"
                className={`my-1 flex items-center gap-3 rounded-lg px-3 py-2 pl-0 font-regular transition-all duration-200 ${pathname == `/${locale}/dashboard` ? "bg-primaryBlue text-white hover:text-white" : "bg-none text-mutedGray hover:text-primaryBlue"}`}
              >
                <Home className="h-4 w-4" />
                Home
              </Link>
              <Link
                href="/dashboard/subjects"
                className={`my-1 flex items-center gap-3 rounded-lg px-3 py-2 pl-0 font-regular transition-all duration-200 ${pathname == `/${locale}/dashboard/subjects` ? "bg-primaryBlue text-white hover:text-white" : "bg-none text-mutedGray hover:text-primaryBlue"}`}
              >
                <LibraryBig className="h-4 w-4" />
                Subjects
              </Link>
              <Link
                href="/dashboard/calendar"
                className={`my-1 flex items-center gap-3 rounded-lg px-3 py-2 pl-0 font-regular transition-all duration-200 ${pathname == `/${locale}/dashboard/calendar` ? "bg-primaryBlue text-white hover:text-white" : "bg-none text-mutedGray hover:text-primaryBlue"}`}
              >
                <CalendarDays className="h-4 w-4" />
                Calendar
              </Link>
              <Link
                href="/dashboard/grade-sheet"
                className={`my-1 flex items-center gap-3 rounded-lg px-3 py-2 pl-0 font-regular transition-all duration-200 ${pathname == `/${locale}/dashboard/grade-sheet` ? "bg-primaryBlue text-white hover:text-white" : "bg-none text-mutedGray hover:text-primaryBlue"}`}
              >
                <GraduationCap className="h-4 w-4" />
                Grade Sheet
              </Link>
              <Link
                href="/dashboard/tasks"
                className={`my-1 flex items-center gap-3 rounded-lg px-3 py-2 pl-0 font-regular transition-all duration-200 ${pathname == `/${locale}/dashboard/tasks` ? "bg-primaryBlue text-white hover:text-white" : "bg-none text-mutedGray hover:text-primaryBlue"}`}
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
                className={`my-1 flex items-center gap-3 rounded-lg px-3 py-2 pl-0 font-regular transition-all duration-200 ${pathname == `/${locale}/dashboard/notes` ? "bg-primaryBlue text-white hover:text-white" : "bg-none text-mutedGray hover:text-primaryBlue"}`}
              >
                <StickyNote className="h-4 w-4" />
                Notes{" "}
              </Link>
              <Link
                href="/dashboard/learn-resources"
                className={`my-1 flex items-center gap-3 rounded-lg px-3 py-2 pl-0 font-regular transition-all duration-200 ${pathname == `/${locale}/dashboard/learn-resources` ? "bg-primaryBlue text-white hover:text-white" : "bg-none text-mutedGray hover:text-primaryBlue"}`}
              >
                <BookA className="h-4 w-4" />
                Learn Resources
              </Link>
              <Link
                href="/dashboard/text-editor"
                className={`my-1 flex items-center gap-3 rounded-lg px-3 py-2 pl-0 font-regular transition-all duration-200 ${pathname == `/${locale}/dashboard/text-editor` ? "bg-primaryBlue text-white hover:text-white" : "bg-none text-mutedGray hover:text-primaryBlue"}`}
              >
                <CaseSensitive className="h-4 w-4" />
                Collaboration Editor
              </Link>
            </nav>
            <div className="mt-8 flex items-center">
              <UserButton afterSignOutUrl="/" />
              <div className="ml-4 flex flex-col justify-center text-sm leading-4">
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
