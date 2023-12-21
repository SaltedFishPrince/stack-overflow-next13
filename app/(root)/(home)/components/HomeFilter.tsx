'use client';
import React from 'react';

import { HomePageFilters } from '@/constants/filters';
import { Button } from '../../../../components/ui/button';
import { useRouter, useSearchParams } from 'next/navigation';
import { debounce, formUrlQuery } from '@/lib/utils';

const HomeFilters = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const filter = searchParams.get('filter')
  const [active, setActive] = React.useState<string>(filter || HomePageFilters[0].value);
  const handleTypeClick = debounce((value: string) => {
    setActive(value)
    const newUrl = formUrlQuery({
      params: searchParams.toString(),
      searchValue: {
        'filter': value.toLowerCase()
      }
    });
    router.push(newUrl, { scroll: false });
  }, 100)

  React.useEffect(() => {
    setActive(filter || HomePageFilters[0].value)
  }, [filter])

  return (
    <div className="mt-10 hidden flex-wrap gap-3 md:flex">
      {HomePageFilters.map(({ name, value }) => (
        <Button
          key={value}
          className={`body-medium rounded-lg px-6 py-3 capitalize shadow-none ${active === value
            ? 'bg-primary-100 text-primary-500'
            : 'bg-light-800 text-light-500 hover:bg-light-700 dark:bg-dark-300 dark:hover:bg-dark-400'
            }`}
          onClickCapture={() => handleTypeClick(value)}
        >
          {name}
        </Button>
      ))}
    </div>
  );
};

export default HomeFilters;
