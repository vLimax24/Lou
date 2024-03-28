'use client'

import React, { useState, useMemo, useEffect } from 'react';
import NodejsLight from '@/components/Icons/Logos/NodejsLight';
import { EmptyLink, IconLink } from '@/components/common/Link';
import { ActiveLink } from '@/components/common/ActiveLink';
import { usePathname } from 'next/navigation';
import { AvatarRounded } from '../common/Avatar';
import GitHub from '../Icons/Social/GitHub';
import Link from 'next/link';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/solid'

interface NavLink {
    name: string;
    link: string;
}

const links: NavLink[] = [
    { name: 'Dashboard', link: '/dashboard' },
    { name: 'Help', link: '/help' },
    { name: 'Contact', link: '/contact' },
    { name: 'Blog', link: '/blog' },
];

export const NavBar: React.FC = () => {
    const pathname = usePathname();
    const [menuOpen, setMenuOpen] = useState<boolean>(false);
    const [scrolled, setScrolled] = useState<boolean>(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 0) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const toggleMenu = () => {
        setMenuOpen(prevState => !prevState);
    };

    const renderedLinks = useMemo(() => {
        return links.map(link => (
            <li key={link.link} className='my-1'>
                {link.link === pathname ? (
                    <ActiveLink href={link.link} text={link.name} className='mx-1 text-[15px]' />
                ) : (
                    <EmptyLink href={link.link} text={link.name} showArrow={false} className='mx-1 text-[15px]' />
                )}
            </li>
        ));
    }, [pathname]);

    return (
        <>
            <nav className={`py-3 px-8 fixed top-0 left-0 right-0 z-10 border-b-[#2C3437] border-b ${scrolled ? 'backdrop-blur-sm' : ''}`}>
                <div className="flex items-center justify-between">
                    <div className="flex items-center justify-center">
                        <Link href={'/'}>
                            <NodejsLight height={24} width={80} className='mr-10' />
                        </Link>
                        <ul className='hidden md:flex'>{renderedLinks}</ul>
                    </div>
                    <div className='hidden md:flex items-center justify-center'>
                        <IconLink href='https://github.com/vlimax24' className='mx-2'>
                            <GitHub width={22} height={22} color='white' />
                        </IconLink>
                        <Link href={'/dashboard'}>
                            <AvatarRounded
                                src='https://github.com/shadcn.png'
                                fallback='CN'
                                alt='Limax'
                                clickEvent={false}
                                className='hover:cursor-pointer size-10'
                            />
                        </Link>
                    </div>
                    <div className='flex md:hidden hover:cursor-pointer' onClick={toggleMenu}>
                        {menuOpen ? (
                            <XMarkIcon color='white' className='size-6' />
                        ) : (
                            <Bars3Icon color='white' className='size-6' />
                        )}
                    </div>
                </div>
            </nav>
            {menuOpen && (
                <div className='w-full border-b border-b-[#2C3437] py-4 px-4'>
                    <ul className='flex flex-col items-start'>{renderedLinks}</ul>
                </div>
            )}
        </>
    );
};
