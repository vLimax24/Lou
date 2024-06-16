"use client"

import React from "react"
import { DataTable } from "@/components/dashboard/GradeSheet/Datatable"
import { AddGrade } from "@/components/dashboard/Dialogs/grades/GradeDialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import ProgressSection from "./_components/ProgressSection"
import { useTranslations } from "next-intl"

const Page = () => {
  const t = useTranslations()
  return (
    <div className="flex flex-col p-5">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-4xl font-bold">{t("Dashboard.grades.title")}</h1>
        <AddGrade withSubjects />
      </div>
      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="w-full lg:w-[500px]">
          <TabsTrigger value="overview" className="w-1/2">
            {t("Dashboard.grades.tabs.progress")}
          </TabsTrigger>
          <TabsTrigger value="statistics" className="w-1/2">
            {t("Dashboard.grades.tabs.statistics")}
          </TabsTrigger>
        </TabsList>
        <TabsContent value="overview">
          <DataTable />
        </TabsContent>
        <TabsContent value="statistics">
          <ProgressSection />
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default Page
