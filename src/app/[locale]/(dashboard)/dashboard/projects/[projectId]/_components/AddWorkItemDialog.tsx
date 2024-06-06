import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { api } from "@/convex/_generated/api"
import { useMutation, useQuery } from "convex/react"
import { Label } from "@/components/ui/label"
import { useState } from "react"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ChevronDown } from "lucide-react"
import { Id } from "@/convex/_generated/dataModel"
import Image from "next/image"

const AddWorkItemDialog = ({ projectId }: { projectId: Id<"projects"> }) => {
  const [title, setTitle] = useState<string>("")
  const [description, setDescription] = useState<string>("")
  const [assignee, setAssignee] = useState<Id<"users">>()
  const [assigneeImage, setAssigneeImage] = useState<string>("")
  const [assigneeUsername, setAssigneeUsername] = useState<string>("Select")
  const [status, setStatus] = useState<string>("PENDING")
  const [priority, setPriority] = useState<string>("Normal")
  const [type, setType] = useState<string>("Writing")

  const myUser = useQuery(api.users.getMyUser)

  const getAllowedUsers = useQuery(api.projects.getAllowedUsers, {
    projectId: projectId,
  })
  const addWorkItem = useMutation(api.teamProjectWorkItems.addWorkItem)

  const formatString = (input: string) => {
    let formattedString =
      input.charAt(0).toUpperCase() + input.slice(1).toLowerCase()
    formattedString = formattedString.replace(/-/g, " ")
    return formattedString
  }

  const HandleAllowedUsers = () => {
    if (getAllowedUsers) {
      const allUsers = [...getAllowedUsers, myUser]

      return allUsers?.map((user: any) => (
        <div key={user._id} className="flex items-center justify-between">
          <DropdownMenuItem
            className="flex w-full items-center"
            onClick={() => {
              setAssignee(user._id)
              setAssigneeImage(user.profileImage)
              setAssigneeUsername(user.username)
            }}
          >
            <Image
              src={user.profileImage}
              alt={user.name}
              width={30}
              height={30}
              className="mr-3 rounded-full"
            />
            <p>{user.username}</p>
          </DropdownMenuItem>
        </div>
      ))
    }
  }
  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <Button className="bg-primaryGray hover:bg-primaryHoverGray">
            Add Work Item
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Add Work Item</DialogTitle>
            <DialogDescription>
              Add a new work item for your project.
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col">
            <div className="flex flex-col">
              <Label className="mb-1 flex items-center">
                Title <p className="text-red-500">*</p>
              </Label>
              <Input
                placeholder="Write the Script"
                className="h-12"
                value={title}
                onChange={e => setTitle(e.target.value)}
              />
            </div>
            <div className="mt-5 flex flex-col">
              <Label className="mb-1 flex items-center">
                Description <p className="text-red-500">*</p>
              </Label>
              <Textarea
                placeholder="Write the Script with about 2500 words"
                className="h-12"
                value={description}
                onChange={e => setDescription(e.target.value)}
              />
            </div>
            <div className="mt-5 flex w-full items-center justify-between">
              <div className="mr-2 flex flex-1 flex-col">
                <Label className="mb-1 flex items-center">
                  Status <p className="text-red-500">*</p>
                </Label>
                <DropdownMenu>
                  <DropdownMenuTrigger className="flex w-full items-center justify-between rounded-md border p-2">
                    <p>{formatString(status)}</p>
                    <ChevronDown className="size-5" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem onClick={() => setStatus("PENDING")}>
                      To Do
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setStatus("IN-PROGRESS")}>
                      In Progress
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setStatus("COMPLETED")}>
                      Completed
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              <div className="mr-2 flex flex-1 flex-col">
                <Label className="mb-1 flex items-center">
                  Priority <p className="text-red-500">*</p>
                </Label>
                <DropdownMenu>
                  <DropdownMenuTrigger className="flex w-full items-center justify-between rounded-md border p-2">
                    <p>{priority}</p>
                    <ChevronDown className="size-5" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem onClick={() => setPriority("High")}>
                      High
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setPriority("Medium")}>
                      Medium
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setPriority("Normal")}>
                      Normal
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setPriority("Low")}>
                      Low
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              <div className="flex flex-1 flex-col">
                <Label className="mb-1 flex items-center">
                  Type <p className="text-red-500">*</p>
                </Label>
                <DropdownMenu>
                  <DropdownMenuTrigger className="flex w-full items-center justify-between rounded-md border p-2">
                    <p>{type}</p>
                    <ChevronDown className="size-5" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem onClick={() => setType("Writing")}>
                      Writing
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setType("Speaking")}>
                      Speaking
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setType("Reading")}>
                      Reading
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
            <div className="mt-5 flex w-full flex-col">
              <Label className="mb-1 flex items-center">
                Assignee <p className="text-red-500">*</p>
              </Label>
              <DropdownMenu>
                <DropdownMenuTrigger className="flex w-full items-center justify-between rounded-md border p-2">
                  <div className="flex items-center">
                    {assigneeImage && (
                      <Image
                        src={assigneeImage}
                        alt={assigneeUsername}
                        width={30}
                        height={30}
                        className="mr-3 rounded-full"
                      />
                    )}
                    <p>{assigneeUsername}</p>
                  </div>
                  <ChevronDown className="size-5" />
                </DropdownMenuTrigger>
                <DropdownMenuContent className="dropdown-width-full">
                  {HandleAllowedUsers()}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <div className="mt-5">
              <Button
                className="w-full"
                onClick={async () => {
                  if (assignee) {
                    await addWorkItem({
                      projectId: projectId,
                      name: title,
                      description: description,
                      type: type,
                      status: status,
                      date: new Date().toISOString(),
                      assignedUser: assignee,
                      priority: priority,
                    })
                  }
                }}
              >
                Add Task
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default AddWorkItemDialog
