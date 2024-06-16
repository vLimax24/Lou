import * as React from "react"
import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import dayjs from "dayjs"
import duration from "dayjs/plugin/duration"
import customParseFormat from "dayjs/plugin/customParseFormat"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { ProgressCircle } from "@tremor/react"
import { Timer, BarChart, Play, Pause } from "lucide-react"
import { Icon } from "@/components/tiptapUI/Icon"

dayjs.extend(duration)
dayjs.extend(customParseFormat)

type CardProps = React.ComponentProps<typeof Card>

const PomodoroTimerCard = ({ className, ...props }: CardProps) => {
  const [isRunning, setIsRunning] = useState(false)
  const [isWorkTime, setIsWorkTime] = useState(true)
  const [selectedTime, setSelectedTime] = useState("25")
  const [timeLeft, setTimeLeft] = useState(
    dayjs.duration({ minutes: 25 }).asMilliseconds()
  )
  const [workDuration] = useState(25)
  const [breakDuration] = useState(5)
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
        setTimeLeft(prev => {
          if (prev <= 1000) {
            setIsWorkTime(prev => !prev)
            if (isWorkTime) {
              const newCount = sessionCount + 1
              setSessionCount(newCount)
              localStorage.setItem("sessionCount", newCount.toString())
            }
            return dayjs
              .duration({ minutes: isWorkTime ? breakDuration : workDuration })
              .asMilliseconds()
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
  }, [
    isRunning,
    isWorkTime,
    timeLeft,
    workDuration,
    breakDuration,
    sessionCount,
  ])

  const handleStartPause = () => {
    setIsRunning(!isRunning)
  }

  const handleReset = () => {
    setIsRunning(false)
    setIsWorkTime(true)
    setSelectedTime("25")
    setTimeLeft(dayjs.duration({ minutes: workDuration }).asMilliseconds())
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

  const handleSetTime = (minutes: number) => {
    setSelectedTime(minutes.toString())
    setIsRunning(false)
    setTimeLeft(dayjs.duration({ minutes }).asMilliseconds())
  }

  const totalDuration = parseInt(selectedTime) * 60 * 1000
  const progress = ((totalDuration - timeLeft) / totalDuration) * 100

  return (
    <Card className={cn("border-none shadow-none", className)} {...props}>
      <Tabs defaultValue="pomodoro" className="max-h-[30vh] w-full">
        <TabsList className="w-full">
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
          <div className="flex flex-col h-full"> 
            
            <div className="mt-6 flex items-center justify-center gap-3">{/** Tempos */}
              <div
                className={`rounded-xl px-4 py-2 hover:cursor-pointer ${selectedTime === "5" ? "bg-[#184d6c] text-white" : "bg-[#b3b4b8] text-white"} transition-all duration-300 ease-in-out`}
                onMouseDown={() => handleSetTime(5)}
              >
                5 mins
              </div>
              <div
                className={`rounded-xl px-4 py-2 hover:cursor-pointer ${selectedTime === "10" ? "bg-[#184d6c] text-white" : "bg-[#b3b4b8] text-white"} transition-all duration-300 ease-in-out`}
                onMouseDown={() => handleSetTime(10)}
              >
                10 mins
              </div>
              <div
                className={`rounded-xl px-4 py-2 hover:cursor-pointer ${selectedTime === "25" ? "bg-[#184d6c] text-white" : "bg-[#b3b4b8] text-white"} transition-all duration-300 ease-in-out`}
                onMouseDown={() => handleSetTime(25)}
              >
                25 mins
              </div>
            </div>
            
            <div className="mt-4 flex flex-col p-4 w-full items-center h-full text-white">{/** Wrapper */}
              <div className="flex flex-col items-center md:mr-0">
                <div className="mb-1 mt-2 h-full"> {/** Números */}
                  <h1 className="mt-2 text-[5rem] text-pastelBlue font-bold leading-[2.5rem] lg:text-[6rem]">
                    {formattedTimeLeft}
                  </h1>
                </div>
                <div className="flex mt-8 gap-2 items-center">
                <Button
                  onMouseDown={handleReset}
                  className="rounded-2xl bg-[#303030] px-4 py-2 hover:bg-[#272727]"
                >
                  <Icon name={"TimerReset"} />
                </Button>
                <Button
                  onClick={handleStartPause}
                  className="rounded-3xl bg-[#303030] px-6 py-6 hover:bg-[#272727]"
                >
                  {isRunning ? <Pause /> : <Play />}
                </Button>
                <Button
                  onMouseDown={handleReset}
                  className="rounded-2xl bg-[#303030] px-4 py-2 hover:bg-[#272727]"
                >
                  <Icon name={"FastForward"} />
                </Button>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>
        <TabsContent value="stats">{renderCubes()}</TabsContent>
      </Tabs>
    </Card>
  )
}

export default PomodoroTimerCard
