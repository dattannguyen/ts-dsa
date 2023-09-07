import { dfs, dfsByStack } from './dfs'
import { BinaryTree } from '../binary-tree'

describe('Test dfs()', () => {

  it('Should_PerformDfsInRightOrder_WhenGivenBinaryTree', () => {
    const root = new BinaryTree(51)
    root.insert(25)
    root.insert(75)
    root.insert(10)
    root.insert(33)
    root.insert(56)
    root.insert(89)

    const onVisited = jest.fn()
    const verify = () => {
      expect(onVisited).toHaveBeenCalledTimes(7)
      expect(onVisited.mock.calls[0][0].value).toBe(51)
      expect(onVisited.mock.calls[1][0].value).toBe(25)
      expect(onVisited.mock.calls[2][0].value).toBe(10)
      expect(onVisited.mock.calls[3][0].value).toBe(33)
      expect(onVisited.mock.calls[4][0].value).toBe(75)
      expect(onVisited.mock.calls[5][0].value).toBe(56)
      expect(onVisited.mock.calls[6][0].value).toBe(89)
    }

    dfs<number>(root, onVisited)
    verify()

    onVisited.mockClear()
    dfsByStack<number>(root, onVisited)
    verify()
  })

})