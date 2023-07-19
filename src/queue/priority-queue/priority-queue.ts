export class PriorityQueue<T = any> {

  private readonly _heap: T[]

  constructor() {
    this._heap = []
  }

  enqueue(value: T, priority: number): PriorityQueue<T> {
    return this
  }

  dequeue(): T {
    return
  }

}