"use client"
import { Loader2 } from "lucide-react"
import React from "react"

import { Doc } from "@/convex/_generated/dataModel"
import AnimatedCheckIcon from "@/components/common/AnimatedCheckIcon"

type Props = {
  setSelectedSubjects: React.Dispatch<React.SetStateAction<string[]>>
  selectedSubjects: string[]
  subjects?: Doc<"subjects">[]
}

const Subjects = ({
  setSelectedSubjects,
  selectedSubjects,
  subjects,
}: Props) => {
  const toggleSubject = (subjectId: string): void => {
    setSelectedSubjects(prevSelectedSubjects => {
      if (prevSelectedSubjects.includes(subjectId)) {
        return prevSelectedSubjects.filter(_id => _id !== subjectId)
      } else {
        return [...prevSelectedSubjects, subjectId]
      }
    })
  }

  const isSelected = (subjectId: string): boolean => {
    return selectedSubjects.includes(subjectId)
  }

  return (
    <div>
      <div className="grid w-full grid-cols-1 gap-2">
        {!subjects ? (
          <Loader2 className="size-8 animate-spin" />
        ) : (
          subjects.map((subject, index) => (
            <div
              key={subject._id}
              data-cy={`subject-${index}`}
              className={
                "flex items-center justify-between rounded-lg bg-white p-4 transition-all duration-300 ease-in-out hover:cursor-pointer"
              }
              onClick={() => toggleSubject(subject._id)}
            >
              <p className="text-lg font-bold">{subject.name}</p>
              {isSelected(subject._id) && <AnimatedCheckIcon />}
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default Subjects
