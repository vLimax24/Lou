import React from "react"
import { Card, CardTitle } from "@/components/ui/card"
import { api } from "@/convex/_generated/api"
import { useQuery } from "convex/react"
import { Badge } from "@/components/ui/badge"
import { convertToTitleCase } from "@/lib/utils"
import Link from "next/link"

const EventsCard = () => {
  const events = useQuery(api.events.getUpcomingEvents)
  return (
    <Card className="w-full border-none bg-white shadow-none">
      <CardTitle className="ml-2 flex items-center justify-start text-3xl font-semibold">
        Events
      </CardTitle>
      <div className="mb-5 mt-3 flex flex-col">
        {events?.map(event => (
          <div
            className="my-1.5 flex items-center justify-between rounded-xl border border-gray-400 p-4"
            key={event._id}
          >
            <div className="flex items-center gap-1">
              <div className="text-lg font-medium">{event.title}</div>
              <Badge
                className={`h-5 ${event.type === "ASSIGNMENT" ? "bg-primaryBlue hover:bg-primaryHover" : event.type === "EXAM" ? "bg-teal-700 hover:bg-teal-800" : "bg-green-500 hover:bg-green-600"} transition-all duration-300 ease-in-out`}
              >
                {convertToTitleCase(event.type)}
              </Badge>
            </div>
            <div className="text-sm text-gray-500">
              {new Date(event.date).toLocaleDateString()}
            </div>
          </div>
        ))}
      </div>
      <Link
        href={"/dashboard/calendar"}
        className="text-gray-400 hover:underline"
      >
        View more
      </Link>
    </Card>
  )
}

export default EventsCard
