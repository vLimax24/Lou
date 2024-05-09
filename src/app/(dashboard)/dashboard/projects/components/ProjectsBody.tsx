"use client"

import { api } from "@/convex/_generated/api"
import { useQuery } from "convex/react"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"


const ProjectsBody = () => {

    const projects = useQuery(api.projects.getProjects)

  return (
    <div>
      {projects?.map(project => (
        <Card key={project._id} className="w-[400px]">
          <CardHeader>
            <CardTitle>{project.name}</CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription>{project.description}</CardDescription>
          </CardContent>
          <CardFooter>
            <p>Created by {project.owner}</p>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}

export default ProjectsBody
