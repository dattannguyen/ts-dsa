import { SinglyLinkedList } from '../linked-list/singly/singly-linked-list'

export class Queue<T = any> {
  private readonly linkedList: SinglyLinkedList<T>

  constructor() {
    this.linkedList = new SinglyLinkedList<T>()
  }

  first(): T {
    return this.linkedList.head?.value
  }

  last(): T {
    return this.linkedList.tail?.value
  }

  enqueue(value: T): T {
    this.linkedList.append(value)
    return value
  }

  dequeue(): T {
    const next = this.linkedList.deleteHead()
    return next?.value
  }

}
