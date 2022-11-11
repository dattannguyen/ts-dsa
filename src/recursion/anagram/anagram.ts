export const generateAnagram = (fullString: string, onGenerated?: () => any): string[] => {
  const memo = new Map()

  const awesomeRecursion = (str: string, prefix: string = ''): string[] => {
    if (str.length <= 1) {
      return [str]
    }

    if (str.length === 2) {
      return str[0] === str[1]
        ? [prefix.concat(str)]
        : [prefix.concat(str), prefix.concat(str[1], str[0])]
    }

    const anagrams = []
    for (let i = 0; i < str.length; i++) {
      const char = str[i]
      const substring = str.slice(0, i).concat(str.slice(i + 1))

      const memoKey = char.concat('_', substring.split('').sort().join(''))
      if (memo.has(memoKey)) {
        continue
      }

      anagrams.push(...awesomeRecursion(substring, prefix.concat(char)))
      onGenerated?.()
      memo.set(memoKey, 1)
    }

    return anagrams
  }

  return awesomeRecursion(fullString)
}