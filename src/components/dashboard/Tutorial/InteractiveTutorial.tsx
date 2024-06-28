"use client"
import React, { useEffect, useState } from "react"
import Joyride, { CallBackProps, Step } from "react-joyride"
import { useRouter } from "next/navigation"

const InteractiveTutorial = () => {
  const [run, setRun] = useState(false)
  const [steps, setSteps] = useState<Step[]>([])
  const [stepIndex, setStepIndex] = useState(0)
  const router = useRouter()

  useEffect(() => {
    const tutorialState = localStorage.getItem("interactive-tutorial-state")
    if (tutorialState === "Pending") {
      setRun(true)
      setSteps([
        {
          target: "body",
          content:
            "Hey. Here is our dashboard. Let's start by creating a task.",
          disableBeacon: true,
        },
        {
          target: "#notes-link",
          content: "Click on the notes link in the sidebar.",
          disableBeacon: true,
        },
        {
          target: "#addTaskButton",
          content:
            "Press the addTask dialog and fill in the form to create a task.",
          disableBeacon: true,
        },
      ])
    }
  }, [])

  const handleJoyrideCallback = (data: CallBackProps) => {
    const { status, index, action, type } = data
    if (
      (status === "finished" || status === "skipped") &&
      type === "tour:end"
    ) {
      localStorage.removeItem("interactive-tutorial-state")
      setRun(false)
    } else if (type === "step:after" && index === 1) {
      router.push("/dashboard/tasks")
    }
    setStepIndex(index + (action === "prev" ? -1 : 1))
  }

  return (
    <Joyride
      callback={handleJoyrideCallback}
      continuous
      run={run}
      scrollToFirstStep
      showProgress
      showSkipButton
      stepIndex={stepIndex}
      steps={steps}
      styles={{
        options: {
          zIndex: 10000,
        },
      }}
    />
  )
}

export default InteractiveTutorial
