import {Extension, Node, mergeAttributes, wrappingInputRule } from '@tiptap/core'

const Introduction = Node.create({
  name: 'introduction',

  content: 'para+',

  group: 'division introduction',
  
  selectable: false,

  draggable: true,

  defining: false,

  parseHTML() {
    return [
      {
        tag: 'introduction',
      },
    ]
  },

  renderHTML({ HTMLAttributes }) {
    return ['article', mergeAttributes({ class: 'introduction', label: 'introduction'}, HTMLAttributes), 0]
  },

  addInputRules() {
    return [
      wrappingInputRule({
        find: new RegExp(`^#intro\\s$`),
        type: this.type,
      }),
    ]
  },

})

const Section = Node.create({
  name: 'section',

  content: 'title block+',
  
  group: 'division',

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
    return ['article', mergeAttributes({ class: 'section', label: 'section'}, HTMLAttributes), 0]
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

const Subsection = Node.create({
  name: 'subsection',

  content: 'title block+',
  
  group: 'division',

  selectable: false,

  draggable: true,

  defining: false,

  parseHTML() {
    return [
      {
        tag: 'subsection',
      },
    ]
  },

  renderHTML({ HTMLAttributes }) {
    return ['article', mergeAttributes({ class: 'subsection', label: 'subsection' }, HTMLAttributes), 0]
  },

  addInputRules() {
    return [
      wrappingInputRule({
        find: new RegExp(`^#subsec\\s$`),
        type: this.type,
      }),
    ]
  },

})

const Divisions = Extension.create({
  name: 'divisions',

  addExtensions() {
    return [
      Introduction,
      Section,
      Subsection,
    ]
  },
})

export default Divisions;