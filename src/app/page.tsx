'use client'

import HomeLayout from '@/layouts/Home'
import EmptyLink from '@/components/common/Link';
import ActiveLink from '@/components/common/ActiveLink';

export default function HomePage() {
  return (
      <div className='bg-gray-800 h-full w-full min-h-screen'>
        <HomeLayout>
          <div className='flex'>
            <EmptyLink 
              href='https://google.com'
              text='Google'
              showArrow={true}
            />
            <ActiveLink 
              href='https://google.com'
              text='Google'
            />
          </div>
        </HomeLayout>
      </div>
  );
}
