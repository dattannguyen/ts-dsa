import { LinkedListNode } from './linked-list-node'

export class LinkedList {

  private _head: LinkedListNode
  private _tail: LinkedListNode

  get head(): LinkedListNode | undefined {
    return this._head
  }

  get tail(): LinkedListNode | undefined {
    return this._tail
  }

  prepend(value: unknown): LinkedList {
    const newNode = new LinkedListNode(value, this._head)
    if (this._head) {
      this._tail = new LinkedListNode(this._head.value, undefined, newNode)
      this._head = newNode
    } else {
      this._head = newNode
    }

    return this
  }

}
