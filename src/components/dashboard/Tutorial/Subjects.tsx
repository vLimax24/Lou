"use client"
import { motion } from "framer-motion"
import { Loader2 } from "lucide-react"
import React from "react"

import { Doc } from "@/convex/_generated/dataModel"

const AnimatedCheckIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    height={28}
    width={28}
  >
    <motion.path
      strokeLinecap="round"
      strokeLinejoin="round"
      initial={{ pathLength: 0 }}
      animate={{ pathLength: 1 }}
      transition={{ duration: 0.25 }}
      d="M4.5 12.75l6 6 9-13.5"
    />
  </svg>
)

type Props = {
  setSelectedSubjects: React.Dispatch<React.SetStateAction<string[]>>;
  selectedSubjects: string[];
  subjects?: Doc<"subjects">[];
};

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
          subjects.map(subject => (
            <div
              key={subject._id}
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
