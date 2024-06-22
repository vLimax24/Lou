import { useContext, useState, useEffect, useRef } from "react"
import { Pause, Play } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Icon } from "@/components/tiptapUI/Icon"
import { motion } from "framer-motion"
import RepeatDialog from "./RepeatDialog"
import dayjs from "dayjs"

function PomodoroTimer() {
  const [isPaused, setIsPaused] = useState(true)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [selectedTime, setSelectedTime] = useState(25)
  const [nextSelectedTime, setNextSelectedTime] = useState(25)
  const [sessionCount, setSessionCount] = useState(0)
  const [mode, setMode] = useState("work") // work/break/null
  const [secondsLeft, setSecondsLeft] = useState(0)

  const secondsLeftRef = useRef(secondsLeft)
  const isPausedRef = useRef(isPaused)
  const modeRef = useRef(mode)

  function tick() {
    secondsLeftRef.current--
    setSecondsLeft(secondsLeftRef.current)
  }

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
  }, [sessionCount])

  useEffect(() => {
    function switchMode() {
      const nextMode = modeRef.current === "work" ? "break" : "work"
      const nextSeconds = (nextMode === "work" ? selectedTime : 5) * 60

      setMode(nextMode)
      modeRef.current = nextMode

      setSecondsLeft(nextSeconds)
      secondsLeftRef.current = nextSeconds
    }

    secondsLeftRef.current = selectedTime * 60
    setSecondsLeft(secondsLeftRef.current)

    const interval = setInterval(() => {
      if (isPausedRef.current) {
        return
      }
      if (secondsLeftRef.current === 0) {
        setSessionCount(sessionCount + 1)
        if (modeRef.current === "work") {
          const newCount = sessionCount + 1
          setSessionCount(newCount)
          localStorage.setItem("sessionCount", newCount.toString())
        } 
        return switchMode()
      }
      tick()
    }, 1000)

    return () => clearInterval(interval)
  }, [selectedTime])

  const minutes = Math.floor(secondsLeft / 60)
  let seconds = secondsLeft % 60

  const minutesStr = minutes.toString().padStart(2, "0")
  let secondsStr = seconds.toString().padStart(2, "0")

  useEffect(() => {
    if (nextSelectedTime !== selectedTime && !isPaused) {
      setIsDialogOpen(true)
    }
  }, [nextSelectedTime, selectedTime])


  if (seconds < 10) {
    seconds = 0 + seconds
  }

  const handlePlay = () => {
    setIsPaused(false)
    isPausedRef.current = false
  }

  const handlePause = () => {
    setIsPaused(true)
    isPausedRef.current = true
  }

  const handleReset = () => {
    setSecondsLeft(selectedTime * 60)
    secondsLeftRef.current = selectedTime * 60
    setIsDialogOpen(false)
    setMode("work")
    handlePause()
  }

  const handleSelectOtherTime = () => {
    setSelectedTime(nextSelectedTime)
    setIsDialogOpen(false)
    handleReset()
    handlePause()
  }

  const handleChangeTime = (minutes: number) => {
    if (!isPaused) {
      setNextSelectedTime(minutes)
    } else {
      setSelectedTime(minutes)
    }
  }

  const wrapperVariants = {
    work: { backgroundColor: '#b0c9db' },
    break: { backgroundColor: '#e1deb9' },
  };

  const iconVariants = {
    work: {
      y: [10, 10, 0],
      opacity: [0, 0, 1],
      backgroundColor: "#3ea1e8",
    },
    break: {
      y: [10, 10, 0],
      opacity: [0, 0, 1],
      backgroundColor: "#d4ca5a",
    },
  }

  return (
   <>
    <div className="flex items-center justify-center gap-3">
    <div
      className={`rounded-xl px-4 py-2 hover:cursor-pointer ${selectedTime === 5 ? "bg-[#184d6c] text-white" : "bg-[#b3b4b8] text-white"} transition-all duration-300 ease-in-out`}
      onMouseDown={() => handleChangeTime(5)}
    >
      5 mins
    </div>
    <div
      className={`rounded-xl px-4 py-2 hover:cursor-pointer ${selectedTime === 10 ? "bg-[#184d6c] text-white" : "bg-[#b3b4b8] text-white"} transition-all duration-300 ease-in-out`}
      onMouseDown={() => handleChangeTime(10)}
    >
      10 mins
    </div>
    <div
      className={`rounded-xl px-4 py-2 hover:cursor-pointer ${selectedTime === 25 ? "bg-[#184d6c] text-white" : "bg-[#b3b4b8] text-white"} transition-all duration-300 ease-in-out`}
      onClick={() => handleChangeTime(25)}
    >
      25 mins
    </div>
  </div>
    <motion.div
      className="mt-2 flex h-full relative flex-col items-center justify-between gap-5 rounded-2xl border p-4 text-white"
      animate={mode === "work" ? wrapperVariants.work : wrapperVariants.break}
      transition={{ duration: 0.5 }} 
    >
      <RepeatDialog
      isOpen={isDialogOpen}
      onClickConfirm={handleSelectOtherTime}
      onClose={() => setIsDialogOpen(false)}
      />  

      {!isPaused ? (
        <motion.div
          animate={mode === "work" ? "work" : "break"} 
          variants={iconVariants}
          transition={{ duration: 0.5 }}
          className="absolute top-2 flex justify-center rounded-2xl px-4 py-2"
        >
          {mode === "work" ? (
            <Icon className="w-[30px]" name={"BookOpen"} />
          ) : (
            <Icon className="w-[30px]" name={"Coffee"} />
          )}
        </motion.div>
      ) : null}
      <h1
      className={`mt-6 text-[4.5rem] font-bold leading-[2.5rem] lg:text-[5rem] ${mode === 'work' ? 'text-pastelBlue' : 'text-[#4e4911]'}`}
      >
        {minutesStr}:{secondsStr}
      </h1>
      <div className="mt-2 flex items-center gap-2">
        <Button onClick={() => handleReset()} className={` rounded-2xl px-4 py-2 ${mode === 'work' ? ' bg-customBlue hover:bg-[#4CACFF]' : 'rounded-2xl bg-[#d6cc64] hover:bg-[#ece26d]'}`}>
          <Icon name={"TimerReset"} />
        </Button>
        <Button
          className={`rounded-3xl px-6 py-6 ${mode === 'work' ? 'bg-[#76C5FF] hover:bg-[#3ea1e8]' : 'bg-[#e2d862] hover:bg-[#e9df71]'}`}
          onClick={() => {
            isPaused ? handlePlay() : handlePause()
          }}
        >
          {isPaused ? <Play /> : <Pause />}
        </Button>
      </div>
    </motion.div>
   </>
  )
}

export default PomodoroTimer
