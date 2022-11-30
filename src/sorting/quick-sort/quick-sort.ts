const swap = (numbers: number[], firstIndex: number, secondIndex: number) => {
  const temp = numbers[firstIndex]
  numbers[firstIndex] = numbers[secondIndex]
  numbers[secondIndex] = temp
}

const partitioning = (numbers: number[], from: number, to: number, onTraversed?: () => any): number => {
  let pivot = to
  let left = from
  let right = pivot - 1

  while (left < right) {
    onTraversed?.()
    if (numbers[left] < numbers[pivot]) {
      left++
    } else if (numbers[right] > numbers[pivot]) {
      right--
    } else {
      swap(numbers, left, right)
    }
  }

  if (numbers[left] > numbers[pivot]) {
    swap(numbers, left, pivot)
    return left
  }

  return pivot
}

export const quickSort = (numbers: number[], onTraversed?: () => any): number[] => {
  const awesomeRecursion = (from: number, to: number) => {
    const distance = to - from
    if (distance < 1) {
      return
    }

    if (distance === 1) {
      if (numbers[from] > numbers[to]) {
        swap(numbers, from, to)
      }

      return
    }

    const partitioningIndex = partitioning(numbers, from, to, onTraversed)
    if (partitioningIndex === to) {
      awesomeRecursion(from, partitioningIndex - 1)
    } else {
      awesomeRecursion(from, partitioningIndex - 1)
      awesomeRecursion(partitioningIndex + 1, to)
    }
  }

  awesomeRecursion(0, numbers.length - 1)
  return numbers
}

export const quickSelect = (numbers: number[], kth: number, onTraversed?: () => any): number => {
  if (kth > numbers.length - 1) {
    return
  }

  const awesomeRecursion = (from: number, to: number) => {
    const distance = to - from
    if (distance < 1) {
      return
    }

    if (distance === 1) {
      return kth === from
        ? Math.min(numbers[from], numbers[to])
        : Math.max(numbers[from], numbers[to])
    }

    const partitioningIndex = partitioning(numbers, from, to)
    if (kth < partitioningIndex) {
      return awesomeRecursion(from, partitioningIndex - 1)
    } else if (kth > partitioningIndex) {
      return awesomeRecursion(partitioningIndex + 1, to)
    } else {
      return numbers[partitioningIndex]
    }
  }

  return awesomeRecursion(0, numbers.length - 1)
}