"use client"
import React, { useState } from "react"
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
import { format } from "date-fns"
import { CalendarIcon, ChevronDown } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { zodResolver } from "@hookform/resolvers/zod"
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
import { Textarea } from "@/components/ui/textarea"
import { useTranslations } from "next-intl"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { api } from "@/convex/_generated/api"
import { useMutation, useQuery } from "convex/react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { z } from "zod"
import { Plus } from "lucide-react"
import { cn } from "@/lib/utils"

const addProjectSchema = z.object({
  name: z.string().min(2).max(50),
  description: z.string().min(10).max(150),
  subject: z.any(),
  deadline: z.date(),
})

type AddProjectData = z.infer<typeof addProjectSchema>

const AddProject = () => {
  const t = useTranslations()
  const createNewProject = useMutation(api.projects.addProject)
  const subjects = useQuery(api.studentSubjects.getUserSubjects)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [calendarPopoverOpen, setCalendarPopoverOpen] = useState(false)
  const [subjectName, setSubjectName] = useState<string>("")

  const form = useForm<AddProjectData>({
    resolver: zodResolver(addProjectSchema),
    defaultValues: {
      name: "",
      description: "",
      subject: "",
      deadline: new Date(),
    },
  })

  const onSubmit = async (values: AddProjectData) => {
    try {
      const formattedDate = values.deadline.toISOString()
      await createNewProject({
        name: values.name,
        description: values.description,
        subject: values.subject,
        deadline: formattedDate,
      })
      toast.success(
        t("Dashboard.dialogs.projects.addProject.submitSuccessMessage")
      )
      setSubjectName("")
      setDialogOpen(false)
      form.reset()
    } catch (error) {
      toast.error(t("Dashboard.dialogs.projects.addProject.submitErrorMessage"))
    }
  }

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DialogTrigger asChild>
        <Button className="flex items-center justify-center rounded-full bg-primaryBlue hover:bg-primaryHover">
          <Plus className="size-5" />
          <p className="ml-1">{t("Dashboard.dialogs.projects.buttonName")}</p>
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-[95vh] max-w-[95vw] overflow-y-auto rounded-2xl transition-all duration-300 ease-in-out lg:w-1/4">
        <DialogHeader className="text-left">
          <DialogTitle>
            {t("Dashboard.dialogs.projects.addProject.title")}
          </DialogTitle>
          <DialogDescription>
            {t("Dashboard.dialogs.projects.addProject.description")}
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
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        {t("Dashboard.dialogs.projects.addProject.labelName")}
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder={t(
                            "Dashboard.dialogs.projects.addProject.placeholderName"
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
                          "Dashboard.dialogs.projects.addProject.labelDescription"
                        )}
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          className="resize-none"
                          placeholder={t(
                            "Dashboard.dialogs.projects.addProject.placeholderDescription"
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
                  name="subject"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>
                        {t(
                          "Dashboard.dialogs.projects.addProject.labelSubject"
                        )}
                      </FormLabel>
                      <FormControl>
                        <DropdownMenu {...field}>
                          <DropdownMenuTrigger asChild>
                            <Button
                              variant="outline"
                              className="flex w-full items-center justify-between"
                            >
                              <p>
                                {subjectName ||
                                  t(
                                    "Dashboard.dialogs.projects.addProject.placeholderSubject"
                                  )}
                              </p>
                              <ChevronDown className="ml-2 size-4 transition-all" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent className="w-56">
                            <DropdownMenuLabel>
                              {" "}
                              {t(
                                "Dashboard.dialogs.projects.addProject.placeholderSubject"
                              )}
                            </DropdownMenuLabel>
                            {subjects?.map(subject => (
                              <DropdownMenuItem
                                key={subject._id}
                                onClick={() => {
                                  form.setValue("subject", subject._id)
                                  setSubjectName(subject.name)
                                }}
                              >
                                {subject.name}
                              </DropdownMenuItem>
                            ))}
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="deadline"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        {t(
                          "Dashboard.dialogs.projects.addProject.labelDeadline"
                        )}
                      </FormLabel>
                      <Popover
                        open={calendarPopoverOpen}
                        onOpenChange={setCalendarPopoverOpen}
                      >
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={"outline"}
                              className={cn(
                                "font-normal w-full pl-3 text-left",
                                !field.value && "text-muted-foreground"
                              )}
                              onKeyDown={() => setCalendarPopoverOpen(true)}
                            >
                              {field.value ? (
                                format(field.value, "PPP")
                              ) : (
                                <span>
                                  {t(
                                    "Dashboard.dialogs.projects.addProject.placeholderDeadline"
                                  )}
                                </span>
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
                            onDayClick={() => setCalendarPopoverOpen(false)}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
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
                {t("Dashboard.dialogs.projects.addProject.submitButton")}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}

export default AddProject
