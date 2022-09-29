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