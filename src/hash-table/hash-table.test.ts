import { HashTable } from './hash-table'

describe('Test HashTable get() & set()', () => {

  it('Should_CreateNewHashNode_WhenSetNewValue', () => {
    const hashTable = new HashTable()
    expect(hashTable.get('name')).toBe(undefined)

    hashTable.set('name', 'Robert')
    hashTable.set('gender', 'Male')

    const name = hashTable.get('name')
    const gender = hashTable.get('gender')
    expect(name).toBe('Robert')
    expect(gender).toBe('Male')

    const nameHashKey = hashTable.hashKeys['name']
    const genderHashKey = hashTable.hashKeys['gender']

    const nameLL = hashTable.hashArray[nameHashKey]
    const genderLL = hashTable.hashArray[genderHashKey]
    expect(nameLL?.head?.value).toBe('name')
    expect(nameLL?.head?.data).toBe('Robert')
    expect(genderLL?.head?.value).toBe('gender')
    expect(genderLL?.head?.data).toBe('Male')
  })

  it('Should_OverrideNewValue_WhenSetTheSameKey', () => {
    const hashTable = new HashTable()
    hashTable.set('name', 'Robert')

    const name = hashTable.get('name')
    expect(name).toBe('Robert')

    hashTable.set('name', 'John')
    const newName = hashTable.get('name')
    expect(newName).toBe('John')

    const nameHashKey = hashTable.hashKeys['name']
    const nameLL = hashTable.hashArray[nameHashKey]
    expect(nameLL?.head?.value).toBe('name')
    expect(nameLL?.head?.data).toBe('John')
    expect(nameLL?.head?.next).toBe(undefined)
  })

  it('Should_AppendNewNode_WhenCollision', () => {
    const hashTable = new HashTable()
    hashTable.set('a', 'b')
    hashTable.set('azf', 'bb')

    hashTable.set('d', 'e')
    hashTable.set('dzf', 'ee')

    const aValue = hashTable.get('a')
    const azfValue = hashTable.get('azf')
    expect(aValue).toBe('b')
    expect(azfValue).toBe('bb')

    const dValue = hashTable.get('d')
    const dzfValue = hashTable.get('dzf')
    expect(dValue).toBe('e')
    expect(dzfValue).toBe('ee')

    const aHashKey = hashTable.hashKeys['a']
    const azfHashKey = hashTable.hashKeys['azf']
    expect(aHashKey).toBe(azfHashKey)

    const dHashKey = hashTable.hashKeys['d']
    const dzfHashKey = hashTable.hashKeys['dzf']
    expect(dHashKey).toBe(dzfHashKey)

    const aLL = hashTable.hashArray[aHashKey]
    expect(aLL?.head?.value).toBe('a')
    expect(aLL?.head?.next.value).toBe('azf')
    expect(aLL?.head?.next.data).toBe('bb')

    const dLL = hashTable.hashArray[dHashKey]
    expect(dLL?.head?.value).toBe('d')
    expect(dLL?.head?.next.value).toBe('dzf')
    expect(dLL?.head?.next.data).toBe('ee')
  })

})
