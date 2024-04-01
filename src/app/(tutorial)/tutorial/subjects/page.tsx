'use client'

import React, { useState } from 'react'
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button"
import { CircleAlert, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useRouter } from 'next/navigation';
import { useQuery } from 'convex/react';
import { api } from '@/convex/_generated/api';


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
    );
  }

  const Page: React.FC = () => {
    const router = useRouter()
    const [selectedSubjects, setSelectedSubjects] = useState<string[]>([]);
    const [showWarning, setShowWarning] = useState(false);
    
    const subjects = useQuery(api.subjects.getAllSubjects)

    const toggleSubject = (subjectName: string): void => {
        setSelectedSubjects(prevSelectedSubjects => {
            if (prevSelectedSubjects.includes(subjectName)) {
                return prevSelectedSubjects.filter(name => name !== subjectName);
            } else {
                return [...prevSelectedSubjects, subjectName];
            }
        });
    };

    const isSelected = (subjectName: string): boolean => {
        return selectedSubjects.includes(subjectName);
    };

    const handleFinish = () => {
        if (selectedSubjects.length === 0) {
            setShowWarning(true);
        } else {
            router.push('/tutorial/grading-system')
        }
    };

    return (
        <div className='m-24 px-12 border border-gray-300 rounded-2xl'>
            <h1 className="text-center text-4xl font-bold mt-10">Let us customize your experience!</h1>
            <div className="p-5 mt-10">
                <h2 className='font-semibold text-2xl mb-10'>1. Choose your Subjects</h2>
                <div className="w-full grid grid-cols-2 md:grid-cols-5 gap-2">
                    {
                    !subjects ? <Loader2 className='size-8 animate-spin'/> : 
                    subjects.map((subject) => (
                        <div
                            key={subject.name}
                            className={`relative bg-gradient-to-br ${subject.fromColor} from-30% ${subject.toColor} rounded-md h-24 pl-4 pt-3 hover:cursor-pointer transition-all duration-300 ease-in-out`}
                            onClick={() => toggleSubject(subject.name)}
                        >
                            <div className={cn(
                                'absolute inset-0 rounded-md transition-opacity duration-300 ease-in-out ',
                                isSelected(subject.name) && 'bg-black bg-opacity-50'
                            )}></div>
                            <h1 className="text-white text-3xl font-bold">
                                {subject.name}
                            </h1>
                            {isSelected(subject.name) && (
                                <div className="absolute inset-0 flex items-center justify-center text-white scale-[0.17]">
                                    <AnimatedCheckIcon/>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
                <div className='mt-32 flex items-center justify-center mb-5 flex-col'>
                    {showWarning && (
                        <div className="text-red-500 flex items-center mb-2">
                            <CircleAlert size={20}/>
                            <p className='ml-2 text-center pb-1'>Please select at least one subject before finishing.</p>
                        </div>
                    )}
                    <Button className='w-1/2 h-12' variant={'outline'} onClick={handleFinish}>
                        <h4 className='text-xl'>Finish</h4>
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default Page;