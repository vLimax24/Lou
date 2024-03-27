'use client'

import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

interface AvatarProps {
    src: string;
    alt: string;
    fallback: string;
    clickEvent: boolean;
    badgeText: string;
    className?: string;
    onClick?: () => void; // Optional onClick callback function
}

export const AvatarBadge: React.FC<AvatarProps> = ({ src, fallback, alt, clickEvent, badgeText, className, onClick }) => {  
  return (
    <>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Avatar 
            className={`cursor-${clickEvent ? 'pointer' : 'default'} ${className}`} 
            onClick={clickEvent ? onClick : undefined} 
            >
            <AvatarImage src={src} alt={alt} />
            <AvatarFallback>{fallback}</AvatarFallback>
            </Avatar>
          </TooltipTrigger>
          <TooltipContent>
            <p>{badgeText}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

    </>

  );
};