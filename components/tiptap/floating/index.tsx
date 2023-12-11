import { Button } from '@/components/ui/button';
import { FloatingMenu, useCurrentEditor } from '@tiptap/react';
import { Heading1, Heading2 } from 'lucide-react';
import { preventDefault } from '../utils';
const Floation = () => {
  const { editor } = useCurrentEditor();
  if (!editor) return null;
  const handleToggleHeading = preventDefault((e, level) => {
    editor.chain().focus().toggleHeading({ level }).run();
  });
  return (
    <FloatingMenu
    >
      <div className='flex items-center gap-2'>
        <Button
          size='sm'
          variant='destructive'
          className={`
          ${editor.isActive('heading', { level: 1 }) ? 'tip-button-active' : ''}
          border-2 border-solid border-gray-400 hover:border-black  
          `}

          onClick={(e) => handleToggleHeading(e, 1)}
        >
          <Heading1 className='invert-colors-reversal'/>
        </Button>

        <Button
          size='sm'
          variant='destructive'
          className={`
          ${editor.isActive('heading', { level: 2 }) ? 'tip-button-active' : ''}
          border-2 border-solid border-gray-400 hover:border-black 
          `}
          onClick={(e) => handleToggleHeading(e, 2)}
        >
          <Heading2 className='invert-colors-reversal'/>
        </Button>
      </div>
    </FloatingMenu>
  );
};

export default Floation;
