'use client'

import React, { useState } from 'react'
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button"
import Link from 'next/link';

interface Subject {
    name: string;
    color: string;
    fromColor: string;
    toColor: string;
    selected: boolean;
}

const subjects: Subject[] = [
    {
        name: 'English',
        color: 'green-500',
        fromColor: 'from-green-500',
        toColor: 'to-green-400',
        selected: false
    },
    {
        name: 'Maths',
        color: 'blue-500',
        fromColor: 'from-blue-500',
        toColor: 'to-blue-400',
        selected: false
    },
    {
        name: 'Physics',
        color: 'purple-500',
        fromColor: 'from-purple-500',
        toColor: 'to-purple-400',
        selected: false
    },
    {
        name: 'Chemistry',
        color: 'yellow-500',
        fromColor: 'from-yellow-500',
        toColor: 'to-yellow-400',
        selected: false
    },
    {
        name: 'Biology',
        color: 'indigo-500',
        fromColor: 'from-indigo-500',
        toColor: 'to-indigo-400',
        selected: false
    },
    {
        name: 'Computer Science',
        color: 'pink-500',
        fromColor: 'from-pink-500',
        toColor: 'to-pink-400',
        selected: false
    },
    {
        name: 'Geography',
        color: 'teal-500',
        fromColor: 'from-teal-500',
        toColor: 'to-teal-400',
        selected: false
    },
    {
        name: 'Economics',
        color: 'gray-500',
        fromColor: 'from-gray-500',
        toColor: 'to-gray-400',
        selected: false
    },
    {
        name: 'History',
        color: 'orange-500',
        fromColor: 'from-orange-500',
        toColor: 'to-orange-400',
        selected: false
    },
    {
        name: 'German',
        color: 'red-500',
        fromColor: 'from-red-500',
        toColor: 'to-red-400',
        selected: false
    }
]

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
    const [selectedSubjects, setSelectedSubjects] = useState<string[]>([]);

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

    return (
        <div className='m-24 px-12 border border-gray-300 rounded-2xl'>
            <h1 className="text-center text-4xl font-bold mt-10">Let us customize your experience!</h1>
            <div className="p-5 mt-10">
                <h2 className='font-semibold text-2xl mb-10'>1. Choose your Subjects</h2>
                <div className="w-full grid grid-cols-2 md:grid-cols-5 gap-2">
                    {subjects.map((subject) => (
                        <div
                            key={subject.name}
                            className={`relative bg-gradient-to-br ${subject.fromColor} from-30% ${subject.toColor} rounded-md h-24 pl-4 pt-3 hover:cursor-pointer transition-all duration-300 ease-in-out`}
                            onClick={() => toggleSubject(subject.name)}
                        >
                            <div className={`absolute inset-0 rounded-md transition-opacity duration-300 ease-in-out ${isSelected(subject.name) ? 'bg-black bg-opacity-50' : ''}`}></div>
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
                <div className='mt-32 flex items-center justify-center mb-5'>
                    <Link href={''} className='w-full h-12 flex items-center justify-center'>
                        <Button className='w-1/2 h-12' variant={'outline'}>
                            <h4 className='text-xl'>Continue</h4>
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Page;