import {
  detectLinkedListCycleByTwoPointer,
  findMaxAmountOfWaterContainer,
  findMaxProfitOfStockByTwoPointer,
  isPalindrome,
  threeSum,
  twoSum
} from './two-pointer.technique'
import { SinglyLinkedList } from '../../linked-list/singly/singly-linked-list'

describe('Test isPalindrome()', () => {

  it('Should_ReturnTrue_WhenGivenEmptyString', () => {
    const truthy = isPalindrome(' ')
    expect(truthy).toBeTruthy()
  })

  it('Should_ReturnTrue_WhenGivenPalindromeString', () => {
    const firstTruthy = isPalindrome('A man, a plan, a canal: Panama')
    expect(firstTruthy).toBeTruthy()

    const secondTruthy = isPalindrome('level')
    expect(secondTruthy).toBeTruthy()
  })

  it('Should_ReturnFalse_WhenGivenInvalidPalindromeString', () => {
    const firstFalsy = isPalindrome('race a car')
    expect(firstFalsy).toBeFalsy()

    const secondFalsy = isPalindrome('0P')
    expect(secondFalsy).toBeFalsy()
  })

})

describe('Test twoSum()', () => {

  it('Should_ReturnUndefined_WhenGivenEmptyArray', () => {
    const pair = twoSum([], 10)
    expect(pair).toBeFalsy()
  })

  it('Should_ReturnUndefined_WhenNoMatchSumPair', () => {
    const pair = twoSum([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 20)
    expect(pair).toBeFalsy()
  })

  it('Should_ReturnExpectedIndexPair_WhenGivenMatchSumPair', () => {
    const firstPair = twoSum([10, 20, 35, 50, 75, 80], 70)
    expect(firstPair[0]).toBe(1)
    expect(firstPair[1]).toBe(3)

    const secondPair = twoSum([4, 2, 10, 23], 27)
    expect(secondPair[0]).toBe(0)
    expect(secondPair[1]).toBe(3)
  })

})

describe('Test threeSum()', () => {

  it('Should_ReturnEmpty_WhenGivenEmptyArray', () => {
    const result = threeSum([])
    expect(result.length).toBe(0)
  })

  it('Should_ReturnEmpty_WhenNoMatchSumPair', () => {
    const result = threeSum([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])
    expect(result.length).toBe(0)
  })

  it('Should_ReturnExpectedTriplet_WhenGivenMatchSum', () => {
    const first = threeSum([-1, 0, 1, 2, -1, -4])
    expect(first.toString()).toBe('-1,-1,2,-1,0,1')

    const second = threeSum([0, 0, 0])
    expect(second.toString()).toBe('0,0,0')
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

describe('Test findMaxProfitOfStockByTwoPointer()', () => {

  it('Should_ReturnZero_WhenGivenOnlyOneTransaction', () => {
    const profit = findMaxProfitOfStockByTwoPointer([1])
    expect(profit).toBe(0)
  })

  it('Should_ReturnMaxProfit_WhenAnArrayOfTransaction', () => {
    const profitOfFive = findMaxProfitOfStockByTwoPointer([7, 1, 5, 3, 6, 4])
    expect(profitOfFive).toBe(5)

    const profitOfSeven = findMaxProfitOfStockByTwoPointer([7, 2, 5, 3, 6, 4, 1, 2, 8, 4])
    expect(profitOfSeven).toBe(7)

    const profitOfSix = findMaxProfitOfStockByTwoPointer([2, 8, 1, 3])
    expect(profitOfSix).toBe(6)
  })

})

describe('Test findMaxAmountOfWaterContainer()', () => {

  it('Should_ReturnMaximumContainer_WhenGivenValid', function () {
    const first = findMaxAmountOfWaterContainer([1, 8, 6, 2, 5, 4, 8, 3, 7])
    expect(first).toBe(49)

    const second = findMaxAmountOfWaterContainer([1, 1])
    expect(second).toBe(1)
  })

})