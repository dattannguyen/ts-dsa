import { fibonacci } from './fibonacci'

describe('Test fibonacci()', () => {

  it('Should_ReturnExpectedResultAcceptedTime_WhenGivenParam', () => {
    const onCalled = jest.fn(() => '')

    const first = fibonacci(0, onCalled)
    expect(first).toBe(0)
    expect(onCalled).toHaveBeenCalledTimes(1)

    onCalled.mockClear()
    const second = fibonacci(1, onCalled)
    expect(second).toBe(1)
    expect(onCalled).toHaveBeenCalledTimes(1)

    onCalled.mockClear()
    fibonacci(1000, onCalled)
    expect(onCalled).toHaveBeenCalledTimes(1002)
  })

})