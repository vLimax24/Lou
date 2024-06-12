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
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { api } from "@/convex/_generated/api"
import { Id } from "@/convex/_generated/dataModel"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation, useQuery } from "convex/react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { z } from "zod"
import { Pencil } from "lucide-react"
import { useState, useEffect } from "react"
import { Plus } from "lucide-react"
import usePress from "@/hooks/usePress"
import { cn } from "@/lib/utils"

const addFormSchema = z.object({
  text: z.string().min(2).max(50),
  description: z.string().min(10).max(150),
  showInCalendar: z.boolean(),
  date: z.date(),
})

const editFormSchema = z.object({
  text: z.string().min(2).max(50),
  showInCalendar: z.boolean(),
  date: z.date(),
})

type AddFormData = z.infer<typeof addFormSchema>
type EditFormData = z.infer<typeof editFormSchema>

export const AddNote = ({ subjectId }: { subjectId?: Id<"subjects"> }) => {
  const addNote = useMutation(api.notes.addNote)
  const [isPressed, handlePress] = usePress()
  const [dialogOpen, setDialogOpen] = useState(false)

  const form = useForm<AddFormData>({
    resolver: zodResolver(addFormSchema),
    defaultValues: {
      text: "",
      description: "",
      showInCalendar: false,
      date: new Date(),
    },
  })

  const onSubmit = async (values: AddFormData) => {
    try {
      const formattedDate = values.date.toISOString()
      await addNote({
        text: values.text,
        description: values.description,
        showInCalendar: values.showInCalendar,
        date: formattedDate,
        subjectId: subjectId,
      })
      toast.success("Note added!")
      setDialogOpen(false)
      form.reset()
    } catch (error) {
      toast.error("Error Adding Note!")
    }
  }

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DialogTrigger asChild>
        <Button
          className={cn(
            "flex items-center justify-center rounded-full bg-primaryBlue hover:bg-primaryHover",
            isPressed ? "cta-button-pressed" : "cta-button-shadow"
          )}
          onClick={handlePress}
          data-cy="add-note-button"
        >
          <Plus className="size-5" />
          <p className="ml-1">Create Note</p>
        </Button>
      </DialogTrigger>
      <DialogContent className="transition-all duration-300 ease-in-out sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Note</DialogTitle>
          <DialogDescription>Add a new note for yourself.</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-1 items-center gap-4">
                <FormField
                  control={form.control}
                  name="text"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Note</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Clouds are white now"
                          {...field}
                          data-cy="note-input"
                        />
                      </FormControl>
                      <FormMessage data-cy="note-error-message" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea
                          className="resize-none"
                          placeholder="A brief description of the note"
                          {...field}
                          data-cy="description-input"
                        />
                      </FormControl>
                      <FormMessage data-cy="description-error-message" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="showInCalendar"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl className="flex">
                        <div className="flex items-center justify-between">
                          <Label htmlFor="showInCalendar">
                            Show in Calendar
                          </Label>
                          <Switch
                            id="showInCalendar"
                            checked={field.value}
                            onCheckedChange={field.onChange}
                            data-cy="calendar-switch"
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {form.getValues().showInCalendar && (
                  <div>
                    <FormField
                      control={form.control}
                      name="date"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Pick a due date</FormLabel>
                          <FormControl className="flex">
                            <div>
                              <Calendar
                                mode="single"
                                selected={field.value}
                                onSelect={field.onChange}
                                className="grid w-full place-items-center rounded-md border"
                                data-cy="calendar"
                              />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                )}
              </div>
            </div>
            <DialogFooter>
              <Button
                type="submit"
                className="w-full bg-primaryBlue hover:bg-primaryHover"
                data-cy="add-note-submit-button"
              >
                Add Note
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}

export const EditNote = ({ id }: { id: Id<"notes"> }) => {
  const note = useQuery(api.notes.getSpecificNote, { noteId: id })
  const editNote = useMutation(api.notes.editNote)
  const [showInCalendar, setShowInCalendar] = useState(false)
  const [date, setDate] = useState<Date>(new Date())

  useEffect(() => {
    if (note) {
      setShowInCalendar(note.showInCalendar)
      const parsedDate = note.date ? new Date(note.date) : new Date()
      setDate(parsedDate)
    }
  }, [note])

  const form = useForm<EditFormData>({
    resolver: zodResolver(editFormSchema),
    defaultValues: {
      text: note?.text ?? "",
      showInCalendar: false,
      date: new Date(),
    },
  })

  const onSubmit = async (values: EditFormData) => {
    try {
      const formattedDate = date.toISOString()
      await editNote({
        noteId: id,
        newText: values.text,
        newShowInCalendar: showInCalendar,
        newDate: formattedDate,
      })
      toast.success("Note edited successfully!")
      form.reset()
    } catch (error) {
      toast.error("Error editing Note!")
    }
  }

  return (
    <Dialog>
      <Tooltip delayDuration={50}>
        <TooltipTrigger asChild>
          <DialogTrigger asChild>
            <Pencil
              size={20}
              className="duration-300 hover:cursor-pointer hover:text-green-500"
            />
          </DialogTrigger>
        </TooltipTrigger>
        <TooltipContent>
          <p>Edit Note</p>
        </TooltipContent>
      </Tooltip>

      <DialogContent className="transition-all duration-300 ease-in-out sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Note</DialogTitle>
          <DialogDescription>
            Edit the parts of the note that you want to be changed!
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-1 items-center gap-4">
                <FormField
                  control={form.control}
                  name="text"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Note</FormLabel>
                      <FormControl>
                        <Input placeholder="Clouds are white now" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="showInCalendar"
                  render={() => (
                    <FormItem>
                      <FormControl className="flex">
                        <div className="flex items-center justify-between">
                          <Label htmlFor="showInCalendar">
                            Show in Calendar
                          </Label>
                          <Switch
                            id="showInCalendar"
                            checked={showInCalendar}
                            onCheckedChange={() =>
                              setShowInCalendar(!showInCalendar)
                            }
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div>
                  <FormField
                    control={form.control}
                    name="date"
                    render={() => (
                      <FormItem>
                        <FormLabel>Pick a due date</FormLabel>
                        <FormControl className="flex">
                          <div>
                            <Calendar
                              mode="single"
                              selected={date}
                              onSelect={day => setDate(day ?? new Date())}
                              className="grid w-full place-items-center rounded-md border"
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button type="submit" className="w-full">
                Save
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
