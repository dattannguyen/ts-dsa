import { Queue } from '../../../queue/queue'
import { BinaryTree } from '../binary-tree'

export const bfs = <T = any>(node: BinaryTree<T>, onVisited: (node: BinaryTree<T>) => any) => {
  const queue = new Queue<BinaryTree<T>>()
  queue.enqueue(node)

  while (queue.first()) {
    const node = queue.dequeue()
    onVisited(node)

    if (node.left) {
      queue.enqueue(node.left)
    }

    if (node.right) {
      queue.enqueue(node.right)
    }
  }
}