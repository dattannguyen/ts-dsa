export class TreeNode<T = any> {

  private _value: T
  private _parent?: TreeNode<T>
  protected readonly _metadata?: Map<string | number, any>
  protected readonly _compareEqual?: (first: TreeNode, second: TreeNode) => boolean

  constructor(_value: T, _compareEqual?: (first: TreeNode, second: TreeNode) => boolean) {
    this._value = _value
    this._metadata = new Map<string, any>()
    this._compareEqual = _compareEqual || ((first: TreeNode, second: TreeNode) => first._value === second._value)
  }

  get value(): T {
    return this._value
  }

  set value(next: T) {
    this._value = next
  }

  get parent(): TreeNode<T> {
    return this._parent
  }

  set parent(parent: TreeNode<T>) {
    this._parent = parent
  }

  get metadata(): Map<string | number, any> {
    return this._metadata
  }

  isEqual(node: TreeNode<T>): boolean {
    return this._compareEqual(this, node)
  }

}