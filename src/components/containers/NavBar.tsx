"use client"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import Logo from "../../../public/logo.svg"
import React from "react"
import { SignInButton, SignUpButton } from "@clerk/nextjs"


export const NavBar: React.FC = () => {
  const [isSticky, setIsSticky] = useState(false)
  const [lastScrollY, setLastScrollY] = useState(0)
  const [isCloseToTop, setIsCloseToTop] = useState(false)


  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      const isClose = currentScrollY < 100

      if (currentScrollY > lastScrollY) {
        setIsSticky(true)
        setIsCloseToTop(isClose)
      } else {
        setIsSticky(!isClose)
        setIsCloseToTop(false)
      }

      setLastScrollY(currentScrollY)
    }

    window.addEventListener("scroll", handleScroll)
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [lastScrollY])

  return (
    <>
      {isSticky ? (
          <div className={`fixed top-0 left-0 right-0 bg-white z-10 border-b border-b-[#e5e5e5] transition-all duration-300 transform ${isSticky && !isCloseToTop ? "translate-y-0" : "-translate-y-full"}`}>
            <div className="max-w-[1080px] mx-auto flex items-center justify-between h-24 py-4 px-3 text-black">
              <div className="flex items-center">
                <Image src={Logo} alt="Lou" width={70} height={70} draggable={false} />
                <h1 className="font-bold text-[2.3rem] ml-2">Lou</h1>
              </div>
              <div className="flex space-x-4">
                <SignUpButton mode="modal">
                  <Button className="px-16 rounded-3xl bg-primaryBlue text-lg text-white hover:bg-primaryHover font-bold h-12 w-48 transition-all duration-200 ease-in-out">
                    Get Started
                  </Button>
                </SignUpButton>
                <SignInButton mode="modal">
                  <Button className="px-10 rounded-3xl bg-transparent text-lg text-black border-2 border-[#ADADAD] font-bold h-12 w-36 hover:bg-transparent hover:border-black transition-all duration-200 ease-in-out">
                    Log in
                  </Button>
                </SignInButton>
              </div>
            </div>
          </div>
      ) : (
        <div>
          <div className={"fixed top-0 left-0 right-0 bg-white z-10 transition-all duration-300"}>
            <div className="max-w-[1080px] mx-auto flex items-center justify-between h-24 py-4 px-3 text-black">
              <div className="flex items-center">
                <Image src={Logo} alt="Lou" width={70} height={70} draggable={false} />
                <h1 className="font-bold text-[2.3rem] ml-2">Lou</h1>
              </div>
              <div className="flex space-x-4">
                <SignInButton mode="modal">
                  <Button className="px-10 rounded-3xl bg-transparent text-lg text-black border-2 border-[#ADADAD] font-bold h-12 w-36 hover:bg-transparent hover:border-black transition-all duration-200 ease-in-out">
                    Log in
                  </Button>
                </SignInButton>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
