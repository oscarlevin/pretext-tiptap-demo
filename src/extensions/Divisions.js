import {Extension, Node, mergeAttributes, wrappingInputRule } from '@tiptap/core'

const Section = Node.create({
  name: 'section',

  priority: 1000,

  content: 'title? paragraph+',
  
  group: 'block division',

  selectable: false,

  draggable: true,

  defining: false,

  parseHTML() {
    return [
      {
        tag: 'section',
      },
    ]
  },

  renderHTML({ HTMLAttributes }) {
    return ['div', mergeAttributes({ class: 'section' }, HTMLAttributes), 0]
  },

  addInputRules() {
    return [
      wrappingInputRule({
        find: new RegExp(`^#sec\\s$`),
        type: this.type,
      }),
    ]
  },

})



const Divisions = Extension.create({
  name: 'divisions',

  addExtensions() {
    return [
    //   Introduction,
    //   Chapter,
      Section,
    //   Subsection
    ]
  },
})

export default Divisions;