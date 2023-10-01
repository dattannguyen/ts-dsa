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

export const howSum = (target: number, nums: number[], onCalled?: () => any): number[] => {
  if (nums.length <= 0) {
    return []
  }

  const memo = {}
  const recur = (i: number, sum: number, acc: number[]): [number, number[]] => {
    if (memo[sum] !== undefined) {
      return memo[sum]
    }

    onCalled?.()
    if (sum >= target) {
      return [sum, acc]
    }

    for (let j = 0; j < nums.length; j++) {
      let [recursiveSum, recursiveAcc] = recur(j, sum + nums[j], acc.concat(nums[j]))
      if (recursiveSum === target) {
        return [recursiveSum, recursiveAcc]
      }

      memo[recursiveSum] = [recursiveSum, recursiveAcc]
    }

    return [sum, acc]
  }

  for (let i = 0; i < nums.length; i++) {
    const [sum, acc] = recur(i, nums[i], [nums[i]])
    if (sum === target) {
      return acc
    }
  }

  return []
}

export const howSumByBottomUp = (target: number, nums: number[], onCalled?: () => any): number[] => {
  if (nums.length <= 0) {
    return []
  }

  const memo = {}
  const table = [true]
  for (let i = 0; i <= target; i++) {
    if (table[i] === undefined) {
      continue
    }

    for (let num of nums) {
      const sum = i + num
      if (memo[sum] !== undefined) {
        continue
      }

      onCalled?.()
      if (sum === target) {
        return [...(memo[i] || []), num]
      }

      table[sum] = true
      memo[sum] = [...(memo[i] || []), num]
    }
  }

  return []
}

/**
 * https://leetcode.com/problems/climbing-stairs/
 */
export const stairCase = (top: number, onCalled?: () => any): number => {
  if (top <= 2) {
    return top
  }

  const memo = new Map()
  const recur = (num: number): number => {
    if (memo.has(num)) {
      return memo.get(num)
    }

    if (num > top) {
      return 0
    }

    onCalled?.()
    if (num === top) {
      return 1
    }

    const oneStep = recur(num + 1)
    const twoStep = recur(num + 2)

    const totalWay = oneStep + twoStep
    memo.set(num, totalWay)
    return totalWay
  }

  return recur(0)
}

/**
 * https://leetcode.com/problems/house-robber/
 */
export const houseRobber = (nums: number[], onCalled?: () => any): number => {
  if (nums.length <= 2) {
    return Math.max(...nums)
  }

  const memo = {}
  const recur = (i: number): number => {
    if (memo[i] !== undefined) {
      return memo[i]
    }

    onCalled?.()
    if (i === nums.length - 1) {
      return nums[i]
    }

    let maxAtI = nums[i]
    for (let j = i + 2; j < nums.length; j++) {
      const maxOfChildren = memo[j] || recur(j)
      memo[j] = maxOfChildren

      maxAtI = Math.max(nums[i] + maxOfChildren, maxAtI)
    }

    memo[i] = maxAtI
    return maxAtI
  }

  return Math.max(recur(0), recur(1))
}

/**
 * https://leetcode.com/problems/house-robber-ii/description/
 */
export const houseRobberII = (nums: number[], onCalled?: () => any): number => {
  if (nums.length <= 2) {
    return Math.max(...nums)
  }

  const rob = (start: number, end: number): number => {
    const memo = {}
    const recur = (i: number): number => {
      if (memo[i] !== undefined) {
        return memo[i]
      }

      onCalled?.()
      if (i >= end) {
        return nums[i]
      }

      let max = nums[i]
      for (let j = i + 2; j <= end; j++) {
        let maxOfChildren
        if (memo[j] !== undefined) {
          maxOfChildren = memo[j]
        } else {
          maxOfChildren = recur(j)
          memo[j] = maxOfChildren
        }

        max = Math.max(max, nums[i] + maxOfChildren)
      }

      memo[i] = max
      return max
    }

    const first = recur(start)
    const second = recur(start + 1)

    return Math.max(first, second)
  }

  const robbedFirst = rob(0, nums.length - 2)
  const robbedSecond = rob(1, nums.length - 1)

  return Math.max(robbedFirst, robbedSecond)
}