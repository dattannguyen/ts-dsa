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

describe('Test union()', () => {

  it('Should_ReturnDoNothing_WhenGivenTwoSameSet', () => {
    const disjointSet = new DisjointSet<string>((first, second) => first.value < second.value)
    disjointSet.makeSet('A')
    disjointSet.makeSet('B')
    expect(disjointSet.items.size).toBe(2)

    disjointSet.union('A', 'B')
    const representativeA = disjointSet.find('A')
    expect(representativeA.value).toBe('A')

    const representativeB = disjointSet.find('B')
    expect(representativeB.value).toBe('A')
  })

  it('Should_ReturnUnion_WhenGivenExpectedValue', () => {
    const disjointSet = new DisjointSet<string>((first, second) => first.value < second.value)
    disjointSet.makeSet('A')
    disjointSet.makeSet('B')
    disjointSet.makeSet('C')

    expect(disjointSet.isInSameSet('A', 'B')).toBeFalsy()
    expect(disjointSet.isInSameSet('A', 'C')).toBeFalsy()
    expect(disjointSet.isInSameSet('B', 'C')).toBeFalsy()

    disjointSet.union('A', 'B')
    expect(disjointSet.find('A').value).toBe('A')
    expect(disjointSet.find('B').value).toBe('A')
    expect(disjointSet.isInSameSet('A', 'B')).toBeTruthy()
    expect(disjointSet.isInSameSet('B', 'C')).toBeFalsy()

    disjointSet.union('B', 'C')
    expect(disjointSet.find('A').value).toBe('A')
    expect(disjointSet.find('B').value).toBe('A')
    expect(disjointSet.find('C').value).toBe('A')
    expect(disjointSet.isInSameSet('A', 'B')).toBeTruthy()
    expect(disjointSet.isInSameSet('A', 'C')).toBeTruthy()
    expect(disjointSet.isInSameSet('B', 'C')).toBeTruthy()

    const representativeA = disjointSet.find('A')
    expect(representativeA.value).toBe('A')
    expect(representativeA.root.value).toBe('A')
    expect(representativeA.totalChildren).toBe(2)

    const representativeB = disjointSet.find('B')
    expect(representativeB.value).toBe('A')
    expect(representativeB.root?.value).toBe('A')

    const representativeC = disjointSet.find('B')
    expect(representativeC.value).toBe('A')
    expect(representativeC.root?.value).toBe('A')

    disjointSet
        .makeSet('E')
        .makeSet('F')
        .makeSet('G')
        .makeSet('H')
        .makeSet('I')

    disjointSet.union('E', 'F')
    disjointSet.union('F', 'G')
    disjointSet.union('G', 'H')
    disjointSet.union('H', 'I')

    expect(disjointSet.isInSameSet('A', 'I')).toBeFalsy()
    expect(disjointSet.isInSameSet('E', 'I')).toBeTruthy()

    disjointSet.union('I', 'C')
    expect(disjointSet.find('I').value).toBe('A')
    expect(disjointSet.find('I').totalChildren).toBe(7)
    expect(disjointSet.isInSameSet('A', 'I')).toBeTruthy()
  })

  it('Should_ReturnUnion_WhenGivenCustomRankAndHash', () => {
    const disjointSet = new DisjointSet<{ name: string, count: number }>(
        (first, second) => first.value.count < second.value.count,
        (item) => `${item.value.name}_${item.value.count}`
    )

    const jack = { name: 'Jack', count: 1 }
    const jill = { name: 'Jill', count: 2 }
    const jeff = { name: 'Jeff', count: 3 }

    disjointSet
        .makeSet(jack)
        .makeSet(jill)
        .makeSet(jeff)

    expect(disjointSet.items.has('Jack_1')).toBeTruthy()
    expect(disjointSet.items.has('Jill_2')).toBeTruthy()
    expect(disjointSet.items.has('Jeff_3')).toBeTruthy()

    disjointSet.union(jack, jack)
    expect(disjointSet.find(jack).value.toString()).toBe(jack.toString())
    expect(disjointSet.find(jill).value.toString()).toBe(jill.toString())
    expect(disjointSet.find(jeff).value.toString()).toBe(jeff.toString())

    disjointSet.union(jack, jill)
    expect(disjointSet.find(jack).toString()).toBe(jack.toString())
    expect(disjointSet.find(jill).toString()).toBe(jack.toString())

    disjointSet.union(jack, jeff)
    expect(disjointSet.find(jeff).toString()).toBe(jack.toString())
  })
})