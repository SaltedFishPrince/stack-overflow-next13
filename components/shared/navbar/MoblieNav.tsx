import SideBarList from '@/components/shared/sidebar-list';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger
} from '@/components/ui/sheet';
import { SignedOut } from '@clerk/nextjs';
import Image from 'next/image';
import Link from 'next/link';

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
            <SideBarList
              as='section'
              className='flex h-full flex-col gap-6 pt-16'
              itemOuter={<SheetClose asChild />}/>
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
