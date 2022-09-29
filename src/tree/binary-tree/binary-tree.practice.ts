import { BinaryTree } from './binary-tree'

export const invertBinaryTreeByRecursion = (binaryTree: BinaryTree<number>): BinaryTree<number> => {
  const tempLeft = binaryTree.left
  binaryTree.left = binaryTree.right
  binaryTree.right = tempLeft

  if (binaryTree.left) {
    invertBinaryTreeByRecursion(binaryTree.left)
  }

  if (binaryTree.right) {
    invertBinaryTreeByRecursion(binaryTree.right)
  }

  return binaryTree
}