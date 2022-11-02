import { Graph } from '../graph'
import { dijkstra } from './dijkstra'

describe('Test dijkstra()', () => {

  it('Should_ReturnShortestPath_WhenGivenMultipleWay', () => {
    const directedGraph = new Graph()
    directedGraph.connect('atlanta', 'boston', 100)
    directedGraph.connect('atlanta', 'denver', 160)
    directedGraph.connect('boston', 'chicago', 120)
    directedGraph.connect('boston', 'denver', 180)
    directedGraph.connect('denver', 'chicago', 40)
    directedGraph.connect('denver', 'elpaso', 140)
    directedGraph.connect('chicago', 'elpaso', 80)
    directedGraph.connect('elpaso', 'boston', 100)

    const directedSrc = directedGraph.getVertex('atlanta')
    const directedDes = directedGraph.getVertex('elpaso')

    expect(directedSrc).toBeTruthy()
    expect(directedSrc.isConnected('boston')).toBeTruthy()
    expect(directedSrc.isConnected('denver')).toBeTruthy()
    expect(directedSrc.isConnected(directedDes.key)).toBeFalsy()

    expect(directedDes).toBeTruthy()
    expect(directedDes.isConnected('boston')).toBeTruthy()
    expect(directedDes.isConnected(directedSrc.key)).toBeFalsy()

    const shortestPathOne = dijkstra(directedSrc, directedDes)
    expect(shortestPathOne.weight).toBe(280)
    expect(shortestPathOne.path.map(vx => vx.key).join(' -> ')).toBe('atlanta -> denver -> chicago -> elpaso')


    const undirectedGraph = new Graph(false)
    undirectedGraph.connect('a', 'b', 4)
    undirectedGraph.connect('a', 'e', 7)
    undirectedGraph.connect('a', 'c', 3)
    undirectedGraph.connect('b', 'c', 6)
    undirectedGraph.connect('b', 'd', 5)
    undirectedGraph.connect('e', 'c', 8)
    undirectedGraph.connect('e', 'd', 2)
    undirectedGraph.connect('d', 'c', 11)
    undirectedGraph.connect('d', 'g', 10)
    undirectedGraph.connect('d', 'f', 2)
    undirectedGraph.connect('f', 'g', 3)
    undirectedGraph.connect('e', 'g', 5)

    const undirectedSrc = undirectedGraph.getVertex('a')
    const undirectedDes = undirectedGraph.getVertex('g')

    expect(undirectedSrc).toBeTruthy()
    expect(undirectedSrc.isConnected('b')).toBeTruthy()
    expect(undirectedSrc.isConnected('c')).toBeTruthy()
    expect(undirectedSrc.isConnected(undirectedDes.key)).toBeFalsy()

    expect(undirectedDes).toBeTruthy()
    expect(undirectedDes.isConnected('e')).toBeTruthy()
    expect(undirectedDes.isConnected('f')).toBeTruthy()
    expect(undirectedDes.isConnected(undirectedSrc.key)).toBeFalsy()

    const shortestPathTwo = dijkstra(undirectedSrc, undirectedDes)
    expect(shortestPathTwo.weight).toBe(12)
    expect(shortestPathTwo.path.map(vx => vx.key).join(' -> ')).toBe('a -> e -> g')

  })

  it('Should_ReturnNil_WhenGivenNoWay', () => {
    const directedGraph = new Graph()
    directedGraph.connect(1, 2, 3)
    directedGraph.connect(1, 3, 3)
    directedGraph.connect(2, 7, 3)
    directedGraph.connect(3, 4, 3)
    directedGraph.connect(3, 5, 3)

    const shortestPathOne = dijkstra(directedGraph.getVertex('2'), directedGraph.getVertex('5'))
    expect(shortestPathOne).toBeFalsy()

    const anotherDirectedGraph = new Graph()
    anotherDirectedGraph.connect('a', 'b', 100)
    anotherDirectedGraph.connect('b', 'c', 120)
    anotherDirectedGraph.connect('b', 'd', 180)
    anotherDirectedGraph.connect('a', 'd', 100)
    anotherDirectedGraph.connect('d', 'e', 140)
    anotherDirectedGraph.connect('d', 'c', 40)

    const shortestPathTwo = dijkstra(anotherDirectedGraph.getVertex('c'), anotherDirectedGraph.getVertex('a'))
    expect(shortestPathTwo).toBeFalsy()

  })

  it('Should_ReturnExpectedPath_WhenGivenCustomWeightComparator', () => {
    const directedGraph = new Graph()
    directedGraph.connect('arizona', 'boston', 100)
    directedGraph.connect('arizona', 'dallas', 160)
    directedGraph.connect('boston', 'chicago', 120)
    directedGraph.connect('boston', 'dallas', 180)
    directedGraph.connect('dallas', 'chicago', 40)
    directedGraph.connect('denver', 'california', 140)
    directedGraph.connect('chicago', 'california', 80)
    directedGraph.connect('california', 'boston', 100)

    const shortestPath = dijkstra(
        directedGraph.getVertex('arizona'),
        directedGraph.getVertex('california'),
    )

    expect(shortestPath).toBeTruthy()
    expect(shortestPath.weight).toBe(280)
    expect(shortestPath.path.map(vx => vx.value).join(' -> ')).toBe('arizona -> dallas -> chicago -> california')

    const longestPath = dijkstra(
        directedGraph.getVertex('arizona'),
        directedGraph.getVertex('california'),
        (currentWeight, nextWeight) => currentWeight <= nextWeight
    )

    expect(longestPath).toBeTruthy()
    expect(longestPath.weight).toBe(400)
    expect(longestPath.path.map(vx => vx.value).join(' -> ')).toBe('arizona -> boston -> dallas -> chicago -> california')

  })


})