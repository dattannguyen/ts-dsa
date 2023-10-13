export const fractionalKnapsack = (weight: number, objects: Array<{ name: string, weight: number, profit: number }>, onCalled?: () => any): { objects: string[], max: number } => {
  const items = []
  if (weight === 0 || objects.length === 0) {
    return { objects: items, max: 0 }
  }

  const profitByWeightAscList = objects
      .map(object => ({ ...object, profitByWeight: object.weight ? object.profit / object.weight : 0 }))
      .sort((object, next) => object.profitByWeight > next.profitByWeight ? 1 : -1)

  let remainingWeight = weight
  let maxProfit = 0
  while (remainingWeight > 0 && profitByWeightAscList.length > 0) {
    onCalled?.()

    const item = profitByWeightAscList.pop()
    maxProfit = maxProfit + (
        remainingWeight > item.weight
            ? item.profit
            : item.profitByWeight * remainingWeight
    )

    remainingWeight = remainingWeight - item.weight
    items.push(item.name)
  }

  return { objects: items, max: maxProfit }
}

export const jobSequencing = (remainingTime: number, jobs: Array<{ name: string, deadline: number, profit: number }>, onCalled?: () => any): { jobs: string[], max: number } => {
  const scheduledJobs = []
  const ascByProfit = jobs.map(job => job).sort((job, next) => job.profit > next.profit ? 1 : -1)

  let max = 0
  const jobOccupation = []
  while (ascByProfit.length > 0) {
    const job = ascByProfit.pop()
    onCalled?.()

    let deadline = job.deadline
    while (jobOccupation[deadline] && deadline > 0) {
      onCalled?.()
      deadline--
    }

    if (deadline > 0) {
      jobOccupation[deadline] = job.name
      scheduledJobs.push(job.name)
      max += job.profit
    }

  }

  return { jobs: scheduledJobs, max }
}