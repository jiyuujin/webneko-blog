import { mount } from '@vue/test-utils'

import CookieFooterWrapper from '~/components/CookieFooterWrapper.vue'

describe('CookieFooterWrapper', () => {
  test('correctly render', () => {
    const props = {}
    const wrapper = mount(CookieFooterWrapper, {
      propsData: props,
    })
    expect(wrapper.exists()).toBe(true)
  })
})
