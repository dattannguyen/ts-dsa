import { Graph } from '../graph'
import { topologicalSortByDfs, topologicalSortByKahnAlg } from './topological-sort'
import { GraphVertex } from '../graph-vertex'

describe('Test topologicalSort()', () => {

  const directedGraphOne = new Graph()
  directedGraphOne.connect('A', 'C')
  directedGraphOne.connect('B', 'C')
  directedGraphOne.connect('B', 'E')
  directedGraphOne.connect('C', 'D')
  directedGraphOne.connect('D', 'F')
  directedGraphOne.connect('E', 'F')
  directedGraphOne.connect('F', 'G')

  const directedGraphTwo = new Graph()
  directedGraphTwo.connect('aa', 'cc')
  directedGraphTwo.connect('bb', 'cc')
  directedGraphTwo.connect('bb', 'dd')
  directedGraphTwo.connect('cc', 'ee')
  directedGraphTwo.connect('dd', 'ff')
  directedGraphTwo.connect('ee', 'ff')
  directedGraphTwo.connect('ee', 'hh')
  directedGraphTwo.connect('ff', 'gg')

  const graphOneTestRunner = (orderedVertices: GraphVertex[]) => {
    expect(orderedVertices).toBeTruthy()

    const aVx = orderedVertices.findIndex(vx => vx.key === 'A')
    const cVx = orderedVertices.findIndex(vx => vx.key === 'C')
    const dVx = orderedVertices.findIndex(vx => vx.key === 'D')
    const fVx = orderedVertices.findIndex(vx => vx.key === 'F')
    const gVx = orderedVertices.findIndex(vx => vx.key === 'G')

    expect(aVx < cVx).toBeTruthy()
    expect(cVx < dVx).toBeTruthy()
    expect(dVx < fVx).toBeTruthy()
    expect(fVx < gVx).toBeTruthy()

    const bVx = orderedVertices.findIndex(vx => vx.key === 'B')
    const eVx = orderedVertices.findIndex(vx => vx.key === 'E')

    expect(bVx < eVx).toBeTruthy()
    expect(bVx < cVx).toBeTruthy()
    expect(bVx < dVx).toBeTruthy()
    expect(eVx < fVx).toBeTruthy()
  }

  const graphTwoTestRunner = (orderedVertices: GraphVertex[]) => {
    expect(orderedVertices).toBeTruthy()

    const aaVx = orderedVertices.findIndex(vx => vx.key === 'aa')
    const ccVx = orderedVertices.findIndex(vx => vx.key === 'cc')
    const eeVx = orderedVertices.findIndex(vx => vx.key === 'ee')
    const hhVx = orderedVertices.findIndex(vx => vx.key === 'hh')
    const ffVx = orderedVertices.findIndex(vx => vx.key === 'ff')
    const ggVx = orderedVertices.findIndex(vx => vx.key === 'gg')

    expect(aaVx >= 0).toBeTruthy()
    expect(aaVx < ccVx).toBeTruthy()
    expect(ccVx < eeVx).toBeTruthy()
    expect(eeVx < hhVx).toBeTruthy()
    expect(ffVx < ggVx).toBeTruthy()

    const bbVx = orderedVertices.findIndex(vx => vx.key === 'bb')
    const ddVx = orderedVertices.findIndex(vx => vx.key === 'dd')

    expect(bbVx >= 0).toBeTruthy()
    expect(bbVx < ccVx).toBeTruthy()
    expect(bbVx < ddVx).toBeTruthy()
    expect(ddVx < ffVx).toBeTruthy()
  }

  it('Should_ReturnTopologicalOrderOfVertices_WhenTraverseByDfs', () => {
    const onVisited = jest.fn()

    const firstOrderedVertices = topologicalSortByDfs(directedGraphOne, onVisited)
    expect(onVisited).toHaveBeenCalledTimes(7)
    graphOneTestRunner(firstOrderedVertices)

    onVisited.mockClear()
    const secondOrderedVertices = topologicalSortByDfs(directedGraphTwo, onVisited)
    expect(onVisited).toHaveBeenCalledTimes(8)
    graphTwoTestRunner(secondOrderedVertices)
  })

  it('Should_ReturnTopologicalOrderOfVertices_WhenTraverseByKahnAlg', () => {
    const onVisited = jest.fn()

    const firstOrderedVertices = topologicalSortByKahnAlg(directedGraphOne, onVisited)
    expect(onVisited).toHaveBeenCalledTimes(7)
    graphOneTestRunner(firstOrderedVertices)

    onVisited.mockClear()
    const secondOrderedVertices = topologicalSortByKahnAlg(directedGraphTwo, onVisited)
    expect(onVisited).toHaveBeenCalledTimes(8)
    graphTwoTestRunner(secondOrderedVertices)
  })

})