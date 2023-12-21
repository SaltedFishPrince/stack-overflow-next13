'use client';
import { Input } from '@/components/ui/input';
import Image from 'next/image';
import React from 'react';

const Icon = ({ imgSrc }: { imgSrc: string }) => {
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

interface props {
  route: string;
  iconPosition?: 'left' | 'right';
  imgSrc: string;
  placeholder?: string;
  otherClasses?: string;
}

const LocalSearchBar = ({
  route,
  iconPosition = 'left',
  imgSrc,
  placeholder = '',
  otherClasses
}: props) => {
  const [value] = React.useState('');
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
        onChange={() => { }}
        className="paragraph-regular no-focus placeholder background-light800_darkgradient border-none shadow-none outline-none"
      />
      {iconPosition === 'right' && (<Icon imgSrc={imgSrc} />)}
    </div>
  );
};

export default LocalSearchBar;
