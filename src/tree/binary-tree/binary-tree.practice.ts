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
 * Leetcode question: https://leetcode.com/problems/validate-binary-search-tree/
 */
export const isValidTree = (binaryTree: BinaryTree<number>, max?: number, min?: number): boolean => {
  if (max !== undefined && binaryTree.value >= max) {
    return false
  }

  if (min !== undefined && binaryTree.value <= min) {
    return false
  }

  const isLeftValid = binaryTree.left ? isValidTree(binaryTree.left, binaryTree.value, min) : true
  const isRightValid = binaryTree.right ? isValidTree(binaryTree.right, max, binaryTree.value) : true

  return isLeftValid && isRightValid
}

export const isValidTreeByDownToUp = (binaryTree: BinaryTree<number>) => {
  if (binaryTree.left && binaryTree.left.value > binaryTree.value) {
    return false
  }

  if (binaryTree.right && binaryTree.right.value < binaryTree.value) {
    return false
  }

  const isValidDownToUp = (node: BinaryTree, value: number = node.value): boolean => {
    while (node.parent) {
      const isRight = node.value > node.parent.value
      if (isRight && value < node.parent.value) {
        return false
      }

      if (!isRight && value > node.parent.value) {
        return false
      }

      node = node.parent
    }

    return true
  }

  if (!isValidDownToUp(binaryTree)) {
    return false
  }

  const isLeftValid = binaryTree.left ? isValidTreeByDownToUp(binaryTree.left) : true
  const isRightValid = binaryTree.right ? isValidTreeByDownToUp(binaryTree.right) : true

  return isLeftValid && isRightValid
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

/**
 * Leetcode question: https://leetcode.com/problems/subtree-of-another-tree/
 */
export const isSubTree = (tree: BinaryTree<number>, subTree: BinaryTree<number>): boolean => {
  const subRoot = tree.find(subTree.value)
  if (!subRoot) {
    return false
  }

  return isSameTree(subRoot, subTree)
}

/**
 *
 * Leetcode question: https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-search-tree/
 */
export const findLowestCommonAncestor = (
    root: BinaryTree<number>,
    p: BinaryTree<number>,
    q: BinaryTree<number>
): BinaryTree<number> => {
  if (root.left && p.value < root.value && q.value < root.value) {
    return findLowestCommonAncestor(root.left, p, q)
  }

  if (root.right && p.value > root.value && root.value) {
    return findLowestCommonAncestor(root.right, p, q)
  }

  const qNode = root.find(p.value, () => '')
  const pNode = root.find(q.value, () => '')

  if (qNode && pNode) {
    return root
  }

  return
}