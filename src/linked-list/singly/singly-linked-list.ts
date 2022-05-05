import { SinglyLinkedListNode } from './singly-linked-list-node'


export class SinglyLinkedList {

  private _head: SinglyLinkedListNode
  private _tail: SinglyLinkedListNode


  get head(): SinglyLinkedListNode | undefined {
    return this._head
  }

  get tail(): SinglyLinkedListNode | undefined {
    return this._tail
  }

  prepend(value: unknown): SinglyLinkedList {
    if (this._head) {
      this._tail = new SinglyLinkedListNode(this._head.value)
      return this
    }

    this._head = new SinglyLinkedListNode(value, this._tail)
    return this
  }

  append(value: unknown): SinglyLinkedList {
    if (!this._head) {
      return this.prepend(value)
    }

    const newNode = new SinglyLinkedListNode(value)
    if (!this._tail) {
      this._tail = newNode
      this._head.next = newNode
    } else {
      this._tail.next = newNode
      this._tail = newNode
    }

    return this
  }
}
