export class Heap<T = any> {

  private readonly container: T[]
  private readonly comparator: (parentValue: T, childValue: T) => boolean

  constructor(comparator: (parentValue: T, childValue: T) => boolean) {
    this.container = []
    this.comparator = comparator
  }

  get size(): number {
    return this.container.length
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
    return this.container[index]
  }

  peek(): T | undefined {
    return this.container[0]
  }

  poll(): T | undefined {
    if (this.size <= 0) {
      return this.container.pop()
    }

    const peek = this.peek()
    this.container[0] = this.container.pop()
    this.heapifyDown()

    return peek
  }

  insert(value: T): Heap {
    this.container.push(value)
    if (this.size > 1) {
      this.heapifyUp()
    }

    return this
  }

  delete(value: T): Heap {
    return this
  }

  private heapifyUp(): Heap {
    let lastIndex = this.size - 1
    while (
        this.hasParent(lastIndex)
        && !this.comparator(this.container[this.getParentIndex(lastIndex)], this.container[lastIndex])
        ) {
      this.swap(this.getParentIndex(lastIndex), lastIndex)
      lastIndex = this.getParentIndex(lastIndex)
    }

    return this
  }

  private heapifyDown(fromIndex: number = 0): Heap {
    while (this.hasLeftChild(fromIndex)) {
      let nextIndex = this.getLeftChildIndex(fromIndex)
      const rightIndex = this.getRightChildIndex(fromIndex)
      if (this.hasRightChild(fromIndex) && this.comparator(this.container[rightIndex], this.container[nextIndex])) {
        nextIndex = rightIndex
      }

      if (this.comparator(this.container[fromIndex], this.container[nextIndex])) {
        break
      } else {
        this.swap(fromIndex, nextIndex)
      }

      fromIndex = nextIndex
    }

    return this
  }

  private swap(firstIndex: number, secondIndex: number): void {
    const temp = this.container[firstIndex]
    this.container[firstIndex] = this.container[secondIndex]
    this.container[secondIndex] = temp
  }
}