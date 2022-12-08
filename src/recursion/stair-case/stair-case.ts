/**
 * Leetcode Question: https://leetcode.com/problems/climbing-stairs/
 */
export const stairCase = (totalStep: number, maxStepAtATime = 2): number => {
  const memo = new Map()
  const awesomeRecursion = (currentStep: number) => {
    if (currentStep >= totalStep) {
      return currentStep === totalStep
        ? 1
        : 0
    }

    let totalWays = 0
    for (let step = 1; step <= maxStepAtATime; step++) {
      const wayOfStep = memo.get(currentStep + step) || awesomeRecursion(currentStep + step)
      totalWays += wayOfStep

      memo.set(currentStep + step, wayOfStep)
    }

    return totalWays
  }

  return awesomeRecursion(0)
}
