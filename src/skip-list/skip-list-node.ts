import { DoublyLinkedListNode } from '../linked-list/doubly/doubly-linked-list-node'

export class SkipListNode extends DoublyLinkedListNode<number> {

  private _above: SkipListNode
  private _below: SkipListNode

  constructor(value: number) {
    super(value)
  }

  get above(): SkipListNode {
    return this._above
  }

  set above(above: SkipListNode) {
    this._above = above
  }

  get below(): SkipListNode {
    return this._below
  }

  set below(below: SkipListNode) {
    this._below = below
  }

  append(node: SkipListNode): SkipListNode {
    if (this.next) {
      this.next.prev = node
      node.next = this.next
    }

    this.next = node
    node.prev = this
    return this
  }

}