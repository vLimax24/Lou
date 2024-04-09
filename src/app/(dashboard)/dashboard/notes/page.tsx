'use client'

import React from 'react'
import { AddNoteDialog } from '@/components/dashboard/Dialogs/notes/AddNoteDialog'
import { EditNoteDialog } from '@/components/dashboard/Dialogs/notes/EditNoteDialog'
import { Trash, CalendarDays, Pencil } from 'lucide-react'
import { api } from '@/convex/_generated/api';
import { useConvexAuth, useMutation, useQuery } from 'convex/react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { toast } from 'sonner';

const Page = () => {
  const { isAuthenticated } = useConvexAuth();
  const notes = useQuery(
    api.notes.getNotes,
    !isAuthenticated ? 'skip' : undefined
  );

  const deleteNote = useMutation(api.notes.deleteNote)

  async function handleDeleteNote(id: any) {
    try {
      await deleteNote({
        id: id,
      });
      toast('Note deleted!');
    } catch (error) {
      toast('Error deleting Note!');
    }
  }

  console.log(notes);
  
  const formatDate = (dateString: any) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('de-DE');
  };

  return (
    <div className='p-5'>
      <div className="flex items-center justify-between mb-6">
        <h1 className='text-4xl font-bold'>Your Pinboard</h1>
        <AddNoteDialog />
      </div>
      <div className='grid grid-cols-5 gap-4'>
        {notes?.map((note) => (
          <div
            key={note.text}
            className="border border-gray-200 rounded-md bg-white shadow-md flex-grow h-32 flex flex-col justify-between"
          >
            <div className="flex flex-col items-start justify-start p-4">
              <p className="text-lg font-semibold">{note.text}</p>
            </div>
            <div className='mt-auto text-gray-700 flex w-full items-center justify-between border-t border-gray-200 px-4 py-2'>
              <p className="text-sm text-gray-500">{formatDate(note.date)}</p>
              <TooltipProvider>
                <div className='flex items-center'>
                {note?.showInCalendar && (
                  <div>
                    <Tooltip delayDuration={50}>
                      <TooltipTrigger asChild>
                          <CalendarDays size={20} className='hover:cursor-pointer mx-1 hover:text-green-500 duration-300' />
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
                          <Trash size={20} className='hover:cursor-pointer mx-1 hover:text-green-500 duration-300'  onClick={() => handleDeleteNote(note._id)}/>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Delete Note</p>
                      </TooltipContent>
                    </Tooltip>
                  </div>
                  <div>
                    <Tooltip delayDuration={50}>
                      <TooltipTrigger asChild>
                          <EditNoteDialog id={note?._id}/>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Edit Note</p>
                      </TooltipContent>
                    </Tooltip>
                  </div>
                </div>
              </TooltipProvider>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Page
