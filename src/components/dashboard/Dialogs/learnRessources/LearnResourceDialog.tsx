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
import { useForm, useFieldArray } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { api } from "@/convex/_generated/api"

export const AddResource = () => {
  const t = useTranslations()

  const addLearningResourceSchema = z.object({
    subject: z
      .string()
      .min(
        1,
        t("Dashboard.dialogs.learnResources.addResource.errors.emptySubject")
      )
      .min(
        3,
        t("Dashboard.dialogs.learnResources.addResource.errors.minSubjectInput")
      )
      .max(
        20,
        t("Dashboard.dialogs.learnResources.addResource.errors.maxSubjectInput")
      ),
    topic: z
      .string()
      .min(
        1,
        t("Dashboard.dialogs.learnResources.addResource.errors.emptyTopic")
      )
      .min(
        3,
        t("Dashboard.dialogs.learnResources.addResource.errors.minTopicInput")
      )
      .max(
        20,
        t("Dashboard.dialogs.learnResources.addResource.errors.maxTopicInput")
      ),
    questions: z.array(
      z.object({
        question: z
          .string()
          .min(
            1,
            t(
              "Dashboard.dialogs.learnResources.addResource.errors.emptyQuestion"
            )
          )
          .min(
            10,
            t(
              "Dashboard.dialogs.learnResources.addResource.errors.minQuestionInput"
            )
          )
          .max(
            100,
            t(
              "Dashboard.dialogs.learnResources.addResource.errors.maxQuestionInput"
            )
          ),
        answer: z
          .string()
          .min(
            1,
            t("Dashboard.dialogs.learnResources.addResource.errors.emptyAnswer")
          )
          .min(
            5,
            t(
              "Dashboard.dialogs.learnResources.addResource.errors.minAnswerInput"
            )
          )
          .max(
            100,
            t(
              "Dashboard.dialogs.learnResources.addResource.errors.maxAnswerInput"
            )
          ),
      })
    ),
  })

  type AddLearningResourceFormData = z.infer<typeof addLearningResourceSchema>

  const [dialogOpen, setDialogOpen] = useState(false)
  const addLearningResource = useMutation(
    api.learningResources.createLearningResource
  )

  const form = useForm<AddLearningResourceFormData>({
    resolver: zodResolver(addLearningResourceSchema),
    defaultValues: {
      subject: "",
      topic: "",
      questions: [{ question: "", answer: "" }],
    },
  })

  const { fields, append } = useFieldArray({
    control: form.control,
    name: "questions",
  })

  const onSubmit = async (values: AddLearningResourceFormData) => {
    try {
      await addLearningResource({ template: values })
      toast.success(
        t("Dashboard.dialogs.learnResources.addResource.submitSuccessMessage")
      )
      setDialogOpen(false)
      form.reset()
    } catch (error) {
      toast.error(
        t("Dashboard.dialogs.learnResources.addResource.submitErrorMessage")
      )
    }
  }

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DialogTrigger asChild>
        <Button
          className="flex items-center justify-center rounded-full bg-primaryBlue hover:bg-primaryHover"
          data-cy="add-resource-button"
        >
          <Plus className="size-5" />
          <p className="ml-1">
            {t("Dashboard.dialogs.learnResources.buttonName")}
          </p>
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-[95vh] max-w-[95vw] overflow-y-auto rounded-2xl transition-all duration-300 ease-in-out lg:w-1/3">
        <DialogHeader className="text-left">
          <DialogTitle className="text-3xl font-bold">
            {t("Dashboard.dialogs.learnResources.addResource.title")}
          </DialogTitle>
          <DialogDescription>
            {t("Dashboard.dialogs.learnResources.addResource.description")}
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
                name="topic"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      {t(
                        "Dashboard.dialogs.learnResources.addResource.labelTopic"
                      )}
                      <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder={t(
                          "Dashboard.dialogs.learnResources.addResource.placeholderTopic"
                        )}
                        {...field}
                        data-cy="topic-input"
                      />
                    </FormControl>
                    <FormMessage data-cy="topic-error-message" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="subject"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      {t(
                        "Dashboard.dialogs.learnResources.addResource.labelSubject"
                      )}
                      <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder={t(
                          "Dashboard.dialogs.learnResources.addResource.placeholderSubject"
                        )}
                        {...field}
                        data-cy="subject-input"
                      />
                    </FormControl>
                    <FormMessage data-cy="subject-error-message" />
                  </FormItem>
                )}
              />
              {fields.map((field, index) => (
                <div key={field.id} className="grid gap-2">
                  <FormField
                    control={form.control}
                    name={`questions.${index}.question`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          {t(
                            "Dashboard.dialogs.learnResources.addResource.labelQuestion"
                          )}{" "}
                          {index + 1}
                          <span className="text-red-500">*</span>
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder={t(
                              "Dashboard.dialogs.learnResources.addResource.placeholderQuestion"
                            )}
                            {...field}
                            data-cy={`question-input-${index}`}
                          />
                        </FormControl>
                        <FormMessage
                          data-cy={`question-error-message-${index}`}
                        />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={`questions.${index}.answer`}
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            placeholder={t(
                              "Dashboard.dialogs.learnResources.addResource.placeholderAnswer"
                            )}
                            {...field}
                            data-cy={`answer-input-${index}`}
                          />
                        </FormControl>
                        <FormMessage
                          data-cy={`answer-error-message-${index}`}
                        />
                      </FormItem>
                    )}
                  />
                </div>
              ))}
              <Button
                className="mt-1 border border-neutral-500 bg-transparent text-neutral-500 hover:border-neutral-900 hover:bg-transparent hover:text-neutral-900"
                onClick={e => {
                  e.preventDefault()
                  append({ question: "", answer: "" })
                }}
                data-cy="add-question-button"
              >
                {t(
                  "Dashboard.dialogs.learnResources.addResource.addQuestionButton"
                )}
              </Button>
            </div>
            <DialogFooter>
              <Button
                type="submit"
                className="mt-1 w-full bg-primaryBlue hover:bg-primaryHover"
                data-cy="submit-button"
              >
                {t("Dashboard.dialogs.learnResources.addResource.submitButton")}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
