import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { useEffect } from "react"
import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useMutation } from "convex/react"
import { api } from "@/convex/_generated/api"
import { Textarea } from "@/components/ui/textarea"
import { useTranslations } from "next-intl"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { useState } from "react"
import { Plus, ChevronDown } from "lucide-react"
import { convertToTitleCase } from "@/lib/utils"
import { Id } from "@/convex/_generated/dataModel"
import { useQuery } from "convex/react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { toast } from "sonner"
import { Dispatch } from "react"

export const AddEvent = ({
  dialogOpen,
  setDialogOpen,
}: {
  dialogOpen: boolean
  setDialogOpen: Dispatch<boolean>
}) => {
  const [calendarPopoverOpen, setCalendarPopoverOpen] = useState(false)
  const t = useTranslations()

  const addEventSchema = z.object({
    title: z
      .string()
      .min(1, t("Dashboard.dialogs.events.addEvent.errors.emptyTitle"))
      .min(2, t("Dashboard.dialogs.events.addEvent.errors.minTitleInput"))
      .max(50, t("Dashboard.dialogs.events.addEvent.errors.maxTitleInput")),
    description: z
      .string()
      .min(1, t("Dashboard.dialogs.events.addEvent.errors.emptyDescription"))
      .min(
        10,
        t("Dashboard.dialogs.events.addEvent.errors.minDescriptionInput")
      )
      .max(
        150,
        t("Dashboard.dialogs.events.addEvent.errors.maxDescriptionInput")
      ),
    date: z.date(),
    startTime: z
      .string()
      .min(1, t("Dashboard.dialogs.events.addEvent.errors.emptyStartTime")),
    endTime: z
      .string()
      .min(1, t("Dashboard.dialogs.events.addEvent.errors.emptyEndTime")),
    eventType: z.enum(["ASSIGNMENT", "EXAM", "OTHER"]),
  })

  type AddEventData = z.infer<typeof addEventSchema>

  const addEvent = useMutation(api.events.addEvent)

  const form = useForm<AddEventData>({
    resolver: zodResolver(addEventSchema),
    defaultValues: {
      title: "",
      description: "",
      date: new Date(),
      startTime: "",
      endTime: "",
      eventType: "ASSIGNMENT",
    },
  })

  const onSubmit = async (values: AddEventData) => {
    try {
      const formattedDate = values.date.toISOString()

      const startDateTime = new Date(
        `${values.date.toISOString().split("T")[0]}T${values.startTime}`
      )
      const endDateTime = new Date(
        `${values.date.toISOString().split("T")[0]}T${values.endTime}`
      )
      const formattedStartTime = startDateTime.toISOString()
      const formattedEndTime = endDateTime.toISOString()

      await addEvent({
        title: values.title,
        description: values.description,
        date: formattedDate,
        startTime: formattedStartTime,
        endTime: formattedEndTime,
        type: values.eventType,
      })

      toast.success(t("Dashboard.dialogs.events.addEvent.submitSuccessMessage"))
      form.reset()
      setDialogOpen(false)
    } catch (error) {
      toast.error(t("Dashboard.dialogs.events.addEvent.submitErrorMessage"))
    }
  }

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DialogContent className="max-h-[95vh] max-w-[95vw] overflow-y-auto rounded-2xl transition-all duration-300 ease-in-out lg:w-1/4">
        <DialogHeader className="text-left">
          <DialogTitle>
            {t("Dashboard.dialogs.events.addEvent.title")}
          </DialogTitle>
          <DialogDescription>
            {t("Dashboard.dialogs.events.addEvent.description")}
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col"
          >
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-1 items-center gap-4">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        {t("Dashboard.dialogs.events.addEvent.labelTitle")}
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder={t(
                            "Dashboard.dialogs.events.addEvent.placeholderTitle"
                          )}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        {t(
                          "Dashboard.dialogs.events.addEvent.labelDescription"
                        )}
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          className="resize-none"
                          placeholder={t(
                            "Dashboard.dialogs.events.addEvent.placeholderDescription"
                          )}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="date"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>
                        {t("Dashboard.dialogs.events.addEvent.labelDate")}
                      </FormLabel>
                      <Popover
                        open={calendarPopoverOpen}
                        onOpenChange={setCalendarPopoverOpen}
                      >
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={"outline"}
                              className={`font-normal w-full pl-3 text-left ${
                                !field.value && "text-muted-foreground"
                              }`}
                              onKeyDown={() => {
                                setCalendarPopoverOpen(true)
                              }}
                            >
                              {field.value ? (
                                format(field.value, "PPP")
                              ) : (
                                <span>{t("Pick a date")}</span>
                              )}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            onDayClick={() => {
                              setCalendarPopoverOpen(false)
                            }}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="startTime"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        {t("Dashboard.dialogs.events.addEvent.labelStartTime")}
                      </FormLabel>
                      <FormControl>
                        <Input type="time" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="endTime"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        {t("Dashboard.dialogs.events.addEvent.labelEndTime")}
                      </FormLabel>
                      <FormControl>
                        <Input type="time" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="eventType"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>
                        {t("Dashboard.dialogs.events.addEvent.labelEventType")}
                      </FormLabel>
                      <div className="flex items-center justify-between">
                        <FormControl>
                          <DropdownMenu>
                            <DropdownMenuTrigger>
                              <Button
                                className="flex items-center justify-between"
                                variant={"outline"}
                              >
                                {field.value ? (
                                  convertToTitleCase(field.value)
                                ) : (
                                  <span>
                                    {t(
                                      "Dashboard.dialogs.events.addEvent.placeholderEventType"
                                    )}
                                  </span>
                                )}
                                <ChevronDown className="ml-2 h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                              <DropdownMenuItem
                                onClick={() => field.onChange("ASSIGNMENT")}
                              >
                                {t(
                                  "Dashboard.dialogs.events.addEvent.eventTypes.Assignment"
                                )}
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() => field.onChange("EXAM")}
                              >
                                {t(
                                  "Dashboard.dialogs.events.addEvent.eventTypes.Exam"
                                )}
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() => field.onChange("OTHER")}
                              >
                                {t(
                                  "Dashboard.dialogs.events.addEvent.eventTypes.Other"
                                )}
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </FormControl>
                        {field.value && (
                          <div className="flex items-center justify-between">
                            <Badge
                              className={`ml-2 ${
                                field.value === "ASSIGNMENT"
                                  ? "bg-[#6ADBC6]"
                                  : field.value === "EXAM"
                                    ? "bg-[#C6C4FB]"
                                    : field.value === "OTHER"
                                      ? "bg-[#FF7ABC]"
                                      : "bg-[#628BF7]"
                              } text-white`}
                            >
                              {convertToTitleCase(field.value)}
                            </Badge>
                          </div>
                        )}
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <DialogFooter>
              <Button
                type="submit"
                className="w-full bg-primaryBlue hover:bg-primaryHover"
              >
                {t("Dashboard.dialogs.events.addEvent.submitButton")}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}

