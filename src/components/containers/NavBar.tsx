"use client"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import Logo from "../../../public/logo.svg"
import React from "react"
import { SignInButton, SignUpButton } from "@clerk/nextjs"
import { useConvexAuth } from "convex/react"
import { Loader2 } from "lucide-react"
import Link from "next/link"

export const NavBar: React.FC = () => {
  const [isSticky, setIsSticky] = useState(false)
  const [lastScrollY, setLastScrollY] = useState(0)
  const [isCloseToTop, setIsCloseToTop] = useState(false)

  const { isLoading, isAuthenticated } = useConvexAuth()

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
        <div
          className={`fixed left-0 right-0 top-0 z-10 transform border-b border-b-[#e5e5e5] bg-white transition-all duration-300 ${isSticky && !isCloseToTop ? "translate-y-0" : "-translate-y-full"}`}
        >
          <div className="mx-auto flex h-24 max-w-[1080px] items-center justify-between px-3 py-4 text-black">
            <div className="flex items-center">
              <Image
                src={Logo}
                alt="Lou"
                width={70}
                height={70}
                draggable={false}
              />
              <h1 className="ml-2 hidden text-[2.3rem] font-bold md:block">
                Lou
              </h1>
            </div>
            <div className="flex space-x-4">
              {isLoading ? (
                <Loader2 className="size-8 animate-spin" />
              ) : isAuthenticated ? (
                <>
                  <Link href="/dashboard">
                    <Button className="h-12 rounded-3xl bg-primaryBlue px-16 text-lg font-bold text-white transition-all duration-200 ease-in-out hover:bg-primaryHover">
                      Dashboard
                    </Button>
                  </Link>
                </>
              ) : (
                <>
                  <SignUpButton mode="modal">
                    <Button className="h-12 rounded-3xl bg-primaryBlue px-16 text-lg font-bold text-white transition-all duration-200 ease-in-out hover:bg-primaryHover md:w-48">
                      Get Started
                    </Button>
                  </SignUpButton>
                  <SignInButton mode="modal">
                    <Button className="h-12 rounded-3xl border-2 border-[#ADADAD] bg-transparent px-10 text-lg font-bold text-black transition-all duration-200 ease-in-out hover:border-black hover:bg-transparent md:w-36">
                      Log in
                    </Button>
                  </SignInButton>
                </>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div
          className={
            "bg-white transition-all duration-300 md:mx-auto md:max-w-[1080px]"
          }
        >
          <div className="flex h-24 items-center justify-between overflow-hidden px-3 py-4 text-black md:mx-auto lg:max-w-[1080px]">
            <div className="flex items-center">
              <Image
                src={Logo}
                alt="Lou"
                width={70}
                height={70}
                draggable={false}
              />
              <h1 className="ml-2 text-[2.3rem] font-bold">Lou</h1>
            </div>
            <div className="flex md:mr-0">
              {isLoading ? (
                <Loader2 className="size-8 animate-spin" />
              ) : isAuthenticated ? (
                <Link href="/dashboard">
                  <Button className="h-12 rounded-3xl bg-primaryBlue px-16 text-lg font-bold text-white transition-all duration-200 ease-in-out hover:bg-primaryHover">
                    Dashboard
                  </Button>
                </Link>
              ) : (
                <SignInButton mode="modal">
                  <Button className="h-12 w-36 rounded-3xl border-2 border-[#ADADAD] bg-transparent px-10 text-lg font-bold text-black transition-all duration-200 ease-in-out hover:border-black hover:bg-transparent">
                    Log in
                  </Button>
                </SignInButton>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  )
}
