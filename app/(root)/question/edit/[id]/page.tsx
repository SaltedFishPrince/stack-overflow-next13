import QuestionForm from '@/components/form/question';

import { getQuestionById } from "@/lib/actions/question.action";
import { getUserById } from "@/lib/actions/user.action";
import { ParamsProps } from "@/types";
import { auth } from "@clerk/nextjs";

const Page = async ({ params }: ParamsProps) => {
  const userId = process.env.NEXT_PUBLIC_USER_ID
  if (!userId) return null;

  const mongoUser = await getUserById({ userId });
  const questionDetails = await getQuestionById({ questionId: params.id });

  return (
    <>
      <h1 className="h1-bold text-dark100_light900">Edit Question</h1>

      <div className="mt-9">
        <QuestionForm
          type="Edit"
          userId={mongoUser._id}
          questionDetails={JSON.stringify(questionDetails)}
        />
      </div>
    </>
  );
};

export default Page;
