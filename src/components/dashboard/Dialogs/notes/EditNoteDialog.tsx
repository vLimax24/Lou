import { Button } from "@/components/ui/button"
import { useState, useEffect } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose
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
import { Switch } from "@/components/ui/switch"
import { Calendar } from "@/components/ui/calendar"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { z } from "zod"
import { Pencil } from "lucide-react"
import { Label } from "@/components/ui/label"
import { api } from "@/convex/_generated/api"
import { useMutation, useQuery } from "convex/react"

const formSchema = z.object({
  text: z.string().min(2).max(50),
  showInCalendar: z.boolean(),
  date: z.date(),
})

type FormData = z.infer<typeof formSchema>;

export function EditNoteDialog({ id }: any) {
  const note = useQuery(
    api.notes.getSpecificNote,
    { noteId: id }
  )
  const editNote = useMutation(api.notes.editNote)
  const [showInCalendar, setShowInCalendar] = useState(false)
  const [date, setDate] = useState<any>(new Date())

  useEffect(() => {
    if (note) {
      setShowInCalendar(note.showInCalendar)
      const parsedDate = note.date ? new Date(note.date) : new Date()
      setDate(parsedDate)
    }
  }, [note])

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      text: note?.text ?? "", // Set defaultValue to note's text
      showInCalendar: false,
      date: new Date(),
    },
  })

  async function onSubmit(values: FormData) {
    try {
      const formattedDate = date?.toISOString()
      await editNote({
        noteId: id,
        newText: values.text,
        newShowInCalendar: showInCalendar,
        newDate: formattedDate,
      })
      toast.success("Note edited successfully!")
      form.reset()
    } catch (error) {
      toast("Error editing Note!")
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Pencil size={20} className='hover:cursor-pointer mx-1 hover:text-green-500 duration-300'/>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] transition-all duration-300 ease-in-out">
        <DialogHeader>
          <DialogTitle>Edit Note</DialogTitle>
          <DialogDescription>Edit the parts of the note that you want to be changed!</DialogDescription>
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
                        />
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
                      <FormControl className='flex'> 
                        <div className='flex items-center justify-between'>
                            <Label htmlFor="showInCalendar">Show in Calendar</Label>
                            <Switch
                              id="showInCalendar"
                              checked={showInCalendar}
                              onCheckedChange={() => setShowInCalendar(!showInCalendar)}
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
                        <FormControl className='flex'> 
                          <div>
                            <Calendar
                              mode="single"
                              selected={date}
                              onSelect={setDate}
                              className="rounded-md border w-full grid place-items-center"
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
              <DialogClose>
                <Button type="submit">Save</Button>
              </DialogClose>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
