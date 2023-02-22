import { SkipList } from './skip-list'
import { SkipListNode } from './skip-list-node'

describe('Test #skipList insert()', () => {

  it('Should_InsertNodeSuccessWithProperTimeComplexity_WhenGivenNodeAndCustomTestOption', () => {
    const firstSL = new SkipList()

    const traversedNodes: SkipListNode[] = []
    const onTraversed = (node: SkipListNode) => traversedNodes.push(node)

    firstSL.insert(1)
    firstSL.insert(2)

    const fiftyNode = firstSL.insert(50, { coinFlip: () => true, onTraversed })
    expect(fiftyNode).toBeTruthy()
    expect(traversedNodes.length <= 4).toBeTruthy()

    traversedNodes.length = 0
    const seventyNode = firstSL.insert(70, { onTraversed })
    expect(seventyNode).toBeTruthy()
    expect(traversedNodes.length < 6).toBeTruthy()

    const secondSL = new SkipList()
    secondSL.insert(1)
    secondSL.insert(2)
    secondSL.insert(50)
    const node = secondSL.insert(70)

    traversedNodes.length = 0
    const existingNode = secondSL.insert(70)
    expect(existingNode).toBeTruthy()
    expect(node.value).toEqual(existingNode.value)
    expect(node.above?.value).toEqual(existingNode?.above?.value)
    expect(node.below?.value).toEqual(existingNode?.below?.value)
    expect(node.next?.value).toEqual(existingNode?.next?.value)
    expect(node.prev?.value).toEqual(existingNode?.prev?.value)
    expect(traversedNodes.length < 6).toBeTruthy()
  })

  it('Should_InsertNodeSuccessfully_WhenAddLargerNodeFirst', () => {
    const largerInsertionFirstSL = new SkipList()

    let traversedNodeCount: number = 0
    const onTraversed = () => traversedNodeCount++

    largerInsertionFirstSL.insert(100)
    largerInsertionFirstSL.insert(99)

    const fiftyNode = largerInsertionFirstSL.insert(50, { coinFlip: () => true, onTraversed })
    expect(fiftyNode).toBeTruthy()
    expect(traversedNodeCount).toBeLessThan(3)

    traversedNodeCount = 0
    const seventyNode = largerInsertionFirstSL.insert(70, { onTraversed })
    expect(seventyNode).toBeTruthy()
    expect(traversedNodeCount).toBeLessThan(3)

    traversedNodeCount = 0
    const eightyNode = largerInsertionFirstSL.insert(80, { onTraversed })
    expect(eightyNode).toBeTruthy()
    expect(traversedNodeCount).toBeLessThanOrEqual(4)
  })

  // it('Should_InsertNodeSuccessWithAcceptanceTimeComplexity_WhenGivenMassiveNode', () => {
  //   const massiveSL = new SkipList()
  //   const size = 100000
  //   const randomize = () => Math.floor(Math.random() * (size - 1) + 1)
  //
  //   for (let i = 0; i < size; i++) {
  //     massiveSL.insert(randomize())
  //   }
  //
  //   let traversedCount = 0
  //   const onTraversed = () => traversedCount++
  //   const newNode = massiveSL.insert(randomize(), { onTraversed })
  //
  //   const errorRatePercentage = 0.1
  //   const averageComplexity = Math.log2(size - 2)
  //   const [minRate, maxRate] = [averageComplexity * (1 - errorRatePercentage), Math.log2(size - 1) * (1 +
  // errorRatePercentage)]  expect(newNode).toBeTruthy() expect(traversedCount).toBeLessThanOrEqual(minRate)
  // expect(traversedCount).not.toBeLessThan(maxRate) })
})