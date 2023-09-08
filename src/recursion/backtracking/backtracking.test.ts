import { subsets } from './backtracking.practice'

describe('Test subsets()', () => {

  it('Should_ReturnEmpty_WhenGivenEmptyArray', () => {
    const combinations = subsets([])
    expect(combinations.length).toBe(1)
    expect(combinations[0].toString()).toBe('')
  })

  it('Should_ReturnAllCombinations_WhenGivenListOfNumber', () => {
    const firstNums = [0]
    const firstC = subsets(firstNums)
    expect(firstC.length).toBe(Math.pow(2, firstNums.length))

    const firstFlatC = firstC.map(nums => nums.toString())
    expect(firstFlatC.some(c => c === '')).toBeTruthy()
    expect(firstFlatC.some(c => c === '0')).toBeTruthy()

    const secondNums = [1, 2, 3]
    const secondC = subsets(secondNums)
    expect(secondC.length).toBe(Math.pow(2, secondNums.length))

    const secondFlatC = secondC.map(nums => nums.toString())
    expect(secondFlatC.some(c => c === '')).toBeTruthy()
    expect(secondFlatC.some(c => c === '1')).toBeTruthy()
    expect(secondFlatC.some(c => c === '1,2')).toBeTruthy()
    expect(secondFlatC.some(c => c === '1,2,3')).toBeTruthy()
    expect(secondFlatC.some(c => c === '1,3')).toBeTruthy()
    expect(secondFlatC.some(c => c === '2')).toBeTruthy()
    expect(secondFlatC.some(c => c === '2,3')).toBeTruthy()
    expect(secondFlatC.some(c => c === '3')).toBeTruthy()
  })

})