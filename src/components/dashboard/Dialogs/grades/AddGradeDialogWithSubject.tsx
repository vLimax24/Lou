"use client"

import { useState, useEffect } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useTranslations } from "next-intl"
import { useMutation, useQuery } from "convex/react"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { format } from "date-fns"
import { Plus, X, CalendarIcon } from "lucide-react"
import { cn } from "@/lib/utils"
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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Badge } from "@/components/ui/badge"
import { api } from "@/convex/_generated/api"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  convertLetterToGPA,
  convertNumberToGPA,
  convertPercentageToGPA,
} from "@/utils/gpaCalculation"
import { Id } from "@/convex/_generated/dataModel"

type Props = {
  withSubjects?: boolean
  subjectId?: Id<"subjects">
}

const badgeColors = [
  "#FFB6C1",
  "#87CEFA",
  "#90EE90",
  "#FFD700",
  "#FF69B4",
  "#8A2BE2",
  "#FF4500",
  "#2E8B57",
  "#DAA520",
  "#5F9EA0",
]

const shuffleArray = (array: any) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[array[i], array[j]] = [array[j], array[i]]
  }
  return array
}

export const AddGradeDialogWithSubject = ({
  withSubjects = false,
  subjectId,
}: Props) => {
  const t = useTranslations()

  const formSchema = z.object({
    topic: z
      .string()
      .min(1, t("Dashboard.dialogs.grades.addGrade.errors.emptyTopic"))
      .min(3, t("Dashboard.dialogs.grades.addGrade.errors.minTopicInput"))
      .max(30, t("Dashboard.dialogs.grades.addGrade.errors.maxTopicInput")),
    grade: z
      .string()
      .min(1, t("Dashboard.dialogs.grades.addGrade.errors.emptyGrade")),
    date: z.date(),
    subjectId: z.any(),
    badges: z
      .array(z.string())
      .max(3, t("Dashboard.dialogs.grades.addGrade.errors.badgeLimit")),
  })

  type FormData = z.infer<typeof formSchema>

  const addGrade = useMutation(api.grades.addGrade)
  const subjects = useQuery(api.studentSubjects.getUserSubjects)
  const user: any = useQuery(api.users.getMyUser)
  const country: any = useQuery(api.countries.getSpecificCountry, {
    countryId: user?.country,
  })

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      topic: "",
      grade: "",
      date: new Date(),
      subjectId: subjectId || "",
      badges: [],
    },
  })

  const [dialogOpen, setDialogOpen] = useState(false)
  const [calendarPopoverOpen, setCalendarPopoverOpen] = useState(false)
  const [badgeInput, setBadgeInput] = useState("")
  const [shuffledBadgeColors, setShuffledBadgeColors] = useState([])

  useEffect(() => {
    setShuffledBadgeColors(shuffleArray([...badgeColors]))
  }, [])

  const handleAddBadge = () => {
    const trimmedBadge = badgeInput.trim()
    if (trimmedBadge.length >= 3 && trimmedBadge.length <= 7) {
      if (form.getValues().badges.length < 10) {
        form.setValue("badges", [...form.getValues().badges, trimmedBadge])
        setBadgeInput("")
      } else {
        toast.error(t("Dashboard.dialogs.grades.addGrade.badgeLimitError"))
      }
    } else if (trimmedBadge.length < 3) {
      toast.error(t("Dashboard.dialogs.grades.addGrade.badgeMinLengthError"))
    } else if (trimmedBadge.length > 7) {
      toast.error(t("Dashboard.dialogs.grades.addGrade.badgeMaxLengthError"))
    }
  }

  const handleBadgeInputKeyPress = (e: any) => {
    if (e.key === "Enter") {
      e.preventDefault()
      handleAddBadge()
    }
  }

  const onSubmit = async (values: FormData) => {
    const formattedDate = values.date.toISOString()
    const baseGPA = 4
    const gpaIncrement = baseGPA / (country?.possibleGrades.length - 1)
    const gradingSystem = country?.system
    let gpa: any
    if (gradingSystem === "Number") {
      gpa = convertNumberToGPA(Number(values.grade), baseGPA, gpaIncrement)
    } else if (gradingSystem === "Letter") {
      gpa = convertLetterToGPA(values.grade, baseGPA, gpaIncrement)
    } else if (gradingSystem === "Percentage") {
      gpa = convertPercentageToGPA(Number(values.grade))
    }

    const selectedSubject = subjects?.find(
      subject => subject._id === values.subjectId
    )
    const subjectName = selectedSubject ? selectedSubject.name : ""

    try {
      await addGrade({
        topic: values.topic,
        date: formattedDate,
        subjectId: values.subjectId,
        grade: gpa.toString(),
        badges: values.badges,
        subjectName: subjectName,
      })
      toast.success(t("Dashboard.dialogs.grades.addGrade.submitSuccessMessage"))
      setDialogOpen(false)
      form.reset()
    } catch (error) {
      toast.error(t("Dashboard.dialogs.grades.addGrade.submitErrorMessage"))
    }
  }

  const removeBadge = (index: number) => {
    const currentBadges = form.getValues().badges
    currentBadges.splice(index, 1)
    form.setValue("badges", currentBadges)
  }

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DialogTrigger asChild>
        <Button
          className="flex items-center justify-center rounded-full bg-primaryBlue hover:bg-primaryHover"
          data-cy="add-grade-button"
        >
          <Plus className="size-5" />
          <p className="ml-1">{t("Dashboard.dialogs.grades.buttonName")}</p>
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-[95vh] max-w-[95vw] overflow-y-auto rounded-2xl transition-all duration-300 ease-in-out lg:w-1/3">
        <DialogHeader className="text-left">
          <DialogTitle className="font-bold">
            {t("Dashboard.dialogs.grades.addGrade.title")}
          </DialogTitle>
          <DialogDescription>
            {t("Dashboard.dialogs.grades.addGrade.description")}
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
                      {t("Dashboard.dialogs.grades.addGrade.labelTopic")}
                      <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder={t(
                          "Dashboard.dialogs.grades.addGrade.placeholderTopic"
                        )}
                        {...field}
                        data-cy="grade-topic-input"
                      />
                    </FormControl>
                    <FormMessage data-cy="grade-topic-error-message" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="date"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>
                      {t("Dashboard.dialogs.grades.addGrade.labelDate")}
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
                            onKeyDown={() => {
                              setCalendarPopoverOpen(true)
                            }}
                          >
                            {field.value ? (
                              format(field.value, "PPP")
                            ) : (
                              <span>Pick a date</span>
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
                          onDayClick={() => {
                            setCalendarPopoverOpen(false)
                          }}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="grade"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      {t("Dashboard.dialogs.grades.addGrade.labelGrade")}
                      <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue
                            placeholder={t(
                              "Dashboard.dialogs.grades.addGrade.placeholderGrade"
                            )}
                          />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectLabel>
                              {t(
                                "Dashboard.dialogs.grades.addGrade.labelGrade"
                              )}
                            </SelectLabel>
                            {country?.possibleGrades.map((grade: string) => (
                              <SelectItem key={grade} value={grade}>
                                {grade}
                              </SelectItem>
                            ))}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage data-cy="grade-grade-error-message" />
                  </FormItem>
                )}
              />
              {withSubjects && (
                <FormField
                  control={form.control}
                  name="subjectId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        {t("Dashboard.dialogs.grades.addGrade.labelSubject")}
                        <span className="text-red-500">*</span>
                      </FormLabel>
                      <FormControl>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                        >
                          <SelectTrigger className="w-full">
                            <SelectValue
                              placeholder={t(
                                "Dashboard.dialogs.grades.addGrade.placeholderSubject"
                              )}
                            />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              <SelectLabel>
                                {t(
                                  "Dashboard.dialogs.grades.addGrade.labelSubject"
                                )}
                              </SelectLabel>
                              {subjects?.map(subject => (
                                <SelectItem
                                  key={subject._id}
                                  value={subject._id}
                                >
                                  {subject.name}
                                </SelectItem>
                              ))}
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage data-cy="grade-subject-error-message" />
                    </FormItem>
                  )}
                />
              )}
              <FormField
                control={form.control}
                name="badges"
                render={() => (
                  <FormItem>
                    <FormLabel>
                      {t("Dashboard.dialogs.grades.addGrade.labelBadges")}
                    </FormLabel>
                    <div className="flex items-center space-x-2">
                      <Input
                        value={badgeInput}
                        onChange={e => setBadgeInput(e.target.value)}
                        onKeyDown={handleBadgeInputKeyPress}
                        placeholder={t(
                          "Dashboard.dialogs.grades.addGrade.placeholderBadges"
                        )}
                      />
                      <Button
                        type="button"
                        className="border border-primaryBlue bg-transparent text-primaryBlue hover:bg-primaryBlue hover:text-white"
                        onClick={handleAddBadge}
                      >
                        {t("Dashboard.dialogs.grades.addGrade.addButton")}
                      </Button>
                    </div>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {form.getValues().badges.map((badge, index) => (
                        <Badge
                          key={index}
                          variant="outline"
                          className="flex items-center justify-center space-x-2 border-none"
                          style={{
                            backgroundColor:
                              shuffledBadgeColors[
                                index % shuffledBadgeColors.length
                              ],
                          }}
                        >
                          {badge}
                          <X
                            size={12}
                            className="ml-1 cursor-pointer"
                            onClick={() => removeBadge(index)}
                          />
                        </Badge>
                      ))}
                    </div>
                    <FormMessage data-cy="grade-badges-error-message" />
                  </FormItem>
                )}
              />
            </div>
            <DialogFooter className="mt-4 flex items-center justify-end space-x-4">
              <Button
                type="submit"
                className="w-full bg-primaryBlue hover:bg-primaryHover"
                data-cy="submit-grade-button"
              >
                {t("Dashboard.dialogs.grades.addGrade.submitButton")}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
