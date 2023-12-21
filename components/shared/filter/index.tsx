'use client'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { debounce, formUrlQuery } from '@/lib/utils';
import { useRouter, useSearchParams } from 'next/navigation';
import React from 'react';
interface FitterProps {
  filters: ReadonlyArray<{ name: string, value: string }>
  otherClasses?: string;
  containerClasses?: string;
}
const Filter = ({ filters, otherClasses, containerClasses }: FitterProps) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const filterValue = searchParams.get('filter');
  const filterAction = debounce((value: string) => {
    const newUrl = formUrlQuery({
      params: searchParams.toString(),
      searchValue: {
        'filter': value
      }
    });

    router.push(newUrl, { scroll: false });
  }, 0)
  return (
    <div className={`relative  ${containerClasses}`}>
      <Select
        onValueChange={filterAction}
        defaultValue={filterValue || undefined}
      >
        <SelectTrigger
          className={`${otherClasses}
        body-regular light-border background-light800_dark300
        text-dark500_light700 border px-5 py-2.5`}
        >
          <div className="line-clamp-1 flex-1 text-left">
            <SelectValue placeholder="Select a Filter" />
          </div>
        </SelectTrigger>
        <SelectContent className='text-dark100_light900 background-light900_dark300'
          onChangeCapture={(e) => {
            console.log(e.target)
          }}>
          <SelectGroup>
            {filters.map((item) => (
              <SelectItem
                key={item.value}
                value={item.value}
                onChangeCapture={(e) => {
                  console.log(e.target)
                }}
              >
                {item.name}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div >
  );
};

export default Filter;
