import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"
import CreateProject from "./CreateProject"

const ProjectsHeader = () => {
  return (
    <>
    <div className="flex items-center w-full justify-between">
        <div className="relative w-full">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 size-4"/>
            <Input placeholder="Search for Projects" className="py-4 pl-10 w-full" />
        </div>
        <div className="ml-10">
            <CreateProject/>
        </div>
    </div>
    </>
  )
}

export default ProjectsHeader
