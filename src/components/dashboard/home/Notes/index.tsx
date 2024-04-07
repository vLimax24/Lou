import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import Link from 'next/link';
import { Checkbox } from "@/components/ui/checkbox"
import { ArrowUpRightIcon } from '@heroicons/react/24/solid';
import { cn } from "@/lib/utils"
import { api } from '@/convex/_generated/api';
import { useConvexAuth, useMutation, useQuery } from 'convex/react';
import { toast } from 'sonner';
 
const notes = [
  {
    title: "Your call has been confirmed.",
    description: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam",
  },
  {
    title: "Your call has been confirmed.",
    description: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam",
  },  
  {
    title: "Your call has been confirmed.",
    description: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam",
  },
  {
    title: "Your call has been confirmed.",
    description: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam",
  },
  {
    title: "Your call has been confirmed.",
    description: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam",
  },
]
 
type CardProps = React.ComponentProps<typeof Card>

export default function NotesCard({ className, ...props }: CardProps) {
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
  
  return (
      <Card className={cn("w-full md:w-2/5 mx-1 my-2 md:my-0", className)} {...props}>
      <CardHeader>
        <Link href={'/dashboard/notes'}>
          <CardTitle className='flex items-center justify-start'>Notes <ArrowUpRightIcon className="ml-2 h-4 w-4 mt-1" /></CardTitle>
        </Link>
        <CardDescription>Your latest notes</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4 mt-2">
        <div>
          {notes?.map((note, index) => (
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
        </div>
      </CardContent>
    </Card>
  );
}

