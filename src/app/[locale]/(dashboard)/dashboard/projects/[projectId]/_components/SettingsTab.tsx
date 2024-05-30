import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import { api } from "@/convex/_generated/api"
import { useMutation } from "convex/react"
import { toast } from "sonner"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Calendar } from "@/components/ui/calendar"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { useRouter } from "next/navigation"


const SettingsTab = ({ project } : { project: any}) => {
    const [name, setName] = useState<string>(project?.name)
    const [description, setDescription] = useState<string>(project?.description)
    const [deadline, setDeadline] = useState<Date>(project?.deadline)

    const router = useRouter()

    const updateProjectName = useMutation(api.projects.updateProjectName)
    const updateProjectDescription = useMutation(api.projects.updateProjectDescription)
    const updateProjectDeadline = useMutation(api.projects.updateDeadline)
    const deleteProject = useMutation(api.projects.deleteProject)

  return (
    <div className="flex flex-col mt-5">
      <Card className="border-none p-5 mx-2 lg:mx-0 w-[700px]">
        <h1 className="font-bold text-xl">Project Name</h1>
        <p className="text-sm text-gray-500">Update your project name here</p>
        <div className="flex items-start flex-col justify-start mt-5">
            <div className="flex flex-col w-full">
                <Label htmlFor="name" className="mb-1 text-md flex w-full">Project Name</Label>
                <Input id="name" type="text" placeholder="Project Name" value={name} onChange={e => setName(e.target.value)}/>
            </div>
            <Button className="bg-primaryGray hover:bg-primaryHoverGray mt-2 w-28" onClick={() => {
                updateProjectName({ projectId: project._id, name: name })
                toast.success("Project name updated!")
            }}>Update</Button>
        </div>
      </Card>
      <Card className="border-none p-5 mx-2 lg:mx-0 w-[700px] mt-2">
        <h1 className="font-bold text-xl">Task</h1>
        <p className="text-sm text-gray-500">Update your task here</p>
        <div className="flex items-start flex-col mt-5">
            <div className="flex flex-col w-full">
                <Label htmlFor="name" className="mb-1 text-md flex w-full">Task</Label>
                <Textarea id="name" placeholder="Task" value={description} onChange={e => setDescription(e.target.value)}/>
            </div>
            <Button className="bg-primaryGray hover:bg-primaryHoverGray mt-2 w-28" onClick={() => {
                updateProjectDescription({ projectId: project._id, description: name })
                toast.success("Task updated!")
            }}>Update</Button>
        </div>
      </Card>
      <Card className="border-none p-5 mx-2 lg:mx-0 w-[700px] mt-2">
        <h1 className="font-bold text-xl">Deadline</h1>
        <p className="text-sm text-gray-500">Updsate your deadline to the correct date</p>
        <div className="flex items-start flex-col mt-5">
            <div className="flex flex-col w-full">
                <Label htmlFor="name" className="mb-1 text-md flex w-full">Deadline</Label>
                <Calendar className="w-fit border rounded-md" selected={deadline} onSelect={date => setDeadline(date || new Date())} mode="single"/>
            </div>
            <Button className="bg-primaryGray hover:bg-primaryHoverGray mt-2 w-28" onClick={() => {
                const formattedDate = deadline?.toISOString()
                updateProjectDeadline({ projectId: project._id, deadline: formattedDate })
                toast.success("Deadline updated!")
            }}>Update</Button>
        </div>
      </Card>
      <Card className="border border-red-600 bg-red-500 bg-opacity-30 p-5 mx-6 lg:mx-0 w-[700px] mt-2">
        <h1 className="font-bold text-xl">Danger Zone</h1>
        <p className="text-sm text-gray-500">Delete the project</p>
        <Dialog>
            <DialogTrigger className="bg-red-500 hover:bg-red-600 text-white rounded-md w-28 mt-2">
                <Button className="bg-red-500 hover:bg-red-600 text-white rounded-md w-28">
                    Delete
                </Button>
            </DialogTrigger>
            <DialogContent className="w-[700px]">
                <DialogHeader>
                    <DialogTitle>Delete Project</DialogTitle>
                    <DialogDescription>Are you sure you want to delete this project?</DialogDescription>
                </DialogHeader>
                <div className="flex items-center justify-between">
                    <p className="text-sm text-gray-500">This action cannot be undone</p>
                    <Button className="bg-red-500 hover:bg-red-600 text-white rounded-md w-28 mt-2" onClick={() => {
                        deleteProject({ projectId: project._id })
                        router.push("/dashboard/projects")
                        toast.success("Project deleted!")
                    }}>Delete</Button>
                </div>
            </DialogContent>
        </Dialog>
      </Card>
    </div>
  )
}

export default SettingsTab
