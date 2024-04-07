import { useState, useEffect } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { subjectColors } from '@/utils/subjectColors';
import { api } from '@/convex/_generated/api';
import { useConvexAuth, useMutation, useQuery } from 'convex/react';
import dayjs from 'dayjs'
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter'
dayjs.extend(isSameOrAfter)
 

 
type CardProps = React.ComponentProps<typeof Card>;

export default function AssignmentCard({ className, ...props }: CardProps) {
  const [remainingTime, setRemainingTime] = useState<(number | string)[]>([]);

  const { isAuthenticated } = useConvexAuth();
  const events = useQuery(
    api.events.getEvents,
    !isAuthenticated ? 'skip' : undefined
  );
  console.log(events);

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
  }).filter(event => event.description === "ASSIGNMENT").slice(0, 3);
  
  function convertToGermanDate(isoDate: any) {
    const germanDate: any = dayjs(isoDate).format('DD.MM.YYYY')
    console.log(germanDate) // Convert to German format "dd.mm.yyyy"
    return germanDate;
  }

  return (
    <Card className={cn("w-full my-2 md:my-0 md:w-4/5 mx-1", className)} {...props}>
      <CardHeader>
        <CardTitle>Assignments</CardTitle>
        <CardDescription>Your upcoming Assignments</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div>
          {sortedEvents?.length > 0 ? (
            <div className='grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
              {sortedEvents?.map((assignment, index) => (
                <div
                  key={index}
                  className="mb-0.5 w-full items-start p-4 border rounded-md hover:scale-[1.03] hover:cursor-pointer transition-all duration-300 ease-in-out"
                >
                  <div className="space-y-1">
                    <h1 className="text-sm font-semibold leading-none">
                      {assignment.title}
                    </h1>
                    <p className="text-sm text-muted-foreground">
                      {convertToGermanDate(assignment.date)}
                    </p>
                    {/* <Badge className={`${subjectColors[assignment.subject]} text-sm text-white`}>{assignment.subject}</Badge> */}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div>
              <h1 className='text-bold'>You currently don&apos;t have any assignments!</h1>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}