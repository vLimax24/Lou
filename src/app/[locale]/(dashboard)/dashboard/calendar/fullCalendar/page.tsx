"use client"

import React, { useState } from "react"
import FullCalendar from "@fullcalendar/react"
import dayGridPlugin from "@fullcalendar/daygrid"
import interactionPlugin from "@fullcalendar/interaction"
import timeGridPlugin from "@fullcalendar/timegrid"
import { api } from "@/convex/_generated/api"
import { useQuery, useMutation } from "convex/react"
import { Id } from "@/convex/_generated/dataModel"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

const InfoDialog = ({
  event,
  open,
  onClose,
}: {
  event: any
  open: boolean
  onClose: any
}) => {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-h-[95vh] max-w-[95vw] overflow-y-auto rounded-2xl transition-all duration-300 ease-in-out lg:w-1/4">
        <DialogHeader className="text-left">
          <DialogTitle>{event?.title}</DialogTitle>
          <DialogDescription>{event?.description}</DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}

const Calendar = () => {
  const events = useQuery(api.events.getEvents)
  const noteEvents = useQuery(api.notes.getCalendarNotes)

  const combinedEvents =
    events && noteEvents
      ? [
          ...events.map(e => ({ ...e, type: "EVENT" })),
          ...noteEvents.map(n => ({ ...n, type: "NOTE" })),
        ]
      : []

  const updateEventDate = useMutation(api.events.updateEventDate)
  const updateNoteDate = useMutation(api.notes.updateNoteDate)

  const [selectedEvent, setSelectedEvent] = useState<any>(null)
  const [dialogOpen, setDialogOpen] = useState(false)

  const eventsWithFormattedDates = combinedEvents?.map(event => {
    const formattedDate = new Date(event.date)
    const { _id, date, ...rest } = event
    return { ...rest, start: formattedDate, id: _id }
  })

  return (
    <div className="w-full">
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin, timeGridPlugin]}
        headerToolbar={{
          left: "prev,next today",
          center: "title",
          right: "dayGridMonth,timeGridWeek,timeGridDay",
        }}
        initialView="dayGridMonth"
        nowIndicator={true}
        editable={true}
        selectable={true}
        selectMirror={true}
        height={"90vh"}
        weekends={true}
        eventDrop={async event => {
          console.log(event)
          const eventId = event.event.id as Id<"events">
          const noteId = event.event.id as Id<"notes">
          const newDate = event.event._instance?.range.start.toISOString()

          if (newDate) {
            if (event.event.extendedProps.type === "NOTE") {
              await updateNoteDate({
                noteId,
                newDate,
              })
            } else {
              await updateEventDate({
                eventId,
                newDate,
              })
            }
          } else {
            console.error("New date is undefined")
          }
        }}
        eventClick={event => {
          setSelectedEvent(event.event)
          setDialogOpen(true)
        }}
        events={eventsWithFormattedDates}
      />
      <InfoDialog
        event={selectedEvent}
        open={dialogOpen}
        onClose={setDialogOpen}
      />
    </div>
  )
}

export default Calendar
