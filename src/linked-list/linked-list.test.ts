import { LinkedList } from './linked-list'

describe('Test LinkedList prepend()', () => {

  it('Should_PrependNewNode_WhenHasNoHead', () => {
    const ll = new LinkedList()
    ll.prepend('head')

    expect(ll.head?.value).toBe('head')
    expect(ll.tail).toBe(undefined)
  })

  it('Should_PrependNewNode_WhenHasHead', () => {
    const ll = new LinkedList()
    ll.prepend('head')
    ll.prepend('newHead')

    expect(ll.head?.value).toBe('newHead')
    expect(ll.head?.next?.value).toBe('head')
    expect(ll.tail?.value).toBe('head')
    expect(ll.tail?.prev?.value).toBe('newHead')
  })

})
