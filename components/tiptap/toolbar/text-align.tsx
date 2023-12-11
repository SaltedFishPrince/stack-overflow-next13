import { Button } from '@/components/ui/button';
import { useCurrentEditor } from '@tiptap/react';
import { AlignCenter, AlignJustify, AlignLeft, AlignRight } from 'lucide-react';
import { preventDefault } from '../utils';
type Align = 'left' | 'center' | 'right' | 'justify';
const TextAlign = () => {
  const { editor } = useCurrentEditor();
  if (!editor) return null;
  const handleSetTextAlignClick = preventDefault((_e, align:Align) => {
    editor.chain().focus().setTextAlign(align).run();
  });
  return (
    <div className='flex items-center gap-2'>
      <Button
        size="icon"
        className={`${editor.isActive({ textAlign: 'left' }) ? 'tip-button-active' : ''} tip-button-hover`}
        onClick={(e) => handleSetTextAlignClick(e, 'left')}
      >
        <AlignLeft className='invert-colors-reversal'/>
      </Button>

      <Button
        size="icon"
        className={`${editor.isActive({ textAlign: 'center' }) ? 'tip-button-active' : ''} tip-button-hover`}
        onClick={(e) => handleSetTextAlignClick(e, 'center')}
      >
        <AlignRight className='invert-colors-reversal'/>
      </Button>

      <Button
        size="icon"
        className={`${editor.isActive({ textAlign: 'right' }) ? 'tip-button-active' : ''} tip-button-hover`}
        onClick={(e) => handleSetTextAlignClick(e, 'right')}
      >
        <AlignCenter className='invert-colors-reversal'/>
      </Button>

      <Button
        size="icon"
        className={`${editor.isActive({ textAlign: 'justify' }) ? 'tip-button-active' : ''} tip-button-hover`}
        onClick={(e) => handleSetTextAlignClick(e, 'justify')}
      >
        <AlignJustify className='invert-colors-reversal'/>
      </Button>
    </div>
  );
};

export default TextAlign;
