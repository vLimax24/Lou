"use client"

import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"
import CreateProject from "./CreateProject"
import { useState } from "react"
import ProjectsSection from "./ProjectsBody"

const ProjectsHeader = () => {
  const [searchQuery, setSearchQuery] = useState("")

  const handleSearch = (event:any) => {
    setSearchQuery(event.target.value)
  }

  
  return (
    <>
    <div className="flex items-center w-full justify-between m-4 pr-8 lg:pr-0 lg:m-0 max-w-[100vw]">
        <div className="relative w-full">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 size-4"/>
            <Input 
              placeholder="Search for Projects" 
              className="py-4 pl-10 w-full"             
              value={searchQuery}
              onChange={handleSearch}/>
        </div>
        <div className="ml-10">
            <CreateProject/>
        </div>
    </div>
    <ProjectsSection searchQuery={searchQuery}/>
    </>
  )
}

export default ProjectsHeader
