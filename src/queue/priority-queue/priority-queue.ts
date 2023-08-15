type QueueItem<T> = { value: T, priority: number }

export class PriorityQueue<T = any> {

  private readonly _heap: QueueItem<T>[]
  private readonly _heapifyUpComparator: (parent: QueueItem<T>, child: QueueItem<any>) => boolean

  constructor(heapifyUpComparator?: (parent: QueueItem<T>, child: QueueItem<any>) => boolean) {
    this._heap = []
    this._heapifyUpComparator = heapifyUpComparator || ((parent: QueueItem<T>, child: QueueItem<any>) => parent.priority < child.priority)
  }

  peek(): QueueItem<T> {
    return this._heap[0]
  }

  enqueue(value: T, priority: number, _onTraversed?: any): PriorityQueue<T> {
    this._heap.push({ value, priority })

    this.heapifyUp(_onTraversed)
    return this
  }

  dequeue(_onTraversed?: any): QueueItem<T> {
    if (this._heap.length <= 1) {
      return this._heap.shift()
    }

    this.swap(0, this._heap.length - 1)
    const item = this._heap.pop()
    this.heapifyDown(_onTraversed)

    return item
  }

  private heapifyUp(_onTraversed?: any): PriorityQueue<T> {
    let nodeIndex = this._heap.length - 1
    let parentIndex = this.parentIndex(nodeIndex)

    while (nodeIndex >= 0 && parentIndex >= 0) {
      if (!this._heapifyUpComparator(this._heap[parentIndex], this._heap[nodeIndex])) {
        return
      }

      this.swap(parentIndex, nodeIndex)
      nodeIndex = parentIndex
      parentIndex = this.parentIndex(nodeIndex)
      _onTraversed?.()
    }

    return this
  }

  private heapifyDown(_onTraversed?: any): PriorityQueue<T> {
    let nodeIndex = 0

    while (this._heap[nodeIndex * 2 + 1]) {
      const leftIndex = nodeIndex * 2 + 1
      const rightIndex = nodeIndex * 2 + 2

      let swapIndex = leftIndex
      if (this._heap[rightIndex] !== undefined && !this._heapifyUpComparator(this._heap[swapIndex], this._heap[rightIndex])) {
        swapIndex = rightIndex
      }

      if (this._heapifyUpComparator(this._heap[nodeIndex], this._heap[swapIndex])) {
        break
      }

      this.swap(nodeIndex, swapIndex)
      nodeIndex = swapIndex
      _onTraversed?.()
    }

    return this
  }

  private parentIndex(childIndex: number): number {
    return Math.floor((childIndex - 1) / 2)
  }

  private swap(from: number, to: number) {
    const temp = this._heap[from]
    this._heap[from] = this._heap[to]
    this._heap[to] = temp
  }

}