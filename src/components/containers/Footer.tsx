import Link from "next/link"
import React from "react"
import Image from "next/image"
import Discord from "../../../public/discord.svg"
import Twitter from "../../../public/twitter.svg"
import Facebook from "../../../public/facebook.svg"
import Instagram from "../../../public/instagram.svg"
import Path from "../../../public/path.svg"
export const Footer = () => {
  return (
    <footer className="relative mx-[auto] my-0 mt-32 w-full max-w-[1080px] bg-primaryBlue pb-10 pt-10 text-gray-300">
      <div className="flex items-start justify-between">
        <div className="">
          <h1 className="max-w-48 text-[55px] font-bold leading-[3rem] text-white">
            Lou Industries
          </h1>
        </div>
        <div className="flex items-start justify-between gap-16">
          <div className="flex flex-col">
            <h1 className="mb-2 text-xl font-bold text-white">Product</h1>
            <Link href={"/"}>Dashboard</Link>
            <Link href={"/"}>Blog</Link>
            <Link href={"/"}>Testimonials</Link>
            <Link href={"/"}>Pricing</Link>
          </div>
          <div className="flex flex-col">
            <h1 className="mb-2 text-xl font-bold text-white">Company</h1>
            <Link href={"/"}>About Us</Link>
            <Link href={"/"}>Our Mission</Link>
          </div>
          <div className="flex flex-col">
            <h1 className="mb-2 text-xl font-bold text-white">Support</h1>
            <Link href={"/"}>FAQ</Link>
            <Link href={"/"}>Help Center</Link>
            <Link href={"/"}>Contact Support</Link>
          </div>
        </div>
        <div className="flex items-center justify-center gap-4">
          <Link href={"/"}>
            <Image src={Discord} alt="Discord" width={20} height={20} />
          </Link>
          <Link href={"/"}>
            <Image src={Twitter} alt="Twitter" width={20} height={20} />
          </Link>
          <Link href={"/"}>
            <Image src={Facebook} alt="Facebook" width={12} height={12} />
          </Link>
          <Link href={"/"}>
            <Image src={Instagram} alt="Instagram" width={20} height={20} />
          </Link>
        </div>
      </div>
      <div className="mt-20 flex w-full items-center justify-between">
        <div className="">
          <h2>
            © {new Date().getFullYear()} Lou Industries. All rights reserved.
          </h2>
        </div>
        <div className="flex items-center justify-between gap-10">
          <Link href={"/"}>Terms of Service</Link>
          <Link href={"/"}>Privacy Policy</Link>
        </div>
      </div>
      <Image
        src={Path}
        alt="Path"
        width={721}
        height={182}
        className="absolute bottom-0 right-0"
        draggable={false}
      />
    </footer>
  )
}
