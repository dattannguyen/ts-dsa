export class DisjointSetItem<T = any> {

  private readonly _value: T
  private _parent?: DisjointSetItem
  private _totalChildren?: number
  private readonly _children?: Map<string, DisjointSetItem<T>>
  private readonly _hash?: (disjointSetItem: DisjointSetItem) => string

  constructor(_value: T, hash?: (disjointSetItem: DisjointSetItem<T>) => string) {
    this._value = _value
    this._hash = hash || (() => this._value.toString())
    this._children = new Map()
    this._totalChildren = 0
  }

  get key(): string {
    return this._hash(this)
  }

  get value(): T {
    return this._value
  }

  get root(): DisjointSetItem<T> {
    return this._parent?.root || this
  }

  get totalChildren(): number {
    return this._totalChildren
  }

  set parent(parent: DisjointSetItem<T>) {
    this._parent = parent
  }

  addChild(child: DisjointSetItem<T>): DisjointSetItem<T> {
    this._children.set(child.key, child)
    this._totalChildren = this.totalChildren + 1 + child._totalChildren
    child.parent = this

    return this
  }

}