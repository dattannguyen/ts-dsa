import { SinglyLinkedListNode } from './singly-linked-list-node'

describe('Test SinglyLinkedListNode', () => {

  it('Should_CreateSinglyLinkedListNode_WhenGivenValue', () => {
    const newNode = new SinglyLinkedListNode(1)
    expect(newNode).toBeTruthy()
    expect(newNode.value).toBe(1)
  })

  it('Should_CreateSinglyLinkedListNode_WhenGivenValueAndNextAndPrev', () => {
    const next = new SinglyLinkedListNode('next')
    const node = new SinglyLinkedListNode('node', next, 'value')

    expect(node.value).toBe('node')
    expect(node.next).toBe(next)
    expect(node.data).toBe('value')
  })

})
