import { Node, Extension } from '@tiptap/core'
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
import './style_oscarlevin.css'
import Divisions from './extensions/Divisions'
import * as Ariakit from "@ariakit/react";
import "./menu.css";

const MenuExample = () => {
  return (
    <Ariakit.MenuProvider>
      <Ariakit.Menu gutter={8} className="menu" id="menuid">
        <Ariakit.MenuItem className="menu-item">
          enter this box
        </Ariakit.MenuItem>
        <Ariakit.MenuSeparator className="separator" />
        <Ariakit.MenuItem className="menu-item">insert before...</Ariakit.MenuItem>
        <Ariakit.MenuItem className="menu-item">insert after...</Ariakit.MenuItem>
        <Ariakit.MenuItem className="menu-item">move</Ariakit.MenuItem>
        <Ariakit.MenuItem className="menu-item">delete</Ariakit.MenuItem>
        <Ariakit.MenuItem className="menu-item">convert [name] to...</Ariakit.MenuItem>
      </Ariakit.Menu>
    </Ariakit.MenuProvider>
  );
}

const getCursorPos = (editor) => {
  const currentPos = editor.$pos(editor.state.selection.$anchor.pos)
  return {
    pos: () => {return editor.state.selection.$anchor.pos},
    depth: () => {return editor.state.selection.$anchor.depth},
    inTextNode: () => {return editor.state.selection.$anchor.parent.firstChild ? (editor.state.selection.$anchor.parent.firstChild.isText) : false},
    prevNodeIsText: () => {return editor.state.selection.$anchor.nodeBefore ? (editor.state.selection.$anchor.nodeBefore.isText) : false},
    nextNodeIsText: () => {return editor.state.selection.$anchor.nodeAfter ? (editor.state.selection.$anchor.nodeAfter.type.name === 'text') : false},
    parentType: () => {return editor.state.selection.$anchor.parent.type.name},
    anchor: () => {return editor.state.selection.$anchor},
    nextNodeSize: () => {return editor.state.selection.$anchor.nodeAfter ? editor.state.selection.$anchor.nodeAfter.nodeSize : 0},
    prevNodeSize: () => {return editor.state.selection.$anchor.nodeBefore ? editor.state.selection.$anchor.nodeBefore.nodeSize : 0},
  }
}


const InfoMessage = () => {
  const { editor } = useCurrentEditor()
  const cursor = getCursorPos(editor)
  // editor.state.selection.$anchor.nodeBefore.type.name
  let currentPos = editor.$pos(editor.state.selection.$anchor.pos)
  return (
    <div className="info">
      <p>
      Dubugging Info:
      </p>
      <ul>
        <li>Position: {cursor.pos()}</li>
        <li> Parent Type: {cursor.parentType()}</li>
        <li> Depth: {cursor.depth()}</li>
        {/* <li> Node before is text? {cursor.nodeBeforeIsText()}</li> */}
        <li> Node before is text? {cursor.prevNodeIsText() ? "Yes" : "no"}</li>
        <li> Node after is text? {cursor.nextNodeIsText() ? "Yes" : "no"}</li>
        <li> Previous node size: {cursor.prevNodeSize()}</li>
        <li> Next node size: {cursor.nextNodeSize()}</li>
        <li> In text node? {cursor.inTextNode() ? "Yes" : "No"}</li>
      </ul>
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

  const MyKeyboardShortcuts = Extension.create({
    name: 'myKeyboardShortcuts',

    addKeyboardShortcuts() {
      const cursor = getCursorPos(this.editor)
      return {
        'Mod-i': () => {console.log(cursor.anchor()); return true},
        // ArrowLeft moves focus to parent node, unless the cursor is in the middle of a text node, in which case it should just do the "normal" thing.
        'ArrowLeft': () => {
          if (cursor.prevNodeIsText()) {return false}
          if (cursor.depth() > 0) {console.log(cursor.depth()); this.editor.commands.selectParentNode(); this.editor.commands.scrollIntoView(); return true} else {this.editor.commands.focus(1,true);return true}
        },
        // ArrowRight moves the position of the cursor to the next position, which can be the next text position or the next node.
        'ArrowRight': () => {this.editor.commands.focus(cursor.pos()+1,true); return true},
        // ArrowDown should move the cursor to the next node at the same depth if on a box.  If in a text node, do the default.
        'ArrowDown': () => {
          if (cursor.inTextNode()) {return false}
          else {this.editor.commands.focus(cursor.pos()+cursor.nextNodeSize(),true); return true}
        },
        // ArrowUp should move the cursor to the start of the previous node at the same depth if on a box.  If in a text node, do the default.
        'ArrowUp': () => {
          if (cursor.inTextNode()) {return false}
          else {this.editor.commands.focus(cursor.pos()-cursor.prevNodeSize(),true); return true}
        },
        // Enter should move the cursor onto the child node if on a box, or add a line break if in a text node.  The second time Enter is pressed inside a text node, directly after a hardBreak, the cursor should create a new text node.
        'Enter': () => {
          if (cursor.inTextNode()) {
            if (!cursor.prevNodeIsText() && cursor.prevNodeSize() === 1){
              const pos = cursor.pos();
              this.editor.commands.splitBlock();
              this.editor.commands.deleteRange({from: pos-1, to: pos+1});
              if (true) return true
            }
            this.editor.commands.setHardBreak();
            return true
          } else {
            toggleMenu()
            return true
 //           this.editor.commands.focus(cursor.pos()+1,true);
 //           return true
          }
        },
        'Mod-b': () => this.editor.chain().focus().setContent(defaultContent).run(),
        'Mod-q': () => this.editor.commands.blur(),
        // Escape moves focus to parent node.
        'Escape': () => this.editor.commands.selectParentNode(),
        'Mod-Right': () => this.editor.commands.selectNodeForward(),
        'Mod-Down': () => this.editor.commands.selectNodeForward(),
        // 'Alt-ArrowUp': () => this.editor.commands.setNodeSelection(currentPos.before ? currentPos.before.pos : currentPos.pos),
        // 'Alt-ArrowDown': () => this.editor.commands.setNodeSelection(currentPos.after ? currentPos.after.pos : currentPos.pos),
      }
    },
  })

  function toggleMenu() {
var x = document.getElementById("menuid");
  if (x.style.display === "none") {
    x.style.display = "block";
  } else {
    x.style.display = "none";
  }
  console.log("can you see the menu?");
  return(true)
  };


  const Document = Node.create({
    name: 'document',
    topNode: true,
    content: 'title introduction? section+',
  })

  const extensions = [
    MyKeyboardShortcuts,
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
  <fact>
  <p>
  This is a fact.
  </p>
  </fact>
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

  <ul>
    <li>
      That’s a bullet list with one …
    </li>
    <li>
      … or two list items.
    </li>
  </ul>

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
        <p>
          {editor.getHTML()}
        </p>
      </details>
    )
  }




  const MyFloatingMenu = () => {
    const { editor } = useCurrentEditor()
    return (
      <FloatingMenu shouldShow={() => {return (editor.isActive('para') && false)}}>
        {/* <nav className="floating-menu">
        <ul tabIndex="0">
          <li
            className={!editor.can().chain().focus().wrapIn('theorem').run() ?'hide-button': ''}>Thereom-like
            <ul>
              <li>Theorem</li>
              <li>Lemma</li>
            </ul>
            </li>
        </ul>
        </nav> */}
        <div className="floating-menu" >
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
            <MenuExample/>
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
