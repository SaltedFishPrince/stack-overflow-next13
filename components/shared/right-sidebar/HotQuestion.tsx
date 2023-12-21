import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '@/components/ui/tooltip';
import { getHotQuestions } from '@/lib/actions/question.action';
import Image from 'next/image';
import Link from 'next/link';

const HotQuestion = async () => {
  const hotQuestions = await getHotQuestions() ?? [];
  return (
    <div>
      <h3 className="h3-bold text-dark200_light900">Top Questions</h3>
      <div className="mt-7 flex w-full flex-col gap-[30px]">
        {hotQuestions.map((question) => (
          <Link
            href={`/question/${question._id}`}
            key={question._id}
            className="flex cursor-pointer items-start justify-between gap-7"
          >
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <p className="body-medium text-dark500_light700 line-clamp-2">
                    {question.title}
                  </p>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{question.title}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <Image
              src="/assets/icons/chevron-right.svg"
              alt="chevron-right"
              width={20}
              height={20}
              className="invert-colors"
            />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default HotQuestion;
