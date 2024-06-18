import {Extension, Node, mergeAttributes, wrappingInputRule } from '@tiptap/core'

const Theorem = Node.create({
  name: 'theorem',

  content: 'title? paragraph+',
  
  group: 'block theoremLike',

  selectable: false,

  draggable: true,

  defining: false,

  parseHTML() {
    return [
      {
        tag: 'theorem',
      },
      {
        tag: 'div.theorem.theorem-like',
      },
    ]
  },

  renderHTML({ HTMLAttributes }) {
    return ['div', mergeAttributes({ class: 'theorem theorem-like' }, HTMLAttributes), 0]
  },

  addCommands() {
    return {
      setTheorem: attributes => ({ commands }) => {
        return commands.setWrap(this.name, attributes)
      },
      toggleTheorem: attributes => ({ commands }) => {
        return commands.toggleWrap(this.name, attributes)
      },
    }
  },

  addInputRules() {
    return [
      wrappingInputRule({
        find: new RegExp(`^!thm\\s$`),
        type: this.type,
      }),
    ]
  },

})

const Lemma = Node.create({
    name: 'lemma',
    
    content: 'title? paragraph+',
    
    group: 'block theoremLike',
    
    selectable: false,
    
    draggable: true,
    
    defining: false,
    
    parseHTML() {
        return [
        {
            tag: 'lemma',
        },
        {
            tag: 'div.lemma.theorem-like',
        },
        ]
    },
    
    renderHTML({ HTMLAttributes }) {
        return ['div', mergeAttributes({ class: 'lemma theorem-like' }, HTMLAttributes), 0]
    },
    
    addCommands() {
        return {
        setLemma: attributes => ({ commands }) => {
            return commands.setWrap(this.name, attributes)
        },
        toggleLemma: attributes => ({ commands }) => {
            return commands.toggleWrap(this.name, attributes)
        },
        }
    },
    
    addInputRules() {
        return [
        wrappingInputRule({
            find: new RegExp(`^!lem\\s$`),
            type: this.type,
        }),
        ]
    },
    
    })

const TheoremLike = Extension.create({
  name: 'theoremLike',

  addExtensions() {
    return [
      Theorem,
      Lemma,
    ]
  },
})

export default TheoremLike;