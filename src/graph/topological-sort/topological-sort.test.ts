import { Graph } from '../graph'
import { topologicalSortByDfs } from './topological-sort'

describe('Test byDfs()', () => {

  it('Should_ReturnAnOrder_WhenGivenDAG', () => {
    const directedGraphOne = new Graph()
    directedGraphOne.connect('A', 'C')
    directedGraphOne.connect('B', 'C')
    directedGraphOne.connect('B', 'E')
    directedGraphOne.connect('C', 'D')
    directedGraphOne.connect('D', 'F')
    directedGraphOne.connect('E', 'F')
    directedGraphOne.connect('F', 'G')

    const onVisited = jest.fn()
    const firstOrderedVertices = topologicalSortByDfs(directedGraphOne, onVisited)

    expect(firstOrderedVertices).toBeTruthy()
    expect(onVisited).toHaveBeenCalledTimes(7)

    const aVx = firstOrderedVertices.findIndex(vx => vx.key === 'A')
    const cVx = firstOrderedVertices.findIndex(vx => vx.key === 'C')
    const dVx = firstOrderedVertices.findIndex(vx => vx.key === 'D')
    const fVx = firstOrderedVertices.findIndex(vx => vx.key === 'F')
    const gVx = firstOrderedVertices.findIndex(vx => vx.key === 'G')

    expect(aVx < cVx).toBeTruthy()
    expect(cVx < dVx).toBeTruthy()
    expect(dVx < fVx).toBeTruthy()
    expect(fVx < gVx).toBeTruthy()

    const bVx = firstOrderedVertices.findIndex(vx => vx.key === 'B')
    const eVx = firstOrderedVertices.findIndex(vx => vx.key === 'E')

    expect(bVx < eVx).toBeTruthy()
    expect(bVx < cVx).toBeTruthy()
    expect(bVx < dVx).toBeTruthy()
    expect(eVx < fVx).toBeTruthy()

    const directedGraphTwo = new Graph()
    directedGraphTwo.connect('aa', 'cc')
    directedGraphTwo.connect('bb', 'cc')
    directedGraphTwo.connect('bb', 'dd')
    directedGraphTwo.connect('cc', 'ee')
    directedGraphTwo.connect('dd', 'ff')
    directedGraphTwo.connect('ee', 'ff')
    directedGraphTwo.connect('ee', 'hh')
    directedGraphTwo.connect('ff', 'gg')


    onVisited.mockClear()
    const secondOrderedVertices = topologicalSortByDfs(directedGraphTwo, onVisited)

    expect(secondOrderedVertices).toBeTruthy()
    expect(onVisited).toHaveBeenCalledTimes(8)

    const aaVx = secondOrderedVertices.findIndex(vx => vx.key === 'aa')
    const ccVx = secondOrderedVertices.findIndex(vx => vx.key === 'cc')
    const eeVx = secondOrderedVertices.findIndex(vx => vx.key === 'ee')
    const hhVx = secondOrderedVertices.findIndex(vx => vx.key === 'hh')
    const ffVx = secondOrderedVertices.findIndex(vx => vx.key === 'ff')
    const ggVx = secondOrderedVertices.findIndex(vx => vx.key === 'gg')

    expect(aaVx < ccVx).toBeTruthy()
    expect(ccVx < eeVx).toBeTruthy()
    expect(eeVx < hhVx).toBeTruthy()
    expect(hhVx < ffVx).toBeTruthy()
    expect(ffVx < ggVx).toBeTruthy()

    const bbVx = secondOrderedVertices.findIndex(vx => vx.key === 'bb')
    const ddVx = secondOrderedVertices.findIndex(vx => vx.key === 'dd')

    expect(bbVx < ccVx).toBeTruthy()
    expect(bbVx < ddVx).toBeTruthy()
    expect(ddVx < ffVx).toBeTruthy()
  })

})