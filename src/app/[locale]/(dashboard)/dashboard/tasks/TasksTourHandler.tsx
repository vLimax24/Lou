"use client"

import { useFlow } from "@frigade/react"
import { useEffect } from "react"

export function TasksTourHandler() {
  const { flow } = useFlow("flow_VIdtJ1vD")

  useEffect(() => {
    const handleTourProgression = async () => {
      if (flow) {
        await flow.reload()

        // Check if we're on the correct step (step 3, index 2)
        if (flow.getCurrentStepIndex() === 2) {
          // Start the next step
          flow.getCurrentStep()?.start()
        }
      }
    }

    handleTourProgression()
  }, [flow])

  return null // This component doesn't render anything
}
