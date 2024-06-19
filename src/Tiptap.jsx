import { Node } from '@tiptap/core'
import { EditorProvider, useCurrentEditor, FloatingMenu} from '@tiptap/react'
import { History } from '@tiptap/extension-history'
// import FloatingMenu from '@tiptap/extension-floating-menu'
import { Mathematics } from '@tiptap-pro/extension-mathematics'
import 'katex/dist/katex.min.css'
import Focus from '@tiptap/extension-focus'
import Inline from './extensions/Inline'
import Blocks from './extensions/Blocks'
import Term from './extensions/Term'
import Title from './extensions/Title'
import Definition from './extensions/Definition'
import React from 'react'
import json2ptx from './extensions/json2ptx'
import './styles.scss'
import Divisions from './extensions/Divisions'

const InfoMessage = () => {
  const { editor } = useCurrentEditor()
  console.log(editor.state.selection.$anchor)
  return (
    <div className="info">
      
      Info. Position: {editor.state.selection.anchor}
    </div>
  )
}



  const MenuBar = () => {
    const { editor } = useCurrentEditor()
  
    if (!editor) {
      return null
    }
  
    return (
      <>
        <button
          onClick={() => editor.chain().focus().insertContent(`<definition><title>Definition</title><p></p></definition>`).run()}
          >Testing</button>
        {/* <button 
          onClick={() => editor.chain().focus().wrapIn('chapter').run()}
          disabled={!editor.can().chain().focus().wrapIn('chapter').run()}
          className={editor.isActive('chapter') ? 'is-active' : ''}
          >
        Chapter
        </button> */}

        <button 
          onClick={() => editor.chain().focus().toggleMark('term').run()}
          disabled={!editor.can().chain().focus().toggleMark('term').run()}
          className={editor.isActive('term') ? 'is-active' : ''}
          >
        term</button>

        {/* <button
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
        </button> */}
        {/* <button
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
        </button> */}
        {/* <button
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
        </button> */}
        <button onClick={() => editor.chain().focus().unsetAllMarks().run()}>
          clear marks
        </button>
        <button onClick={() => editor.chain().focus().clearNodes().run()}>
          clear nodes
        </button>
        {/* <button
          onClick={() => editor.chain().focus().setParagraph().run()}
          className={editor.isActive('para') ? 'is-active' : ''}
        >
          paragraph
        </button> */}
        <button
          onClick={() => editor.chain().focus().toggleTitle().run()}
          disabled={!editor.can().chain().focus().toggleTitle().run()}
        >
          Title
        </button>
 
        {/* <button
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
        </button> */}
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
  
  const Document = Node.create({
    name: 'document',
    topNode: true,
    content: 'title para* introduction? section+',
  })

  const extensions = [
    Document,
    Inline,
    Blocks,
    Divisions,
    Term,
    Title,
    Definition,
    Mathematics,
    Focus,
    History,
  ]
  
  const defaultContent = `
  <title>My Document</title>
  <introduction>
  <p>
    This is an introduction.  It can contain <term>terms</term> and <em>emphasis</em>.
  </p>
  </introduction>
  <section>
  <title>My Section</title>
  <p>
    This is a paragraph.  It can contain <term>terms</term> and <em>emphasis</em>.
  </p>
  <corollary>
  <title>My Corollary</title>
  <p>
    This is a paragraph in a section.  It can contain <term>terms</term> and <em>emphasis</em>.
  </p>
  </corollary>
  <theorem>
  <title>My Theorem</title>
  <p>
    This is a paragraph in a section.  It can contain <term>terms</term> and <em>emphasis</em>.
  </p>
  </theorem>
  <p>Lemma text here</p>
  <p>Another paragraph</p>
  <p>
    Welcome to this very basic demo of how tiptap can be used to edit PreTeXt.  First, a definition.
  </p>

  <conjecture>
  <title>Title of Conjecture</title>

  <p>
  A <term>conjecture</term> is somethign you hope is true.
  </p>
  <p> Another paragraph </p>
    
  </conjecture>

  <definition>
  <title>Title of Definition</title>

  <p>
  A <term>definition block</term> is a section of text that contains a definition.
  </p>
  <p> Another paragraph </p>

  </definition>

  <assumption>
  <title>Title of Assumption</title>

  <p>
  An <term>assumption</term> is something you assume.
  </p>

  </assumption>
  
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
  <theorem>
    <title>My Theorem</title>

    <p>This is a theorem</p>
    <p>Another paragraph</p>
  </theorem>

  <p> And that's the end of the demo.  Thanks for coming!</p>
  </section>
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




  const MyFloatingMenu = () => {
    const { editor } = useCurrentEditor()
    return (
      <FloatingMenu shouldShow={() => {return editor.isActive('para')}}>
        <div className="floating-menu">
          <button
            onClick={() => editor.chain().focus().wrapIn('theorem').run()}
            className={!editor.can().chain().focus().wrapIn('theorem').run() ?'hide-button': ''}
          >
            Theorem
          </button>
          <button
            onClick={() => editor.chain().focus().wrapIn('conjecture').run()}
            className={!editor.can().chain().focus().wrapIn('conjecture').run() ?'hide-button': ''}
          >
            Conjecture
          </button>
          <button
            onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
            className={editor.isActive('heading', { level: 2 }) ? 'is-active' : ''}
          >
            H2
          </button>
          <button
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            className={editor.isActive('bulletList') ? 'is-active' : ''}
          >
            Bullet list
          </button>
        </div>
      </FloatingMenu>
    )
  }

 const Tiptap = () => {
  const { editor } = useCurrentEditor()
      return (
        <EditorProvider 
          slotBefore={
            <>
            <MenuBar /> 
            <InfoMessage/>
            </>
          } 
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
        >
          <MyFloatingMenu />
                {/* <BubbleMenu>This is the bubble menu</BubbleMenu> */}
        </EditorProvider>
      )
    }
        
export default Tiptap;
