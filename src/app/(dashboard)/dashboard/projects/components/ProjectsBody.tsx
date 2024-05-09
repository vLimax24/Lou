"use client"

import { api } from "@/convex/_generated/api"
import { useQuery } from "convex/react"
import { Card, CardContent } from "@/components/ui/card"
import { Id } from "@/convex/_generated/dataModel"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { Progress } from "@/components/ui/progress"
import { MoreVertical } from "lucide-react"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"

const ProjectsBody = ({ searchQuery }:any) => {

    const projects = useQuery(api.projects.getProjects)

    const filteredProjects = projects?.filter((project) =>
        project.name.toLowerCase().includes(searchQuery.toLowerCase())
    )
    

    const calculatePercentagePassed = (creationDate: Date, deadline: Date) => {
        const currentDate = new Date()
        const totalDays = (deadline.getTime() - creationDate.getTime()) / (1000 * 3600 * 24)
        const daysPassed = (currentDate.getTime() - creationDate.getTime()) / (1000 * 3600 * 24)
        return (daysPassed / totalDays) * 100
    }

    const GetUserSubject = ({ subjectId }: { subjectId: Id<"subjects"> }) => {

        const colorTable:any = {
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

        const subject:any = useQuery(api.subjects.getSubject, { subjectId: subjectId })

        return (
            <>
                {subject ? (
                    <Badge className={`w-fit ${colorTable[subject?.color]} hover:${colorTable[subject?.color]}`}>{subject?.name}</Badge>
                ) : (
                    <Skeleton className="w-16 h-6 rounded-xl"/>
                )}
            </>
        )
    }

    return (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4">
            {filteredProjects?.map((project: any) => {
                const deadline: Date = new Date(project.deadline)
                const creationDate: Date = new Date(project._creationTime)
                const formattedCreationDate = creationDate?.toLocaleDateString()
                const formattedDeadline = deadline?.toLocaleDateString()
                
                const percentagePassed = calculatePercentagePassed(creationDate, deadline)
                let progressValue = Math.min(percentagePassed, 100)
                
                if (percentagePassed < 5) {
                    progressValue = 5
                }

                return (
                    <Card key={project._id} className="border-none pt-6 mx-4 lg:mx-0">
                        <CardContent>
                            <div className="flex items-center justify-between">
                                <div className="flex items-center">
                                    <div>
                                        <Skeleton className="size-[3rem] rounded-md"/>
                                    </div>
                                    <div className="flex flex-col ml-4">
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
                                            <DropdownMenuLabel>My Account</DropdownMenuLabel>
                                            <DropdownMenuSeparator />
                                            <DropdownMenuItem>Profile</DropdownMenuItem>
                                            <DropdownMenuItem>Billing</DropdownMenuItem>
                                            <DropdownMenuItem>Team</DropdownMenuItem>
                                            <DropdownMenuItem>Subscription</DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </div>
                            </div>
                            <div className="flex flex-col mt-4">
                                <p className="text-md font-medium">Deadline</p>
                                <div className="flex items-center justify-between mt-1">
                                    <p className="text-sm text-gray-500">{formattedCreationDate}</p>
                                    <p className="text-sm text-gray-500">{formattedDeadline}</p>
                                </div>
                            </div>
                            <Progress value={progressValue} className="mt-1"/>
                        </CardContent>
                    </Card>
                )
            })}
        </div>
    )
}

export default ProjectsBody
