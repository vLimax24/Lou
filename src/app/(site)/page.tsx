"use client"

import React, { useState } from "react"
import Triangle from "../../../public/triangle.svg"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { SignUpButton } from "@clerk/nextjs"
import { X, Check } from "lucide-react"
import LumiPC from "../../../public/LumiPC.svg"
import LumiAnalytics from "../../../public/LumiAnalytics.svg"
import LumiGraduate from "../../../public/LumiGraduate.svg"
import { useConvexAuth } from "convex/react" 

const HomePage = () => {

  const { isAuthenticated } = useConvexAuth()


  const [isPressed, setIsPressed] = useState(false)

  const handleClick = () => {
    setIsPressed(true)
    setTimeout(() => setIsPressed(false), 300)
  }

  return (
    <div className="mt-32 flex flex-col items-center justify-between relative w-full max-w-[1080px] mx-auto">
      <div className="mt-20 z-1">
        <h1 className="font-black text-[6rem] text-left leading-[6rem] w-3/5 break-words">
          Master your student life with Lou
        </h1>
          <SignUpButton mode="modal">
            <Button
              className={`mt-10 w-72 rounded-[2rem] ${
                isPressed ? "cta-button-pressed" : "cta-button-shadow"
              } bg-primaryBlue text-lg text-white hover:bg-primaryHover font-bold h-[3.5rem] transition-all duration-200 ease-in-out`}
              onClick={handleClick}
            >
                Get Started
            </Button>
          </SignUpButton>
      </div>
      <Image
        src={Triangle}
        alt="triangle"
        width={900}
        height={900}
        className="animate-slide-up absolute top-[-7rem] right-[-5.5rem] z-[-1]"
      />
      <div className="mt-72 flex items-center justify-between w-full max-w-[1080px] mx-[auto]">
          <div className="flex flex-col items-center justify-center text-center">
            <h1 className="text-primaryBlue font-bold text-[3.5rem] mb-[-1rem]">10.000+</h1>
            <p className="font-bold text-2xl">Happy Users</p>
          </div>
          <div className="flex flex-col items-center justify-center text-center">
            <h1 className="text-primaryBlue font-bold text-[3.5rem] mb-[-1rem]">105.000+</h1>
            <p className="font-bold text-2xl">Tasks Completed</p>
          </div>
          <div className="flex flex-col items-center justify-center text-center">
            <h1 className="text-primaryBlue font-bold text-[3.5rem] mb-[-1rem]">2-3 Units</h1>
            <p className="font-bold text-2xl">Grade Increase</p>
          </div>
      </div>
      <div className="mt-64 flex flex-col text-center items-center justify-between w-full">
          <h1 className="font-black text-[55px]">Tired of messing up school?</h1>
          <div className="mt-[3rem] flex items-center justify-between w-[90%]">
              <div className="border-2 border-[#FF8B8B] bg-[#FFF5F5] flex flex-col rounded-[24px] p-4 text-start scale-[1.2]">
                <h1 className="font-bold text-3xl">Without Lou</h1>
                <div className="flex items-center justify-start mt-5">
                  <div className="p-1.5 rounded-full bg-[#FF7C7C] border-[1.5px] border-[#FF1616] text-white">
                    <X className="size-5"/>
                  </div>
                  <p className="text-[#494949] ml-2 text-xl">Disorganized Exam Preparation</p>
                </div>
                <div className="flex items-center justify-start mt-3">
                  <div className="p-1.5 rounded-full bg-[#FF7C7C] border-[1.5px] border-[#FF1616] text-white">
                    <X className="size-5"/>
                  </div>
                  <p className="text-[#494949] ml-2 text-xl">Manual Grade Calculation</p>
                </div>
                <div className="flex items-center justify-start mt-3">
                  <div className="p-1.5 rounded-full bg-[#FF7C7C] border-[1.5px] border-[#FF1616] text-white">
                    <X className="size-5"/>
                  </div>
                  <p className="text-[#494949] ml-2 text-xl">Chaotic Team Project Coordination</p>
                </div>
                <div className="flex items-center justify-start mt-3">
                  <div className="p-1.5 rounded-full bg-[#FF7C7C] border-[1.5px] border-[#FF1616] text-white">
                    <X className="size-5"/>
                  </div>
                  <p className="text-[#494949] ml-2 text-xl">Fragmented Learning Resources</p>
                </div>
              </div>
              <div className="border-2 border-[#28C62F] bg-[#E3FFE4] flex flex-col rounded-[24px] p-4 text-start scale-[1.2]">
                <h1 className="font-bold text-3xl">With Lou</h1>
                <div className="flex items-center justify-start mt-5">
                  <div className="p-1.5 rounded-full bg-[#01BD1F] bg-opacity-50 border-[1.5px] border-[#00BD1F] text-white">
                    <Check className="size-5"/>
                  </div>
                  <p className="text-[#494949] ml-2 text-xl">Disorganized Exam Preparation</p>
                </div>
                <div className="flex items-center justify-start mt-3">
                  <div className="p-1.5 rounded-full bg-[#01BD1F] bg-opacity-50 border-[1.5px] border-[#00BD1F] text-white">
                    <Check className="size-5"/>
                  </div>
                  <p className="text-[#494949] ml-2 text-xl">Manual Grade Calculation</p>
                </div>
                <div className="flex items-center justify-start mt-3">
                  <div className="p-1.5 rounded-full bg-[#01BD1F] bg-opacity-50 border-[1.5px] border-[#00BD1F] text-white">
                    <Check className="size-5"/>
                  </div>
                  <p className="text-[#494949] ml-2 text-xl">Chaotic Team Project Coordination</p>
                </div>
                <div className="flex items-center justify-start mt-3">
                  <div className="p-1.5 rounded-full bg-[#01BD1F] bg-opacity-50 border-[1.5px] border-[#00BD1F] text-white">
                    <Check className="size-5"/>
                  </div>
                  <p className="text-[#494949] ml-2 text-xl">Fragmented Learning Resources</p>
                </div>
              </div>
          </div>
      </div>
      <div className="mt-64 w-full">
          <div className="flex flex-col items-center justify-center text-center">
              <h3 className="text-2xl font-bold text-primaryBlue">Features</h3>
              <h1 className="text-[55px] font-black leading-[3rem]">School mastery,<br />Effortlessly Within Reach</h1>
          </div>
          <div className="mt-24 flex flex-col items-center justify-center">
              <div className="flex items-center justify-between w-full mt-24">
                <Image 
                  src={LumiPC}
                  alt="LumiPC"
                  width={300}
                  height={300}
                  className="ml-10"
                />
                  <div className="flex flex-col w-[25rem]">
                    <h3 className="text-[18px] font-medium text-primaryBlue mb-[-0.5rem]">Team Projects</h3>
                    <h1 className="text-[26px] font-black text-black">Effective Project Management</h1>
                    <p className="text-[22px] font-regular text-black leading-tight">Visual, interactive dashboards make managing team projects straightforward. Real-time updates and collaborative tools help teams stay organized and efficient.</p>
                  </div>
              </div>
              <div className="flex items-center justify-between w-full mt-24">
                <div className="flex flex-col w-[25rem]">
                    <h3 className="text-[18px] font-medium text-primaryBlue mb-[-0.5rem]">Grade Analytics</h3>
                    <h1 className="text-[26px] font-black text-black w-[30rem]">Personalized Academic Tracking</h1>
                    <p className="text-[22px] font-regular text-black leading-tight">Track your grades and academic progress effortlessly. Our intuitive interface provides insights and analytics to help you achieve your academic goals.</p>
                  </div>
                <Image 
                  src={LumiAnalytics}
                  alt="LumiAnalytics"
                  width={300}
                  height={300}
                  className="mr-10"
                />
              </div>
              <div className="flex items-center justify-between w-full mt-24">
                <Image 
                  src={LumiGraduate}
                  alt="LumiGraduate"
                  width={300}
                  height={300}
                  className="ml-10"
                />
                  <div className="flex flex-col w-[25rem]">
                    <h3 className="text-[18px] font-medium text-primaryBlue mb-[-0.5rem]">Learn Ressources</h3>
                    <h1 className="text-[26px] font-black text-black">Learn and Grow</h1>
                    <p className="text-[22px] font-regular text-black leading-tight">Tailored learning resources allow you to hone existing skills or acquire new ones. Whether you&apos;re a student or a professional, Lou helps you stay ahead.</p>
                  </div>
              </div>
          </div>
      </div>
      <div className="mt-64 flex flex-col">
        <div className="flex flex-col items-center justify-center text-center">
          <h3 className="text-2xl font-bold text-primaryBlue">Pricing</h3>
          <h1 className="text-[55px] font-black leading-[3rem]">Finally get school under control!</h1>
        </div>
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 mt-24">
          <div className="border rounded-2xl shadow-xl w-64 p-6 text-left mr-10 flex flex-col justify-between">
            <div>
              <h3 className="text-2xl font-semibold">Lou Free</h3>
              <p className="text-4xl font-bold my-4">Free</p>
              <ul className="text-left space-y-2">
                <li>✓ Free Feature 1</li>
                <li>✓ Free Feature 1</li>
                <li>✓ Free Feature 1</li>
                <li>✓ Free Feature 1</li>
                <li>✓ Free Feature 1</li>
              </ul>
            </div>
            <button className="mt-6 py-2 px-4 bg-gray-300 text-gray-700 rounded-lg bottom-0 left-0 w-full">Sign in</button>
          </div>

          <div className="border rounded-3xl p-6 text-left bg-gray-100 relative scale-125 shadow-xl">
            <span className="absolute top-7 right-0 bg-primaryBlue text-white text-xs py-1 px-3 rounded-l-lg font-bold">Most Popular</span>
            <h3 className="text-2xl font-semibold">Lou Plus</h3>
            <p className="text-4xl font-bold my-4">$5 <span className="text-lg font-medium">usd / month</span></p>
            <ul className="text-left space-y-2">
              <li>Everything in Free and</li>
              <li>✓ Free Feature 1</li>
              <li>✓ Free Feature 1</li>
              <li>✓ Free Feature 1</li>
              <li>✓ Free Feature 1</li>
              <li>✓ Free Feature 1</li>
              <li>✓ Free Feature 1</li>
            </ul>
            <button className="mt-6 py-2 px-4 bg-primaryBlue text-white rounded-lg w-full font-bold">Start now</button>
          </div>

          <div className="border rounded-lg p-6 text-left ml-10 shadow-xl w-64">
            <h3 className="text-2xl font-semibold">Lou Elite</h3>
            <p className="text-4xl font-bold my-4">$10 <span className="text-lg font-medium">usd / month</span></p>
            <ul className="text-left space-y-2">
              <li>Everything in Plus and</li>
              <li>✓ Free Feature 1</li>
              <li>✓ Free Feature 1</li>
              <li>✓ Free Feature 1</li>
              <li>✓ Free Feature 1</li>
              <li>✓ Free Feature 1</li>
              <li>✓ Free Feature 1</li>
            </ul>
            <button className="mt-6 py-2 px-4 bg-primaryBlue text-white rounded-lg w-full">Start now</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HomePage

