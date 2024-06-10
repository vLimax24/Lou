"use client"

import { Skeleton } from "@/components/ui/skeleton"
import { api } from "@/convex/_generated/api"
import { useQuery } from "convex/react"
import { AddLearnResourceSheet } from "@/components/dashboard/Dialogs/learnRessources/AddLearningResourceSheet"
import { useTranslations } from "next-intl"

const LearnRessources = () => {
  const t = useTranslations()
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
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"></div>
    </>
  )
}

export default LearnRessources
