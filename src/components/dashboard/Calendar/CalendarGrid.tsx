import { useState } from "react"
import * as React from "react"
import dayjs from "dayjs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Sheet, SheetContent, SheetTrigger, SheetTitle, SheetFooter, SheetClose } from "@/components/ui/sheet"
import { Calendar } from "lucide-react"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Dropdown } from "./Dropdown"
import { CalendarDays, Text, Presentation, School, ClipboardCheck, Plus, Pencil, Trash } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger, } from "@/components/ui/tooltip"
import { Separator } from "@/components/ui/separator"

interface CalendarGridProps {
  currentMonth: dayjs.Dayjs;
  events: any;
  onCreateEvent: (date: string, title: string, description: string, type: string) => void;
}

const capitalizeFirstLetter = (string:any) => {
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

  const getEventsForDate = (date: string) => {
    const eventTitles: React.ReactNode[] = events
      ?.filter((event: any) => dayjs(event.date).format("YYYY-MM-DD") === date)
      .map((event: any) => (
        <Dialog key={event.id}>
          <DialogTrigger className='w-full text-left z-10' onClick={(e) => {
            console.log("click")
            e.stopPropagation()
          }}>
            <div className='bg-green-500 bg-opacity-50 w-full pl-2 my-0.5 rounded-sm hover:cursor-pointer hover:bg-green-600 hover:bg-opacity-50'>
              {event.title || event.text}
            </div>
          </DialogTrigger>
          <DialogContent onClick={(e) => e.stopPropagation()}>
            <DialogHeader>
              <DialogTitle className='font-bold text-xl'>{event.title || event.text}</DialogTitle>
            </DialogHeader>
            <div className='flex items-center justify-between'>
              <div className='flex items-center'>
              {event.description === "ASSIGNMENT" ? (
                <ClipboardCheck size={20} className='mr-2' />
              ) : event.description === "EXAM" ? (
                <School size={20} className='mr-2' />
              ) : event.description === "OTHER" && (
                <Presentation size={20} className='mr-2' />
              )}
              <p>Type:</p>
              </div>
              <div>
                {capitalizeFirstLetter(event.description)}
              </div>
            </div>
            <div className='flex items-center justify-between'>
              <div className='flex items-center'>
                <CalendarDays size={20} className='mr-2'/>
                <p>Date:</p>
              </div>
              <div>
              {dayjs(event.date).format("DD.MM.YYYY")}
              </div>
            </div>
            <div className='flex items-center justify-between'>
              <div className='flex items-center '>
                <Text size={20} className='mr-2'/>
                <p>Description:</p>
              </div>
              <div className=''>
                <p className='ml-9 my-1 text-muted-foreground'>{event.type}</p>
              </div>
            </div>
            <Separator className="my-4" />
            <div className='mb-2 flex items-center justify-between'>
              <div className='center'>
                <h2>Actions</h2>
              </div>
              <div className='flex'>
                <TooltipProvider>
                <div className='mx-2 hover:cursor-pointer'>
                  <Tooltip delayDuration={50}>
                    <TooltipTrigger asChild>
                      <Pencil size={20}/>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Edit Event</p>
                    </TooltipContent>
                  </Tooltip>
                </div>
                <div className='mx-2 hover:cursor-pointer'>
                  <Tooltip delayDuration={50}>
                    <TooltipTrigger asChild>
                      <Trash size={20}/>
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
        
      ))

    return eventTitles
  }

  const renderCalendarCell = (day: dayjs.Dayjs) => {
    const isCurrentDay = day.isSame(dayjs(), "day")

    return (
      <Sheet key={day.format("YYYY-MM-DD")}>
                  <SheetTrigger asChild  key={day.format("YYYY-MM-DD")} onClick={() => console.log("clicked sheet")}>
                  <div
                    key={day.format("YYYY-MM-DD")}
                    className={`group flex items-center justify-center h-24 md:h-28 lg:h-32 border border-gray-300 hover:cursor-default text-sm relative ${
                      day.month() === currentMonth.month() ? "bg-white" : "bg-gray-200 text-gray-500"
                    } ${isCurrentDay ? "bg-blue-200" : ""}`}
                    style={{ flexGrow: 1, width: "calc(100% / 7)" }} // Set a fixed width for the cell
                    onClick={() => {
                      setSelectedDate(day.format("YYYY-MM-DD"))
                    }}
                  >
                    <TooltipProvider>
                      <Tooltip delayDuration={50}>
                        <TooltipTrigger>
                          <div className='hidden group-hover:block absolute top-0 left-0 m-0.5 p-1 bg-gray-200 rounded-md hover:cursor-pointer'>
                            <Plus size={20} color='#464646'/>
                          </div>
                        </TooltipTrigger>
                        <TooltipContent className='mb-16 ml-5'>
                          <p>Create an Event</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                    <div className="absolute top-0 right-0 m-1">{day.format("D")}</div>
                    <div className='w-full px-2'>{getEventsForDate(day.format("YYYY-MM-DD"))}</div>
                  </div>
                </SheetTrigger>
        <SheetContent>
          <SheetTitle className="font-bold text-xl font-open-sans">
              Create an Event - {selectedDate}
          </SheetTitle>
          <div className="mt-2 flex flex-col">
            <div className="mb-5">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                type="text"
                placeholder="Event Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
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
                <p>{selectedDate}</p>
                <input type="hidden" value={selectedDate} />
              </div>
            </div>
            <div className="mb-5">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
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
              <Button onClick={handleCreateEvent} className="w-full mt-5">
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

  return (
    <div>
      {renderCalendarGrid()}      
    </div>
  )
}

export default CalendarGrid
