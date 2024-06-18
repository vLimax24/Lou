"use client"

import React, { useState } from "react"
import FullCalendar from "@fullcalendar/react"
import dayGridPlugin from "@fullcalendar/daygrid"
import interactionPlugin from "@fullcalendar/interaction"
import timeGridPlugin from "@fullcalendar/timegrid"
import { api } from "@/convex/_generated/api"
import { useQuery, useMutation } from "convex/react"
import { Id } from "@/convex/_generated/dataModel"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Pencil, Trash } from "lucide-react"
import { convertToTitleCase } from "@/lib/utils"
import { useLocale } from "next-intl"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import {
  AddEvent,
  EditEvent,
} from "@/components/dashboard/Dialogs/events/EventDialog"
import { EditNote } from "@/components/dashboard/Dialogs/notes/NoteDialog"
import { useTranslations } from "next-intl"

const InfoDialog = ({
  event,
  open,
  onClose,
}: {
  event: any
  open: boolean
  onClose: any
}) => {
  const getBadgeColor = (type: string) => {
    switch (type) {
      case "EXAM":
        return "bg-[#6ADBC6]"
      case "ASSIGNMENT":
        return "bg-[#C6C4FB]"
      case "OTHER":
        return "bg-[#FF7ABC]"
      default:
        return "bg-[#628BF7]"
    }
  }

  const deleteNote = useMutation(api.notes.deleteNote)
  const deleteEvent = useMutation(api.events.deleteEvent)

  const [editEventDialogOpen, setEditEventDialogOpen] = useState(false)
  const [editNoteDialogOpen, setEditNoteDialogOpen] = useState(false)

  const t = useTranslations()

  console.log(event)

  return (
    <>
      <Dialog open={open} onOpenChange={onClose}>
        <DialogContent className="max-h-[95vh] max-w-[95vw] overflow-y-auto rounded-2xl transition-all duration-300 ease-in-out lg:w-1/4">
          <DialogHeader className="text-left">
            <div className="flex items-center justify-start gap-2">
              <DialogTitle className="text-2xl font-bold">
                {event?.title}
              </DialogTitle>
              <Badge
                className={`ml-2 ${getBadgeColor(event?.extendedProps?.eventType)}`}
              >
                {convertToTitleCase(event?.extendedProps?.eventType || "Note")}
              </Badge>
            </div>
            <DialogDescription className="mt-2 text-sm text-gray-600">
              {event?.description}
            </DialogDescription>
          </DialogHeader>
          <div className="mt-4">
            {event?.start && (
              <p>
                <strong>Start:</strong> {event?.start?.toLocaleString()}
              </p>
            )}
            {event?.end && (
              <p>
                <strong>End:</strong> {event?.end?.toLocaleString()}
              </p>
            )}
            <p>
              <strong>Type:</strong> {event?.extendedProps?.eventType}
            </p>
          </div>
          <DialogFooter className="flex w-full items-center gap-1">
            <Button
              className="flex h-12 w-1/2 items-center justify-center gap-2 border border-primaryBlue bg-transparent text-primaryBlue hover:border-primaryBlue hover:bg-transparent"
              onClick={() => {
                onClose(false)
                if (event?._def.extendedProps?.generalType === "NOTE") {
                  setEditNoteDialogOpen(true)
                } else {
                  setEditEventDialogOpen(true)
                }
              }}
            >
              <Pencil className="size-4" />
              <p>Edit</p>
            </Button>
            <Button
              className="flex h-12 w-1/2 items-center justify-center gap-2 border border-red-500 bg-transparent text-red-500 hover:border-red-500 hover:bg-transparent"
              onClick={async () => {
                console.log("Event clicked:", event)
                if (event?.extendedProps?.generalType === "NOTE") {
                  await deleteNote({
                    id: event?.id,
                  })
                  onClose(false)
                  toast.success("Note deleted!")
                } else {
                  await deleteEvent({
                    id: event?.id,
                  })
                  onClose(false)
                  toast.success("Event deleted!")
                }
              }}
            >
              <Trash className="size-4" />
              <p>Delete</p>
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      {event && (
        <>
          {event?.extendedProps?.generalType === "NOTE" ? (
            <EditNote
              id={event?.id}
              dialogOpen={editNoteDialogOpen}
              setDialogOpen={setEditNoteDialogOpen}
            />
          ) : (
            <EditEvent
              event={event}
              dialogOpen={editEventDialogOpen}
              setDialogOpen={setEditEventDialogOpen}
            />
          )}
        </>
      )}
    </>
  )
}

