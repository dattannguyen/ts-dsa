export class LinkedListNode {

  private readonly _value: unknown
  private _next: LinkedListNode
  private _prev: LinkedListNode

  constructor(value: unknown, next?: LinkedListNode, prev?: LinkedListNode) {
    this._value = value
    this._next = next
    this._prev = prev
  }

  get value(): unknown {
    return this._value
  }

  get next(): LinkedListNode | undefined {
    return this._next
  }

  set next(next: LinkedListNode) {
    this._next = next
  }

  get prev(): LinkedListNode | undefined {
    return this._prev
  }

  set prev(prev: LinkedListNode) {
    this._prev = prev
  }

  print() {
    console.log(`-- This is the node of value ${this.value}, next to ${this._next?._value}, prev to ${this._prev?._value}`)
  }

}
