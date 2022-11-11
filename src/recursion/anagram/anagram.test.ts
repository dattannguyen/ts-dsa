import { generateAnagram } from './anagram'


describe('Test anagram()', () => {

  it('Should_GenerateAllAnagram_WhenGivenRandomUniqueString', () => {
    const first = generateAnagram('abc')
    expect(first.length).toBe(6)
    expect(first.includes('abc')).toBeTruthy()
    expect(first.includes('acb')).toBeTruthy()
    expect(first.includes('bac')).toBeTruthy()
    expect(first.includes('bca')).toBeTruthy()
    expect(first.includes('cba')).toBeTruthy()
    expect(first.includes('cab')).toBeTruthy()

    const second = generateAnagram('xy')
    expect(second.length).toBe(2)
    expect(second.includes('xy')).toBeTruthy()
    expect(second.includes('yx')).toBeTruthy()

    const third = generateAnagram('abcd')
    expect(third.length).toBe(24)
    expect(third.includes('adcb')).toBeTruthy()
    expect(third.includes('bdca')).toBeTruthy()
    expect(third.includes('cbad')).toBeTruthy()
    expect(third.includes('dabc')).toBeTruthy()
  })

  it('Should_GenerateAllAnagram_WhenGivenStringWithDuplicatedChar', () => {
    const onGenerated = jest.fn()

    const first = generateAnagram('aab', onGenerated)
    expect(first.length).toBe(3)
    expect(first.includes('aab')).toBeTruthy()
    expect(first.includes('aba')).toBeTruthy()
    expect(first.includes('baa')).toBeTruthy()
    expect(onGenerated).toHaveBeenCalledTimes(2)

    onGenerated.mockClear()
    const second = generateAnagram('xyxy', onGenerated)
    expect(second.includes('xyxy')).toBeTruthy()
    expect(second.includes('yyxx')).toBeTruthy()
    expect(second.includes('yxyx')).toBeTruthy()
    expect(onGenerated).toHaveBeenCalledTimes(6)
  })
})