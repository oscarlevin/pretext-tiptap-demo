import { Node, mergeAttributes, textblockTypeInputRule } from '@tiptap/core'





const Title = Node.create({
  name: 'title',

  addOptions() {
    return {
      levels: [1, 2, 3, 4, 5, 6],
      HTMLAttributes: {},
    }
  },

  content: 'inline*',

  group: 'block title',

  defining: true,

  addAttributes() {
    return {
      level: {
        default: 1,
        rendered: false,
      },
    }
  },

  parseHTML() {
    return this.options.levels
      .map((level) => ({
        tag: `h${level}`,
        attrs: { level },
      }))
  },

  renderHTML({ HTMLAttributes }) {

    // return ['h4', {class: "heading"}, ['span', {class: "type"}, "Definition"], ['span', {class: "space"}, " " ], ['span', {class: "codenumber"}, "xx.yy"], ['span', {class: "period"}, "."], ['span', {class: "space"}, " "], ['span', {class: "title"}, 0]]
    return ['h4', mergeAttributes({class: "title"}, HTMLAttributes), 0]
  },



  addCommands() {
    return {
      setTitle: attributes => ({ commands }) => {
        return commands.setNode(this.name, attributes)
      },
      toggleTitle: attributes => ({ commands }) => {
        return commands.toggleNode(this.name, 'paragraph', attributes)
      },
    }
  },

  addKeyboardShortcuts() {
    return this.options.levels.reduce((items, level) => ({
      ...items,
      ...{
        [`Mod-Alt-t`]: () => this.editor.commands.toggleTitle({ level }),
      },
    }), {})
  },

  addInputRules() {
    return [
      textblockTypeInputRule({
        find: new RegExp(`^@t\\s$`),
        type: this.type,
      }),
    ]
  },
})




export default Title;