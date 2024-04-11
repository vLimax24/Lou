'use client';

import React, { useState, useTransition } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { CircleAlert, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useRouter } from 'next/navigation';
import { useMutation, useQuery } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { toast } from 'sonner';
import { type Id } from '@/convex/_generated/dataModel';

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
  const router = useRouter();
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>(
    []
  );
  const [showWarning, setShowWarning] = useState(false);
  const [pending, startTransition] = useTransition()

  const subjects = useQuery(api.subjects.getAllSubjects);
  const assignSubjects = useMutation(api.studentSubjects.assignStudentSubjects);
  const toggleSubject = (subjectId: string): void => {
    setSelectedSubjects(prevSelectedSubjects => {
      if (prevSelectedSubjects.includes(subjectId)) {
        return prevSelectedSubjects.filter(_id => _id !== subjectId);
      } else {
        return [...prevSelectedSubjects, subjectId];
      }
    });
  };

  const isSelected = (subjectId: string): boolean => {
    return selectedSubjects.includes(subjectId);
  };

  const handleFinish = () => {
    if (selectedSubjects.length === 0) {
      setShowWarning(true);
    } else {
      startTransition(async () => {
        try {
          await assignSubjects({ subjectIds: selectedSubjects as Id<'subjects'>[] });
          router.push('tutorial/grading-system')
        } catch (error) {
          toast.error('Error Adding Students.');
        }
      });
  
      // router.push('/dashboard/tutorial/grading-system')
    }
  };

  return (
    <div className="rounded-2xl border border-gray-300 px-12">
      <h1></h1>
      <h1 className="mt-10 text-center text-4xl font-bold">
        Let us customize your experience!
      </h1>
      <div className="mt-10 p-5">
        <h2 className="mb-10 text-2xl font-semibold">
          1. Choose your Subjects
        </h2>
        <div className="grid w-full grid-cols-2 gap-2 md:grid-cols-5">
          {!subjects ? (
            <Loader2 className="size-8 animate-spin" />
          ) : (
            subjects.map(subject => (
              <div
                key={subject._id}
                className={`relative h-24 rounded-md border p-2 transition-all duration-300 ease-in-out hover:cursor-pointer`}
                onClick={() => toggleSubject(subject._id)}
              >
                <div
                  className={cn(
                    'absolute inset-0 rounded-md transition-opacity duration-300 ease-in-out ',
                    isSelected(subject._id) && 'bg-black bg-opacity-50'
                  )}
                ></div>
                <h1 className="text-lg font-bold">{subject.name}</h1>
                {isSelected(subject._id) && (
                  <div className="absolute inset-0 flex scale-[0.17] items-center justify-center text-white">
                    <AnimatedCheckIcon />
                  </div>
                )}
              </div>
            ))
          )}
        </div>
        <div className="mb-5 mt-32 flex flex-col items-center justify-center">
          {showWarning && (
            <div className="mb-2 flex items-center text-red-500">
              <CircleAlert size={20} />
              <p className="ml-2 pb-1 text-center">
                Please select at least one subject before finishing.
              </p>
            </div>
          )}
          <Button
            className="h-12 w-1/2"
            variant={'outline'}
            onClick={handleFinish}
            disabled={pending}
          >
            {pending ? <Loader2 className='size-4 animate-spin'/> : "Continue"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Page;
