import { BinaryTree } from './binary-tree'
import { findMaxDepthByBfs, findMaxDepthByDfs, invertBinaryTreeByRecursion } from './binary-tree.practice'

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

describe('Test height()', () => {

  it('Should_ReturnZero_WhenGivenOnlyRootTree', () => {
    const firstRoot = new BinaryTree(0)
    expect(firstRoot.height).toBe(0)

    const secondRoot = new BinaryTree(1)
    expect(secondRoot.height).toBe(0)
  })

  it('Should_ReturnExpectedHeight_WhenGivenTree', () => {
    const higherLeft = new BinaryTree(50)
    higherLeft.insert(25)
    higherLeft.insert(75)
    higherLeft.insert(10)
    higherLeft.insert(33)
    higherLeft.insert(56)
    higherLeft.insert(89)
    higherLeft.insert(4)
    expect(higherLeft.height).toBe(3)

    const higherRight = new BinaryTree(50)
    higherRight.insert(25)
    higherRight.insert(75)
    higherRight.insert(56)
    higherRight.insert(89)
    higherRight.insert(82)
    higherRight.insert(95)
    higherRight.insert(100)
    expect(higherRight.height).toBe(4)
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

  it('Should_DeleteNode_WhenGivenLeafNode', () => {
    const root = new BinaryTree(10)
    root.insert(20)
    root.insert(5)

    const deletedNode = root.delete(5)
    expect(deletedNode.value).toBe(5)
    expect(root.traverseInOrder().join('-')).toBe('10-20')

    root.delete(20)
    expect(root.traverseInOrder().join('-')).toBe('10')
  })

  it('Should_DeleteRootNode_WhenGivenLeafNode', () => {
    const root = new BinaryTree(10)
    root.metadata.set(1, 2)
    root.metadata.set(3, 4)

    expect(root.metadata.size).toBe(2)
    expect(root.traverseInOrder().join(',')).toBe('10')

    root.delete(10)
    expect(root.value).toBeFalsy()
    expect(root.metadata.size).toBe(0)
    expect(root.traverseInOrder().join(',')).toBe('')
  })

  it('Should_DeleteNode_WhenGivenNodeHasEitherLeftOrRight', () => {
    const root = new BinaryTree(10)
    root.insert(20)
    root.insert(5)
    root.insert(30)

    root.delete(20)
    expect(root.traverseInOrder().join(',')).toBe('5,10,30')

    root.insert(1)
    expect(root.traverseInOrder().join(',')).toBe('1,5,10,30')

    root.delete(5)
    expect(root.traverseInOrder().join(',')).toBe('1,10,30')
  })

  it('Should_DeleteRootNode_WhenGivenNodeHasEitherLeftOrRight', () => {
    const root = new BinaryTree(10)
    root.metadata.set(1, 2)
    root.insert(20)
    root.insert(15)
    root.insert(30)
    expect(root.traverseInOrder().join(',')).toBe('10,15,20,30')

    const twentyNode = root.find(20)
    twentyNode.metadata
        .set(1, 3)
        .set(2, 4)

    root.delete(10)
    expect(root.traverseInOrder().join(',')).toBe('15,20,30')
    expect(root.value).toBe(20)
    expect(root.metadata.get(1)).toBe(3)
    expect(root.metadata.get(2)).toBe(4)
  })

  it('Should_DeleteNode_WhenGivenNodeHasTwoChildren', () => {
    const root = new BinaryTree(10)
    root.insert(20)
    root.insert(5)
    root.insert(30)
    root.insert(15)
    root.insert(25)
    root.insert(27)

    root.delete(20)
    expect(root.traverseInOrder().join(',')).toBe('5,10,15,25,27,30')

    root.delete(15)
    expect(root.traverseInOrder().join(',')).toBe('5,10,25,27,30')
  })

  it('Should_DeleteRootNode_WhenGivenNodeHasTwoChildren', () => {
    const root = new BinaryTree(10)
    root.metadata.set(5, 6)
    root.insert(20)
    root.insert(5)
    root.insert(30)
    root.insert(17)
    root.insert(15)
    root.insert(25)

    const twentyNode = root.find(15)
    twentyNode.metadata
        .set(5, 10)
        .set(15, 20)

    root.delete(10)
    expect(root.traverseInOrder().join(',')).toBe('5,15,17,20,25,30')
    expect(root.value).toBe(15)
    expect(root.metadata.get(5)).toBe(10)
    expect(root.metadata.get(15)).toBe(20)
  })

  it('Should_ReturnUndefined_WhenGivenNonExistentNode', () => {
    const root = new BinaryTree(10)
    root.insert(20)
    root.insert(5)
    root.insert(30)
    root.insert(15)
    root.insert(25)
    root.insert(27)

    const undefinedNode = root.delete(200)
    expect(undefinedNode).toBeFalsy()
  })

})

describe('Test invertBinaryTreeByRecursion()', () => {

  it('Should_Return_WhenGivenEmptyTree', () => {
    const onlyRoot = new BinaryTree(1)
    expect(onlyRoot.traversePreOrder().join(',')).toBe('1')

    const onlyRevertedTree = invertBinaryTreeByRecursion(onlyRoot)
    expect(onlyRevertedTree.traversePreOrder().join(',')).toBe('1')
  })

  it('Should_InvertBinaryTree_WhenGivenParam', () => {
    const firstTree = new BinaryTree(4)
    firstTree.insert(2)
    firstTree.insert(7)
    firstTree.insert(1)
    firstTree.insert(3)
    firstTree.insert(6)
    firstTree.insert(9)
    expect(firstTree.traversePreOrder().join(',')).toBe('4,2,1,3,7,6,9')

    const invertedFirstTree = invertBinaryTreeByRecursion(firstTree)
    expect(invertedFirstTree.traversePreOrder().join(',')).toBe('4,7,9,6,2,3,1')

    const secondTree = new BinaryTree(2)
    secondTree.insert(1)
    secondTree.insert(3)
    expect(secondTree.traversePreOrder().join(',')).toBe('2,1,3')

    const invertedSecondTree = invertBinaryTreeByRecursion(secondTree)
    expect(invertedSecondTree.traversePreOrder().join(',')).toBe('2,3,1')
  })

})

describe('Test findMaxDepth()', () => {

  it('Should_ReturnOne_WhenGivenEmptyTree', () => {
    const tree = new BinaryTree(1)
    expect(findMaxDepthByDfs(tree)).toBe(1)
    expect(findMaxDepthByBfs(tree)).toBe(1)
  })

  it('Should_ReturnDepthOfLeft_WhenGivenLeftIsDeeper', function () {
    const firstTree = new BinaryTree(10)
    firstTree.insert(5)
    firstTree.insert(3)
    firstTree.insert(7)
    firstTree.insert(9)
    firstTree.insert(8)
    firstTree.insert(20)
    firstTree.insert(15)

    expect(findMaxDepthByDfs(firstTree)).toBe(5)
    expect(findMaxDepthByBfs(firstTree)).toBe(5)
  })

  it('Should_ReturnDepthOfRight_WhenGivenRightIsDeeper', function () {
    const firstTree = new BinaryTree(3)
    firstTree.insert(1)
    firstTree.insert(9)
    firstTree.insert(20)
    firstTree.insert(15)
    expect(findMaxDepthByDfs(firstTree)).toBe(4)
    expect(findMaxDepthByBfs(firstTree)).toBe(4)
  })

})