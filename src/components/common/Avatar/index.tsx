'use client'

import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface AvatarProps {
    src: string;
    alt: string;
    fallback: string;
    clickEvent: boolean;
    onClick?: () => void; // Optional onClick callback function
}

const AvatarRounded: React.FC<AvatarProps> = ({ src, fallback, alt, clickEvent, onClick }) => {
  return (
    <Avatar 
      className={`cursor-${clickEvent ? 'pointer' : 'default'}`} 
      onClick={clickEvent ? onClick : undefined} // Pass onClick function only if clickEvent is true
    >
      <AvatarImage src={src} alt={alt} />
      <AvatarFallback>{fallback}</AvatarFallback>
    </Avatar>
  );
};

export default AvatarRounded;
