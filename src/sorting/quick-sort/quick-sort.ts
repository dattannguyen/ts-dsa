export const quickSort = (numbers: number[], onTraversed?: () => any): number[] => {
  const swap = (first, second) => {
    const temp = numbers[first]
    numbers[first] = numbers[second]
    numbers[second] = temp
  }

  const awesomeRecursion = (from: number, to: number) => {
    const distance = to - from
    if (distance < 1) {
      return
    }

    if (distance === 1) {
      if (numbers[from] > numbers[to]) {
        swap(from, to)
      }

      return
    }

    let pivot = to
    let left = from
    let right = pivot

    while (left < right) {
      onTraversed?.()
      if (numbers[left] <= numbers[pivot]) {
        left++
      } else if (numbers[right] > numbers[pivot]) {
        right--
      } else {
        swap(right, left)
      }
    }

    if (numbers[pivot] < numbers[right]) {
      swap(pivot, right)
    }

    awesomeRecursion(from, right - 1)
    awesomeRecursion(right + 1, pivot)
  }

  awesomeRecursion(0, numbers.length - 1)
  return numbers
}
