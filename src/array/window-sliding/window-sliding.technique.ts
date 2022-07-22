/**
 * Given an array of integers of size ‘n’, Our aim is to calculate the maximum sum of ‘k’ consecutive elements in the
 * array. Input: arr[] = {100, 200, 300, 400}, k = 2 Output: 700
 * **/
export const findMaxSumOfAdjacentElementByWindowSliding = (numbers: number[], kElement: number): number => {
  let max = 0
  const length = numbers.length
  if (length <= 0) {
    return max
  }

  if (kElement >= length) {
    for (let number of numbers) {
      max += number
    }

    return max
  }

  for (let i = 0; i < kElement; i++) {
    max += numbers[i]
  }

  for (let j = kElement; j < length; j++) {
    const temp = max + numbers[j] - numbers[j - kElement]
    max = temp > max ? temp : max
  }

  return max
}