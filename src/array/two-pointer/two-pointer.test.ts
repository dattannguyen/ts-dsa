import { detectLinkedListCycleByTwoPointer, twoSumByTwoPointer } from './two-pointer.technique'
import { SinglyLinkedList } from '../../linked-list/singly/singly-linked-list'

describe('Test twoSumByTwoPointer()', () => {

  it('Should_ReturnUndefined_WhenGivenEmptyArray', () => {
    const pair = twoSumByTwoPointer([], 10)
    expect(pair).toBeFalsy()
  })

  it('Should_ReturnUndefined_WhenNoMatchSumPair', () => {
    const pair = twoSumByTwoPointer([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 20)
    expect(pair).toBeFalsy()
  })

  it('Should_ReturnExpectedIndexPair_WhenGivenMatchSumPair', () => {
    const firstPair = twoSumByTwoPointer([10, 20, 35, 50, 75, 80], 70)
    expect(firstPair[0]).toBe(1)
    expect(firstPair[1]).toBe(3)

    const secondPair = twoSumByTwoPointer([4, 2, 10, 23], 27)
    expect(secondPair[0]).toBe(0)
    expect(secondPair[1]).toBe(3)
  })

})

describe('Test detectLinkedListCycleByTwoPointer()', () => {

  it('Should_ReturnFalse_WhenLinkedListHasOnlyHead', () => {
    const ll = new SinglyLinkedList()
    ll.append(1)

    const isCyclic = detectLinkedListCycleByTwoPointer(ll)
    expect(isCyclic).toBeFalsy()
  })

  it('Should_ReturnTrue_WhenTailPointToHead', () => {
    const ll = new SinglyLinkedList()
    ll.append(1).append(1)
    ll.tail.next = ll.head

    const isCyclic = detectLinkedListCycleByTwoPointer(ll)
    expect(isCyclic).toBeTruthy()
  })

  it('Should_ReturnFalse_WhenGivenNoCycleLinkedList', () => {
    const ll = new SinglyLinkedList()
    ll.append(1).append(2).append(3).append(4).append(5).append(6)

    const isCyclic = detectLinkedListCycleByTwoPointer(ll)
    expect(isCyclic).toBeFalsy()
  })

  it('Should_ReturnTrue_WhenGivenCyclicLinkedList', () => {
    const firstLL = new SinglyLinkedList()
    firstLL.append(1).append(2).append(3).append(4)

    const secondNode = firstLL.head.next
    const thirdNode = firstLL.head.next.next
    thirdNode.next = secondNode

    const isFirstLLCyclic = detectLinkedListCycleByTwoPointer(firstLL)
    expect(isFirstLLCyclic).toBeTruthy()

    const secondLL = new SinglyLinkedList()
    secondLL.append(1).append(2).append(3).append(4).append(5).append(6).append(7)
    secondLL.head.next.next.next.next.next.next = secondLL.head.next

    const isSecondLLCyclic = detectLinkedListCycleByTwoPointer(secondLL)
    expect(isSecondLLCyclic).toBeTruthy()
  })

})
