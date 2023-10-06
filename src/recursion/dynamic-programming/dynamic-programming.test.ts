import {
  bestSum,
  bestSumByBottomUp,
  coinChange,
  coinChangeByBottomUp,
  fibonacciAtByBottomUp,
  fibonacciAtByMemo,
  gridTraveler,
  houseRobber,
  houseRobberII,
  howSum,
  howSumByBottomUp,
  knapsack,
  stairCase
} from './dynamic-programming.practice'

const randomize = (size: number = 100) => Math.floor(Math.random() * (size - 1) + 1)

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

describe('Test howSum()', () => {

  it('Should_ReturnEmpty_WhenGivenInvalidInput', () => {
    let first = howSum(7, [2, 4])
    expect(first.length).toBe(0)

    first = howSumByBottomUp(7, [2, 4])
    expect(first.length).toBe(0)

    let second = howSum(112, [])
    expect(second.length).toBe(0)

    second = howSumByBottomUp(112, [])
    expect(second.length).toBe(0)

    let traversed = 0
    const onCalled = jest.fn(() => traversed++)

    let third = howSum(300, [7, 14], onCalled)
    expect(third.length).toBe(0)
    expect(traversed).toBeLessThan(Math.pow(2, 300))

    traversed = 0
    third = howSumByBottomUp(300, [7, 14], onCalled)
    expect(third.length).toBe(0)
    expect(traversed).toBeLessThan(Math.pow(2, 300))
  })

  it('Should_ReturnListOfNumber_WhenGivenInvalidInput', () => {
    const firstTest = result => {
      expect(result.length).toBe(3)
      expect(result.sort((a, b) => a >= b ? 1 : -1).join(',')).toBe('2,2,3')
    }

    let first = howSum(7, [2, 3])
    firstTest(first)

    first = howSumByBottomUp(7, [2, 3])
    firstTest(first)


    const secondTest = (result) => {
      expect(result.length).toBe(2)
      expect(result.sort((a, b) => a >= b ? 1 : -1).join(',')).toBe('3,4')
    }

    let second = howSum(7, [5, 3, 4, 8])
    secondTest(second)

    second = howSumByBottomUp(7, [5, 3, 4, 8])
    secondTest(second)


    const thirdTest = (result) => {
      expect(result.length).toBe(4)
      expect(result.sort((a, b) => a >= b ? 1 : -1).join(',')).toBe('2,2,2,2')
    }

    let third = howSum(8, [2, 5, 7])
    thirdTest(third)

    third = howSumByBottomUp(8, [2, 5, 7])
    thirdTest(third)

    let traversed = 0
    const onCalled = jest.fn(() => traversed++)

    const massiveNums = []
    const size = 5000
    const randomTarget = randomize(size)
    for (let i = 0; i < size; i++) {
      massiveNums.push(randomize(size))
    }

    howSum(randomTarget, massiveNums, onCalled)
    expect(traversed).toBeLessThan(Math.pow(massiveNums.length, randomTarget))

    traversed = 0
    howSumByBottomUp(randomTarget, massiveNums, onCalled)
    expect(traversed).toBeLessThan(Math.pow(massiveNums.length, randomTarget))
  })
})

