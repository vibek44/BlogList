const { reverse,average }=require('../utils/for_testing')

describe('reverse', () => {

  test('reverse of the walk', () => {
    expect(reverse('walk')).toBe('klaw')
  })
  
  test('reverse of we them', () => {
    expect(reverse('we them')).toBe('meht ew')
  })

})



describe('average', () => {
  test('of one value is value itself', () => {
    expect(average([3])).toBe(3)
  })

  test('of many value is calculated right', () => {
    expect(average([3,5,6,2])).toBe(4)
  })

  test('of empty array is zero', () => {
    expect(average([])).toBe(0)
  })

})  