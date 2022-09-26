import { BinaryTree } from './binary-tree'

describe('Test insert()', () => {

  it('Should_InsertSuccessfully_WhenGivenNoChildren', () => {
    const root = new BinaryTree<number>(3)
    const left = new BinaryTree<number>(2)
    const right = new BinaryTree<number>(4)

    root.insert(left.value).insert(right.value)
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

    root.insert(left.value).insert(right.value)
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

    duplicatedRoot.insert(left.value).insert(right.value)
    expect(duplicatedRoot.value.toString()).toBe({ name: 'abc', total: 50 }.toString())
    expect(duplicatedRoot.left).toBeFalsy()
    expect(duplicatedRoot.right.isEqual(right)).toBeTruthy()
  })

  it('Should_InsertInCorrectOrder_WhenGivenValue', () => {
    const root = new BinaryTree<number>(50)
    root.insert(25).insert(75)

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