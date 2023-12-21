import { getHotTags } from '@/lib/actions/tag.action';
import RenderTag from '../render-tag';

const PopularTags = async () => {
  const hotTags = await getHotTags() ?? []
  console.log("🚀 ~ file: PopularTags.tsx:6 ~ PopularTags ~ hotTags:", hotTags)
  return (
    <div className="mt-16">
      <h3 className="h3-bold text-dark200_light900">Popular Tags</h3>
      <div className=" mt-7 flex flex-col gap-4">
        {hotTags.map((tag) => (
          <RenderTag
            key={tag._id}
            _id={tag._id}
            name={tag.name}
            totalQuestions={tag.numberOfQuestions}
            showCount
          />
        ))}
      </div>
    </div>
  );
};

export default PopularTags;
