import { SkipListNode } from './skip-list-node'

interface TestOptions {
  coinFlip?: () => boolean
  onTraversed?: (traversedNode: SkipListNode) => any
}

export class SkipList {

  private readonly _head: SkipListNode = new SkipListNode(-Infinity)

  get head(): SkipListNode {
    return this._head
  }

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

      /** Recursively start from next if larger than next **/
      if (startAt.next && startAt.next.value <= newNode.value) {
        return doRecursiveInsert(startAt.next as SkipListNode)
      }

      if (startAt.below) {
        expressLineStack.push(startAt)
        return doRecursiveInsert(startAt.below)
      }

      if (startAt.prev) {
        startAt.below = newNode
        newNode.above = startAt
      } else if (startAt.value < newNode.value) {
        startAt.append(newNode)
        doPromoteIfAny()
      } else {
        newNode.append(startAt)

        startAt.above.below = newNode
        newNode.above = startAt.above

        startAt.above = undefined
        startAt.below = undefined
      }

      return newNode
    }

    return doRecursiveInsert()
  }

  private coinFlip(): boolean {
    return Math.random() < 0.5
  }

}