"use client"

import { useEffect, useState } from "react"
import { useMutation, useQuery } from "convex/react"
import { api } from "@/convex/_generated/api"
import { useStore } from "../../../context/store"
import { useHydration } from "@/hooks/zustand/useHydration"
import { Progress } from "@/components/ui/progress"
import { ChevronLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, UserRound } from "lucide-react"
import TutorialFinish from "../../../../public/tutorial_finish.svg"
import Image from "next/image"
import "../../../../node_modules/flag-icons/css/flag-icons.min.css"
import { getCountryCode } from "@/utils/getCountryCode"
import { Id } from "@/convex/_generated/dataModel"
import { useRouter } from "next/navigation"

const Tutorial = () => {
  const hasHydrated = useHydration(useStore)

  const querySubjects = useQuery(api.subjects.getAllSubjects)
  const updateUserTutorialData: any = useMutation(
    api.users.updateUserTutorialData
  )
  const updateSubjects = useMutation(api.studentSubjects.assignStudentSubjects)
  const queryCountries = useQuery(api.countries.getCountries)

  const step = useStore(state => state.step)
  const setStep = useStore(state => state.setStep)
  const country = useStore(state => state.country)
  const setCountry = useStore(state => state.setCountry)
  const subjects = useStore(state => state.subjects)
  const setSubjects = useStore(state => state.setSubjects)
  const username = useStore(state => state.username)
  const setUsername = useStore(state => state.setUsername)
  const addSubject = useStore(state => state.addSubject)
  const removeSubject = useStore(state => state.removeSubject)

  const [searchQuery, setSearchQuery] = useState("")
  const [errors, setErrors] = useState({
    subject: "",
    country: "",
    username: "",
  })

  const router = useRouter()

  const handleSubjectClick = (subjectId: string) => {
    if (subjects.includes(subjectId)) {
      setSubjects(subjects.filter(s => s !== subjectId))
      removeSubject(subjectId)
    } else {
      setSubjects([...subjects, subjectId])
      addSubject(subjectId)
    }
  }

  const handleCountryClick = (countryId: string) => {
    setCountry(countryId)
  }

  const handleNext = () => {
    if (step >= 4) return
    if (step === 1 && subjects.length === 0) {
      setErrors({ ...errors, subject: "Please select, at least one subject." })
      return
    }
    if (step === 2 && !country) {
      setErrors({ ...errors, country: "Please select a country." })
      return
    }
    if (
      step === 3 &&
      (username.trim() === "" || !/^[a-zA-Z0-9_]+$/.test(username))
    ) {
      setErrors({ ...errors, username: "Please enter a valid username." })
      return
    }
    setErrors({ subject: "", country: "", username: "" })
    setStep(step + 1)
  }

  const handleSubmit = async ({
    country,
    username,
    subjects,
  }: {
    country: string
    username: string
    subjects: Array<string>
  }) => {
    try {
      console.log("function executing")
      await updateUserTutorialData({
        country: country as Id<"gradingSystems">,
        username: username,
      })
      await updateSubjects({
        subjectIds: subjects as Id<"subjects">[],
      })
    } catch (error) {
      console.log(error)
    }
  }

  const handlePrevious = () => {
    setStep(step - 1)
  }

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value)
  }

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value)
  }

  const filteredSubjects = querySubjects?.filter(subject =>
    subject.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const filteredCountries = queryCountries?.filter(country =>
    country.countryName.toLowerCase().includes(searchQuery.toLowerCase())
  )

  if (!hasHydrated) {
    return <p>Loading...</p>
  }

  return (
    <div className="flex min-h-screen flex-col">
      <div className="my-0 w-full flex-grow overflow-hidden pt-10 lg:mx-auto lg:max-w-[1080px]">
        <div className="flex h-14 items-center gap-4 overflow-hidden px-10">
          {step !== 1 && (
            <div
              className="cursor-pointer rounded-full p-2 pl-0 transition-colors hover:bg-gray-300 lg:pl-2"
              onClick={handlePrevious}
            >
              <ChevronLeft className="text-black" size={24} />
            </div>
          )}
          <div className="min-w-0 flex-1">
            <Progress
              indicatorColor={
                step === 4 || step === 5 ? "bg-[#5CB85C]" : "bg-primaryBlue"
              }
              value={step === 1 ? 25 : step === 2 ? 50 : step === 3 ? 75 : 100}
              className="w-full"
            />
          </div>
        </div>
        {step === 1 && (
          <>
            <div className="mb-12 mt-9 flex flex-col gap-3 text-center">
              <h1 className="text-3xl font-bold">What are your Subjects?</h1>
              <h2 className="text-base text-[#5C5C5C]">
                If you can't find a subject here, you can add it later.
              </h2>
            </div>
            <div className="flex items-center justify-center">
              <div className="relative flex w-1/2 items-center justify-center">
                <Search
                  className="absolute left-5 top-1/2 -translate-y-1/2 transform text-gray-400"
                  size={18}
                />
                <Input
                  className="h-14 w-full pl-14"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={handleSearchChange}
                />
              </div>
            </div>
            <div className="mt-4 flex w-full flex-col items-center justify-center">
              <div className="flex max-h-[51vh] w-[95%] flex-col gap-2.5 overflow-y-auto pr-1 lg:w-1/2">
                {filteredSubjects?.map(subject => (
                  <div
                    key={subject._id}
                    className={`flex w-full cursor-pointer items-center gap-2 rounded-lg border-2 border-[#E9E9E9] px-4 py-5 ${
                      subjects.includes(subject._id)
                        ? "border-[#6787FF] bg-[#ECF0FF]"
                        : ""
                    }`}
                    onClick={() => handleSubjectClick(subject._id)}
                  >
                    <p className="text-base text-black">{subject.name}</p>
                  </div>
                ))}
              </div>
              {errors.subject && (
                <p className="text-red-500">{errors.subject}</p>
              )}
            </div>
          </>
        )}
        {step === 2 && (
          <>
            <div className="mb-12 mt-9 flex flex-col gap-3 text-center">
              <h1 className="text-3xl font-bold">Where are you from?</h1>
              <h2 className="text-base text-[#5C5C5C]">
                This will determine your grading system and how we manage your
                grades
              </h2>
            </div>
            <div className="flex items-center justify-center">
              <div className="relative flex w-1/2 items-center justify-center">
                <Search
                  className="absolute left-5 top-1/2 -translate-y-1/2 transform text-gray-400"
                  size={18}
                />
                <Input
                  className="h-14 w-full pl-14"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={handleSearchChange}
                />
              </div>
            </div>
            <div className="mt-4 flex w-full items-center justify-center">
              <div className="flex max-h-[51vh] w-[95%] flex-col gap-2.5 overflow-y-auto pr-1 lg:w-1/2">
                {filteredCountries?.map(gradingSystem => (
                  <div
                    key={gradingSystem._id}
                    className={`flex w-full cursor-pointer items-center gap-2 rounded-lg border-2 border-[#E9E9E9] py-5 pl-6 pr-4 ${
                      gradingSystem._id === country
                        ? "border-[#6787FF] bg-[#ECF0FF]"
                        : ""
                    }`}
                    onClick={() => handleCountryClick(gradingSystem._id)}
                  >
                    <span
                      className={`fi fi-${getCountryCode(gradingSystem.countryName)?.toLowerCase()}`}
                    ></span>
                    <p className="ml-5 text-base text-black">
                      {gradingSystem.countryName}
                    </p>
                  </div>
                ))}
              </div>
            </div>
            {errors.country && <p className="text-red-500">{errors.country}</p>}
          </>
        )}
        {step === 3 && (
          <>
            <div className="mb-12 mt-9 flex flex-col gap-3 text-center">
              <h1 className="text-3xl font-bold">
                How do you want to be called?
              </h1>
              <h2 className="text-base text-[#5C5C5C]">
                Choose a username you'll go by on our platform
              </h2>
            </div>
            <div className="flex items-center justify-center">
              <div className="relative flex w-1/2 items-center justify-center">
                <UserRound
                  className="absolute left-5 top-1/2 -translate-y-1/2 transform text-gray-400"
                  size={18}
                />
                <Input
                  id="name"
                  className="h-14 w-full pl-14"
                  placeholder="Username..."
                  value={username}
                  onChange={handleUsernameChange}
                  autoComplete="off"
                />
              </div>
            </div>
            <div className="flex items-center justify-center">
              {errors.username && (
                <label className="text-left text-red-500" htmlFor="name">
                  {errors.username}
                </label>
              )}
            </div>
          </>
        )}
        {(step === 4 || step === 5) && (
          <>
            <div className="pointer-events-none mb-12 mt-9 flex flex-col gap-3 text-center">
              <h1 className="text-3xl font-bold">
                Congratulations, You're All Set!
              </h1>
              <Image
                src={TutorialFinish}
                alt="Tutorial Finish"
                className="mx-auto mt-4 w-96 rounded-full md:w-[500px] lg:w-[600px]"
                draggable={false}
              />
            </div>
          </>
        )}
      </div>
      <div className="mb-10 mt-4 flex justify-center">
        <Button
          onClick={() => {
            if (step === 4) {
              localStorage.removeItem("tutorial-user-store")
              router.push("/dashboard")
            }
            if (step !== 4) {
              handleNext()
            }
            if (step === 3) {
              handleSubmit({
                country: country as Id<"gradingSystems">,
                username: username,
                subjects: subjects,
              })
            }
          }}
          className="h-12 w-3/4 rounded-full bg-primaryBlue hover:bg-primaryHover lg:w-1/6"
        >
          {step === 4 ? "Take a tour" : "Continue"}
        </Button>
      </div>
    </div>
  )
}

export default Tutorial
