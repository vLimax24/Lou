import React, { useState } from "react"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useTranslations } from "next-intl"
import { api } from "@/convex/_generated/api"
import { useMutation } from "convex/react"
import { toast } from "sonner"

interface Question {
  question: string
  answer: string
}

export const AddLearnResourceSheet = () => {
  const [subject, setSubject] = useState("")
  const [topic, setTopic] = useState("")
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [questions, setQuestions] = useState<Question[]>([
    { question: "", answer: "" },
  ])

  const addLearningResource = useMutation(
    api.learningResources.createLearningResource
  )

  const t = useTranslations()

  const handleAddQuestion = () => {
    setQuestions([...questions, { question: "", answer: "" }])
  }

  const handleQuestionChange = (
    index: number,
    field: keyof Question,
    value: string
  ) => {
    const newQuestions: any = [...questions]
    newQuestions[index][field] = value
    setQuestions(newQuestions)
  }

  const learnTemplate: any = {
    subject: subject,
    topic: topic,
    questions: questions.map(q => ({ answer: q.answer, question: q.question })),
  }

  return (
    <div className="w-full">
      <Sheet
        open={sidebarOpen}
        onOpenChange={() => setSidebarOpen(!sidebarOpen)}
      >
        <SheetTrigger className="flex items-center whitespace-nowrap rounded-md border border-neutral-500 bg-transparent px-4 py-2 text-neutral-500 transition-all duration-300 ease-in-out hover:border-neutral-900 hover:text-neutral-900">
          <p>Add</p>
        </SheetTrigger>
        <SheetContent className="w-1/3 overflow-scroll pl-8 sm:max-w-full">
          <SheetHeader>
            <SheetTitle className="mt-7 text-3xl font-bold">
              {t("Dashboard.learningRessources.creationSheet.title")}
            </SheetTitle>
          </SheetHeader>
          <div className="mt-4 grid grid-cols-1 gap-4">
            <div className="flex flex-col items-start justify-between">
              <Label htmlFor="subject" className="text-md mb-1 flex">
                {t("Dashboard.learningRessources.creationSheet.topic.label")}
                <p className="text-red-500">*</p>
              </Label>
              <Input
                id="subject"
                type="text"
                placeholder={t(
                  "Dashboard.learningRessources.creationSheet.topic.placeholder"
                )}
                required
                value={topic}
                onChange={e => setTopic(e.target.value)}
              />
            </div>
            <div className="flex flex-col items-start justify-between">
              <Label htmlFor="subject" className="text-md mb-1 flex">
                {t("Dashboard.learningRessources.creationSheet.subject.label")}
                <p className="text-red-500">*</p>
              </Label>
              <Input
                id="subject"
                type="text"
                placeholder={t(
                  "Dashboard.learningRessources.creationSheet.subject.placeholder"
                )}
                required
                value={subject}
                onChange={e => setSubject(e.target.value)}
              />
            </div>
            {questions.map((q, index) => (
              <div key={index}>
                <Label
                  htmlFor={`question-${index}`}
                  className="text-md mb-1 flex"
                >
                  {t(
                    "Dashboard.learningRessources.creationSheet.question.label"
                  )}{" "}
                  {index + 1}
                  <p className="text-red-500">*</p>
                </Label>
                <Input
                  id={`question-${index}`}
                  type="text"
                  placeholder={t(
                    "Dashboard.learningRessources.creationSheet.question.placeholderQuestion"
                  )}
                  required
                  value={q.question}
                  onChange={e =>
                    handleQuestionChange(index, "question", e.target.value)
                  }
                />
                <Input
                  id={`answer-${index}`}
                  type="text"
                  placeholder={t(
                    "Dashboard.learningRessources.creationSheet.question.placeholderAnswer"
                  )}
                  required
                  value={q.answer}
                  onChange={e =>
                    handleQuestionChange(index, "answer", e.target.value)
                  }
                  className="mt-2"
                />
              </div>
            ))}
            <Button className="mt-4" onClick={handleAddQuestion}>
              Add Another Question
            </Button>
          </div>
          <div className="mt-4 flex w-full items-center justify-end">
            <Button
              className="bg-primaryGray hover:bg-primaryHoverGray"
              onClick={async () => {
                try {
                  await addLearningResource({ template: learnTemplate })
                  toast.success("Learning Resource added!")
                  setSidebarOpen(false)
                } catch (error) {
                  toast.error("Error Adding Learning Resource")
                }
              }}
            >
              Create Project
            </Button>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  )
}
