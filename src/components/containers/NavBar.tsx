"use client"

import { ActiveLink } from "@/components/common/ActiveLink"
import { EmptyLink } from "@/components/common/Link"
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/solid"
import { useSession } from "next-auth/react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import React, { useMemo, useState } from "react"
import { AvatarRounded } from "../common/Avatar"

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
  const pathname = usePathname()
  const [menuOpen, setMenuOpen] = useState<boolean>(false)
  const { data: session } = useSession()
  console.log("🚀 ~ session:", session)

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
        className={"bg-opacity-30 sticky left-0 right-0 top-0 z-10 border-b border-opacity-10 border-b-gray-200 px-8 py-3 backdrop-blur-sm backdrop-filter"}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center justify-center">
            <Link href={"/"} draggable='false' className='select-none'>
              <h1 className='font-black text-xl'>STUDENTOS</h1>
            </Link>
            
          </div>
          <ul className="hidden md:flex mr-4">{renderedLinks}</ul>
          <div className="hidden items-center justify-center md:flex">
            {session ? (
              <>
                <Link href={"/dashboard"}>
                  <AvatarRounded
                    src={`${session.user.image}`}
                    fallback="AZ"
                    alt="Limax"
                    clickEvent={false}
                    className="size-10 hover:cursor-pointer"
                  />
                </Link>
              </>
            ) : (
              <>
                <EmptyLink
                  href={"/login"}
                  text={"Login"}
                  showArrow={false}
                  className="mx-1 text-[15px]"
                />
                <EmptyLink
                  href={"/signup"}
                  text={"Sign Up"}
                  showArrow={false}
                  className="mx-1 text-[15px]"
                />
              </>
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