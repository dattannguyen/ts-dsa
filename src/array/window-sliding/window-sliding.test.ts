import { windowSlidingTechnique } from './window-sliding.technique'

describe('Test windowSlidingTechnique()', () => {

  it('Should_ReturnZero_WhenGivenEmptyArray', () => {
    const max = windowSlidingTechnique([], 10)
    expect(max).toBe(0)
  })

  it('Should_ReturnSumOfArray_WhenGivenKElementLargerOrEqualArrayLength', () => {
    const max = windowSlidingTechnique([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 10)
    expect(max).toBe(55)
  })

  it('Should_ReturnExpectedMaxSum_WhenGivenKElementLessThanArrayLength', () => {
    const maxIsThirtyNine = windowSlidingTechnique([1, 4, 2, 10, 23, 3, 1, 0, 20], 4)
    expect(maxIsThirtyNine).toBe(39)

    const maxIsThirtyThree = windowSlidingTechnique([4, 2, 10, 23], 2)
    expect(maxIsThirtyThree).toBe(33)
  })


})
