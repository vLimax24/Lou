"use client"

import React from "react"
import { DataTable } from "@/components/dashboard/GradeSheet/Datatable"
import { AddGradeDialogWithSubject } from "@/components/dashboard/Dialogs/grades/AddGradeDialogWithSubject"

const page = () => {
  return (
    <div className='flex flex-col p-5'>
      <div className="flex items-center justify-between mb-6">
        <h1 className='text-4xl font-bold'>Your Grades</h1>
        {/* When Add Grade Dialog is added and you click on it, the site completelly freezes because of the datatable */}
        <AddGradeDialogWithSubject />
      </div>
      <DataTable />
    </div>
  )
}

export default page