import { SinglyLinkedList } from './singly-linked-list'

/**
 * Leetcode question: https://leetcode.com/problems/merge-two-sorted-lists/
 */
export const mergeSortedList = (firstLL: SinglyLinkedList, secondLL: SinglyLinkedList, onTraversed?: () => any): SinglyLinkedList => {
  const mergedLL = new SinglyLinkedList()

  let nodeX = firstLL.head
  let nodeY = secondLL.head

  while (nodeX || nodeY) {
    if (nodeX && nodeY) {
      if (nodeX < nodeY) {
        mergedLL.append(nodeX.value)
        nodeX = nodeX.next
        onTraversed?.()
      } else {
        mergedLL.append(nodeY)
        nodeY = nodeY.next
        onTraversed?.()
      }

      continue
    }

    if (nodeX) {
      mergedLL.append(nodeX.value)
      nodeX = nodeX.next
      onTraversed?.()
    } else {
      mergedLL.append(nodeY)
      nodeY = nodeY.next
      onTraversed?.()
    }
  }


  return mergedLL
}