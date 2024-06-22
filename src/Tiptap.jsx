import { Node, Extension } from '@tiptap/core'
import { EditorProvider, useCurrentEditor, FloatingMenu} from '@tiptap/react'
import { History } from '@tiptap/extension-history'
// import FloatingMenu from '@tiptap/extension-floating-menu'
import { Mathematics } from '@tiptap-pro/extension-mathematics'
import { FileHandler } from '@tiptap-pro/extension-file-handler'
import 'katex/dist/katex.min.css' 
import Focus from '@tiptap/extension-focus'
import Inline from './extensions/Inline'
import Blocks from './extensions/Blocks'
import Term from './extensions/Term'
import Title from './extensions/Title'
import Definition from './extensions/Definition'
import KeyboardCommands from './extensions/Keyboard'
import React from 'react'
import json2ptx from './extensions/json2ptx'
import './styles.scss'
import './style_oscarlevin.css'
import Divisions from './extensions/Divisions'
import * as Ariakit from "@ariakit/react";
import "./menu.css";
import { getCursorPos } from './extensions/getCursorPos'
import { MenuBar } from './MenuBar'
import { defaultContent } from './defaultContent'

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



export  function toggleMenu() {
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
    KeyboardCommands,
    Document,
    Inline,
    Blocks,
    Divisions,
    Term,
    Title,
    Definition,
    Mathematics,
    Focus.configure({
      mode: 'deepest',
    }),
    History,
    FileHandler.configure({
      allowedMimeTypes: ['text/*'],
      onDrop: (currentEditor, files, pos) => {
        files.forEach(file => {
          const fileReader = new FileReader()
          fileReader.readAsText(file)
          // fileReader.readAsDataURL(file)
          fileReader.onload = () => {
            const content = fileReader.result
            console.log(content)
            console.log(content)
            currentEditor.chain().insertContentAt(pos, content).focus().run()
          }
        })
      },
      onPaste: (currentEditor, files, htmlContent) => {
        files.forEach(file => {
          if (htmlContent) {
            // if there is htmlContent, stop manual insertion & let other extensions handle insertion via inputRule
            // you could extract the pasted file from this url string and upload it to a server for example
            console.log(htmlContent) // eslint-disable-line no-console
            return false
          }

          const fileReader = new FileReader()

          fileReader.readAsDataURL(file)
          fileReader.onload = () => {
            currentEditor.chain().insertContentAt(currentEditor.state.selection.anchor, {
              type: 'image',
              attrs: {
                src: fileReader.result,
              },
            }).focus().run()
          }
        })
      },
    }),
  ]

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
