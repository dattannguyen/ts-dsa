import { Heap } from './heap'

describe('Test Heap insert()', () => {

  it('Should_InsertInRightOrder_WhenGivenMinHeap', function () {
    const minHeap = new Heap<number>((parent: number, child: number) => parent < child)
    minHeap.insert(1)
    expect(minHeap.size).toBe(1)
    expect(minHeap.peek()).toBe(1)

    minHeap.insert(3)
    minHeap.insert(5)
    expect(minHeap.size).toBe(3)

    const [firstLeftChildIndex, firstRightChildIndex] = [minHeap.getLeftChildIndex(0), minHeap.getRightChildIndex(0)]
    expect(minHeap.get(firstLeftChildIndex)).toBe(3)
    expect(minHeap.get(firstRightChildIndex)).toBe(5)

    minHeap.insert(7)
    expect(minHeap.get(minHeap.size - 1)).toBe(7)
    expect(minHeap.get(minHeap.getParentIndex(minHeap.size - 1))).toBe(3)

    minHeap.insert(2)
    expect(minHeap.get(minHeap.size - 1)).toBe(3)
    expect(minHeap.get(minHeap.getParentIndex(minHeap.size - 1))).toBe(2)

    minHeap.insert(4)
    expect(minHeap.get(minHeap.size - 1)).toBe(5)
    expect(minHeap.get(minHeap.getParentIndex(minHeap.size - 1))).toBe(4)
  })

  it('Should_InsertInRightOrder_WhenGivenMaxHeap', function () {
    const maxHeap = new Heap<number>((parent: number, child: number) => parent > child)
    maxHeap.insert(1)
    expect(maxHeap.size).toBe(1)
    expect(maxHeap.peek()).toBe(1)

    maxHeap.insert(3)
    maxHeap.insert(5)
    expect(maxHeap.size).toBe(3)

    const [firstLeftChildIndex, firstRightChildIndex] = [maxHeap.getLeftChildIndex(0), maxHeap.getRightChildIndex(0)]
    expect(maxHeap.peek()).toBe(5)
    expect(maxHeap.get(firstLeftChildIndex)).toBe(1)
    expect(maxHeap.get(firstRightChildIndex)).toBe(3)

    maxHeap.insert(7)
    expect(maxHeap.get(maxHeap.size - 1)).toBe(1)
    expect(maxHeap.peek()).toBe(7)
    expect(maxHeap.get(maxHeap.getParentIndex(maxHeap.size - 1))).toBe(5)

    maxHeap.insert(2)
    expect(maxHeap.get(maxHeap.size - 1)).toBe(2)
    expect(maxHeap.get(maxHeap.getParentIndex(maxHeap.size - 1))).toBe(5)

    maxHeap.insert(4)
    expect(maxHeap.get(maxHeap.size - 1)).toBe(3)
    expect(maxHeap.get(maxHeap.getParentIndex(maxHeap.size - 1))).toBe(4)
  })

})