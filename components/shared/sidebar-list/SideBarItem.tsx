'use client';
import type { SidebarLink } from '@/types';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
const SideBarItem = ({ route, imgURL, label }:SidebarLink) => {
  const pathname = usePathname();
  const isCurrentRoute = (route:string) => (pathname.includes(route) && route.length > 1) ||
  pathname === route;
  const isActive = isCurrentRoute(route);
  return (
    <Link
      href={route}
      className={`${
        isActive
          ? 'primary-gradient rounded-lg text-light-900'
          : 'text-dark300_light900'
      } flex items-center justify-start gap-4 bg-transparent p-4`}
    >
      <Image
        src={imgURL}
        alt={label}
        width={20}
        height={20}
        className={`${isActive ? '' : 'invert-colors'}`}
      />
      <p className={`${isActive ? 'base-bold' : 'base-medium'}`}>
        {label}
      </p>
    </Link>
  );
};

export default SideBarItem;
