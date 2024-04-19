"use client"

import { api } from "@/convex/_generated/api"
import { useConvexAuth, useMutation, useQuery } from "convex/react"
import dayjs from "dayjs"
import { ChevronLeft, ChevronRight } from "lucide-react"
import React, { useState } from "react"
import { toast } from "sonner"
import CalendarGrid from "./CalendarGrid"

import moment from "moment"

interface CalendarProps {
  initialDate?: dayjs.Dayjs;
}

const Calendar: React.FC<CalendarProps> = ({ initialDate = dayjs() }) => {
  const [currentMonth, setCurrentMonth] = useState(initialDate)
  const addEvent = useMutation(api.events.addEvent)

  const { isAuthenticated } = useConvexAuth()
  const events = useQuery(
    api.events.getEvents,
    !isAuthenticated ? "skip" : undefined
  )
  const noteEvents = useQuery(
    api.notes.getCalendarNotes,
    !isAuthenticated ? "skip" : undefined
  )

  // Combine events and noteEvents into a single array
  const combinedEvents = events && noteEvents ? [...events, ...noteEvents] : []
  // const combinedEvents = events?.concat(filteredNoteEvents || [])

  const handleCreateEvent = async (
    date: any,
    title: string,
    description: string,
    type: string
  ) => {
    const formattedDate = moment(date).toISOString()
    try {
      await addEvent({
        title: title,
        description: description,
        date: formattedDate,
        type: type,
      })
      toast.success("Event added!")
    } catch (error) {
      toast.error("Error Adding Event!")
    }
  }

  const goToCurrentDay = () => {
    setCurrentMonth(dayjs())
  }

  const goToPreviousMonth = () => {
    setCurrentMonth(prevMonth => prevMonth.subtract(1, "month"))
  }

  const goToNextMonth = () => {
    setCurrentMonth(prevMonth => prevMonth.add(1, "month"))
  }

  return (
    <>
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-2xl font-bold">
          {currentMonth.format("MMMM YYYY")}
        </h2>
        <div className="mr-2 flex items-center justify-center">
          <button
            onClick={goToPreviousMonth}
            className="rounded-full p-1.5 hover:bg-gray-100"
          >
            <ChevronLeft size={20} />
          </button>
          <button onClick={goToCurrentDay} className="mx-2 pb-1">
            Today
          </button>
          <button
            onClick={goToNextMonth}
            className="rounded-full p-1.5 hover:bg-gray-100"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
      <CalendarGrid
        currentMonth={currentMonth}
        events={combinedEvents}
        onCreateEvent={handleCreateEvent}
      />
    </>
  )
}

export default Calendar
