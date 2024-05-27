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
import StarSVG from "../../../public/star.svg"
// import { useConvexAuth } from "convex/react"
import Link from "next/link"

const HomePage = () => {
  // const { isAuthenticated } = useConvexAuth()

  const [isPressed, setIsPressed] = useState(false)

  const handleClick = () => {
    setIsPressed(true)
    setTimeout(() => setIsPressed(false), 300)
  }

  return (
    <div className="relative mx-auto mt-16 md:mt-32 flex w-full max-w-[1080px] flex-col items-center justify-between">
      <div className="z-1 mt-12 md:mt-">
        <h1 className="break-words text-3xl font-black md:w-3/5 md:text-left text-center md:text-[6rem] md:leading-[6rem]">
          Master your student life with Lou
        </h1>
        <div className="flex items-center justify-center">
        <SignUpButton mode="modal">
          <Button
            className={`mt-10 w-72 rounded-[2rem] ${
              isPressed ? "cta-button-pressed" : "cta-button-shadow"
            } h-[3.5rem] bg-primaryBlue text-lg font-bold text-white transition-all duration-200 ease-in-out hover:bg-primaryHover `}
            onClick={handleClick}
          >
            Get Started
          </Button>
        </SignUpButton>
        </div>

      </div>
      <Image
        src={Triangle}
        alt="triangle"
        width={900}
        height={900}
        className="animate-slide-up absolute right-[-5.5rem] top-[-7rem] z-[-1] hidden md:block"
      />
      <div className="mx-[auto] mt-16 md:mt-32 flex w-full max-w-[1080px] flex-col items-center justify-between gap-4 md:flex-row">
        <div className="flex flex-col items-center justify-center text-center">
          <h1 className="mb-[-1rem] text-[3.5rem] font-bold text-primaryBlue">
            10.000+
          </h1>
          <p className="text-2xl font-bold">Happy Users</p>
        </div>
        <div className="flex flex-col items-center justify-center text-center">
          <h1 className="mb-[-1rem] text-[3.5rem] font-bold text-primaryBlue">
            105.000+
          </h1>
          <p className="text-2xl font-bold">Tasks Completed</p>
        </div>
        <div className="flex flex-col items-center justify-center text-center">
          <h1 className="mb-[-1rem] text-[3.5rem] font-bold text-primaryBlue">
            2-3 Units
          </h1>
          <p className="text-2xl font-bold">Grade Increase</p>
        </div>
      </div>
      <div className="mt-16 md:mt-32 flex w-full flex-col items-center justify-between text-center">
        <h1 className="text-3xl font-black md:text-[55px]">
          Tired of messing up school?
        </h1>
        <div className="mt-[4rem] flex w-[90%] flex-col items-center justify-between gap-8 md:flex-row">
          <div className="flex flex-col rounded-[24px] border-2 border-[#FF8B8B] bg-[#FFF5F5] p-4 text-start">
            <h1 className="text-3xl font-bold">Without Lou</h1>
            <div className="mt-5 flex items-center justify-start">
              <div className="rounded-full border-[1.5px] border-[#FF1616] bg-[#FF7C7C] p-1.5 text-white">
                <X className="size-5" />
              </div>
              <p className="ml-2 text-xl text-[#494949]">
                Disorganized Exam Preparation
              </p>
            </div>
            <div className="mt-3 flex items-center justify-start">
              <div className="rounded-full border-[1.5px] border-[#FF1616] bg-[#FF7C7C] p-1.5 text-white">
                <X className="size-5" />
              </div>
              <p className="ml-2 text-xl text-[#494949]">
                Manual Grade Calculation
              </p>
            </div>
            <div className="mt-3 flex items-center justify-start">
              <div className="rounded-full border-[1.5px] border-[#FF1616] bg-[#FF7C7C] p-1.5 text-white">
                <X className="size-5" />
              </div>
              <p className="ml-2 text-xl text-[#494949]">
                Chaotic Team Project Coordination
              </p>
            </div>
            <div className="mt-3 flex items-center justify-start">
              <div className="rounded-full border-[1.5px] border-[#FF1616] bg-[#FF7C7C] p-1.5 text-white">
                <X className="size-5" />
              </div>
              <p className="ml-2 text-xl text-[#494949]">
                Fragmented Learning Resources
              </p>
            </div>
          </div>
          <div className="flex flex-col rounded-[24px] border-2 border-[#28C62F] bg-[#E3FFE4] p-4 text-start">
            <h1 className="text-3xl font-bold">With Lou</h1>
            <div className="mt-5 flex items-center justify-start">
              <div className="rounded-full border-[1.5px] border-[#00BD1F] bg-[#01BD1F] bg-opacity-50 p-1.5 text-white">
                <Check className="size-5" />
              </div>
              <p className="ml-2 text-xl text-[#494949]">
                Disorganized Exam Preparation
              </p>
            </div>
            <div className="mt-3 flex items-center justify-start">
              <div className="rounded-full border-[1.5px] border-[#00BD1F] bg-[#01BD1F] bg-opacity-50 p-1.5 text-white">
                <Check className="size-5" />
              </div>
              <p className="ml-2 text-xl text-[#494949]">
                Manual Grade Calculation
              </p>
            </div>
            <div className="mt-3 flex items-center justify-start">
              <div className="rounded-full border-[1.5px] border-[#00BD1F] bg-[#01BD1F] bg-opacity-50 p-1.5 text-white">
                <Check className="size-5" />
              </div>
              <p className="ml-2 text-xl text-[#494949]">
                Chaotic Team Project Coordination
              </p>
            </div>
            <div className="mt-3 flex items-center justify-start">
              <div className="rounded-full border-[1.5px] border-[#00BD1F] bg-[#01BD1F] bg-opacity-50 p-1.5 text-white">
                <Check className="size-5" />
              </div>
              <p className="ml-2 text-xl text-[#494949]">
                Fragmented Learning Resources
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-16 md:mt-32 w-full">
        <div className="flex flex-col items-center justify-center text-center gap-8">
          <h1 className="text-3xl font-bold text-primaryBlue">Features</h1>
          <h2 className="text-2xl md:text-[55px] font-black leading-[3rem]">
            School mastery,
            <br />
            Effortlessly Within Reach
          </h2>
        </div>
        <div className="flex flex-col items-center justify-center">
          <div className="mt-16 flex w-full items-center justify-center md:justify-between">
            <Image
              src={LumiPC}
              alt="LumiPC"
              width={300}
              height={300}
              className="ml-10 hidden md:block"
            />
            <div className="flex w-[25rem] flex-col">
              <h3 className="text-[18px] font-medium text-primaryBlue">
                Team Projects
              </h3>
              <h1 className="text-[26px] font-black text-black">
                Effective Project Management
              </h1>
              <p className="text-[22px] font-regular leading-tight text-black">
                Visual, interactive dashboards make managing team projects
                straightforward. Real-time updates and collaborative tools help
                teams stay organized and efficient.
              </p>
            </div>
          </div>
          <div className="mt-16 flex w-full items-center justify-center md:justify-between">
            <div className="flex w-[25rem] flex-col">
              <h3 className="text-[18px] font-medium text-primaryBlue">
                Grade Analytics
              </h3>
              <h1 className="w-[30rem] text-[26px] font-black text-black">
                Personalized Academic Tracking
              </h1>
              <p className="text-[22px] font-regular leading-tight text-black">
                Track your grades and academic progress effortlessly. Our
                intuitive interface provides insights and analytics to help you
                achieve your academic goals.
              </p>
            </div>
            <Image
              src={LumiAnalytics}
              alt="LumiAnalytics"
              width={300}
              height={300}
              className="mr-10 hidden md:block"
            />
          </div>
          <div className="mt-16 flex w-full items-center justify-center md:justify-between">
            <Image
              src={LumiGraduate}
              alt="LumiGraduate"
              width={300}
              height={300}
              className="ml-10 hidden md:block"
            />
            <div className="flex w-[25rem] flex-col">
              <h3 className="text-[18px] font-medium text-primaryBlue">
                Learn Ressources
              </h3>
              <h1 className="text-[26px] font-black text-black">
                Learn and Grow
              </h1>
              <p className="text-[22px] font-regular leading-tight text-black">
                Tailored learning resources allow you to hone existing skills or
                acquire new ones. Whether you&apos;re a student or a
                professional, Lou helps you stay ahead.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-16 md:mt-32 flex flex-col">
        <div className="flex flex-col items-center justify-center text-center">
          <h3 className="text-3xl font-bold text-primaryBlue">Pricing</h3>
          <h1 className="text-2xl md:text-[55px] font-black leading-[3rem]">
            Finally get school under control!
          </h1>
        </div>
        <div className="mt-16 grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-3 ">
          <div className="flex flex-col justify-between rounded-3xl border p-6 text-left shadow-xl">
            <div>
              <h3 className="text-2xl font-semibold">Lou Free</h3>
              <p className="my-4 text-4xl font-bold">Free</p>
              <ul className="space-y-2 text-left">
                <li>✓ Free Feature 1</li>
                <li>✓ Free Feature 1</li>
                <li>✓ Free Feature 1</li>
                <li>✓ Free Feature 1</li>
                <li>✓ Free Feature 1</li>
              </ul>
            </div>
            <Button className="bottom-0 left-0 mt-6 w-full rounded-lg bg-gray-300 px-4 py-2 text-gray-700 hover:bg-gray-400">
              Sign in
            </Button>
          </div>

          <div className="relative rounded-3xl border bg-gray-100 p-6 text-left shadow-xl">
            <span className="absolute right-0 top-7 rounded-l-lg bg-primaryBlue px-3 py-1 text-xs font-bold text-white">
              Most Popular
            </span>
            <h3 className="text-2xl font-semibold">Lou Plus</h3>
            <p className="my-4 text-4xl font-bold">
              $5 <span className="text-lg font-medium">usd / month</span>
            </p>
            <ul className="space-y-2 text-left">
              <li>Everything in Free and</li>
              <li>✓ Free Feature 1</li>
              <li>✓ Free Feature 1</li>
              <li>✓ Free Feature 1</li>
              <li>✓ Free Feature 1</li>
              <li>✓ Free Feature 1</li>
              <li>✓ Free Feature 1</li>
            </ul>
            <Button className="bg:primaryHover mt-6 w-full rounded-lg bg-primaryBlue px-4 py-2 font-bold text-white hover:bg-primaryHover">
              Start now
            </Button>
          </div>

          <div className="rounded-3xl border p-6 text-left shadow-xl">
            <h3 className="text-2xl font-semibold">Lou Elite</h3>
            <p className="my-4 text-4xl font-bold">
              $10 <span className="text-lg font-medium">usd / month</span>
            </p>
            <ul className="space-y-2 text-left">
              <li>Everything in Plus and</li>
              <li>✓ Free Feature 1</li>
              <li>✓ Free Feature 1</li>
              <li>✓ Free Feature 1</li>
              <li>✓ Free Feature 1</li>
              <li>✓ Free Feature 1</li>
              <li>✓ Free Feature 1</li>
            </ul>
            <Button className="mt-6 w-full rounded-lg bg-primaryBlue px-4 py-2 text-white hover:bg-primaryHover">
              Start now
            </Button>
          </div>
        </div>
      </div>
      <div className="mt-32 flex flex-col md:flex-row w-full items-center justify-between gap-12">
        <div className="flex flex-col md:items-start items-center justify-center text-center md:text-left">
          <h1 className="md:max-w-[37rem] text-4xl font-black">
            Join over 10.000+ Students on Lou now!
          </h1>
          <SignUpButton mode="modal">
            <Button
              className={`mt-10 w-72 rounded-[2rem] ${
                isPressed ? "cta-button-pressed" : "cta-button-shadow"
              } h-[3.5rem] bg-primaryBlue text-lg font-bold text-white transition-all duration-200 ease-in-out hover:bg-primaryHover`}
              onClick={handleClick}
            >
              Get Started
            </Button>
          </SignUpButton>
        </div>
        <div className="flex items-center justify-center gap-1">
          <div className="mr-10 flex flex-col items-center justify-center gap-1">
            <Link href={"/"}>
              <Image
                src={
                  "https://brilliant.org/images/homepage/google-play-download.svg"
                }
                alt="Google Play Download"
                width={150}
                height={90}
                draggable="false"
              />
            </Link>
            <div className="flex items-center justify-center gap-1">
              <Image src={StarSVG} alt="Star" height={15} width={15} />
              <Image src={StarSVG} alt="Star" height={15} width={15} />
              <Image src={StarSVG} alt="Star" height={15} width={15} />
              <Image src={StarSVG} alt="Star" height={15} width={15} />
              <Image src={StarSVG} alt="Star" height={15} width={15} />
            </div>
            <p className="text-gray-300">10k+ Reviews</p>
          </div>
          <div className="flex flex-col items-center justify-center gap-1">
            <Link href={"/"}>
              <Image
                src={
                  "https://brilliant.org/images/homepage/app-store-download.svg"
                }
                alt="App Store Download"
                width={150}
                height={90}
                draggable="false"
              />
            </Link>
            <div className="flex items-center justify-center gap-1">
              <Image src={StarSVG} alt="Star" height={15} width={15} />
              <Image src={StarSVG} alt="Star" height={15} width={15} />
              <Image src={StarSVG} alt="Star" height={15} width={15} />
              <Image src={StarSVG} alt="Star" height={15} width={15} />
              <Image src={StarSVG} alt="Star" height={15} width={15} />
            </div>
            <p className="text-gray-300">10k+ Reviews</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HomePage
