import React from 'react';
import NodejsLight from '@/components/Icons/Logos/NodejsLight';
import { EmptyLink } from '@/components/common/Link';
import { ActiveLink } from '@/components/common/ActiveLink';

const links = [
    {
        name: 'Dashboard',
        link: '/dashboard'
    },
    {
        name: 'Help',
        link: '/help'
    },
    {
        name: 'Contact',
        link: '/contact'
    },
    {
        name: 'Blog',
        link: '/blog'
    }
]

export const NavBar = () => {
  return (
    <nav className="border-b-[#2C3437] py-3 border-b px-8">
      <div className="flex items-center justify-between">
        <div className="flex items-center justify-center">
            <NodejsLight height={24} width={80} className='mr-10'/>
            <ul className='flex'>
                {links.map((link) => (
                    <li key={link.link}>
                        <EmptyLink href={link.link} text={link.name} showArrow={false} className='mx-1 text-[15px]'/>
                    </li>
                ))}
            </ul>
        </div>
      </div>
    </nav>
  );
};
