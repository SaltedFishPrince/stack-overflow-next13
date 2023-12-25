'use client';
import { Input } from '@/components/ui/input';
import Image from 'next/image';
import React from 'react';
import GlobalResult from './GlobalResult';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { formUrlQuery } from '@/lib/utils';
const GlobarSearch = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const searchContainerRef = React.useRef<HTMLDivElement | null>(null);

  const query = searchParams.get("q");
  const [searchValue, setSearchValue] = React.useState(query || '');
  const [open, setOpen] = React.useState(false)
  const handleOutsideClick = (event: MouseEvent) => {
    if (
      searchContainerRef.current &&
      !searchContainerRef.current.contains(event.target as Node)
    ) {
      setOpen(false);
      setSearchValue('')
    }
  }

  const handleInputChange = (value: string) => {
    setSearchValue(value)
    if (!open) setOpen(true);
    if (value.length === 0 && open) setOpen(false)
  }



  React.useEffect(() => {
    setOpen(false)
    console.log(2)
    document.addEventListener("click", handleOutsideClick);
    return () => {
      setOpen(false)
      document.removeEventListener("click", handleOutsideClick);
    };
  }, [])


  React.useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      const newUrl = formUrlQuery({
        params: searchParams.toString(),
        searchValue: {
          global: searchValue
        }
      });

      router.push(newUrl, { scroll: false });
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [searchValue, router, pathname, searchParams, query])

  return (
    <div
      className="relative w-full max-w-[600px] max-lg:hidden"
      ref={searchContainerRef}
    >
      <div className="background-light800_darkgradient relative
      flex min-h-[56px] grow items-center gap-1 rounded-xl px-4">
        <Image
          src="/assets/icons/search.svg"
          alt="search"
          width={20}
          height={24}
          className="cursor-pointer"
        />
        <Input
          type="text"
          placeholder="Search globally"
          value={searchValue}
          onChange={(e) => { handleInputChange(e.target.value); }}
          className="paragraph-regular no-focus placeholder text-dark400_light700 background-light800_darkgradient border-none shadow-none outline-none"
        />
      </div>
      {
        open && <GlobalResult />
      }
    </div>
  );
};

export default GlobarSearch;
