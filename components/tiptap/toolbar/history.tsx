'use client';
import { Button } from '@/components/ui/button';
import { useCurrentEditor } from '@tiptap/react';
import { CornerUpLeft, CornerUpRight } from 'lucide-react';
import { preventDefault } from '../utils';

const History = () => {
  const { editor } = useCurrentEditor();
  if (!editor) return null;

  const handleUndoClick = preventDefault(() => {
    editor.chain().focus().undo().run();
  });

  const handleRedoClick = preventDefault(() => {
    editor.chain().focus().redo().run();
  });

  return (
    <div className='flex items-center'>
      <Button
        size="icon"
        className='tip-button-hover'
        onClick={handleUndoClick}
        disabled={!editor.can().undo()}>
        <CornerUpLeft className='invert-colors-reversal'/>
      </Button>
      <Button
        size="icon"
        className='tip-button-hover'
        onClick={handleRedoClick}
        disabled={!editor.can().redo()}>
        <CornerUpRight className='invert-colors-reversal'/>
      </Button>
    </div>
  );
};

export default History;
