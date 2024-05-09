import Link from "next/link"
// convex
import { api } from "@/convex/_generated/api"
import { Id } from "@/convex/_generated/dataModel"
import { useMutation } from "convex/react"

import { EditNoteDialog } from "@/components/dashboard/Dialogs/notes/EditNoteDialog"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { LabelsArray } from "@/types/label"
import { CalendarDays, Trash } from "lucide-react"
import { toast } from "sonner"
import { LabelSelectorDialog } from "../Dialogs/Labels/LabelSelectorDialog"
import LabelBadge from "@/components/common/LabelBadge"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

type Note = {
  _id: Id<"notes">;
  _creationTime: number;
  subjectId?: Id<"subjects">;
  text: string;
  description: string;
  userId: Id<"users">;
  date: string;
  showInCalendar: boolean;
  labels: LabelsArray;
};

type Props = {
  note: Note;
};

const NoteCard = ({ note }: Props) => {
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

  const formatDate = (dateString: any) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("de-DE")
  }

  return (
    <Card key={note._id} >
      <CardHeader className="min-h-[150px]">
        <CardTitle className="flex items-center justify-between">
          {note.text}
          <p className="text-sm text-gray-500 mt-2">{formatDate(note.date)}</p>
        </CardTitle>
        <CardDescription>{note.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <LabelBadge labels={note.labels} />
        
      </CardContent>
      <CardFooter className='justify-between'>
        <TooltipProvider>
            {note?.showInCalendar && (
              <div>
                <Tooltip delayDuration={50}>
                  <TooltipTrigger asChild>
                    <Link href={"/dashboard/calendar"}>
                      <CalendarDays
                        size={20}
                        className="mx-1 duration-300 hover:cursor-pointer hover:text-green-500"
                      />
                    </Link>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>View in Calendar</p>
                  </TooltipContent>
                </Tooltip>
              </div>
            )}
            <div>
              <Tooltip delayDuration={50}>
                <TooltipTrigger asChild>
                  <Trash
                    size={20}
                    className="mx-1 duration-300 hover:cursor-pointer hover:text-green-500"
                    onClick={() => handleDeleteNote(note._id)}
                  />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Delete Note</p>
                </TooltipContent>
              </Tooltip>
            </div>
            <div>
              <EditNoteDialog id={note?._id} />
            </div>
            <div>
              <LabelSelectorDialog entityId={note?._id} />
            </div>
        </TooltipProvider>
      </CardFooter>
    </Card>
  )
}

export default NoteCard
