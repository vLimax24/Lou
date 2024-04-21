import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { Checkbox } from "@/components/ui/checkbox"
import { cn } from "@/lib/utils"
import { api } from "@/convex/_generated/api"
import { useConvexAuth, useMutation, useQuery } from "convex/react"
import { toast } from "sonner"
import { CircleHelp } from "lucide-react"
import { AddNoteDialog } from "../../Dialogs/notes/AddNoteDialog"
import * as React from "react"

type CardProps = React.ComponentProps<typeof Card>;

const NotesCard = ({ className, ...props }: CardProps) => {
  const { isAuthenticated } = useConvexAuth()
  const [deletedNotes, setDeletedNotes] = useState<string[]>([])
  const notes: any = useQuery(
    api.notes.getNotes,
    !isAuthenticated ? "skip" : undefined
  )

  const deleteNote = useMutation(api.notes.deleteNote)

  const handleDeleteNote = async (id: any) => {
    let proceedWithDelete = true
    try {
      toast("Note has been deleted", {
        action: {
          label: "Undo",
          onClick: () => (proceedWithDelete = false),
        },
      })

      setDeletedNotes([...deletedNotes, id])

      await new Promise((resolve) => setTimeout(resolve, 3300))
      if (proceedWithDelete) {
        await deleteNote({
          id: id,
        })
      } else {
        toast.info("Delete operation cancelled!")
        // Revert the local deletion from UI
        setDeletedNotes(deletedNotes.filter(noteId => noteId !== id))
      }
    } catch (error) {
      if (proceedWithDelete) {
        toast.error("Error deleting Note!")
      } else {
        toast.info("Error cancelling delete operation!")
        // Revert the local deletion from UI
        setDeletedNotes(deletedNotes.filter(noteId => noteId !== id))
      }
    }
  }

  return (
    <Card
      className={cn("w-full md:w-2/5 pb-5 md:pb-20 mt-5 md:my-0 border-none", className)}
      {...props}
    >
      <CardHeader className="flex items-center justify-between flex-row">
        <Link href={"/dashboard/notes"}>
          <CardTitle className="flex items-center justify-start font-semibold ml-2 text-3xl">
            Notes
          </CardTitle>
        </Link>
        <AddNoteDialog />
      </CardHeader>
      <CardContent className="grid gap-4 mt-2">
        <div>
          {notes?.length < 1 ? (
            <div className="text-primaryGray w-full flex flex-col items-center justify-center">
              <CircleHelp size={56} className="mt-10" />
              <p className="mt-2">No notes were found!</p>
              <Link href={"/dashboard/notes"} className="underline mt-3">
                Click here to create your first note!
              </Link>
            </div>
          ) : (
            <>
              {notes?.map((note: any, index: any) => (
                !deletedNotes.includes(note._id) && (
                  <Card key={index} className="mb-3 flex">
                    <div className="py-3 px-5 flex items-center justify-center">
                      <Checkbox
                        id="note"
                        className="mr-5"
                        onCheckedChange={() => handleDeleteNote(note._id)}
                      />
                      <div className="flex flex-col items-start justify-center">
                        <label
                          className="text-sm font-medium leading-none"
                          htmlFor="note"
                        >
                          {note.text}
                        </label>
                      </div>
                    </div>
                  </Card>
                )
              ))}
            </>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

export default NotesCard
