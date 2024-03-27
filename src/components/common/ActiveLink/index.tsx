import React from 'react';
import Link from 'next/link';


interface ActiveLinkProps {
  href: string;
  text: string;
  className?: string;
}

export const ActiveLink: React.FC<ActiveLinkProps> = ({ href, text, className }) => {
  return (
    <Link href={href} className={`flex items-center justify-center bg-green-600 hover:bg-green-700 py-1.5 px-3 rounded-md ${className}`}>
      <div>
        <p className='text-white'>
            {text}
        </p>
      </div>
    </Link>
  )
}