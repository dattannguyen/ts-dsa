import { GraphVertex } from '../graph-vertex'

export const dijkstra = (
    src: GraphVertex,
    des: GraphVertex,
    weightComparator?: (currentWeight: number, nextWeight: number) => boolean
): { weight: number, path: GraphVertex[] } | undefined => {
  weightComparator = weightComparator || ((currentWeight, nextWeight) => currentWeight >= nextWeight)
  const traceMap = new Map<string, number>([[src.key, 1]])
  const minWeightByDes = new Map<string, number>()
  const desByStopover = new Map<string, GraphVertex>()

  const queue = [src]
  while (queue.length > 0) {
    const current = queue.pop()
    traceMap.set(current.key, 1)

    for (let adjVx of current.adjVertices.values()) {
      if (!traceMap.has(adjVx.des.key)) {
        const weightFromSrcToAdj = minWeightByDes.get(adjVx.des.key)
        const weightFromSrcToCurrent = minWeightByDes.get(current.key) || 0

        if (!weightFromSrcToAdj || weightComparator(weightFromSrcToAdj, weightFromSrcToCurrent + adjVx.edge.weight)) {
          minWeightByDes.set(adjVx.des.key, weightFromSrcToCurrent + adjVx.edge.weight)
          desByStopover.set(adjVx.des.key, current)
        }

        queue.unshift(adjVx.des)
      }
    }
  }

  if (!desByStopover.has(des.key)) {
    return
  }

  const weight = minWeightByDes.get(des.key)
  const path = [des]

  let currentVx = des
  while (currentVx.key !== src.key) {
    const nextStop = desByStopover.get(currentVx.key)
    path.unshift(nextStop)

    currentVx = nextStop
  }

  return { weight, path }
}