import { Graph } from '../graph'
import { GraphVertex } from '../graph-vertex'

export const topologicalSortByDfs = (directedGraph: Graph, onVisited?: (vx: GraphVertex) => any): GraphVertex[] => {
  const stackedVertices: GraphVertex[] = []
  const unvisitedMap = directedGraph.vertices

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

  return stackedVertices
}