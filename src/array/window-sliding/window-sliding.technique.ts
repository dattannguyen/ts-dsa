/**
 * Given an array of integers of size ‘n’, Our aim is to calculate the maximum sum of ‘k’ consecutive elements in the
 * array. Input: arr[] = {100, 200, 300, 400}, k = 2 Output: 700
 * **/
export const findMaxSumOfAdjacentElementByWindowSliding = (numbers: number[], kElement: number): number => {
  let max = 0
  const length = numbers.length
  if (length <= 0) {
    return max
  }

  // Return sum of array if kElement is larger than array
  if (kElement >= length) {
    for (let number of numbers) {
      max += number
    }

    return max
  }

  for (let i = 0; i < kElement; i++) {
    max += numbers[i]
  }

  for (let j = kElement; j < length; j++) {
    const temp = max + numbers[j] - numbers[j - kElement]
    max = temp > max ? temp : max
  }

  return max
}

/**
 * Given a string, find the longest substring without repeating chars
 * Input: string = 'abcabcbb'
 * Output: 'abc'
 * **/
export const findLongestSubstringWithUniqueChar = (string: string): string => {
  const strLength = string.length
  if (strLength <= 1) {
    return string
  }

  let result = ''
  let substring = ''
  const positionByChar: Record<string, number> = {}
  const concat = (char: string) => {
    substring = substring.concat(char)
    positionByChar[char] = substring.length - 1
  }

  for (let i = 0; i < strLength; i++) {
    const char = string[i]
    const position = positionByChar[char]

    if (position === undefined) {
      concat(char)
    } else {
      substring = ''
      for (const charKey in positionByChar) {
        positionByChar[charKey] <= position
            ? delete positionByChar[charKey]
            : concat(charKey)
      }

      concat(char)
    }

    result = result.length >= substring.length ? result : substring
  }

  return result
}

/**
 * Given two strings s and t of lengths m and n respectively, return the minimum window substring of s such that every
 * character in t (including duplicates) is included in the window. If there is no such substring, return the empty
 * string "". The testcases will be generated such that the answer is unique.
 * A substring is a contiguous sequence of characters within the string.
 *
 * Input: s = "ADOBECODEBANC", t = "ABC"
 * Output: "BANC"
 * Explanation: The minimum window substring "BANC" includes 'A', 'B', and 'C' from string t.
 *
 * Input: s = "a", t = "a"
 * Output: "a"
 * Explanation: The entire string s is the minimum window.
 *
 * Input: s = "a", t = "aa"
 * Output: ""
 * Explanation: Both 'a's from t must be included in the window.
 * Since the largest window of s only has one 'a', return empty string.
 *
 * LeetCode question: https://leetcode.com/problems/minimum-window-substring/
 */
export const findMinimumWindowSubstring = (string: string, substring: string): string => {
  const hadByChar = new Map()
  const neededByChar = new Map()
  for (let char of substring) {
    neededByChar.set(char, (neededByChar.get(char) || 0) + 1)
  }

  let hadLength = 0
  let neededLength = substring.length
  let fast: number = -1, slow: number = -1

  for (let tempFast = 0, tempSlow = 0; tempFast < string.length; tempFast++) {
    const fastChar = string[tempFast]

    const neededCount = neededByChar.get(fastChar)
    if (!neededCount) {
      continue
    }

    const hadCount = hadByChar.get(fastChar) || 0
    hadByChar.set(fastChar, hadCount + 1)
    if (hadCount + 1 <= neededCount) {
      hadLength += 1
    }

    if (hadLength === neededLength) {
      while (hadLength === neededLength) {
        if (fast - slow === 0 || (fast - slow) > (tempFast - tempSlow)) {
          fast = tempFast
          slow = tempSlow
        }

        const slowChar = string[tempSlow]
        const slowNeededCount = neededByChar.get(slowChar)
        if (slowNeededCount) {
          const slowHadCount = hadByChar.get(slowChar)
          hadByChar.set(slowChar, slowHadCount - 1)
          if (slowHadCount - 1 < slowNeededCount) {
            hadLength -= 1
          }
        }

        tempSlow++
      }
    }
  }

  return string.substring(slow, fast + 1)
}

