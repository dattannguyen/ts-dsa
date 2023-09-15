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

export const hamiltonianPath = (graph: Graph<string>): string[] => {
  const dfs = (vertex: GraphVertex<string>, trace: Map<string, string>, path: string[]): string[] => {
    const adjVertices = [...vertex.adjVertices.values()]
        .filter(({ des }) => !trace.has(des.key))
        .map(({ des }) => des)

    if (adjVertices.length === 0) {
      if (trace.size === graph.vertices.size && vertex.isConnected(path[0])) {
        return path
      }

      return
    }

    for (let adjVertex of adjVertices) {
      path.push(adjVertex.key)
      const hamiltonian = dfs(adjVertex, trace.set(adjVertex.key, adjVertex.key), path)
      if (hamiltonian) {
        return hamiltonian
      }

      path = path.slice(0, -1)
      trace.delete(adjVertex.key)
    }
  }

  const randomVertex = [...graph.vertices.values()][0]
  return dfs(randomVertex, new Map([[randomVertex.key, randomVertex.key]]), [randomVertex.key])
}

/**
 * https://leetcode.com/problems/word-search/
 */
export const wordSearch = (board: string[][], word: string): boolean => {
  const dfs = (i: number, j: number, trace: Map<string, string>, count: number): boolean => {
    const adjLetters = [
      [i, j + 1],
      [i, j - 1],
      [i + 1, j],
      [i - 1, j]
    ].filter(([row, col]) => board[row]?.[col] && board[row][col] === word[count] && !trace.has(`${row}_${col}`))

    if (adjLetters.length === 0) {
      return count >= word.length
    }

    for (let [row, col] of adjLetters) {
      const isExisted = dfs(row, col, trace.set(`${row}_${col}`, 'yes'), ++count)
      if (isExisted) {
        return true
      }

      count--
      trace.delete(`${row}_${col}`)
    }

    return false
  }

  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[i].length; j++) {
      const letter = board[i][j]
      if (letter === word[0]) {
        const isExisted = dfs(i, j, new Map<string, string>([[`${i}_${j}`, 'yes']]), 1)
        if (isExisted) {
          return true
        }
      }
    }
  }

  return false
}