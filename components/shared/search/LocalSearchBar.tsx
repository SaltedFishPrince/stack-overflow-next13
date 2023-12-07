'use client';

import { Input } from '@/components/ui/input';
import Image from 'next/image';
import React from 'react';
import type { LocalSearchBarProps } from './types';

const Icon = ({ imgSrc }: { imgSrc:string }) => {
  return (
    <Image
      src={imgSrc}
      alt="search"
      width={20}
      height={24}
      className="cursor-pointer"
    />
  );
};

const LocalSearchBar = ({
  route,
  iconPosition = 'left',
  imgSrc,
  placeholder = '',
  otherClasses
}: LocalSearchBarProps) => {
  const [value] = React.useState('');
  console.log(route);
  return (
    <div
      className={`
      background-light800_darkgradient flex min-h-[56px] 
      grow items-center gap-4 rounded-[10px] px-4
       ${otherClasses}`}
    >
      {iconPosition === 'left' && (<Icon imgSrc={imgSrc} />)}
      <Input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={() => {}}
        className="paragraph-regular no-focus placeholder background-light800_darkgradient border-none shadow-none outline-none"
      />
      {iconPosition === 'right' && (<Icon imgSrc={imgSrc} />)}
    </div>
  );
};

export default LocalSearchBar;
