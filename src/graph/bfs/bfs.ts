import { GraphVertex } from '../graph-vertex'
import { Queue } from '../../queue/queue'

export const bfs = (
  vertex: GraphVertex,
  onVisited?: (vx: GraphVertex) => any,
  onStop?: (vx: GraphVertex) => boolean
): GraphVertex | undefined => {
  const traceMap = new Map<string, number>([[vertex.key, 1]])
  const queue = new Queue<GraphVertex>()
  queue.enqueue(vertex)

  while (queue.first()) {
    const vx = queue.dequeue()
    onVisited?.(vx)

    if (onStop?.(vx)) {
      return vx
    }

    vx.forEachAdjVertex(adjVx => {
      if (!traceMap.has(adjVx.key)) {
        queue.enqueue(adjVx)
        traceMap.set(adjVx.key, 1)
      }
    })
  }

  return
}