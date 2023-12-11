'use client';
import { Button } from '@/components/ui/button';
import { useCurrentEditor } from '@tiptap/react';
import { Bold, Italic, Strikethrough } from 'lucide-react';
import { preventDefault } from '../utils';

const Marks = () => {
  const { editor } = useCurrentEditor();
  if (!editor) return null;
  const handleToggleBoldClick = preventDefault(() => {
    editor.chain().focus().toggleBold().run();
  });
  const handleToggleItalicClick = preventDefault(() => {
    editor.chain().focus().toggleItalic().run();
  });
  const handleToggleStrike = preventDefault(() => {
    editor.chain().focus().toggleStrike().run();
  });
  return (
    <div className='flex items-center gap-2'>
      <Button
        size="icon"
        className={`${editor.isActive('bold') ? 'tip-button-active' : ''} tip-button-hover`}
        onClick={handleToggleBoldClick}
      >
        <Bold className='invert-colors-reversal'/>
      </Button>
      <Button
        size="icon"
        className={`${editor.isActive('italic') ? 'tip-button-active' : ''} tip-button-hover`}
        onClick={handleToggleItalicClick}
      >
        <Italic className='invert-colors-reversal'/>
      </Button>
      <Button
        size="icon"
        className={`${editor.isActive('strike') ? 'tip-button-active' : ''} tip-button-hover`}
        onClick={handleToggleStrike}
      >
        <Strikethrough className='invert-colors-reversal'/>
      </Button>
    </div>
  );
};

export default Marks;
