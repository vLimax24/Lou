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
import { ScrollText, Home, CalendarDays } from 'lucide-react';
import { ArrowUpRightIcon } from '@heroicons/react/24/solid';
import { cn } from "@/lib/utils"
 
const events = [
  {
    title: "Trigonometry",
    date: "10.12.2024",
    type: "EXAM"
  },
  {
    title: "Book p.51",
    date: "20.04.2024",
    type: "ASSIGNMENT"
  },
  {
    title: "Biology",
    date: "19.04.2024",
    type: "EXAM"
  },
]
 
type CardProps = React.ComponentProps<typeof Card>

export default function CalendarCard({ className, ...props }: CardProps) {
  return (
      <Card className={cn("w-1/5 mx-1", className)} {...props}>
      <CardHeader>
        <Link href={'/dashboard/calendar'}>
          <CardTitle className='flex items-center justify-start'>Calendar <ArrowUpRightIcon className="ml-2 h-4 w-4 mt-1" /></CardTitle>
        </Link>
        <CardDescription>Your upcoming Assignments and Exams</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4 mt-2">
        <div className='flex flex-col'>
          {events.map((event, index) => (
            <div
              key={index}
              className="mb-4 flex items-center p-2 border border-muted-foreground rounded-md"
            >
              <div>
                {event.type === "EXAM" ? (
                  <ScrollText size={20} className='mr-5 ml-2'/>
                ) : event.type === 'ASSIGNMENT' ? (
                  <Home size={20} className='mr-5 ml-2'/>
                ) : (
                  <CalendarDays size={20} className='mr-5 ml-2'/>
                )}
              </div>
              <div className="space-y-1">
                <p className="text-sm font-medium leading-none">
                  {event.title}
                </p>
                <p className="text-sm text-muted-foreground">
                  {event.date}
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

