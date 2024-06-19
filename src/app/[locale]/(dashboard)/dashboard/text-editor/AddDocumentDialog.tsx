import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { useState } from "react"
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
import { useMutation } from "convex/react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { z } from "zod"
import { useTranslations } from "next-intl"
import { Plus } from "lucide-react"

export const AddDocumentDialog = ({
  accessType,
  className,
}: {
  accessType: string
  className?: string
}) => {
  const [dialogOpen, setDialogOpen] = useState(false)

  const addDocument = useMutation(api.documents.addDocument)

  const t = useTranslations()

  const formSchema = z.object({
    name: z
      .string()
      .min(1, t("Dashboard.dialogs.documents.addDocument.errors.emptyName"))
      .min(3, t("Dashboard.dialogs.documents.addDocument.errors.minNameInput"))
      .max(
        50,
        t("Dashboard.dialogs.documents.addDocument.errors.maxNameInput")
      ),
  })

  type FormData = z.infer<typeof formSchema>

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  })

  const initialContent = {
    content: [{ type: "paragraph" }, { type: "paragraph" }],
    type: "doc",
  }

  const onSubmit = async (values: FormData) => {
    try {
      await addDocument({
        name: values.name,
        content: initialContent,
        accessType: accessType,
      })
      toast.success("Document added!")
      setDialogOpen(false)
      form.reset()
    } catch (error) {
      toast.error("Error Adding Document!")
    }
  }

  return (
    <div className={className}>
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogTrigger asChild>
          <Button
            className="flex items-center justify-center rounded-full bg-primaryBlue hover:bg-primaryHover"
            data-cy="add-note-button"
          >
            <Plus className="size-5" />
            <p className="ml-1">
              {t("Dashboard.dialogs.documents.addDocument.buttonName")}
            </p>
          </Button>
        </DialogTrigger>
        <DialogContent className="max-h-[95vh] max-w-[95vw] overflow-y-auto rounded-2xl transition-all duration-300 ease-in-out lg:w-1/4">
          <DialogHeader className="text-left">
            <DialogTitle>
              {t("Dashboard.dialogs.documents.addDocument.title")}
            </DialogTitle>
            <DialogDescription>
              {t("Dashboard.dialogs.documents.addDocument.description")}
            </DialogDescription>
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
                        <FormLabel>
                          {t(
                            "Dashboard.dialogs.documents.addDocument.labelName"
                          )}
                          <span className="ml-0.5 text-red-500">*</span>
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder={t(
                              "Dashboard.dialogs.documents.addDocument.placeholderName"
                            )}
                            {...field}
                          />
                        </FormControl>
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
                  {t("Dashboard.dialogs.documents.addDocument.submitButton")}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  )
}
