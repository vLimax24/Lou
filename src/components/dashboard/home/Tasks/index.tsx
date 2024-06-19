import React from "react"
import { Card, CardTitle } from "@/components/ui/card"
import { api } from "@/convex/_generated/api"
import { useQuery } from "convex/react"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { Skeleton } from "@/components/ui/skeleton"
import { useTranslations } from "next-intl"
import { AnimatedList } from "@/components/magicui/animated-list"
import { AnimatedNotification } from "@/components/dashboard/notification/AnimatedNotification"

const TasksCard = () => {
  const tasks = useQuery(api.tasks.getTasks)
  const t = useTranslations()

  return (
    <Card className="w-full border-none bg-white shadow-none">
      <CardTitle className="flex items-center justify-start text-3xl font-semibold">
        {t("Dashboard.home.tasks.title")}
      </CardTitle>
      <div className="mb-5 mt-3 flex flex-col">
        {tasks === undefined ? (
          <div className="space-y-2">
            <Skeleton className="h-14 w-full" />
            <Skeleton className="h-12 w-full" />
          </div>
        ) : tasks.length === 0 ? (
          <div className="text-left text-gray-500">
            {t("Dashboard.home.tasks.noTasks")}
          </div>
        ) : (
          <>
            <div className="relative">
              <AnimatedList>
                {tasks &&
                  tasks.length > 0 &&
                  tasks
                    .slice(0, 3)
                    .map(task => (
                      <AnimatedNotification
                        key={task._id}
                        data={task}
                        isTask={true}
                      />
                    ))}
              </AnimatedList>
            </div>
            <Link
              href={"/dashboard/tasks"}
              className="mt-2 text-gray-400 hover:underline"
            >
              {t("Dashboard.home.tasks.viewMore")}
            </Link>
          </>
        )}
      </div>
    </Card>
  )
}

export default TasksCard
