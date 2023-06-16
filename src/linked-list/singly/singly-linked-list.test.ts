import { SinglyLinkedList } from './singly-linked-list'
import { mergeSortedList, removeNthNodeFromEndOfList } from './singly-linked-list.practice'

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

describe('Test mergeSortedList()', () => {

  it('Should_DoNothing_WhenGivenTwoEmptyList', () => {
    const onTraversed = jest.fn(() => 1)
    const ll = mergeSortedList(new SinglyLinkedList(), new SinglyLinkedList(), onTraversed)

    expect(ll.head).toBeFalsy()
    expect(onTraversed).toHaveBeenCalledTimes(0)
  })

  it('Should_MergedIntoSortedLinkedList_WhenGivenTwoSortedList', () => {
    const onTraversed = jest.fn(() => 1)
    const isSorted = (ll: SinglyLinkedList): boolean => {
      let node = ll.head
      while (node) {
        if (node.next && node.value > node.next.value) {
          return false
        }

        node = node.next
      }

      return true
    }

    const firstLL = mergeSortedList(
        new SinglyLinkedList().append(1).append(2).append(4),
        new SinglyLinkedList().append(1).append(3).append(4),
        onTraversed,
    )

    expect(firstLL.head).toBeTruthy()
    expect(firstLL.size).toBe(6)
    expect(isSorted(firstLL)).toBeTruthy()
    expect(onTraversed).toHaveBeenCalledTimes(6)

    onTraversed.mockClear()
    const secondLL = mergeSortedList(
        new SinglyLinkedList().append(1).append(2).append(3).append(4).append(10).append(12),
        new SinglyLinkedList().append(0).append(5).append(9).append(11),
        onTraversed,
    )

    expect(secondLL.head).toBeTruthy()
    expect(secondLL.size).toBe(10)
    expect(isSorted(secondLL)).toBeTruthy()
    expect(onTraversed).toHaveBeenCalledTimes(10)

    onTraversed.mockClear()
    const thirdLL = mergeSortedList(
        new SinglyLinkedList().append(100),
        new SinglyLinkedList().append(1).append(2).append(3).append(4).append(10).append(12),
        onTraversed,
    )

    expect(thirdLL.head).toBeTruthy()
    expect(thirdLL.size).toBe(7)
    expect(isSorted(thirdLL)).toBeTruthy()
    expect(onTraversed).toHaveBeenCalledTimes(7)
  })
})

describe('Test removeNthNodeFromEndOfList()', () => {

  it('Should_DoNothing_WhenGivenTwoEmptyListOrInvalidIndex', () => {
    const onTraversed = jest.fn(() => 1)
    const emptyHeadLL = removeNthNodeFromEndOfList(new SinglyLinkedList(), 100, onTraversed)

    expect(emptyHeadLL.head).toBeFalsy()
    expect(onTraversed).toHaveBeenCalledTimes(0)

    onTraversed.mockClear()
    const invalidIndexLL = removeNthNodeFromEndOfList(new SinglyLinkedList().append(1), -10, onTraversed)
    expect(invalidIndexLL.head?.value).toBe(1)
    expect(onTraversed).toHaveBeenCalledTimes(0)

    onTraversed.mockClear()
    const onlyOneNodeLL = removeNthNodeFromEndOfList(new SinglyLinkedList().append(1), 1, onTraversed)
    expect(onlyOneNodeLL).toBeFalsy()
    expect(onTraversed).toHaveBeenCalledTimes(0)
  })

  it('Should_RemoveNthNodeFromEndOfList_WhenGivenValidInput', () => {
    const onTraversed = jest.fn(() => 1)

    const firstLL = removeNthNodeFromEndOfList(
        new SinglyLinkedList().append(1).append(2).append(3).append(4).append(5),
        2,
        onTraversed,
    )

    expect(firstLL.head).toBeTruthy()
    expect(firstLL.find(4)).toBeFalsy()
    expect(firstLL.find(3)?.next?.value).toBe(5)
    expect(onTraversed).toHaveBeenCalledTimes(5)

    onTraversed.mockClear()
    const secondLL = removeNthNodeFromEndOfList(
        new SinglyLinkedList().append(1).append(2).append(3).append(4).append(10).append(12)
            .append(0).append(5).append(9).append(11),
        5,
        onTraversed,
    )

    expect(secondLL.head).toBeTruthy()
    expect(secondLL.find(12)).toBeFalsy()
    expect(secondLL.find(10)?.next?.value).toBe(0)
    expect(onTraversed).toHaveBeenCalledTimes(10)

    onTraversed.mockClear()
    const thirdLL = removeNthNodeFromEndOfList(
        new SinglyLinkedList().append(1).append(2),
        2,
        onTraversed,
    )

    expect(thirdLL.head).toBeTruthy()
    expect(thirdLL.head?.value).toBe(2)
    expect(thirdLL.head?.next).toBeFalsy()
    expect(onTraversed).toHaveBeenCalledTimes(2)
  })
})
