'use client'
import React from 'react';
import { useSession } from 'next-auth/react';
import CalendarCard from '@/components/dashboard/home/Calendar';
import AssignmentCard from '@/components/dashboard/home/Assignments';
import GradeSheetCard from '@/components/dashboard/home/GradeSheet';
import NotesCard from '@/components/dashboard/home/Notes';

export default function Dashboard() {
  const { data: session } = useSession();

  return (
    <main className="flex flex-col gap-4 p-4 lg:gap-6 lg:p-6">
      <div className="flex items-center">
        <h1 className="text-lg font-semibold md:text-2xl">Welcome Back, {session?.user.name}</h1>
      </div>
      <div className="flex flex-col flex-1 rounded-lg">
        <div className='flex flex-1 py-1'>
          <CalendarCard />
          <AssignmentCard />
        </div>
        <div className='flex flex-1 py-1'>
          <GradeSheetCard />
          <NotesCard />
        </div>
      </div>
    </main>
  );
}