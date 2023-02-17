import { SkipList } from './skip-list'
import { SkipListNode } from './skip-list-node'

describe('Test insert()', () => {

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
})