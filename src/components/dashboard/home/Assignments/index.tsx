import { Card, CardContent, CardDescription, CardHeader, CardTitle, } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { api } from "@/convex/_generated/api"
import { useConvexAuth, useQuery } from "convex/react"
import dayjs from "dayjs"
import isSameOrAfter from "dayjs/plugin/isSameOrAfter"
import Link from "next/link"
dayjs.extend(isSameOrAfter)
const AssignmentCard = ({ className, ...props }: any) => {

  const { isAuthenticated } = useConvexAuth()
  const events = useQuery(
    api.events.getEvents,
    !isAuthenticated ? "skip" : undefined
  )
  
  const sortedEvents = events?.slice(0).filter(event => {
    const eventDate = dayjs(event.date)
    const currentDate = dayjs()
    return eventDate.isSameOrAfter(currentDate, "day")
  }).sort((a, b) => {
    const dateA = dayjs(a.date)
    const dateB = dayjs(b.date)
    const currentDate = dayjs()
    const diffA = Math.abs(dateA.diff(currentDate, "day"))
    const diffB = Math.abs(dateB.diff(currentDate, "day"))
    return diffA - diffB
  }).filter(event => event.description === "ASSIGNMENT").slice(0, 3) || []

  const convertToDate = (isoDate: any) => {
    const germanDate: any = dayjs(isoDate).format("DD.MM.YYYY")
    return germanDate
  }

  const calculateRemainingDays = (eventDate: string) => {
    const today = dayjs()
    const endDate = dayjs(eventDate)
    const diffHours = endDate.diff(today, "hour")
    if (diffHours < 0) {
      return "Expired"
    } else if (diffHours < 24) {
      return diffHours + " hours"
    } else {
      const diffDays = endDate.diff(today, "day") + 1
      return diffDays + " days"
    }
  }
  return (
    <Card className={cn("w-full my-2 md:my-0 md:w-4/5 mx-1", className)} {...props}>
      <CardHeader>
        <Link href={"/dashboard/calendar"}>
          <CardTitle className='flex items-center justify-start'>Assignments</CardTitle>
        </Link>
        <CardDescription>Your upcoming Assignments</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div>
          {sortedEvents?.length > 0 ? (
            <div className='grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
              {sortedEvents?.map((assignment, index) => (
                <div
                  key={index}
                  className="mb-0.5 w-full items-start p-4 border rounded-md hover:cursor-pointer transition-all duration-300 ease-linear"
                >
                  <div className="space-y-1">
                    <h1 className="text-sm font-semibold leading-none">
                      {assignment.title}
                    </h1>
                    <p className="text-sm text-muted-foreground">
                    {`${convertToDate(assignment.date)} - ${calculateRemainingDays(assignment.date) === "Expired" ? "Expired" : calculateRemainingDays(assignment.date) + " left"}`}
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
  )
}

export default AssignmentCard
