import { SinglyLinkedList } from './singly-linked-list'

describe('Test SinglyLinkedList find() & read()', () => {

  it('Should_ReturnUndefined_WhenHasNoMatchedValue', () => {
    const ll = new SinglyLinkedList()
    expect(ll.find('newHead')).toBeFalsy()

    ll.prepend('head')
    ll.append('b')

    expect(ll.size).toBe(2)
    expect(ll.find(2)).toBeFalsy()
  })

  it('Should_ReturnNode_WhenHasMatchedValue', () => {
    const ll = new SinglyLinkedList()
    ll.prepend('head')
    ll.prepend('newHead')

    expect(ll.size).toBe(2)
    expect(ll.find('newHead')).toBeTruthy()

    ll.append('heaD')
    expect(ll.size).toBe(3)
    expect(ll.find('heaD')).toBeTruthy()
  })

  it('Should_ReturnNode_WhenGivenIndex', () => {
    const ll = new SinglyLinkedList()
    ll.prepend('two')
    ll.prepend('one')

    expect(ll.size).toBe(2)
    expect(ll.read(0)?.value).toBe('one')

    ll.append('three')
    expect(ll.size).toBe(3)
    expect(ll.read(2)?.value).toBe('three')
    expect(ll.read(-1)?.value).toBeFalsy()
  })

})

describe('Test SinglyLinkedList prepend()', () => {

  it('Should_PrependNewNode_WhenHasNoHead', () => {
    const ll = new SinglyLinkedList()
    ll.prepend('head')
    expect(ll.size).toBe(1)
    expect(ll.head?.value).toBe('head')
  })

  it('Should_PrependNewNode_WhenHasHead', () => {
    const ll = new SinglyLinkedList()
    ll.prepend('head')
    ll.prepend('newHead')

    expect(ll.size).toBe(2)
    expect(ll.head?.value).toBe('newHead')
    expect(ll.head?.next?.value).toBe('head')
    expect(ll.tail?.value).toBe('head')
  })

})

describe('Test SinglyLinkedList append()', () => {

  it('Should_AppendNewNode_WhenHasNoHead', () => {
    const ll = new SinglyLinkedList()
    ll.append('head')

    expect(ll.size).toBe(1)
    expect(ll.head?.value).toBe('head')
    expect(ll.tail).toBe(undefined)
  })

  it('Should_AppendNewNode_WhenHasHead&NoTail', () => {
    const ll = new SinglyLinkedList()
    ll.append('head')
    ll.append('tail')

    expect(ll.size).toBe(2)
    expect(ll.head?.value).toBe('head')
    expect(ll.tail?.value).toBe('tail')
    expect(ll.head?.next).toBe(ll.tail)
  })

  it('Should_AppendNewNode_WhenHasHead&Tail', () => {
    const ll = new SinglyLinkedList()
    ll.append(1).append(2)

    ll.append(3)
    expect(ll.size).toBe(3)
    expect(ll.head?.next?.value).toBe(2)
    expect(ll.tail?.value).toBe(3)

    ll.append('tail2')
    expect(ll.size).toBe(4)
    expect(ll.head?.next?.next?.next.value).toBe('tail2')
    expect(ll.tail?.value).toBe('tail2')
  })

})

describe('Test SinglyLinkedList reverse()', () => {

  it('Should_ReverseLinkedList_WhenNoHeadOrNoTail', () => {
    const ll = new SinglyLinkedList()
    ll.prepend('no-head-tail')

    ll.reverse()
    expect(ll.head?.value).toBe('no-head-tail')
  })

  it('Should_ReverseLinkedList_WhenHasBothHead&Tail', () => {
    const ll = new SinglyLinkedList()
    ll.prepend(10)
        .append(9)
        .append(8)
        .append(7)
        .append(6)
        .append(5)

    ll.reverse()
    expect(ll.head?.value).toBe(5)
    expect(ll.tail?.value).toBe(10)
    expect(ll.head?.next?.next?.next?.value).toBe(8)
    expect(ll.tail?.next).toBe(undefined)
  })

  it('Should_BackToOriginalLinkedList_WhenReverseTwoTime', () => {
    const ll = new SinglyLinkedList()
    ll.prepend(10)
        .append(9)
        .append(8)
        .append(7)
        .append(6)
        .append(51)

    ll.reverse()
    expect(ll.head?.value).toBe(51)
    expect(ll.tail?.value).toBe(10)
    expect(ll.head?.next?.next?.next?.next?.value).toBe(9)
    expect(ll.tail.next?.value).toBe(undefined)

    ll.reverse()
    expect(ll.head?.value).toBe(10)
    expect(ll.tail?.value).not.toBe(10)
    expect(ll.head?.next?.next?.next?.next?.value).not.toBe(8)
    expect(ll.head?.next?.next?.next?.next?.value).toBe(6)
  })

})

describe('Test SinglyLinkedList delete()', () => {

  it('Should_DoNothing_WhenGivenNoHead', () => {
    const ll = new SinglyLinkedList()
    ll.delete(1)

    expect(ll.head).toBeFalsy()
  })

  it('Should_DeleteHead_WhenMatch', () => {
    const ll = new SinglyLinkedList()
    ll.append('head')
    ll.append('head')
    ll.append('no-deleted-head')
    expect(ll.size).toBe(3)

    ll.delete('head')
    expect(ll.head?.value).toBe('no-deleted-head')
    expect(ll.tail).toBe(undefined)
    expect(ll.size).toBe(2)
  })

  it('Should_DeleteMultipleNode_WhenMatch', () => {
    const ll = new SinglyLinkedList()
    ll.append('head')
    ll.append('head1')
    ll.append('head1')
    ll.append('head2')
    ll.append('no-deleted-head')
    expect(ll.size).toBe(5)

    ll.delete('head1')
    expect(ll.size).toBe(4)
    expect(ll.head?.value).toBe('head')
    expect(ll.head?.next?.value).toBe('head2')
    expect(ll.tail?.value).toBe('no-deleted-head')
  })

  it('Should_DeleteHeadAndTailNode_WhenMatch', () => {
    const ll = new SinglyLinkedList()
    ll.append('head')
    ll.append('head1')
    ll.append('head3')
    ll.append('head1')
    ll.append('head2')
    ll.append('head4')
    ll.append('head')

    ll.delete('head')
    expect(ll.head?.value).toBe('head1')
    expect(ll.tail?.value).toBe('head4')

    ll.delete('head1')
    expect(ll.head?.value).toBe('head3')
    expect(ll.head?.next?.value).toBe('head2')
    expect(ll.tail?.value).toBe('head4')
  })

})
