import * as React from "react"
import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import dayjs from "dayjs"
import duration from "dayjs/plugin/duration"
import customParseFormat from "dayjs/plugin/customParseFormat"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Dialog, ProgressCircle } from "@tremor/react"
import { Timer, BarChart, Play, Pause } from "lucide-react"
import PomodoroTimer from "./_components/PomodoroTimer"
import { Icon } from "@/components/tiptapUI/Icon"
import {
  DialogTrigger,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@radix-ui/react-dialog"
import { DialogHeader } from "@/components/ui/dialog"
import { Label } from "@radix-ui/react-dropdown-menu"
import link from "next/link"
import { Input } from "postcss"
import RepeatDialog from "./_components/RepeatDialog"

dayjs.extend(duration)
dayjs.extend(customParseFormat)

type CardProps = React.ComponentProps<typeof Card>

const PomodoroTimerCard = ({ className, ...props }: CardProps) => {
  const [isRunning, setIsRunning] = useState(false)
  const [selectedTime, setSelectedTime] = useState(1)
  const [confirmedTime, setConfirmedTime] = useState("1")
  const [timeLeft, setTimeLeft] = useState(
    dayjs.duration({ minutes: Number(confirmedTime) }).asMilliseconds()
  )
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [velocity, setVelocity] = useState(1)
  const [breakDuration] = useState(5)
  const [sessionCount, setSessionCount] = useState(0)
  const [isWorkTime, setIsWorkTime] = useState<any>(true)

  useEffect(() => {
    const today = dayjs().format("YYYY-MM-DD")
    const savedDate = localStorage.getItem("savedDate")
    const savedCount = localStorage.getItem("sessionCount")
    if (savedDate === today && savedCount !== null) {
      setSessionCount(Number(savedCount))
    } else {
      localStorage.setItem("savedDate", today)
      localStorage.setItem("sessionCount", "0")
    }
  }, [])

  const handleChangeTime = (minutes: number) => {
    setSelectedTime(minutes)
    console.log("Selected time: ", minutes)
  }

  const formattedTimeLeft = dayjs.duration(timeLeft).format("mm:ss")

  const renderCubes = () => {
    const totalCubes = 120
    return (
      <div className="flex flex-col items-center">
        <p className="mt-2 text-center">
          Total sessions today: <strong>{sessionCount}</strong>{" "}
          {sessionCount > 3 && "🔥"}
        </p>
        <div className="mt-4 grid grid-cols-12">
          {Array.from({ length: totalCubes }, (_, index) => (
            <div
              key={index}
              className={`h-4 w-4 ${index < sessionCount ? "bg-blue-500" : "bg-gray-300"} m-1 rounded-sm`}
            ></div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <Card className={cn("border-none shadow-none", className)} {...props}>
      <RepeatDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
      />
      <Tabs defaultValue="pomodoro" className="max-h-[30vh] w-full">
        <TabsList className="w-full h-full">
          <TabsTrigger
            value="pomodoro"
            className="flex w-1/2 items-center justify-center text-gray-500"
          >
            <Timer className="mr-0.5 size-5 text-gray-500" /> Pomodoro
          </TabsTrigger>
          <TabsTrigger
            value="stats"
            className="flex w-1/2 items-center justify-center text-gray-500"
          >
            <BarChart className="mr-0.5 size-5 text-gray-500" /> Stats
          </TabsTrigger>
        </TabsList>
        <TabsContent value="pomodoro">
          <div className="relative flex h-full flex-col">
            <div className="mt-6 flex items-center justify-center gap-3">
              {/** Tempos */}
              <div
                className={`rounded-xl px-4 py-2 hover:cursor-pointer ${confirmedTime === "5" ? "bg-[#184d6c] text-white" : "bg-[#b3b4b8] text-white"} transition-all duration-300 ease-in-out`}
                onMouseDown={() => handleChangeTime(5)}
              >
                5 mins
              </div>
              <div
                className={`rounded-xl px-4 py-2 hover:cursor-pointer ${confirmedTime === "10" ? "bg-[#184d6c] text-white" : "bg-[#b3b4b8] text-white"} transition-all duration-300 ease-in-out`}
                onMouseDown={() => handleChangeTime(10)}
              >
                10 mins
              </div>
              <div
                className={`rounded-xl px-4 py-2 hover:cursor-pointer ${confirmedTime === "25" ? "bg-[#184d6c] text-white" : "bg-[#b3b4b8] text-white"} transition-all duration-300 ease-in-out`}
                onClick={() => handleChangeTime(25)}
              >
                25 mins
              </div>
            </div>
            <PomodoroTimer selectedTime={1} />
          </div>
        </TabsContent>
        <TabsContent value="stats">{renderCubes()}</TabsContent>
      </Tabs>
    </Card>
  )
}

export default PomodoroTimerCard
