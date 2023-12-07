'use client';
import React from 'react';

import { HomePageFilters } from '@/constants/filters';
import { Button } from '../ui/button';

const HomeFilters = () => {
  const [active, setActive] = React.useState< string>(() => HomePageFilters[0].value);
  return (
    <div className="mt-10 hidden flex-wrap gap-3 md:flex">
      {HomePageFilters.map(({ name, value }) => (
        <Button
          key={value}
          onClick={() => { setActive(value); }}
          className={`body-medium rounded-lg px-6 py-3 capitalize shadow-none ${
            active === value
              ? 'bg-primary-100 text-primary-500'
              : 'bg-light-800 text-light-500 hover:bg-light-700 dark:bg-dark-300 dark:hover:bg-dark-400'
          }`}
        >
          {name}
        </Button>
      ))}
    </div>
  );
};

export default HomeFilters;
