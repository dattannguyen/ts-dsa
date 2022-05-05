import { DoublyLinkedList } from './doubly-linked-list'

describe('Test DoublyLinkedList prepend()', () => {

  it('Should_PrependNewNode_WhenHasNoHead', () => {
    const ll = new DoublyLinkedList()
    ll.prepend('head')

    expect(ll.head?.value).toBe('head')
    expect(ll.tail).toBe(undefined)
  })

  it('Should_PrependNewNode_WhenHasHead', () => {
    const ll = new DoublyLinkedList()
    ll.prepend('head')
    ll.prepend('newHead')

    expect(ll.head?.value).toBe('newHead')
    expect(ll.head?.next?.value).toBe('head')
    expect(ll.tail?.value).toBe('head')
    expect(ll.tail?.prev?.value).toBe('newHead')
  })

})

describe('Test DoublyLinkedList append()', () => {

  it('Should_AppendNewNode_WhenHasNoHead', () => {
    const ll = new DoublyLinkedList()
    ll.append('head')

    expect(ll.head?.value).toBe('head')
    expect(ll.tail).toBe(undefined)
  })

  it('Should_AppendNewNode_WhenHasHead&NoTail', () => {
    const ll = new DoublyLinkedList()
    ll.append('head')
    ll.append('tail')

    expect(ll.head?.value).toBe('head')
    expect(ll.tail?.value).toBe('tail')
    expect(ll.head?.next).toBe(ll.tail)
  })

  it('Should_AppendNewNode_WhenHasHead&Tail', () => {
    const ll = new DoublyLinkedList()
    ll.append('head')
    ll.append('tail')

    ll.append('tail1')
    expect(ll.head?.next?.value).toBe('tail')
    expect(ll.tail?.prev?.value).toBe('tail')
    expect(ll.tail?.next?.value).toBe(undefined)
    expect(ll.tail?.value).toBe('tail1')

    ll.append('tail2')
    expect(ll.head?.next?.value).toBe('tail')
    expect(ll.head?.next?.next?.value).toBe('tail1')
    expect(ll.tail?.value).toBe('tail2')
    expect(ll.tail?.prev?.value).toBe('tail1')
  })

})

describe('Test DoublyLinkedList toArray()', () => {

  it('Should_ToEmptyArray_WhenNoHead', () => {
    const ll = new DoublyLinkedList()
    const nodes = ll.toArray()
    expect(nodes.length).toBe(0)
  })

  it('Should_ToArray_WhenHasOnlyHeadAndTail', () => {
    const ll = new DoublyLinkedList()
    ll.append('head')
    ll.append('tail')

    const nodes = ll.toArray()
    expect(nodes.length).toBe(2)
    expect(nodes[0]?.value).toBe('head')
    expect(nodes[1]?.value).toBe('tail')
  })

  it('Should_ToArray_WhenHasOnHeadAndTail', () => {
    const ll = new DoublyLinkedList()
    ll.append('head')
    ll.append('tail')
    ll.append('tail1')
    ll.append('tail2')
    ll.append('tail3')

    const nodeValues = ll.toArray().map(node => node.value)
    expect(nodeValues.length).toBe(5)
    expect(nodeValues).toEqual(expect.arrayContaining(['head', 'tail', 'tail1', 'tail2', 'tail3']))
  })

})

describe('Test DoublyLinkedList reverse()', () => {

  it('Should_ReverseArray_WhenNoHeadOrNoTail', () => {
    const ll = new DoublyLinkedList()
    ll.prepend('no-head-tail')

    ll.reverse()
    expect(ll.head?.value).toBe('no-head-tail')
  })

  it('Should_ReverseArray_WhenHasBothHead&Tail', () => {
    const ll = new DoublyLinkedList()
    ll.prepend('head')
        .append('item0')
        .append('item1')
        .append('item2')
        .append('item3')
        .append('tail')

    ll.reverse()
    const nodes = ll.toArray()
    const head = nodes[0]
    const tail = nodes[nodes.length - 1]

    expect(head?.value).toBe('tail')
    expect(tail?.value).toBe('head')

    expect(head.next?.value).toBe('item3')
    expect(head.prev?.value).toBe(undefined)
    expect(tail.prev?.value).toBe('item0')
    expect(tail.next?.value).toBe(undefined)

    expect(nodes[2]?.value).toBe('item2')
    expect(nodes[2]?.next?.value).toBe('item1')
    expect(nodes[2]?.prev?.value).toBe('item3')

    expect(nodes[4]?.value).toBe('item0')
    expect(nodes[4]?.next?.value).toBe('head')
    expect(nodes[4]?.prev?.value).toBe('item1')
  })

})
