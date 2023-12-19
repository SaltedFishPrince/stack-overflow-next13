import LeftSideBar from '@/components/shared/left-sidebar';
import NavBar from '@/components/shared/navbar';
import RightSidebar from '@/components/shared/right-sidebar';
import type React from 'react';

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className='background-light850_dark100 relative'>
      <NavBar />
      <div className='flex'>
        <LeftSideBar />
        <section className='flex min-h-screen w-full flex-1 overflow-hidden flex-col px-6 pb-6 pt-36 max-md:pb-14 sm:px-14'>
          <div className='mx-auto w-full max-w-5xl'>
            {
              children
            }
          </div>
        </section>
        <RightSidebar />
      </div>
    </main>
  );
};

export default MainLayout;
