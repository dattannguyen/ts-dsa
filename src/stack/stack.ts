import { DoublyLinkedList } from '../linked-list/doubly/doubly-linked-list'

export class Stack {
  private readonly linkedList: DoublyLinkedList

  constructor() {
    this.linkedList = new DoublyLinkedList()
  }

  first(): unknown {
    return this.linkedList?.tail?.value || this.linkedList?.head?.value
  }

  last(): unknown {
    return this.linkedList?.head?.value
  }

  push(value: unknown): unknown {
    this.linkedList.append(value)
    return value
  }

  pop(): unknown {
    const pop = this.linkedList.deleteTail()
    return pop?.value
  }


}
