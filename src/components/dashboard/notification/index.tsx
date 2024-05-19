// NotificationDialog.js
import React, { useMemo } from "react"
import { Button } from "@/components/ui/button"
import { Bell } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"
import { Separator } from "@/components/ui/separator"
import noNotificationSVG from "../../../../public/party-popper-svgrepo-com.svg"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { api } from "@/convex/_generated/api"
import { useMutation, useQuery } from "convex/react"

const NotificationDialog = () => {
  const deleteNotification = useMutation(api.notifications.deleteNotification)
  const addUserToAllowedUsers = useMutation(api.documents.addUserToAllowedUsers)
  const addUserToAllowedUsersProject = useMutation(api.projects.addUserToAllowedUsers)
  const notifications = useQuery(api.notifications.getUserNotifications)
  const notificationCount = useMemo(() => notifications?.length ?? 0, [notifications])

  const handleAddUserToAllowedUsersDocument = async (documentId:any, userId:any, notificationId:any) => {
    await addUserToAllowedUsers({ documentId, userId })
    await deleteNotification({ notificationId })
  }

  const handleAddUserToAllowedUsersProject = async (projectId:any, userId:any, notificationId:any) => {
    await addUserToAllowedUsersProject({ projectId, userId })
    await deleteNotification({ notificationId })
  }

  return (
    <Popover >
            <PopoverTrigger className="relative p-4 rounded-md bg-primaryGray text-white">
              <div className="relative">
                <Bell className="size-6" />
              </div>
              {notificationCount > 0 && (
                  <Badge className="absolute -top-2 -right-2 rounded-full bg-red-600 hover:bg-red-700 text-[0.8rem] size-6 flex items-center justify-center">{notificationCount}</Badge>
              )}
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
                              {notification.projectId ? (
                                <Button className="mr-2 h-6 text-sm w-16" onClick={() => handleAddUserToAllowedUsersProject(notification.projectId, notification.recieverUserId, notification._id)}>Accept</Button>
                              ) : (
                                <Button className="mr-2 h-6 text-sm w-16" onClick={() => handleAddUserToAllowedUsersDocument(notification.documentId, notification.recieverUserId, notification._id)}>Accept</Button>
                              )}
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
  )
}

export default NotificationDialog
