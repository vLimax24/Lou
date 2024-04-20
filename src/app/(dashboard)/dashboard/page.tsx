"use client"
import AssignmentCard from "@/components/dashboard/home/Assignments"
import CalendarCard from "@/components/dashboard/home/Calendar"
import NotesCard from "@/components/dashboard/home/Notes"
import { GradeBarChart } from "@/components/dashboard/home/GradeSheet/BarChart"
import ActionBar from "@/components/dashboard/home/Search"

const Dashboard = () => {
  
  return (
    <main className="flex flex-col gap-4 lg:gap-6 lg:p-10 bg-[#FAFAFA] h-full w-full min-h-screen overflow-y-hidden">
      <div className="flex flex-col rounded-lg justify-center">
        <div className='flex flex-col md:flex-row flex-1 pb-1'>
          <div className="center flex-col">
            <ActionBar />
            <GradeBarChart />
          </div>
          <CalendarCard />
        </div>
        <div className='flex flex-1 pt-1 pb-0 flex-col md:flex-row justify-center'>
          <AssignmentCard />
          <NotesCard />
        </div>
      </div>
    </main>
  )
}

export default Dashboard