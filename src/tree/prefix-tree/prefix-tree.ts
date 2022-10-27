import { TreeNode } from '../_node/tree-node'

export class PrefixTree extends TreeNode<string> {

  private readonly _children: Map<string, PrefixTree>

  constructor(char: string = '*') {
    super(char)
    this._children = new Map<string, PrefixTree>()
  }

  get children(): Map<string, PrefixTree> {
    return this._children
  }

  getChild(char: string): PrefixTree | undefined {
    return this.children.get(char)
  }

  setChild(node: PrefixTree) {
    this.children.set(node.value, node)
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

  autocomplete(prefix: string): string[] {
    const words: Array<{ word: string, popularity: number }> = []
    const lastNode = this.find(prefix, true)
    if (!lastNode) {
      return []
    }

    const dfs = (node: PrefixTree, prefix: string) => {
      const asterisk = node.getChild('*')
      if (!!asterisk) {
        words.push({ word: prefix, popularity: asterisk.metadata.get('popularity') })
      }

      for (let [char, child] of node.children.entries()) {
        if (child.value !== '*') {
          dfs(child, prefix.concat(char))
        }
      }
    }

    dfs(lastNode, prefix)
    return words
        .sort((first, second) => first.popularity < second.popularity ? 1 : -1)
        .map(word => word.word)
  }

  insert(word: string, popularity: number = 0): PrefixTree {
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
        const asterisk = new PrefixTree('*')
        asterisk.metadata.set('popularity', popularity)

        currentNode.setChild(asterisk)
      }
    }

    return this
  }

  delete(word: string, allowPrefix: boolean = false): PrefixTree {
    const lastNode = this.find(word, allowPrefix)
    if (!lastNode) {
      return this
    }

    let key = allowPrefix ? lastNode.value : '*'
    let parent = lastNode.parent as PrefixTree
    while (parent?.children.size === 1 && parent.parent) {
      key = parent.value
      parent = parent.parent as PrefixTree
    }

    parent?.children.delete(key)
    return this
  }

}