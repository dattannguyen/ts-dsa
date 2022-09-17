import { DisjointSetItem } from './disjoint-set-item'

export class DisjointSet<T = any> {

  private readonly _set: Map<string, DisjointSetItem<T>>
  private readonly _rank: (first: DisjointSetItem<T>, second: DisjointSetItem<T>) => boolean

  constructor(rank?: (first: DisjointSetItem<T>, second: DisjointSetItem<T>) => boolean) {
    this._set = new Map()
    this._rank = rank || ((first, second) => first.totalChildren < second.totalChildren)
  }

  makeSet(value: T): DisjointSet<T> {
    const item = new DisjointSetItem(value)
    if (!this._set.has(item.key)) {
      this._set.set(item.key, item)
    }

    return this
  }

  find(value: T): DisjointSetItem<T> {
    const targetItem = new DisjointSetItem(value)
    return this._set.get(targetItem.key)?.root
  }

  union(first: T, second: T): DisjointSet<T> {
    const firstRepresentative = this.find(first)
    const secondRepresentative = this.find(second)

    if (firstRepresentative.key === secondRepresentative.key) {
      return this
    }


    if (this._rank(firstRepresentative, secondRepresentative)) {
      this._set.get(firstRepresentative.key).addChild(firstRepresentative)
    } else {
      this._set.get(secondRepresentative.key).addChild(secondRepresentative)
    }

    return this
  }

  isInSameSet(first: T, second: T): boolean {
    return this.find(first).key === this.find(second).key
  }

}