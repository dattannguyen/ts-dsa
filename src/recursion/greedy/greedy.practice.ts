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