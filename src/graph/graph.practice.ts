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