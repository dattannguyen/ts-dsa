import { BinaryTree } from '../binary-tree'

export const dfs = <T = any>(node: BinaryTree<T>, onVisited: (node: BinaryTree<T>) => any) => {
  onVisited(node)

  if (!node.left && !node.right) {
    return
  }

  if (node.left) {
    dfs(node.left, onVisited)
  }

  if (node.right) {
    dfs(node.right, onVisited)
  }
}

export const dfsByStack = <T = any>(node: BinaryTree, onVisited?: (node: BinaryTree<T>) => any) => {
  const stack = [node]
  while (stack.length > 0) {
    const node = stack.pop()
    onVisited?.(node)

    if (node.right) {
      stack.push(node.right)
    }

    if (node.left) {
      stack.push(node.left)
    }
  }
}