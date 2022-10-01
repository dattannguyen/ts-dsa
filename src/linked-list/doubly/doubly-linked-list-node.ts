export class DoublyLinkedListNode<T = any> {

  private readonly _value: T
  private _next: DoublyLinkedListNode<T>
  private _prev: DoublyLinkedListNode<T>

  constructor(value: T, next?: DoublyLinkedListNode<T>, prev?: DoublyLinkedListNode<T>) {
    this._value = value
    this._next = next
    this._prev = prev
  }

  get value(): T {
    return this._value
  }

  get next(): DoublyLinkedListNode<T> | undefined {
    return this._next
  }

  set next(next: DoublyLinkedListNode<T>) {
    this._next = next
  }

  get prev(): DoublyLinkedListNode<T> | undefined {
    return this._prev
  }

  set prev(prev: DoublyLinkedListNode<T>) {
    this._prev = prev
  }

}
