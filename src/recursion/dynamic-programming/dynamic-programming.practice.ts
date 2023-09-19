export const fibonacciAtByMemo = (nth: number, onCalled?: () => any) => {
  const memo = new Map()
  const recur = (nth: number) => {
    if (memo.has(nth)) {
      return memo.get(nth)
    }

    onCalled?.()
    if (nth <= 1) {
      return nth
    }

    const value = recur(nth - 1) + recur(nth - 2)
    memo.set(nth, value)

    return value
  }

  return recur(nth)
}

export const fibonacciAtByBottomUp = (nth: number, onCalled?: () => any): number => {
  if (nth <= 1) {
    return nth
  }

  const fibonacci = [0, 1]
  for (let i = 2; i < nth; i++) {
    fibonacci[i] = fibonacci[i - 1] + fibonacci[i - 2]
    onCalled?.()
  }

  return fibonacci[nth - 1]
}