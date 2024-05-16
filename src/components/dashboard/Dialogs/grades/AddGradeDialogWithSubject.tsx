import { Button, buttonVariants } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Form, FormControl, FormField, FormItem,FormLabel, FormMessage } from "@/components/ui/form"
import { Select, SelectContent, SelectGroup,SelectItem, SelectLabel,SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Input } from "@/components/ui/input"
import { api } from "@/convex/_generated/api"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { z } from "zod"
import { useMutation, useQuery } from "convex/react"
import { convertLetterToGPA, convertNumberToGPA, convertPercentageToGPA } from "@/utils/gpaCalculation"
import { Id } from "@/convex/_generated/dataModel"
import { X } from "lucide-react"

const formSchema = z.object({
  topic: z.string().min(2).max(50),
  grade: z.string(),
  date: z.date(),
  subjectId: z.any(),
  badges: z.array(z.string()).min(3).max(10),
})

type FormData = z.infer<typeof formSchema>;

type Props = {
  withSubjects?: boolean;
  subjectId?: Id<"subjects">;
};

export const AddGradeDialogWithSubject = ({
  withSubjects = false,
  subjectId,
}: Props) => {
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

  const [badgeInput, setBadgeInput] = useState("")

  const handleAddBadge = () => {
    if (badgeInput.trim().length >= 3 && form.getValues().badges.length < 3) {
      form.setValue("badges", [...form.getValues().badges, badgeInput.trim()])
      setBadgeInput("")
    } else if (badgeInput.trim().length < 3) {
      toast.error("Badge name must be at least 3 characters long.")
    } else {
      toast.error("You can only add 3 badges. Please remove some badges before adding more.")
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
    try {
      await addGrade({
        topic: values.topic,
        date: formattedDate,
        subjectId: values.subjectId,
        grade: gpa.toString(),
        badges: values.badges
      })
      toast.success(`Grade ${values.grade} added!`)
      form.reset()
    } catch (error) {
      toast.error("Error Adding Grade!")
    }
  }

  const removeBadge = (index: number) => {
    const currentBadges = form.getValues().badges
    currentBadges.splice(index, 1)
    form.setValue("badges", currentBadges)
  }

  return (
    <Dialog>
      <DialogTrigger className={buttonVariants({ variant: "outline" })}>
        Add Grade
      </DialogTrigger>
      <DialogContent className="transition-all duration-300 ease-in-out sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Grade</DialogTitle>
          <DialogDescription>Add a new grade for yourself.</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-1 items-center gap-4">
                <FormField
                  control={form.control}
                  name="topic"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Topic</FormLabel>
                      <FormControl>
                        <Input placeholder="Trigonometry " {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="date"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Date</FormLabel>
                      <FormControl>
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          className="flex items-center justify-center rounded-md border"
                          // {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="grade"
                  disabled={!user}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Grade</FormLabel>
                      <FormControl>
                        <div className="flex items-center justify-between">
                          <Select
                            onValueChange={field.onChange}
                            value={field.value}
                          >
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Select a grade" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectGroup>
                                <SelectLabel>Grades</SelectLabel>
                                {country?.possibleGrades.map(
                                  (grade: string) => (
                                    <SelectItem key={grade} value={grade}>
                                      {grade}
                                    </SelectItem>
                                  )
                                )}
                              </SelectGroup>
                            </SelectContent>
                          </Select>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {withSubjects && !subjectId && (
                  <FormField
                    control={form.control}
                    name="subjectId"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Subject</FormLabel>
                        <FormControl>
                          <div className="flex items-center justify-between">
                            <Select
                              onValueChange={field.onChange}
                              value={field.value}
                            >
                              <SelectTrigger className="w-full">
                                <SelectValue placeholder="Select a subject" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectGroup>
                                  <SelectLabel>Subject</SelectLabel>
                                  {subjects?.map(subject => (
                                    <SelectItem
                                      key={subject?._id}
                                      value={subject?._id}
                                    >
                                      {subject.name}
                                    </SelectItem>
                                  ))}
                                </SelectGroup>
                              </SelectContent>
                            </Select>
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}

               <FormField
                  control={form.control}
                  name="badges"
                  render={() => (
                    <FormItem>
                      <FormLabel>Badges</FormLabel>
                      <FormControl>
                        <div className="flex items-center justify-between">
                          <Input
                            type="text"
                            placeholder="Type a badge"
                            value={badgeInput}
                            onChange={(e) => setBadgeInput(e.target.value)}
                            onKeyDown={handleBadgeInputKeyPress}
                          />
                          <Button type="button" onClick={handleAddBadge} className="bg-primaryGray hover:bg-primaryHoverGray ml-2"> 
                            Add
                          </Button>
                        </div>
                      </FormControl>
                      <div className="flex items-center">
                        {form.getValues().badges.map((badge, index) => (
                          <Badge key={index} className="flex items-center w-fit group transition-all duration-200 ease-in-out mr-1">
                            <p>{badge}</p>
                            <X
                              size={16}
                              className="ml-2 cursor-pointer text-gray-300 hidden group-hover:block transition-all duration-200 ease-in-out"
                              onClick={() => removeBadge(index)}
                            />
                          </Badge>
                        ))}
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit" className="bg-primaryGray hover:bg-primaryHoverGray">Add Subject</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}