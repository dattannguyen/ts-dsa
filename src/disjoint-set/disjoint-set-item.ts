export class DisjointSetItem<T = any> {

  private readonly _value: T
  private _parent?: DisjointSetItem
  private readonly _children?: Map<string, DisjointSetItem<T>>
  private readonly _hash?: (disjointSetItem: DisjointSetItem) => string

  constructor(_value: T, hash?: (disjointSetItem: DisjointSetItem) => string) {
    this._value = _value
    this._hash = hash
    this._children = new Map()
  }

  get key(): string {
    return this._hash?.(this) || this._value.toString()
  }

  get value(): T {
    return this._value
  }

  get root(): DisjointSetItem<T> {
    return this._parent?.root || this
  }

  get totalChildren(): number {
    if (this._children.size === 0) {
      return 0
    }

    return Array
        .from(this._children.values())
        .reduce((acc, child) => acc + 1 + child.totalChildren, 0)
  }

  set parent(parent: DisjointSetItem<T>) {
    this._parent = parent
  }

  addChild(child: DisjointSetItem<T>): DisjointSetItem<T> {
    this._children.set(child.key, child)
    child.parent = this

    return this
  }

}