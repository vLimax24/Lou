import { Button, buttonVariants } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
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
import { useAction, useMutation, useQuery } from "convex/react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { z } from "zod"
import { Pencil, Plus } from "lucide-react"
import { useState } from "react"
import Image from "next/image"
import { cn } from "@/lib/utils"
import { Id } from "@/convex/_generated/dataModel"
import { useTranslations } from "next-intl"

import ChemistryTemplate from "../../../../../public/templates/chemistry_template.svg"
import BiologyTemplate from "../../../../../public/templates/biology_template.svg"
import PhysicsTemplate from "../../../../../public/templates/physics_template.svg"
import HistoryTemplate from "../../../../../public/templates/history_tempalte.svg"
import CSTemplate from "../../../../../public/templates/cs_template.svg"
import EnglishTemplate from "../../../../../public/templates/english_template.svg"
import GermanTemplate from "../../../../../public/templates/german_template.svg"
import MathsTemplate from "../../../../../public/templates/maths_template.svg"
import SpanishTemplate from "../../../../../public/templates/spanish_template.svg"
import FrenchTemplate from "../../../../../public/templates/french_template.svg"
import ItalianTemplate from "../../../../../public/templates/italian_template.svg"
import RussianTemplate from "../../../../../public/templates/russian_template.svg"
import LatinTemplate from "../../../../../public/templates/latin_template.svg"

const templates = [
  { name: "chemistry", url: ChemistryTemplate },
  { name: "biology", url: BiologyTemplate },
  { name: "physics", url: PhysicsTemplate },
  { name: "history", url: HistoryTemplate },
  { name: "cs", url: CSTemplate },
  { name: "english", url: EnglishTemplate },
  { name: "german", url: GermanTemplate },
  { name: "maths", url: MathsTemplate },
  { name: "spanish", url: SpanishTemplate },
  { name: "french", url: FrenchTemplate },
  { name: "italian", url: ItalianTemplate },
  { name: "russian", url: RussianTemplate },
  { name: "latin", url: LatinTemplate },
]

export const AddSubject = () => {
  const addSubject = useAction(api.users.addUserSubjectAction)
  const [dialogOpen, setDialogOpen] = useState(false)
  const t = useTranslations()

  const addSubjectFormSchema = z.object({
    name: z
      .string()
      .min(2, t("Dashboard.dialogs.subjects.addSubject.errors.minNameInput"))
      .max(15, t("Dashboard.dialogs.subjects.addSubject.errors.maxNameInput")),
    template: z
      .string()
      .min(
        2,
        t("Dashboard.dialogs.subjects.addSubject.errors.noTemplateSelected")
      ),
  })

  type AddSubjectFormData = z.infer<typeof addSubjectFormSchema>

  const form = useForm<AddSubjectFormData>({
    resolver: zodResolver(addSubjectFormSchema),
    defaultValues: {
      name: "",
      template: "",
    },
  })

  const onSubmit = async (values: AddSubjectFormData) => {
    try {
      console.log(values)
      await addSubject({
        name: values.name,
        template: values.template,
      })

      toast.success(
        t("Dashboard.dialogs.subjects.addSubject.submitSuccessMessage")
      )
      form.reset()
      setDialogOpen(false)
    } catch (error) {
      toast.error(t("Dashboard.dialogs.subjects.addSubject.submitErrorMessage"))
    }
  }

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DialogTrigger asChild>
        <Button
          className="flex items-center justify-center rounded-full bg-primaryBlue hover:bg-primaryHover"
          data-cy="add-note-button"
        >
          <Plus className="size-5" />
          <p className="ml-1">
            {t("Dashboard.dialogs.subjects.addSubject.buttonName")}
          </p>
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-[95vh] max-w-[95vw] overflow-y-auto rounded-2xl transition-all duration-300 ease-in-out lg:w-1/4">
        <DialogHeader className="text-left">
          <DialogTitle>
            {t("Dashboard.dialogs.subjects.addSubject.title")}
          </DialogTitle>
          <DialogDescription>
            {t("Dashboard.dialogs.subjects.addSubject.description")}
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="grid gap-4 py-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      {t("Dashboard.dialogs.subjects.addSubject.labelName")}
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder={t(
                          "Dashboard.dialogs.subjects.addSubject.placeholderName"
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
                name="template"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      {t("Dashboard.dialogs.subjects.addSubject.labelTemplate")}
                    </FormLabel>
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
                              alt="template"
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
            <DialogFooter>
              <Button
                type="submit"
                className="w-full bg-primaryBlue hover:bg-primaryHover"
              >
                {t("Dashboard.dialogs.subjects.addSubject.submitButton")}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}

type EditProps = {
  name: string
  id: Id<"subjects">
}

export const EditSubject = ({ name, id }: EditProps) => {
  const editSubject = useAction(api.users.editUserSubjectAction)
  const [dialogOpen, setDialogOpen] = useState(false)
  const t = useTranslations()

  const editSubjectFormSchema = z.object({
    name: z.string().min(2).max(50),
  })

  type EditSubjectFormData = z.infer<typeof editSubjectFormSchema>

  const form = useForm<EditSubjectFormData>({
    resolver: zodResolver(editSubjectFormSchema),
    defaultValues: {
      name: name,
    },
  })

  const onSubmit = async (values: EditSubjectFormData) => {
    try {
      await editSubject({
        name: values.name,
        subjectId: id,
      })

      toast.success(
        t("Dashboard.dialogs.subjects.editSubject.submitSuccessMessage")
      )
      form.reset()
      setDialogOpen(false)
    } catch (error) {
      toast.error(
        t("Dashboard.dialogs.subjects.editSubject.submitErrorMessage")
      )
    }
  }

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DialogTrigger asChild>
        <Pencil
          size={20}
          className="duration-300 hover:cursor-pointer hover:text-green-500"
        />
      </DialogTrigger>
      <DialogContent className="max-h-[95vh] max-w-[95vw] overflow-y-auto rounded-2xl transition-all duration-300 ease-in-out lg:w-1/4">
        <DialogHeader>
          <DialogTitle>
            {t("Dashboard.dialogs.subjects.editSubject.title")}
          </DialogTitle>
          <DialogDescription>
            {t("Dashboard.dialogs.subjects.editSubject.description")}
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="grid gap-4 py-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      {t("Dashboard.dialogs.subjects.editSubject.nameLabel")}
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder={t(
                          "Dashboard.dialogs.subjects.editSubject.namePlaceholder"
                        )}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button
                  type="submit"
                  className="w-full bg-primaryBlue hover:bg-primaryHover"
                >
                  {t("Dashboard.dialogs.subjects.editSubject.submitButton")}
                </Button>
              </DialogClose>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
