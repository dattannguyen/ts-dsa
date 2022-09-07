import {
  findLongestRepeatingCharacterReplacement,
  findLongestSubstringWithUniqueChar,
  findMaxSlidingWindowByArrayDeque,
  findMaxSlidingWindowByLinkedListDeque,
  findMaxSumOfAdjacentElementByWindowSliding,
  findMinimumWindowSubstring,
  isPermutationInString
} from './window-sliding.technique'

describe('Test findMaxSumOfAdjacentElementByWindowSliding()', () => {

  it('Should_ReturnZero_WhenGivenEmptyArray', () => {
    const max = findMaxSumOfAdjacentElementByWindowSliding([], 10)
    expect(max).toBe(0)
  })

  it('Should_ReturnSumOfArray_WhenGivenKElementLargerOrEqualArrayLength', () => {
    const max = findMaxSumOfAdjacentElementByWindowSliding([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 10)
    expect(max).toBe(55)
  })

  it('Should_ReturnExpectedMaxSum_WhenGivenKElementLessThanArrayLength', () => {
    const maxIsThirtyNine = findMaxSumOfAdjacentElementByWindowSliding([1, 4, 2, 10, 23, 3, 1, 0, 20], 4)
    expect(maxIsThirtyNine).toBe(39)

    const maxIsThirtyThree = findMaxSumOfAdjacentElementByWindowSliding([4, 2, 10, 23], 2)
    expect(maxIsThirtyThree).toBe(33)
  })

})

describe('Test findLongestSubstringWithUniqueChar()', () => {

  it('Should_ReturnEmptyOrOneLengthString_WhenGivenInputString', () => {
    const emptyStr = findLongestSubstringWithUniqueChar('')
    expect(emptyStr).toBe('')

    const oneLengthStr = findLongestSubstringWithUniqueChar('g')
    expect(oneLengthStr).toBe('g')
  })

  it('Should_ReturnUniqueCharSubstring_WhenString', () => {
    const firstSubstr = findLongestSubstringWithUniqueChar('abcabcbb')
    expect(firstSubstr).toBe('abc')

    const secondSubstr = findLongestSubstringWithUniqueChar('bbbbb')
    expect(secondSubstr).toBe('b')

    const thirdSubstr = findLongestSubstringWithUniqueChar('pwwkew')
    expect(thirdSubstr).toBe('wke')

    const fourthStr = findLongestSubstringWithUniqueChar('aab')
    expect(fourthStr).toBe('ab')

    const fifthStr = findLongestSubstringWithUniqueChar('dvdf')
    expect(fifthStr).toBe('vdf')

    const sixthStr = findLongestSubstringWithUniqueChar('tmmzuxt')
    expect(sixthStr).toBe('mzuxt')

    const seventhStr = findLongestSubstringWithUniqueChar('ohvhjdml')
    expect(seventhStr).toBe('vhjdml')

  })

})

describe('Test findMinimumWindowSubstring()', () => {

  it('Should_ReturnEmptyString_WhenNoSubstringMatch', () => {
    const emptyStr = findMinimumWindowSubstring('abcxya', 'def')
    expect(emptyStr).toBe('')

    const nextEmptyStr = findMinimumWindowSubstring('aaa', 'aaaa')
    expect(nextEmptyStr).toBe('')
  })

  it('Should_ReturnExpectedMinimumWindowSubstring_WhenGivenParam', () => {
    const firstSubstr = findMinimumWindowSubstring('ADOBECODEBANC', 'ABC')
    expect(firstSubstr).toBe('BANC')

    const secondSubstr = findMinimumWindowSubstring('a', 'a')
    expect(secondSubstr).toBe('a')

    const thirdSubstr = findMinimumWindowSubstring('rtyuiopoiuytghvbn', 'igh')
    expect(thirdSubstr).toBe('iuytgh')

    const fourthSubstr = findMinimumWindowSubstring('ab', 'b')
    expect(fourthSubstr).toBe('b')
  })

})

describe('Test isPermutationInString()', () => {

  it('Should_ReturnTrue_WhenHasPermutation', () => {
    const firstTrue = isPermutationInString('ab', 'eidbaooo')
    expect(firstTrue).toBeTruthy()

    const secondTrue = isPermutationInString('a', 'a')
    expect(secondTrue).toBeTruthy()

    const thirdTrue = isPermutationInString('lhlf', 'ahsdlfhl')
    expect(thirdTrue).toBeTruthy()

    const fourthTrue = isPermutationInString('aabb', 'abcabab')
    expect(fourthTrue).toBeTruthy()

    const fifTrue = isPermutationInString('abc', 'cba')
    expect(fifTrue).toBeTruthy()

    const sixthTrue = isPermutationInString('hello', 'ooollelhoooleh')
    expect(sixthTrue).toBeTruthy()

    const eighthTrue = isPermutationInString('adc', 'dcda')
    expect(eighthTrue).toBeTruthy()
  })

  it('Should_ReturnFalse_WhenNoPermutation', () => {
    const firstFalse = isPermutationInString('false', 'aaaaaaaaa')
    expect(firstFalse).toBeFalsy()

    const secondFalse = isPermutationInString('true', 'trufe')
    expect(secondFalse).toBeFalsy()

    const thirdFalse = isPermutationInString('ab', 'eidboaoo')
    expect(thirdFalse).toBeFalsy()

    const fourthFalse = isPermutationInString('hello', 'ooolleoooleh')
    expect(fourthFalse).toBeFalsy()
  })

})

describe('Test findMaxSlidingWindow()', () => {

  it('Should_ReturnExpectedMaxSlidingWindowByLinkedListDeque_WhenGivenParam', () => {
    const firstWindow = findMaxSlidingWindowByLinkedListDeque([1, 3, -1, -3, 5, 3, 6, 7], 3)
    expect(firstWindow.toString()).toBe([3, 3, 5, 5, 6, 7].toString())

    const secondWindow = findMaxSlidingWindowByLinkedListDeque([1], 1)
    expect(secondWindow.toString()).toBe([1].toString())

    const thirdWindow = findMaxSlidingWindowByLinkedListDeque([1, -1], 1)
    expect(thirdWindow.toString()).toBe([1, -1].toString())

    const fourthWindow = findMaxSlidingWindowByLinkedListDeque([3, 1, 1, 1, 2], 3)
    expect(fourthWindow.toString()).toBe([3, 1, 2].toString())

    const fifWindow = findMaxSlidingWindowByLinkedListDeque([-6, -10, -7, -1, -9, 9, -8, -4, 10, -5, 2, 9, 0, -7, 7, 4, -2, -10, 8, 7], 7)
    expect(fifWindow.toString()).toBe([9, 9, 10, 10, 10, 10, 10, 10, 10, 9, 9, 9, 8, 8].toString())

    const sixthWindow = findMaxSlidingWindowByLinkedListDeque([1, 3, 1, 2, 0, 5], 3)
    expect(sixthWindow.toString()).toBe([3, 3, 2, 5].toString())
  })

  it('Should_ReturnExpectedMaxSlidingWindowByArrayDeque_WhenGivenParam', () => {
    const firstWindow = findMaxSlidingWindowByArrayDeque([1, 3, -1, -3, 5, 3, 6, 7], 3)
    expect(firstWindow.toString()).toBe([3, 3, 5, 5, 6, 7].toString())

    const secondWindow = findMaxSlidingWindowByArrayDeque([1], 1)
    expect(secondWindow.toString()).toBe([1].toString())

    const thirdWindow = findMaxSlidingWindowByArrayDeque([1, -1], 1)
    expect(thirdWindow.toString()).toBe([1, -1].toString())

    const fourthWindow = findMaxSlidingWindowByArrayDeque([3, 1, 1, 1, 2], 3)
    expect(fourthWindow.toString()).toBe([3, 1, 2].toString())

    const fifWindow = findMaxSlidingWindowByArrayDeque([-6, -10, -7, -1, -9, 9, -8, -4, 10, -5, 2, 9, 0, -7, 7, 4, -2, -10, 8, 7], 7)
    expect(fifWindow.toString()).toBe([9, 9, 10, 10, 10, 10, 10, 10, 10, 9, 9, 9, 8, 8].toString())

    const sixthWindow = findMaxSlidingWindowByArrayDeque([1, 3, 1, 2, 0, 5], 3)
    expect(sixthWindow.toString()).toBe([3, 3, 2, 5].toString())
  })

})

describe('Test findLongestRepeatingReplacement()', () => {

  it('Should_findLongestRepeatingReplacement_WhenGivenParam', () => {
    const firstLength = findLongestRepeatingCharacterReplacement('ABAB', 2)
    expect(firstLength).toBe(4)

    const secondLength = findLongestRepeatingCharacterReplacement('AABABBA', 1)
    expect(secondLength).toBe(4)

    const thirdLength = findLongestRepeatingCharacterReplacement('ABBB', 2)
    expect(thirdLength).toBe(4)

    const fourthLength = findLongestRepeatingCharacterReplacement('ABAA', 0)
    expect(fourthLength).toBe(2)

    const fifLength = findLongestRepeatingCharacterReplacement('KRSCDCSONAJNHLBMDQGIFCPEKPOHQIHLTDIQGEKLRLCQNBOHNDQGHJPNDQPERNFSSSRDEQLFPCCCARFMDLHADJADAGNNSBNCJQOF', 4)
    expect(fifLength).toBe(7)
  })
})
