import { Queue } from './queue'

describe('Test Queue', () => {

  it('Should_Enqueue_WhenCalled', () => {
    const queue = new Queue()
    expect(queue).toBeTruthy()

    queue.enqueue('tik')
    expect(queue.first()).toBe('tik')

    queue.enqueue('tok')
    expect(queue.first()).toBe('tik')
    expect(queue.last()).toBe('tok')

    queue.enqueue('2')
    expect(queue.first()).toBe('tik')
    expect(queue.last()).not.toBe('tok')
    expect(queue.last()).toBe('2')
  })

  it('Should_Dequeue_WhenHasOnlyHeadAndTail', () => {
    const queue = new Queue()
    expect(queue.dequeue()).toBe(undefined)

    queue.enqueue('fb')
    queue.enqueue('meta')

    expect(queue.first()).toBe('fb')
    expect(queue.last()).toBe('meta')

    const head = queue.dequeue()
    expect(head).toBe('fb')
    expect(queue.first()).toBe('meta')
    expect(queue.last()).toBe(undefined)

    const tail = queue.dequeue()
    expect(tail).toBe('meta')
    expect(queue.first()).toBe(undefined)
    expect(queue.last()).toBe(undefined)
  })

  it('Should_Dequeue_WhenCalledMultipleTimes', () => {
    const queue = new Queue()
    queue.enqueue('tik')
    queue.enqueue('tok')
    queue.enqueue('fb')
    queue.enqueue('gg')

    expect(queue.first()).toBe('tik')
    expect(queue.last()).toBe('gg')

    const value = queue.dequeue()
    expect(value).toBe('tik')
    expect(queue.first()).toBe('tok')
    expect(queue.last()).toBe('gg')

    const next = queue.dequeue()
    expect(next).toBe('tok')
    expect(queue.first()).toBe('fb')
    expect(queue.last()).toBe('gg')
  })

})
