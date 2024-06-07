import React from "react"
import { Card, CardTitle } from "@/components/ui/card"
import { api } from "@/convex/_generated/api"
import { useQuery } from "convex/react"
import { convertToTitleCase } from "@/lib/utils"
import Link from "next/link"
import { Skeleton } from "@/components/ui/skeleton"
import { Progress } from "@/components/ui/progress"

const ProjectsCard = () => {
  const projects = useQuery(api.projects.getUpcomingProjects)

  const sortedProjects = projects?.sort(
    (a, b) => new Date(a.deadline).getTime() - new Date(b.deadline).getTime()
  )

  const calculatePercentagePassed = (creationDate: Date, deadline: Date) => {
    const currentDate = new Date()
    const totalDays =
      (deadline.getTime() - creationDate.getTime()) / (1000 * 3600 * 24)
    const daysPassed =
      (currentDate.getTime() - creationDate.getTime()) / (1000 * 3600 * 24)
    return (daysPassed / totalDays) * 100
  }

  const closestProjects = sortedProjects?.slice(0, 2)

  return (
    <Card className="h-full w-full border-none bg-white shadow-none">
      <CardTitle className="flex items-center justify-start text-3xl font-semibold">
        Team Projects
      </CardTitle>
      <div className="mb-5 mt-4 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-1 2xl:grid-cols-2">
        {closestProjects && closestProjects?.length > 0 ? (
          closestProjects.map(project => {
            const deadline: Date = new Date(project.deadline)
            const creationDate: Date = new Date(project._creationTime)
            const formattedCreationDate = creationDate?.toLocaleDateString()
            const formattedDeadline = deadline?.toLocaleDateString()

            const percentagePassed = calculatePercentagePassed(
              creationDate,
              deadline
            )
            let progressValue = Math.min(percentagePassed, 100)

            if (percentagePassed < 5) {
              progressValue = 5
            }

            return (
              <Link
                key={project._id}
                className="flex h-full flex-col items-start justify-between rounded-2xl border border-gray-200 p-5"
                href={`/dashboard/projects/${project._id}`}
              >
                <div className="flex items-center">
                  <div className="mr-2">
                    <Skeleton className="size-[3rem] rounded-md" />
                  </div>
                  <div className="flex flex-col">
                    <h1 className="text-3xl font-bold">
                      {convertToTitleCase(project.name)}
                    </h1>
                    <p className="text-sm text-gray-500">
                      {project.description}
                    </p>
                  </div>
                </div>
                <div className="mt-4 flex w-full flex-col">
                  <div className="flex items-center justify-start">
                    <p className="text-md font-medium">Deadline </p>
                    <p className="text-md ml-2 font-semibold text-red-500">
                      {progressValue >= 100 && (
                        <p className="text-md font-semibold text-red-500">
                          {" "}
                          Expired
                        </p>
                      )}
                    </p>
                  </div>
                  <div className="mt-1 flex w-full items-center justify-between">
                    <p className="text-sm text-gray-500">
                      {formattedCreationDate}
                    </p>
                    <p className="text-sm text-gray-500">{formattedDeadline}</p>
                  </div>
                  <Progress value={progressValue} className="mt-1" />
                </div>
              </Link>
            )
          })
        ) : (
          <div className="flex size-fit flex-col">
            <p className=" text-gray-500">No upcoming projects.</p>
            <Link
              href={"/dashboard/projects"}
              className="text-blue-500 hover:underline"
            >
              <p>+ create new project</p>
            </Link>
          </div>
        )}
      </div>
      {closestProjects && closestProjects?.length > 0 && (
        <Link
          href={"/dashboard/projects"}
          className="text-gray-400 hover:underline"
          onClick={e => e.stopPropagation()}
        >
          View more
        </Link>
      )}
    </Card>
  )
}

export default ProjectsCard
