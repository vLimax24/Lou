"use client"

import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"
import AddProject from "../../../../../../components/dashboard/Dialogs/projects/ProjectDialog"
import { useState } from "react"
import ProjectsSection from "./ProjectsBody"

const ProjectsHeader = () => {
  const [searchQuery, setSearchQuery] = useState("")

  const handleSearch = (event: any) => {
    setSearchQuery(event.target.value)
  }

  return (
    <>
      <div className="m-4 flex w-full max-w-[100vw] items-center justify-between pr-8 lg:m-0 lg:pr-0">
        <div className="relative w-full">
          <Search className="absolute left-4 top-1/2 size-4 -translate-y-1/2 transform text-gray-400" />
          <Input
            placeholder="Search for Projects"
            className="w-full py-4 pl-10"
            value={searchQuery}
            onChange={handleSearch}
          />
        </div>
        <div className="ml-10">
          <AddProject />
        </div>
      </div>
      <ProjectsSection searchQuery={searchQuery} />
    </>
  )
}

export default ProjectsHeader
