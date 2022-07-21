/**
 * Given a sorted array A (sorted in ascending order), having N integers, find if there exists any pair of elements
 * (A[i], A[j]) such that their sum is equal to X
 */
export const twoSumAsTwoPointerTechnique = (numbers: number[], sumTarget: number): [number, number] | undefined => {
  const length = numbers.length
  if (length === 0) {
    return
  }

  for (let i = 0, j = length - 1; i < j;) {
    const sum = numbers[i] + numbers[j]
    if (sum === sumTarget) {
      return [i, j]
    } else if (sum < sumTarget) {
      i++
    } else {
      j--
    }
  }

  return
}

/**
 *
 */
export const detectCycleAsTwoPointerTechnique = () => {

}