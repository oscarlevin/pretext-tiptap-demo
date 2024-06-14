import { Mark, mergeAttributes, markInputRule } from '@tiptap/core'

export const inputPTXRegex = /(?:^|\s)(<term>(.*?)<\/term>)$/
export const inputMDRegex = /(?:^|\s)(\*(.*?)\*)$/
export const inputRegex = /(?:^|\s)`t\s$/

// /(?:^|\s)(`(?!\s+`)((?:[^`]+))`(?!\s+`))$/

const Definition = Mark.create({
  name: 'term',
  
  group: 'marks',


  parseHTML() {
    return [
      { tag: 'term' },
    ]
  }, 

  renderHTML({ HTMLAttributes }) {
    return ['span',mergeAttributes({class: 'term'}, HTMLAttributes), 0]
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
      markInputRule({
        find: inputPTXRegex,
        type: this.type,
      }),
      markInputRule({
        find: inputMDRegex,
        type: this.type,
      }),
    ]
  },

})

export default Definition;