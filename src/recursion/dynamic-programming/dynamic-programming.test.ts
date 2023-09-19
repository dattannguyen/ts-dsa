import { fibonacciAtByBottomUp, fibonacciAtByMemo } from './dynamic-programming.practice'

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