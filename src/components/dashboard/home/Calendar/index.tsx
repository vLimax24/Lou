import * as React from "react"
import { Card } from "@/components/ui/card"
import { Calendar } from "@/components/ui/calendar"
import { cn } from "@/lib/utils"
import dayjs from "dayjs"

type CardProps = React.ComponentProps<typeof Card>

const CalendarCard = ({ className, ...props }: CardProps) => {
  const currentDate = dayjs().toDate()

  return (
    <Card className={cn("w-full md:w-1/5 border-none ml-5 mb-5 center p-4", className)} {...props}>
          <Calendar selected={currentDate} className="scale-110"/>
    </Card>
  )
}

export default CalendarCard
