import { getServerAuthSession } from '@/server/auth';
import '@/styles/globals.css';
import { redirect } from 'next/navigation';
import DashboardHeader from './dashboard/components/header';
import DashboardSidebar from './dashboard/components/sidebar';

export const metadata = {
  title: 'StudentOS - Dashboard',
  description: 'Dashboard for StudentOS',
  icons: [{ rel: 'icon', url: '/favicon.ico' }],
};

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerAuthSession();
  console.log('🚀 ~ session:', session);
  if (!session) {
    redirect('/login');
  }

  return (
      <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
        <DashboardSidebar />
        <div className="flex flex-col">
          <DashboardHeader />
          <div className="p-4">{children}</div>
        </div>
      </div>
  );
}
