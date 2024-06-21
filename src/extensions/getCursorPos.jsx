export const getCursorPos = (editor) => {
  const currentPos = editor.$pos(editor.state.selection.$anchor.pos);
  return {
    pos: () => { return editor.state.selection.$anchor.pos; },
    depth: () => { return editor.state.selection.$anchor.depth; },
    inTextNode: () => { return editor.state.selection.$anchor.parent.firstChild ? (editor.state.selection.$anchor.parent.firstChild.isText) : false; },
    prevNodeIsText: () => { return editor.state.selection.$anchor.nodeBefore ? (editor.state.selection.$anchor.nodeBefore.isText) : false; },
    nextNodeIsText: () => { return editor.state.selection.$anchor.nodeAfter ? (editor.state.selection.$anchor.nodeAfter.type.name === 'text') : false; },
    parentType: () => { return editor.state.selection.$anchor.parent.type.name; },
    anchor: () => { return editor.state.selection.$anchor; },
    nextNodeSize: () => { return editor.state.selection.$anchor.nodeAfter ? editor.state.selection.$anchor.nodeAfter.nodeSize : 0; },
    prevNodeSize: () => { return editor.state.selection.$anchor.nodeBefore ? editor.state.selection.$anchor.nodeBefore.nodeSize : 0; },
  };
};
