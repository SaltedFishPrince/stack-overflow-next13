import RenderTag from '../render-tag';

const popularTags = [
  { _id: 1, name: 'javascript', totalQuestions: 5 },
  { _id: 2, name: 'react', totalQuestions: 3 },
  { _id: 3, name: 'next', totalQuestions: 4 },
  { _id: 4, name: 'redux', totalQuestions: 2 },
  { _id: 5, name: 'java', totalQuestions: 5 }
];
const PopularTags = () => {
  return (
    <div className="mt-16">
      <h3 className="h3-bold text-dark200_light900">Popular Tags</h3>
      <div className=" mt-7 flex flex-col gap-4">
        {popularTags.map((tag) => (
          <RenderTag
            key={tag._id}
            _id={tag._id}
            name={tag.name}
            totalQuestions={tag.totalQuestions}
            showCount
          />
        ))}
      </div>
    </div>
  );
};

export default PopularTags;
