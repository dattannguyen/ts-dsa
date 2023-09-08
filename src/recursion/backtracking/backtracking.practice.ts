/**
 * https://leetcode.com/problems/subsets/
 */
export const subsets = (nums: number[]): number[][] => {
  const result: number[][] = []

  const recur = (i: number, acc: number[]) => {
    if (i >= nums.length) {
      result.push(acc)
      return
    }

    recur(i + 1, [...acc, nums[i]])
    recur(i + 1, [...acc])
  }

  recur(0, [])
  return result
}