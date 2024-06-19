"use client"

import React from "react"
import { Card, CardTitle } from "@/components/ui/card"
import { api } from "@/convex/_generated/api"
import { useQuery } from "convex/react"
import Link from "next/link"
import { useTranslations } from "next-intl"
import { AnimatedList } from "@/components/magicui/animated-list"
import { AnimatedNotification } from "@/components/dashboard/notification/AnimatedNotification"
import { Skeleton } from "@/components/ui/skeleton"

const EventsCard = () => {
  const t = useTranslations()
  const events = useQuery(api.events.getUpcomingEvents)

  return (
    <Card className="w-full border-none bg-white shadow-none">
      <CardTitle className="flex items-center justify-start text-3xl font-semibold">
        {t("Dashboard.home.events.title")}
      </CardTitle>
      <div className="mb-5 mt-3 flex flex-col">
        {events === undefined ? (
          <div className="space-y-2">
            <Skeleton className="h-14 w-full" />
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-14 w-full" />
          </div>
        ) : events?.length === 0 ? (
          <div className="text-left text-gray-500">
            {t("Dashboard.home.events.noEvents")}
          </div>
        ) : (
          <>
            <div className="relative">
              <AnimatedList>
                {events &&
                  events.length > 0 &&
                  events
                    .slice(0, 3)
                    .map(event => (
                      <AnimatedNotification
                        key={event._id}
                        data={event}
                        isTask={false}
                      />
                    ))}
              </AnimatedList>
            </div>
            <Link
              href={"/dashboard/calendar"}
              className="mt-2 text-gray-400 hover:underline"
            >
              {t("Dashboard.home.events.viewMore")}
            </Link>
          </>
        )}
      </div>
    </Card>
  )
}

export default EventsCard