describe('Test bestSum()', () => {

  it('Should_ReturnEmpty_WhenGivenInvalidInput', () => {
    let first = bestSum(7, [2, 4])
    expect(first.length).toBe(0)

    first = bestSumByBottomUp(7, [2, 4])
    expect(first.length).toBe(0)

    let second = bestSum(112, [])
    expect(second.length).toBe(0)

    second = howSumByBottomUp(112, [])
    expect(second.length).toBe(0)

    let traversed = 0
    const onCalled = jest.fn(() => traversed++)

    let third = bestSum(300, [7, 14], onCalled)
    expect(third.length).toBe(0)
    expect(traversed).toBeLessThan(Math.pow(2, 300))

    traversed = 0
    third = bestSumByBottomUp(300, [7, 14], onCalled)
    expect(third.length).toBe(0)
    expect(traversed).toBeLessThan(Math.pow(2, 300))
  })

  it('Should_ReturnListOfNumber_WhenGivenInvalidInput', () => {
    const firstTest = result => {
      expect(result.length).toBe(4)
      expect(result.sort((a, b) => a >= b ? 1 : -1).join(',')).toBe('25,25,25,25')
    }

    let first = bestSum(100, [1, 2, 5, 25])
    firstTest(first)

    first = bestSumByBottomUp(100, [1, 2, 5, 25])
    firstTest(first)


    const secondTest = (result) => {
      expect(result.length).toBe(1)
      expect(result.join(',')).toBe('7')
    }

    let second = bestSum(7, [5, 3, 4, 7])
    secondTest(second)

    second = bestSumByBottomUp(7, [5, 3, 4, 7])
    secondTest(second)


    const thirdTest = (result) => {
      expect(result.length).toBe(2)
      expect(result.sort((a, b) => a >= b ? 1 : -1).join(',')).toBe('3,5')
    }

    let third = bestSum(8, [2, 5, 3])
    thirdTest(third)

    third = bestSumByBottomUp(8, [2, 5, 3])
    thirdTest(third)

    let traversed = 0
    const onCalled = jest.fn(() => traversed++)

    const massiveNums = []
    const size = 1000
    const randomTarget = randomize(size)
    for (let i = 0; i < size; i++) {
      massiveNums.push(randomize(size))
    }

    bestSum(randomTarget, massiveNums, onCalled)
    expect(traversed).toBeLessThan(Math.pow(massiveNums.length, randomTarget))

    traversed = 0
    bestSumByBottomUp(randomTarget, massiveNums, onCalled)
    expect(traversed).toBeLessThan(Math.pow(massiveNums.length, randomTarget))
  })
})

describe('Test knapsack()', () => {

  it('Should_ReturnListOfObject_WhenGivenInvalidInput', () => {
    const first = knapsack(
        8,
        [
          { name: 'B', weight: 3, profit: 2 }, { name: 'A', weight: 2, profit: 1 },
          { name: 'D', weight: 5, profit: 6 }, { name: 'C', weight: 4, profit: 5 }
        ]
    )
    expect(first.max).toBe(8)
    expect(first.objects.join(',')).toBe('B,D')

    const second = knapsack(
        8,
        [
          { name: 'A', weight: 3, profit: 2 }, { name: 'B', weight: 4, profit: 3 },
          { name: 'C', weight: 6, profit: 1 }, { name: 'D', weight: 5, profit: 4 }
        ]
    )

    expect(second.max).toBe(6)
    expect(second.objects.join(',')).toBe('A,D')

    let traversed = 0
    const onCalled = jest.fn(() => traversed++)

    const massiveObjects = []
    const size = 1000
    const randomWeight = randomize(size)
    for (let i = 0; i < size; i++) {
      massiveObjects.push({
        name: (i + 1).toString(),
        weight: randomize(size),
        profit: randomize(size)
      })
    }

    knapsack(randomWeight, massiveObjects, onCalled)
    expect(traversed).toBeLessThan(Math.pow(2, size))
  })
})

describe('Test stairCase()', () => {

  it('Should_ReturnExpectedNumberOfWay_WhenGivenTotalStep', () => {
    let step = 0
    const onCalled = jest.fn(() => step++)

    const oneStepStairCase = stairCase(1, onCalled)
    expect(oneStepStairCase).toBe(1)
    expect(step).toBe(0)

    const twoStepStairCase = stairCase(2, onCalled)
    expect(twoStepStairCase).toBe(2)
    expect(step).toBe(0)

    step = 0
    const threeStepStairCase = stairCase(3)
    expect(threeStepStairCase).toBe(3)
    expect(step).toBeLessThan(Math.pow(2, 3))

    step = 0
    const fourStepStairCase = stairCase(4)
    expect(fourStepStairCase).toBe(5)
    expect(step).toBeLessThan(Math.pow(2, 4))
  })

})

