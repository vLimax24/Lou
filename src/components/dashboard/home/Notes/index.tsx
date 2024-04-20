import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { Checkbox } from "@/components/ui/checkbox"
import { cn } from "@/lib/utils"
import { api } from "@/convex/_generated/api"
import { useConvexAuth, useMutation, useQuery } from "convex/react"
import { toast } from "sonner"
import { CircleHelp } from "lucide-react"
import * as React from "react"

type CardProps = React.ComponentProps<typeof Card>

const NotesCard = ({ className, ...props }: CardProps) => {
  const { isAuthenticated } = useConvexAuth()
  const notes:any = useQuery(
    api.notes.getNotes,
    !isAuthenticated ? "skip" : undefined
  )

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
  
  return (
      <Card className={cn("w-full md:w-2/5 mt-5 md:my-0 border-none", className)} {...props}>
      <CardHeader>
        <Link href={"/dashboard/notes"}>
          <CardTitle className='flex items-center justify-start font-semibold ml-2 text-3xl'>Notes</CardTitle>
        </Link>
      </CardHeader>
      <CardContent className="grid gap-4 mt-2">
        <div>
          {notes?.length < 1 ? (
            <div className="text-black w-full flex flex-col items-center justify-center">
              <CircleHelp size={56} className="mt-10"/>
              <p className="mt-2">No notes were found!</p>
              <Link href={"/dashboard/notes"} className="underline mt-3">
                Click here to create your first note!
              </Link>
            </div>
          ) : (
            <>
              {notes?.map((note:any, index:any) => (
              <div
                key={index}
                className="mb-3 flex"
              >
              
                <div className="space-y-1 flex items-center justify-start">
                  <Checkbox id="note" className='mr-5' onCheckedChange={() => handleDeleteNote(note._id)}/>
                  <div className='flex flex-col items-start justify-center'>
                      <label className="text-sm font-medium leading-none" htmlFor='note'>
                      {note.text}
                      </label>
                  </div>
                </div>
              </div>
            ))}
            </>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

export default NotesCard
