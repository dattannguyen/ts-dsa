import { graphColoring, hamiltonianPath, subsets } from './backtracking.practice'
import { Graph } from '../../graph/graph'

describe('Test subsets()', () => {

  it('Should_ReturnEmpty_WhenGivenEmptyArray', () => {
    const combinations = subsets([])
    expect(combinations.length).toBe(1)
    expect(combinations[0].toString()).toBe('')
  })

  it('Should_ReturnAllCombinations_WhenGivenListOfNumber', () => {
    const firstNums = [0]
    const firstC = subsets(firstNums)
    expect(firstC.length).toBe(Math.pow(2, firstNums.length))

    const firstFlatC = firstC.map(nums => nums.toString())
    expect(firstFlatC.some(c => c === '')).toBeTruthy()
    expect(firstFlatC.some(c => c === '0')).toBeTruthy()

    const secondNums = [1, 2, 3]
    const secondC = subsets(secondNums)
    expect(secondC.length).toBe(Math.pow(2, secondNums.length))

    const secondFlatC = secondC.map(nums => nums.toString())
    expect(secondFlatC.some(c => c === '')).toBeTruthy()
    expect(secondFlatC.some(c => c === '1')).toBeTruthy()
    expect(secondFlatC.some(c => c === '1,2')).toBeTruthy()
    expect(secondFlatC.some(c => c === '1,2,3')).toBeTruthy()
    expect(secondFlatC.some(c => c === '1,3')).toBeTruthy()
    expect(secondFlatC.some(c => c === '2')).toBeTruthy()
    expect(secondFlatC.some(c => c === '2,3')).toBeTruthy()
    expect(secondFlatC.some(c => c === '3')).toBeTruthy()
  })

})

describe('Test graphColoring()', () => {

  it('Should_ReturnAllCombinations_WhenGivenParameter', () => {
    const colors: string[] = ['R', 'G', 'B']
    const graph = new Graph<string>()
    graph.connect('A', 'B')
    graph.connect('B', 'C')
    graph.connect('C', 'D')
    graph.connect('D', 'A')

    const combinations = graphColoring(graph, colors)
    expect(combinations.length).toBe(96)
  })
})

describe('Test hamiltonianPath', () => {

  it('Should_ReturnHamiltonianPathIfExist_WhenGivenAGraph', () => {
    const graphOne = new Graph<string>()
    graphOne.connect('A', 'B')
    graphOne.connect('B', 'C')
    graphOne.connect('C', 'D')
    graphOne.connect('D', 'A')

    const hamiltonianOne = hamiltonianPath(graphOne)
    expect(hamiltonianPath).toBeTruthy()
    expect(hamiltonianOne.join(',')).toBe('A,B,C,D')

    const graphTwo = new Graph<string>()
    graphTwo.connect('1', '2')
    graphTwo.connect('1', '4')
    graphTwo.connect('2', '3')
    graphTwo.connect('2', '4')
    graphTwo.connect('3', '4')
    graphTwo.connect('4', '5')
    graphTwo.connect('5', '3')

    const hamiltonianTwo = hamiltonianPath(graphTwo)
    expect(hamiltonianTwo).toBeFalsy()
  })

})

