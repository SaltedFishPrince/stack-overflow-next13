'use client';
import { EditorProvider, EditorProviderProps } from '@tiptap/react';
import Floation from './floating';
import extensions from './function';
import './style.css';
import TiptapToolbar from './toolbar/index';

const Tiptap = (props: Omit<EditorProviderProps, 'children'>) => {
  return (
    <div className='shadow-light100_dark100 light-border-2  rounded-lg border-2 overflow-hidden'>
      <div className='overflow-auto'>
        <EditorProvider
          {...props}
          slotBefore={<TiptapToolbar />}
          extensions={extensions}
          editorProps={{
            attributes: {
              class: ' outline-none h-[300px] max-h-[500px] overflow-auto pl-4 py-2 text-black dark:text-white'
            }
          }}>
          <Floation />
        </EditorProvider>
      </div>
    </div>
  );
};

export default Tiptap;
