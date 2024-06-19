import {Extension, Node, mergeAttributes, wrappingInputRule, nodeInputRule } from '@tiptap/core'


const TheoremLikeElements = ["theorem", "lemma", "corollary", "proposition", "conjecture", "claim", "fact"]


const TheoremLike = Extension.create({
  name: 'theoremLike',

  addExtensions() {
    const array = []
    for (let element of TheoremLikeElements) {
      array.push(Node.create({
        name: element,
        content: 'title? para+',
        group: 'block theoremLike',
        selectable: true,
        draggable: true,
        parseHTML() {
          return [
            {
              tag: element,
            },
          ]
        },
        renderHTML({ HTMLAttributes }) {
          return ['article', mergeAttributes({ class: `${element} theorem-like`, label: element }, HTMLAttributes), 0]
        },
        addCommands() {
          return {
            [`set${element.charAt(0).toUpperCase() + element.slice(1)}`]: attributes => ({ commands }) => {
              return commands.setWrap(this.name, attributes)
            },
            // [`toggle${element.charAt(0).toUpperCase() + element.slice(1)}`]: attributes => ({ commands }) => {
            //   return commands.toggleWrap(this.name, attributes)
            // },
          }
        },
        addInputRules() {
          return [
            wrappingInputRule({
              find: new RegExp(`^!${element.charAt(0).toUpperCase() + element.slice(1)}\\s$`),
              type: this.type,
            }),
          ]
        }
      }))

    }

    return array
  },
})

export default TheoremLike;