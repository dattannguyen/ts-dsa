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
      if (nodeX.value < nodeY.value) {
        mergedLL.append(nodeX.value)
        nodeX = nodeX.next
        onTraversed?.()
      } else {
        mergedLL.append(nodeY.value)
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
      mergedLL.append(nodeY.value)
      nodeY = nodeY.next
      onTraversed?.()
    }
  }


  return mergedLL
}

export const removeNthNodeFromEndOfList = (ll: SinglyLinkedList, nth: number, onTraversed?: () => any): SinglyLinkedList => {
  if (!ll?.head || nth <= 0) {
    return ll
  }

  if (!ll?.head?.next && nth === 1) {
    return
  }

  const nodeByIndex = new Map()
  let index = 0
  let node = ll.head
  while (node) {
    nodeByIndex.set(index, node)
    onTraversed?.()

    node = node.next
    index++
  }

  const removedIndex = index - nth
  if (removedIndex === 0) {
    ll.deleteHead()
  } else {
    const prev = nodeByIndex.get(removedIndex - 1)
    if (prev) {
      prev.next = nodeByIndex.get(removedIndex + 1)
    }
  }

  return ll
}