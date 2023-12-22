import HotQuestion from './HotQuestion';
import PopularTags from './PopularTags';

const RightSidebar = () => {
  return (
    <section className="background-light900_dark200 light-border custom-scrollbar 
    sticky right-0 top-0 flex h-screen w-[280px] flex-col overflow-y-auto 
    border-l p-6 pt-36 shadow-light-300 dark:shadow-none max-xl:hidden">
      <HotQuestion />
      <PopularTags />
    </section>
  );
};

export default RightSidebar;