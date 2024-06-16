import { useContext, useState, useEffect, useRef } from "react"
import { Pause, Play } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Icon } from "@/components/tiptapUI/Icon"
import { motion } from "framer-motion"

interface Props {
  selectedTime: number
}

function PomodoroTimer({ selectedTime }: Props) {
  const [isPaused, setIsPaused] = useState(true)
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

  const wrapperVariants = {
    work: { backgroundColor: '#b0c9db' },
    break: { backgroundColor: '#e1deb9' },
  };

  const iconVariants = {
    work: {
      y: [10, 10, 0],
      opacity: [0, 0, 1],
      backgroundColor: "#3ea1e8", // Cor de fundo para o modo "work"
    },
    break: {
      y: [10, 10, 0],
      opacity: [0, 0, 1],
      backgroundColor: "#d4ca5a", // Cor de fundo para o modo "break"
    },
  }

  return (
    <motion.div
      className="mt-2 flex h-full flex-col items-center justify-between gap-5 rounded-2xl border p-4 text-white"
      animate={mode === "work" ? wrapperVariants.work : wrapperVariants.break}
      transition={{ duration: 0.5 }} 
    >
      {!isPaused ? (
        <motion.div
          animate={mode === "work" ? "work" : "break"} 
          variants={iconVariants}
          transition={{ duration: 0.5 }}
          className="w-small absolute bottom-0 left-4 flex justify-center rounded-t-2xl px-4 py-2"
        >
          {mode === "work" ? (
            <Icon name={"BookOpen"} />
          ) : (
            <Icon name={"Coffee"} />
          )}
        </motion.div>
      ) : null}
      <h1 className="mt-2 text-[5rem] font-bold leading-[2.5rem] text-pastelBlue lg:text-[5rem]">
        {minutesStr}:{secondsStr}
      </h1>
      <div className="mt-4 flex items-center gap-2">
        <Button className="rounded-2xl bg-customBlue px-4 py-2 hover:bg-[#4CACFF]">
          <Icon name={"TimerReset"} />
        </Button>
        <Button
          className="rounded-3xl bg-[#76C5FF] px-6 py-6 hover:bg-[#3ea1e8]"
          onClick={() => {
            isPaused ? handlePlay() : handlePause()
          }}
        >
          {isPaused ? <Play /> : <Pause />}
        </Button>
      </div>
    </motion.div>
  )
}

export default PomodoroTimer
