export class DoublyLinkedListNode {

  private readonly _value: unknown
  private _next: DoublyLinkedListNode
  private _prev: DoublyLinkedListNode

  constructor(value: unknown, next?: DoublyLinkedListNode, prev?: DoublyLinkedListNode) {
    this._value = value
    this._next = next
    this._prev = prev
  }

  get value(): unknown {
    return this._value
  }

  get next(): DoublyLinkedListNode | undefined {
    return this._next
  }

  set next(next: DoublyLinkedListNode) {
    this._next = next
  }

  get prev(): DoublyLinkedListNode | undefined {
    return this._prev
  }

  set prev(prev: DoublyLinkedListNode) {
    this._prev = prev
  }

}
