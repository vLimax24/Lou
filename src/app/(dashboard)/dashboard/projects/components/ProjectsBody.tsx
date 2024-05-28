"use client"

import { api } from "@/convex/_generated/api"
import { useQuery, useMutation } from "convex/react"
import { Card, CardContent } from "@/components/ui/card"
import { useState, useEffect } from "react"
import { Id } from "@/convex/_generated/dataModel"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { Progress } from "@/components/ui/progress"
import { MoreVertical, Settings, Pin } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Link from "next/link"
import { useRouter } from "next/navigation"

const ProjectsSection = ({ searchQuery }: any) => {
  const projects = useQuery(api.projects.getProjects)
  const pinProject = useMutation(api.projects.pinProject)

  const [pinnedProjects, setPinnedProjects] = useState([])
  const [unpinnedProjects, setUnpinnedProjects] = useState([])
  const router = useRouter()

  useEffect(() => {
    if (projects) {
      const pinned: any = projects.filter(
        project =>
          project.pinned &&
          project.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
      const unpinned: any = projects.filter(
        project =>
          !project.pinned &&
          project.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
      setPinnedProjects(pinned)
      setUnpinnedProjects(unpinned)
    }
  }, [projects, searchQuery])

  const calculatePercentagePassed = (creationDate: Date, deadline: Date) => {
    const currentDate = new Date()
    const totalDays =
      (deadline.getTime() - creationDate.getTime()) / (1000 * 3600 * 24)
    const daysPassed =
      (currentDate.getTime() - creationDate.getTime()) / (1000 * 3600 * 24)
    return (daysPassed / totalDays) * 100
  }

  const GetUserSubject = ({ subjectId }: { subjectId: Id<"subjects"> }) => {
    const colorTable: any = {
      "red-500": "bg-red-500",
      "green-500": "bg-green-500",
      "blue-500": "bg-blue-500",
      "yellow-500": "bg-yellow-500",
      "pink-500": "bg-pink-500",
      "gray-500": "bg-gray-500",
      "orange-500": "bg-orange-500",
      "teal-500": "bg-teal-500",
      "purple-500": "bg-purple-500",
      "brown-500": "bg-brown-500",
      "cyan-500": "bg-cyan-500",
      "lime-500": "bg-lime-500",
      "indigo-500": "bg-indigo-500",
      "violet-500": "bg-violet-500",
      "fuchsia-500": "bg-fuchsia-500",
      "rose-500": "bg-rose-500",
    }

    const subject: any = useQuery(api.subjects.getSubject, {
      subjectId: subjectId,
    })

    return (
      <>
        {subject ? (
          <Badge
            className={`w-fit ${colorTable[subject?.color]} hover:${colorTable[subject?.color]}`}
          >
            {subject?.name}
          </Badge>
        ) : (
          <Skeleton className="h-6 w-16 rounded-xl" />
        )}
      </>
    )
  }

  return (
    <div className="flex flex-col">
      {pinnedProjects.length > 0 && (
        <div className="flex flex-col">
          <h2 className="mx-4 mb-4 mt-10 flex items-center justify-start text-2xl font-bold lg:mx-0">
            <Pin className="mr-1 size-7" />
            Pinned Projects
          </h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4">
            {pinnedProjects?.map((project: any) => {
              const deadline: Date = new Date(project.deadline)
              const creationDate: Date = new Date(project._creationTime)
              const formattedCreationDate = creationDate?.toLocaleDateString()
              const formattedDeadline = deadline?.toLocaleDateString()

              const handlePinnedChange = async () => {
                if (project.pinned) {
                  await pinProject({ projectId: project._id, pinned: false })
                } else {
                  await pinProject({ projectId: project._id, pinned: true })
                }
              }

              const percentagePassed = calculatePercentagePassed(
                creationDate,
                deadline
              )
              let progressValue = Math.min(percentagePassed, 100)

              if (percentagePassed < 5) {
                progressValue = 5
              }

              return (
                <Card
                  key={project._id}
                  className="mx-4 border-none pt-6 hover:cursor-pointer lg:mx-0"
                  onClick={() =>
                    router.push(`/dashboard/projects/${project._id}`)
                  }
                >
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div>
                          <Skeleton className="size-[3rem] rounded-md" />
                        </div>
                        <div className="ml-4 flex flex-col">
                          <p className="text-xl font-bold">{project.name}</p>
                          <GetUserSubject subjectId={project.subject} />
                        </div>
                      </div>
                      <div>
                        <DropdownMenu>
                          <DropdownMenuTrigger>
                            <MoreVertical className="size-5" />
                          </DropdownMenuTrigger>
                          <DropdownMenuContent>
                            <DropdownMenuItem
                              className="flex items-center justify-start"
                              onClick={e => {
                                e.stopPropagation()
                                handlePinnedChange()
                              }}
                            >
                              <Pin className="mr-1 size-4" />{" "}
                              {project.pinned ? "Unpin" : "Pin"} Project
                            </DropdownMenuItem>
                            <Link
                              href={`/dashboard/projects/${project._id}/settings`}
                            >
                              <DropdownMenuItem className="flex items-center justify-start">
                                <Settings className="mr-1 size-4" /> Settings
                              </DropdownMenuItem>
                            </Link>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                    <div className="mt-4 flex flex-col">
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
                      <div className="mt-1 flex items-center justify-between">
                        <p className="text-sm text-gray-500">
                          {formattedCreationDate}
                        </p>
                        <p className="text-sm text-gray-500">
                          {formattedDeadline}
                        </p>
                      </div>
                    </div>
                    <Progress value={progressValue} className="mt-1" />
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      )}

      {unpinnedProjects.length > 0 && (
        <div className="flex flex-col">
          <h2 className="mx-4 mb-4 mt-10 text-2xl font-bold lg:mx-0">
            Other Projects
          </h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4">
            {unpinnedProjects?.map((project: any) => {
              const deadline: Date = new Date(project.deadline)
              const creationDate: Date = new Date(project._creationTime)
              const formattedCreationDate = creationDate?.toLocaleDateString()
              const formattedDeadline = deadline?.toLocaleDateString()

              const handlePinnedChange = async () => {
                if (project.pinned) {
                  await pinProject({ projectId: project._id, pinned: false })
                } else {
                  await pinProject({ projectId: project._id, pinned: true })
                }
              }

              const percentagePassed = calculatePercentagePassed(
                creationDate,
                deadline
              )
              let progressValue = Math.min(percentagePassed, 100)

              if (percentagePassed < 5) {
                progressValue = 5
              }

              return (
                <Card
                  key={project._id}
                  className="mx-4 border-none pt-6 hover:cursor-pointer lg:mx-0"
                  onClick={() =>
                    router.push(`/dashboard/projects/${project._id}`)
                  }
                >
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div>
                          <Skeleton className="size-[3rem] rounded-md" />
                        </div>
                        <div className="ml-4 flex flex-col">
                          <p className="text-xl font-bold">{project.name}</p>
                          <GetUserSubject subjectId={project.subject} />
                        </div>
                      </div>
                      <div>
                        <DropdownMenu>
                          <DropdownMenuTrigger>
                            <MoreVertical className="size-5" />
                          </DropdownMenuTrigger>
                          <DropdownMenuContent>
                            <DropdownMenuItem
                              className="flex items-center justify-start"
                              onClick={e => {
                                e.stopPropagation()
                                handlePinnedChange()
                              }}
                            >
                              <Pin className="mr-1 size-4" />{" "}
                              {project.pinned ? "Unpin" : "Pin"} Project
                            </DropdownMenuItem>
                            <Link
                              href={`/dashboard/projects/${project._id}/settings`}
                            >
                              <DropdownMenuItem className="flex items-center justify-start">
                                <Settings className="mr-1 size-4" /> Settings
                              </DropdownMenuItem>
                            </Link>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                    <div className="mt-4 flex flex-col">
                      <div className="flex items-center justify-start">
                        <p className="text-md font-medium">Deadline </p>
                        <p className="text-md ml-2 font-semibold text-red-500">
                          {progressValue >= 100 && (
                            <p className="text-md font-semibold text-red-500">
                              Expired
                            </p>
                          )}
                        </p>
                      </div>
                      <div className="mt-1 flex items-center justify-between">
                        <p className="text-sm text-gray-500">
                          {formattedCreationDate}
                        </p>
                        <p className="text-sm text-gray-500">
                          {formattedDeadline}
                        </p>
                      </div>
                    </div>
                    <Progress value={progressValue} className="mt-1" />
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}

export default ProjectsSection
