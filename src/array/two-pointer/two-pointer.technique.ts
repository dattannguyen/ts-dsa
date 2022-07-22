import { SinglyLinkedList } from '../../linked-list/singly/singly-linked-list'

/**
 * Given a sorted array A (sorted in ascending order), having N integers, find if there exists any pair of elements
 * (A[i], A[j]) such that their sum is equal to X
 */
export const twoSumByTwoPointer = (numbers: number[], sumTarget: number): [number, number] | undefined => {
  const length = numbers.length
  if (length === 0) {
    return
  }

  for (let i = 0, j = length - 1; i < j;) {
    const sum = numbers[i] + numbers[j]
    if (sum === sumTarget) {
      return [i, j]
    } else if (sum < sumTarget) {
      i++
    } else {
      j--
    }
  }

  return
}

/**
 * Given a singly linked list, detect if there is a cycle.
 */
export const detectLinkedListCycleByTwoPointer = (ll: SinglyLinkedList): boolean => {
  if (!ll.head || !ll.tail) {
    return false
  }

  let slowPointer = ll.head
  let fastPointer = ll.head
  while (fastPointer?.next) {
    slowPointer = slowPointer.next
    fastPointer = fastPointer.next.next
    if (fastPointer === slowPointer) {
      return true
    }
  }

  return false
}