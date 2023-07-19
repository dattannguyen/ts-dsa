import { SinglyLinkedList } from './singly-linked-list'

/**
 * Leetcode question: https://leetcode.com/problems/merge-two-sorted-lists/
 */
export const mergeSortedList = (firstLL: SinglyLinkedList, secondLL: SinglyLinkedList, onTraversed?: () => any): SinglyLinkedList => {
  const mergedLL = new SinglyLinkedList()

  let nodeX = firstLL.head
  let nodeY = secondLL?.head

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

/**
 * https://leetcode.com/problems/remove-nth-node-from-end-of-list
 * Creating a hash table to keep track the index of each node.
 * Time: O(n) where n is size of the LL
 * Space: O(n) where n is size of the hash table
 */
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

/**
 * https://leetcode.com/problems/remove-nth-node-from-end-of-list
 * Using two pointer technique as long as the distance between them less than nth
 * Time: O(n) where n is size of the LL, technically i.e O(n + (n - nth)) = O(2n - nth)
 * Space: O(1) because we don't need a hash table to keep track
 */
export const removeNthNodeFromEndOfListUsingTwoPointer = (ll: SinglyLinkedList, nth: number): SinglyLinkedList => {
  if (!ll?.head || nth < 0) {
    return ll
  }

  if (!ll?.head?.next && nth === 1) {
    return
  }

  let fastPointer = 0
  let fastNode = ll.head

  let slowPointer = 0
  let slowNode = ll.head

  while (fastNode) {
    const distance = fastPointer - slowPointer
    if (distance > nth) {
      slowPointer++
      slowNode = slowNode.next
    }

    fastPointer++
    fastNode = fastNode.next
  }

  if (nth === fastPointer) {
    ll.deleteHead()
  } else {
    slowNode.next = slowNode.next?.next
  }

  return ll
}


/**
 * https://leetcode.com/problems/merge-k-sorted-lists/
 * Loop through the list then just merging 2 sorted list one by one
 * Time: O(n^2 * k) where k is the size of the list, n is the largest size of the linked list item.
 */
export const mergeKSortedListByBruteForce = (lls: SinglyLinkedList[], onTraversed?: () => any): SinglyLinkedList => {
  if (lls?.length <= 0) {
    return
  }

  if (lls.length === 1) {
    return lls[0]
  }

  let mergedLL = new SinglyLinkedList()
  for (let ll of lls) {
    mergedLL = mergeSortedList(mergedLL, ll)
  }

  return mergedLL
}

