import { TreeNode } from './tree-node'

describe('Test initialization()', () => {

  it('Should_ReturnInitializedTreeNode_WhenCalled', () => {
    const node = new TreeNode(1)
    expect(node.value).toBe(1)
    expect(node.parent).toBeFalsy()

    node.value = 10
    expect(node.value).toBe(10)
  })

  it('Should_ReturnSetMetadata_WhenCalled', () => {
    const node = new TreeNode(1)
    node.metadata.set(1, 'a')
    expect(node.metadata.get(1)).toBe('a')

    node.metadata.set(2, 'b')
    node.metadata.set(2, 'c')
    expect(node.metadata.get(2)).toBe('c')

    node.metadata.set(3, 'd')
    node.metadata.delete(3)
    expect(node.metadata.get(3)).toBeFalsy()
  })

})

describe('Test isEqual()', () => {

  it('Should_ReturnExpectedResult_WhenGivenDefaultComparator', () => {
    const first = new TreeNode('a')
    const second = new TreeNode('a')
    expect(first.isEqual(second)).toBeTruthy()

    first.value = 'b'
    expect(first.isEqual(second)).toBeFalsy()

    const third = new TreeNode<{ name: string, total: number }>(
        { name: 'Jack', total: 10 },
        (first, second) => first.value.total === second.value.total
    )

    const fourth = new TreeNode<{ name: string, total: number }>(
        { name: 'Jack', total: 20 },
        (first, second) => first.value.name === second.value.name
    )

    expect(third.isEqual(fourth)).toBeFalsy()
    expect(fourth.isEqual(third)).toBeTruthy()
  })

})
