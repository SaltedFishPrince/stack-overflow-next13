import SideBarList from '@/components/shared/sidebar-list';

const LeftSideBar = () => {
  return (
    <SideBarList
      as='section'
      className="background-light900_dark200 light-border
      custom-scrollbar sticky left-0 top-0 flex
      h-screen flex-col justify-between overflow-y-auto border-r p-6 pt-36
      shadow-light-300 dark:shadow-none max-sm:hidden lg:w-[266px]"
    />
  );
};

export default LeftSideBar;
