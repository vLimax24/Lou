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
import Image from "next/image"
import { cn } from "@/lib/utils"
import ChemistryTemplate from "../../../../../public/templates/chemistry_template.svg"
import BiologyTemplate from "../../../../../public/templates/biology_template.svg"
import PhysicsTemplate from "../../../../../public/templates/physics_template.svg"
import HistoryTemplate from "../../../../../public/templates/history_tempalte.svg"

const formSchema = z.object({
  name: z.string().min(2).max(15),
  template: z.string().min(2).max(50),
})

type FormData = z.infer<typeof formSchema>

const templates = [
  {
    name: "chemistry",
    url: ChemistryTemplate,
  },
  {
    name: "biology",
    url: BiologyTemplate,
  },
  {
    name: "physics",
    url: PhysicsTemplate,
  },
  {
    name: "history",
    url: HistoryTemplate,
  },
  {
    name: "chemistry_2",
    url: ChemistryTemplate,
  },
  {
    name: "chemistry_3",
    url: ChemistryTemplate,
  },
]

export const AddSubjectDialog = () => {
  const addSubject = useAction(api.users.addUserSubjectAction)
  const [openAddModal, setOpenAddModel] = useState(false)
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      template: "",
    },
  })

  const onSubmit = async (values: FormData) => {
    console.log(values)
    try {
      await addSubject({
        name: values.name,
        template: values.template,
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
                <FormField
                  control={form.control}
                  name="template"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Choose a template</FormLabel>
                      <FormControl>
                        <div className="grid grid-cols-2 gap-2">
                          {templates.map((template, index) => (
                            <div
                              key={index}
                              className={cn(
                                "rounded-xl hover:cursor-pointer",
                                field.value === template.name
                                  ? "border-primaryBlue"
                                  : ""
                              )}
                              onClick={() => {
                                form.setValue("template", template.name)
                              }}
                            >
                              <Image
                                src={template.url}
                                alt="test"
                                width={300}
                                height={300}
                                className={cn(
                                  "aspect-[143/40] rounded-md border border-gray-400 object-cover",
                                  field.value === template.name
                                    ? "border-primaryBlue"
                                    : ""
                                )}
                              />
                            </div>
                          ))}
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
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
