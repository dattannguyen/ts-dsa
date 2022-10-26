import { Stack } from './stack'

describe('Test Stack', () => {

  it('Should_Push_WhenCalled', () => {
    const stack = new Stack()
    expect(stack).toBeTruthy()
    expect(stack.size).toBe(0)
    expect(stack.first()).toBeFalsy()
    expect(stack.last()).toBeFalsy()

    stack.push('tik')
    stack.push('tok')
    expect(stack.size).toBe(2)
    expect(stack.first()).toBe('tok')

    stack.push('fb')
    expect(stack.size).toBe(3)
    expect(stack.first()).toBe('fb')
    expect(stack.last()).toBe('tik')

    stack.push('SSE')
    expect(stack.size).toBe(4)
    expect(stack.first()).toBe('SSE')
    expect(stack.last()).toBe('tik')
  })

  it('Should_Pop_WhenHasOnlyHeadAndTail', () => {
    const stack = new Stack()
    expect(stack.pop()).toBeFalsy()

    stack.push('fb')
    stack.push('meta')

    expect(stack.size).toBe(2)
    expect(stack.first()).toBe('meta')
    expect(stack.last()).toBe('fb')

    const head = stack.pop()
    expect(stack.size).toBe(1)
    expect(head).toBe('meta')
    expect(stack.first()).toBe('fb')
    expect(stack.last()).toBe('fb')

    const tail = stack.pop()
    expect(stack.size).toBe(0)
    expect(tail).toBe('fb')
    expect(stack.first()).toBeFalsy()
    expect(stack.last()).toBeFalsy()
  })

  it('Should_Dequeue_WhenCalledMultipleTimes', () => {
    const stack = new Stack()
    stack.push('tik')
    stack.push('tok')
    stack.push('fb')
    stack.push('gg')

    expect(stack.size).toBe(4)
    expect(stack.first()).toBe('gg')
    expect(stack.last()).toBe('tik')

    const value = stack.pop()
    expect(value).toBe('gg')
    expect(stack.size).toBe(3)
    expect(stack.first()).toBe('fb')
    expect(stack.last()).toBe('tik')

    const next = stack.pop()
    expect(next).toBe('fb')
    expect(stack.size).toBe(2)
    expect(stack.first()).toBe('tok')
    expect(stack.last()).toBe('tik')
  })

})
