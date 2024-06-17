import { Color } from '@tiptap/extension-color'
import ListItem from '@tiptap/extension-list-item'
import TextStyle from '@tiptap/extension-text-style'
import { EditorProvider, useCurrentEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { Mathematics } from '@tiptap-pro/extension-mathematics'
import 'katex/dist/katex.min.css'
import Focus from '@tiptap/extension-focus'
import Term from './extensions/Term'
import Title from './extensions/Title'
import Definition from './extensions/Definition'
import React from 'react'
import json2ptx from './extensions/json2ptx'
import './styles.scss'


  const MenuBar = () => {
    const { editor } = useCurrentEditor()
  
    if (!editor) {
      return null
    }
  
    return (
      <>
        <button 
          onClick={() => editor.chain().focus().toggleTerm().run()}
          disabled={!editor.can().chain().focus().toggleTerm().run()}
          className={editor.isActive('term') ? 'is-active' : ''}
          >
        term</button>

        <button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          disabled={
            !editor.can()
              .chain()
              .focus()
              .toggleItalic()
              .run()
          }
          className={editor.isActive('italic') ? 'is-active' : ''}
        >
          emphasis
        </button>
        <button
          onClick={() => editor.chain().focus().toggleStrike().run()}
          disabled={
            !editor.can()
              .chain()
              .focus()
              .toggleStrike()
              .run()
          }
          className={editor.isActive('strike') ? 'is-active' : ''}
        >
          strike
        </button>
        <button
          onClick={() => editor.chain().focus().toggleCode().run()}
          disabled={
            !editor.can()
              .chain()
              .focus()
              .toggleCode()
              .run()
          }
          className={editor.isActive('code') ? 'is-active' : ''}
        >
          code
        </button>
        <button onClick={() => editor.chain().focus().unsetAllMarks().run()}>
          clear marks
        </button>
        <button onClick={() => editor.chain().focus().clearNodes().run()}>
          clear nodes
        </button>
        <button
          onClick={() => editor.chain().focus().setParagraph().run()}
          className={editor.isActive('paragraph') ? 'is-active' : ''}
        >
          paragraph
        </button>
        <button
          onClick={() => editor.chain().focus().toggleTitle().run()}
          disabled={!editor.can().chain().focus().toggleTitle().run()}
        >
          Title
        </button>
 
        <button
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={editor.isActive('bulletList') ? 'is-active' : ''}
        >
          bullet list
        </button>
        <button
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={editor.isActive('orderedList') ? 'is-active' : ''}
        >
          ordered list
        </button>
        {/* <button
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
          className={editor.isActive('codeBlock') ? 'is-active' : ''}
        >
          code block
        </button> */}
        <button
          onClick={() => editor.chain().focus().toggleDefinition().run()}
          className={editor.isActive('definition') ? 'is-active' : ''}
        >
          Definition
        </button>
        {/* <button onClick={() => editor.chain().focus().setHorizontalRule().run()}>
          horizontal rule
        </button>
        <button onClick={() => editor.chain().focus().setHardBreak().run()}>
          hard break
        </button> */}
        <button
          onClick={() => editor.chain().focus().undo().run()}
          disabled={
            !editor.can()
              .chain()
              .focus()
              .undo()
              .run()
          }
        >
          undo
        </button>
        <button
          onClick={() => editor.chain().focus().redo().run()}
          disabled={
            !editor.can()
              .chain()
              .focus()
              .redo()
              .run()
          }
        >
          redo
        </button>
        <button
          onClick={() => editor.chain().focus().setContent(defaultContent).run()}
        >
          reset
        </button>
        {/* <button
          onClick={() => editor.chain().focus().setColor('#958DF1').run()}
          className={editor.isActive('textStyle', { color: '#958DF1' }) ? 'is-active' : ''}
        >
          purple
        </button> */}
      </>
    )
  }
  
  const extensions = [
    Term,
    Title,
    Definition,
    Mathematics,
    Focus,
    Color.configure({ types: [TextStyle.name, ListItem.name] }),
    TextStyle.configure({ types: [ListItem.name] }),
    StarterKit.configure({
      bulletList: {
        keepMarks: true,
        keepAttributes: false, // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
      },
      orderedList: {
        keepMarks: true,
        keepAttributes: false, // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
      },
    }),
  ]
  
  const defaultContent = `
  <h1>
    Tiptap Demo
  </h1>
  <p>
    Welcome to this very basic demo of how tiptap can be used to edit PreTeXt.  First, a definition.
  </p>
  <definition>
  A <term>definition block</term> is a section of text that contains a definition.
  </definition>
  <p>
  <ul>
    <li>
      That’s a bullet list with one …
    </li>
    <li>
      … or two list items.
    </li>
  </ul>
</p>
  <p>
    Pretty neat, huh?  Oh yeah, and it can do some math: $\\int_1^2 x^2 dx = \\frac{7}{3}$.  I don't know if you can do display math though.
  </p>
  `

  const EditorPTXPreview = () => {
    const { editor } = useCurrentEditor()

    const ptx = json2ptx(editor.getJSON())

    return (
      <details>
        <summary>Inspect PreTeXt</summary>
        <pre>
          { ptx }
        </pre>
      </details>
    )
  }

  const EditorJSONPreview = () => {
    const { editor } = useCurrentEditor()
  
    return (
      <details>
        <summary>Inspect JSON</summary>
      <pre>
        {JSON.stringify(editor.getJSON(), null, 2)}
      </pre>
      </details>
    )
  }

  const EditorHTMLPreview = () => {
    const { editor } = useCurrentEditor()
  
    return (
      <details>
        <summary>Inspect HTML</summary>
        <pre>
          {editor.getHTML()}
        </pre>
      </details>
    )
  }

  
 const Tiptap = () => {
      return (
        <EditorProvider 
          slotBefore={<MenuBar />} 
          slotAfter={
            <>
            <EditorPTXPreview />
            <EditorJSONPreview/>
            <EditorHTMLPreview/> 
            </>
          } 
          extensions={extensions} 
          content={
            JSON.parse(window.localStorage.getItem('editor-content')) || 
            defaultContent
          }
          onUpdate={ ({ editor }) => {
            const jsonContent = JSON.stringify(editor.getJSON());
            window.localStorage.setItem('editor-content', jsonContent);
          }
          }
        />
      )
    }
        
export default Tiptap;