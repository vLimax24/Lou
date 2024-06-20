import { useState } from "react"
import { api } from "@/convex/_generated/api"
import { Id } from "@/convex/_generated/dataModel"
import { useMutation } from "convex/react"
import { EditNote } from "@/components/dashboard/Dialogs/notes/NoteDialog"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { LabelsArray } from "@/types/label"
import { Trash, Settings, Tags, Plus } from "lucide-react"
import { toast } from "sonner"
import { LabelSelectorDialog } from "../Dialogs/Labels/LabelSelectorDialog"
import LabelBadge from "@/components/common/LabelBadge"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

type Note = {
  _id: Id<"notes">
  _creationTime: number
  subjectId?: Id<"subjects">
  text: string
  description: string
  userId: Id<"users">
  date: string
  showInCalendar: boolean
  labels: LabelsArray
}

type Props = {
  note: Note
}

const getRandomPastelColor = () => {
  const colors = [
    "#628BF7",
    "#6ADBC6",
    "#FF7ABC",
    "#FFD1DC",
    "#B0E57C",
    "#C39BD3",
  ]
  return colors[Math.floor(Math.random() * colors.length)]
}

const NoteCard = ({ note }: Props) => {
  const [dialogOpen, setDialogOpen] = useState(false)
  const [labelDialogOpen, setLabelDialogOpen] = useState(false)
  const deleteNote = useMutation(api.notes.deleteNote)

  const handleDeleteNote = async (id: any) => {
    try {
      await deleteNote({
        id: id,
      })
      toast.success("Note deleted!")
    } catch (error) {
      toast.error("Error deleting Note!")
    }
  }

  const labelColor = getRandomPastelColor()
  const hasLabels = note.labels.length > 0

  return (
    <Card
      key={note._id}
      style={{ borderLeft: `8px solid ${labelColor}` }}
      className="mb-4 flex flex-col gap-5 p-5"
    >
      <div className="flex flex-col gap-2">
        <h1>{note.text}</h1>
        <div
          className={`flex items-center justify-start ${hasLabels ? "gap-2" : "gap-0"}`}
        >
          {hasLabels && <LabelBadge labels={note.labels} />}
          <Badge
            className="flex cursor-pointer items-center justify-center gap-1 text-center"
            variant={"outline"}
          >
            <Plus size={13} />
            <span>Add</span>
          </Badge>
        </div>
      </div>
      <div className="flex items-end justify-between">
        <div className="flex items-center justify-start gap-3">
          <CalendarDaysRounded />
          <h1 className="text-[#5B4F4F]">
            {new Date(note.date).toLocaleDateString()}
          </h1>
        </div>
        <TooltipProvider>
          <div className="flex items-end justify-between gap-2">
            <div>
              <Tooltip delayDuration={500}>
                <TooltipTrigger asChild>
                  <Trash
                    size={20}
                    className="mx-1 text-[#5B4F4F] duration-300 hover:cursor-pointer hover:text-primaryBlue"
                    onClick={() => handleDeleteNote(note._id)}
                  />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Delete</p>
                </TooltipContent>
              </Tooltip>
            </div>
            <div>
              <Tooltip delayDuration={500}>
                <TooltipTrigger asChild>
                  <Settings
                    size={20}
                    className="cursor-pointer text-[#5B4F4F] hover:text-primaryBlue"
                    onClick={() => setDialogOpen(true)}
                  />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Edit</p>
                </TooltipContent>
              </Tooltip>

              <EditNote
                id={note?._id}
                dialogOpen={dialogOpen}
                setDialogOpen={setDialogOpen}
              />
            </div>
            <div>
              <Tooltip delayDuration={500}>
                <TooltipTrigger asChild>
                  <Tags
                    size={22}
                    className="text-[#5B4F4F] duration-300 hover:cursor-pointer hover:text-primaryBlue"
                    onClick={() => setLabelDialogOpen(true)}
                  />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Add Label</p>
                </TooltipContent>
              </Tooltip>
              <LabelSelectorDialog
                entityId={note?._id}
                dialogOpen={labelDialogOpen}
                setDialogOpen={setLabelDialogOpen}
              />
            </div>
          </div>
        </TooltipProvider>
      </div>
    </Card>
  )
}

export default NoteCard

