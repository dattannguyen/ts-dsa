import { SinglyLinkedListNode } from './singly-linked-list-node'


export class SinglyLinkedList {
  private _head: SinglyLinkedListNode

  get head(): SinglyLinkedListNode | undefined {
    return this._head
  }

  prepend(value: unknown): SinglyLinkedList {
    this._head = new SinglyLinkedListNode(value, this._head)
    return this
  }
}
