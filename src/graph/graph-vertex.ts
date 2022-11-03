import { TreeNode } from '../tree/_node/tree-node'
import { GraphEdge } from './graph-edge'

export class GraphVertex<T = any> extends TreeNode<T> {

  private readonly _adjVertices: Map<string, { des: GraphVertex<T>, edge: GraphEdge }>

  constructor(value: T) {
    super(value)
    this._adjVertices = new Map<string, { des: GraphVertex<T>, edge: GraphEdge }>()
  }

  get adjVertices(): Map<string, { des: GraphVertex<T>, edge: GraphEdge }> {
    return this._adjVertices
  }

  getEdge(desVx: GraphVertex<T>): GraphEdge | undefined {
    return this._adjVertices.get(desVx.key)?.edge
  }

  isConnected(key: string): boolean {
    return this._adjVertices.has(key)
  }

  forEachAdjVertex(callback: (vx: GraphVertex<T>) => any) {
    for (let adjVx of this._adjVertices.values()) {
      callback(adjVx.des)
    }
  }

  addVertex(des: GraphVertex<T>, weight: number = 0, isDirected: boolean = true): GraphEdge {
    const edge = new GraphEdge(weight, this, des)
    if (!this._adjVertices.has(des.key)) {
      this._adjVertices.set(des.key, { des, edge })
    }

    if (!isDirected && !des.isConnected(this.key)) {
      des.addVertex(this, weight)
    }

    return edge
  }

}