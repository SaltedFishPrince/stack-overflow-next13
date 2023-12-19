import QuestionCard from "@/components/cards/QuestionCard"
import Filter from "@/components/shared/filter"
import NotResult from "@/components/shared/not-result"
import LocalSearchBar from "@/components/shared/search/LocalSearchBar"
import { QuestionFilters } from "@/constants/filters"
import { getSavedQuestions } from "@/lib/actions/user.action"

const Page = async () => {
  const clerkId = process.env.NEXT_PUBLIC_USER_ID

  const result = await getSavedQuestions({
    clerkId: clerkId!
  }) ?? { saved: [] }
  return (
    <>
      <h1 className="h1-bold text-dark100_light900">Saved Questions</h1>

      <div className="mt-11 flex justify-between gap-5 max-sm:flex-col sm:items-center">
        <LocalSearchBar
          route="/"
          iconPosition="left"
          imgSrc="/assets/icons/search.svg"
          placeholder="Search for questions"
          otherClasses="flex-1"
        />

        <Filter
          filters={QuestionFilters}
          otherClasses="min-h-[56px] sm:min-w-[170px]"
        />
      </div>

      <div className="mt-10 flex w-full flex-col gap-6">
        {result.saved.length > 0 ? (
          result.saved.map((question: any) => (
            <QuestionCard
              key={question._id}
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
        ) : (
          <NotResult
            title="There’s no saved question to show"
            description="Be the first to break the silence! 🚀 Ask a Question and kickstart the discussion. our query could be the next big thing others learn from. Get involved! 💡"
            link="/ask-question"
            linkTitle="Ask a Question"
          />
        )}
      </div></>
  )
}

export default Page
