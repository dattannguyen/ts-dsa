import { SkipListNode } from './skip-list-node'

interface TestOptions {
  coinFlip?: () => boolean
  onTraversed?: (traversedNode: SkipListNode) => any
}

export class SkipList {

  private readonly _head: SkipListNode = new SkipListNode(-Infinity)

  insert(value: number, _testOptions?: TestOptions): SkipListNode {
    const newNode = new SkipListNode(value)
    const expressLineStack = []

    const doPromoteIfAny = () => {
      while ((_testOptions?.coinFlip || this.coinFlip)() && expressLineStack.length > 0) {
        const expressNode = expressLineStack.pop()
        expressNode.append(newNode)
        if (newNode.above) {
          newNode.above.below = undefined
          newNode.above = undefined
        }
      }
    }

    const doRecursiveInsert = (startAt: SkipListNode = this._head): SkipListNode => {
      _testOptions?.onTraversed?.(startAt)
      if (newNode.value === startAt.value) {
        return startAt
      }

      if (startAt.next && startAt.next.value <= newNode.value) {
        return doRecursiveInsert(startAt.next as SkipListNode)
      }


      expressLineStack.push(startAt)
      if (startAt.below) {
        return doRecursiveInsert(startAt.below)
      }

      startAt.below = newNode
      newNode.above = startAt

      doPromoteIfAny()
      return newNode
    }

    return doRecursiveInsert()
  }

  private coinFlip(): boolean {
    return Math.random() < 0.5
  }

}