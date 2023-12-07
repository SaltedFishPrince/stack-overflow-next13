import Filter from '@/components/shared/filter';
import { HomePageFilters } from '@/constants/filters';

import QuestionCard from '@/components/cards/QuestionCard';
import HomeFilters from '@/components/home/HomeFilter';
import NotResult from '@/components/shared/not-result';
import LocalSearchBar from '@/components/shared/search/LocalSearchBar';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
const questions = [
  {
    _id: '1',
    title: 'Cascading Deletes in SQLAlchemy?',
    tags: [
      { _id: '1', name: 'python' },
      { _id: '2', name: 'sql' }
    ],
    author: {
      _id: '1',
      name: 'Sahil Shadwal',
      picture: 'path/to/picture.jpg'
    },
    upvotes: 10,
    views: 1000000,
    answers: [{}, {}], // Placeholder objects for answers
    createdAt: new Date('2023-05-01T12:00:00.000Z')
  },
  {
    _id: '2',
    title: 'How to center a div?',
    tags: [
      { _id: '3', name: 'css' },
      { _id: '4', name: 'html' }
    ],
    author: {
      _id: '2',
      name: 'Sahil Shadwal',
      picture: 'path/to/another-picture.jpg'
    },
    upvotes: 15,
    views: 120,
    answers: [{}, {}], // Placeholder objects for answers
    createdAt: new Date('2023-06-15T10:30:00.000Z')
  }
];

const QuestionList = () => {
  return (
    questions.map(({ _id }) => {
      return (
        <QuestionCard key={_id}/>
      );
    })
  );
};
export default function Home () {
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
        />
        <Filter
          filters={HomePageFilters}
          otherClasses="min-h-[56px] sm:min-w-[170px]"
          containerClasses="hidden max-md:flex"
        />
      </div>
      <HomeFilters/>

      <div className="mt-10 flex w-full flex-col gap-6">
        {
          questions.length > 0
            ? <QuestionList/>
            : <NotResult
              title="There&rsquo;s no question to show"
              description="Be the first to break the silence! 🚀 Ask a Question and kickstart the discussion. our query could be the next big thing others learn from. Get involved! 💡"
              link="/ask-question"
              linkTitle="Ask a Question"
            />
        }
      </div>
    </div>
  );
}
