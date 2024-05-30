"use client"

import React from "react"
import { DataTable } from "@/components/dashboard/GradeSheet/Datatable"
import { AddGradeDialogWithSubject } from "@/components/dashboard/Dialogs/grades/AddGradeDialogWithSubject"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import ProgressSection from "./_components/ProgressSection"


const Page = () => {
  return (
    <div className='flex flex-col p-5'>
      <div className="flex items-center justify-between mb-6">
        <h1 className='text-4xl font-bold'>Your Grades</h1>
        <AddGradeDialogWithSubject withSubjects/>
      </div>
      <Tabs defaultValue="overview" className="w-full">
        <TabsList>
          <TabsTrigger value="overview">Progress</TabsTrigger>
          <TabsTrigger value="statistics">Statistics</TabsTrigger>
        </TabsList>
        <TabsContent value="overview"><DataTable /></TabsContent>
        <TabsContent value="statistics"><ProgressSection /></TabsContent>
      </Tabs>
      
    </div>
  )
}

export default Page