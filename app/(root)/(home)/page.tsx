import Filter from '@/components/shared/filter';
import { HomePageFilters } from '@/constants/filters';

import LocalSearchBar from '@/components/shared/search/LocalSearchBar';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import HomeFilters from './components/HomeFilter';
import HomeQuestion from './components/Question';
import { SearchParamsProps } from '@/types';

export default function Home({ searchParams }: SearchParamsProps) {
  const { q = '' } = searchParams
  return (
    <div>
      <div className="flex w-full flex-col-reverse justify-between gap-4 sm:flex-row sm:items-center">
        <h1 className="h1-bold text-dark100_light900">All Questions</h1>
        <Link href="/ask-question" className="flex justify-end max-sm:w-full">
          <Button className="primary-gradient min-h-[46px] px-4 py-3 !text-light-900">
            Ask a Question
          </Button>
        </Link>
      </div>

      <div className='mt-11 flex justify-between gap-5 max-sm:flex-col sm:items-center'>
        <LocalSearchBar
          route="/"
          placeholder="Search global question"
          imgSrc="/assets/icons/search.svg"
          iconPosition='right'
        />
        <Filter
          filters={HomePageFilters}
          otherClasses="min-h-[56px] sm:min-w-[170px]"
          containerClasses="hidden max-md:flex"
        />
      </div>

      <HomeFilters />

      <HomeQuestion searchQuery={q} />
    </div>
  );
}
