export const fibonacci = (nth: number, onCalled?: (n: number) => any): number => {
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