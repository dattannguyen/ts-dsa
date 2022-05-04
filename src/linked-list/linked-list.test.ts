import { LinkedList } from './linked-list'

describe('Test LinkedList prepend()', () => {

  it('Should_PrependNewNode_WhenHasNoHead', () => {
    const ll = new LinkedList()
    ll.prepend('head')

    expect(ll.head?.value).toBe('head')
    expect(ll.tail).toBe(undefined)
  })

  it('Should_PrependNewNode_WhenHasHead', () => {
    const ll = new LinkedList()
    ll.prepend('head')
    ll.prepend('newHead')

    expect(ll.head?.value).toBe('newHead')
    expect(ll.head?.next?.value).toBe('head')
    expect(ll.tail?.value).toBe('head')
    expect(ll.tail?.prev?.value).toBe('newHead')
  })

})

describe('Test LinkedList append()', () => {

  it('Should_AppendNewNode_WhenHasNoHead', () => {
    const ll = new LinkedList()
    ll.append('head')

    expect(ll.head?.value).toBe('head')
    expect(ll.tail).toBe(undefined)
  })

  it('Should_AppendNewNode_WhenHasHead&NoTail', () => {
    const ll = new LinkedList()
    ll.append('head')
    ll.append('tail')

    expect(ll.head?.value).toBe('head')
    expect(ll.tail?.value).toBe('tail')
    expect(ll.head?.next).toBe(ll.tail)
  })

  it('Should_AppendNewNode_WhenHasHead&Tail', () => {
    const ll = new LinkedList()
    ll.append('head')
    ll.append('tail')

    ll.append('tail1')
    expect(ll.head?.next?.value).toBe('tail')
    expect(ll.tail?.prev?.value).toBe('tail')
    expect(ll.tail?.next?.value).toBe(undefined)
    expect(ll.tail?.value).toBe('tail1')

    ll.append('tail2')
    expect(ll.head?.next?.value).toBe('tail')
    expect(ll.head?.next?.next?.value).toBe('tail1')
    expect(ll.tail?.value).toBe('tail2')
    expect(ll.tail?.prev?.value).toBe('tail1')
  })

})

describe('Test LinkedList toArray()', () => {

  it('Should_ToEmptyArray_WhenNoHead', () => {
    const ll = new LinkedList()
    const nodes = ll.toArray()
    expect(nodes.length).toBe(0)
  })

  it('Should_ToArray_WhenHasOnlyHeadAndTail', () => {
    const ll = new LinkedList()
    ll.append('head')
    ll.append('tail')

    const nodes = ll.toArray()
    expect(nodes.length).toBe(2)
    expect(nodes[0]?.value).toBe('head')
    expect(nodes[1]?.value).toBe('tail')
  })

  it('Should_ToArray_WhenHasOnHeadAndTail', () => {
    const ll = new LinkedList()
    ll.append('head')
    ll.append('tail')
    ll.append('tail1')
    ll.append('tail2')
    ll.append('tail3')

    const nodeValues = ll.toArray().map(node => node.value)
    expect(nodeValues.length).toBe(5)
    expect(nodeValues).toEqual(expect.arrayContaining(['head', 'tail', 'tail1', 'tail2', 'tail3']))
  })

})
