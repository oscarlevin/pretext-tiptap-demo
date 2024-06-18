import { Node, mergeAttributes, wrappingInputRule } from '@tiptap/core'

const Definition = Node.create({
  name: 'definition',

  content: 'title? paragraph+',
  
  group: 'block definitionLike',

  selectable: true,

  draggable: true,

  defining: false,

  
  // This would make it so an extra delete would not delete the parent node.  Not sure how we would end up deleting it. 
  // isolating: true,

  parseHTML() {
    return [
      {
        tag: 'definition',
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