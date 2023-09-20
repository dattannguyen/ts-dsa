import { fibonacciAtByBottomUp, fibonacciAtByMemo, gridTraveler } from './dynamic-programming.practice'

describe('Test fibonacci()', () => {

  it('Should_ReturnExpectedResultAcceptedTime_WhenGivenPositionOfFibonacciSeries', () => {
    const onCalled = jest.fn()

    const first = fibonacciAtByMemo(0, onCalled)
    expect(first).toBe(0)
    expect(onCalled).toHaveBeenCalledTimes(1)

    onCalled.mockClear()
    const second = fibonacciAtByMemo(1, onCalled)
    expect(second).toBe(1)
    expect(onCalled).toHaveBeenCalledTimes(1)

    onCalled.mockClear()
    fibonacciAtByMemo(1000, onCalled)
    expect(onCalled).toHaveBeenCalledTimes(1002)
  })

  it('Should_GenerateFibonacciSeriesInAcceptedTime_WhenGivenSizeOfSeries', () => {
    const onCalled = jest.fn()

    const atZero = fibonacciAtByBottomUp(0)
    expect(atZero).toBe(0)

    const atFifth = fibonacciAtByBottomUp(5, onCalled)
    expect(atFifth).toBe(3)
    expect(onCalled).toHaveBeenCalledTimes(3)

    onCalled.mockClear()
    const atNinth = fibonacciAtByBottomUp(9, onCalled)
    expect(atNinth).toBe(21)
    expect(onCalled).toHaveBeenCalledTimes(7)

    onCalled.mockClear()
    const atOne = fibonacciAtByBottomUp(1, onCalled)
    expect(atOne).toBe(1)
    expect(onCalled).toHaveBeenCalledTimes(0)
  })

})

describe('Test gridTraveler()', () => {

  it('Should_ReturnZero_WhenGivenInvalidInput', () => {
    const onCalled = jest.fn()

    const first = gridTraveler(0, 3, 3, 3, onCalled)
    expect(first).toBe(1)
    expect(onCalled).toHaveBeenCalledTimes(0)

    onCalled.mockClear()
    const second = gridTraveler(18, 0, 18, 18, onCalled)
    expect(second).toBe(1)
    expect(onCalled).toHaveBeenCalledTimes(0)

    onCalled.mockClear()
    const third = gridTraveler(20, 0, 18, 18, onCalled)
    expect(third).toBe(0)
    expect(onCalled).toHaveBeenCalledTimes(0)

    onCalled.mockClear()
    const fourth = gridTraveler(0, 19, 18, 18, onCalled)
    expect(fourth).toBe(0)
    expect(onCalled).toHaveBeenCalledTimes(0)
  })

  it('Should_ReturnExpectedResultAndAcceptedTime_WhenGivenInput', () => {
    const first = gridTraveler(0, 0, 3, 3)
    expect(first).toBe(20)

    let step = 0
    const onCalled = jest.fn(() => step++)
    const second = gridTraveler(1, 1, 18, 18, onCalled)
    expect(second).toBe(2333606220)
    expect(step).toBeLessThan(Math.pow(2, 18))
  })

})