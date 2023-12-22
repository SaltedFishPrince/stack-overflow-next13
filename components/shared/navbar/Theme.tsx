'use client';
import { Button } from '@/components/ui/button';
import { useTheme } from '@/context/theme-provider';
import useIsServer from '@/hooks/useIsServer';
import Image from 'next/image';
import React from 'react';
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
  const isServer = useIsServer()

  return (
    <Button onClickCapture={toggleTheme}>
      {isServer && (isDark ? <MoonIcon /> : <SunIcon />)}
    </Button>
  );
};

export default Theme;
