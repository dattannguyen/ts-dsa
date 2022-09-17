import {
  findLongestConsecutiveSequence,
  findTopFrequentElementByBucket,
  findTopFrequentElementByHeap,
  groupAnagram
} from './array'

describe('Test groupAnagram()', () => {

  it('Should_ReturnEmptyArray_WhenGivenEmptyArrayOfWord', () => {
    const group = groupAnagram([])
    expect(group).toEqual([])
  })

  it('Should_ReturnGroup_WhenGivenArrayOfAnagram', () => {
    const groupOne = groupAnagram(['eat', 'tea', 'tan', 'ate', 'nat', 'bat'])
    expect(groupOne).toContainEqual(['bat'])
    expect(groupOne).toContainEqual(['tan', 'nat'])
    expect(groupOne).toContainEqual(['eat', 'tea', 'ate'])

    const groupTwo = groupAnagram(['a'])
    expect(groupTwo).toContainEqual(['a'])

    const groupThree = groupAnagram(['cab', 'tin', 'pew', 'duh', 'may', 'ill', 'buy', 'bar', 'max', 'doc'])
    expect(groupThree).toContainEqual(['cab'])
    expect(groupThree).toContainEqual(['tin'])
    expect(groupThree).toContainEqual(['pew'])
    expect(groupThree).toContainEqual(['duh'])
    expect(groupThree).toContainEqual(['ill'])
    expect(groupThree).toContainEqual(['buy'])
    expect(groupThree).toContainEqual(['bar'])
    expect(groupThree).toContainEqual(['max'])
    expect(groupThree).toContainEqual(['doc'])
  })

})

describe('Test findTopFrequentElement()', () => {

  it('Should_ReturnTopKElement_WhenUseHeap', () => {
    const topOne = findTopFrequentElementByHeap([1, 1, 1, 2, 2, 3], 2)
    expect(topOne).toContainEqual(1)
    expect(topOne).toContainEqual(2)
    expect(topOne).not.toContainEqual(3)

    const topTwo = findTopFrequentElementByHeap([1], 1)
    expect(topTwo).toContainEqual(1)

    const topThree = findTopFrequentElementByHeap([1, 2], 2)
    expect(topThree).toContainEqual(1)
    expect(topThree).toContainEqual(2)
  })

  it('Should_ReturnTopKElement_WhenUseBucket', () => {
    const topBucketOne = findTopFrequentElementByBucket([1, 1, 1, 2, 2, 3, 4], 2)
    expect(topBucketOne).toContainEqual(1)
    expect(topBucketOne).toContainEqual(2)
    expect(topBucketOne).not.toContainEqual(3)

    const topBucketTwo = findTopFrequentElementByBucket([1], 1)
    expect(topBucketTwo).toContainEqual(1)

    const topBucketThree = findTopFrequentElementByBucket([1, 2], 2)
    expect(topBucketThree).toContainEqual(1)
    expect(topBucketThree).toContainEqual(2)
  })

})

describe('Test findLongestConsecutiveSequence', () => {

  it('Should_ReturnZero_WhenGivenEmptyInput', () => {
    const length = findLongestConsecutiveSequence([])
    expect(length).toBe(0)
  })

  it('Should_ReturnExpectedLength_WhenGivenValidArray', () => {
    const firstLength = findLongestConsecutiveSequence([1, 1000, 2000, 2, 3, 200, 409, 5, 1, 6])
    expect(firstLength).toBe(3)

    const secondLength = findLongestConsecutiveSequence([100, 4, 200, 1, 3, 2])
    expect(secondLength).toBe(4)

    const thirdLength = findLongestConsecutiveSequence([0, 3, 7, 2, 5, 8, 4, 6, 0, 1])
    expect(thirdLength).toBe(9)

    const fourthLength = findLongestConsecutiveSequence([0, 1, 2, 3, 4, 10, 11, 12, 13, 14, 15, 16])
    expect(fourthLength).toBe(7)

    const fifLength = findLongestConsecutiveSequence([0])
    expect(fifLength).toBe(1)

    const sixthLength = findLongestConsecutiveSequence([0, 0])
    expect(sixthLength).toBe(1)

  })

})