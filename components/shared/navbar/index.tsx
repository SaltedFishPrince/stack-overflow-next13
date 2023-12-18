import { SignedIn, UserButton } from '@clerk/nextjs';
import Image from 'next/image';
import Link from 'next/link';
import GlobarSearch from '../search';
import MoblieNav from './MoblieNav';
import Theme from './Theme';

const NavBar = () => {
  return (
    <nav
      className="flex-between
      background-light900_dark200 fixed 
      w-full gap-5 p-6
      shadow-light-300
      dark:shadow-none sm:px-12 z-[99999]"
    >
      <Link href='/' className='flex items-center gap-1'>
        <Image
          src="/assets/images/site-logo.svg"
          width={23}
          height={23}
          alt='logo'
        />
        <p className='h2-bold font-spaceGrotesk text-dark-100 dark:text-light-900 max-sm:hidden'>
          Dev&nbsp;
          <span className='text-primary-500'>OverFlow</span>
        </p>
      </Link>
      <GlobarSearch/>
      <div className='flex-between gap-5'>
        <Theme/>
        <SignedIn>
          <UserButton
            afterSignOutUrl="/"
            appearance={{
              elements: {
                avatarBox: 'h-10 w-10'
              },
              variables: {
                colorPrimary: '#ff7000'
              }
            }}
          />
        </SignedIn>
        <MoblieNav/>
      </div>
    </nav>
  );
};

export default NavBar;
