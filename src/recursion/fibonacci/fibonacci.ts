export const fibonacciAt = (nth: number, onCalled?: (n: number) => any): number => {
  const memo = new Map()

  const awesomeRecursion = (nth: number) => {
    const n = memo.get(nth)
    if (n) {
      return n
    }

    onCalled(nth)
    if (nth === 0 || nth === 1) {
      return nth
    }

    const result = awesomeRecursion(nth - 1) + awesomeRecursion(nth - 2)
    memo.set(nth, result)

    return result
  }

  return awesomeRecursion(nth)
}

export const generateFibonacci = (n: number): number[] => {
  if (n === 0) {
    return []
  }

  if (n === 1) {
    return [0]
  }

  const series = [0, 1]
  for (let i = 2; i < n; i++) {
    series[i] = series[i - 1] + series[i - 2]
  }

  return series
}