const CalendarDaysRounded = () => {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M11.6667 18.3333H8.33341C5.19091 18.3333 3.61925 18.3333 2.64341 17.3566C1.66675 16.3808 1.66675 14.8091 1.66675 11.6666V9.99998C1.66675 6.85748 1.66675 5.28581 2.64341 4.30998C3.61925 3.33331 5.19091 3.33331 8.33341 3.33331H11.6667C14.8092 3.33331 16.3809 3.33331 17.3567 4.30998C18.3334 5.28581 18.3334 6.85748 18.3334 9.99998V11.6666C18.3334 14.8091 18.3334 16.3808 17.3567 17.3566C16.8126 17.9016 16.0834 18.1425 15.0001 18.2483M5.83341 3.33331V2.08331M14.1667 3.33331V2.08331M17.9167 7.49998H8.95841M1.66675 7.49998H4.89591"
        stroke="#5B4F4F"
        stroke-width="1.5"
        stroke-linecap="round"
      />
      <path
        d="M15 14.1667C15 14.3877 14.9122 14.5996 14.7559 14.7559C14.5996 14.9122 14.3877 15 14.1667 15C13.9457 15 13.7337 14.9122 13.5774 14.7559C13.4211 14.5996 13.3333 14.3877 13.3333 14.1667C13.3333 13.9457 13.4211 13.7337 13.5774 13.5774C13.7337 13.4211 13.9457 13.3333 14.1667 13.3333C14.3877 13.3333 14.5996 13.4211 14.7559 13.5774C14.9122 13.7337 15 13.9457 15 14.1667ZM15 10.8333C15 11.0543 14.9122 11.2663 14.7559 11.4226C14.5996 11.5789 14.3877 11.6667 14.1667 11.6667C13.9457 11.6667 13.7337 11.5789 13.5774 11.4226C13.4211 11.2663 13.3333 11.0543 13.3333 10.8333C13.3333 10.6123 13.4211 10.4004 13.5774 10.2441C13.7337 10.0878 13.9457 10 14.1667 10C14.3877 10 14.5996 10.0878 14.7559 10.2441C14.9122 10.4004 15 10.6123 15 10.8333ZM10.8333 14.1667C10.8333 14.3877 10.7455 14.5996 10.5893 14.7559C10.433 14.9122 10.221 15 10 15C9.77899 15 9.56702 14.9122 9.41074 14.7559C9.25446 14.5996 9.16667 14.3877 9.16667 14.1667C9.16667 13.9457 9.25446 13.7337 9.41074 13.5774C9.56702 13.4211 9.77899 13.3333 10 13.3333C10.221 13.3333 10.433 13.4211 10.5893 13.5774C10.7455 13.7337 10.8333 13.9457 10.8333 14.1667ZM10.8333 10.8333C10.8333 11.0543 10.7455 11.2663 10.5893 11.4226C10.433 11.5789 10.221 11.6667 10 11.6667C9.77899 11.6667 9.56702 11.5789 9.41074 11.4226C9.25446 11.2663 9.16667 11.0543 9.16667 10.8333C9.16667 10.6123 9.25446 10.4004 9.41074 10.2441C9.56702 10.0878 9.77899 10 10 10C10.221 10 10.433 10.0878 10.5893 10.2441C10.7455 10.4004 10.8333 10.6123 10.8333 10.8333ZM6.66667 14.1667C6.66667 14.3877 6.57887 14.5996 6.42259 14.7559C6.26631 14.9122 6.05435 15 5.83333 15C5.61232 15 5.40036 14.9122 5.24408 14.7559C5.0878 14.5996 5 14.3877 5 14.1667C5 13.9457 5.0878 13.7337 5.24408 13.5774C5.40036 13.4211 5.61232 13.3333 5.83333 13.3333C6.05435 13.3333 6.26631 13.4211 6.42259 13.5774C6.57887 13.7337 6.66667 13.9457 6.66667 14.1667ZM6.66667 10.8333C6.66667 11.0543 6.57887 11.2663 6.42259 11.4226C6.26631 11.5789 6.05435 11.6667 5.83333 11.6667C5.61232 11.6667 5.40036 11.5789 5.24408 11.4226C5.0878 11.2663 5 11.0543 5 10.8333C5 10.6123 5.0878 10.4004 5.24408 10.2441C5.40036 10.0878 5.61232 10 5.83333 10C6.05435 10 6.26631 10.0878 6.42259 10.2441C6.57887 10.4004 6.66667 10.6123 6.66667 10.8333Z"
        fill="#5B4F4F"
      />
    </svg>
  )
}
