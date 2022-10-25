import { PrefixTree } from './prefix-tree'

describe('Test insert()', () => {

  it('Should_InsertWord_WhenGivenSeparatedWord', () => {
    const prefixTree = new PrefixTree()
    prefixTree
        .insert('cat')
        .insert('abs')
        .insert('bst')
        .insert('ego')
    expect(Object.keys(prefixTree.children).length).toBe(4)

    const aNode = prefixTree.getChild('a')
    expect(aNode).toBeTruthy()
    expect(Object.keys(aNode.children).length).toBe(1)
    expect(aNode.getChild('b')).toBeTruthy()
    expect(aNode.getChild('b')?.getChild('c')).toBeFalsy()

    const bNode = prefixTree.getChild('b')
    expect(bNode).toBeTruthy()
    expect(Object.keys(bNode.children).length).toBe(1)
    expect(bNode.getChild('s')).toBeTruthy()
    expect(bNode.getChild('f')).toBeFalsy()
    expect(bNode.getChild('s')?.getChild('t')).toBeTruthy()

    const cNode = prefixTree.getChild('c')
    expect(cNode).toBeTruthy()
    expect(Object.keys(cNode.children).length).toBe(1)
    expect(cNode.getChild('a')).toBeTruthy()
    expect(cNode.getChild('a').getChild('t')).toBeTruthy()
    expect(cNode.getChild('a')?.getChild('t')?.parent?.value).toBe('a')

    const eNode = prefixTree.getChild('e')
    expect(eNode).toBeTruthy()
    expect(eNode.getChild('g')?.getChild('o')?.getChild('*')).toBeTruthy()
  })

  it('Should_InsertWord_WhenGivenOverlappedWord', () => {
    const prefixTreeOne = new PrefixTree()
    prefixTreeOne
        .insert('ace')
        .insert('act')

    expect(Object.keys(prefixTreeOne.children).length).toBe(1)
    expect(Object.keys(prefixTreeOne.getChild('a')?.getChild('c')?.children).length).toBe(2)
    expect(prefixTreeOne.getChild('a')?.getChild('c')?.getChild('t')).toBeTruthy()
    expect(prefixTreeOne.getChild('a')?.getChild('c')?.getChild('e')).toBeTruthy()
    expect(prefixTreeOne.getChild('a')?.getChild('c')?.getChild('e').getChild('*')).toBeTruthy()
    expect(prefixTreeOne.getChild('a')?.getChild('c')?.getChild('e').getChild('a')).toBeFalsy()

    const prefixTreeTwo = new PrefixTree()
    prefixTreeTwo
        .insert('bad')
        .insert('bake')
        .insert('batter')
        .insert('bat')
    expect(Object.keys(prefixTreeTwo.children).length).toBe(1)

    const baNode = prefixTreeTwo.getChild('b')?.getChild('a')
    expect(baNode).toBeTruthy()
    expect(Object.keys(baNode.children).length).toBe(3)
    expect(baNode.getChild('d')).toBeTruthy()
    expect(baNode.getChild('k')).toBeTruthy()
    expect(baNode.getChild('t')).toBeTruthy()
    expect(baNode.getChild('f')).toBeFalsy()

    const batNode = baNode.getChild('t')
    expect(Object.keys(batNode.children).length).toBe(2)
    expect(batNode.getChild('t')).toBeTruthy()
    expect(batNode.getChild('*')).toBeTruthy()
    expect(batNode.getChild('t').getChild('e')).toBeTruthy()
    expect(batNode.getChild('t').getChild('t')).toBeFalsy()
  })

})