import { Graph } from '../graph'
import { GraphVertex } from '../graph-vertex'

describe('Test bfs()', () => {

  it('Should_PerformBfs_WhenGivenNoExpectedValue', () => {
    const bfsGraphOne = new Graph()
    bfsGraphOne.connect('a', 'b')
    bfsGraphOne.connect('b', 'c')
    bfsGraphOne.connect('c', 'g')
    bfsGraphOne.connect('a', 'd')
    bfsGraphOne.connect('a', 'e')
    bfsGraphOne.connect('e', 'f')
    bfsGraphOne.connect('f', 'd')
    bfsGraphOne.connect('d', 'g')

    const containerOne = []
    const onVisitedOne = jest.fn((vx: GraphVertex) => containerOne.push(vx.value))

    bfsGraphOne.bfs(onVisitedOne)
    expect(onVisitedOne).toHaveBeenCalledTimes(7)
    expect(containerOne.join('-')).toBe('a-b-d-e-c-g-f')

    const bfsGraphTwo = new Graph()
    bfsGraphTwo.connect('alice', 'bob')
    bfsGraphTwo.connect('bob', 'fred')
    bfsGraphTwo.connect('fred', 'helen')
    bfsGraphTwo.connect('helen', 'candy')
    bfsGraphTwo.connect('candy', 'alice')
    bfsGraphTwo.connect('alice', 'derek')
    bfsGraphTwo.connect('derek', 'gina')
    bfsGraphTwo.connect('derek', 'elaine')
    bfsGraphTwo.connect('elaine', 'alice')
    bfsGraphTwo.connect('gina', 'irena')

    const containerTwo = []
    const onVisitedTwo = jest.fn((vx: GraphVertex) => containerTwo.unshift(vx.value))

    bfsGraphTwo.bfs(onVisitedTwo)
    expect(onVisitedTwo).toHaveBeenCalledTimes(9)
    expect(containerTwo.join(',')).toBe('candy,irena,helen,elaine,gina,fred,derek,bob,alice')

    const bfsDirectedGraph = new Graph()
    bfsDirectedGraph.connect('x', 'y')
    bfsDirectedGraph.connect('y', 'd')
    bfsDirectedGraph.connect('d', 'l')
    bfsDirectedGraph.connect('l', 'x')

    const bfsUndirectedGraph = new Graph(false)
    bfsUndirectedGraph.connect('x', 'y')
    bfsUndirectedGraph.connect('y', 'd')
    bfsUndirectedGraph.connect('d', 'l')
    bfsUndirectedGraph.connect('l', 'x')

    let bfsContainer = []
    const onVisited = jest.fn(vx => bfsContainer.push(vx.value))

    bfsUndirectedGraph.bfs(onVisited)
    expect(onVisited).toHaveBeenCalledTimes(4)
    expect(bfsContainer.join('-')).toBe('x-y-l-d')

    bfsContainer = []
    onVisited.mockClear()
    bfsDirectedGraph.bfs(onVisited)
    expect(onVisited).toHaveBeenCalledTimes(4)
    expect(bfsContainer.join('-')).toBe('x-y-d-l')

  })

  it('Should_PerformBfs_WhenGivenExpectedValue', () => {
    const directedGraph = new Graph()
    directedGraph.connect('x', 'y')
    directedGraph.connect('y', 'd')
    directedGraph.connect('d', 'l')
    directedGraph.connect('l', 'x')

    const undirectedGraph = new Graph(false)
    undirectedGraph.connect('x', 'y')
    undirectedGraph.connect('y', 'd')
    undirectedGraph.connect('d', 'l')
    undirectedGraph.connect('l', 'x')

    const onVisited = jest.fn()

    const undirectedVx = undirectedGraph.bfs(onVisited, 'l')
    expect(onVisited).toHaveBeenCalledTimes(3)
    expect(undirectedVx.value).toBe('l')

    onVisited.mockClear()
    const directedVx = directedGraph.bfs(onVisited, 'l')
    expect(onVisited).toHaveBeenCalledTimes(4)
    expect(directedVx.value).toBe('l')
  })
})