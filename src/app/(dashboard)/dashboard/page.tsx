"use client"
import AssignmentCard from "@/components/dashboard/home/Assignments"
import NotesCard from "@/components/dashboard/home/Notes"
import { GradeBarChart } from "@/components/dashboard/home/GradeSheet/BarChart"
// import ActionBar from "@/components/dashboard/home/Search"
import PomodoroTimerCard from "@/components/dashboard/home/PomodoroTimer"

const Dashboard = () => {
  return (
    <div className="flex flex-col justify-center rounded-lg">
      <div className="flex flex-1 flex-col pb-1 md:flex-row">
        <div className="center flex-col">
          {/* <ActionBar /> */}
          <GradeBarChart />
        </div>
        <PomodoroTimerCard />
      </div>
      <div className="flex flex-1 flex-col justify-center pb-0 pt-1 md:flex-row">
        <AssignmentCard />
        <NotesCard />
      </div>
    </div>
  )
}

export default Dashboard
