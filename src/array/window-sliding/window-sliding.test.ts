import {
  findLongestSubstringWithUniqueChar,
  findMaxSumOfAdjacentElementByWindowSliding,
  findMinimumWindowSubstring
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
