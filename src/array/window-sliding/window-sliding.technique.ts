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