import { stairCase } from './stair-case'

describe('Test stairCase()', () => {

  it('Should_ReturnExpectedNumberOfWay_WhenGivenTotalStep', () => {
    const twoStepStairCase = stairCase(2)
    expect(twoStepStairCase).toBe(2)

    const threeStepStairCase = stairCase(3)
    expect(threeStepStairCase).toBe(3)

    const fourStepStairCase = stairCase(4, 3)
    expect(fourStepStairCase).toBe(7)

    const fifthStepStairCase = stairCase(4)
    expect(fifthStepStairCase).toBe(5)
  })

})