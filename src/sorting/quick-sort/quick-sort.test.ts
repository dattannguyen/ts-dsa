import { quickSort } from './quick-sort'

describe('Test quickSort()', () => {
  it('Should_ReturnOrderedArrayInTimeManner_WhenGiven', () => {
    const onTraverse = jest.fn()

    const first = quickSort([0, 5, 2, 1, 6, 3], onTraverse)
    expect(first.join(',')).toBe('0,1,2,3,5,6')
    expect(onTraverse.mock.calls.length).toBeLessThanOrEqual(first.length * first.length)

    onTraverse.mockClear()
    const secondNumbers = [9, 8, 7, 6, 5, 4, 3, 2, 1]
    const second = quickSort([...secondNumbers], onTraverse)
    expect(second.join(',')).toBe(secondNumbers.reverse().join(','))
    expect(onTraverse.mock.calls.length).toBeLessThanOrEqual(second.length * second.length)
  })
})