import { getUserQuestions } from "@/lib/actions/user.action";
import { SearchParamsProps } from "@/types";
import React from "react";
import QuestionCard from "@/components/cards/QuestionCard";
import NotResult from "../not-result";

interface Props extends SearchParamsProps {
  userId: string;
  clerkId?: string | null;
}

const QuestionTab = async ({ searchParams, userId, clerkId }: Props) => {
  const result = await getUserQuestions({
    userId,
    page: 1,
  });

  if (!result) return <></>
  return (
    <>
      {
        result.questions.length > 0 ?
          (
            result.questions.map((question: any) => (
              <QuestionCard
                key={question._id}
                clerkId={clerkId}
                _id={question._id}
                title={question.title}
                tags={question.tags}
                author={question.author}
                upvotes={question.upvotes.length}
                views={question.views}
                answers={question.answers}
                createdAt={question.createdAt}
              />
            ))
          ) :
          (
            <NotResult
              title="There&rsquo;s no answer to show"
              description="Be the first to break the silence! 🚀 Ask a Question and kickstart the discussion. our query could be the next big thing others learn from. Get involved! 💡"
              link="/ask-question"
              linkTitle="Ask a Question"
            />
          )
      }
    </>
  );
};

export default QuestionTab;
