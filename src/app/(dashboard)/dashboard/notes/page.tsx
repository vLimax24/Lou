"use client"

import { useConvexAuth, useQuery } from "convex/react"
import { api } from "@/convex/_generated/api"

import { AddNoteDialog } from "@/components/dashboard/Dialogs/notes/AddNoteDialog"
import NoteCard from "@/components/dashboard/Notes/NoteCard"
import { Loader2 } from "lucide-react"

const Page = () => {
  const { isAuthenticated } = useConvexAuth()
  const notes = useQuery(
    api.notes.getNotes,
    !isAuthenticated ? "skip" : undefined
  )

  return (
    <div className="p-5">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-4xl font-bold">Your Pinboard</h1>
        <AddNoteDialog />
      </div>
      {!notes ? (
        <Loader2 className="h-6 w-6 animate-spin" />
      ) : (
        <div className="grid grid-cols-5 gap-4">
          {notes.map((note, index) => (
            <NoteCard note={note} key={`${note._id}${index}`} />
          ))}
        </div>
      )}
    </div>
  )
}

export default Page
