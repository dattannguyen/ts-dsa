import { TreeNode } from '../_node/tree-node'

export class PrefixTree extends TreeNode<string> {

  private readonly _children: Record<string, PrefixTree>

  constructor(char: string = '*') {
    super(char)
    this._children = {}
  }

  get children(): Record<string, PrefixTree> {
    return this._children
  }

  getChild(char: string): PrefixTree | undefined {
    return this.children[char]
  }

  setChild(node: PrefixTree) {
    this.children[node.value] = node
  }

  find(word: string, allowPrefix: boolean = false): PrefixTree | undefined {
    let currentNode: PrefixTree = this

    for (let i = 0; i < word.length; i++) {
      const child = currentNode.getChild(word[i])
      if (!child) {
        return
      }

      if (i < word.length - 1) {
        currentNode = child
        continue
      }

      if (allowPrefix) {
        return child
      } else {
        return child.getChild('*')
            ? child
            : undefined
      }
    }
  }

  insert(word: string): PrefixTree {
    let currentNode: PrefixTree = this

    for (let i = 0; i < word.length; i++) {
      const char = word[i]

      const child = currentNode.getChild(char)
      if (child) {
        currentNode = child
      } else {
        const newNode = new PrefixTree(char)
        newNode.parent = currentNode
        currentNode.setChild(newNode)
        currentNode = newNode
      }

      if (i === word.length - 1) {
        currentNode.setChild(new PrefixTree('*'))
      }
    }

    return this
  }

}