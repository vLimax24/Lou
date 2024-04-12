import Link from "next/link"
import React from "react"
export const Footer = () => {
  return (
    <footer className="bg-transparent text-gray-300 py-4 border-t border-t-gray-400 overflow-x-hidden">
      <div className="w-full ml-6 flex justify-between items-center">
        <p className="text-sm">
          &copy; {new Date().getFullYear()} StudentOS. All rights reserved.
        </p>
        <div className='mr-12 flex flex-col md:flex-row'>
            <Link href={"/privacy-policy"} className='mx-2 hover:bg-gray-500 hover:bg-opacity-30 py-1.5 px-3 rounded-md ease-linear transition-all duration-200'>
                Privacy Policy
            </Link>
            <Link href={"/privacy-policy"} className='mx-2 hover:bg-gray-500 hover:bg-opacity-30 py-1.5 px-3 rounded-md ease-linear transition-all duration-200'>
                Terms of Service
            </Link>
        </div>
      </div>
    </footer>
  )
}