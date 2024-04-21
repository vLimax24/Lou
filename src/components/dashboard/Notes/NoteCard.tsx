import React from "react"
import Link from "next/link"
// convex
import { Doc } from "@/convex/_generated/dataModel"
import { useMutation } from "convex/react"
import { api } from "@/convex/_generated/api"

import { Trash, CalendarDays } from "lucide-react"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { toast } from "sonner"
import { EditNoteDialog } from "@/components/dashboard/Dialogs/notes/EditNoteDialog"

type Props = {
  note: Doc<"notes">;
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
    <div
      key={note._id}
      className="flex h-32 flex-grow flex-col justify-between rounded-md border border-gray-200 bg-white shadow-md"
    >
      <div className="flex flex-col items-start justify-start p-4">
        <p className="text-lg font-semibold">{note.text}</p>
      </div>
      <div className="mt-auto flex w-full items-center justify-between border-t border-gray-200 px-4 py-2 text-gray-700">
        <p className="text-sm text-gray-500">{formatDate(note.date)}</p>
        <TooltipProvider>
          <div className="flex items-center">
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
          </div>
        </TooltipProvider>
      </div>
    </div>
  )
}

export default NoteCard
