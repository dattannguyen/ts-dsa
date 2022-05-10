import { SinglyLinkedList } from '../linked-list/singly/singly-linked-list'

export class HashTable {

  private readonly _hashSize: number
  private readonly _hashArray: SinglyLinkedList[]
  private readonly _hashKeys: { [key: string]: number }
  private readonly hashFunction?: (key: string) => number

  constructor(hashSize?: number, hashFunction?: (key: string) => number) {
    this._hashSize = hashSize || 32
    this.hashFunction = hashFunction
    this._hashKeys = {}
    this._hashArray = new Array(this._hashSize).fill(undefined).map(() => new SinglyLinkedList())
  }

  get hashKeys(): { [key: string]: number } {
    return this._hashKeys
  }

  get hashArray(): SinglyLinkedList[] {
    return this._hashArray
  }

  keys(): string[] {
    return Object.keys(this._hashKeys)
  }

  values(): any[] {
    return this._hashArray.reduce((acc, ll: SinglyLinkedList) => [
      ...acc,
      ...(ll.toArray().map(node => node.data))
    ], [])
  }

  get(key: string): unknown {
    const hashKey = this._hashKeys[key]
    if (!hashKey) {
      return
    }

    const hashLL = this._hashArray[hashKey]
    return hashLL.find(key)?.data
  }

  set(key: string, value: any): HashTable {
    let hashKey = this._hashKeys[key]
    if (!hashKey) {
      hashKey = this.hash(key)
      this._hashKeys[key] = hashKey
    }

    const hashLL = this._hashArray[hashKey]
    const node = hashLL.find(key)
    if (node) {
      node.data = value
    } else {
      hashLL.append(key, value)
    }

    return this
  }

  private hash(key: string): number {
    const hash = this.hashFunction || (key => Array.from(key).reduce((acc, symbol) => acc + symbol.charCodeAt(0), 0))
    return hash(key) % this._hashSize
  }


}
