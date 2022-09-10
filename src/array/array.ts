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