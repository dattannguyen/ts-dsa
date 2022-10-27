import { Graph } from './graph'
import { GraphVertex } from './graph-vertex'

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