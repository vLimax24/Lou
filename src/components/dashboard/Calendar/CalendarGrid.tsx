import { useState } from "react"
import * as React from "react"
import dayjs from "dayjs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Sheet, SheetContent, SheetTrigger, SheetTitle, SheetFooter, SheetClose } from "@/components/ui/sheet"
import { Calendar } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Dropdown } from "./Dropdown"
import { Plus, Trash } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTrigger } from "@/components/ui/dialog"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Separator } from "@/components/ui/separator"
import { Id } from "@/convex/_generated/dataModel"
import { api } from "@/convex/_generated/api"
import { useMutation } from "convex/react"
import { toast } from "sonner"
import { EditNoteDialog } from "../Dialogs/notes/EditNoteDialog"
import { EditEventDialog } from "../Dialogs/events/EditEventDialog"


type NoteEvent = {
  _id: Id<"notes">;
  _creationTime: number;
  subjectId?: Id<"subjects">;
  text: string;
  userId: Id<"users">;
  showInCalendar: boolean;
  date: string;
};

type GeneralEvent = {
  _id: Id<"events">;
  _creationTime: number;
  subjectId?: Id<"subjects">;
  userId: Id<"users">;
  type: string;
  date: string;
  title: string;
  description: string;
};

type CombinedEvents = (NoteEvent | GeneralEvent)[];

interface CalendarGridProps {
  currentMonth: dayjs.Dayjs;
  events: CombinedEvents;
  onCreateEvent: (
    date: string,
    title: string,
    description: string,
    type: string
  ) => void;
}

const capitalizeFirstLetter = (string: any) => {
  if (!string) return ""
  return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase()
}

