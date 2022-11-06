export const factorialByTopDown = (num: number): number => {
  if (num === 0 || num === 1) {
    return num
  }

  return num * factorialByTopDown(num - 1)
}

export const factorialByBottomUp = (num: number, index = 1, accumulator: number = 1): number => {
  if (num === 0) {
    return 0
  }

  if (index > num) {
    return accumulator
  }

  return factorialByBottomUp(num, index + 1, accumulator * index)
}
