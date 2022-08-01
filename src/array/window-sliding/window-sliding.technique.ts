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
