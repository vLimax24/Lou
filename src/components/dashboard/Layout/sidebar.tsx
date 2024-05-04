"use client"
import React, { useMemo } from "react"
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
  Bell,
  CaseSensitive
} from "lucide-react"
import Link from "next/link"
import { api } from "@/convex/_generated/api"
import { useConvexAuth, useQuery, useMutation } from "convex/react"
import { Badge } from "@/components/ui/badge"
import { UserButton, useUser } from "@clerk/nextjs"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { Separator } from "@/components/ui/separator"
import noNotificationSVG from "../../../../public/party-popper-svgrepo-com.svg"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

const DashboardSidebar = () => {
  const pathname = usePathname()
  const { user, isLoaded } = useUser()
  const { isAuthenticated } = useConvexAuth()
  const tasks = useQuery(
    api.tasks.getTasks,
    !isAuthenticated ? "skip" : undefined
  )
  const deleteNotification = useMutation(api.notifications.deleteNotification)
  const addUserToAllowedUsers = useMutation(api.documents.addUserToAllowedUsers)
  const notifications = useQuery(api.notifications.getUserNotifications)
  const notificationCount = useMemo(() => notifications?.length ?? 0, [notifications])

  const handleAddUserToAllowedUsers = async (documentId:any, userId:any, notificationId:any) => {
    await addUserToAllowedUsers({ documentId, userId })
    await deleteNotification({ notificationId })
  }



  const pendingTasksCount =
    tasks?.filter(task => task.status === "PENDING").length ?? 0

  return (
    <div className="sticky top-0 hidden h-screen overflow-y-hidden bg-white pl-8 pt-4 md:block overflow-x-hidden">
      <div className="mt-8 flex h-full max-h-screen flex-col justify-center gap-2">
        <div className="mr-6 flex h-14 items-center lg:h-[60px] justify-between">
          <Link href="/" className="flex items-center gap-2 font-semibold">
            <Lightbulb className="size-7" />
            <span className="text-xl font-bold">StudentOS</span>
          </Link>
          <Popover>
            <PopoverTrigger>
              <div className="relative">
                <Bell className="size-6" />
                {notificationCount > 0 && (
                  <Badge className="absolute -top-2 -right-2 rounded-full bg-red-600 hover:bg-red-700 text-[0.7rem] size-5 flex items-center justify-center">{notificationCount}</Badge>
                )}
              </div>
            </PopoverTrigger>
            <PopoverContent className="w-96">
              <div className="flex flex-col">
                <p className="font-bold text-xl">Notifications</p>
                {notifications?.length === 0 ? (
                  <div className="w-full h-full flex flex-col items-center justify-center mt-6">
                    <Image src={noNotificationSVG} alt="no notifications" width={150} height={150} draggable={false} />
                    <p className="mt-6 text-2xl font-bold text-primaryGray">Open the wine bottle</p>
                    <p className="text-primaryGray">You have no notifications to worry about!</p>
                  </div>
                ) : (
                  <div>
                    <Separator className="my-2 w-full"/>
                    {notifications?.map((notification: any) => (
                      <div key={notification._id} className="flex flex-col">
                        <div key={notification._id} className="flex my-1 items-start justify-between">
                          <div className="mt-0.5 mr-2">
                            <Image src={notification.senderImage} alt={"test"} width={48} height={48} className="rounded-full" />
                          </div>
                          <div className="flex flex-col items-start">
                            <p className="text-sm text-gray-500">{notification.text}</p>
                            <div className="flex items-center">
                              <Button className="mr-2 h-6 text-sm w-16" onClick={() => handleAddUserToAllowedUsers(notification.documentId, notification.recieverUserId, notification._id)}>Accept</Button>
                              <Button className="bg-gray-400 h-6 text-sm w-16" onClick={() => deleteNotification({ notificationId: notification._id })}>Decline</Button>
                            </div>
                          </div>
                        </div>
                        <Separator className="w-full my-2"/> 
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </PopoverContent>
          </Popover>
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
              className={`my-1 flex items-center gap-3 rounded-lg px-3 py-2 font-regular transition-all duration-200 ${pathname == "/dashboard/learn-resources" ? "bg-primaryGray text-white hover:text-white" : "bg-none text-mutedGray hover:text-primaryGray"}`}
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
