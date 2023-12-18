import { redirect } from 'next/navigation';
import QuestionForm from './components/QuestionForm';
import { getUserById } from '@/lib/actions/user.action';

const AskQuestion = async () => {
  const userId = "clerk123";
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
