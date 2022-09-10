import { groupAnagram } from './array'

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