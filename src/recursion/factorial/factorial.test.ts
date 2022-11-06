import { factorialByBottomUp, factorialByTopDown } from './factorial'

describe('Test factorial()', () => {

  it('Should_ReturnOne_WhenGivenBaseCase', () => {
    const zeroBottomUp = factorialByBottomUp(0)
    expect(zeroBottomUp).toBe(0)

    const oneBottomUp = factorialByBottomUp(1)
    expect(oneBottomUp).toBe(1)

    const zeroTopDown = factorialByTopDown(0)
    expect(zeroTopDown).toBe(0)

    const oneTopDown = factorialByTopDown(1)
    expect(oneTopDown).toBe(1)

    expect(zeroBottomUp).toEqual(zeroTopDown)
    expect(oneBottomUp).toEqual(oneTopDown)
  })

  it('Should_ReturnFactorialResult_WhenGivenRandomNumber', () => {
    const sixBottomUp = factorialByBottomUp(6)
    expect(sixBottomUp).toBe(720)

    const fortySevenBottomUp = factorialByBottomUp(47)
    expect(fortySevenBottomUp).toBe(258623241511168180642964355153611979969197632389120000000000)

    const sixTopDown = factorialByTopDown(6)
    const fortySevenTopDown = factorialByTopDown(47)

    expect(sixBottomUp).toEqual(sixTopDown)
    expect(fortySevenBottomUp).toEqual(fortySevenTopDown)
  })

})