export class SinglyLinkedListNode {

  private readonly _value: unknown
  private _data: unknown
  private _next: SinglyLinkedListNode

  constructor(value: unknown, next?: SinglyLinkedListNode, data?: unknown) {
    this._value = value
    this._next = next
    this._data = data
  }

  get value(): unknown {
    return this._value
  }

  get data(): unknown {
    return this._data
  }

  set data(data: unknown) {
    this._data = data
  }

  get next(): SinglyLinkedListNode | undefined {
    return this._next
  }

  set next(next: SinglyLinkedListNode) {
    this._next = next
  }

}
