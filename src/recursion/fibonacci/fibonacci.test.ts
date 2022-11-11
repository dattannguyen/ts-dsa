import { fibonacciAt, generateFibonacci } from './fibonacci'

describe('Test fibonacci()', () => {

  it('Should_ReturnExpectedResultAcceptedTime_WhenGivenPositionOfFibonacciSeries', () => {
    const onCalled = jest.fn()

    const first = fibonacciAt(0, onCalled)
    expect(first).toBe(0)
    expect(onCalled).toHaveBeenCalledTimes(1)

    onCalled.mockClear()
    const second = fibonacciAt(1, onCalled)
    expect(second).toBe(1)
    expect(onCalled).toHaveBeenCalledTimes(1)

    onCalled.mockClear()
    fibonacciAt(1000, onCalled)
    expect(onCalled).toHaveBeenCalledTimes(1002)
  })

  it('Should_GenerateFibonacciSeriesInAcceptedTime_WhenGivenSizeOfSeries', () => {
    const firstSeries = generateFibonacci(0)
    expect(firstSeries.length).toBe(0)

    const secondSeries = generateFibonacci(5)
    expect(secondSeries.length).toBe(5)
    expect(secondSeries.includes(0)).toBeTruthy()
    expect(secondSeries[secondSeries.length - 1]).toBe(3)

    const thirdSeries = generateFibonacci(9)
    expect(thirdSeries.length).toBe(9)
    expect(thirdSeries[thirdSeries.length - 1]).toBe(21)
  })

})