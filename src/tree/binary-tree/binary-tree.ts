import { TreeNode } from '../node/tree-node'

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

  get right() {
    return this._right
  }

  set right(right: BinaryTree<T>) {
    this._right = right
  }

  isLeft(node: TreeNode): boolean {
    return this._compareLeftOrder(this.value, node.value)
  }

  find(value: T): BinaryTree<T> | undefined {
    const node = new BinaryTree(value, this._compareLeftOrder, this._enableDuplicated, this._compareEqual)
    if (this.isEqual(node)) {
      return this
    }

    const isLeftChild = this.isLeft(node)
    if (this.left && isLeftChild) {
      return this._left.find(value)
    }

    if (this.right) {
      return this._right.find(value)
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

  private isLeft(node: TreeNode): boolean {
    return this._compareLeftOrder(this.value, node.value)
  }

}