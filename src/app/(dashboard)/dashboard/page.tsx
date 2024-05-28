"use client"
import { GradeBarChart } from "@/components/dashboard/home/GradeSheet/BarChart"
import EventsCard from "@/components/dashboard/home/Events"
// import ActionBar from "@/components/dashboard/home/Search"
import PomodoroTimerCard from "@/components/dashboard/home/PomodoroTimer"
import ProjectsCard from "@/components/dashboard/home/Projects"
import TasksCard from "@/components/dashboard/home/Tasks"

const Dashboard = () => {
  return (
    <section className="flex items-center justify-center overflow-hidden p-10 md:p-5 lg:p-0">
      <div className="h-full w-full">
        <div className="h-full max-w-full text-gray-500">
          <div className="relative h-full">
            <div
              className="relative z-10 grid h-full grid-cols-6 gap-3"
              style={{ gridTemplateRows: "repeat(2, 1fr)" }}
            >
              <div className="relative col-span-full flex overflow-hidden rounded-xl border border-gray-200 bg-white p-8 dark:border-gray-800 dark:bg-gray-900 lg:col-span-2">
                <EventsCard />
              </div>
              <div className="relative col-span-full overflow-hidden rounded-xl border border-gray-200 bg-white p-8 dark:border-gray-800 dark:bg-gray-900 sm:col-span-3 lg:col-span-2">
                <TasksCard />
              </div>
              <div className="relative col-span-full overflow-hidden rounded-xl border border-gray-200 bg-white p-8 dark:border-gray-800 dark:bg-gray-900 sm:col-span-3 lg:col-span-2">
                <PomodoroTimerCard />
              </div>
              <div className="flex-items-c relative col-span-full overflow-hidden rounded-xl border border-gray-200 bg-white p-4 pr-12 dark:border-gray-800 dark:bg-gray-900 lg:col-span-3">
                <GradeBarChart />
              </div>
              <div className="relative col-span-full overflow-hidden rounded-xl border border-gray-200 bg-white p-8 dark:border-gray-800 dark:bg-gray-900 lg:col-span-3">
                <ProjectsCard />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Dashboard