describe('Test houseRobber()', () => {

  it('Should_ReturnMaxRobbedMoney_WhenGivenListOfHouse', () => {
    let traversed = 0
    const onCalled = jest.fn(() => traversed++)

    const first = houseRobber([1, 2, 3, 1], onCalled)
    expect(first).toBe(4)

    traversed = 0
    const second = houseRobber([2, 7, 9, 3, 1])
    expect(second).toBe(12)

    traversed = 0
    const third = houseRobber([1, 2, 3, 4, 5, 6, 7, 100, 1], onCalled)
    expect(third).toBe(112)
    expect(traversed).toBeLessThan(Math.pow(8, 8))

    const fourth = houseRobber([1, 2])
    expect(fourth).toBe(2)

    traversed = 0
    const massiveNums = []
    const size = 1000
    for (let i = 0; i < size; i++) {
      massiveNums.push(randomize(size))
    }

    houseRobber(massiveNums, onCalled)
    expect(traversed).toBeLessThan(Math.pow(massiveNums.length, massiveNums.length))
  })

  it('Should_ReturnMaxRobbedMoney_WhenGivenListOfHouseInCircle', () => {
    let traversed = 0
    const onCalled = jest.fn(() => traversed++)

    const top = houseRobberII([200, 3, 140, 20, 10])
    expect(top).toBe(340)

    const first = houseRobberII([2, 3, 2], onCalled)
    expect(first).toBe(3)

    traversed = 0
    const second = houseRobberII([2, 7, 9, 3, 1])
    expect(second).toBe(11)

    traversed = 0
    const third = houseRobberII([1, 2, 100], onCalled)
    expect(third).toBe(100)

    const fourth = houseRobberII([1, 2])
    expect(fourth).toBe(2)

    const fifth = houseRobberII([1, 2, 3, 1])
    expect(fifth).toBe(4)

    const sixth = houseRobberII([1, 2, 1, 1])
    expect(sixth).toBe(3)

    const seventh = houseRobberII([1, 2, 3, 4, 5, 1, 2, 3, 4, 5])
    expect(seventh).toBe(16)

    traversed = 0
    const massiveNums = []
    const size = 1000
    for (let i = 0; i < size; i++) {
      massiveNums.push(randomize(size))
    }

    houseRobberII(massiveNums, onCalled)
    expect(traversed).toBeLessThan(Math.pow(massiveNums.length, massiveNums.length))
  })

})

describe('Test coinChange()', () => {

  const runTests = (
      func: (target: number, coins: number[], onCalled?: () => any) => number[],
      testSize: number = 1000,
  ) => {
    const first = func(0, [1])
    expect(first.join(',')).toBe('0')

    const second = func(3, [])
    expect(second).toBeFalsy()

    const third = func(11, [1, 2, 5])
    expect(third.length).toBe(3)
    expect(third.sort((a, b) => a > b ? 1 : -1).join(',')).toBe('1,5,5')

    const fourth = func(20, [3, 21, 22])
    expect(fourth.length).toBe(0)

    let traversed = 0
    const onCalled = jest.fn(() => traversed++)
    const massiveNums = []
    const size = testSize
    const randomTarget = randomize(size)
    for (let i = 0; i < size; i++) {
      massiveNums.push(randomize(size))
    }

    func(randomTarget, massiveNums, onCalled)
    expect(traversed).toBeLessThan(Math.pow(massiveNums.length, randomTarget))
  }

  it('Should_ReturnListOfFewestCoin_WhenGivenListOfCoin&TargetAmount', () => {
    runTests(coinChange, 100)
    runTests(coinChangeByBottomUp)
  })

})
