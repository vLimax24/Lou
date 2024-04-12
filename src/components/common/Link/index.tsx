import React from "react"
import type { ReactNode } from "react"
import Link from "next/link"
import { cn } from "@/lib/utils"


interface EmptyLinkProps {
  href: string;
  text: string;
  showArrow: boolean;
  className?: string;
}

interface IconLinkProps {
  href: string;
  className?: string;
  children: ReactNode;
}

export const EmptyLink: React.FC<EmptyLinkProps> = ({ href, text, showArrow, className }) => {
  return (
    <Link href={href} className={cn(
      "flex items-center justify-center hover:bg-gray-500 hover:bg-opacity-30 py-1.5 px-3 rounded-md",
      className
    )}>
      <div className='flex items-center justify-center'>
        <p className={`flex items-center justify-center text-white ${showArrow ? "mr-2" : ""}`}>
            {text}
        </p>
        {showArrow && (
            <div className='flex items-center justify-center size-3 pt-0.5'>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="#fff" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 19.5 15-15m0 0H8.25m11.25 0v11.25" />
                </svg>   
            </div>
        )}
      </div>
    </Link>
  )
}

export const IconLink: React.FC<IconLinkProps> = ({ href, className, children }) => {
  return (
    <Link href={href} className={`flex items-center justify-center hover:bg-gray-500 hover:bg-opacity-30 p-2 rounded-md ${className}`} target='_blank'>
      {children}
    </Link>
  )
}