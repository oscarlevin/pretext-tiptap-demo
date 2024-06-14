import { Mark, mergeAttributes, markInputRule } from '@tiptap/core'

export const inputRegex = /(?:^|\s)(<term>(.*?)<\/term>)$/

// /(?:^|\s)(`(?!\s+`)((?:[^`]+))`(?!\s+`))$/

const Definition = Mark.create({
  name: 'term',
  
  group: 'marks',


  parseHTML() {
    return [
      { tag: 'dfn' },
    ]
  }, 

  renderHTML({ HTMLAttributes }) {
    return ['dfn',mergeAttributes({class: 'terminology'}, HTMLAttributes), 0]
  },

  addCommands() {
    return {
      setTerm: () => ({ commands }) => {
        return commands.setMark(this.name)
      },
      toggleTerm: () => ({ commands }) => {
        return commands.toggleMark(this.name)
      },
      unsetTerm: () => ({ commands }) => {
        return commands.unsetMark(this.name)
      },
    }
  },

  addKeyboardShortcuts() {
    return {
      'Mod-d': () => this.editor.commands.toggleTerm()
    }
  },

  addInputRules() {
    return [
      markInputRule({
        find: inputRegex,
        type: this.type,
      }),
    ]
  },

})

export default Definition;