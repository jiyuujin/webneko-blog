import { createLocalVue, mount } from '@vue/test-utils'

import StripeLink from '~/components/StripeLink.vue'
import { key } from '~/hooks/useAppTheme'

const localVue = createLocalVue()

// Resolved the type error `window.matchMedia is not a function`
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // Deprecated
    removeListener: jest.fn(), // Deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
})

describe('StripeLink', () => {
  let wrapper: any

  const mountFunction = (options: any) => {
    return mount(StripeLink, {
      localVue,
      ...options,
    })
  }

  test('correctly render', () => {
    const provideMock = {
      [key as symbol]: {
        state: {},
      },
    }
    const options = {
      provide: provideMock,
    }
    wrapper = mountFunction(options)
    expect(wrapper.exists()).toBe(true)
  })
})
