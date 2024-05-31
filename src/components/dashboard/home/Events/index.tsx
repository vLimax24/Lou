import React from "react"
import { Card, CardTitle } from "@/components/ui/card"
import { api } from "@/convex/_generated/api"
import { useQuery } from "convex/react"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { useTranslations } from "next-intl"

const EventsCard = () => {
  const t = useTranslations()
  const events = useQuery(api.events.getUpcomingEvents)
  return (
    <Card className="w-full border-none bg-white shadow-none">
      <CardTitle className="ml-2 flex items-center justify-start text-3xl font-semibold">
        {t("Dashboard.home.events.title")}
      </CardTitle>
      <div className="mb-5 mt-3 flex flex-col">
        {events?.length === 0 ? (
          <div className="text-left text-gray-500">
            {t("Dashboard.home.events.noEvents")}
          </div>
        ) : (
          <>
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
                    {event.type === "ASSIGNMENT"
                      ? t("Dashboard.home.events.assignment")
                      : event.type === "EXAM"
                        ? t("Dashboard.home.events.exam")
                        : t("Dashboard.home.events.other")}
                  </Badge>
                </div>
                <div className="text-sm text-gray-500">
                  {new Date(event.date).toLocaleDateString()}
                </div>
              </div>
            ))}
          </>
        )}
      </div>
      <Link
        href={"/dashboard/calendar"}
        className="text-gray-400 hover:underline"
      >
        {t("Dashboard.home.events.viewMore")}
      </Link>
    </Card>
  )
}

export default EventsCard
