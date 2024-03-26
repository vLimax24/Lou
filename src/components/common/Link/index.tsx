import React from 'react';
import Link from 'next/link';


interface EmptyLinkProps {
  href: string;
  text: string;
  showArrow: boolean;
  className?: string;
}

const EmptyLink: React.FC<EmptyLinkProps> = ({ href, text, showArrow, className }) => {
  return (
    <Link href={href} className={`flex items-center justify-center hover:bg-gray-500 hover:bg-opacity-30 py-1.5 px-3 rounded-md ${className}`}>
      <div className='flex items-center justify-center'>
        <p className='flex items-center justify-center mr-2 text-white'>
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
  );
};

export default EmptyLink;
