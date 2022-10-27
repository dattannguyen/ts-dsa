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

  getVertex(key: string): GraphVertex<T> {
    return this._vertices.get(key)
  }

  connect(src: T, des: T, weight: number) {
    const srcVx = this.upsertVx(src)
    const desVx = this.upsertVx(des)

    const srcEdge = srcVx.addVertex(desVx, weight, this._isDirected)
    this._edges.set(srcEdge.key, srcEdge)

    if (!this._isDirected) {
      const desEdge = desVx.getEdge(srcVx)
      this._edges.set(desEdge.key, desEdge)
    }
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