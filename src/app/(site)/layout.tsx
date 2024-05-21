import { Footer } from "@/components/containers/Footer"
import { NavBar } from "@/components/containers/NavBar"
import "@/styles/globals.css"
import * as React from "react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Lou",
  description: "Discover Lou, the ultimate platform for managing everything from team projects to lectures, exams, assignments, homework, notes, tasks, and more. Streamline your academic and professional life with intuitive tools, real-time updates, and personalized learning resources. Join Lou today and boost your productivity!",
  icons: [{ rel: "icon", url: "/logo.svg" }],
}

const SiteLayout = ({
  children,
}: {
  children: React.ReactNode;
}) => {

 

  return (
      <main className={"w-full max-w-[1080px] mx-[auto] my-0"}>
        <NavBar />
        {children}
        <Footer />
      </main>
      
  )
}

export default SiteLayout
