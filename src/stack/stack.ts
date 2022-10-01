import { DoublyLinkedList } from '../linked-list/doubly/doubly-linked-list'

export class Stack<T = any> {
  private readonly linkedList: DoublyLinkedList<T>

  constructor() {
    this.linkedList = new DoublyLinkedList<T>()
  }

  get size(): number {
    return this.linkedList.size
  }

  first(): unknown {
    return this.linkedList?.tail?.value || this.linkedList?.head?.value
  }

  last(): unknown {
    return this.linkedList?.head?.value
  }

  push(value: T): T {
    this.linkedList.append(value)
    return value
  }

  pop(): T {
    const pop = this.linkedList.deleteTail()
    return pop?.value
  }


}
