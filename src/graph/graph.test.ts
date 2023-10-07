import { Graph } from './graph'
import { hasPath } from './graph.practice'

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

describe('Test hasPath', () => {

  it('Should_ReturnEmpty_WhenGivenNoPathBetweenVertices', () => {
    const first = hasPath({}, 'a', 'b')
    expect(first.length).toBe(0)

    const second = hasPath({ v: [{ name: 'x' }, { name: 'w' }], y: [{ name: 'z' }], w: [], z: [] }, 'v', 'z')
    expect(second.length).toBe(0)

    const third = hasPath(
        {
          f: [{ name: 'g' }, { name: 'i' }],
          g: [{ name: 'h' }],
          i: [{ name: 'g' }, { name: 'k' }],
          j: [{ name: 'i' }],
          h: [],
          k: []
        },
        'f', 'j'
    )
    expect(third.length).toBe(0)
  })

  it('Should_ReturnPath_WhenGivenValidVertices', () => {
    const first = hasPath(
        {
          f: [{ name: 'g' }, { name: 'i' }], g: [{ name: 'h' }],
          i: [{ name: 'h' }, { name: 'k' }], j: [{ name: 'i' }],
          h: [], k: []
        },
        'f', 'k'
    )
    expect(first.join('-')).toBe('f-i-k')

    const second = hasPath(
        {
          f: [{ name: 'g' }, { name: 'i' }], g: [{ name: 'h' }],
          i: [{ name: 'g' }, { name: 'k' }], j: [{ name: 'i' }],
          h: [], k: []
        },
        'i', 'h'
    )
    expect(second.join('-')).toBe('i-g-h')
  })

})