import { PrefixTree } from './prefix-tree'

describe('Test find()', () => {

  it('Should_ReturnUndefined_WhenGivenNonExistedWord', () => {
    const first = new PrefixTree()
    first.insert('abc').insert('xyz').insert('bat')
    expect(first.find('bac')).toBeFalsy()
    expect(first.find('def')).toBeFalsy()

    const second = new PrefixTree()
    second.insert('batter').insert('bac')
    expect(second.find('bat')).toBeFalsy()
  })

  it('Should_ReturnNode_WhenGivenExistedWord', () => {
    const first = new PrefixTree()
    first.insert('cab').insert('cat').insert('bat')
    expect(first.find('bat')).toBeTruthy()
    expect(first.find('cat')).toBeTruthy()

    const second = new PrefixTree()
    second.insert('batter').insert('bat')
    expect(second.find('bat')).toBeTruthy()

    const allowPrefix = new PrefixTree()
    allowPrefix.insert('batter')
    expect(allowPrefix.find('bat', true)).toBeTruthy()
  })

})

describe('Test autocomplete()', () => {

  it('Should_ReturnEmpty_WhenGivenNonExistentWord', () => {
    const first = new PrefixTree()
    first.insert('abc').insert('cba')

    const firstWords = first.autocomplete('aaa')
    expect(firstWords.length).toBe(0)

    const second = new PrefixTree()
    second.insert('batter')

    const secondWords = second.autocomplete('batk')
    expect(secondWords.length).toBe(0)
  })

  it('Should_ReturnAllWord_WhenGivenExistedWord', () => {
    const first = new PrefixTree()
    first.insert('cab').insert('cat').insert('bat')

    const firstWords = first.autocomplete('c')
    expect(firstWords.length).toBe(2)
    expect(firstWords.find(word => word === 'cab')).toBeTruthy()
    expect(firstWords.find(word => word === 'cat')).toBeTruthy()

    const second = new PrefixTree()
    second
        .insert('bake')
        .insert('batter')
        .insert('bat')
        .insert('bct')

    const secondWords = second.autocomplete('ba')
    expect(secondWords.length).toBe(3)
    expect(secondWords.find(word => word === 'bake')).toBeTruthy()
    expect(secondWords.find(word => word === 'batter')).toBeTruthy()
    expect(secondWords.find(word => word === 'bat')).toBeTruthy()
  })

})

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