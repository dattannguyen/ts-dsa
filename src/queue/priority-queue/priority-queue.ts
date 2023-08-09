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

  dequeue(): QueueItem<T> {
    const head = this._heap.shift()
    this.heapifyDown()

    return head
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

  private heapifyDown(): PriorityQueue<T> {


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