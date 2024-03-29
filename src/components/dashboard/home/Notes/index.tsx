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
    description: "1 hour ago",
  },
  {
    title: "Your call has been confirmed.",
    description: "1 hour ago",
  },  {
    title: "Your call has been confirmed.",
    description: "1 hour ago",
  },
]
 
type CardProps = React.ComponentProps<typeof Card>

export default function NotesCard({ className, ...props }: CardProps) {
  return (
      <Card className={cn("w-2/5 mx-1", className)} {...props}>
      <CardHeader>
        <Link href={'/dashboard/calendar'}>
          <CardTitle className='flex items-center justify-start'>Calendar <ArrowUpRightIcon className="ml-2 h-4 w-4 mt-1" /></CardTitle>
        </Link>
        <CardDescription>Your upcoming Assignments and Exams</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4 mt-2">
        <div>
          {notes.map((note, index) => (
            <div
              key={index}
              className="mb-4 grid grid-cols-[25px_1fr] items-start pb-3 last:mb-0 last:pb-0"
            >
            
              <div className="space-y-1">
                <div>
                    <Checkbox id="note" />
                    <label className="text-sm font-medium leading-none" htmlFor='note'>
                    {note.title}
                    </label>
                </div>
                <p className="text-sm text-muted-foreground">
                  {note.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

