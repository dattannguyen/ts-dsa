import { DoublyLinkedList } from './doubly-linked-list'

describe('Test DoublyLinkedList find()', () => {

  it('Should_ReturnNil_WhenHasNoHead', () => {
    const ll = new DoublyLinkedList()
    const node = ll.find(100)

    expect(node).toBe(undefined)
  })

  it('Should_ReturnNil_WhenHasNoMatchNode', () => {
    const ll = new DoublyLinkedList()
    ll.append(1).append(2).append(4).append(5)

    const node = ll.find(100)
    expect(node).toBe(undefined)
  })

  it('Should_ReturnNode_WhenHasFullyLinkedList', () => {
    const ll = new DoublyLinkedList()
    ll.append(1)
        .append(2)
        .append(4)
        .append(5)
        .append(6)

    const head = ll.find(1)
    expect(head?.value).toBe(1)
    expect(head?.next?.value).toBe(2)
    expect(head?.prev?.value).toBe(undefined)

    const tail = ll.find(6)
    expect(tail?.value).toBe(6)
    expect(tail?.next?.value).toBe(undefined)
    expect(tail?.prev?.value).toBe(5)

    const random = ll.find(4)
    expect(random?.value).toBe(4)
    expect(random?.next?.value).toBe(5)
    expect(random?.prev?.value).toBe(2)
  })

})

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

describe('Test DoublyLinkedList delete()', () => {

  it('Should_DeleteHead_WhenOnlyOneHead', () => {
    const ll = new DoublyLinkedList()
    ll.prepend(1)

    ll.delete(1)
    expect(ll.head).toBe(undefined)
  })

  it('Should_DeleteTail_WhenHasOnlyHead&Tail', () => {
    const ll = new DoublyLinkedList()
    ll.prepend(1).append(2)
    expect(ll.head.next?.value).toBe(2)

    ll.delete(2)
    expect(ll.head?.value).toBe(1)
    expect(ll.head?.next).toBe(undefined)
    expect(ll.tail).toBe(undefined)
  })

  it('Should_DeleteNode_WhenHasFullDoublyLinkedList', () => {
    const ll = new DoublyLinkedList()
    ll.prepend(1)
        .append(2)
        .append(3)
        .append(4)
        .append(5)
        .append(6)

    expect(ll.head.next?.value).toBe(2)
    expect(ll.tail.prev?.value).toBe(5)

    ll.delete(3)
    expect(ll.head?.next?.next?.value).toBe(4)
    expect(ll.head?.next?.next?.prev?.value).toBe(2)

    ll.delete(6)
    expect(ll.toArray().length).toBe(4)
    expect(ll.tail.value).toBe(5)
    expect(ll.tail.next).toBe(undefined)

    ll.delete(1)
    expect(ll.toArray().length).toBe(3)
    expect(ll.head?.value).toBe(2)
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

  it('Should_ReverseLinkedList_WhenNoHeadOrNoTail', () => {
    const ll = new DoublyLinkedList()
    ll.prepend('no-head-tail')

    ll.reverse()
    expect(ll.head?.value).toBe('no-head-tail')
  })

  it('Should_ReverseLinkedList_WhenHasBothHead&Tail', () => {
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

  it('Should_BackToOriginalLinkedList_WhenReverseTwoTime', () => {
    const ll = new DoublyLinkedList()
    ll.prepend(1)
        .append(2)
        .append(3)
        .append(4)
        .append(5)
        .append(6)

    ll.reverse()
    expect(ll.head?.value).toBe(6)
    expect(ll.tail?.value).toBe(1)

    expect(ll.head.next?.value).toBe(5)
    expect(ll.head.prev?.value).toBe(undefined)
    expect(ll.tail.prev?.value).toBe(2)
    expect(ll.tail.next?.value).toBe(undefined)

    expect(ll.head?.next?.next?.value).toBe(4)
    expect(ll.tail?.prev?.prev?.value).toBe(3)
    expect(ll.tail?.prev?.next?.value).toBe(1)
    expect(ll.head?.next?.next?.next?.next?.value).toBe(2)

    ll.reverse()
    expect(ll.head?.value).toBe(1)
    expect(ll.tail?.value).toBe(6)

    expect(ll.head?.next?.value).toBe(2)
    expect(ll.head?.next?.next?.value).toBe(3)
    expect(ll.head?.next?.next?.next?.value).toBe(4)
    expect(ll.head?.next?.next?.next?.next?.value).toBe(5)

    expect(ll.head?.next?.prev?.value).toBe(1)
    expect(ll.head?.next?.next?.prev.value).toBe(2)
    expect(ll.head?.next?.next?.prev?.next?.value).toBe(3)
    expect(ll.tail?.prev?.prev?.prev?.next?.value).toBe(4)
  })

})
