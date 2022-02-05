import { useWebShareSetup } from '~/hooks/useWebShare.ts'

describe('useStringWidth', () => {
  let windowSpy

  beforeEach(() => {
    const originalWindow = { ...window }
    // @ts-ignore
    windowSpy = jest.spyOn(global, 'window', 'get')
    windowSpy.mockImplementation(() => ({
      ...originalWindow,
      navigator: {
        ...originalWindow.navigator,
        share: {
          title: 'Test',
          text: 'Test',
          url: 'https://',
        },
      },
    }))
  })

  afterEach(() => {
    windowSpy.mockRestore()
  })

  it('will be falsy', () => {
    expect(useWebShareSetup()).toBeTruthy()
  })
})
