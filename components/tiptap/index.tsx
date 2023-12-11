'use client';
import { EditorProvider } from '@tiptap/react';
import Floation from './floating';
import extensions from './function';
import './style.css';
import TiptapToolbar from './toolbar/index';

const content = '';

const Tiptap = () => {
  return (
    <div className='shadow-light100_dark100 light-border-2  rounded-lg border-2'>
      <div className='overflow-auto'>
        <EditorProvider
          slotBefore={<TiptapToolbar/>}
          extensions={extensions}
          content={content}
          editorProps={{
            attributes: {
              class: ' outline-none h-[300px] max-h-[500px] overflow-auto pl-4 py-2 text-black dark:text-white'
            }
          }}>
          <Floation/>
        </EditorProvider>
      </div>
    </div>
  );
};

export default Tiptap;
