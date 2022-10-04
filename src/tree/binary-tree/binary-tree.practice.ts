import { BinaryTree } from './binary-tree'
import { Queue } from '../../queue/queue'

/**
 * Leetcode question: https://leetcode.com/problems/invert-binary-tree/
 */
export const invertByDfs = (binaryTree: BinaryTree<number>): BinaryTree<number> => {
  const tempLeft = binaryTree.left
  binaryTree.left = binaryTree.right
  binaryTree.right = tempLeft

  if (binaryTree.left) {
    invertByDfs(binaryTree.left)
  }

  if (binaryTree.right) {
    invertByDfs(binaryTree.right)
  }

  return binaryTree
}

/**
 * Leetcode question: https://leetcode.com/problems/maximum-depth-of-binary-tree/
 */
export const findMaxDepthByDfs = (binaryTree: BinaryTree<number>): number => {
  const leftDepth = (binaryTree.left ? findMaxDepthByDfs(binaryTree.left) : 0) + 1
  const rightDepth = (binaryTree.right ? findMaxDepthByDfs(binaryTree.right) : 0) + 1

  return Math.max(leftDepth, rightDepth)
}

export const findMaxDepthByBfs = (binaryTree: BinaryTree<number>): number => {
  let depth = 0
  const queue = new Queue<BinaryTree<number>>()
  queue.enqueue(binaryTree)

  while (queue.first()) {
    depth++

    const queueSize = queue.size
    for (let i = 0; i < queueSize; i++) {
      const node = queue.dequeue()
      if (node.left) {
        queue.enqueue(node.left)
      }

      if (node.right) {
        queue.enqueue(node.right)
      }
    }
  }

  return depth
}

/**
 * Leetcode question: https://leetcode.com/problems/same-tree/
 */
export const isSameTree = (firstTree: BinaryTree<number>, secondTree: BinaryTree<number>): boolean => {
  if (!firstTree && !secondTree) {
    return true
  }

  if (firstTree?.value !== secondTree?.value) {
    return false
  }

  const isSameLeft = firstTree.left && secondTree.left
      ? isSameTree(firstTree.left, secondTree.left)
      : firstTree?.left?.value === secondTree?.left?.value

  const isSameRight = firstTree.right && secondTree.right
      ? isSameTree(firstTree.right, secondTree.right)
      : firstTree?.right?.value === secondTree?.right?.value

  return isSameLeft && isSameRight
}

export const isSubTree = (tree: BinaryTree<number>, subTree: BinaryTree<number>): boolean => {
  const subRoot = tree.find(subTree.value)
  if (!subRoot) {
    return false
  }

  return isSameTree(subRoot, subTree)
}