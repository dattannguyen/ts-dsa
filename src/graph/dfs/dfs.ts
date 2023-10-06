import { GraphVertex } from '../graph-vertex'
import { Graph } from '../graph'

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

export const dfsByStack = (graph: Graph, onVisited?: (vx: GraphVertex) => any): void => {
  const randomVx = graph.randomize()
  const stack: GraphVertex[] = [randomVx]
  const trace = {}

  while (stack.length > 0) {
    const vx = stack.pop()
    trace[vx.key] = 1
    onVisited?.(vx)

    vx.forEachAdjVertex(vx => {
      if (!trace[vx.key]) {
        stack.push(vx)
      }
    })
  }
}