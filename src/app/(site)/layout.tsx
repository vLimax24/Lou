import { Footer } from "@/components/containers/Footer"
import { NavBar } from "@/components/containers/NavBar"
import "@/styles/globals.css"
import * as React from "react"

export const metadata = {
  title: "StudentOS",
  description: "Created by vLimax24",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
}

const SiteLayout = ({
  children,
}: {
  children: React.ReactNode;
}) => {

 

  return (
      <main className={"font-open-sans bg-gradient-to-bl from-[#5A6471] to-[#243243] h-full w-full min-h-screen text-white"}>
        <NavBar />
        {children}
        <Footer />
      </main>
      
  )
}

export default SiteLayout
