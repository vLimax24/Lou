"use client"

import SubjectCard from "@/components/containers/subject-card"
import { AddSubjectDialog } from "@/components/dashboard/Dialogs/subjects/AddSubjectDialog"
import { Skeleton } from "@/components/ui/skeleton"
import { api } from "@/convex/_generated/api"
import { useQuery } from "convex/react"

function Subjects() {
  const subjects = useQuery(api.studentSubjects.getUserSubjects)
  

  return (
    <div className="p-5">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-4xl font-bold">Your Subjects</h1>
        <AddSubjectDialog />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        {!subjects ? (
          <div className='grid grid-cols-1 md:grid-cols-3 w-full items-center'>
            <Skeleton className="h-20 w-76 rounded-md mx-2" />
            <Skeleton className="h-20 w-76 rounded-md mx-2" />
            <Skeleton className="h-20 w-76 rounded-md mx-2" />
          </div>
        ) : (
            subjects.map(subject => (
              <SubjectCard subject={subject} key={subject._id} />
            ))
        )}
      </div>
    </div>
  )
}

export default Subjects

