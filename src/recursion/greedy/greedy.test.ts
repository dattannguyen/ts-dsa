import { randomize } from '../dynamic-programming/dynamic-programming.test'
import { fractionalKnapsack, jobSequencing } from './greedy.practice'

describe('Test fractionalKnapsack()', () => {

  it('Should_ReturnListOfObject_WhenGivenInvalidInput', () => {
    const first = fractionalKnapsack(
        15,
        [
          { name: '1', weight: 2, profit: 10 }, { name: '2', weight: 3, profit: 5 },
          { name: '3', weight: 5, profit: 15 }, { name: '4', weight: 7, profit: 7 },
          { name: '5', weight: 1, profit: 6 }, { name: '6', weight: 4, profit: 18 },
          { name: '7', weight: 3, profit: 1 },
        ]
    )
    expect(first.max).toBe(54)
    expect(first.objects.join(',')).toBe('5,1,6,3,2')

    const second = fractionalKnapsack(
        15,
        [
          { name: '1', weight: 1, profit: 5 }, { name: '2', weight: 3, profit: 10 },
          { name: '3', weight: 5, profit: 15 }, { name: '4', weight: 4, profit: 7 },
          { name: '5', weight: 1, profit: 8 }, { name: '6', weight: 3, profit: 9 }, { name: '7', weight: 2, profit: 4 },
        ]
    )

    expect(second.max).toBe(51)
    expect(second.objects.join(',')).toBe('5,1,2,3,6,7')

    let traversed = 0
    const onCalled = jest.fn(() => traversed++)

    const third = fractionalKnapsack(0, [], onCalled)
    expect(third.objects.length).toBe(0)
    expect(third.max).toBe(0)
    expect(onCalled).toHaveBeenCalledTimes(0)

    traversed = 0
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

describe('Test jobSequencing()', () => {

  it('Should_ReturnListOfObject_WhenGivenInvalidInput', () => {
    const first = jobSequencing(
        3,
        [
          { name: '1', profit: 20, deadline: 2 }, { name: '2', profit: 15, deadline: 2 },
          { name: '3', profit: 10, deadline: 1 }, { name: '4', profit: 5, deadline: 3 },
          { name: '5', profit: 1, deadline: 3 },
        ]
    )
    expect(first.max).toBe(40)
    expect(first.jobs.join(',')).toBe('1,2,4')

    const second = jobSequencing(
        6,
        [
          { name: '1', profit: 35, deadline: 3 }, { name: '6', profit: 5, deadline: 1 },
          { name: '5', profit: 15, deadline: 6 }, { name: '2', profit: 30, deadline: 4 },
          { name: '3', profit: 25, deadline: 4 }, { name: '4', profit: 20, deadline: 2 },
          { name: '6', profit: 12, deadline: 1 },
        ]
    )

    expect(second.max).toBe(125)
    expect(second.jobs.join(',')).toBe('1,2,3,4,5')

    let traversed = 0
    const onCalled = jest.fn(() => traversed++)

    traversed = 0
    const massiveObjects = []
    const size = 10000
    const randomWeight = randomize(size)
    for (let i = 0; i < size; i++) {
      massiveObjects.push({
        name: (i + 1).toString(),
        deadline: randomize(size),
        profit: randomize(size)
      })
    }

    jobSequencing(randomWeight, massiveObjects, onCalled)
    expect(traversed).toBeLessThan(size * size)
  })
})