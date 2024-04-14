"use client"

import { api } from "@/convex/_generated/api"
import { useConvexAuth, useMutation, useQuery } from "convex/react"
import dayjs from "dayjs"
import { ChevronLeft, ChevronRight } from "lucide-react"
import React, { useState } from "react"
import { toast } from "sonner"
import CalendarGrid from "./CalendarGrid"

import useStoreUser from "@/hooks/auth/useStoreUser"
import moment from "moment"

interface CalendarProps {
  initialDate?: dayjs.Dayjs;
}

const Calendar: React.FC<CalendarProps> = ({ initialDate = dayjs() }) => {
  const [currentMonth, setCurrentMonth] = useState(initialDate)
  const userId = useStoreUser()
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
  const combinedEvents = events && noteEvents ? [...events, ...noteEvents] : [];
  // const combinedEvents = events?.concat(filteredNoteEvents || [])


  async function handleCreateEvent(date: any, title: string, description: string, type: string) {
    const formattedDate = moment(date).toISOString()
    console.log(formattedDate)
    try {
      await addEvent({
        title: title,
        description: description,
        date: formattedDate,
        type: type,
        userId: userId!,
      })
      toast("Event added!")
    } catch (error) {
      toast("Error Adding Event!")
    }
  }



  const goToCurrentDay = () => {
    setCurrentMonth(dayjs())
  }

  const goToPreviousMonth = () => {
    setCurrentMonth((prevMonth) => prevMonth.subtract(1, "month"))
  }

  const goToNextMonth = () => {
    setCurrentMonth((prevMonth) => prevMonth.add(1, "month"))
  }

  return (
    <>
      <div className="flex justify-between items-center mb-4">
        <h2 className='font-bold text-2xl'>{currentMonth.format("MMMM YYYY")}</h2>
        <div className='flex items-center justify-center mr-2'>
          <button onClick={goToPreviousMonth} className='hover:bg-gray-100 p-1.5 rounded-full'>
            <ChevronLeft size={20}/>
          </button>
          <button onClick={goToCurrentDay} className='pb-1 mx-2'>Today</button>
          <button onClick={goToNextMonth} className='hover:bg-gray-100 p-1.5 rounded-full'>
            <ChevronRight size={20}/>
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
