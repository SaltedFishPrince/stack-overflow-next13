'use client';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger
} from '@/components/ui/sheet';
import { sidebarLinks } from '@/constants';
import { SignedOut } from '@clerk/nextjs';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const NavContent = () => {
  const pathname = usePathname();
  const isCurrentRoute = (route:string) => (pathname.includes(route) && route.length > 1) ||
  pathname === route;
  return (
    <section className="flex h-full flex-col gap-6 pt-16">
      {sidebarLinks.map((item) => {
        const isActive = isCurrentRoute(item.route);
        return (
          <SheetClose asChild key={item.route}>
            <Link
              href={item.route}
              className={`${
                isActive
                  ? 'primary-gradient rounded-lg text-light-900'
                  : 'text-dark300_light900'
              } flex items-center justify-start gap-4 bg-transparent p-4`}
            >
              <Image
                src={item.imgURL}
                alt={item.label}
                width={20}
                height={20}
                className={`${isActive ? '' : 'invert-colors'}`}
              />
              <p className={`${isActive ? 'base-bold' : 'base-medium'}`}>
                {item.label}
              </p>
            </Link>
          </SheetClose>
        );
      })}
    </section>
  );
};

const MoblieNav = () => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Image
          className='invert-colors sm:hidden'
          src='/assets/icons/hamburger.svg'
          width={36}
          height={36}
          alt='menu'
        />
      </SheetTrigger>
      <SheetContent side='left' className='background-light900_dark200 border-none'>
        <SheetHeader>
          <SheetTitle>
            <Link href='/' className='flex items-center gap-1'>
              <Image
                src="/assets/images/site-logo.svg"
                width={23}
                height={23}
                alt='logo'
              />
              <p className='h2-bold text-dark100_light900 font-spaceGrotesk '>
                Dev&nbsp;
                <span className='text-primary-500'>OverFlow</span>
              </p>
            </Link>
          </SheetTitle>
        </SheetHeader>
        <div>
          <SheetClose>
            <NavContent/>
          </SheetClose>
          <SignedOut>
            <div className="flex flex-col gap-3">
              <SheetClose asChild>
                <Link href="/sign-in">
                  <Button className="small-medium btn-secondary min-h-[41px] w-full rounded-lg px-4 py-3 shadow-none">
                    <span className="primary-text-gradient">Log In</span>
                  </Button>
                </Link>
              </SheetClose>

              <SheetClose asChild>
                <Link href="/sign-up">
                  <Button className="small-medium light-border-2 btn-tertiary text-dark400_light900 min-h-[41px] w-full rounded-lg border px-4 py-3 shadow-none">
                    Sign Up
                  </Button>
                </Link>
              </SheetClose>
            </div>
          </SignedOut>
        </div>
      </SheetContent>
    </Sheet>

  );
};

export default MoblieNav;
