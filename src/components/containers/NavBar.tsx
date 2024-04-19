"use client"

import { ActiveLink } from "@/components/common/ActiveLink"
import { EmptyLink } from "@/components/common/Link"
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/solid"
import Link from "next/link"
import { usePathname } from "next/navigation"
import React, { useMemo, useState } from "react"
import { AvatarRounded } from "../common/Avatar"
import { useConvexAuth } from "convex/react"
import { Loader2 } from "lucide-react"
import { SignInButton } from "@clerk/nextjs"

interface NavLink {
  name: string;
  link: string;
}

const links: NavLink[] = [
  { name: "Dashboard", link: "/dashboard" },
  { name: "Help", link: "/help" },
  { name: "Contact", link: "/contact" },
]

export const NavBar: React.FC = () => {
  const { isAuthenticated, isLoading } = useConvexAuth()

  const pathname = usePathname()
  const [menuOpen, setMenuOpen] = useState<boolean>(false)

  const toggleMenu = () => {
    setMenuOpen(prevState => !prevState)
  }

  const renderedLinks = useMemo(() => {
    return links.map(link => (
      <li key={link.link} className="my-1">
        {link.link === pathname ? (
          <ActiveLink
            href={link.link}
            text={link.name}
            className="mx-1 text-[15px]"
          />
        ) : (
          <EmptyLink
            href={link.link}
            text={link.name}
            showArrow={false}
            className="mx-1 text-[15px]"
          />
        )}
      </li>
    ))
  }, [pathname])

  return (
    <>
      <nav
        className={
          "sticky left-0 right-0 top-0 z-10 border-b border-b-gray-200 border-opacity-10 bg-opacity-30 px-8 py-3 backdrop-blur-sm backdrop-filter"
        }
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center justify-center">
            <Link href={"/"} draggable="false" className="select-none">
              <h1 className="text-xl font-black">STUDENTOS</h1>
            </Link>
          </div>
          <ul className="mr-4 hidden md:flex">{renderedLinks}</ul>
          <div className="hidden items-center justify-center md:flex">
            {isLoading ? (
              <Loader2 className="h-6 w-6 animate-spin"/>
            ) : isAuthenticated ? (
              <>
                <Link href={"/dashboard"}>
                  <AvatarRounded
                    src={"/logo.png"}
                    fallback="AZ"
                    alt="Limax"
                    clickEvent={false}
                    className="size-10 hover:cursor-pointer"
                  />
                </Link>
              </>
            ) : (
              <div className="flex items-center justify-center hover:bg-gray-500 hover:bg-opacity-30 py-1.5 px-3 rounded-md">
                <SignInButton mode="modal"/>
              </div>
            )}
          </div>
          <div
            className="flex hover:cursor-pointer md:hidden"
            onClick={toggleMenu}
          >
            {menuOpen ? (
              <XMarkIcon color="white" className="size-6" />
            ) : (
              <Bars3Icon color="white" className="size-6" />
            )}
          </div>
        </div>
      </nav>
      {menuOpen && (
        <div className="w-full border-b border-b-gray-200 border-opacity-10 px-4 py-4">
          <ul className="flex flex-col items-start">{renderedLinks}</ul>
        </div>
      )}
    </>
  )
}