const Calendar = () => {
  const events = useQuery(api.events.getEvents)
  const noteEvents = useQuery(api.notes.getCalendarNotes)

  const combinedEvents: any =
    events && noteEvents
      ? [
          ...events.map(e => ({ ...e, generalType: "EVENT" })),
          ...noteEvents.map(n => ({
            ...n,
            generalType: "NOTE",
            title: n.text,
          })),
        ]
      : []

  const updateEventDate = useMutation(api.events.updateEventDate)
  const updateNoteDate = useMutation(api.notes.updateNoteDate)
  const updateEventTime = useMutation(api.events.updateEventTime)

  const [selectedEvent, setSelectedEvent] = useState<any>(null)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [addEventDialogOpen, setAddEventDialogOpen] = useState(false)

  const eventsWithFormattedDates = combinedEvents.map((event: any) => {
    const formattedDate = new Date(event.date)
    if (event.generalType === "EVENT") {
      return {
        ...event,
        start: new Date(event.startTime),
        end: new Date(event.endTime),
        id: event._id,
        eventType: event.type,
      }
    } else {
      return {
        ...event,
        start: formattedDate,
        id: event._id,
        eventType: event.generalType,
      }
    }
  })

  const renderEventContent = (eventInfo: any) => {
    let backgroundColor

    if (eventInfo.event.extendedProps.generalType === "NOTE") {
      backgroundColor = "#628BF7"
    } else {
      switch (eventInfo.event.extendedProps.eventType) {
        case "EXAM":
          backgroundColor = "#6ADBC6"
          break
        case "ASSIGNMENT":
          backgroundColor = "#C6C4FB"
          break
        case "OTHER":
          backgroundColor = "#FF7ABC"
          break
        default:
          backgroundColor = "#FFDAB9"
      }
    }

    return (
      <div
        style={{
          backgroundColor,
          borderRadius: "3px",
          padding: "5px",
        }}
        className="w-full"
      >
        <h1 className="font-bold text-black">{eventInfo.event.title}</h1>
      </div>
    )
  }

  const locale = useLocale()
  const t = useTranslations()

  return (
    <div className="w-full">
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin, timeGridPlugin]}
        headerToolbar={{
          left: "prev,next today",
          center: "title",
          right: "dayGridMonth,timeGridWeek,timeGridDay",
        }}
        titleFormat={{ year: "numeric", month: "long" }}
        initialView="dayGridMonth"
        nowIndicator={true}
        editable={true}
        selectable={true}
        selectMirror={true}
        height={"90vh"}
        weekends={true}
        locale={locale}
        eventContent={renderEventContent}
        defaultTimedEventDuration={"01:00:00"}
        eventDurationEditable={true}
        eventStartEditable={true}
        eventResizableFromStart={true}
        eventResize={async event => {
          if (event.event._def.extendedProps.generalType === "EVENT") {
            const newStartTime = event.event.start
              ? event.event.start.toISOString()
              : ""
            const newEndTime = event.event.end
              ? event.event.end.toISOString()
              : ""
            await updateEventTime({
              eventId: event.event.id as Id<"events">,
              newStartTime: newStartTime,
              newEndTime: newEndTime,
            })
          } else {
            toast.error(
              t("Dashboard.dialogs.events.resizeEvent.resizeNoteEventError")
            )
          }
        }}
        eventDrop={async event => {
          console.log("Event dropped:", event)
          const eventId = event.event.id as Id<"events">
          const noteId = event.event.id as Id<"notes">
          const newStartTime = event.event.start
          const newEndTime: any = event.event.end

          const newStartISOString = newStartTime
            ? newStartTime.toISOString()
            : null
          const newEndISOString = newEndTime ? newEndTime.toISOString() : null

          if (newStartISOString) {
            if (event.event.extendedProps.generalType === "NOTE") {
              await updateNoteDate({
                noteId: noteId,
                newDate: newStartISOString,
              })
            } else {
              await updateEventDate({
                eventId: eventId,
                newDate: newStartISOString,
                newStartTime: newStartISOString,
                newEndTime: newEndISOString,
              })
            }
          } else {
            console.error("New start time is undefined")
          }
        }}
        eventClick={event => {
          setSelectedEvent(event.event)
          setDialogOpen(true)
        }}
        dateClick={() => {
          setAddEventDialogOpen(true)
        }}
        events={eventsWithFormattedDates}
      />
      <InfoDialog
        event={selectedEvent}
        open={dialogOpen}
        onClose={setDialogOpen}
      />

      {/* AddEvent component */}
      <AddEvent
        dialogOpen={addEventDialogOpen}
        setDialogOpen={setAddEventDialogOpen}
      />
    </div>
  )
}

export default Calendar
