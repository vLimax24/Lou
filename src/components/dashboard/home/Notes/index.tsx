import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import Link from 'next/link';
import { Checkbox } from "@/components/ui/checkbox"
import { ArrowUpRightIcon } from '@heroicons/react/24/solid';
import { cn } from "@/lib/utils"
 
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
  return (
      <Card className={cn("w-2/5 mx-1", className)} {...props}>
      <CardHeader>
        <Link href={'/dashboard/notes'}>
          <CardTitle className='flex items-center justify-start'>Notes <ArrowUpRightIcon className="ml-2 h-4 w-4 mt-1" /></CardTitle>
        </Link>
        <CardDescription>Your latest notes</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4 mt-2">
        <div>
          {notes.map((note, index) => (
            <div
              key={index}
              className="mb-3 flex"
            >
            
              <div className="space-y-1 flex items-center justify-start">
                <Checkbox id="note" className='mr-5'/>
                <div className='flex flex-col items-start justify-center'>
                    <label className="text-sm font-medium leading-none" htmlFor='note'>
                    {note.title}
                    </label>
                    <p className="text-sm text-muted-foreground">
                        {note.description}
                    </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

