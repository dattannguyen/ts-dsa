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

  append(value: unknown): LinkedList {
    if (!this._head) {
      return this.prepend(value)
    }

    if (!this._tail) {
      this._tail = new LinkedListNode(value, undefined, this._head)
      this._head.next = this.tail

      return this
    }

    const newNode = new LinkedListNode(value, undefined, this._tail)
    this._tail.next = newNode
    this._tail = newNode
  }

  toArray(): LinkedListNode[] {
    const nodes: LinkedListNode[] = []

    let node = this.head
    while (node) {
      nodes.push(node)
      node = node.next
    }

    return nodes
  }

}
