"use client"
import AssignmentCard from "@/components/dashboard/home/Assignments"
import NotesCard from "@/components/dashboard/home/Notes"
import { GradeBarChart } from "@/components/dashboard/home/GradeSheet/BarChart"
import ActionBar from "@/components/dashboard/home/Search"
import PomodoroTimerCard from "@/components/dashboard/home/PomodoroTimer"

const Dashboard = () => {
  
  return (
    
      <div className="flex flex-col rounded-lg justify-center">
        <div className='flex flex-col md:flex-row flex-1 pb-1'>
          <div className="center flex-col">
            <ActionBar />
            <GradeBarChart />
          </div>
          <PomodoroTimerCard />
        </div>
        <div className='flex flex-1 pt-1 pb-0 flex-col md:flex-row justify-center'>
          <AssignmentCard />
          <NotesCard />
        </div>
      </div>

  )
}

export default Dashboard