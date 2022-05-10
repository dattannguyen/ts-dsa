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

  find(value: unknown): SinglyLinkedListNode {
    if (!this._head) {
      return
    }

    let node = this._head
    while (node) {
      if (node.value === value) {
        return node
      }

      node = node.next
    }
  }

  prepend(value: unknown, data?: unknown): SinglyLinkedList {
    if (this._head) {
      this._tail = new SinglyLinkedListNode(this._head.value, undefined, data)
    }

    this._head = new SinglyLinkedListNode(value, this._tail, data)
    return this
  }

  append(value: unknown, data?: unknown): SinglyLinkedList {
    if (!this._head) {
      return this.prepend(value, data)
    }

    const newNode = new SinglyLinkedListNode(value, undefined, data)
    if (!this._tail) {
      this._tail = newNode
      this._head.next = newNode
    } else {
      this._tail.next = newNode
      this._tail = newNode
    }

    return this
  }

  delete(value: unknown): SinglyLinkedList {
    if (!this._head) {
      return this
    }

    while (this._head?.value === value) {
      this._head = this._head.next
    }

    let node = this._head
    while (node?.next) {
      if (node.next?.value === value) {
        node.next = node.next?.next
      } else {
        node = node.next
      }
    }

    if (this._head?.next === undefined) {
      this._tail = undefined
    }

    if (this._tail?.value === value) {
      this._tail = node
    }
  }

  deleteHead(): SinglyLinkedListNode | undefined {
    const head = this._head
    if (!head) {
      return
    }

    // If next of head is tail
    if (head.next && !head.next.next) {
      this._tail = undefined
    }

    this._head = head.next
    return head
  }

  reverse(): SinglyLinkedList {
    if (!this._head || !this.tail) {
      return this
    }

    let prevNode
    let node = this._head
    while (node) {
      let nextNode = node.next
      node.next = prevNode

      prevNode = node
      node = nextNode
    }

    this._tail = this._head
    this._head = prevNode

    return this
  }

  toArray(): SinglyLinkedListNode[] {
    const nodes = []
    let node = this._head
    while (node) {
      nodes.push(node)
      node = node.next
    }

    return nodes
  }
}
