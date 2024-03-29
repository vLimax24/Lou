'use client'
import React from 'react';
import { useSession } from 'next-auth/react';
import CalendarCard from '@/components/dashboard/home/Calendar';
import AssignmentCard from '@/components/dashboard/home/Assignments';

export default function Dashboard() {
  const { data: session } = useSession();

  return (
    <main className="flex flex-col gap-4 p-4 lg:gap-6 lg:p-6">
      <div className="flex items-center">
        <h1 className="text-lg font-semibold md:text-2xl">Welcome Back, {session?.user.name}</h1>
      </div>
      <div className="flex flex-1 p-10 rounded-lg border border-dashed shadow-sm">
        <CalendarCard />
        <AssignmentCard />
      </div>
    </main>
  );
}