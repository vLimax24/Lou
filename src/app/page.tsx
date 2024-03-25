'use client'

import HomeLayout from '@/layouts/Home'
import AvatarBadge from '@/components/common/AvatarBadge';

export default function HomePage() {
  const handleClick = () => {
    alert("Hello World!");
  }

  return (
  <HomeLayout>
    <AvatarBadge 
      src='https://github.com/vlimax24.png'
      alt='vlimax24'
      fallback='VL'
      clickEvent={true}
      badgeText='test'
      onClick={handleClick}
    />
  </HomeLayout>
  );
}
