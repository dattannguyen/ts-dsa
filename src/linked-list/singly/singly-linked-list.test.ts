import { SinglyLinkedList } from './singly-linked-list'

describe('Test SinglyLinkedList prepend()', () => {

  it('Should_PrependNewNode_WhenHasNoHead', () => {
    const ll = new SinglyLinkedList()
    ll.prepend('head')
    expect(ll.head?.value).toBe('head')
  })

  it('Should_PrependNewNode_WhenHasHead', () => {
    const ll = new SinglyLinkedList()
    ll.prepend('head')
    ll.prepend('newHead')

    expect(ll.head?.value).toBe('newHead')
    expect(ll.head?.next?.value).toBe('head')
  })

})
