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

  const table = [[]]
  for (let i = 0; i <= target; i++) {
    if (table[i] === undefined) {
      continue
    }

    for (let num of nums) {
      const sum = i + num
      if (table[sum] !== undefined) {
        continue
      }

      onCalled?.()
      if (sum === target) {
        return [...(table[i] || []), num]
      }

      table[sum] = [...(table[i] || []), num]
    }
  }

  return []
}

export const bestSum = (target: number, nums: number[], onCalled?: () => any): number[] => {
  if (nums.length <= 0) {
    return []
  }

  const memo = {}
  const recur = (i: number, sum: number, acc: number[]) => {
    onCalled?.()

    memo[sum] = acc
    for (let j = 0; j < nums.length; j++) {
      const nextSum = sum + nums[j]
      const nextAcc = acc.concat(nums[j])

      if (nextSum > target || (memo[nextSum] && memo[nextSum].length <= nextAcc.length)) {
        continue
      }

      if (nextSum === target) {
        memo[nextSum] = memo[nextSum]
            ? (nextAcc.length < memo[nextSum].length ? nextAcc : memo[nextSum])
            : nextAcc

        continue
      }

      recur(j, nextSum, nextAcc)
    }
  }

  for (let i = 0; i < nums.length; i++) {
    recur(i, nums[i], [nums[i]])
  }

  return memo[target] || []
}

export const bestSumByBottomUp = (target: number, nums: number[], onCalled?: () => any): number[] => {
  if (nums.length <= 0) {
    return []
  }

  const table = [[]]
  for (let i = 0; i <= target; i++) {
    if (!table[i]) {
      continue
    }

    onCalled?.()
    for (let num of nums) {
      const sum = i + num
      if (!table[sum]) {
        table[sum] = [...(table[i] || []), num]
        continue
      }

      const acc = [...table[i], num]
      if (acc.length < table[sum].length) {
        table[sum] = acc
      }
    }
  }

  return table[target] || []
}

export const allConstruct = (target: string, words: string[], onCalled?: () => any): string[] => {
  if (target.length === 0 || words.length === 0) {
    return []
  }

  const memo = {}
  const recur = (nextTarget: string): string[] => {
    if (memo[nextTarget]) {
      return memo[nextTarget]
    }

    return loop(nextTarget)
  }

  const loop = (nextTarget: string): string[] => {
    const ways = []
    for (let word of words) {
      onCalled?.()
      if (nextTarget.startsWith(word)) {
        const subTarget = nextTarget.substring(word.length)
        if (subTarget.length === 0) {
          ways.push([word])
        } else {
          const recursiveResults = recur(subTarget)
          ways.push(...recursiveResults.map(result => word.concat('-', result)))
        }
      }
    }

    memo[nextTarget] = [...(memo[nextTarget] || []), ...ways]
    return ways
  }

  return loop(target)
}

export const allConstructByBottomUp = (target: string, words: string[], onCalled?: () => any): string[] => {
  if (target.length === 0 || words.length === 0) {
    return []
  }

  target = ` ${target.trim()}`
  const table: string[][] = [[]]
  for (let i = 0; i < target.length; i++) {
    onCalled?.()
    const components = table[i]
    if (!components) {
      continue
    }

    for (let word of words) {
      onCalled?.()

      const letterIndex = i + 1
      if (target.startsWith(word, letterIndex)) {
        const nextComponents = components.length === 0
            ? [word]
            : components.map(component => component.concat('-', word))

        if (!table[word.length - 1 + letterIndex]) {
          table[word.length - 1 + letterIndex] = nextComponents
        } else {
          table[word.length - 1 + letterIndex].push(...nextComponents)
        }
      }
    }
  }

  return table[target.length - 1] || []
}

export const zeroOneKnapsack = (weight: number, objects: Array<{ name: string, weight: number, profit: number }>, onCalled?: () => any): { objects: string[], max: number } => {
  objects.unshift({ name: '0s', weight: 0, profit: 0 })

  const matrix: number[][] = []
  for (let i = 0; i < objects.length; i++) {
    if (!matrix[i]) {
      matrix[i] = []
    }

    let object = objects[i]
    for (let j = 0; j <= weight; j++) {
      onCalled?.()
      if (i === 0 || j === 0) {
        matrix[i][j] = 0
        continue
      }

      const profitExcludeCurrent = matrix[i - 1][j]
      if (object.weight > j) {
        matrix[i][j] = profitExcludeCurrent
        continue
      }

      const profitIncludeCurrent = object.profit
      const profitOfRemainingAfterExcludeCurrentWeight = matrix[i - 1][j - object.weight]
      matrix[i][j] = Math.max(profitExcludeCurrent, profitIncludeCurrent + profitOfRemainingAfterExcludeCurrentWeight)
    }
  }

  const result = []
  let i = objects.length - 1
  let j = weight
  while (i > 0) {
    const profit = matrix[i][j]

    if (profit !== matrix[i - 1][j]) {
      result.unshift(objects[i].name)
      j = j - objects[i].weight
    }

    i--
  }

  return { objects: result, max: matrix[objects.length - 1][weight] }
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

/**
 * https://leetcode.com/problems/coin-change/
 */
export const coinChange = (target: number, coins: number[], onCalled?: () => any): number[] => {
  if (target === 0) {
    return [0]
  }

  if (coins.length <= 0) {
    return
  }

  const memo = {}
  const recur = (coin: number, sum: number, acc: number[]) => {
    if (memo[sum] && memo[sum].length < acc.length) {
      return memo[coin]
    }

    onCalled?.()
    if (sum >= target) {
      if (sum === target) {
        memo[sum] = acc
      }

      return
    }

    memo[sum] = acc
    for (let nextCoin of coins) {
      recur(nextCoin, sum + nextCoin, acc.concat(nextCoin))
    }

  }

  for (let coin of coins) {
    recur(coin, coin, [coin])
  }

  return memo[target] || []
}

/**
 * https://leetcode.com/problems/coin-change/
 */
export const coinChangeByBottomUp = (target: number, coins: number[], onCalled?: () => any): number[] => {
  if (target === 0) {
    return [0]
  }

  if (coins.length <= 0) {
    return
  }

  const table = [[]]
  for (let amount = 0; amount <= target; amount++) {
    const components = table[amount]
    if (!components) {
      continue
    }

    for (let coin of coins) {
      const nextSum = amount + coin
      const nextComponents = components.concat(coin)

      onCalled?.()
      if (!table[nextSum]) {
        table[nextSum] = nextComponents
      }

      if (table[nextSum].length > nextComponents.length) {
        table[nextSum] = nextComponents
      }
    }
  }

  return table[target] || []
}
