import { dfs } from './dfs/dfs'
import { bfs } from './bfs/bfs'
import { GraphVertex } from './graph-vertex'
import { GraphEdge } from './graph-edge'

export class Graph<T = any> {

  private readonly _isDirected: boolean
  private readonly _vertices: Map<string, GraphVertex<T>>
  private readonly _edges: Map<string, GraphEdge>

  constructor(isDirected: boolean = true) {
    this._isDirected = isDirected
    this._vertices = new Map<string, GraphVertex<T>>()
    this._edges = new Map<string, GraphEdge>()
  }

  get vertices(): Map<string, GraphVertex> {
    return this._vertices
  }

  get edges(): Map<string, GraphEdge> {
    return this._edges
  }

  getVertex(key: string): GraphVertex<T> {
    return this._vertices.get(key)
  }

  randomize(): GraphVertex<T> {
    const keys = Array.from(this.vertices.keys())
    const randomIndex = Math.floor(Math.random() * (keys.length - 1) + 1)

    return this.vertices.get(keys[randomIndex] || keys[0])
  }

  dfs(onVisited?: (vertex: GraphVertex<T>) => any, expectedValue?: T): GraphVertex<T> | undefined {
    const firstVertex = this._vertices.get(Array.from(this._vertices.keys())[0])
    return dfs(
        firstVertex,
        onVisited,
        expectedValue ? (vx: GraphVertex) => vx.value === expectedValue : undefined
    )
  }

  bfs(onVisited?: (vertex: GraphVertex<T>) => any, expectedValue?: T): GraphVertex<T> | undefined {
    const firstVertex = this._vertices.get(Array.from(this._vertices.keys())[0])
    return bfs(
        firstVertex,
        onVisited,
        expectedValue ? (vx: GraphVertex) => vx.value === expectedValue : undefined
    )
  }

  connect(src: T, des: T, weight: number = 0): Graph<T> {
    const srcVx = this.upsertVx(src)
    const desVx = this.upsertVx(des)

    const srcEdge = srcVx.addVertex(desVx, weight, this._isDirected)
    this._edges.set(srcEdge.key, srcEdge)

    if (!this._isDirected) {
      const desEdge = desVx.getEdge(srcVx)
      this._edges.set(desEdge.key, desEdge)
    }

    return this
  }

  private upsertVx(value: T): GraphVertex<T> {
    let newVx = new GraphVertex(value)
    if (this._vertices.has(newVx.key)) {
      newVx = this._vertices.get(newVx.key)
    } else {
      this._vertices.set(newVx.key, newVx)
    }

    return newVx
  }
}