import { getQuestions } from '@/lib/actions/question.action';
import QuestionCard from '@/components/cards/QuestionCard';
import NotResult from '@/components/shared/not-result';

const HomeQuestion = async ({ searchQuery }: { searchQuery: string }) => {
  const result = await getQuestions({
    searchQuery
  })
  const { questions } = result || {}
  return (
    <div className="mt-10 flex w-full flex-col gap-6">
      {
        questions.length > 0
          ? (
            questions.map((question) => {
              return (
                <QuestionCard
                  key={question._id}
                  _id={question._id}
                  title={question.title}
                  tags={question.tags}
                  author={question.author}
                  upvotes={question.upvotes.length}
                  views={question.views}
                  answers={question.answers}
                  createdAt={question.createdAt} />
              );
            })
          )
          : <NotResult
            title="There&rsquo;s no question to show"
            description="Be the first to break the silence! 🚀 Ask a Question and kickstart the discussion. our query could be the next big thing others learn from. Get involved! 💡"
            link="/ask-question"
            linkTitle="Ask a Question"
          />
      }
    </div>
  );
};

export default HomeQuestion;
