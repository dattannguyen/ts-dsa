import { Graph } from './graph'
import { countIsland, hasPath, longestPath, minIsland } from './graph.practice'

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

describe('Test longestPath', () => {

  it('Should_ReturnLongestPath_WhenGivenUndirectedGraph', () => {
    const first = longestPath({})
    expect(first.length).toBe(0)

    const second = longestPath({
      0: [{ name: '8' }, { name: '1' }, { name: '5' }],
      1: [{ name: '0' }],
      5: [{ name: '0' }, { name: '8' }],
      8: [{ name: '0' }, { name: '5' }],
      2: [{ name: '3' }, { name: '4' }],
      3: [{ name: '2' }, { name: '4' }],
      4: [{ name: '3' }, { name: '2' }],
    })

    expect(second.length).toBe(4)
    expect(second.sort((a, b) => Number(a) > Number(b) ? 1 : -1).join('-')).toBe('0-1-5-8')

    const third = longestPath({
      1: [{ name: '2' }],
      2: [{ name: '1' }, { name: '8' }],
      6: [{ name: '7' }],
      9: [{ name: '8' }],
      7: [{ name: '6' }, { name: '8' }],
      8: [{ name: '9' }, { name: '7' }, { name: '2' }]
    })

    expect(third.length).toBe(6)
    expect(third.sort((a, b) => Number(a) > Number(b) ? 1 : -1).join('-')).toBe('1-2-6-7-8-9')

    const fourth = longestPath({
      0: [{ name: '4' }, { name: '7' }],
      1: [],
      2: [],
      3: [{ name: '6' }],
      4: [{ name: '0' }],
      6: [{ name: '3' }],
      7: [{ name: '0' }],
      8: []
    })

    expect(fourth.length).toBe(3)
    expect(fourth.sort((a, b) => Number(a) > Number(b) ? 1 : -1).join('-')).toBe('0-4-7')

  })

})

describe('Test countIsland', () => {
  it('Should_ReturnNumberOfIsland_WhenGivenUndirectedGraphAsMatrix', () => {
    const onCalled = jest.fn()

    const first = countIsland([], onCalled)
    expect(first).toBe(0)
    expect(onCalled).toHaveBeenCalledTimes(0)

    onCalled.mockClear()
    const secondMatrix = [
      ['W', 'L', 'W', 'W', 'W'],
      ['W', 'L', 'W', 'W', 'W'],
      ['W', 'W', 'W', 'L', 'W'],
      ['W', 'W', 'L', 'L', 'W'],
      ['L', 'W', 'W', 'L', 'L'],
      ['L', 'L', 'W', 'W', 'W'],
    ]

    const second = countIsland(secondMatrix, onCalled)
    expect(second).toBe(3)
    expect(onCalled).toHaveBeenCalledTimes(secondMatrix.length * secondMatrix[0].length)

    onCalled.mockClear()
    const thirdMatrix = [
      ['L', 'W', 'W', 'L', 'W'],
      ['L', 'W', 'W', 'L', 'L'],
      ['W', 'L', 'W', 'L', 'W'],
      ['W', 'W', 'W', 'W', 'W'],
      ['W', 'W', 'L', 'L', 'L'],
    ]

    const third = countIsland(thirdMatrix, onCalled)
    expect(third).toBe(4)
    expect(onCalled).toHaveBeenCalledTimes(thirdMatrix.length * thirdMatrix[0].length)

    onCalled.mockClear()
    const fourthMatrix = [['L', 'L', 'L'], ['L', 'L', 'L'], ['L', 'L', 'L']]

    const fourth = countIsland(fourthMatrix, onCalled)
    expect(fourth).toBe(1)
    expect(onCalled).toHaveBeenCalledTimes(fourthMatrix.length * fourthMatrix[0].length)

    const fifth = countIsland([['W', 'W'], ['W', 'W'], ['W', 'W'],])
    expect(fifth).toBe(0)
  })
})

describe('Test minIsland', () => {
  it('Should_ReturnMinIsland_WhenGivenUndirectedGraphAsMatrix', () => {
    const onCalled = jest.fn()

    const first = minIsland([], onCalled)
    expect(first.length).toBe(0)
    expect(onCalled).toHaveBeenCalledTimes(0)

    onCalled.mockClear()
    const secondMatrix = [
      ['W', 'L', 'W', 'W', 'W'],
      ['W', 'L', 'W', 'W', 'W'],
      ['W', 'W', 'W', 'L', 'W'],
      ['W', 'W', 'W', 'L', 'W'],
      ['W', 'W', 'W', 'L', 'L'],
      ['W', 'L', 'W', 'W', 'W'],
    ]

    const second = minIsland(secondMatrix, onCalled)
    expect(second.join(',')).toBe('5_1')
    expect(onCalled).toHaveBeenCalledTimes(secondMatrix.length * secondMatrix[0].length)

    onCalled.mockClear()
    const thirdMatrix = [
      ['L', 'W', 'W', 'L', 'W'],
      ['L', 'W', 'W', 'L', 'L'],
      ['W', 'L', 'W', 'L', 'W'],
      ['W', 'L', 'L', 'W', 'W'],
      ['W', 'W', 'L', 'L', 'L'],
    ]

    const third = minIsland(thirdMatrix, onCalled)
    expect(third.join(',')).toBe('0_0,1_0')
    expect(onCalled).toHaveBeenCalledTimes(thirdMatrix.length * thirdMatrix[0].length)

    onCalled.mockClear()
    const fourthMatrix = [['L', 'L', 'L'], ['L', 'L', 'L'], ['L', 'L', 'L']]

    const fourth = minIsland(fourthMatrix, onCalled)
    expect(fourth.length).toBe(9)
    expect(onCalled).toHaveBeenCalledTimes(fourthMatrix.length * fourthMatrix[0].length)

    onCalled.mockClear()
    const fifthMatrix = [
      ['W', 'W'],
      ['L', 'L'],
      ['W', 'W'],
      ['W', 'L']
    ]

    const fifth = minIsland(fifthMatrix)
    expect(fifth.join(',')).toBe('3_1')
  })
})
