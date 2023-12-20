import { redirect } from 'next/navigation';

import { getUserById } from '@/lib/actions/user.action';
import QuestionForm from '@/components/form/question';

const AskQuestion = async () => {
  const userId = process.env.NEXT_PUBLIC_USER_ID;
  if (!userId) redirect("/sign-in");

  const mongoUser = await getUserById({ userId });
  return (
    <div>
      <h1 className="h1-bold text-dark100_light900">Ask a question</h1>
      <div className="mt-9">
        <QuestionForm userId={JSON.stringify(mongoUser._id)} />
      </div>
    </div>
  );
};

export default AskQuestion;
