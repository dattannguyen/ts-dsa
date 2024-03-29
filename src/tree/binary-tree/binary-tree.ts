import { TreeNode } from '../_node/tree-node'

export class BinaryTree<T = any> extends TreeNode<T> {

  private _left?: BinaryTree<T>
  private _right?: BinaryTree<T>
  private readonly _enableDuplicated: boolean
  private readonly _compareLeftOrder?: (parentValue: T, childValue: T) => boolean

  constructor(
      _value: T,
      _compareLeftOrder?: (parentValue: T, childValue: T) => boolean,
      _enableDuplicated?: boolean,
      _compare?: (first: TreeNode, second: TreeNode) => boolean,
  ) {
    super(_value, _compare)
    this._enableDuplicated = _enableDuplicated
    this._compareLeftOrder = _compareLeftOrder || ((parentValue, childValue) => parentValue > childValue)
  }

  get parent(): BinaryTree<T> {
    return this._parent as BinaryTree<T>
  }

  set parent(parent: BinaryTree<T>) {
    this._parent = parent
  }

  get left() {
    return this._left
  }

  set left(left: BinaryTree<T>) {
    this._left = left
  }

  get leftHeight(): number {
    if (!this.left) {
      return 0
    }

    return this.left.leftHeight + 1
  }

  get right() {
    return this._right
  }

  set right(right: BinaryTree<T>) {
    this._right = right
  }

  get rightHeight(): number {
    if (!this.right) {
      return 0
    }

    return this.right.rightHeight + 1
  }

  get height(): number {
    return Math.max(this.leftHeight, this.rightHeight)
  }

  get depth(): number {
    const leftDepth = this.left ? (1 + this.left.depth) : 0
    const rightDepth = this.right ? (1 + this.right.depth) : 0

    return Math.max(leftDepth, rightDepth)
  }

  isBalanced(): boolean {
    const recursion = (node: BinaryTree<T>): [boolean, number] => {
      const [isLeftBalanced, leftDepth] = node.left
          ? recursion(node.left)
          : [true, 0]

      const [isRightBalanced, rightDepth] = node.right
          ? recursion(node.right)
          : [true, 0]

      const nodeDepth = 1 + Math.max(leftDepth, rightDepth)
      const isNodeBalanced = isLeftBalanced && isRightBalanced && Math.abs(leftDepth - rightDepth) <= 1
      return [isNodeBalanced, nodeDepth]
    }

    const [isBalanced] = recursion(this)
    return isBalanced
  }

  isLeft(node: TreeNode): boolean {
    return this._compareLeftOrder(this.value, node.value)
  }

  traverseInOrder(onTraverse?: (traversalNode: BinaryTree<T>) => any): T[] {
    onTraverse?.(this)

    const result = []
    const traverse = (node: BinaryTree<T>) => result.push(...node.traverseInOrder(onTraverse))

    this.left && traverse(this.left)
    result.push(this.value)
    this.right && traverse(this.right)

    return result
  }

  traversePreOrder(): T[] {
    const result = []
    const traverse = (node: BinaryTree<T>) => result.push(...node.traversePreOrder())

    result.push(this.value)
    this.left && traverse(this.left)
    this.right && traverse(this.right)

    return result
  }

  traversePostOrder(): T[] {
    const result = []
    const traverse = (node: BinaryTree<T>) => result.push(...node.traversePostOrder())

    this.left && traverse(this.left)
    this.right && traverse(this.right)
    result.push(this.value)

    return result
  }

  find(value: T, onTraverse?: (traversalNode: BinaryTree<T>) => any): BinaryTree<T> | undefined {
    const node = new BinaryTree(value, this._compareLeftOrder, this._enableDuplicated, this._compareEqual)
    onTraverse?.(this)

    if (this.isEqual(node)) {
      return this
    }

    const isLeftChild = this.isLeft(node)
    if (this.left && isLeftChild) {
      return this._left.find(value, onTraverse)
    }

    if (this.right) {
      return this._right.find(value, onTraverse)
    }

    return
  }

  insert(value: T): BinaryTree<T> {
    const node = new BinaryTree(value, this._compareLeftOrder, this._enableDuplicated, this._compareEqual)
    if (this._enableDuplicated && this.isEqual(node)) {
      return this
    }

    const isLeftChild = this.isLeft(node)
    if (this.left && isLeftChild) {
      return this._left.insert(value)
    }

    if (this.right && !isLeftChild) {
      return this._right.insert(value)
    }

    // When parent node has no children, both left & child
    node.parent = this
    isLeftChild
        ? this._left = node
        : this._right = node

    return node
  }

  delete(value: T): BinaryTree<T> | undefined {
    const node = new BinaryTree(value, this._compareLeftOrder, this._enableDuplicated, this._compareEqual)

    // Traverse to children if not equal
    if (!this.isEqual(node)) {
      const isLeftChild = this.isLeft(node)
      if (this.left && isLeftChild) {
        return this.left.delete(value)
      }

      if (this.right) {
        return this.right.delete(value)
      }

      return
    }

    const isRoot = !this.parent

    // Case node has both left & right left
    if (this.left && this.right) {
      const successor = this.right.findMin()

      // The right of success will replace its
      if (successor.right) {
        successor.right.parent = successor.parent
        successor.parent.left = successor.right
      } else {
        // Remove left of successor's parent if successor has no children
        successor.parent.left = undefined
      }

      // Replace parent, left, and child of successor by ones of current node
      successor.parent = this.parent
      successor.left = this.left
      successor.right = this.right

      // Replace parent of left & right of current node by successor
      this.left.parent = successor
      this.right.parent = successor
      if (isRoot) {
        this.copy(successor)
      } else {
        this.parent.isLeft(this)
            ? this.parent.left = successor
            : this.parent.right = successor
      }

      return this
    }

    // Case node has either left or right child
    if (this.left || this.right) {
      const successor = this.left || this.right
      if (isRoot) {
        this.copy(successor)
        this.left = successor.left
        this.right = successor.right
      } else {
        this.parent.isLeft(this)
            ? this.parent.left = successor
            : this.parent.right = successor
      }

      return this
    }

    // Case node has no left & right child
    if (isRoot) {
      this.value = undefined
      this.metadata.clear()
    } else {
      this.parent.isLeft(this)
          ? this.parent.left = undefined
          : this.parent.right = undefined
    }

    return this
  }

  private findMin(): BinaryTree<T> {
    return this.left
        ? this.left.findMin()
        : this
  }

}