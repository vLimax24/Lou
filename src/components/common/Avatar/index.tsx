"use client"

import React from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface AvatarProps {
    src: string;
    alt: string;
    fallback: string;
    clickEvent: boolean;
    className?: string;
    onClick?: () => void; // Optional onClick callback function
}

export const AvatarRounded: React.FC<AvatarProps> = ({ src, fallback, alt, clickEvent, className, onClick }) => {
  return (
    <Avatar 
      className={`cursor-${clickEvent ? "pointer" : "default"} ${className}`} 
      onClick={clickEvent ? onClick : undefined} // Pass onClick function only if clickEvent is true
    >
      <AvatarImage src={src} alt={alt} />
      <AvatarFallback>{fallback}</AvatarFallback>
    </Avatar>
  )
}
