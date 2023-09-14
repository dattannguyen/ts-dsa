import { Graph } from '../../graph/graph'
import { GraphVertex } from '../../graph/graph-vertex'

/**
 * https://leetcode.com/problems/subsets/
 */
export const subsets = (nums: number[]): number[][] => {
  const result: number[][] = []

  const recur = (i: number, acc: number[]) => {
    if (i >= nums.length) {
      result.push(acc)
      return
    }

    recur(i + 1, [...acc, nums[i]])
    recur(i + 1, [...acc])
  }

  recur(0, [])
  return result
}

export const graphColoring = (graph: Graph<string>, colors: string[]): string[] => {
  const paths: string[] = []
  const dfs = (vertex: GraphVertex<string>, color: string, trace: Map<string, string>, path: string) => {
    const adjVertices = [...vertex.adjVertices.values()]
        .filter(({ des: adjVx }) => !trace.has(adjVx.key))
        .map(({ des }) => des)

    if (adjVertices.length <= 0) {
      paths.push(path)

      return
    }

    for (let adjVx of adjVertices) {
      for (let nextColor of colors) {
        if (nextColor === color) {
          continue
        }

        path = path.concat(nextColor)
        dfs(adjVx, nextColor, trace.set(adjVx.key, color), path)

        path = path.slice(0, -1)
        trace.delete(adjVx.key)
      }
    }
  }

  graph.vertices.forEach((vertex: GraphVertex<string>) => {
    for (let color of colors) {
      dfs(vertex, color, new Map([[`${vertex.value}`, color]]), `${color}`)
    }
  })

  return paths
}