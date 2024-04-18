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
import { Dropdown } from "../../Calendar/Dropdown"
import { Calendar } from "@/components/ui/calendar"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { z } from "zod"
import { Pencil } from "lucide-react"
import { api } from "@/convex/_generated/api"
import { useMutation, useQuery } from "convex/react"

const formSchema = z.object({
  title: z.string().min(2).max(50),
  description: z.string(),
  date: z.date(),
  type: z.string()
})

type FormData = z.infer<typeof formSchema>;

export const EditEventDialog = ({ id }: any) => {
  const editEvent = useMutation(api.events.editEvent)
  const [date, setDate] = useState<any>(new Date())
  const [dropdownValue, setDropdownValue] = useState("OTHER")

  const event = useQuery(api.events.getSpecificEvent, { eventId: id })

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
        title: event?.title ?? "",
        description: event?.description ?? "",
        type: event?.type ?? "",
        date: new Date(),
      },
  })

  useEffect(() => {
    if (event) {
      const parsedDate = event.date ? new Date(event.date) : new Date()
      setDate(parsedDate)
      setDropdownValue(event.type)
    }
  }, [event])

  const formattedDate = date?.toISOString()

  const onSubmit = async (values: FormData) => {
    try {
      await editEvent({
        eventId: id,
        newTitle: values.title,
        newDate: formattedDate,
        newDescription: values.description,
        newType: dropdownValue,
      })
      toast.success("Event edited successfully!")
      form.reset()
    } catch (error) {
      toast.error("Error editing Event!")
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Pencil size={20} className='hover:cursor-pointer mx-1 hover:text-green-500 duration-300'/>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] transition-all duration-300 ease-in-out">
        <DialogHeader>
          <DialogTitle>Edit Event</DialogTitle>
          <DialogDescription>Edit the parts of the event that you want to be changed!</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-1 items-center gap-4">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Title</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Meeting with John"
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
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Meeting via Zoom in office"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
            <div className="flex items-center justify-between">
              <FormLabel>Type:</FormLabel>
              <div className="flex items-center">
                <h1 className="mr-2">
                  {dropdownValue.charAt(0).toUpperCase() +
                    dropdownValue.slice(1).toLowerCase()}
                </h1>
                <Dropdown value={dropdownValue} setValue={setDropdownValue} />
              </div>
            </div>
                <div>
                  <FormField
                    control={form.control}
                    name="date"
                    render={() => (
                      <FormItem>
                        <FormLabel>Pick a due date:</FormLabel>
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
              {/* <DialogClose> */}
                <Button type="submit">Save</Button>
              {/* </DialogClose> */}
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
