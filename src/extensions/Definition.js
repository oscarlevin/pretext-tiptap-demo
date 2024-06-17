import { Node, mergeAttributes, wrappingInputRule } from '@tiptap/core'

const Definition = Node.create({
  name: 'definition',

  content: 'title? paragraph+',
  
  group: 'block definitionLike',

  selectable: true,

  draggable: true,

  // defining: true,

  parseHTML() {
    return [
      {
        tag: 'definition',
      },
      {
        tag: 'div.definition.definition-like',
      },
    ]
  },

  renderHTML({ HTMLAttributes }) {
    return ['div', mergeAttributes({ class: 'definition definition-like' }, HTMLAttributes), 0]
  },

  addCommands() {
    return {
      setDefinition: attributes => ({ commands }) => {
        return commands.setWrap(this.name, attributes)
      },
      toggleDefinition: attributes => ({ commands }) => {
        return commands.toggleWrap(this.name, attributes)
      },
    }
  },

  addInputRules() {
    return [
      wrappingInputRule({
        find: new RegExp(`^!def\\s$`),
        type: this.type,
      }),
    ]
  },

})

export default Definition;