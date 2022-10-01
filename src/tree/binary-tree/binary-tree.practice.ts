import { BinaryTree } from './binary-tree'

/**
 * Leetcode question: https://leetcode.com/problems/invert-binary-tree/
 */
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


/**
 * Leetcode question: https://leetcode.com/problems/maximum-depth-of-binary-tree/
 */
export const findMaxDepthOfBinaryTree = (binaryTree: BinaryTree<number>): number => {
  const leftDepth = (binaryTree.left ? findMaxDepthOfBinaryTree(binaryTree.left) : 0) + 1
  const rightDepth = (binaryTree.right ? findMaxDepthOfBinaryTree(binaryTree.right) : 0) + 1

  return Math.max(leftDepth, rightDepth)
}