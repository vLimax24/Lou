"use client"

import React from "react"
import LandingDashboard from "@/components/Icons/Logos/LandingDashboard"
import { Button } from "@/components/ui/button"
import { ScrollText, Home, FileDigit } from "lucide-react"
import { GraduationCap } from "lucide-react"
const HomePage = () => {
  return (
    <div className="flex flex-col overflow-x-hidden">
      <div className="mt-10 flex flex-col items-center justify-center md:ml-24  md:mt-20 md:flex-row md:items-start md:justify-between">
        <div className="mx-4 flex max-w-[30rem] flex-col md:mx-0 md:ml-48 md:mt-24 md:scale-125">
          <h1 className="text-[4rem] font-bold md:text-[6rem]">StudentOS</h1>
          <h2 className="text-md text-gray-300 md:text-xl">
            Empowering students to become tomorrow&apos;s leaders through
            innovative learning and boundless curiosity.
          </h2>
          <div className="mt-10 flex w-full gap-4 ">
            <Button className="text-md h-10 w-full border border-white bg-white bg-opacity-30 hover:bg-white hover:bg-opacity-50">
              Get Started
            </Button>
            <Button className="text-md h-10 w-full border bg-transparent hover:bg-white hover:bg-opacity-30">
              Contact
            </Button>
          </div>
        </div>
        <div className="mt-[-20rem] flex scale-[0.23] items-center justify-center md:mt-[-3rem] md:scale-[0.6]">
          <LandingDashboard />
        </div>
      </div>
      <div className="mt-[-15rem] text-center md:mt-[5rem]">
        <h1 className="inline-block bg-gradient-to-b from-white to-gray-400 bg-clip-text text-center text-[3rem] font-black text-transparent md:text-[5rem]">
          Manage Everything.
        </h1>
        <div className="mx-8 mt-16 flex flex-col items-center justify-center gap-16 md:mx-0 md:flex-row">
          <div className="mx-2 h-[18rem] w-full scale-110 rounded-3xl border-2 border-white bg-white bg-opacity-30 p-6 transition-all duration-200 ease-linear hover:scale-[1.15] md:mx-0 md:w-96">
            <div className="flex items-center justify-start">
              <ScrollText size={32} />
              <h1 className="mx-2 text-3xl font-bold">Exams</h1>
            </div>
            <div className="mt-10 w-full">
              <p className="hyphens-auto text-justify text-white">
                Master your exams with ease as you create, organize, and prepare
                for them using our intuitive platform. Dive into curated
                learning resources, powered by our AI assistant, for a
                personalized and effective study journey.
              </p>
            </div>
          </div>
          <div className="mx-2 h-[18rem] w-full scale-110 rounded-3xl border-2 border-white bg-white bg-opacity-30 p-6 transition-all duration-200 ease-linear hover:scale-[1.15] md:mx-0 md:w-96">
            <div className="flex items-center justify-start">
              <Home size={32} />
              <h1 className="mx-2 text-3xl font-bold">Assignments</h1>
            </div>
            <div className="mt-10 w-full">
              <p className="hyphens-auto text-justify text-white">
                Unlock the power to create, manage, and effortlessly edit tasks,
                seamlessly integrating them into your personalized calendar for
                a streamlined and organized approach to your academic endeavors.
              </p>
            </div>
          </div>
          <div className="mx-2 h-[18rem] w-full scale-110 rounded-3xl border-2 border-white bg-white bg-opacity-30 p-6 transition-all duration-200 ease-linear hover:scale-[1.15] md:mx-0 md:w-96">
            <div className="flex items-center justify-start">
              <FileDigit size={32} />
              <h1 className="mx-2 text-3xl font-bold">Grades</h1>
            </div>
            <div className="mt-10 w-full">
              <p className="hyphens-auto text-justify text-white">
                Empower yourself to easily create and manage grades, ensuring a
                clear path to academic success, while also gaining access to a
                diverse range of learning resources to enhance your educational
                journey.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="mb-20 mt-32 text-center md:mt-[21rem]">
        <h1 className="inline-block bg-gradient-to-b from-white to-gray-400 bg-clip-text text-center text-[3rem] font-black text-transparent md:text-[5rem]">
          How it works
        </h1>
        <div className="mt-56 flex md:mt-64">
          <div className="ml-6 mt-[-16rem] flex flex-col items-center justify-center md:ml-24 md:mt-[-9.7rem]">
            <div className="flex size-16 items-center justify-center rounded-full border border-white bg-white bg-opacity-30 md:size-20">
              <h1 className="select-none text-[2rem] font-bold md:text-[3rem]">
                1
              </h1>
            </div>
            <div className="h-48  w-0.5 bg-white"></div>{" "}
            {/* This is the line */}
            <div className="flex size-16 items-center justify-center rounded-full border border-white bg-white bg-opacity-30 md:size-20">
              <h1 className="select-none text-[2rem] font-bold md:text-[3rem]">
                2
              </h1>
            </div>
            <div className="h-40 w-0.5  bg-white md:h-[12rem]"></div>{" "}
            {/* This is the line */}
            <div className="flex size-16 items-center justify-center rounded-full border border-white bg-white bg-opacity-30 md:size-20">
              <h1 className="select-none text-[2rem] font-bold md:text-[3rem]">
                3
              </h1>
            </div>
            <div className="h-40 w-0.5  bg-white md:h-[12rem]"></div>{" "}
            {/* This is the line */}
            <div className="flex size-16 items-center justify-center rounded-full border border-white bg-white bg-opacity-30 md:size-20">
              <h1 className="select-none text-[2rem] font-bold md:text-[3rem]">
                4
              </h1>
            </div>
          </div>
          <div className="mt-[-10rem] flex flex-col">
            <div className="ml-16 flex flex-col items-start justify-center">
              <h1 className="text-xl font-black md:text-4xl">
                Create an Account
              </h1>
              <h1 className="text-md mt-2 max-w-52 hyphens-auto text-justify md:max-w-none md:hyphens-none md:text-start md:text-xl">
                Begin your journey by signing up for a personalized account.
                Click on the &quot;Sign Up&quot; button at the top right corner
                of the page.
              </h1>
            </div>
            <div className="ml-16 mt-24 flex flex-col items-start justify-center md:mt-48">
              <h1 className="text-xl font-black md:text-4xl">
                Select your subjects
              </h1>
              <h1 className="text-md mt-2 max-w-52 hyphens-auto text-justify md:max-w-none md:hyphens-none md:text-start md:text-xl">
                Explore our comprehensive list of subjects or add new ones that
                align with your curriculum.
              </h1>
            </div>
            <div className="ml-16 mt-24 flex flex-col items-start justify-center md:mt-48">
              <h1 className="text-start text-xl font-black md:text-4xl">
                Select your grading system
              </h1>
              <h1 className="text-md mt-2 max-w-52 hyphens-auto text-justify md:max-w-none md:hyphens-none md:text-start md:text-xl">
                Tailor your grading system to match your institution&apos;s
                standards or personal preference
              </h1>
            </div>
            <div className="ml-16 mt-24 flex flex-col items-start justify-center md:mt-48">
              <h1 className="text-xl font-black md:text-4xl">Start managing</h1>
              <h1 className="text-md mt-2 max-w-52 hyphens-auto text-justify md:max-w-none md:hyphens-none md:text-start md:text-xl">
                Create your first Calendar event or perhaps even enter your
                upcoming exam
              </h1>
            </div>
          </div>
          <div className="mt-[13rem] hidden md:block">
            <GraduationCap size={400} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default HomePage
