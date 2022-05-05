import { DoublyLinkedListNode } from './doubly-linked-list-node'

export class DoublyLinkedList {

  private _head: DoublyLinkedListNode
  private _tail: DoublyLinkedListNode

  get head(): DoublyLinkedListNode | undefined {
    return this._head
  }

  get tail(): DoublyLinkedListNode | undefined {
    return this._tail
  }

  prepend(value: unknown): DoublyLinkedList {
    const newNode = new DoublyLinkedListNode(value, this._head)
    if (this._head) {
      this._tail = new DoublyLinkedListNode(this._head.value, undefined, newNode)
      this._head = newNode
    } else {
      this._head = newNode
    }

    return this
  }

  append(value: unknown): DoublyLinkedList {
    if (!this._head) {
      return this.prepend(value)
    }

    if (!this._tail) {
      this._tail = new DoublyLinkedListNode(value, undefined, this._head)
      this._head.next = this.tail

      return this
    }

    const newNode = new DoublyLinkedListNode(value, undefined, this._tail)
    this._tail.next = newNode
    this._tail = newNode
  }

  toArray(): DoublyLinkedListNode[] {
    const nodes: DoublyLinkedListNode[] = []

    let node = this.head
    while (node) {
      nodes.push(node)
      node = node.next
    }

    return nodes
  }

}
