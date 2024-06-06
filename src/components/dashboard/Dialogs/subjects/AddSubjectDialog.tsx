import { Button, buttonVariants } from "@/components/ui/button"
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
import { api } from "@/convex/_generated/api"
import { zodResolver } from "@hookform/resolvers/zod"
import { useAction } from "convex/react"
import React, { useState } from "react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { z } from "zod"

const formSchema = z.object({
  name: z.string().min(2).max(50),
})

type FormData = z.infer<typeof formSchema>

export const AddSubjectDialog = () => {
  const addSubject = useAction(api.users.addUserSubjectAction)
  const [openAddModal, setOpenAddModel] = useState(false)
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  })

  const onSubmit = async (values: FormData) => {
    try {
      await addSubject({
        name: values.name,
      })

      toast.success("Subject added!")
      form.reset()
      setOpenAddModel(false)
    } catch (error) {
      if (error instanceof Error) {
        if (error.message === "Subject with this name already exists") {
          toast.error("Subject with this name already exists!")
        } else {
          toast.error("Subject with this name already exists!")
        }
      } else {
        toast.error("Subject with this name already exists!")
      }
    }
  }

  return (
    <Dialog open={openAddModal} onOpenChange={setOpenAddModel}>
      <DialogTrigger className={buttonVariants({ variant: "outline" })}>
        Add Subject
      </DialogTrigger>
      <DialogContent className="transition-all duration-300 ease-in-out sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Subject</DialogTitle>
          <DialogDescription>Add a new subject for yourself.</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-1 items-center gap-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Algebra, " {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {/* color picker implemenation remains */}
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">Add Subject</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
