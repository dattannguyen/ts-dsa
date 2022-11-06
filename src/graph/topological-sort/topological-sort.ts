import { Graph } from '../graph'
import { GraphVertex } from '../graph-vertex'

export const topologicalSortByDfs = (directedGraph: Graph, onVisited?: (vx: GraphVertex) => any): GraphVertex[] => {
  const stackedVertices: GraphVertex[] = []
  const unvisitedMap = new Map([...directedGraph.vertices.entries()])

  const dfs = (vx: GraphVertex) => {
    unvisitedMap.delete(vx.key)
    onVisited?.(vx)

    vx.forEachAdjVertex(adjVx => {
      if (unvisitedMap.has(adjVx.key)) {
        dfs(adjVx)
      }
    })

    stackedVertices.unshift(vx)
  }

  while (unvisitedMap.size > 0 && unvisitedMap.values().next()) {
    dfs(unvisitedMap.values().next().value)
  }

  return stackedVertices
}

export const topologicalSortByKahnAlg = (directedGraph: Graph, onVisited?: (vx: GraphVertex) => any): GraphVertex[] => {
  const stackedVertices: GraphVertex[] = []
  const visitedMap = new Map()
  const noIncomingVertices = new Map([...directedGraph.vertices.entries()])

  for (let edge of directedGraph.edges.values()) {
    noIncomingVertices.delete(edge.to.key)
  }

  const queue = []
  for (let noIncomingVx of noIncomingVertices.values()) {
    queue.push(noIncomingVx)
    visitedMap.set(noIncomingVx.key, 1)
  }

  while (queue.length > 0) {
    const nextVx = queue.shift()
    onVisited?.(nextVx)

    nextVx.forEachAdjVertex(adjVx => {
      if (!visitedMap.has(adjVx.key)) {
        queue.push(adjVx)
        visitedMap.set(adjVx.key, 1)
      }
    })

    stackedVertices.push(nextVx)
  }

  return stackedVertices
}