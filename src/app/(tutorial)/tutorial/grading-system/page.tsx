"use client"

import React, { useState, useTransition } from "react"
import { motion } from "framer-motion"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CircleAlert, Loader2 } from "lucide-react"
import { useRouter } from "next/navigation"
import { useMutation } from "convex/react"
import { api } from "@/convex/_generated/api"
import { toast } from "sonner"

function AnimatedCheckIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
    >
      <motion.path
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.5 }}
        d="M4.5 12.75l6 6 9-13.5"
      />
    </svg>
  )
}

const Page = () => {
  const router = useRouter()
  const [selectedGradingSystem, setSelectedGradingSystem] = useState<
    string | null
  >(null)
  const [showWarning, setShowWarning] = useState(false)
  const [isPending, startTransition] = useTransition()

  const updateGradeSystem = useMutation(api.users.updateGradeSystem)

  const toggleGradingSystem = (system: string) => {
    setSelectedGradingSystem(prevSystem =>
      prevSystem === system ? null : system
    )
  }

  const isGradingSystemSelected = (system: string) => {
    return selectedGradingSystem === system
  }

  const handleFinish = () => {
    if (!selectedGradingSystem) {
      setShowWarning(true)
    } else {
      startTransition(async () => {
        try {
          await updateGradeSystem({ gradeSystem: selectedGradingSystem })
          router.push("/dashboard")
        } catch (error) {
            toast.error("Error updating grade system.")
        }
      })
    }
  }

  return (
    <div className="rounded-2xl border border-gray-300 px-12">
      <h1 className="mt-10 text-center text-4xl font-bold">
        Let us customize your experience!
      </h1>
      <div className="mt-10 p-5">
        <h2 className="mb-10 text-2xl font-semibold">
          2. Give us details about your grading system (click the one that
          matches your system)
        </h2>
        <div className="flex w-full items-stretch justify-center">
          <div className="mx-2 w-1/3">
            <Card
              className={`relative flex h-full flex-col hover:cursor-pointer ${isGradingSystemSelected("letter") ? "bg-black bg-opacity-30" : ""}`}
              onClick={() => toggleGradingSystem("letter")}
            >
              <CardHeader>
                <CardTitle>Letter Based Grading System</CardTitle>
                <CardDescription>Common uses are A-F, A-E, A-D</CardDescription>
              </CardHeader>
              <CardContent>
                <p>
                  Popular Countries with a Letter based Grading System: <br />{" "}
                </p>
                <p className="text-muted-foreground">
                  <br />
                  Denmark, Latvia, Russia, Finland, Sweden, Norway, Iceland,
                  Kazakhstan, Germany, Lithuania, Estonia, Ukraine, Czech
                  Republic, Slovakia, Hungary, Poland, Belarus, Azerbaijan,
                  Georgia, Moldova
                </p>
              </CardContent>
              <CardFooter className="mt-auto">
                <h2 className="text-lg font-semibold">
                  Found your country? Then click this card!
                </h2>
              </CardFooter>
              {isGradingSystemSelected("letter") && (
                <div className="absolute inset-0 flex scale-[0.17] items-center justify-center text-white">
                  <AnimatedCheckIcon />
                </div>
              )}
            </Card>
          </div>
          <div className="mx-2 w-1/3">
            <Card
              className={`relative flex h-full flex-col hover:cursor-pointer ${isGradingSystemSelected("number") ? "bg-black bg-opacity-30" : ""}`}
              onClick={() => toggleGradingSystem("number")}
            >
              <CardHeader>
                <CardTitle>Number Based Grading System</CardTitle>
                <CardDescription>Common uses are 1-6, 1-5</CardDescription>
              </CardHeader>
              <CardContent>
                <p>
                  Popular Countries with a Letter based Grading System: <br />{" "}
                </p>
                <p className="text-muted-foreground">
                  <br />
                  United States, Canada, Australia, New Zealand, United Kingdom,
                  Ireland, Hong Kong, Singapore, Ghana, South Africa, Japan,
                  South Korea, Malaysia, Philippines, Thailand, United Arab
                  Emirates, Saudi Arabia, Qatar, Kuwait, Bahrain
                </p>
              </CardContent>
              <CardFooter className="mt-auto">
                <h2 className="text-lg font-semibold">
                  Found your country? Then click this card!
                </h2>
              </CardFooter>
              {isGradingSystemSelected("number") && (
                <div className="absolute inset-0 flex scale-[0.17] items-center justify-center text-white">
                  <AnimatedCheckIcon />
                </div>
              )}
            </Card>
          </div>
        </div>

        <div className="mt-16 flex h-12 w-full flex-col items-center justify-center">
          {showWarning && (
            <div className="mb-2 flex items-center text-red-500">
              <CircleAlert size={20} />
              <p className="ml-2 pb-1 text-center">
                Please select a grading system before finishing.
              </p>
            </div>
          )}
          <Button
            className="h-12 w-1/2"
            variant={"outline"}
            onClick={handleFinish}
            disabled={isPending}
            >
              {isPending ? <Loader2 className='size-4 animate-spin'/> : "Finish"}
          </Button>
        </div>
      </div>
    </div>
  )
}

export default Page
