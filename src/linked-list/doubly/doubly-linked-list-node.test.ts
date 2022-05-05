import { DoublyLinkedListNode } from './doubly-linked-list-node'

describe('Test DoublyLinkedListNode', () => {

  it('Should_CreateLinkedListNode_WhenGivenValue', () => {
    const newNode = new DoublyLinkedListNode(1)
    expect(newNode).toBeTruthy()
    expect(newNode.value).toBe(1)
  })

  it('Should_CreateLinkedListNode_WhenGivenValueAndNextAndPrev', () => {
    const next = new DoublyLinkedListNode('next')
    const prev = new DoublyLinkedListNode('prev')
    const node = new DoublyLinkedListNode('node', next, prev)

    expect(node.value).toBe('node')
    expect(node.next).toBe(next)
    expect(node.prev).toBe(prev)
  })

})