/**
 * Given two strings s1 and s2, return true if s2 contains a permutation of s1, or false otherwise. In other words,
 * return true if one of s1's permutations is the substring of s2.
 *
 * Input: s1 = "ab", s2 = "eidbaooo"
 * Output: true
 * Explanation: s2 contains one permutation of s1 ("ba").
 *
 * Input: s1 = "ab", s2 = "eidboaoo"
 * Output: false
 *
 * LeetCode question: https://leetcode.com/problems/permutation-in-string/
 */
export const isPermutationInString = (first: string, second: string): boolean => {
  const hadByChar = new Map()
  const neededByChar = new Map()
  for (let char of first) {
    neededByChar.set(char, (neededByChar.get(char) || 0) + 1)
  }

  let neededLength = first.length
  for (let fast = 0, slow = -1; fast < second.length; fast++) {
    const char = second[fast]
    const neededCount = neededByChar.get(char)
    if (!neededCount) {
      hadByChar.clear()
      slow = -1
      continue
    }

    const hadCount = hadByChar.get(char) || 0
    let newHadCount = hadCount + 1
    if (newHadCount <= neededCount) {
      hadByChar.set(char, newHadCount)
      if (slow === -1) {
        slow = fast
      }

    } else {
      while (newHadCount > neededCount && slow <= fast) {
        const slowChar = second[slow]
        char === slowChar
            ? newHadCount--
            : hadByChar.set(slowChar, hadByChar.get(slowChar) - 1)

        slow++
      }
    }

    if ((fast - slow + 1) === neededLength) {
      return true
    }
  }

  return false
}


/**
 * You are given an array of integers nums, there is a sliding window of size k which is moving from the very left of
 * the array to the very right. You can only see the k numbers in the window. Each time the sliding window moves right
 * by one position. Return the max sliding window.
 *
 * Input: nums = [1, 3, -1, -3, 5, 3, 6, 7], k = 3
 * Output: [3, 3, 5, 5, 6, 7], combine all max values of each window
 * Explanation:
 * Window position                Max
 * ---------------               -----
 * [1  3  -1] -3  5  3  6  7       3
 *  1 [3  -1  -3] 5  3  6  7       3
 *  1  3 [-1  -3  5] 3  6  7       5
 *  1  3  -1 [-3  5  3] 6  7       5
 *  1  3  -1  -3 [5  3  6] 7       6
 *  1  3  -1  -3  5 [3  6  7]      7
 *
 * Input: nums = [1], k = 1
 * Output: [1]
 *
 * LeetCode question: https://leetcode.com/problems/sliding-window-maximum/
 *
 */
export const findMaxSlidingWindow = (numbers: number[], k: number): number[] => {

  class DequeNode {
    constructor(
        readonly value: number,
        readonly index: number,
        public _next?: DequeNode,
        public _prev?: DequeNode
    ) {
    }
  }

  class Deque {

    private size = 0
    private tail?: DequeNode

    constructor(private head: DequeNode, private windowSize: number) {
      this.size++
    }

    getMax(): number {
      return this.head?.value
    }

    getMin(): number {
      return this.tail?.value !== undefined
          ? this.tail.value
          : this.head?.value
    }

    pop() {
      if (this.size === 1) {
        delete this.head
        this.size = 0
        return
      }

      if (this.size === 2) {
        delete this.tail
        this.size = 1
        return
      }

      this.tail = this.tail?._prev
      this.tail._next = undefined
      this.size--
    }

    popHead() {
      this.head = this.head?._next
      this.head._prev = undefined

      if (this.size === 2) {
        this.tail = undefined
      }

      this.size--
    }

    append(node: DequeNode) {
      while (this.getMin() !== undefined && this.getMin() <= node.value) {
        this.pop()
      }

      if (!this.head) {
        this.head = node
      } else if (!this.tail) {
        this.tail = node
        this.tail._prev = this.head
        this.head._next = this.tail
      } else {
        node._prev = this.tail
        this.tail._next = node
        this.tail = node
      }

      this.size++
      while ((this.tail?.index - this.head.index + 1) > this.windowSize) {
        this.popHead()
      }
    }
  }

  let deque
  let result = []

  let i = 0
  while (i < k) {
    const node = new DequeNode(numbers[i], i)
    if (!deque) {
      deque = new Deque(node, k)
    } else {
      deque.append(node)
    }

    i++
  }

  result.push(deque.getMax())
  while (i < numbers.length) {
    const value = numbers[i]
    const node = new DequeNode(value, i)
    deque.append(node)

    result.push(deque.getMax())
    i++
  }

  return result

}