const CalendarGrid: React.FC<CalendarGridProps> = ({
  currentMonth,
  events,
  onCreateEvent,
}) => {
  const [dropdownValue, setDropdownValue] = useState("OTHER")
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [selectedDate, setSelectedDate] = useState("")

  const handleCreateEvent = () => {
    onCreateEvent(selectedDate, title, description, dropdownValue)
    setTitle("")
    setDescription("")
  }

  const deleteEvent = useMutation(api.events.deleteEvent)
  const deleteNote = useMutation(api.notes.deleteNote)

  const handleDeleteEvent = async (id: any) => {
    try {
      await deleteEvent({
        id: id,
      })
      toast.success("Event deleted!")
    } catch (error) {
      toast.error("Error deleting Event!")
    }
  }

  const handleDeleteNote = async (id: any) => {
    try {
      await deleteNote({
        id: id,
      })
      toast.success("Note deleted!")
    } catch (error) {
      toast.error("Error deleting Note!")
    }
  }

  const typeColors: { [key: string]: string } = {
    "OTHER": "bg-gray-300 text-gray-800",
    "EXAM": "bg-red-500 text-white",
    "ASSIGNMENT": "bg-blue-500 text-white",
    "NOTES": "bg-green-300 text-green-800",
  }

  const getEventsForDate = (date: string) => {
    return events
      ?.filter(event => dayjs(event.date).format("YYYY-MM-DD") === date)
      .map((event) => {
        const typeClass = typeColors[(event as GeneralEvent).type?.toUpperCase() || "NOTES"]
        const isNoteEvent = (event: NoteEvent | GeneralEvent): event is NoteEvent => "text" in event
  
        return (
          <Dialog key={event._id}>
            <DialogTrigger
              className="z-10 w-full text-left"
              onClick={e => {
                e.stopPropagation()
              }}
            >
              <div className={`${typeClass} my-0.5 w-full rounded-sm pl-2 hover:cursor-pointer`}>
                {isNoteEvent(event) ? event.text : event.title}
              </div>
            </DialogTrigger>
            <DialogContent onClick={e => e.stopPropagation()} className="px-8">
              <DialogHeader className="flex flex-row justify-between items-center space-y-0">
                <div className="text-3xl font-bold flex flex-col">
                  <div className="flex items-center gap-4">
                    <div className={`size-6 ${typeClass} rounded-md mt-0.5`}/>
                    {isNoteEvent(event) ? event.text : event.title}
                  </div>
                </div>
       
              </DialogHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                <Badge className={`${typeClass}`}>
                  {isNoteEvent(event) ? "Note" : capitalizeFirstLetter((event as GeneralEvent).type)}
                </Badge>
                </div>
              </div>
              <div>{dayjs(event.date).format("dddd")} - {dayjs(event.date).format("DD.MM.YYYY")}</div>
              <div className="flex items-center justify-between">
                <div className="flex items-start">
                  <p>Description: </p>
                  <div className="ml-2"> {isNoteEvent(event) ? event.text : event.description}</div>
                </div>
              </div>
              <Separator className="my-4" />
              <div className="mb-2 flex items-center justify-between">
                <div className="center">
                  <h2>Actions</h2>
                </div>
                <div className="flex">
                  <TooltipProvider>
                    <div className="mx-2 hover:cursor-pointer">
                      <Tooltip delayDuration={50}>
                        <TooltipTrigger asChild>
                        {isNoteEvent(event) ? (<EditNoteDialog id={event._id}/>) : (<EditEventDialog id={event._id} />)}
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Edit Event</p>
                        </TooltipContent>
                      </Tooltip>
                    </div>
                    <div className="mx-2 hover:cursor-pointer">
                      <Tooltip delayDuration={50}>
                        <TooltipTrigger asChild onClick={() => isNoteEvent(event) ? handleDeleteNote(event._id) : handleDeleteEvent(event._id)}>
                          <Trash size={20} />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Delete Event</p>
                        </TooltipContent>
                      </Tooltip>
                    </div>
                  </TooltipProvider>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        )
      })
  }
  

  const renderCalendarCell = (day: dayjs.Dayjs) => {
    const isCurrentDay = day.isSame(dayjs(), "day")
    const formattedDate = day.format("YYYY-MM-DD")

    return (
      <Sheet key={formattedDate}>
        <SheetTrigger
          asChild
          key={formattedDate}
        >
          <div
            key={formattedDate}
            className={`group relative flex h-24 items-center justify-center ${isCurrentDay ? "bg-blue-400 bg-opacity-50" : ""} border border-gray-300 text-sm hover:cursor-default md:h-28 lg:h-32 ${
              day.month() === currentMonth.month()
                ? ""
                : "bg-gray-200 text-gray-500"
            } `}
            style={{ flexGrow: 1, width: "calc(100% / 7)" }}
            onClick={() => {
              setSelectedDate(formattedDate)
            }}
          >
            <TooltipProvider>
              <Tooltip delayDuration={50}>
                <TooltipTrigger>
                  <div className="absolute left-0 top-0 m-0.5 hidden rounded-md bg-gray-200 p-1 hover:cursor-pointer group-hover:block">
                    <Plus size={20} color="#464646" />
                  </div>
                </TooltipTrigger>
                <TooltipContent className="mb-16 ml-5">
                  <p>Create an Event</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <div className="absolute right-0 top-0 m-1">{day.format("D")}</div>
            <div className="w-full px-2">
              {getEventsForDate(formattedDate)}
            </div>
          </div>
        </SheetTrigger>
        <SheetContent>
          <SheetTitle className="font-open-sans text-xl font-bold">
            Create an Event - {formattedDate}
          </SheetTitle>
          <div className="mt-2 flex flex-col">
            <div className="mb-5">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                type="text"
                placeholder="Event Title"
                value={title}
                onChange={e => setTitle(e.target.value)}
                required
                className="mt-1"
              />
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Calendar size={20} />
                <Label htmlFor="date" className="ml-2">
                  Date
                </Label>
              </div>
              <div>
                <p>{formattedDate}</p>
                <input type="hidden" value={formattedDate} />
              </div>
            </div>
            <div className="mb-5">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={description}
                onChange={e => setDescription(e.target.value)}
                className="mt-1"
              />
            </div>
            <div className="flex items-center justify-between">
              <h1>Type:</h1>
              <div className="flex items-center">
                <h1 className="mr-2">
                  {dropdownValue.charAt(0).toUpperCase() +
                    dropdownValue.slice(1).toLowerCase()}
                </h1>
                <Dropdown value={dropdownValue} setValue={setDropdownValue} />
              </div>
            </div>
          </div>
          <SheetFooter>
            <SheetClose asChild>
              <Button onClick={handleCreateEvent} className="mt-5 w-full">
                Create
              </Button>
            </SheetClose>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    )
  }

  const renderCalendarGrid = () => {
    const startOfMonth = currentMonth.startOf("month")
    const endOfMonth = currentMonth.endOf("month")
    const startOfWeek = startOfMonth.startOf("week")
    const endOfWeek = endOfMonth.endOf("week")

    const calendarRows = []

    let day = startOfWeek
    while (day.isBefore(endOfWeek, "day")) {
      const currentRow = []

      for (let i = 0; i < 7; i++) {
        currentRow.push(renderCalendarCell(day))
        day = day.add(1, "day")
      }

      calendarRows.push(
        <div key={day.format("YYYY-MM-DD")} className="flex flex-wrap">
          {currentRow}
        </div>
      )
    }

    return calendarRows
  }

  return <div>{renderCalendarGrid()}</div>
}

export default CalendarGrid
