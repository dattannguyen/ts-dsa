export class Heap<T = any> {

  private readonly nodes: T[]
  private readonly compare: (parentValue: T, childValue: T) => boolean

  constructor(compare: (parentValue: T, childValue: T) => boolean) {
    this.nodes = []
    this.compare = compare
  }

  get size(): number {
    return this.nodes.length
  }

  getLeftChildIndex(parentIndex: number): number {
    return 2 * parentIndex + 1
  }

  getRightChildIndex(parentIndex: number): number {
    return 2 * parentIndex + 2
  }

  getParentIndex(childIndex: number): number {
    return Math.floor((childIndex - 1) / 2)
  }

  hasLeftChild(parentIndex: number): boolean {
    return this.getLeftChildIndex(parentIndex) < this.size
  }

  hasRightChild(parentIndex: number): boolean {
    return this.getRightChildIndex(parentIndex) < this.size
  }

  hasParent(childIndex: number): boolean {
    return this.getParentIndex(childIndex) >= 0
  }

  get(index: number): T | undefined {
    return this.nodes[index]
  }

  peek(): T | undefined {
    return this.nodes[0]
  }

  last(): T | undefined {
    return this.nodes[this.size - 1]
  }

  poll(): T | undefined {
    if (this.size <= 0) {
      return this.nodes.pop()
    }

    const peek = this.peek()
    this.nodes[0] = this.nodes.pop()
    this.heapifyDown()

    return peek
  }

  insert(value: T): Heap {
    this.nodes.push(value)
    if (this.size > 1) {
      this.heapifyUp()
    }

    return this
  }

  remove(value: T, predicate: (first: T, second: T) => boolean = ((first, second) => first === second)): Heap {
    const removedCounter = this.nodes.reduce((counter, node) => predicate(node, value) ? ++counter : counter, 0)
    for (let i = 0; i < removedCounter; i++) {
      // Need to find index again since the heap is changed on each run
      const nodeIndex = this.nodes.findIndex(target => predicate(value, target))

      if (nodeIndex === 0) {
        this.poll()
      } else if (nodeIndex === this.size - 1) {
        this.nodes.pop()
      } else {
        this.nodes[nodeIndex] = this.nodes.pop()

        const parent = this.get(this.getParentIndex(nodeIndex))
        if (parent && !this.compare(parent, this.nodes[nodeIndex])) {
          this.heapifyDown(nodeIndex)
        } else {
          this.heapifyUp(nodeIndex)
        }
      }
    }

    return this
  }

  toString(): string {
    return this.nodes.join(',')
  }

  private heapifyUp(fromIndex: number = this.size - 1): Heap {
    while (
        this.hasParent(fromIndex)
        && !this.compare(this.nodes[this.getParentIndex(fromIndex)], this.nodes[fromIndex])
        ) {
      this.swap(this.getParentIndex(fromIndex), fromIndex)
      fromIndex = this.getParentIndex(fromIndex)
    }

    return this
  }

  private heapifyDown(fromIndex: number = 0): Heap {
    while (this.hasLeftChild(fromIndex)) {
      let nextIndex = this.getLeftChildIndex(fromIndex)
      const rightIndex = this.getRightChildIndex(fromIndex)
      if (this.hasRightChild(fromIndex) && this.compare(this.nodes[rightIndex], this.nodes[nextIndex])) {
        nextIndex = rightIndex
      }

      if (this.compare(this.nodes[fromIndex], this.nodes[nextIndex])) {
        break
      } else {
        this.swap(fromIndex, nextIndex)
      }

      fromIndex = nextIndex
    }

    return this
  }

  private swap(firstIndex: number, secondIndex: number): void {
    const temp = this.nodes[firstIndex]
    this.nodes[firstIndex] = this.nodes[secondIndex]
    this.nodes[secondIndex] = temp
  }
}