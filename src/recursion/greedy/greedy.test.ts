import { randomize } from '../dynamic-programming/dynamic-programming.test'
import { fractionalKnapsack } from './greedy.practice'

describe('Test fractionalKnapsack()', () => {

  it('Should_ReturnListOfObject_WhenGivenInvalidInput', () => {
    const first = fractionalKnapsack(
        15,
        [
          { name: '1', weight: 2, profit: 10 }, { name: '2', weight: 3, profit: 5 }, {
          name: '3',
          weight: 5,
          profit: 15
        },
          { name: '4', weight: 7, profit: 7 }, { name: '5', weight: 1, profit: 6 }, {
          name: '6',
          weight: 4,
          profit: 18
        },
          { name: '7', weight: 3, profit: 1 },
        ]
    )
    expect(first.max).toBe(54)
    expect(first.objects.join(',')).toBe('5,1,6,3,2')

    const second = fractionalKnapsack(
        15,
        [
          { name: '1', weight: 1, profit: 5 }, { name: '2', weight: 3, profit: 10 }, {
          name: '3',
          weight: 5,
          profit: 15
        },
          { name: '4', weight: 4, profit: 7 }, { name: '5', weight: 1, profit: 8 }, { name: '6', weight: 3, profit: 9 },
          { name: '7', weight: 2, profit: 4 },
        ]
    )

    expect(second.max).toBe(51)
    expect(second.objects.join(',')).toBe('5,1,2,3,6,7')

    let traversed = 0
    const onCalled = jest.fn(() => traversed++)

    const massiveObjects = []
    const size = 10000
    const randomWeight = randomize(size)
    for (let i = 0; i < size; i++) {
      massiveObjects.push({
        name: (i + 1).toString(),
        weight: randomize(size),
        profit: randomize(size)
      })
    }

    fractionalKnapsack(randomWeight, massiveObjects, onCalled)
    expect(traversed).toBeLessThan(size)
  })
})