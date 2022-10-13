import { BinaryTree } from './binary-tree'
import {
  findKthSmallestByStack,
  findKthSmallestNode,
  findKthSmallestNodeByMinHeap,
  findLowestCommonAncestor,
  findMaxDepthByBfs,
  findMaxDepthByDfs,
  findMaxPathSum,
  invertByDfs,
  isSameTree,
  isSubTree,
  isValidTree,
  isValidTreeByDownToUp
} from './binary-tree.practice'

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

describe('Test invert()', () => {

  it('Should_Return_WhenGivenEmptyTree', () => {
    const onlyRoot = new BinaryTree(1)
    expect(onlyRoot.traversePreOrder().join(',')).toBe('1')

    const onlyRevertedTree = invertByDfs(onlyRoot)
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

    const invertedFirstTree = invertByDfs(firstTree)
    expect(invertedFirstTree.traversePreOrder().join(',')).toBe('4,7,9,6,2,3,1')

    const secondTree = new BinaryTree(2)
    secondTree.insert(1)
    secondTree.insert(3)
    expect(secondTree.traversePreOrder().join(',')).toBe('2,1,3')

    const invertedSecondTree = invertByDfs(secondTree)
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

describe('Test isValidTree()', () => {

  it('Should_ReturnTrue_WhenGivenValidTree', () => {
    const firstTree = new BinaryTree(2)
    firstTree.insert(1)
    firstTree.insert(3)
    expect(isValidTree(firstTree)).toBeTruthy()
    expect(isValidTreeByDownToUp(firstTree)).toBeTruthy()

    const secondTree = new BinaryTree<number>(6)
    secondTree.insert(2)
    secondTree.insert(8)
    secondTree.insert(0)
    secondTree.insert(4)
    secondTree.insert(3)
    secondTree.insert(5)
    secondTree.insert(7)
    secondTree.insert(9)
    expect(isValidTree(secondTree)).toBeTruthy()
    expect(isValidTreeByDownToUp(secondTree)).toBeTruthy()
  })

  it('Should_ReturnFalse_WhenGivenInvalidTree', () => {
    let firstTree = new BinaryTree(4)
    firstTree.insert(2)
    firstTree.insert(7)
    firstTree.insert(1)
    firstTree.insert(3)
    firstTree.insert(6)
    firstTree.insert(9)
    firstTree = invertByDfs(firstTree)
    expect(isValidTree(firstTree)).toBeFalsy()
    expect(isValidTreeByDownToUp(firstTree)).toBeFalsy()

    let secondTree = new BinaryTree(2)
    secondTree.insert(1)
    secondTree.insert(3)
    secondTree = invertByDfs(secondTree)
    expect(isValidTree(secondTree)).toBeFalsy()
    expect(isValidTreeByDownToUp(secondTree)).toBeFalsy()

    let thirdTree = new BinaryTree(5)
    thirdTree.left = new BinaryTree<number>(3)
    thirdTree.right = new BinaryTree<number>(4)
    expect(isValidTree(thirdTree)).toBeFalsy()
    expect(isValidTreeByDownToUp(thirdTree)).toBeFalsy()

    const fourthTree = new BinaryTree(5).insert(4)
    const nodeOfSix = fourthTree.insert(6)
    nodeOfSix.insert(3)
    nodeOfSix.insert(7)
    expect(isValidTree(fourthTree)).toBeFalsy()
    expect(isValidTreeByDownToUp(fourthTree)).toBeFalsy()

    const fifthTree = new BinaryTree(0)
    fifthTree.right = new BinaryTree<number>(-1)
    expect(isValidTree(fifthTree)).toBeFalsy()
    expect(isValidTreeByDownToUp(fifthTree)).toBeFalsy()

    const sixthTree = new BinaryTree<number>(32)
    sixthTree.insert(26)
    sixthTree.insert(47)
    sixthTree.insert(56)
    const nodeOfNineteen = sixthTree.insert(19)
    nodeOfNineteen.insert(27)
    expect(isValidTree(sixthTree)).toBeFalsy()
    expect(isValidTreeByDownToUp(sixthTree)).toBeFalsy()

    const seventhTree = new BinaryTree<number>(32)
    seventhTree.insert(26)
    seventhTree.insert(47)
    seventhTree.insert(56).insert(27)
    expect(isValidTree(seventhTree)).toBeFalsy()
    expect(isValidTreeByDownToUp(seventhTree)).toBeFalsy()
  })

})

describe('Test isSameTree()', () => {

  it('Should_ReturnTrue_WhenGivenSameTree', () => {
    expect(isSameTree(undefined, undefined)).toBeTruthy()

    const first = new BinaryTree(5)
    first.insert(1)
    first.insert(10)
    const second = new BinaryTree(5)
    second.insert(1)
    second.insert(10)

    expect(first.traverseInOrder().join(',')).toBe('1,5,10')
    expect(second.traverseInOrder().join(',')).toBe('1,5,10')
    expect(isSameTree(first, second)).toBeTruthy()

    const third = new BinaryTree(5)
    third.insert(10)
    third.insert(11)
    third.insert(12)
    third.insert(13)
    const fourth = new BinaryTree(5)
    fourth.insert(10)
    fourth.insert(11)
    fourth.insert(12)
    fourth.insert(13)

    expect(third.traverseInOrder().join(',')).toBe('5,10,11,12,13')
    expect(fourth.traverseInOrder().join(',')).toBe('5,10,11,12,13')
    expect(isSameTree(third, fourth)).toBeTruthy()
  })

  it('Should_ReturnFalse_WhenGivenDifferentTree', () => {
    const first = new BinaryTree(5)
    const second = new BinaryTree(5)
    second.insert(1)
    second.insert(2)

    expect(first.traverseInOrder().join(',')).toBe('5')
    expect(second.traverseInOrder().join(',')).toBe('1,2,5')
    expect(isSameTree(first, second)).toBeFalsy()

    const third = new BinaryTree(5)
    third.insert(10)
    third.insert(11)
    third.insert(12)
    third.insert(15)
    const fourth = new BinaryTree(5)
    fourth.insert(10)
    fourth.insert(11)
    fourth.insert(12)
    fourth.insert(14)

    expect(third.traverseInOrder().join(',')).toBe('5,10,11,12,15')
    expect(fourth.traverseInOrder().join(',')).toBe('5,10,11,12,14')
    expect(isSameTree(third, fourth)).toBeFalsy()

    const fifth = new BinaryTree(1)
    fifth.insert(2)

    const sixth = new BinaryTree(1, ((parentValue, childValue) => parentValue < childValue))
    sixth.insert(2)

    expect(fifth.traverseInOrder().join(',')).not.toBe(sixth.traverseInOrder().join(','))
    expect(isSameTree(first, sixth)).toBeFalsy()
  })

})

describe('Test isSubTree()', () => {

  it('Should_ReturnTrue_WhenGivenSubTree', () => {
    const first = new BinaryTree(10)
    first.insert(5)
    first.insert(15)
    first.insert(2)
    first.insert(9)
    expect(first.traverseInOrder().join(',')).toBe('2,5,9,10,15')

    const second = new BinaryTree(5)
    second.insert(2)
    second.insert(9)
    expect(second.traverseInOrder().join(',')).toBe('2,5,9')

    expect(isSubTree(first, second)).toBeTruthy()

    const third = new BinaryTree(5)
    third.insert(1)
    third.insert(30)
    third.insert(-1)
    third.insert(4)
    third.insert(2)
    third.insert(15)
    third.insert(40)
    third.insert(18)
    expect(third.traverseInOrder().join(',')).toBe('-1,1,2,4,5,15,18,30,40')

    const fourth = new BinaryTree(15)
    fourth.insert(18)
    expect(fourth.traverseInOrder().join(',')).toBe('15,18')

    expect(isSubTree(third, fourth)).toBeTruthy()
  })

  it('Should_ReturnFalse_WhenGivenNoSubTree', () => {
    const myKing = new BinaryTree(10)
    myKing.insert(5)
    myKing.insert(15)
    myKing.insert(2)
    myKing.insert(9)
    expect(myKing.traverseInOrder().join(',')).toBe('2,5,9,10,15')

    const myQueen = new BinaryTree(6)
    myQueen.insert(2)
    myQueen.insert(9)
    expect(myQueen.traverseInOrder().join(',')).toBe('2,6,9')

    expect(isSubTree(myKing, myQueen)).toBeFalsy()

    const myPrince = new BinaryTree(5)
    myPrince.insert(1)
    myPrince.insert(30)
    myPrince.insert(-1)
    myPrince.insert(4)
    myPrince.insert(2)
    myPrince.insert(15)
    myPrince.insert(40)
    myPrince.insert(18)
    myPrince.insert(16)
    expect(myPrince.traverseInOrder().join(',')).toBe('-1,1,2,4,5,15,16,18,30,40')

    const myPrincess = new BinaryTree(15)
    myPrincess.insert(18)
    expect(myPrincess.traverseInOrder().join(',')).toBe('15,18')

    expect(isSubTree(myPrince, myPrincess)).toBeFalsy()
  })
})

describe('Test findLowestCommonAncestor()', () => {

  it('Should_ReturnNil_WhenGivenInvalidParam', () => {
    const root = new BinaryTree<number>(6)
    root.insert(2)
    root.insert(8)
    root.insert(0)

    const firstLca = findLowestCommonAncestor(root, new BinaryTree<number>(2), new BinaryTree<number>(4))
    expect(firstLca).toBeFalsy()
  })

  it('Should_ReturnLCA_WhenGivenValidParams', () => {
    const root = new BinaryTree<number>(6)
    root.insert(2)
    root.insert(8)
    root.insert(0)
    root.insert(4)
    root.insert(3)
    root.insert(5)
    root.insert(7)
    root.insert(9)
    expect(root.traverseInOrder().join(',')).toBe('0,2,3,4,5,6,7,8,9')

    const firstLca = findLowestCommonAncestor(root, new BinaryTree<number>(2), new BinaryTree<number>(4))
    expect(firstLca?.value).toBe(2)
    expect(firstLca?.parent?.value).toBe(6)

    const secondLca = findLowestCommonAncestor(root, new BinaryTree(5), new BinaryTree<number>(8))
    expect(secondLca?.value).toBe(6)
    expect(secondLca?.parent).toBeFalsy()

    const thirdLca = findLowestCommonAncestor(root, new BinaryTree(5), new BinaryTree<number>(6))
    expect(thirdLca?.value).toBe(6)
    expect(thirdLca?.parent).toBeFalsy()

    const fourthLca = findLowestCommonAncestor(root, new BinaryTree<number>(7), new BinaryTree<number>(9))
    expect(fourthLca?.value).toBe(8)

    const lastRoot = new BinaryTree(2)
    lastRoot.insert(1)
    expect(lastRoot.traverseInOrder().join(',')).toBe('1,2')

    const lastLca = findLowestCommonAncestor(lastRoot, new BinaryTree<number>(1), new BinaryTree<number>(2))
    expect(lastLca?.value).toBe(2)
    expect(lastLca?.parent).toBeFalsy()
  })

})

describe('Test findKthSmallestElement()', () => {

  it('Should_ReturnNil_WhenGivenEmptyTreeOrOutOfBound', () => {
    const first = new BinaryTree<number>(1)
    expect(findKthSmallestNode(first, 5)).toBeFalsy()
  })

  it('Should_ReturnExpectedValue_WhenGivenTree', () => {
    const first = new BinaryTree<number>(3)
    first.insert(1)
    first.insert(4)
    first.insert(2)
    expect(findKthSmallestNode(first, 2)).toBe(2)
    expect(findKthSmallestByStack(first, 2)).toBe(2)
    expect(findKthSmallestNodeByMinHeap(first, 2)).toBe(2)

    const second = new BinaryTree<number>(5)
    second.insert(3)
    second.insert(6)
    second.insert(2)
    second.insert(4)
    second.insert(1)
    expect(findKthSmallestNode(second, 3)).toBe(3)
    expect(findKthSmallestByStack(second, 3)).toBe(3)
    expect(findKthSmallestNodeByMinHeap(second, 3)).toBe(3)

    const third = new BinaryTree<number>(5)
    third.insert(2)
    third.insert(30)
    third.insert(-1)
    third.insert(4)
    third.insert(3)
    third.insert(15)
    third.insert(40)
    third.insert(19)
    expect(findKthSmallestNode(third, 7)).toBe(19)
    expect(findKthSmallestByStack(third, 7)).toBe(19)
    expect(findKthSmallestNodeByMinHeap(third, 7)).toBe(19)
  })

})

describe('Test findMaxPathSum()', () => {

  it('Should_ReturnExpectedMaxPathSum_WhenGivenParams', () => {
    const first = new BinaryTree<number>(1)
    first.insert(2)
    first.insert(3)
    expect(findMaxPathSum(first)).toBe(6)

    const second = new BinaryTree<number>(-10)
    second.left = new BinaryTree<number>(9)
    second.right = new BinaryTree<number>(20)
    second.right.left = new BinaryTree<number>(15)
    second.right.right = new BinaryTree<number>(7)
    expect(findMaxPathSum(second)).toBe(42)

    const third = new BinaryTree(-2)
    third.insert(-1)
    expect(findMaxPathSum(third)).toBe(-1)

    const fourth = new BinaryTree(-3)
    expect(findMaxPathSum(fourth)).toBe(-3)

    const fifth = new BinaryTree(-1)
    fifth.insert(-2)
    fifth.insert(10)
    fifth.insert(-6)
    fifth.insert(-3)
    fifth.insert(-6)
    expect(findMaxPathSum(fifth)).toBe(10)
  })

})

