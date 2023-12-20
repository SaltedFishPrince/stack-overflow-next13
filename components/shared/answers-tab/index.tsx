import { getUserAnswers } from "@/lib/actions/user.action";
import { SearchParamsProps } from "@/types";
import AnswerCard from "@/components/cards/AnswerCard";
import NotResult from "../not-result";

interface Props extends SearchParamsProps {
  userId: string;
  clerkId?: string | null;
}

const AnswersTab = async ({ searchParams, userId, clerkId }: Props) => {
  const result = await getUserAnswers({
    userId,
    page: 1,
  });

  if (!result) return <></>
  return (
    <>
      {
        result.answers.length > 0 ?
          (result.answers.map((item: any) => (
            <AnswerCard
              key={item._id}
              clerkId={clerkId}
              _id={item._id}
              question={item.question}
              author={item.author}
              upvotes={item.upvotes.length}
              createdAt={item.createdAt}
            />
          ))
          ) :
          (
            <NotResult
              title="There&rsquo;s no answer to show"
              description="Be the first to break the silence! 🚀 Ask a Question and kickstart the discussion. our query could be the next big thing others learn from. Get involved! 💡"
              link="/"
              linkTitle="View Question"
            />
          )
      }

    </>
  );
};

export default AnswersTab;
