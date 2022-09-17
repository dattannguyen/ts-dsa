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

describe('Test find()', () => {

  it('Should_ReturnNil_WhenGivenNonExistentValue', () => {
    const disjointSet = new DisjointSet<number>()
    const representative = disjointSet.find(1)

    expect(representative).toBeFalsy()
  })

  it('Should_ReturnRepresentative_WhenGivenRepresentativeItself', () => {
    const disjointSet = new DisjointSet<number>()
    disjointSet.makeSet(1)

    const representative = disjointSet.find(1)
    expect(representative.value).toBe(1)
  })

  it('Should_ReturnRepresentative_WhenGivenChildSet', () => {
    const disjointSet = new DisjointSet<number>()
    disjointSet.makeSet(1)
    disjointSet.makeSet(2)
    disjointSet.union(1, 2)

    const representativeOfTwo = disjointSet.find(2)
    expect(representativeOfTwo.value).toBe(2)
  })

})