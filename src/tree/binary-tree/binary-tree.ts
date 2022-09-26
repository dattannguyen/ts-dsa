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

  get left() {
    return this._left
  }

  get right() {
    return this._right
  }

  insert(value: T): BinaryTree<T> {
    const node = new BinaryTree(value, this._compareLeftOrder, this._enableDuplicated, this._compare)
    if (this._enableDuplicated && this.isEqual(node)) {
      return this
    }

    const isLeftChild = this.isLeft(node)
    if (this.left && isLeftChild) {
      return this._left.insert(value)
    }

    if (this.right) {
      return this._right.insert(value)
    }

    // When parent node has no children, both left & child
    node.parent = this
    isLeftChild
        ? this._left = node
        : this._right = node

    return this
  }

  private isLeft(node: TreeNode): boolean {
    return this._compareLeftOrder(this.value, node.value)
  }

}