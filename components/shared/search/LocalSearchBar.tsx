'use client';
import { Input } from '@/components/ui/input';
import { debounce, formUrlQuery } from '@/lib/utils';
import Image from 'next/image';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

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
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const query = searchParams.get('q')
  const [searchValue, setSearchValue] = React.useState(query || '');

  React.useEffect(() => {
    const delayDebounceFn = debounce((searchValue: string) => {
      const newUrl = formUrlQuery({
        params: searchParams.toString(),
        searchValue: { q: searchValue },
      });

      router.push(newUrl, { scroll: false });
    }, 500)
    delayDebounceFn(searchValue)
  }, [searchValue, route, pathname, router, searchParams, query]);


  const handleSearchInputChange = (value: string) => {
    setSearchValue(value)
  };

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
        value={searchValue}
        onChange={(e) => { handleSearchInputChange(e.target.value) }}
        className="paragraph-regular no-focus placeholder background-light800_darkgradient border-none shadow-none outline-none"
      />
      {iconPosition === 'right' && (<Icon imgSrc={imgSrc} />)}
    </div>
  );
};

export default LocalSearchBar;
