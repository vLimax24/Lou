'use client';
import React from 'react';
import { CalendarDays, ListChecks, StickyNote, BookA, Home, GraduationCap, Lightbulb } from 'lucide-react';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { usePathname } from 'next/navigation';
import NotificationDialog from '@/components/dashboard/notification'; // Import the new component here

const DashboardSidebar = () => {
  const pathname = usePathname();

  return (
    <div className="hidden border-r bg-muted/40 md:block">
      <div className="flex h-full max-h-screen flex-col gap-2">
        <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
          <Link href="/" className="flex items-center gap-2 font-semibold">
            <Lightbulb className="h-6 w-6" />
            <span>StudenOS</span>
          </Link>
          <NotificationDialog />
        </div>
        <div className="flex-1">
          <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
            <Link
              href="/dashboard"
              className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary ${pathname == '/dashboard' ? 'bg-muted text-primary' : 'bg-none text-muted-foreground'}`}
            >
              <Home className="h-4 w-4" />
              Home
            </Link>
            <Link
              href="/dashboard/calendar"
              className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary ${pathname == '/dashboard/calendar' ? 'bg-muted text-primary' : 'bg-none text-muted-foreground'}`}
            >
              <CalendarDays className="h-4 w-4" />
              Calendar
            </Link>
            <Link
              href="/dashboard/grade-sheet"
              className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary ${pathname == '/dashboard/grade-sheet' ? 'bg-muted text-primary' : 'bg-none text-muted-foreground'}`}
            >
              <GraduationCap className="h-4 w-4" />
              Grade Sheet
            </Link>
            <Link
              href="/dashboard/tasks"
              className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary ${pathname == '/dashboard/tasks' ? 'bg-muted text-primary' : 'bg-none text-muted-foreground'}`}
            >
              <ListChecks className="h-4 w-4" />
              Tasks
              <Badge className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full">
                6
              </Badge>
            </Link>
            <Link
              href="/dashboard/notes"
              className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary ${pathname == '/dashboard/notes' ? 'bg-muted text-primary' : 'bg-none text-muted-foreground'}`}
            >
              <StickyNote className="h-4 w-4" />
              Notes{' '}
            </Link>
            <Link
              href="/dashboard/learn-resources"
              className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary ${pathname == '/dashboard/learn-resources' ? 'bg-muted text-primary' : 'bg-none text-muted-foreground'}`}
            >
              <BookA className="h-4 w-4" />
              Learn Resources
            </Link>
          </nav>
        </div>
        <div className="mt-auto p-4">
          <Card>
            <CardHeader className="p-2 pt-0 md:p-4">
              <CardTitle>Upgrade to Pro</CardTitle>
              <CardDescription>
                Unlock all features and get unlimited access to our support
                team.
              </CardDescription>
            </CardHeader>
            <CardContent className="p-2 pt-0 md:p-4 md:pt-0">
              <Button size="sm" className="w-full">
                Upgrade
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default DashboardSidebar;
