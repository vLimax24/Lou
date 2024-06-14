"use client"

import React, { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Plus } from "lucide-react"
import { useTranslations } from "next-intl"
import { useMutation } from "convex/react"
import { toast } from "sonner"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { api } from "@/convex/_generated/api"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Id } from "@/convex/_generated/dataModel"

export const AddTask = ({ subjectId }: { subjectId?: Id<"subjects"> }) => {
  const t = useTranslations()

  const formSchema = z.object({
    text: z
      .string()
      .min(1, t("Dashboard.dialogs.tasks.addTask.errors.emptyText"))
      .min(3, t("Dashboard.dialogs.tasks.addTask.errors.minTextInput"))
      .max(50, t("Dashboard.dialogs.tasks.addTask.errors.maxTextInput")),
    status: z.enum(["PENDING", "IN-PROGRESS", "COMPLETED"]).default("PENDING"),
  })

  const addTask = useMutation(api.tasks.addTask)
  const [dialogOpen, setDialogOpen] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      text: "",
      status: "PENDING",
    },
  })

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await addTask({
        status: values.status,
        text: values.text,
        subjectId: subjectId && subjectId,
      })
      toast.success(t("Dashboard.dialogs.tasks.addTask.submitSuccessMessage"))
      setDialogOpen(false)
      form.reset()
    } catch (error) {
      toast.error(t("Dashboard.dialogs.tasks.addTask.submitErrorMessage"))
    }
  }

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DialogTrigger asChild>
        <Button
          className="flex items-center justify-center rounded-full bg-primaryBlue hover:bg-primaryHover"
          data-cy="add-task-button"
        >
          <Plus className="size-5" />
          <p className="ml-1">{t("Dashboard.dialogs.tasks.buttonName")}</p>
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-[95vh] max-w-[95vw] overflow-y-auto rounded-2xl transition-all duration-300 ease-in-out lg:w-1/3">
        <DialogHeader className="text-left">
          <DialogTitle className="text-3xl font-bold">
            {t("Dashboard.dialogs.tasks.addTask.title")}
          </DialogTitle>
          <DialogDescription>
            {t("Dashboard.dialogs.tasks.addTask.description")}
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col"
          >
            <div className="mt-4 grid grid-cols-1 gap-4">
              <FormField
                control={form.control}
                name="text"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      {t("Dashboard.dialogs.tasks.addTask.labelText")}
                      <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder={t(
                          "Dashboard.dialogs.tasks.addTask.placeholderText"
                        )}
                        {...field}
                        data-cy="task-text-input"
                      />
                    </FormControl>
                    <FormMessage data-cy="task-text-error-message" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem className="mb-5">
                    <FormLabel>
                      {t("Dashboard.dialogs.tasks.addTask.labelStatus")}
                    </FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue
                            placeholder={t(
                              "Dashboard.dialogs.tasks.addTask.placeholderStatus"
                            )}
                          />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectLabel>
                              {t("Dashboard.dialogs.tasks.addTask.labelStatus")}
                            </SelectLabel>
                            <SelectItem value="PENDING">
                              {t("Dashboard.dialogs.tasks.addTask.status.todo")}
                            </SelectItem>
                            <SelectItem value="IN-PROGRESS">
                              {t(
                                "Dashboard.dialogs.tasks.addTask.status.progress"
                              )}
                            </SelectItem>
                            <SelectItem value="COMPLETED">
                              {t(
                                "Dashboard.dialogs.tasks.addTask.status.completed"
                              )}
                            </SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage data-cy="task-status-error-message" />
                  </FormItem>
                )}
              />
            </div>
            <DialogFooter>
              <Button
                type="submit"
                className="mt-1 w-full bg-primaryBlue hover:bg-primaryHover"
                data-cy="submit-button"
              >
                {t("Dashboard.dialogs.tasks.addTask.submitButton")}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
