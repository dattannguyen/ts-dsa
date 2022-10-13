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
export const findLowestCommonAncestor = (root: BinaryTree<number>, p: BinaryTree<number>, q: BinaryTree<number>): BinaryTree<number> => {
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

/**
 * Leetcode question: https://leetcode.com/problems/kth-smallest-element-in-a-bst/
 */
export const findKthSmallestNode = (binaryTree: BinaryTree<number>, k: number): number => {
  const inorderNodes = binaryTree.traverseInOrder()
  return inorderNodes[Math.max(k - 1, 0)]
}

export const findKthSmallestByStack = (binaryTree: BinaryTree<number>, k: number): number => {
  const stack: BinaryTree<number>[] = []
  const smallestOfLeft = (node: BinaryTree<number>): BinaryTree<number> => {
    while (node) {
      stack.push(node)
      node = node.left
    }

    return stack.pop()
  }

  while (k--) {
    const leftMost = smallestOfLeft(binaryTree)
    if (k === 0) {
      return leftMost.value
    }

    binaryTree = leftMost.right
  }
}

export const findKthSmallestNodeByMinHeap = (binaryTree: BinaryTree<number>, k: number): number => {
  const minHeap: number[] = []
  const heapifyUp = (node: BinaryTree<number>) => {
    minHeap.push(node.value)

    let index = minHeap.length - 1
    while (Math.floor((index - 1) / 2) >= 0 && minHeap[Math.floor((index - 1) / 2)] > node.value) {
      const parentIndex = Math.floor((index - 1) / 2)
      minHeap[index] = minHeap[parentIndex]
      minHeap[parentIndex] = node.value

      index = parentIndex
    }
  }

  const heapifyDown = (): number => {
    const smallest = minHeap[0]
    minHeap[0] = minHeap.pop()

    let index = 0
    while ((2 * index + 1) < minHeap.length) {
      let nextIndex = 2 * index + 1
      const rightIndex = 2 * index + 2
      if (rightIndex < minHeap.length && minHeap[rightIndex] < minHeap[nextIndex]) {
        nextIndex = rightIndex
      }

      if (minHeap[index] < minHeap[nextIndex]) {
        break
      } else {
        const temp = minHeap[index]
        minHeap[index] = minHeap[nextIndex]
        minHeap[nextIndex] = temp
      }

      index = nextIndex
    }

    return smallest
  }

  binaryTree.traverseInOrder(heapifyUp)

  let kthSmallest
  while (k > 0) {
    kthSmallest = heapifyDown()
    k--
  }

  return kthSmallest
}

/**
 * Leetcode question: https://leetcode.com/problems/binary-tree-maximum-path-sum/
 */
export const findMaxPathSum = (binary: BinaryTree<number>): number => {
  let max = binary.value

  const calculateSum = (node: BinaryTree<number>) => {
    const leftSum = node.left ? calculateSum(node.left) : 0
    const rightSum = node.right ? calculateSum(node.right) : 0

    const fullSum = node.value + leftSum + rightSum
    max = Math.max(max, fullSum)

    return Math.max(node.value + leftSum, node.value + rightSum)
  }

  const onePathSum = calculateSum(binary)
  return Math.max(max, onePathSum)
}

/**
 * Leetcode question: https://leetcode.com/problems/serialize-and-deserialize-binary-tree/
 */
export const serialize = (root: BinaryTree<number>): string => {
  const values = []

  const preOrderTraverse = (root: BinaryTree<number>) => {
    values.push(root.value)

    root.left
        ? preOrderTraverse(root.left)
        : values.push('n')

    root.right
        ? preOrderTraverse(root.right)
        : values.push('n')
  }

  preOrderTraverse(root)
  return values.join(',')
}

export const deserialize = (rootAsString: string): BinaryTree<number> => {
  const values = rootAsString.split(',')
  if (!values?.[0]) {
    return
  }

  const root = new BinaryTree<number>(parseInt(values[0]))
  for (let i = 1; i < values.length; i++) {
    if (values[i] !== 'n') {
      root.insert(parseInt(values[i]))
    }
  }

  return root
}
