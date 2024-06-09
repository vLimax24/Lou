import type { Metadata } from "next"
import * as React from "react"
import DashboardClient from "@/components/containers/DashboardClient"

export const metadata: Metadata = {
  title: "Lou",
  description:
    "Discover Lou, the ultimate platform for managing everything from team projects to lectures, exams, assignments, homework, notes, tasks, and more. Streamline your academic and professional life with intuitive tools, real-time updates, and personalized learning resources. Join Lou today and boost your productivity!",
  icons: [{ rel: "icon", url: "/logo.svg" }],
}

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return <DashboardClient className="lg:p-10">{children}</DashboardClient>
}

export default DashboardLayout
