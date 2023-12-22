'use client';
import { Button } from '@/components/ui/button';
import { themes } from '@/constants/themes';
import { useTheme } from '@/context/theme-provider';
import Image from 'next/image';
const SunIcon = () => {
  return (
    <Image
      className='active-theme'
      src='/assets/icons/sun.svg'
      width={20}
      height={20}
      alt='sun' />
  );
};

const MoonIcon = () => {
  return (
    <Image
      className='active-theme'
      src='/assets/icons/moon.svg'
      width={20}
      height={20}
      alt='moon' />
  );
};

const Theme = () => {
  const { isDark, toggleTheme } = useTheme();
  return (
    <Button onClickCapture={toggleTheme}>
      {isDark ? <MoonIcon /> : <SunIcon />}
    </Button>


  );
};

export default Theme;
