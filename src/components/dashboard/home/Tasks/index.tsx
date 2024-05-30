import React from "react"
import { Card, CardTitle } from "@/components/ui/card"
import { api } from "@/convex/_generated/api"
import { useQuery } from "convex/react"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { Skeleton } from "@/components/ui/skeleton"
import { useTranslations } from "next-intl"

const TasksCard = () => {
  const tasks = useQuery(api.tasks.getTasks)
  const t = useTranslations()

  return (
    <Card className="w-full border-none bg-white shadow-none">
      <CardTitle className="ml-2 flex items-center justify-start text-3xl font-semibold">
        {t("Dashboard.home.tasks.title")}
      </CardTitle>
      <div className="mb-5 mt-3 flex flex-col">
        {tasks === undefined ? (
          <>
            <div className="my-1.5 flex items-center justify-between rounded-xl border border-gray-400 p-4">
              <Skeleton className="h-6 w-3/4" />
              <Skeleton className="h-6 w-1/4" />
            </div>
            <div className="my-1.5 flex items-center justify-between rounded-xl border border-gray-400 p-4">
              <Skeleton className="h-6 w-3/4" />
              <Skeleton className="h-6 w-1/4" />
            </div>
          </>
        ) : tasks.length === 0 ? (
          <div className="text-center text-gray-500">
            {t("Dashboard.home.tasks.noTasks")}
          </div>
        ) : (
          tasks.slice(0, 3).map(task => (
            <div
              className="my-1.5 flex items-center justify-between rounded-xl border border-gray-400 p-4"
              key={task._id}
            >
              <div className="flex items-center gap-1">
                <div className="text-lg font-medium">{task.text}</div>
                <div className="text-sm text-gray-500">
                  {task?.subject?.name}
                </div>
              </div>
              <Badge
                className={`${
                  task.status === "PENDING"
                    ? "bg-primaryBlue hover:bg-primaryHover"
                    : task.status === "IN-PROGRESS"
                      ? "bg-teal-700 hover:bg-teal-800"
                      : "bg-green-500 hover:bg-green-600"
                } transition-all duration-300 ease-in-out`}
              >
                {task.status === "IN-PROGRESS"
                  ? t("Dashboard.home.tasks.inProgress")
                  : task.status === "COMPLETED"
                    ? t("Dashboard.home.tasks.completed")
                    : t("Dashboard.home.tasks.toDo")}
              </Badge>
            </div>
          ))
        )}
      </div>
      <Link href={"/dashboard/tasks"} className="text-gray-400 hover:underline">
        {t("Dashboard.home.tasks.viewMore")}
      </Link>
    </Card>
  )
}

export default TasksCard