export const EditEvent = ({
  dialogOpen,
  setDialogOpen,
  event,
}: {
  dialogOpen: boolean
  setDialogOpen: Dispatch<boolean>
  event: any
}) => {
  const eventData = useQuery(api.events.getSpecificEvent, { eventId: event.id })
  const editEventMutation = useMutation(api.events.editEvent)
  const [calendarPopoverOpen, setCalendarPopoverOpen] = useState(false)
  const t = useTranslations()

  const editEventSchema = z.object({
    title: z
      .string()
      .min(1, t("Dashboard.dialogs.events.addEvent.errors.emptyTitle"))
      .min(2, t("Dashboard.dialogs.events.addEvent.errors.minTitleInput"))
      .max(50, t("Dashboard.dialogs.events.addEvent.errors.maxTitleInput")),
    description: z
      .string()
      .min(1, t("Dashboard.dialogs.events.addEvent.errors.emptyDescription"))
      .min(
        10,
        t("Dashboard.dialogs.events.addEvent.errors.minDescriptionInput")
      )
      .max(
        150,
        t("Dashboard.dialogs.events.addEvent.errors.maxDescriptionInput")
      ),
    date: z.date(),
    startTime: z
      .string()
      .min(1, t("Dashboard.dialogs.events.addEvent.errors.emptyStartTime")),
    endTime: z
      .string()
      .min(1, t("Dashboard.dialogs.events.addEvent.errors.emptyEndTime")),
    eventType: z.string(),
  })

  type EditEventData = z.infer<typeof editEventSchema>

  const form = useForm<EditEventData>({
    resolver: zodResolver(editEventSchema),
    defaultValues: {
      title: eventData?.title ?? "",
      description: eventData?.description ?? "",
      date: eventData?.date ? new Date(eventData.date) : new Date(),
      startTime: "", // Need to fetch startTime from event if available
      endTime: "", // Need to fetch endTime from event if available
      eventType: eventData?.type ?? "ASSIGNMENT",
    },
  })

  useEffect(() => {
    if (eventData) {
      form.setValue("title", eventData.title)
      form.setValue("description", eventData.description)
      form.setValue(
        "date",
        eventData.date ? new Date(eventData.date) : new Date()
      )
      form.setValue("eventType", eventData.type)
      // Set startTime and endTime values from event if available
    }
  }, [eventData])

  const onSubmit = async (values: EditEventData) => {
    try {
      const formattedDate = values.date.toISOString()

      // Assuming startTime and endTime are fetched from the form values
      const startDateTime = new Date(
        `${values.date.toISOString().split("T")[0]}T${values.startTime}`
      )
      const endDateTime = new Date(
        `${values.date.toISOString().split("T")[0]}T${values.endTime}`
      )

      const formattedStartTime = startDateTime.toISOString()
      const formattedEndTime = endDateTime.toISOString()

      await editEventMutation({
        eventId: event.id,
        newTitle: values.title,
        newDescription: values.description,
        newDate: formattedDate,
        newStartTime: formattedStartTime,
        newEndTime: formattedEndTime,
        newType: values.eventType,
      })

      toast.success(
        t("Dashboard.dialogs.events.editEvent.submitSuccessMessage")
      )
      form.reset()
      setDialogOpen(false)
    } catch (error) {
      toast.error(t("Dashboard.dialogs.events.editEvent.submitErrorMessage"))
    }
  }

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DialogContent className="max-h-[95vh] max-w-[95vw] overflow-y-auto rounded-2xl transition-all duration-300 ease-in-out lg:w-1/4">
        <DialogHeader className="text-left">
          <DialogTitle>
            {t("Dashboard.dialogs.events.addEvent.title")}
          </DialogTitle>
          <DialogDescription>
            {t("Dashboard.dialogs.events.addEvent.description")}
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col"
          >
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-1 items-center gap-4">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        {t("Dashboard.dialogs.events.addEvent.labelTitle")}
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder={t(
                            "Dashboard.dialogs.events.addEvent.placeholderTitle"
                          )}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        {t(
                          "Dashboard.dialogs.events.addEvent.labelDescription"
                        )}
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          className="resize-none"
                          placeholder={t(
                            "Dashboard.dialogs.events.addEvent.placeholderDescription"
                          )}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="date"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>
                        {t("Dashboard.dialogs.events.addEvent.labelDate")}
                      </FormLabel>
                      <Popover
                        open={calendarPopoverOpen}
                        onOpenChange={setCalendarPopoverOpen}
                      >
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={"outline"}
                              className={`font-normal w-full pl-3 text-left ${
                                !field.value && "text-muted-foreground"
                              }`}
                              onKeyDown={() => {
                                setCalendarPopoverOpen(true)
                              }}
                            >
                              {field.value ? (
                                format(field.value, "PPP")
                              ) : (
                                <span>{t("Pick a date")}</span>
                              )}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            onDayClick={() => {
                              setCalendarPopoverOpen(false)
                            }}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="startTime"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        {t("Dashboard.dialogs.events.addEvent.labelStartTime")}
                      </FormLabel>
                      <FormControl>
                        <Input type="time" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="endTime"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        {t("Dashboard.dialogs.events.addEvent.labelEndTime")}
                      </FormLabel>
                      <FormControl>
                        <Input type="time" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="eventType"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>
                        {t("Dashboard.dialogs.events.addEvent.labelEventType")}
                      </FormLabel>
                      <div className="flex items-center justify-between">
                        <FormControl>
                          <DropdownMenu>
                            <DropdownMenuTrigger>
                              <Button
                                className="flex items-center justify-between"
                                variant={"outline"}
                              >
                                {field.value ? (
                                  convertToTitleCase(field.value)
                                ) : (
                                  <span>
                                    {t(
                                      "Dashboard.dialogs.events.addEvent.placeholderEventType"
                                    )}
                                  </span>
                                )}
                                <ChevronDown className="ml-2 h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                              <DropdownMenuItem
                                onClick={() => field.onChange("ASSIGNMENT")}
                              >
                                {t(
                                  "Dashboard.dialogs.events.addEvent.eventTypes.Assignment"
                                )}
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() => field.onChange("EXAM")}
                              >
                                {t(
                                  "Dashboard.dialogs.events.addEvent.eventTypes.Exam"
                                )}
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() => field.onChange("OTHER")}
                              >
                                {t(
                                  "Dashboard.dialogs.events.addEvent.eventTypes.Other"
                                )}
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </FormControl>
                        {field.value && (
                          <div className="flex items-center justify-between">
                            <Badge
                              className={`ml-2 ${
                                field.value === "ASSIGNMENT"
                                  ? "bg-[#6ADBC6]"
                                  : field.value === "EXAM"
                                    ? "bg-[#C6C4FB]"
                                    : field.value === "OTHER"
                                      ? "bg-[#FF7ABC]"
                                      : "bg-[#628BF7]"
                              } text-white`}
                            >
                              {convertToTitleCase(field.value)}
                            </Badge>
                          </div>
                        )}
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <DialogFooter>
              <Button
                type="submit"
                className="w-full bg-primaryBlue hover:bg-primaryHover"
              >
                {t("Dashboard.dialogs.events.addEvent.submitButton")}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
