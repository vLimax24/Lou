"use client"

import SubjectCard from "@/components/containers/subject-card"
import { AddSubject } from "@/components/dashboard/Dialogs/subjects/SubjectDialog"
import { Skeleton } from "@/components/ui/skeleton"
import { api } from "@/convex/_generated/api"
import { useQuery } from "convex/react"

const Subjects = () => {
  const subjects = useQuery(api.studentSubjects.getUserSubjects)

  return (
    <>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-4xl font-bold">Your Subjects</h1>
        <AddSubject />
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {!subjects ? (
          <div className="grid w-full grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            <Skeleton className="h-20 w-full rounded-md" />
            <Skeleton className="h-20 w-full rounded-md" />
            <Skeleton className="h-20 w-full rounded-md" />
          </div>
        ) : (
          subjects.map(subject => (
            <SubjectCard subject={subject} key={subject._id} />
          ))
        )}
      </div>
    </>
  )
}

export default Subjects
