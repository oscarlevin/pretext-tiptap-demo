import {Extension, Node, mergeAttributes, wrappingInputRule } from '@tiptap/core'

const Theorem = Node.create({
  name: 'theorem',

  content: 'title? para+',
  
  group: 'block theoremLike',

  selectable: false,

  draggable: true,

  defining: false,

  parseHTML() {
    return [
      {
        tag: 'theorem',
      },
    ]
  },

  renderHTML({ HTMLAttributes }) {
    return ['div', mergeAttributes({ class: 'theorem theorem-like', label: 'theorem'}, HTMLAttributes), 0]
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
        find: new RegExp(`^#theorem\\s$`),
        type: this.type,
      }),
    ]
  },

})

const Lemma = Node.create({
    name: 'lemma',
    
    content: 'title? para+',
    
    group: 'block theoremLike',
    
    selectable: false,
    
    draggable: true,
    
    defining: false,
    
    parseHTML() {
        return [
        {
            tag: 'lemma',
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

    const Chapter = Node.create({
      name: 'chapter',
      
      content: 'title? para+',
      
      group: 'block theoremLike',
      
      selectable: false,
      
      draggable: true,
      
      defining: false,
      
      parseHTML() {
          return [
          {
              tag: 'chapter',
          },
          ]
      },
      
      renderHTML({ HTMLAttributes }) {
          return ['div', mergeAttributes({ class: 'chapter' }, HTMLAttributes), 0]
      },
      
      addCommands() {
          return {
          setChapter: attributes => ({ commands }) => {
              return commands.setWrap(this.name, attributes)
          },
          toggleChapter: attributes => ({ commands }) => {
              return commands.toggleWrap(this.name, attributes)
          },
          }
      },
      
      addInputRules() {
          return [
          wrappingInputRule({
              find: new RegExp(`^!ch\\s$`),
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
      Chapter,
    ]
  },
})

export default TheoremLike;