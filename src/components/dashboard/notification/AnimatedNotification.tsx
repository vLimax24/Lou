"use client"

import React from "react"
import { Badge } from "@/components/ui/badge"
import { useTranslations } from "next-intl"
import { cn } from "@/lib/utils"
import { Id } from "@/convex/_generated/dataModel"

interface Event {
  _id: Id<"events">
  _creationTime: number
  subjectId?: Id<"subjects"> | undefined
  userId: Id<"users">
  type: string
  date: string
  description: string
  title: string
}

interface Task {
  _id: Id<"tasks">
  _creationTime: number
  subjectId?: Id<"subjects"> | undefined
  userId: Id<"users">
  status: string
  text: string
}

type NotificationProps = {
  data: Event | Task
  isTask: boolean
}

export const AnimatedNotification = ({ data, isTask }: NotificationProps) => {
  const t = useTranslations()

  if (isTask) {
    const task = data as Task
    return (
      <figure
        className={cn(
          "relative min-h-fit w-full transform cursor-pointer overflow-hidden rounded-2xl p-4",
          "transition-all duration-200 ease-in-out hover:scale-[103%]",
          "bg-white [box-shadow:0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.05)]",
          "transform-gpu dark:bg-transparent dark:backdrop-blur-md dark:[border:1px_solid_rgba(255,255,255,.1)] dark:[box-shadow:0_-20px_80px_-20px_#ffffff1f_inset]"
        )}
      >
        <div className="flex flex-row items-center gap-3">
          <div
            className="flex h-10 w-10 min-w-10 items-center justify-center rounded-2xl"
            style={{
              backgroundColor:
                task.status === "COMPLETED"
                  ? "#2daf43"
                  : task.status === "IN-PROGRESS"
                    ? "#1e86ff"
                    : "#ffb800",
            }}
          >
            <span className="text-lg">
              {task.status === "COMPLETED"
                ? "🏁"
                : task.status === "IN-PROGRESS"
                  ? "➡️"
                  : "📋"}
            </span>
          </div>
          <div className="flex flex-col overflow-hidden">
            <figcaption className="flex flex-row flex-wrap items-center whitespace-pre text-lg font-medium dark:text-white">
              <span className="text-sm sm:text-lg">{task.text}</span>
              <span className="mx-1">·</span>
              <span className="text-xs text-gray-500">
                <Badge
                  className={`h-5 ${
                    task.status === "COMPLETED"
                      ? "bg-[#2daf43] hover:bg-[#3e9e53]"
                      : task.status === "IN-PROGRESS"
                        ? "bg-[#1e86ff] hover:bg-[#2a7ae6]"
                        : "bg-[#ffb800] hover:bg-[#bb9430]"
                  } transition-all duration-300 ease-in-out`}
                >
                  {task.status === "COMPLETED"
                    ? t("Dashboard.home.tasks.completed")
                    : task.status === "IN-PROGRESS"
                      ? t("Dashboard.home.tasks.inProgress")
                      : t("Dashboard.home.tasks.toDo")}
                </Badge>
              </span>
            </figcaption>
          </div>
        </div>
      </figure>
    )
  }

  const event = data as Event
  return (
    <figure
      className={cn(
        "relative min-h-fit w-full transform cursor-pointer overflow-hidden rounded-2xl p-4",
        "transition-all duration-200 ease-in-out hover:scale-[103%]",
        "bg-white [box-shadow:0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.05)]",
        "transform-gpu dark:bg-transparent dark:backdrop-blur-md dark:[border:1px_solid_rgba(255,255,255,.1)] dark:[box-shadow:0_-20px_80px_-20px_#ffffff1f_inset]"
      )}
    >
      <div className="flex flex-row items-center gap-3">
        <div
          className="flex h-10 w-10 min-w-10 items-center justify-center rounded-2xl"
          style={{
            backgroundColor:
              event.type === "ASSIGNMENT"
                ? "#0089EC"
                : event.type === "EXAM"
                  ? "rgb(15 118 110)"
                  : "#ff3d71",
          }}
        >
          <span className="text-lg">
            {event.type === "ASSIGNMENT"
              ? "🏠"
              : event.type === "EXAM"
                ? "🎯"
                : "📚"}
          </span>
        </div>
        <div className="flex flex-col overflow-hidden">
          <figcaption className="flex flex-row flex-wrap items-center whitespace-pre text-lg font-medium dark:text-white">
            <span className="text-sm sm:text-lg">{event.title}</span>
            <span className="mx-1">·</span>
            <span className="text-xs text-gray-500">
              {new Date(event.date).toLocaleDateString()}
            </span>
            <span className="mx-1">·</span>
            <span className="text-xs text-gray-500">
              <Badge
                className={`h-5 ${
                  event.type === "ASSIGNMENT"
                    ? "bg-primaryBlue hover:bg-primaryHover"
                    : event.type === "EXAM"
                      ? "bg-teal-700 hover:bg-teal-800"
                      : "bg-[#ff3d71] hover:bg-[#c52b54]"
                } transition-all duration-300 ease-in-out`}
              >
                {event.type === "ASSIGNMENT"
                  ? t("Dashboard.home.events.assignment")
                  : event.type === "EXAM"
                    ? t("Dashboard.home.events.exam")
                    : t("Dashboard.home.events.other")}
              </Badge>
            </span>
          </figcaption>
          <p className="font-normal break-words text-sm dark:text-white/60">
            {event.description}
          </p>
        </div>
      </div>
    </figure>
  )
}
