"use client"
import React from "react"
import {
  CalendarDays,
  ListChecks,
  StickyNote,
  BookA,
  Home,
  GraduationCap,
  LibraryBig,
  Loader2,
  CaseSensitive,
  FolderKanban,
} from "lucide-react"
import Link from "next/link"
import { api } from "@/convex/_generated/api"
import { useConvexAuth, useQuery } from "convex/react"
import { Badge } from "@/components/ui/badge"
import { UserButton, useUser } from "@clerk/nextjs"
import { usePathname } from "next/navigation"
import { useTranslations } from "next-intl"
import { useParams } from "next/navigation"
import Logo from "../../../../public/logo.svg"
import Image from "next/image"

const DashboardSidebar = () => {
  const pathname = usePathname()
  const { user, isLoaded } = useUser()
  const { isAuthenticated } = useConvexAuth()
  const tasks = useQuery(
    api.tasks.getTasks,
    !isAuthenticated ? "skip" : undefined
  )
  const params = useParams()
  const locale = params.locale

  const projectPathnameId =
    pathname.split("/")[pathname.split("/").indexOf("projects") + 1]

  const t = useTranslations()

  const pendingTasksCount =
    tasks?.filter(task => task.status === "PENDING").length ?? 0

  return (
    <div className="sticky top-0 hidden h-screen overflow-x-hidden overflow-y-hidden bg-white pl-8 pt-4 md:block">
      <div className="mt-8 flex h-full max-h-screen flex-col justify-between gap-2">
        <div className="mr-6 flex h-14 items-center justify-between lg:h-[60px]">
          <Link href="/" className="flex items-center gap-1 font-semibold">
            <Image
              src={Logo}
              alt="Lou"
              width={50}
              height={50}
              draggable={false}
            />
            <h1 className="ml-2 text-[1.7rem] font-bold">Lou</h1>
          </Link>
        </div>
        <div className="w-full items-center">
          <nav className="mr-6 grid items-start text-sm font-medium">
            <Link
              href="/dashboard"
              className={`my-1 flex items-center gap-3 rounded-lg px-3 py-2 font-regular transition-all duration-200 ${pathname == `/${locale}/dashboard` ? "bg-primaryBlue text-white hover:text-white" : "bg-none text-mutedGray hover:text-primaryBlue"}`}
            >
              <Home className="h-4 w-4" />
              {t("Dashboard.sidebar.home")}
            </Link>
            <Link
              href="/dashboard/subjects"
              className={`my-1 flex items-center gap-3 rounded-lg px-3 py-2 font-regular transition-all duration-200 ${pathname == `/${locale}/dashboard/subjects` ? "bg-primaryBlue text-white hover:text-white" : "bg-none text-mutedGray hover:text-primaryBlue"}`}
            >
              <LibraryBig className="h-4 w-4" />
              {t("Dashboard.sidebar.subjects")}
            </Link>
            <Link
              href="/dashboard/calendar"
              className={`my-1 flex items-center gap-3 rounded-lg px-3 py-2 font-regular transition-all duration-200 ${pathname == `/${locale}/dashboard/calendar` ? "bg-primaryBlue text-white hover:text-white" : "bg-none text-mutedGray hover:text-primaryBlue"}`}
            >
              <CalendarDays className="h-4 w-4" />
              {t("Dashboard.sidebar.calendar")}
            </Link>
            <Link
              href="/dashboard/projects"
              className={`my-1 flex items-center gap-3 rounded-lg px-3 py-2 font-regular transition-all duration-200 ${pathname === `/${locale}/dashboard/projects` || pathname === `/${locale}/dashboard/projects/${projectPathnameId}` ? "bg-primaryBlue text-white hover:text-white" : "bg-none text-mutedGray hover:text-primaryBlue"}`}
            >
              <FolderKanban className="h-4 w-4" />
              {t("Dashboard.sidebar.projects")}
            </Link>

            <Link
              href="/dashboard/grade-sheet"
              className={`my-1 flex items-center gap-3 rounded-lg px-3 py-2 font-regular transition-all duration-200 ${pathname == `/${locale}/dashboard/grade-sheet` ? "bg-primaryBlue text-white hover:text-white" : "bg-none text-mutedGray hover:text-primaryBlue"}`}
            >
              <GraduationCap className="h-4 w-4" />
              {t("Dashboard.sidebar.grades")}
            </Link>
            <Link
              href="/dashboard/tasks"
              className={`my-1 flex items-center gap-3 rounded-lg px-3 py-2 font-regular transition-all duration-200 ${pathname == `/${locale}/dashboard/tasks` ? "bg-primaryBlue text-white hover:text-white" : "bg-none text-mutedGray hover:text-primaryBlue"}`}
            >
              <ListChecks className="h-4 w-4" />
              {t("Dashboard.sidebar.tasks")}
              {pendingTasksCount > 0 && (
                <Badge
                  className={`ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primaryBlue ${pathname == `/${locale}/dashboard/tasks` ? "bg-white text-primaryBlue" : "text-white"}`}
                >
                  {pendingTasksCount}
                </Badge>
              )}
            </Link>
            <Link
              href="/dashboard/notes"
              className={`my-1 flex items-center gap-3 rounded-lg px-3 py-2 font-regular transition-all duration-200 ${pathname == `/${locale}/dashboard/notes` ? "bg-primaryBlue text-white hover:text-white" : "bg-none text-mutedGray hover:text-primaryBlue"}`}
            >
              <StickyNote className="h-4 w-4" />
              {t("Dashboard.sidebar.notes")}
            </Link>
            <Link
              href="/dashboard/learn-resources"
              className={`my-1 flex items-center gap-3 rounded-lg px-3 py-2 font-regular transition-all duration-200 ${pathname == `/${locale}/dashboard/learn-resources` ? "bg-primaryBlue text-white hover:text-white" : "bg-none text-mutedGray hover:text-primaryBlue"}`}
            >
              <BookA className="h-4 w-4" />
              {t("Dashboard.sidebar.learn-resources")}
            </Link>
            <Link
              href="/dashboard/text-editor"
              className={`my-1 flex items-center gap-3 rounded-lg px-3 py-2 font-regular transition-all duration-200 ${pathname == `/${locale}/dashboard/text-editor` ? "bg-primaryBlue text-white hover:text-white" : "bg-none text-mutedGray hover:text-primaryBlue"}`}
            >
              <CaseSensitive className="h-4 w-4" />
              {t("Dashboard.sidebar.text-editor")}
            </Link>
          </nav>
        </div>
        <div className="mb-20 flex items-center">
          <UserButton afterSignOutUrl="/" />
          <div className="ml-4 flex flex-col justify-center text-sm leading-4">
            {isLoaded ? (
              <>
                <p className="text-black">{user?.fullName}</p>
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
