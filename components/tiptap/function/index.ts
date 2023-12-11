// import Placeholder from '@tiptap/extension-placeholder';
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight';
import TextAlign from '@tiptap/extension-text-align';
import StarterKit from '@tiptap/starter-kit';
import css from 'highlight.js/lib/languages/css';
import js from 'highlight.js/lib/languages/javascript';
import ts from 'highlight.js/lib/languages/typescript';
import html from 'highlight.js/lib/languages/xml';
import { common, createLowlight } from 'lowlight';
const lowlight = createLowlight(common);
lowlight.register({ js });
lowlight.register({ css });
lowlight.register({ html });
lowlight.register({ ts });
const extensions = [
  StarterKit,
  // Placeholder.configure({
  //   showOnlyWhenEditable: true,
  //   placeholder: 'Write something …'
  // }),
  TextAlign.configure({
    types: ['heading', 'paragraph']
  }),
  CodeBlockLowlight.configure({
    defaultLanguage: 'plaintext',
    lowlight
  })
];

export default extensions;
