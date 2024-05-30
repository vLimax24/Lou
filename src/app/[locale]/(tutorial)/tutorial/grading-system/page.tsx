"use client"

import React, { useState, useTransition } from "react"
import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CircleAlert, Loader2 } from "lucide-react"
import { useRouter } from "next/navigation"
import { useMutation, useQuery } from "convex/react"
import { api } from "@/convex/_generated/api"
import { toast } from "sonner"

const AnimatedCheckIcon = () => (
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

const Page = () => {
  const router = useRouter()
  const [selectedCountry, setSelectedCountry] = useState<any>(null)
  const [showWarning, setShowWarning] = useState(false)
  const [isPending, startTransition] = useTransition()

  const updateGradeSystem = useMutation(api.users.updateGradeSystem)

  const countries = useQuery(api.countries.getCountries)

  const toggleCountry = (system: string) => {
    setSelectedCountry((prevSystem: any) =>
      prevSystem === system ? null : system
    )
  }

  const isCountrySelected = (country: string) => {
    return selectedCountry === country
  }

  console.log(selectedCountry)

  const handleFinish = () => {
    if (!selectedCountry) {
      setShowWarning(true)
    } else {
      startTransition(async () => {
        try {
          await updateGradeSystem({ gradeSystem: selectedCountry })
          toast.success("Thank you.")
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
        <div className="flex w-full items-stretch justify-center flex-wrap">
        {countries?.map((country) => (
          <Card key={country._id} onClick={() => toggleCountry(country._id)} className={`relative w-64 h-32 p-4 m-4 ${isCountrySelected(country._id) ? "bg-black bg-opacity-30" : ""}`}>
            <h1 className="font-semibold text-2xl p-1">{country.countryName}</h1>
            {isCountrySelected(country._id) && (
              <div className="absolute inset-0 flex items-center justify-center scale-[0.25] text-white">
                  <AnimatedCheckIcon/>
              </div>
            )}
          </Card>
        ))}
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
