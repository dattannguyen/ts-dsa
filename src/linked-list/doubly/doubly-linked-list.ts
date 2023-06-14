import { DoublyLinkedListNode } from './_node/doubly-linked-list-node'

export class DoublyLinkedList<T = any> {

  private _size: number = 0
  private _head: DoublyLinkedListNode<T>
  private _tail: DoublyLinkedListNode<T>

  get size(): number {
    return this._size
  }

  get head(): DoublyLinkedListNode<T> | undefined {
    return this._head
  }

  get tail(): DoublyLinkedListNode<T> | undefined {
    return this._tail
  }

  find(value: T): DoublyLinkedListNode<T> | undefined {
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

  prepend(value: T): DoublyLinkedList<T> {
    const newNode = new DoublyLinkedListNode<T>(value, this._head)
    if (this._head) {
      this._tail = new DoublyLinkedListNode<T>(this._head.value, undefined, newNode)
      this._head = newNode
    } else {
      this._head = newNode
    }

    this._size++
    return this
  }

  append(value: T): DoublyLinkedList<T> {
    if (!this._head) {
      return this.prepend(value)
    }

    this._size++
    if (!this._tail) {
      this._tail = new DoublyLinkedListNode<T>(value, undefined, this._head)
      this._head.next = this.tail

      return this
    }

    const newNode = new DoublyLinkedListNode<T>(value, undefined, this._tail)
    this._tail.next = newNode
    this._tail = newNode

    return this
  }

  delete(value: unknown): DoublyLinkedList {
    if (!this._head) {
      return this
    }

    if (this._head.value === value) {
      this._size--
      this._head = this._head.next
      if (this._head) {
        this._head.prev = undefined
      }

      return
    }

    if (this._tail.value === value) {
      this._size--

      // If prev of tail is head
      if (!this._tail.prev?.prev) {
        this._tail = undefined
        this._head.next = undefined

        return
      }

      this._tail = this._tail.prev
      this._tail.next = undefined

      return
    }

    let node = this._head?.next
    while (node?.next) {
      if (node.value === value) {
        this._size--
        if (node.prev) {
          node.prev.next = node.next
        }

        if (node.next) {
          node.next.prev = node.prev
        }
      }

      node = node.next
    }

    return this
  }

  deleteTail(): DoublyLinkedListNode<T> {
    this._size = Math.max(this._size - 1, 0)
    if (!this._head || !this._tail) {
      const head = this._head
      this._head = undefined

      return head
    }


    const tail = this._tail
    if (!this._tail.prev?.prev) { // If prev of tail is head
      this._tail = undefined
      this._head.next = undefined

      return tail
    }

    this._tail = this._tail.prev
    this._tail.next = undefined
    return tail
  }

  reverse(): DoublyLinkedList {
    if (!this._head || !this._tail) {
      return
    }

    const oldTail = this._tail
    let node = this._tail.prev
    while (node) {
      const prev = node.prev

      this._tail.next = node
      node.next = undefined
      node.prev = this._tail
      this._tail = node

      node = prev
    }

    this._head = oldTail
    this._head.prev = undefined

    return this
  }

  toArray(): DoublyLinkedListNode<T>[] {
    const nodes: DoublyLinkedListNode<T>[] = []

    let node = this.head
    while (node) {
      nodes.push(node)
      node = node.next
    }

    return nodes
  }

}
