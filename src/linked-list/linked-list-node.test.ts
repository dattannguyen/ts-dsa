import { LinkedListNode } from './linked-list-node'

describe('Test LinkedListNode', () => {

  it('Should_CreateLinkedListNode_WhenGivenValue', () => {
    const newNode = new LinkedListNode(1)
    expect(newNode).toBeTruthy()
    expect(newNode.value).toBe(1)
  })

  it('Should_CreateLinkedListNode_WhenGivenValueAndNextAndPrev', () => {
    const next = new LinkedListNode('next')
    const prev = new LinkedListNode('prev')
    const node = new LinkedListNode('node', next, prev)

    expect(node.value).toBe('node')
    expect(node.next).toBe(next)
    expect(node.prev).toBe(prev)
  })

})
