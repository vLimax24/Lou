"use client"
import AssignmentCard from "@/components/dashboard/home/Assignments"
import CalendarCard from "@/components/dashboard/home/Calendar"
import GradeSheetCard from "@/components/dashboard/home/GradeSheet"
import NotesCard from "@/components/dashboard/home/Notes"
import { useSession } from "next-auth/react"

export default function Dashboard() {
  const { data: session } = useSession()
  
  return (
    <main className="flex flex-col gap-4 lg:gap-6 lg:p-6">
      <div className="flex items-center">
        <h1 className="text-lg font-semibold md:text-2xl ml-1">Welcome Back, {session?.user.name}</h1>
      </div>
      <div className="flex flex-col flex-1 rounded-lg">
        <div className='flex flex-col md:flex-row flex-1 pb-1'>
          <CalendarCard />
          <AssignmentCard />
        </div>
        <div className='flex flex-1 pt-1 pb-0 flex-col md:flex-row'>
          <GradeSheetCard />
          <NotesCard />
        </div>
      </div>
    </main>
  )
}