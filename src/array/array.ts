/**
 * Given an array of strings strs, group the anagrams together. You can return the answer in any order. An Anagram is a
 * word or phrase formed by rearranging the letters of a different word or phrase, typically using all the original
 * letters exactly once.
 *
 * Input: strs = ["eat","tea","tan","ate","nat","bat"]
 * Output: [["bat"],["nat","tan"],["ate","eat","tea"]]
 *
 * Input: strs = [""]
 * Output: [[""]]
 *
 * Input: strs = ["a"]
 * Output: [["a"]]
 *
 * LeetCode question: https://leetcode.com/problems/group-anagrams
 */
import { Heap } from '../heap/heap'

export const groupAnagram = (strings: string[]): Array<string[]> => {
  const groupByAnagram: Map<string, string[]> = new Map()
  for (let string of strings) {
    const array = new Array(26).fill(0)
    for (let char of string) {
      const charIndex = char.charCodeAt(0) - 'a'.charCodeAt(0)
      array[charIndex] = array[charIndex] + 1
    }

    const hash = array.toString()
    const anyGroup = groupByAnagram.get(hash) || []
    anyGroup.push(string)
    groupByAnagram.set(hash, anyGroup)
  }

  return Array.from(groupByAnagram.values())
}

/**
 * Given an integer array nums and an integer k, return the k most frequent elements. You may return the answer in any
 * order.
 *
 * Input: nums = [1,1,1,2,2,3], k = 2
 * Output: [1,2]
 *
 * Input: nums = [1], k = 1
 * Output: [1]
 *
 * LeetCode question: https://leetcode.com/problems/top-k-frequent-elements/
 */
export const findTopFrequentElementByHeap = (nums: number[], k: number): number[] => {
  const frequentMap: Map<number, number> = new Map()
  for (let num of nums) {
    frequentMap.set(num, (frequentMap.get(num) || 0) + 1)
  }

  const minHeap = new Heap<number>(
      (first: number, second: number) => (frequentMap.get(first) || 0) < (frequentMap.get(second) || 0)
  )

  frequentMap.forEach((_, num: number) => {
    minHeap.insert(num)
    if (minHeap.size > k) {
      minHeap.poll()
    }
  })


  return minHeap.nodes
}

export const findTopFrequentElementByBucket = (nums: number[], k: number): number[] => {
  const frequentMap: Map<number, number> = new Map()
  const frequentBucket: Map<any, any>[] = new Array(nums.length)

  for (let num of nums) {
    const count = frequentMap.get(num) || 0
    const nextCount = count + 1

    if (frequentBucket[nextCount] === undefined) {
      frequentBucket[nextCount] = new Map()
    }

    frequentMap.set(num, nextCount)
    frequentBucket[count]?.delete(num)
    frequentBucket[nextCount].set(num, nextCount)
  }

  const result = []
  let j = frequentBucket.length - 1
  while (result.length < k && j >= 0) {
    result.push(...(frequentBucket[j]?.keys() || []))
    j--
  }

  return result
}