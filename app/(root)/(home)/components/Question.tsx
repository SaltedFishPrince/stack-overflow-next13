import QuestionCard from '../../../../components/cards/QuestionCard';
import NotResult from '../../../../components/shared/not-result';

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
      name: 'SaltedFish',
      picture: '/assets/images/avatar.jpeg'
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
      picture: '/assets/images/avatar.jpeg'
    },
    upvotes: 15,
    views: 120,
    answers: [{}, {}], // Placeholder objects for answers
    createdAt: new Date('2023-06-15T10:30:00.000Z')
  }
];

const QuestionList = () => {
  return (
    questions.map((question) => {
      return (
        <QuestionCard
          key={question._id}
          _id={question._id}
          title={question.title}
          tags={question.tags}
          author={question.author}
          upvotes={question.upvotes}
          views={question.views}
          answers={question.answers}
          createdAt={question.createdAt}/>
      );
    })
  );
};

const HomeQuestion = () => {
  return (
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
  );
};

export default HomeQuestion;
