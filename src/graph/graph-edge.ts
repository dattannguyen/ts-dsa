import { GraphVertex } from './graph-vertex'

export class GraphEdge {

  private readonly _weight: number
  private readonly _from: GraphVertex
  private readonly _to: GraphVertex

  constructor(weight: number, from: GraphVertex, to: GraphVertex) {
    this._from = from
    this._to = to
    this._weight = weight
  }

  get weight() {
    return this._weight
  }

  get from(): GraphVertex {
    return this._from
  }

  get to(): GraphVertex {
    return this._to
  }

  get key(): string {
    return `${this.from.key}_${this.to.key}_${this.weight}`
  }

}