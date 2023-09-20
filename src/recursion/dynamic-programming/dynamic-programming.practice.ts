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

export const gridTraveler = (srcRow: number, srcCol: number, desRow: number, desCol: number, onCalled?: () => any) => {
  if (srcRow > desRow || srcCol > desCol) {
    return 0
  }

  if (srcRow === desRow || srcCol === desCol) {
    return 1
  }

  const memo = new Map()
  const recur = (row: number, col: number) => {
    if (memo.has(`${row}:${col}`)) {
      return memo.get(`${row}:${col}`)
    }

    if (row > desRow || col > desCol) {
      return 0
    }

    onCalled?.()
    if (row === desRow && col === desCol) {
      return 1
    }

    const rowNext = recur(row + 1, col)
    const colNext = recur(row, col + 1)

    const way = rowNext + colNext
    memo.set(`${row}:${col}`, way)
    return way
  }

  return recur(srcRow, srcCol)
}