import { useEditor, EditorContent, EditorProvider, FloatingMenu, BubbleMenu, useCurrentEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import React from "react";


const extensions = [
  StarterKit,
]


const content = `<p>Hello World! 🌎️</p>`

const EditorJSONPreview = () => {
  const { editor } = useCurrentEditor

  return (
    <pre>
      {JSON.stringify(editor.getJSON(), null, 2)}
    </pre>
  )
}

const Tiptap = () => {

  // const editor = useEditor({
  //   extensions,
  //   content,
  //   // extensions: [StarterKit],
  //   // content: "<p>Hello World! 🌎️</p>",
  // });

  return (
    <EditorProvider slotAfter={<EditorJSONPreview/>} extensions={extensions} content={content}/>
  )
}

export default Tiptap;
