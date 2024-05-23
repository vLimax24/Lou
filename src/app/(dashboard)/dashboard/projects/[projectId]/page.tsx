"use client"

import { api } from "@/convex/_generated/api"
import { useQuery } from "convex/react"
import { useParams } from "next/navigation"
import { Id } from "@/convex/_generated/dataModel"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import SettingsTab from "./_components/SettingsTab"
import WorkItemsTab from "./_components/WorkItemsTab"
import DocumentsTab from "./_components/DocumentsTab"
import RessourcesTab from "./_components/ResourcesTab"
import CollaboratorsTab from "./_components/CollaboratorsTab"

const Page = () => {
  const params = useParams<{ projectId: Id<"projects"> }>()
  const projectId = params?.projectId
  const project = useQuery(api.projects.getSpecificProject, {
    projectId: projectId,
  })
  const user = useQuery(api.users.getMyUser)

  const isOwner = project?.owner === user?._id
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
      <div className="flex items-start justify-start">
        <Tabs
          defaultValue="workitems"
          className="mt-10 w-full transition-all duration-300 ease-in-out md:mx-0 md:scale-100"
          orientation="horizontal"
        >
          <TabsList className="max-w-full">
            <TabsTrigger value="workitems">Work Items</TabsTrigger>
            <TabsTrigger value="documents">Documents</TabsTrigger>
            <TabsTrigger value="ressources">Ressources</TabsTrigger>
            {isOwner && (
              <TabsTrigger value="collaborators">Collaborators</TabsTrigger>
            )}
            {isOwner && <TabsTrigger value="settings">Settings</TabsTrigger>}
          </TabsList>
          {!project ? (
            <div className="flex h-full flex-col items-center justify-center">
              <div className="text-center">
                <p className="text-lg">Loading...</p>
              </div>
            </div>
          ) : (
            <>
              <TabsContent value="workitems">
                <WorkItemsTab project={project} />
              </TabsContent>
              <TabsContent value="documents">
                <DocumentsTab project={project} />
              </TabsContent>
              <TabsContent value="ressources">
                <RessourcesTab project={project} />
              </TabsContent>
              <TabsContent value="collaborators">
                <CollaboratorsTab project={project} />
              </TabsContent>
              <TabsContent value="settings">
                <SettingsTab project={project} />
              </TabsContent>
            </>
          )}
        </Tabs>
      </div>
    </div>
  )
}

export default Page
