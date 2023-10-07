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