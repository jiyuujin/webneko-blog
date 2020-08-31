import { mount } from '@vue/test-utils'

import '~/plugins/j-stylebook'

import CookieFooter from '~/components/CookieFooter.vue'

describe('Cookie Footer', () => {
  test('correctly render', () => {
    const props = {
      //
    }
    const wrapper = mount(CookieFooter, {
      propsData: props
    })
    expect(wrapper.exists()).toBe(true)
  })
})