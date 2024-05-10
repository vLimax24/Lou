"use client"

import { api } from "@/convex/_generated/api"
import { useQuery } from "convex/react"
import { useParams } from "next/navigation"
import { Id } from "@/convex/_generated/dataModel"
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"


const Page = () => {
  const params = useParams<{ projectId: Id<"projects"> }>()
  const projectId = params?.projectId
  const project = useQuery(api.projects.getSpecificProject, { projectId: projectId })
  return (
    <div className="flex flex-col">
        <Breadcrumb>
            <BreadcrumbList>
                <BreadcrumbItem>
                <BreadcrumbLink href="/dashboard">Dashboard</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                <BreadcrumbLink href="/dashboard/projects">Projects</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                <BreadcrumbPage>{project?.name}</BreadcrumbPage>
                </BreadcrumbItem>
            </BreadcrumbList>
        </Breadcrumb>
        <div>
        <Tabs defaultValue="account" className="w-full mt-10">
            <TabsList>
                <TabsTrigger value="account">Overview</TabsTrigger>
                <TabsTrigger value="workitems">Work Items</TabsTrigger>
                <TabsTrigger value="documents">Documents</TabsTrigger>
                <TabsTrigger value="ressources">Ressources</TabsTrigger>
                <TabsTrigger value="settings">Settings</TabsTrigger>
            </TabsList>
            <TabsContent value="account">Make changes to your account here.</TabsContent>
            <TabsContent value="password">Change your password here.</TabsContent>
        </Tabs>
        </div>
    </div>
  )
}

export default Page
