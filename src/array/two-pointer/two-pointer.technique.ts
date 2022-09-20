import { SinglyLinkedList } from '../../linked-list/singly/singly-linked-list'

/**
 * A phrase is a palindrome if, after converting all uppercase letters into lowercase letters and removing all
 * non-alphanumeric characters, it reads the same forward and backward. Alphanumeric characters include letters and
 * numbers. Given a string s, return true if it is a palindrome, or false otherwise.
 *
 * Input: s = "A man, a plan, a canal: Panama"
 * Output: true
 * Explanation: "amanaplanacanalpanama" is a palindrome.
 *
 * Input: s = "race a car"
 * Output: false
 * Explanation: "raceacar" is not a palindrome.
 *
 * Input: s = " "
 * Output: true
 * Explanation: s is an empty string "" after removing non-alphanumeric characters.
 * Since an empty string reads the same forward and backward, it is a palindrome.
 *
 * LeetCode question: https://leetcode.com/problems/valid-palindrome/
 */
export const isPalindrome = (string: string): boolean => {
  for (let i = 0, j = string.length - 1; i < j; i++, j--) {
    let iChar = string[i].toLowerCase()
    let jChar = string[j].toLowerCase()

    while (i < j && (iChar < 'a' || iChar > 'z') && (iChar < '0' || iChar > '9')) {
      i++
      iChar = string[i].toLowerCase()
    }

    while (i < j && (jChar < 'a' || jChar > 'z') && (jChar < '0' || jChar > '9')) {
      j--
      jChar = string[j].toLowerCase()
    }

    if (iChar !== jChar) {
      return false
    }
  }

  return true
}

/**
 * Given a sorted array A (sorted in ascending order), having N integers, find if there exists any pair of elements
 * (A[i], A[j]) such that their sum is equal to X
 * Input: numbers = [1, 3, 3, 9, 5, 6], sumTarget = 10
 * Output: [0, 3] because numbers[0] + numbers[3] = 10
 */
export const twoSum = (numbers: number[], sumTarget: number): [number, number] | undefined => {
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

/**
 * Given an array of stock price where each is price on each day. Find maximum profit you can get if applying buy low
 * sell high.
 * Input: stocks = [7, 1, 5, 3, 6, 4]
 * Output: 5 where you buy at stock[1] = 1 and sell at stocks[4] = 6, profit = 6 - 1 = 5
 */
export const findMaxProfitOfStockByTwoPointer = (stocks: number[]): number => {
  const stockLength = stocks.length
  if (stockLength <= 1) {
    return 0
  }


  let profit = 0
  for (let buyPointer = 0, sellPointer = 1; sellPointer < stockLength; sellPointer++) {
    const change = stocks[sellPointer] - stocks[buyPointer]
    if (change < 0) {
      buyPointer = sellPointer
    }

    profit = Math.max(profit, change)
  }

  return profit
}