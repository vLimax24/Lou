'use client';
import TutorialDialog from '@/components/dashboard/Dialogs/tutorial/TutorialDialog';
import DashboardHeader from '@/components/dashboard/Layout/header';
import DashboardSidebar from '@/components/dashboard/Layout/sidebar';
import { api } from '@/convex/_generated/api';
import { useConvexAuth, useQuery } from 'convex/react';
import { useRouter } from 'next/navigation';
import * as React from 'react';
import { useEffect } from 'react';

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const { isAuthenticated } = useConvexAuth();
  const [openDialog, setOpenDialog] = React.useState(false);

  const subjects = useQuery(
    api.subjects.getUserSubjects,
    !isAuthenticated ? 'skip' : undefined
  );

  useEffect(() => {
    if (!subjects || !isAuthenticated) return;
    if (subjects.length <= 0) {
      setOpenDialog(true);
    }
  }, [subjects, isAuthenticated, router]);

  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <DashboardSidebar />
      <div className="flex flex-col">
        <DashboardHeader />
        <main className="flex h-full min-h-screen w-full flex-col gap-4 overflow-y-hidden bg-[#FAFAFA] lg:gap-6 lg:p-10">
          {children}
        </main>
        <TutorialDialog openDialog={openDialog} setOpenDialog={setOpenDialog} />
      </div>
    </div>
  );
};

export default DashboardLayout;
