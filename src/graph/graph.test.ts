import { Graph } from './graph'
import { GraphVertex } from './graph-vertex'

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

describe('Test connect()', () => {

  it('Should_ConnectVertex_WhenGivenUndirectedGraph', () => {
    const undirectedGraph = new Graph(false)
    undirectedGraph.connect('alice', 'derek', 1)
    undirectedGraph.connect('derek', 'gina', 2)
    undirectedGraph.connect('derek', 'elaine', 3)
    undirectedGraph.connect('elaine', 'alice', 5)

    const aliceVx = undirectedGraph.getVertex('alice')
    expect(aliceVx).toBeTruthy()

    const derekVx = undirectedGraph.getVertex('derek')
    expect(derekVx).toBeTruthy()

    const ginaVx = undirectedGraph.getVertex('gina')
    expect(ginaVx).toBeTruthy()

    const elaineVx = undirectedGraph.getVertex('elaine')
    expect(elaineVx).toBeTruthy()

    const aliceDerekEdge = aliceVx.getEdge(derekVx)
    expect(aliceDerekEdge).toBeTruthy()
    expect(aliceDerekEdge.weight).toBe(1)

    const derekAliceEdge = derekVx.getEdge(aliceVx)
    expect(derekAliceEdge).toBeTruthy()
    expect(derekAliceEdge.weight).toBe(1)

    const derekElaineEdge = derekVx.getEdge(elaineVx)
    expect(derekElaineEdge).toBeTruthy()
    expect(derekElaineEdge.weight).toBe(3)
    expect(elaineVx.getEdge(derekVx)).toBeTruthy()

    const derekGinaEdge = derekVx.getEdge(ginaVx)
    expect(derekGinaEdge).toBeTruthy()
    expect(derekGinaEdge.weight).toBe(2)
    expect(ginaVx.getEdge(derekVx)).toBeTruthy()
    expect(ginaVx.getEdge(aliceVx)).toBeFalsy()

    const elaineAliceEdge = elaineVx.getEdge(aliceVx)
    expect(elaineAliceEdge).toBeTruthy()
    expect(elaineAliceEdge.weight).toBe(5)
    expect(aliceVx.getEdge(elaineVx)).toBeTruthy()

  })

  it('Should_ConnectVertex_WhenGivenDirectedGraph', () => {
    const directedGraph = new Graph()
    directedGraph.connect('alice', 'bob', 1)
    directedGraph.connect('bob', 'fred', 2)
    directedGraph.connect('fred', 'helen', 3)
    directedGraph.connect('helen', 'candy', 5)
    directedGraph.connect('candy', 'alice', 6)

    const aliceVx = directedGraph.getVertex('alice')
    expect(aliceVx).toBeTruthy()

    const bobVx = directedGraph.getVertex('bob')
    expect(bobVx).toBeTruthy()

    const fredVx = directedGraph.getVertex('fred')
    expect(fredVx).toBeTruthy()

    const helenVx = directedGraph.getVertex('helen')
    expect(helenVx).toBeTruthy()

    const candyVx = directedGraph.getVertex('candy')
    expect(candyVx).toBeTruthy()

    const aliceBobEdge = aliceVx.getEdge(bobVx)
    expect(aliceBobEdge).toBeTruthy()
    expect(aliceBobEdge.weight).toBe(1)
    expect(bobVx.getEdge(aliceVx)).toBeFalsy()

    const bobFredEdge = bobVx.getEdge(fredVx)
    expect(bobFredEdge).toBeTruthy()
    expect(bobFredEdge.weight).toBe(2)
    expect(fredVx.getEdge(bobVx)).toBeFalsy()

    const fredHelenEdge = fredVx.getEdge(helenVx)
    expect(fredHelenEdge).toBeTruthy()
    expect(fredHelenEdge.weight).toBe(3)
    expect(helenVx.getEdge(fredVx)).toBeFalsy()

    const helenCandyVx = helenVx.getEdge(candyVx)
    expect(helenCandyVx).toBeTruthy()
    expect(helenCandyVx.weight).toBe(5)
    expect(candyVx.getEdge(helenVx)).toBeFalsy()

    const candyAliceEdge = candyVx.getEdge(aliceVx)
    expect(candyAliceEdge).toBeTruthy()
    expect(candyAliceEdge.weight).toBe(6)
    expect(aliceVx.getEdge(candyVx)).toBeFalsy()


    expect(helenVx.getEdge(aliceVx)).toBeFalsy()
    expect(aliceVx.getEdge(fredVx)).toBeFalsy()
  })

})