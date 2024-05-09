"use client"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from "react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ChevronDown } from "lucide-react"
import { api } from "@/convex/_generated/api"
import { useMutation, useQuery } from "convex/react"
import { Textarea } from "@/components/ui/textarea"


const CreateProject = () => {
    const [selectedSubject, setSelectedSubject] = useState<any>(null)
    const [selectedSubjectId, setSelectedSubjectId] = useState<any>("")
    const [name, setName] = useState<string>("")
    const [description, setDescription] = useState<string>("")

    const createNewProject = useMutation(api.projects.addProject)
    
    
    const subjects = useQuery(api.studentSubjects.getUserSubjects)
    
    return (
        <div className="w-full">
            <Sheet>
                <SheetTrigger className="flex items-center bg-primaryGray hover:bg-primaryHoverGray text-white px-4 py-2 rounded-md whitespace-nowrap">
                    <p>New Project</p>
                </SheetTrigger>
                <SheetContent className="w-1/3 sm:max-w-full pl-8">
                    <SheetHeader>
                        <SheetTitle className="font-bold text-3xl mt-7">Create new Project</SheetTitle>
                    </SheetHeader>
                    <div className="grid grid-cols-1 gap-4 mt-4">
                        <div className="flex flex-col items-start justify-between">
                            {/* Add a little red star to mark as required at the top right of the label */}
                            <Label htmlFor="name" className="mb-1 text-md flex">Project Name <p className="text-red-500">*</p></Label>
                            <Input id="name" type="text" placeholder="Project Name" required value={name} onChange={e => setName(e.target.value)}/>
                        </div>
                        <div className="flex flex-col items-start justify-between">
                            <Label htmlFor="description" className="mb-1 text-md flex">Description <p className="text-red-500">*</p></Label>
                            <Textarea id="description" placeholder="1 Minute Speech in Geography" required className="h-32" value={description} onChange={e => setDescription(e.target.value)}/>
                        </div>
                        <div className="flex flex-col items-start justify-between">
                            <Label htmlFor="description" className="mb-1 text-md flex">Choose a subject <p className="text-red-500">*</p></Label>
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="outline">{selectedSubject ? selectedSubject : "Select"} <ChevronDown className="size-4 ml-2"/></Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent>
                                    {subjects?.map(subject => (
                                        <DropdownMenuItem key={subject._id} onClick={() => {
                                            setSelectedSubject(subject.name) 
                                            setSelectedSubjectId(subject._id)
                                        }}>
                                            <p>{subject.name}</p>
                                        </DropdownMenuItem>
                                    ))}
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                    </div>
                    <div className="mt-4 flex items-center w-full justify-end">
                        <Button className=" bg-primaryGray hover:bg-primaryHoverGray" onClick={() => createNewProject({ name: name, description: description, subject: selectedSubjectId })}>Create Project</Button>
                    </div>
                </SheetContent>
            </Sheet>
        </div>
  )
}

export default CreateProject
