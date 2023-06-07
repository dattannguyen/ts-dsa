import { SinglyLinkedListNode } from './singly-linked-list-node'

export class SinglyLinkedList<T = any> {

  private _size: number = 0
  private _head: SinglyLinkedListNode<T>
  private _tail: SinglyLinkedListNode<T>

  get size(): number {
    return this._size
  }

  get head(): SinglyLinkedListNode<T> | undefined {
    return this._head
  }

  get tail(): SinglyLinkedListNode<T> | undefined {
    return this._tail
  }

  find(value: T): SinglyLinkedListNode<T> {
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

  read(index: number): SinglyLinkedListNode<T> {
    if (index < 0) {
      return
    }

    if (index === 0) {
      return this._head
    }

    let currentIndex = 0
    let currentNode = this._head
    while (currentNode) {
      if (currentIndex === index) {
        return currentNode
      }

      currentIndex++
      currentNode = currentNode.next
    }
  }

  prepend(value: T, data?: unknown): SinglyLinkedList<T> {
    if (this._head) {
      this._tail = new SinglyLinkedListNode<T>(this._head.value, undefined, data)
    }

    this._head = new SinglyLinkedListNode<T>(value, this._tail, data)
    this._size++
    return this
  }

  append(value: T, data?: unknown): SinglyLinkedList<T> {
    if (!this._head) {
      return this.prepend(value, data)
    }

    const newNode = new SinglyLinkedListNode<T>(value, undefined, data)
    if (!this._tail) {
      this._tail = newNode
      this._head.next = newNode
    } else {
      this._tail.next = newNode
      this._tail = newNode
    }

    this._size++
    return this
  }

  delete(value: T): SinglyLinkedList<T> {
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

    this._size--
  }

  deleteHead(): SinglyLinkedListNode<T> | undefined {
    const head = this._head
    if (!head) {
      return
    }

    // If next of head is tail
    if (head.next && !head.next.next) {
      this._tail = undefined
    }

    this._head = head.next
    this._size--
    return head
  }

  reverse(): SinglyLinkedList<T> {
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

  toArray(): SinglyLinkedListNode<T>[] {
    const nodes = []
    let node = this._head
    while (node) {
      nodes.push(node)
      node = node.next
    }

    return nodes
  }
}
