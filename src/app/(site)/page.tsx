'use client'

import React from 'react';
import LandingDashboard from '@/components/Icons/Logos/LandingDashboard';
import { Button } from "@/components/ui/button"
import { ScrollText, Home, FileDigit } from 'lucide-react';
import { GraduationCap } from 'lucide-react';
export default function HomePage() {

  return (
    <div className='flex flex-col overflow-x-hidden'>
      <div className='mt-10 md:mt-20 md:ml-24 flex flex-col md:flex-row  items-center md:items-start justify-center md:justify-between'>
        <div className='flex flex-col md:ml-48 md:mt-24 max-w-[30rem] md:scale-125 mx-4 md:mx-0'>
          <h1 className='text-[4rem] md:text-[6rem] font-bold'>StudentOS</h1>
          <h2 className='text-md md:text-xl text-gray-300'>Empowering students to become tomorrow&apos;s leaders through innovative learning and boundless curiosity.</h2>
          <div className='mt-10 flex w-full gap-4 '>
            <Button className='w-full border border-white bg-white bg-opacity-30 hover:bg-opacity-50 hover:bg-white h-10 text-md'>
              Get Started
            </Button>
            <Button className='w-full border bg-transparent hover:bg-white hover:bg-opacity-30 h-10 text-md'>
              Contact
            </Button>
          </div>
        </div>
        <div className='scale-[0.23] md:scale-[0.6] flex items-center justify-center mt-[-20rem] md:mt-[-3rem]'>
          <LandingDashboard />
        </div>
      </div>
      <div className='mt-[-15rem] md:mt-[5rem] text-center'>
        <h1 className='text-[3rem] md:text-[5rem] font-black text-center bg-gradient-to-b from-white to-gray-400 text-transparent bg-clip-text inline-block'>Manage Everything.</h1>
        <div className='mt-16 flex flex-col md:flex-row justify-center gap-16 items-center mx-8 md:mx-0'>
          <div className='scale-110 rounded-3xl bg-white h-[18rem] w-full mx-2 md:mx-0 md:w-96 border-2 border-white bg-opacity-30 hover:scale-[1.15] duration-200 transition-all ease-linear p-6'>
            <div className='flex items-center justify-start'>
              <ScrollText size={32}/>
              <h1 className='text-3xl font-bold mx-2'>Exams</h1>
            </div>
            <div className='mt-10 w-full'>
              <p className='text-white hyphens-auto text-justify'>
              Master your exams with ease as you create, organize, and prepare for them using our intuitive platform. Dive into curated learning resources, powered by our AI assistant, for a personalized and effective study journey.
              </p>
            </div>
          </div>
          <div className='scale-110 rounded-3xl bg-white h-[18rem] w-full mx-2 md:mx-0 md:w-96 border-2 border-white bg-opacity-30 hover:scale-[1.15] duration-200 transition-all ease-linear p-6'>
            <div className='flex items-center justify-start'>
              <Home size={32}/>
              <h1 className='text-3xl font-bold mx-2'>Assignments</h1>
            </div>
            <div className='mt-10 w-full'>
              <p className='text-white hyphens-auto text-justify'>
              Unlock the power to create, manage, and effortlessly edit tasks, seamlessly integrating them into your personalized calendar for a streamlined and organized approach to your academic endeavors.
              </p>
            </div>
          </div>
          <div className='scale-110 rounded-3xl bg-white h-[18rem] w-full mx-2 md:mx-0 md:w-96 border-2 border-white bg-opacity-30 hover:scale-[1.15] duration-200 transition-all ease-linear p-6'>
            <div className='flex items-center justify-start'>
              <FileDigit size={32}/>
              <h1 className='text-3xl font-bold mx-2'>Grades</h1>
            </div>
            <div className='mt-10 w-full'>
              <p className='text-white hyphens-auto text-justify'>
              Empower yourself to easily create and manage grades, ensuring a clear path to academic success, while also gaining access to a diverse range of learning resources to enhance your educational journey.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className='mt-32 md:mt-[21rem] text-center mb-20'>
        <h1 className='text-[3rem] md:text-[5rem] font-black text-center bg-gradient-to-b from-white to-gray-400 text-transparent bg-clip-text inline-block'>How it works</h1>
        <div className="flex mt-56 md:mt-64">
        <div className='flex flex-col items-center justify-center ml-6 md:ml-24 mt-[-16rem] md:mt-[-9.7rem]'>
          <div className='size-16 md:size-20 bg-white rounded-full bg-opacity-30 border border-white flex items-center justify-center'>
            <h1 className='font-bold text-[2rem] md:text-[3rem] select-none'>1</h1>
          </div>
          <div className="h-48  w-0.5 bg-white"></div> {/* This is the line */}
          <div className='size-16 md:size-20 bg-white rounded-full bg-opacity-30 border border-white flex items-center justify-center'>
            <h1 className='font-bold text-[2rem] md:text-[3rem] select-none'>2</h1>
          </div>
          <div className="h-40 md:h-[12rem]  w-0.5 bg-white"></div> {/* This is the line */}
          <div className='size-16 md:size-20 bg-white rounded-full bg-opacity-30 border border-white flex items-center justify-center'>
            <h1 className='font-bold text-[2rem] md:text-[3rem] select-none'>3</h1>
          </div>
          <div className="h-40 md:h-[12rem]  w-0.5 bg-white"></div> {/* This is the line */}
          <div className='size-16 md:size-20 bg-white rounded-full bg-opacity-30 border border-white flex items-center justify-center'>
            <h1 className='font-bold text-[2rem] md:text-[3rem] select-none'>4</h1>
          </div>
        </div>
        <div className='flex flex-col mt-[-10rem]'>
          <div className='flex flex-col justify-center items-start ml-16'>
            <h1 className='font-black text-xl md:text-4xl'>Create an Account</h1>
            <h1 className='text-md md:text-xl mt-2 hyphens-auto text-justify max-w-52 md:hyphens-none md:text-start md:max-w-none'>Begin your journey by signing up for a personalized account. Click on the &quot;Sign Up&quot; button at the top right corner of the page.</h1>
          </div>
          <div className='flex flex-col justify-center items-start ml-16 mt-24 md:mt-48'>
            <h1 className='font-black text-xl md:text-4xl'>Select your subjects</h1>
            <h1 className='text-md md:text-xl mt-2 hyphens-auto text-justify max-w-52 md:hyphens-none md:text-start md:max-w-none'>Explore our comprehensive list of subjects or add new ones that align with your curriculum.</h1>
          </div>
          <div className='flex flex-col justify-center items-start ml-16 mt-24 md:mt-48'>
            <h1 className='font-black text-xl md:text-4xl text-start'>Select your grading system</h1>
            <h1 className='text-md md:text-xl mt-2 hyphens-auto text-justify max-w-52 md:hyphens-none md:text-start md:max-w-none'>Tailor your grading system to match your institution&apos;s standards or personal preference</h1>
          </div>
          <div className='flex flex-col justify-center items-start ml-16 mt-24 md:mt-48'>
            <h1 className='font-black text-xl md:text-4xl'>Start managing</h1>
            <h1 className='text-md md:text-xl mt-2 hyphens-auto text-justify max-w-52 md:hyphens-none md:text-start md:max-w-none'>Create your first Calendar event or perhaps even enter your upcoming exam</h1>
          </div>
        </div>
        <div className='mt-[13rem] hidden md:block'>
          <GraduationCap size={400}/>
        </div>
        </div>
      </div>
    </div>
  );
}
