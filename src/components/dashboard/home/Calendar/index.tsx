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
import { ArrowUpRightIcon } from '@heroicons/react/24/solid';
import { cn } from "@/lib/utils"
 
const events = [
  {
    title: "Your call has been confirmed.",
    date: "1 hour ago",
  },
  {
    title: "You have a new message!",
    date: "1 hour ago",
  },
  {
    title: "Your subscription is expiring soon!",
    date: "2 hours ago",
  },
]
 
type CardProps = React.ComponentProps<typeof Card>

export default function CalendarCard({ className, ...props }: CardProps) {
  return (
      <Card className={cn("w-2/5 mx-5", className)} {...props}>
      <CardHeader>
        <CardTitle>Calendar</CardTitle>
        <CardDescription>Your upcoming Assignments and Exams</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div>
          {events.map((event, index) => (
            <div
              key={index}
              className="mb-4 grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0"
            >
              <span className="flex h-2 w-2 translate-y-1 rounded-full bg-sky-500" />
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
      <CardFooter>
          <Link href={'/dashboard/calendar'} className='w-full'>
            <Button className="w-full">
              Calender<ArrowUpRightIcon className="ml-2 h-4 w-4" />
            </Button>
          </Link>
      </CardFooter>
    </Card>
  );
}

