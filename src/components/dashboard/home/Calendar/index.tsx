import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import Link from 'next/link';
import { ScrollText, Home, CalendarDays, ArrowRight, PartyPopper } from 'lucide-react';
import { ArrowUpRightIcon } from '@heroicons/react/24/solid';
import { cn } from "@/lib/utils"
import { api } from '@/convex/_generated/api';
import { useConvexAuth, useMutation, useQuery } from 'convex/react';
import dayjs from 'dayjs'
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter'
dayjs.extend(isSameOrAfter)


type CardProps = React.ComponentProps<typeof Card>

export default function CalendarCard({ className, ...props }: CardProps) {
  const { isAuthenticated } = useConvexAuth();
  const events = useQuery(
    api.events.getEvents,
    !isAuthenticated ? 'skip' : undefined
  );
  console.log(events)

  const sortedEvents = events?.slice(0).filter(event => {
    const eventDate = dayjs(event.date);
    const currentDate = dayjs(); // Current date
    return eventDate.isSameOrAfter(currentDate, 'day');
  }).sort((a, b) => {
    const dateA = dayjs(a.date);
    const dateB = dayjs(b.date);
    const currentDate = dayjs(); // Current date
    const diffA = Math.abs(dateA.diff(currentDate, 'day')); // Difference in days
    const diffB = Math.abs(dateB.diff(currentDate, 'day'));
    return diffA - diffB;
  }).filter(event => event.description === "EXAM").slice(0, 3);
  
  function convertToGermanDate(isoDate: any) {
    const germanDate: any = dayjs(isoDate).format('DD.MM.YYYY')
    console.log(germanDate) // Convert to German format "dd.mm.yyyy"
    return germanDate;
  }
  
  return (
    <Card className={cn("w-full md:w-1/5 mx-1", className)} {...props}>
      <CardHeader>
        <Link href={'/dashboard/calendar'}>
          <CardTitle className='flex items-center justify-start'>Calendar <ArrowUpRightIcon className="ml-2 h-4 w-4 mt-1" /></CardTitle>
        </Link>
        <CardDescription>Your upcoming Exams</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4 mt-2">
        <div className='flex flex-col'>
          {sortedEvents ? (
            <div className="flex flex-col items-center justify-center">
              <PartyPopper size={56} className="mb-10"/>
              <p className="mt-[-1rem]">Hurray! You currently don&apos;t have any exams!</p>
            </div>
          ) : (
            <>
              {sortedEvents?.map((event:any, index:any) => (
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
                        {convertToGermanDate(event.date)}
                      </p>
                    </div>
                  </div>
                  <div>
                    <ArrowRight size={20} className="mr-2"/>
                  </div>
                </div>
              ))}
            </>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
