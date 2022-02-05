import { useStringWidth } from '~/hooks/useStringWidth.ts'

describe('useStringWidth', () => {
  test('correctly render', () => {
    expect(useStringWidth('a')).toBe(1)
  })

  test('correctly render', () => {
    expect(useStringWidth('あ')).toBe(2)
  })

  test('correctly render', () => {
    expect(useStringWidth('😄')).toBe(2)
  })

  test('correctly render', () => {
    expect(useStringWidth('👨‍👩‍👧‍👦')).toBe(2)
  })
})
