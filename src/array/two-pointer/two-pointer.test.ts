import { twoSumAsTwoPointerTechnique } from './two-pointer.technique'

describe('Test twoSumAsTwoPointerTechnique()', () => {

  it('Should_ReturnUndefined_WhenGivenEmptyArray', () => {
    const pair = twoSumAsTwoPointerTechnique([], 10)
    expect(pair).toBeFalsy()
  })

  it('Should_ReturnUndefined_WhenNoMatchSumPair', () => {
    const pair = twoSumAsTwoPointerTechnique([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 20)
    expect(pair).toBeFalsy()
  })

  it('Should_ReturnExpectedIndexPair_WhenGivenMatchSumPair', () => {
    const firstPair = twoSumAsTwoPointerTechnique([10, 20, 35, 50, 75, 80], 70)
    expect(firstPair[0]).toBe(1)
    expect(firstPair[1]).toBe(3)

    const secondPair = twoSumAsTwoPointerTechnique([4, 2, 10, 23], 27)
    expect(secondPair[0]).toBe(0)
    expect(secondPair[1]).toBe(3)
  })


})
