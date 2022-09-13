export class Heap<T = any> {

  private readonly _nodes: T[]
  private readonly compare: (parentValue: T, childValue: T) => boolean

  constructor(compare: (parentValue: T, childValue: T) => boolean) {
    this._nodes = []
    this.compare = compare
  }

  get size(): number {
    return this._nodes.length
  }

  get nodes(): T[] {
    return this._nodes
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
    return this._nodes[index]
  }

  peek(): T | undefined {
    return this._nodes[0]
  }

  last(): T | undefined {
    return this._nodes[this.size - 1]
  }

  poll(): T | undefined {
    if (this.size <= 0) {
      return this._nodes.pop()
    }

    const peek = this.peek()
    this._nodes[0] = this._nodes.pop()
    this.heapifyDown()

    return peek
  }

  insert(value: T): Heap {
    this._nodes.push(value)
    if (this.size > 1) {
      this.heapifyUp()
    }

    return this
  }

  remove(value: T, predicate: (first: T, second: T) => boolean = ((first, second) => first === second)): Heap {
    const removedCounter = this._nodes.reduce((counter, node) => predicate(node, value) ? ++counter : counter, 0)
    for (let i = 0; i < removedCounter; i++) {
      // Need to find index again since the heap is changed on each run
      const nodeIndex = this._nodes.findIndex(target => predicate(value, target))

      if (nodeIndex === 0) {
        this.poll()
      } else if (nodeIndex === this.size - 1) {
        this._nodes.pop()
      } else {
        this._nodes[nodeIndex] = this._nodes.pop()

        const parent = this.get(this.getParentIndex(nodeIndex))
        if (parent && !this.compare(parent, this._nodes[nodeIndex])) {
          this.heapifyDown(nodeIndex)
        } else {
          this.heapifyUp(nodeIndex)
        }
      }
    }

    return this
  }

  toString(): string {
    return this._nodes.join(',')
  }

  private heapifyUp(fromIndex: number = this.size - 1): Heap {
    while (
        this.hasParent(fromIndex)
        && !this.compare(this._nodes[this.getParentIndex(fromIndex)], this._nodes[fromIndex])
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
      if (this.hasRightChild(fromIndex) && this.compare(this._nodes[rightIndex], this._nodes[nextIndex])) {
        nextIndex = rightIndex
      }

      if (this.compare(this._nodes[fromIndex], this._nodes[nextIndex])) {
        break
      } else {
        this.swap(fromIndex, nextIndex)
      }

      fromIndex = nextIndex
    }

    return this
  }

  private swap(firstIndex: number, secondIndex: number): void {
    const temp = this._nodes[firstIndex]
    this._nodes[firstIndex] = this._nodes[secondIndex]
    this._nodes[secondIndex] = temp
  }
}