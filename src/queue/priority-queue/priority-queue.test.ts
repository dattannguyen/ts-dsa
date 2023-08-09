import { PriorityQueue } from './priority-queue'

describe('Test enqueue()', () => {

  it('Should_EnqueueSuccessfully_WhenGivenMaxFirstQueue', () => {
    const queue = new PriorityQueue<string>()
    const onTraversed = jest.fn()

    expect(queue).toBeTruthy()
    expect(queue.peek()).toBeFalsy()

    queue.enqueue('last', 1, onTraversed)
    expect(queue.peek()?.value).toEqual('last')
    expect(onTraversed).toHaveBeenCalledTimes(0)

    onTraversed.mockClear()
    queue.enqueue('a', 2)
    queue.enqueue('b', 100)
    queue.enqueue('c', 3)
    queue.enqueue('100', 4)
    expect(queue.peek()?.value).toEqual('b')

    const massiveQueue = new PriorityQueue<number>()
    const size = 1000
    for (let i = 0; i < size; i++) {
      const priority = Math.floor(Math.random() * (size - 1) + 1)
      massiveQueue.enqueue(i, priority)
    }

    let traversedCount = 0
    const maxItem = { value: 1001, priority: size + 1 }
    const onMassiveTraversed = jest.fn(() => traversedCount++)
    massiveQueue.enqueue(maxItem.value, maxItem.priority, onMassiveTraversed)

    expect(massiveQueue.peek()?.value).toEqual(maxItem.value)
    expect(traversedCount).toBeLessThanOrEqual(size / 3)
  })

  it('Should_EnqueueSuccessfully_WhenGivenMinFirstQueue', () => {
    const massiveMinQueue = new PriorityQueue<number>((parent, child) => parent.priority > child.priority)
    const size = 100000
    for (let i = 0; i < size; i++) {
      const priority = Math.floor(Math.random() * (size - 1) + 1)
      massiveMinQueue.enqueue(i, priority)
    }

    let traversedCount = 0
    const minItem = { value: 1001, priority: size - size - 1 }
    const onMassiveTraversed = jest.fn(() => traversedCount++)
    massiveMinQueue.enqueue(minItem.value, minItem.priority, onMassiveTraversed)

    expect(massiveMinQueue.peek()?.value).toEqual(minItem.value)
    expect(massiveMinQueue.peek()?.priority).toEqual(minItem.priority)
    expect(traversedCount).toBeLessThanOrEqual(size / 3)
  })

})

describe('Test dequeue()', () => {

  it('Should_DequeueSuccessfully_WhenGivenMaxFirstQueue', () => {
    const queue = new PriorityQueue<string>()
    const onTraversed = jest.fn()

    expect(queue).toBeTruthy()
    expect(queue.peek()).toBeFalsy()

    queue.enqueue('first', 1, onTraversed)
    expect(queue.dequeue()?.value).toEqual('first')
    expect(onTraversed).toHaveBeenCalledTimes(0)
    expect(queue.peek()).toBeFalsy()

    queue.enqueue('b', 2)
    queue.enqueue('i', 100)
    queue.enqueue('nan', 3)
    queue.enqueue('a', 4)
    expect(queue.dequeue()?.value).toEqual('i')
    expect(queue.peek()?.value).toEqual('a')

    const superQueue = new PriorityQueue<number>()
    const size = 5000
    for (let i = 0; i < size; i++) {
      const priority = Math.floor(Math.random() * (size - 1) + 1)
      superQueue.enqueue(i, priority)
    }

    let traversedCount = 0
    const maxItem = { value: size + 1, priority: size + 1 }
    const onMassiveTraversed = jest.fn(() => traversedCount++)
    superQueue.enqueue(maxItem.value, maxItem.priority, onMassiveTraversed)

    expect(superQueue.dequeue()?.value).toEqual(maxItem.value)
    expect(superQueue.peek()?.priority).not.toEqual(maxItem.priority)
    expect(traversedCount).toBeLessThanOrEqual(size / 3)
  })

  it('Should_DequeueSuccessfully_WhenGivenMinFirstQueue', () => {
    const massiveMinQueue = new PriorityQueue<number>((parent, child) => parent.priority > child.priority)
    const size = 200000
    for (let i = 0; i < size; i++) {
      const priority = Math.floor(Math.random() * (size - 1) + 1)
      massiveMinQueue.enqueue(i, priority)
    }

    let traversedCount = 0
    const minItem = { value: size + 1, priority: size - size - 1 }
    const onMassiveTraversed = jest.fn(() => traversedCount++)
    massiveMinQueue.enqueue(minItem.value, minItem.priority, onMassiveTraversed)

    expect(massiveMinQueue.dequeue()?.value).toEqual(minItem.value)
    expect(massiveMinQueue.peek()?.priority).not.toEqual(minItem.priority)
    expect(traversedCount).toBeLessThanOrEqual(size / 3)
  })
})
