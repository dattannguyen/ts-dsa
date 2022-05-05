export class SinglyLinkedListNode {

  private readonly _value: unknown
  private _next: SinglyLinkedListNode

  constructor(value: unknown, next?: SinglyLinkedListNode) {
    this._value = value
    this._next = next
  }

  get value(): unknown {
    return this._value
  }

  get next(): SinglyLinkedListNode | undefined {
    return this._next
  }

  set next(next: SinglyLinkedListNode) {
    this._next = next
  }

}
