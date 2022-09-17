import { DisjointSetItem } from './disjoint-set-item'

export class DisjointSet<T = any> {

  private readonly _items: Map<string, DisjointSetItem<T>>
  private readonly _hash?: (disjointSetItem: DisjointSetItem) => string
  private readonly _rank?: (first: DisjointSetItem<T>, second: DisjointSetItem<T>) => boolean

  constructor(
      rank?: (first: DisjointSetItem<T>, second: DisjointSetItem<T>) => boolean,
      hash?: (disjointSetItem: DisjointSetItem<T>) => string
  ) {
    this._items = new Map()
    this._hash = hash
    this._rank = rank || ((first, second) => first.totalChildren < second.totalChildren)
  }

  get items(): Map<string, DisjointSetItem<T>> {
    return this._items
  }

  makeSet(value: T): DisjointSet<T> {
    const item = new DisjointSetItem(value, this._hash)
    if (!this._items.has(item.key)) {
      this._items.set(item.key, item)
    }

    return this
  }

  find(value: T): DisjointSetItem<T> {
    const targetItem = new DisjointSetItem(value, this._hash)
    return this._items.get(targetItem.key)?.root
  }

  union(first: T, second: T): DisjointSetItem<T> {
    const firstRepresentative = this.find(first)
    const secondRepresentative = this.find(second)

    if (firstRepresentative.key === secondRepresentative.key) {
      return firstRepresentative
    }

    if (this._rank(firstRepresentative, secondRepresentative)) {
      this._items.get(firstRepresentative.key).addChild(secondRepresentative)
      return firstRepresentative
    } else {
      this._items.get(secondRepresentative.key).addChild(firstRepresentative)
      return secondRepresentative
    }
  }

  isInSameSet(first: T, second: T): boolean {
    return this.find(first).key === this.find(second).key
  }

}