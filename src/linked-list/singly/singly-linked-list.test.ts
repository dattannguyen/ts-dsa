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
    expect(ll.tail?.value).toBe('head')
  })

})

describe('Test SinglyLinkedList append()', () => {

  it('Should_AppendNewNode_WhenHasNoHead', () => {
    const ll = new SinglyLinkedList()
    ll.append('head')

    expect(ll.head?.value).toBe('head')
    expect(ll.tail).toBe(undefined)
  })

  it('Should_AppendNewNode_WhenHasHead&NoTail', () => {
    const ll = new SinglyLinkedList()
    ll.append('head')
    ll.append('tail')

    expect(ll.head?.value).toBe('head')
    expect(ll.tail?.value).toBe('tail')
    expect(ll.head?.next).toBe(ll.tail)
  })

  it('Should_AppendNewNode_WhenHasHead&Tail', () => {
    const ll = new SinglyLinkedList()
    ll.append(1).append(2)

    ll.append(3)
    expect(ll.head?.next?.value).toBe(2)
    expect(ll.tail?.value).toBe(3)

    ll.append('tail2')
    expect(ll.head?.next?.next?.next.value).toBe('tail2')
    expect(ll.tail?.value).toBe('tail2')
  })

})
