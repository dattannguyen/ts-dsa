import { GraphVertex } from '../graph-vertex'

export const bfs = (
  vertex: GraphVertex,
  onVisited?: (vx: GraphVertex) => any,
  onStop?: (vx: GraphVertex) => boolean
): GraphVertex | undefined => {
  const traceMap = new Map<string, number>([[vertex.key, 1]])
  const queue = [vertex]

  while (queue.length > 0) {
    const vx = queue.pop()
    onVisited?.(vx)

    if (onStop?.(vx)) {
      return vx
    }

    vx.forEachAdjVertex(adjVx => {
      if (!traceMap.has(adjVx.key)) {
        queue.unshift(adjVx)
        traceMap.set(adjVx.key, 1)
      }
    })
  }

  return
}