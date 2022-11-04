import { GraphVertex } from '../graph-vertex'

export const dfs = (
  vertex: GraphVertex,
  onVisited?: (vx: GraphVertex) => any,
  onStop?: (vx: GraphVertex) => boolean
): GraphVertex | undefined => {
  const traceMap = new Map<string, number>()

  const awesomeRecursion = (vx: GraphVertex): GraphVertex | undefined => {
    onVisited?.(vx)
    traceMap.set(vx.key, 1)

    if (onStop?.(vx)) {
      return vx
    }

    for (let adjVx of vx.adjVertices.values()) {
      if (!traceMap.has(adjVx.des.key)) {
        const result = awesomeRecursion(adjVx.des)
        if (result) {
          return result
        }
      }
    }
  }

  return awesomeRecursion(vertex)
}