'use client'

import React, { useState } from 'react';
import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CircleAlert } from 'lucide-react'

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

const Page = () => {
    const [selectedGradingSystem, setSelectedGradingSystem] = useState<string | null>(null);
    const [showWarning, setShowWarning] = useState(false);

    const toggleGradingSystem = (system: string) => {
        setSelectedGradingSystem(prevSystem => (prevSystem === system ? null : system));
    };

    const isGradingSystemSelected = (system: string) => {
        return selectedGradingSystem === system;
    };

    const handleFinish = () => {
        if (!selectedGradingSystem) {
            setShowWarning(true);
        } else {
            window.location.href = '/dashboard';
        }
    };

    return (
        <div className='m-24 px-12 border border-gray-300 rounded-2xl'>
            <h1 className="text-center text-4xl font-bold mt-10">Let us customize your experience!</h1>
            <div className="p-5 mt-10">
                <h2 className='font-semibold text-2xl mb-10'>2. Give us details about your grading system (click the one that matches your system)</h2>
                <div className='flex w-full items-stretch justify-center'>
                    <div className='w-1/3 mx-2'>
                        <Card
                            className={`h-full flex flex-col hover:cursor-pointer relative ${isGradingSystemSelected('letter') ? 'bg-black bg-opacity-30' : ''}`}
                            onClick={() => toggleGradingSystem('letter')}
                        >
                            <CardHeader>
                                <CardTitle>Letter Based Grading System</CardTitle>
                                <CardDescription>Common uses are A-F, A-E, A-D</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <p>Popular Countries with a Letter based Grading System: <br /> </p>
                                <p className='text-muted-foreground'><br />Denmark, Latvia, Russia, Finland, Sweden, Norway, Iceland, Kazakhstan, Germany, Lithuania, Estonia, Ukraine, Czech Republic, Slovakia, Hungary, Poland, Belarus, Azerbaijan, Georgia, Moldova</p>
                            </CardContent>
                            <CardFooter className='mt-auto'>
                                <h2 className='font-semibold text-lg'>Found your country? Then click this card!</h2>
                            </CardFooter>
                            {isGradingSystemSelected('letter') && (
                                <div className="absolute inset-0 flex items-center justify-center text-white scale-[0.17]">
                                    <AnimatedCheckIcon/>
                                </div>
                            )}
                        </Card>
                    </div>
                    <div className='w-1/3 mx-2'>
                        <Card
                            className={`h-full flex flex-col hover:cursor-pointer relative ${isGradingSystemSelected('number') ? 'bg-black bg-opacity-30' : ''}`}
                            onClick={() => toggleGradingSystem('number')}
                        >
                            <CardHeader>
                                <CardTitle>Number Based Grading System</CardTitle>
                                <CardDescription>Common uses are 1-6, 1-5</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <p>Popular Countries with a Letter based Grading System: <br /> </p>
                                <p className='text-muted-foreground'><br />United States, Canada, Australia, New Zealand, United Kingdom, Ireland, Hong Kong, Singapore, Ghana, South Africa, Japan, South Korea, Malaysia, Philippines, Thailand, United Arab Emirates, Saudi Arabia, Qatar, Kuwait, Bahrain</p>
                            </CardContent>
                            <CardFooter className='mt-auto'>
                                <h2 className='font-semibold text-lg'>Found your country? Then click this card!</h2>
                            </CardFooter>
                            {isGradingSystemSelected('number') && (
                                <div className="absolute inset-0 flex items-center justify-center text-white scale-[0.17]">
                                    <AnimatedCheckIcon/>
                                </div>
                            )}
                        </Card>
                    </div>
                </div>
                
                <div className='w-full mt-16 flex items-center justify-center h-12 flex-col'>
                    {showWarning && (
                        <div className="text-red-500 flex items-center mb-2">
                            <CircleAlert size={20}/>
                            <p className='ml-2 text-center pb-1'>Please select a grading system before finishing.</p>
                        </div>
                    )}
                    <Button className='w-1/2 h-12' variant={'outline'} onClick={handleFinish}>
                        <h4 className='text-xl'>Finish</h4>
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default Page;
