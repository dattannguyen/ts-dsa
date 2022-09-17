import { DisjointSet } from './disjoint-set'

describe('Test makeSet()', () => {

  it('Should_AddToSet_WhenGivenNewValue', () => {
    const disjointSet = new DisjointSet<number>()
    disjointSet.makeSet(1)

    expect(disjointSet.items.size).toBe(1)
  })

  it('Should_DoNothing_WhenGivenExistedValue', () => {
    const disjointSet = new DisjointSet<number>()
    disjointSet.makeSet(1)
    expect(disjointSet.items.size).toBe(1)

    disjointSet.makeSet(1)
    expect(disjointSet.items.size).toBe(1)
  })

})