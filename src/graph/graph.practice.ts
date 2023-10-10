export type GraphAsHash = Record<string, Array<{ name: string }>>

export const hasPath = (graph: GraphAsHash, src: string, des: string): string[] => {
  if (!graph[src] || !graph[des] || src === des) {
    return []
  }

  const trace = {}
  const dfs = (vx: string, acc: string[]): string[] => {
    if (vx === des) {
      return acc
    }

    trace[vx] = 1
    for (let adjVx of (graph[vx] || [])) {
      if (!trace[adjVx.name]) {
        const path = dfs(adjVx.name, acc.concat(adjVx.name))
        if (path.length > 0) {
          return path
        }
      }
    }

    return []
  }

  return dfs(src, [src])
}

export const longestPath = (graph: GraphAsHash): string[] => {
  let longestPath = []
  if (Object.keys(graph).length === 0) {
    return longestPath
  }

  const trace = {}
  const dfs = (vx: string, path: string[]): string[] => {
    trace[vx] = 1

    for (let adjVx of graph[vx]) {
      if (!trace[adjVx.name]) {
        path.push(...dfs(adjVx.name, [adjVx.name]))
      }
    }

    return path
  }

  for (let vx of Object.keys(graph)) {
    if (!trace[vx]) {
      const path = dfs(vx, [vx])
      longestPath = path.length >= longestPath.length ? path : longestPath
    }
  }

  return longestPath
}

export const countIsland = (matrix: string[][], onCalled?: () => any): number => {
  if (matrix.length === 0) {
    return 0
  }

  const trace = {}
  const dfs = (row: number, col: number) => {
    if (trace[`${row}_${col}`] || matrix[row]?.[col] === undefined) {
      return 0
    }

    onCalled?.()
    if (matrix[row][col] === 'W') {
      trace[`${row}_${col}`] = 1
      return 0
    }

    trace[`${row}_${col}`] = 1
    const adjVx = [
      [row + 1, col],
      [row, col + 1],
      [row - 1, col],
      [row, col - 1]
    ]

    for (let [adjRow, adjCol] of adjVx) {
      dfs(adjRow, adjCol)
    }

    return 1
  }

  let count = 0
  for (let row = 0; row < matrix.length; row++) {
    for (let col = 0; col < matrix.length; col++) {
      const islandCount = dfs(row, col)
      count += islandCount
    }
  }

  return count
}

export const minIsland = (matrix: string[][], onCalled?: () => any): string[] => {
  if (matrix.length === 0) {
    return []
  }

  const trace = {}
  const dfs = (row: number, col: number, island: string[]): string[] | undefined => {
    if (trace[`${row}_${col}`] || !matrix[row]?.[col]) {
      return
    }

    onCalled?.()
    if (matrix[row][col] === 'W') {
      trace[`${row}_${col}`] = 1
      return
    }

    island.push(`${row}_${col}`)
    trace[`${row}_${col}`] = 1
    const adjVx = [
      [row + 1, col],
      [row, col + 1],
      [row - 1, col],
      [row, col - 1]
    ]

    for (let [adjRow, adjCol] of adjVx) {
      island.push(...(dfs(adjRow, adjCol, []) || []))
    }

    return island
  }

  let minIsland
  for (let row = 0; row < matrix.length; row++) {
    for (let col = 0; col < matrix.length; col++) {
      const island = dfs(row, col, [])
      if (island) {
        minIsland = !minIsland
            ? island
            : minIsland.length < island.length ? minIsland : island
      }
    }
  }

  return minIsland
}