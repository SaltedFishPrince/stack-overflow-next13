import Link from "next/link"
import Image from "next/image";
import Metric from "@/components/shared/Metric";
import { formatAndDivideNumber, getTimestamp } from "@/lib/utils";
import RenderTag from "@/components/shared/render-tag";
import { getUserById } from "@/lib/actions/user.action";
import { getQuestionById } from "@/lib/actions/question.action";
import ParseHTML from "@/components/shared/parse-html";
import Answer from "../components/Answer";
import AllAnswers from "../components/AllAnswers";
import Voting from "@/components/shared/voting";
import { viewQuestion } from "@/lib/actions/interaction.action";
interface Props {
  params: {
    id: string
  }
}
const Page = async ({ params }: Props) => {
  const result = await getQuestionById({ questionId: params.id });
  const clerkId = process.env.NEXT_PUBLIC_USER_ID

  let mongoUser;

  if (clerkId) {
    mongoUser = await getUserById({ userId: clerkId });
    await viewQuestion({
      userId: mongoUser._id,
      questionId: params.id,
    })
  }


  return (
    <div className="w-full">
      <div className="flex-start w-full flex-col">
        <div className="flex w-full flex-col-reverse justify-between gap-5 sm:flex-row sm:items-center sm:gap-2">
          <Link
            href={`/profile/${result.author._id}`}
            className="flex items-center justify-start gap-1"
          >
            <Image
              src={result.author.picture}
              className="rounded-full"
              width={22}
              height={22}
              alt="profile"
            />
            <p className="paragraph-semibold text-dark300_light700">
              {result.author.name}
            </p>
          </Link>
          <div className="flex justify-end">
            <Voting
              type="Question"
              itemId={JSON.stringify(result.id)}
              userId={JSON.stringify(mongoUser!._id)}
              upvotes={result.upvotes.length}
              hasupVoted={result.upvotes.includes(mongoUser!._id)}
              downvotes={result.downvotes.length}
              hasdownVoted={result.downvotes.includes(mongoUser!._id)}
              hasSaved={mongoUser?.saved.includes(result._id)} />
          </div>
        </div>
        <h2 className="h2-semibold text-dark200_light900 mt-3.5 w-full text-left">
          {result.title}
        </h2>
      </div>
      <div className="mb-8 mt-5 flex flex-wrap gap-4">
        <Metric
          imgUrl="/assets/icons/clock.svg"
          alt="clock icon"
          value={` asked ${getTimestamp(result.createdAt)}`}
          title="Asked"
          textStyles="small-medium text-dark400_light800"
        />
        <Metric
          imgUrl="/assets/icons/message.svg"
          alt="message"
          value={formatAndDivideNumber(result.answers.length)}
          title=" Answers"
          textStyles="small-medium text-dark400_light800"
        />
        <Metric
          imgUrl="/assets/icons/eye.svg"
          alt="eye"
          value={formatAndDivideNumber(result.views)}
          title=" Votes"
          textStyles="small-medium text-dark400_light800"
        />
      </div>
      <ParseHTML data={result.content} />
      <div className="mt-8 flex flex-wrap gap-2">
        {result.tags.map((tag: any) => (
          <RenderTag
            key={tag._id}
            _id={tag._id}
            name={tag.name}
            showCount={false}
          />
        ))}
      </div>

      <AllAnswers
        questionId={result._id}
        userId={mongoUser!._id}
        totalAnswers={result.answers.length}
      />

      {
        mongoUser && (
          <Answer
            question={result.content}
            questionId={JSON.stringify(result._id)}
            authorId={JSON.stringify(mongoUser._id)}
          />
        )
      }
    </div>
  )
}


export default Page