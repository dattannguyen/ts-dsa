export class TreeNode<T = any> {

  private _value: T
  protected _parent?: TreeNode<T>
  protected readonly _metadata?: Map<string | number, any>
  protected readonly _compareEqual?: (first: TreeNode, second: TreeNode) => boolean

  constructor(_value: T, _compareEqual?: (first: TreeNode, second: TreeNode) => boolean) {
    this._value = _value
    this._metadata = new Map<string, any>()
    this._compareEqual = _compareEqual || ((first: TreeNode, second: TreeNode) => first._value === second._value)
  }

  get key(): string {
    return this._value.toString()
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

  copy(node: TreeNode<T>) {
    this.value = node.value
    node.metadata.forEach((value, key) => this._metadata.set(key, value))
  }

  isEqual(node: TreeNode<T>): boolean {
    return this._compareEqual(this, node)
  }

}