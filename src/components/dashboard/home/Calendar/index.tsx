import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import Link from 'next/link';
import { ScrollText, Home, CalendarDays, ArrowRight } from 'lucide-react';
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
    date: "20.08.2024",
    type: "ASSIGNMENT"
  },
  {
    title: "Biology",
    date: "19.04.2024",
    type: "EXAM"
  },
  {
    title: "Biology",
    date: "01.04.2024",
    type: "EXAM"
  },
]

const sortedEvents = events.sort((a, b) => {
  const dateA = new Date(a.date.split('.').reverse().join('-')).getTime();
  const dateB = new Date(b.date.split('.').reverse().join('-')).getTime();
  return dateA - dateB;
}).slice(0, 3);

type CardProps = React.ComponentProps<typeof Card>

export default function CalendarCard({ className, ...props }: CardProps) {
  return (
      <Card className={cn("w-full md:w-1/5 mx-1", className)} {...props}>
      <CardHeader>
        <Link href={'/dashboard/calendar'}>
          <CardTitle className='flex items-center justify-start'>Calendar <ArrowUpRightIcon className="ml-2 h-4 w-4 mt-1" /></CardTitle>
        </Link>
        <CardDescription>Your upcoming Assignments and Exams</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4 mt-2">
        <div className='flex flex-col'>
          {sortedEvents.map((event, index) => (
            <div
              key={index}
              className="mb-4 flex items-center p-2 border border-muted-foreground rounded-md justify-between hover:cursor-pointer"
            >
              <div className="flex items-center justify-start">
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
              <div>
                <ArrowRight size={20} className="mr-2"/>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
