import { BinaryTree } from './binary-tree'

describe('Test traverse()', () => {

  it('Should_ReturnInOrder_WhenTraverseInOrder', () => {
    const firstTree = new BinaryTree(3)
    firstTree.insert(1)
    firstTree.insert(5)

    const firstInOrder = firstTree.traverseInOrder().join(',')
    expect(firstInOrder).toBe('1,3,5')

    const secondTree = new BinaryTree(50)
    secondTree.insert(25)
    secondTree.insert(75)
    secondTree.insert(10)
    secondTree.insert(33)
    secondTree.insert(56)
    secondTree.insert(89)
    secondTree.insert(4)
    secondTree.insert(11)

    const secondInOrder = secondTree.traverseInOrder().join(',')
    expect(secondInOrder).toBe('4,10,11,25,33,50,56,75,89')
  })

  it('Should_ReturnPreOrder_WhenTraversePreOrder', () => {
    const firstTree = new BinaryTree(3)
    firstTree.insert(1)
    firstTree.insert(5)

    const firstInOrder = firstTree.traversePreOrder().join(',')
    expect(firstInOrder).toBe('3,1,5')

    const secondTree = new BinaryTree(50)
    secondTree.insert(30)
    secondTree.insert(80)
    secondTree.insert(40)
    secondTree.insert(20)
    secondTree.insert(90)
    secondTree.insert(70)

    const secondInOrder = secondTree.traversePreOrder().join(',')
    expect(secondInOrder).toBe('50,30,20,40,80,70,90')
  })

  it('Should_ReturnPostOrder_WhenTraversePostOrder', () => {
    const firstTree = new BinaryTree(3)
    firstTree.insert(1)
    firstTree.insert(5)

    const firstInOrder = firstTree.traversePostOrder().join(',')
    expect(firstInOrder).toBe('1,5,3')

    const secondTree = new BinaryTree(50)
    secondTree.insert(24)
    secondTree.insert(74)
    secondTree.insert(9)
    secondTree.insert(32)
    secondTree.insert(55)
    secondTree.insert(87)
    secondTree.insert(3)
    secondTree.insert(10)

    const secondInOrder = secondTree.traversePostOrder().join(',')
    expect(secondInOrder).toBe('3,10,9,32,24,55,87,74,50')
  })

})

describe('Test find()', () => {

  it('Should_ReturnUndefined_WhenFindUndefinedNode', () => {
    const root = new BinaryTree<number>(50)
    root.insert(25)
    root.insert(75)
    root.insert(10)
    root.insert(33)

    const undefinedNode = root.find(200)
    expect(undefinedNode).toBeFalsy()
  })

  it('Should_ReturnFoundNode_WhenGivenExistedValue', () => {
    const root = new BinaryTree<number>(50)
    root.insert(25)
    root.insert(75)
    root.insert(10)
    root.insert(33)
    root.insert(56)
    root.insert(40)

    const lowestRight = root.find(40)
    expect(lowestRight.value).toBe(40)
    expect(lowestRight.parent?.value).toBe(33)

    const randomLeft = root.find(56)
    expect(randomLeft.value).toBe(56)
    expect(randomLeft.parent?.value).toBe(75)
  })

})

describe('Test insert()', () => {

  it('Should_InsertSuccessfully_WhenGivenNoChildren', () => {
    const root = new BinaryTree<number>(3)
    const left = new BinaryTree<number>(2)
    const right = new BinaryTree<number>(4)

    root.insert(left.value)
    root.insert(right.value)
    expect(root.value).toBe(3)
    expect(root.left.isEqual(left)).toBeTruthy()
    expect(root.right.isEqual(right)).toBeTruthy()
  })

  it('Should_InsertSuccessfully_WhenGivenCustomOrderComparator', () => {
    const root = new BinaryTree<{ total: number, name: string }>(
        { name: 'Jack', total: 50 },
        (parentValue, childValue) => parentValue.total < childValue.total
    )

    const left = new BinaryTree<{ total: number, name: string }>({ name: 'Jill', total: 75 })
    const right = new BinaryTree<{ total: number, name: string }>({ name: 'Jeff', total: 25 })

    root.insert(left.value)
    root.insert(right.value)
    expect(root.value.toString()).toBe({ name: 'Jack', total: 50 }.toString())
    expect(root.left.isEqual(left)).toBeTruthy()
    expect(root.right.isEqual(right)).toBeTruthy()
  })

  it('Should_InsertSuccessfully_WhenAllowDuplicatedValue', () => {
    const duplicatedRoot = new BinaryTree<{ total: number, name: string }>(
        { name: 'abc', total: 50 },
        (parentValue, childValue) => parentValue.total < childValue.total,
        true,
        (parentValue, childValue) => parentValue.value?.total === childValue.value?.total,
    )

    const left = new BinaryTree<{ total: number, name: string }>({ name: 'abc', total: 50 })
    const right = new BinaryTree<{ total: number, name: string }>({ name: 'zyq', total: 25 })

    duplicatedRoot.insert(left.value)
    duplicatedRoot.insert(right.value)
    expect(duplicatedRoot.value.toString()).toBe({ name: 'abc', total: 50 }.toString())
    expect(duplicatedRoot.left).toBeFalsy()
    expect(duplicatedRoot.right.isEqual(right)).toBeTruthy()
  })

  it('Should_InsertInCorrectOrder_WhenGivenValue', () => {
    const root = new BinaryTree<number>(50)
    root.insert(25)
    root.insert(75)

    root.insert(10)
    expect(root.left?.left?.value).toBe(10)

    root.insert(33)
    expect(root.left?.right?.value).toBe(33)

    root.insert(56)
    expect(root.right?.left?.value).toBe(56)

    root.insert(89)
    expect(root.right?.right.value).toBe(89)
  })

})

describe('Test delete()', () => {

  it('Should_DeleteLeaf_WhenGivenLeafNode', () => {
    const root = new BinaryTree(50)
    root.insert(25)
    root.insert(75)
    root.insert(10)
    root.insert(11)
    root.insert(33)

    root.delete(11)
  })

})