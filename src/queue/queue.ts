import { SinglyLinkedList } from '../linked-list/singly/singly-linked-list'

export class Queue {

  private readonly linkedList: SinglyLinkedList

  constructor() {
    this.linkedList = new SinglyLinkedList()
  }

  first(): unknown {
    return this.linkedList.head?.value
  }

  last(): unknown {
    return this.linkedList.tail?.value
  }

  enqueue(value: unknown): unknown {
    this.linkedList.append(value)
    return value
  }

  dequeue(): unknown {
    const next = this.linkedList.deleteHead()
    return next?.value
  }

}
