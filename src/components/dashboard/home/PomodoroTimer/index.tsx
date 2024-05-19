import * as React from "react"
import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import dayjs from "dayjs"
import duration from "dayjs/plugin/duration"
import customParseFormat from "dayjs/plugin/customParseFormat"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Timer, BarChart, Play, Pause, RotateCw, Plus, Minus } from "lucide-react"

dayjs.extend(duration)
dayjs.extend(customParseFormat)

type CardProps = React.ComponentProps<typeof Card>;

const PomodoroTimerCard = ({ className, ...props }: CardProps) => {
  const [isRunning, setIsRunning] = useState(false)
  const [isWorkTime, setIsWorkTime] = useState(true)
  const [timeLeft, setTimeLeft] = useState(dayjs.duration({ minutes: 25 }).asMilliseconds())
  const [workDuration, setWorkDuration] = useState(25)
  const [breakDuration, setBreakDuration] = useState(5)
  const [sessionCount, setSessionCount] = useState(0)

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

  useEffect(() => {
    let timer: ReturnType<typeof setInterval> | undefined

    if (isRunning) {
      timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1000) {
            setIsWorkTime((prev) => !prev)
            if (isWorkTime) {
              const newCount = sessionCount + 1
              setSessionCount(newCount)
              localStorage.setItem("sessionCount", newCount.toString())
            }
            return dayjs.duration({ minutes: isWorkTime ? breakDuration : workDuration }).asMilliseconds()
          }
          return prev - 1000
        })
      }, 1000)
    }

    return () => {
      if (timer !== undefined) {
        clearInterval(timer)
      }
    }
  }, [isRunning, isWorkTime, timeLeft, workDuration, breakDuration, sessionCount])

  const handleStartPause = () => {
    setIsRunning(!isRunning)
  }

  const handleReset = () => {
    setIsRunning(false)
    setIsWorkTime(true)
    setTimeLeft(dayjs.duration({ minutes: workDuration }).asMilliseconds())
  }

  const formattedTimeLeft = dayjs.duration(timeLeft).format("mm:ss")

  const renderCubes = () => {
    const totalCubes = 120
    return (
      <div className="flex flex-col items-center">
        <p className="text-center mt-2">Total sessions today: <strong>{sessionCount}</strong> {sessionCount > 3 && "🔥"}</p>
        <div className="grid grid-cols-10 mt-4">
          {Array.from({ length: totalCubes }, (_, index) => (
            <div
              key={index}
              className={`w-4 h-4 ${index < sessionCount ? "bg-blue-500" : "bg-gray-300"} m-1 rounded-sm`}
            ></div>
          ))}
        </div>
      </div>
    )
  }

  const increaseWorkDuration = () => {
    const newDuration = workDuration + 1
    setWorkDuration(newDuration)
    if (isWorkTime) setTimeLeft(dayjs.duration({ minutes: newDuration }).asMilliseconds())
  }

  const decreaseWorkDuration = () => {
    if (workDuration > 1) {
      const newDuration = workDuration - 1
      setWorkDuration(newDuration)
      if (isWorkTime) setTimeLeft(dayjs.duration({ minutes: newDuration }).asMilliseconds())
    }
  }

  const increaseBreakDuration = () => {
    const newDuration = breakDuration + 1
    setBreakDuration(newDuration)
    if (!isWorkTime) setTimeLeft(dayjs.duration({ minutes: newDuration }).asMilliseconds())
  }

  const decreaseBreakDuration = () => {
    if (breakDuration > 1) {
      const newDuration = breakDuration - 1
      setBreakDuration(newDuration)
      if (!isWorkTime) setTimeLeft(dayjs.duration({ minutes: newDuration }).asMilliseconds())
    }
  }

  return (
    <Card className={cn("p-6 ml-5 mb-5 border-none", className)} {...props}>
      {/* <h2 className="text-2xl font-bold text-center mb-2">Pomodoro</h2> */}
      <Tabs defaultValue="pomodoro" className="w-[250px]">
        <TabsList className="w-full">
          <TabsTrigger value="pomodoro" className="w-1/2 text-gray-500 flex items-center justify-center"><Timer className="size-5 text-gray-500 mr-0.5"/> Pomodoro</TabsTrigger>
          <TabsTrigger value="stats" className="w-1/2 text-gray-500 flex items-center justify-center"><BarChart className="size-5 text-gray-500 mr-0.5"/> Stats</TabsTrigger>
        </TabsList>
        <TabsContent value="pomodoro">
          <div className="text-center">
            <p>{isWorkTime ? "Session" : "Break"}</p>
            <span className="text-[3.5rem] font-mono my-[-1rem]">{formattedTimeLeft}</span>
          </div>
          <div className="flex justify-center mb-2.5">
            <button
              onClick={handleStartPause}
              className="px-4 py-2 bg-primaryGray hover:bg-primaryHoverGray text-white rounded mr-2 w-1/2"
            >
              {isRunning ? (
                <div className="flex items-center justify-center">
                  <Pause />
                  <span className="ml-1 text-sm">Pause</span>
                </div>
              ) : (
                <div className="flex items-center justify-center">
                  <Play />
                  <span className="ml-1 text-sm">Play</span>
                </div>
              )}
            </button>
            <button
              onClick={handleReset}
              className="px-4 py-2 bg-gray-500 text-white rounded w-1/2 flex items-center justify-center"
            >
              <RotateCw className="mr-1"/>
              <span className="ml-1 text-sm">Reset</span>
            </button>
          </div>
          <div className="flex flex-col justify-center mb-4 space-y-2">
  <div className="flex flex-col items-center mx-2 space-y-0.5">
    <label htmlFor="work-duration" className="text-lg font-medium">Session Length</label>
    <div className="flex items-center space-x-4">
      <button 
        onClick={increaseWorkDuration} 
        className="p-2 bg-primaryGray text-white rounded-full flex items-center justify-center hover:bg-primaryHoverGray transition">
        <Plus/>
      </button>
      <p className="text-3xl font-semibold">{workDuration}:00</p>
      <button 
        onClick={decreaseWorkDuration} 
        className="p-2 bg-primaryGray text-white rounded-full flex items-center justify-center hover:bg-primaryHoverGray transition">
        <Minus />
      </button>
    </div>
  </div>
  <div className="flex flex-col items-center mx-2 space-y-0.5">
    <label htmlFor="break-duration" className="text-lg font-medium">Break Length</label>
    <div className="flex items-center space-x-4">
      <button 
        onClick={increaseBreakDuration} 
        className="p-2 bg-primaryGray text-white rounded-full flex items-center justify-center hover:bg-primaryHoverGray transition">
        <Plus/>
      </button>
      <p className="text-3xl font-semibold">{breakDuration}:00</p>
      <button 
        onClick={decreaseBreakDuration} 
        className="p-2 bg-primaryGray text-white rounded-full flex items-center justify-center hover:bg-primaryHoverGray transition">
        <Minus />
      </button>
    </div>
  </div>
</div>

        </TabsContent>
        <TabsContent value="stats">
          {renderCubes()}
        </TabsContent>
      </Tabs>
    </Card>
  )
}

export default PomodoroTimerCard
