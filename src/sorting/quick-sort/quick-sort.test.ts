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

    const third = quickSort([15, 8, 5, 12, 10, 1, 16, 9, 11, 7, 20, 3, 2, 6, 17, 18, 4, 13, 14, 19])
    expect(third.join(',')).toBe([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20].join(','))

    const fourth = quickSort([7, 3, 2, 1, 6, 5])
    expect(fourth.join(',')).toBe([1, 2, 3, 5, 6, 7].join(','))

    const fifth = quickSort([3, 8, 7, 9, 2, 6])
    expect(fifth.join(',')).toBe([2, 3, 6, 7, 8, 9].join(','))
  })
})