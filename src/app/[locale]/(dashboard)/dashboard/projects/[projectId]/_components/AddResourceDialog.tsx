"use client"

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { api } from "@/convex/_generated/api"
import { useState } from "react"
import { useMutation } from "convex/react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { toast } from "sonner"
import { Label } from "@/components/ui/label"

const AddResourceDialog = ({ project }: { project: any }) => {
  const [openDialog, setOpenDialog] = useState<boolean>(false)
  const [link, setLink] = useState<string>("")
  const addResource = useMutation(api.projects.addLinkToRessource)

  const handleAddResource = async (link: string) => {
    try {
      await addResource({ projectId: project._id, resource: link })
      toast.success("Resource added!")
      setOpenDialog(false)
    } catch (error) {
      toast.error("Error Adding Resource!")
    }
  }

  return (
    <div>
      <Dialog open={openDialog}>
        <DialogTrigger asChild onClick={() => setOpenDialog(true)}>
          <Button variant={"outline"}>Add Resource</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add Resource</DialogTitle>
            <DialogDescription>Add a new resource to your project.</DialogDescription>
          </DialogHeader>
          <div className="grid grid-cols-1 gap-4 mt-4">
            <div className="flex flex-col items-start justify-between">
                <Label htmlFor="ressource" className="mb-1 flex">Link <p className="text-red-500">*</p></Label>
                <Input placeholder="Paste the link of your ressource" className="h-10" id="ressource" value={link} onChange={e => setLink(e.target.value)}/>
                
            </div>
            <div className="flex items-center justify-end">
            <Button onClick={() => handleAddResource(link)}>Add Resource</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default AddResourceDialog
