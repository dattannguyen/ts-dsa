import { findTopFrequentElementByBucket, findTopFrequentElementByHeap, groupAnagram } from './array'

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