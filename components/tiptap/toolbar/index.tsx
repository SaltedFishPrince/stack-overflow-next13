import History from './history';
import Marks from './marks';
import TextAlign from './text-align';
const TiptapToolbar = () => {
  return (
    <div className='flex min-h-[40px] items-center gap-6 px-4 py-2 shadow-md'>
      <History/>
      <Marks/>
      <TextAlign/>
    </div>
  );
};

export default TiptapToolbar;
