"use client"

import { useState } from "react"
import { Skeleton } from "@/components/ui/skeleton"
import { api } from "@/convex/_generated/api"
import { useQuery } from "convex/react"
import { AddLearnResourceSheet } from "@/components/dashboard/Dialogs/learnRessources/AddLearningResourceSheet"
import { useTranslations } from "next-intl"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { ChevronLeft, ChevronRight } from "lucide-react"

const Flashcard = ({ questions }: { questions: any[] }) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [showAnswer, setShowAnswer] = useState(false)

  const handleNext = () => {
    setShowAnswer(false)
    setTimeout(() => {
      setCurrentIndex(prevIndex => (prevIndex + 1) % questions.length)
    }, 300)
  }

  const handlePrevious = () => {
    setShowAnswer(false)
    setTimeout(() => {
      setCurrentIndex(
        prevIndex => (prevIndex - 1 + questions.length) % questions.length
      )
    }, 300)
  }

  const toggleAnswer = () => {
    if (showAnswer) {
      handleNext()
    } else {
      setShowAnswer(true)
    }
  }

  return (
    <div className="flex h-full w-full flex-col items-center justify-center">
      <div className="flip-card mb-4 h-3/4 w-3/4" onClick={toggleAnswer}>
        <div className={`flip-card-inner ${showAnswer ? "rotate-y-180" : ""}`}>
          <div className="flip-card-front flex items-center justify-center">
            <div className="p-4 text-xl">
              {questions[currentIndex].question}
            </div>
          </div>
          <div className="flip-card-back flex items-center justify-center">
            <div className="p-4 text-xl">{questions[currentIndex].answer}</div>
          </div>
        </div>
      </div>
      <div className="flex w-full items-center justify-center gap-5">
        <button
          onClick={handlePrevious}
          className="rounded-full border border-primaryBlue p-3 text-primaryBlue"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>
        <div className="flex items-center justify-center text-lg">
          {`${currentIndex + 1} / ${questions.length}`}
        </div>
        <button
          onClick={handleNext}
          className="rounded-full border border-primaryBlue p-3 text-primaryBlue"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  )
}

const LearnRessources = () => {
  const t = useTranslations()

  const learnResources = useQuery(api.learningResources.getLearningResources)

  return (
    <>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-4xl font-bold">
          {t("Dashboard.learningRessources.title")}
        </h1>
        <div className="flex items-center">
          <AddLearnResourceSheet />
        </div>
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {learnResources?.map(resource => {
          const template = resource.template
          return (
            <Dialog key={resource._id}>
              <DialogTrigger>
                <div className="aspect-[16/7] w-full rounded-2xl bg-neutral-300 p-5 transition-all duration-200 ease-in-out hover:scale-[1.03] hover:cursor-pointer">
                  <h1 className="text-left text-[1.5rem] font-bold md:text-[1.7rem] lg:text-[2rem]">
                    {template.topic}
                  </h1>
                </div>
              </DialogTrigger>
              <DialogContent className="flex h-3/5 max-h-full w-[95%] max-w-full flex-col rounded-2xl md:w-4/5 lg:w-1/2">
                <h1 className="text-left text-[2rem] font-bold">
                  {template.topic}
                </h1>
                <Flashcard questions={template.questions} />
              </DialogContent>
            </Dialog>
          )
        })}
      </div>
    </>
  )
}

export default LearnRessources
