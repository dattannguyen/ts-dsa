import { Graph } from '../graph'
import { GraphVertex } from '../graph-vertex'
import { dfsByStack } from './dfs'

describe('Test dfs()', () => {

  it('Should_PerformDfs_WhenGivenNoExpectedValue', () => {
    const graphOne = new Graph()
    graphOne.connect('a', 'b')
    graphOne.connect('b', 'c')
    graphOne.connect('c', 'g')
    graphOne.connect('a', 'd')
    graphOne.connect('a', 'e')
    graphOne.connect('e', 'f')
    graphOne.connect('f', 'd')
    graphOne.connect('d', 'g')

    const containerOne = []
    const onVisitedOne = jest.fn((vx: GraphVertex) => containerOne.push(vx.value))

    graphOne.dfs(onVisitedOne)
    expect(onVisitedOne).toHaveBeenCalledTimes(7)
    expect(containerOne.join('-')).toBe('a-b-c-g-d-e-f')

    const graphTwo = new Graph()
    graphTwo.connect('alice', 'bob')
    graphTwo.connect('bob', 'fred')
    graphTwo.connect('fred', 'helen')
    graphTwo.connect('helen', 'candy')
    graphTwo.connect('candy', 'alice')
    graphTwo.connect('alice', 'derek')
    graphTwo.connect('derek', 'gina')
    graphTwo.connect('derek', 'elaine')
    graphTwo.connect('elaine', 'alice')
    graphTwo.connect('gina', 'irena')

    const containerTwo = []
    const onVisitedTwo = jest.fn((vx: GraphVertex) => containerTwo.unshift(vx.value))

    graphTwo.dfs(onVisitedTwo)
    expect(onVisitedTwo).toHaveBeenCalledTimes(9)
    expect(containerTwo.join('-')).toBe('elaine-irena-gina-derek-candy-helen-fred-bob-alice')
  })

  it('Should_PerformDfs_WhenGivenExpectedValue', () => {
    const graph = new Graph()
    graph.connect('a', 'b')
    graph.connect('b', 'c')
    graph.connect('c', 'g')
    graph.connect('a', 'd')
    graph.connect('a', 'e')
    graph.connect('e', 'f')
    graph.connect('f', 'd')
    graph.connect('d', 'g')

    const onVisited = jest.fn()
    const vertex = graph.dfs(onVisited, 'g')
    expect(vertex?.value).toBe('g')
    expect(onVisited).toHaveBeenCalledTimes(4)

    onVisited.mockClear()
    const nonExistedVx = graph.dfs(onVisited, 't')
    expect(onVisited).toHaveBeenCalledTimes(7)
    expect(nonExistedVx).toBeFalsy()
  })

})

describe('Test dfsByStack()', () => {
  it('Should_VisitedAllVertexOnce_WhenGivenUndirectedGraph', () => {
    const undirected = new Graph()
        .connect('a', 'b')
        .connect('b', 'c')
        .connect('c', 'd')
        .connect('d', 'e')
        .connect('e', 'a')

    const vertices = []
    const onVisited = jest.fn(vx => vertices.push(vx))
    dfsByStack(undirected, onVisited)

    expect(onVisited).toHaveBeenCalledTimes(vertices.length)
    expect(vertices.length).toBe(undirected.vertices.size)
  })

  it('Should_VisitedVertexOnce_WhenGivenDirectedAndAcyclicGraph', () => {
    const directedGraph = new Graph(true)
        .connect('a', 'b')
        .connect('b', 'c')
        .connect('c', 'd')
        .connect('d', 'e')
        .connect('e', 'f')

    const vertices = []
    const onVisited = jest.fn(vx => vertices.push(vx))
    dfsByStack(directedGraph, onVisited)

    expect(onVisited).toHaveBeenCalledTimes(vertices.length)
    expect(vertices.length).not.toBe(directedGraph.vertices.size)
  })
})